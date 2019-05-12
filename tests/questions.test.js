//========================================================================================
/*                                                                                      *
 *                                 require the functions                                *
 *                                                                                      */
//========================================================================================

const { askRemoteCreds } = require('../lib/questions');
const inquirer = require('inquirer');


describe('Test for asking Questions', () => {
  it('should return a function',async ()=>{
    expect.assertions(1);
    inquirer.prompt = jest.fn().mockResolvedValue({ username:'ram2510',password:'lol' });
    await expect(askRemoteCreds('github')).resolves.toEqual({ username:'ram2510',password:'lol' });
  })
})

