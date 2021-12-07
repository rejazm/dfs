import React, { Component } from 'react';
import { convertBytes } from './helpers';
import moment from 'moment'

class Main extends Component {

  render() {
    return (
      <div className="container-fluid mt-5 text-center">
        <div className="row">
          <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '1024px' }}>
            <div className="content">
              <p>&nbsp;</p>
              <div className="card mb-3 mx-auto bg-dark" style={{ maxWidth: '512px' }}>
                <h2 className="text-white text-monospace bg-dark"><b><ins>Upload and Share Files</ins></b></h2>
                  <form onSubmit={(event) => {
                    event.preventDefault()
                    const description = this.filedescription.value
                    this.props.uploadfile(description)
                  }} >
                      <div className="form-group">
                        <br></br>
                          <input
                            id="filedescription"
                            type="text"
                            ref={(input) => { this.filedescription = input }}
                            className="form-control text-monospace"
                            placeholder="description..."
                            required />
                      </div>
                    <input type="file" onChange={this.props.captureFile} className="text-white text-monospace"/>
                    <button type="submit" className="btn-primary btn-block"><b>Upload!</b></button>
                  </form>
              </div>
              <p>&nbsp;</p>
              {/* Create Table*/}
              <table className="table-sm table-bordered text-monospace" style={{ width: '1000px', maxHeight: '450px'}}>
                <thead style={{ 'fontSize': '15px' }}>
                  <tr className="bg-dark text-white">
                    <th scope="col" style={{ width: '10px'}}>Id</th>
                    <th scope="col" style={{ width: '200px'}}>Name</th>
                    <th scope="col" style={{ width: '230px'}}>Description</th>
                    <th scope="col" style={{ width: '120px'}}>Type</th>
                    <th scope="col" style={{ width: '90px'}}>Size</th>
                    <th scope="col" style={{ width: '90px'}}>Date</th>
                    <th scope="col" style={{ width: '120px'}}>Uploader/View</th>
                    <th scope="col" style={{ width: '120px'}}>Hash/View/Get</th>
                  </tr>
                </thead>
                { this.props.files.map((file, key) => {
                  return(
                    <thead style={{ 'fontSize': '12px' }} key={key}>
                      <tr>
                        <td>{file.fileid}</td>
                        <td>{file.filename}</td>
                        <td>{file.filedescription}</td>
                        <td>{file.filetype}</td>
                        <td>{convertBytes(file.filesize)}</td>
                        <td>{moment.unix(file.uploadtime).format('h:mm:ss A M/D/Y')}</td>
                        <td>
                          <a
                            href={"https://etherscan.io/address/" + file.uploader}
                            rel="noopener noreferrer"
                            target="_blank">
                            {file.uploader.substring(0,10)}...
                          </a>
                         </td>
                        <td>
                          <a
                            href={"https://ipfs.infura.io/ipfs/" + file.filehash}
                            rel="noopener noreferrer"
                            target="_blank">
                            {file.filehash.substring(0,10)}...
                          </a>
                        </td>
                      </tr>
                    </thead>
                  )
                })}
              </table>    
            </div>
          </main>
        </div>
      </div>
    );
  }
}

export default Main;