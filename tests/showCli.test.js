//========================================================================================
/*                                                                                      *
 *                                 require the functions                                *
 *                                                                                      */
//========================================================================================

const { program } = require('../lib/showCli');

//########################################################################################

var object = {
  // remote:expect.anything(),
  // app:expect.anything(),
  // name:expect.anything()
  remote:expect.any(String)
}

describe('Test for command line display', () => {
  it('should be a object containing all the key value pairs ', () => {
    expect(program).toMatchObject(
    expect.objectContaining(object)
    )
  })
  
})
