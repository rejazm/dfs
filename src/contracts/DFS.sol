pragma solidity ^0.5.0;

contract DFS {
    string public name = 'DFS';
    uint public filecount = 0;
    mapping(uint => File) public files;
 
    struct File {
      uint fileid;
      string filehash;
      uint filesize;
      string filetype;
      string filename;
      string filedescription;
      uint uploadtime;
      address payable uploader;
    } 

    // Event
    event fileuploaded(
      uint fileid,
      string filehash,
      uint filesize,
      string filetype,
      string filename,
      string filedescription,
      uint uploadtime,
      address payable uploader
    );            

    constructor() public {
    }

    function uploadfile(string memory _filehash, uint _filesize, string memory _filetype, string memory _filename, string memory _filedescription) public {

      require(bytes(_filehash).length > 0);
      require(bytes(_filetype).length > 0);
      require(bytes(_filedescription).length > 0);
      require(bytes(_filename).length > 0);
      require(msg.sender!=address(0));
      require(_filesize>0);
      
      filecount ++;  // Increment file id
      files[filecount] = File(filecount, _filehash, _filesize, _filetype, _filename, _filedescription, now, msg.sender);  // Add File to the contract
      emit fileuploaded(filecount, _filehash, _filesize, _filetype, _filename, _filedescription, now, msg.sender); // Event trigger
    }
  }