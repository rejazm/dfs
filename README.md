## ```Decentralized File Storage Using IPFS and Ethereum```

A centralized organisation manages the traditional cloud storage, so the data is susceptible to censorship. These organisations can access private data and can disclose it to government authorities upon request. This project explores a way to overcome this by creating a decentralised platform for storing and sharing data with the help of the InterPlanetary File System (IPFS) and Ethereum blockchain. 

## System Architecture:
![image](https://user-images.githubusercontent.com/86140201/145105138-1361c20e-8240-4877-8255-04bad286e71b.png)

As per the system architecture, the blockchain and IPFS act as the back end of the system. The client-side of the application is developed using JavaScript and React framework. The front-end interacts with the blockchain and the IPFS. We use predefined modules for building the system. The list of modules or project dependencies can be found on the package.json file.

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

## User Interface:
![image](https://user-images.githubusercontent.com/86140201/145107754-c2c57416-40ef-4c27-abaf-d78ab00ba9e2.png)

The front end consists of three sections, as shown in Figure 2. Section 1 or the navigation bar displays the logo and the user ID in the right corner. The user ID is the Ethereum public key of the user. We will discuss how the user will log in in the next chapter. A distinct avatar is displayed for every user after they log in. The upload section consists of a description field where the user can enter the description of the file. The user can choose a file using the 'Choose file' button and upload it by clicking on the upload button. Section 3 consists of a table that displays the file id, file name, file description, file type/format, file size, date of upload and Ethereum public key of the uploader. This table data would be displayed as empty if the user did not login using the MetaMask wallet or did not upload any files in the past.
