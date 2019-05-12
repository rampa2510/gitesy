//========================================================================================
/*                                                                                      *
 *                                 require the functions                                *
 *                                                                                      */
//========================================================================================

const { askRemoteCreds } = require('../lib/questions');

describe('Test for asking Questions', () => {
  it('should return a function',()=>{
    const creds = askRemoteCreds('github');
    expect(creds).toBeDefined();
  })
})
