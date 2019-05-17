//= =======================================================================================
/*                                                                                      *
 *                                 require the functions                                *
 *                                                                                      */
//= =======================================================================================

const isFileExists = require('../lib/files')

// ########################################################################################

describe('Tests for file searching', () => {
  // test for file not exits
  it('should return false as there is no such file/directory', () => {
    const result = isFileExists('auto')
    expect(result).toBeFalsy()
  })
})
