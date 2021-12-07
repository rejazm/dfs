import DFS from '../abis/DFS.json'
import React, { Component } from 'react';
import Navbar from './Navbar'
import Main from './Main'
import Web3 from 'web3';
import './App.css';

//Declare IPFS

const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if(window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Please install MetaMask')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3  //Declaring Web3
   
    //Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0]})
    
    // Network ID
    const networkId = await web3.eth.net.getId()
    const networkData = DFS.networks[networkId]
    if(networkData) {
      // Assign contract
      const dfs = new web3.eth.Contract(DFS.abi, networkData.address)
      this.setState({ dfs })
      // Get files amount
      const filecount = await dfs.methods.filecount().call()
      this.setState({ filecount })
      // Load files & sort by the newest
      for (var i = filecount; i >= 1; i--) {
        const file = await dfs.methods.files(i).call()
        this.setState({
          files: [...this.state.files, file]
        })
      }
    } 
    
    else {
      window.alert('DStorage contract not deployed to detected network.')
    }
    this.setState({loading : false})
  }

  // Get file from user
  captureFile = event => {
    event.preventDefault()

    const file = event.target.files[0]
    const reader = new window.FileReader()

    reader.readAsArrayBuffer(file)
    reader.onloadend = () => {
      this.setState({
        buffer: Buffer(reader.result),
        type: file.type,
        name: file.name
      })
      console.log('buffer', this.state.buffer)
    }
  }


  uploadfile = description => {
    console.log("Submitting file to IPFS...")

    // Add file to the IPFS
    ipfs.add(this.state.buffer, (error, result) => {
      console.log('IPFS result', result)

      // Check for error and return error
      if(error) {
        console.error(error)
        return
      }
      
      // Set state to loading 
      this.setState({ loading: true })

      // Assign value for the file without extension
      if(this.state.type === ''){
        this.setState({type: 'none'})
      }

      // Call smart contract uploadfile function
      this.state.dfs.methods.uploadfile(result[0].hash, result[0].size, this.state.type, this.state.name, description).send({ from: this.state.account }).on('transactionHash', (hash) => {
        this.setState({
         loading: false,
         type: null,
         name: null
        })
        window.location.reload()
      })
        .on('error', (e) =>
        {
          window.alert('Error')
          this.setState({loading: false})
        })
    })
  }

  //Set states
  constructor(props) {
    super(props)
    this.state = {
      account: '',
      dfs: null,
      files: [],
      loading: false,
      type: null,
      name: null
    }
    this.uploadfile = this.uploadfile.bind(this)
    this.captureFile = this.captureFile.bind(this)
  }

  render() {
    return (
      <div>
        <Navbar account={this.state.account} />
        { this.state.loading
          ? <div id="loader" className="text-center mt-5"><p>Loading...</p></div>
          : <Main
              files={this.state.files}
              captureFile={this.captureFile}
              uploadfile={this.uploadfile}
            />
        }
      </div>
    );
  }
}

export default App;