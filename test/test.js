const DFS = artifacts.require('./DFS.sol')

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('DFS', ([deployer, uploader]) => {
  let dfs

  before(async () => {
    dfs = await DFS.deployed()
  })

  describe('deployment', async () => {
    it('deploys successfully', async () => {
      const address = await dfs.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })


    it('has a name', async () => {
      const name = await dfs.name()
      assert.equal(name, 'DFS')
    })
  })

  describe('file', async () => {
    let result, filecount, fileid
    const filehash = 'QmV8cfu6n4NT5xRr2AHdKxFMTZEJrA44qgrBCr739BN9Wb'
    const filesize = '1'
    const filetype = 'TypeOfTheFile'
    const filename = 'NameOfTheFile'
    const filedescription = 'DescriptionOfTheFile'

    before(async () => {
      result = await dfs.uploadfile(filehash, filesize, filetype, filename, filedescription, { from: uploader })
      filecount = await dfs.filecount()
    })

    //check event
    it('upload file', async () => {
      // SUCCESS
      assert.equal(filecount, 1)
      const event = result.logs[0].args
      assert.equal(event.fileid.toNumber(), filecount.toNumber(), 'Id is correct')
      assert.equal(event.filehash, filehash, 'Hash is correct')
      assert.equal(event.filesize, filesize, 'Size is correct')
      assert.equal(event.filetype, filetype, 'Type is correct')
      assert.equal(event.filename, filename, 'Name is correct')
      assert.equal(event.filedescription, filedescription, 'Description is correct')
      assert.equal(event.uploader, uploader, 'Uploader is correct')

      // FAILURE: File must have hash
      await dfs.uploadfile('', filesize, filetype, filename, filedescription, { from: uploader }).should.be.rejected;

      // FAILURE: File must have size
      await dfs.uploadfile(filehash, '', filetype, filename, filedescription, { from: uploader }).should.be.rejected;
      
      // FAILURE: File must have type
      await dfs.uploadfile(filehash, filesize, '', filename, filedescription, { from: uploader }).should.be.rejected;

      // FAILURE: File must have name
      await dfs.uploadfile(filehash, filesize, filetype, '', filedescription, { from: uploader }).should.be.rejected;

      // FAILURE: File must have description
      await dfs.uploadfile(filehash, filesize, filetype, filename, '', { from: uploader }).should.be.rejected;
    })

    //check from Struct
    it('lists file', async () => {
      const file = await dfs.files(filecount)
      assert.equal(file.fileid.toNumber(), filecount.toNumber(), 'id is correct')
      assert.equal(file.filehash, filehash, 'Hash is correct')
      assert.equal(file.filesize, filesize, 'Size is correct')
      assert.equal(file.filename, filename, 'Size is correct')
      assert.equal(file.filedescription, filedescription, 'description is correct')
      assert.equal(file.uploader, uploader, 'uploader is correct')
    })
  })
})
