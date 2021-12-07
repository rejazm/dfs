## ``` Decentralized File Storage Using IPFS and Ethereum ```

#

## System Architecture:
![image](https://user-images.githubusercontent.com/86140201/145105138-1361c20e-8240-4877-8255-04bad286e71b.png)


## Workflow and User Journey:
![image](https://user-images.githubusercontent.com/86140201/145106641-326305f2-bc72-4125-a6b8-686b851dc00f.png)

0)	The user launches the application through the browser on their computer. The user interface is not activated, and the account number appears as "0x0..0x0".    
1)	Once the user confirms the identity through the Ethereum account loaded on MetaMask, the user interface is activated.
2)	After that, the user can navigate to the file upload section or the file directory. The user id/Ethereum public key is displayed on the top right corner of the screen.
3)	The user enters the file description and uploads the file, IPFS returns the content address/hash of the file
4)	User approval is required to add the content address and details of the file and to the Smart Contract. Then, MetaMask requests approval to let the transaction through.
5)	If there is enough fund in the account for the gas fee, the user can approve the transaction
6)	The content address is added to the Smart Contract along with the details of the file.
7)	The application fetches the list of files uploaded from the Smart Contract
8)	The user views the list of files and their details. Then, the user can copy the file share link and share it with recipients. Finally, the recipients can access the file by simply entering the file share link. 
