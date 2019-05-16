//========================================================================================
/*                                                                                      *
 *                                 require the functions                                *
 *                                                                                      */
//========================================================================================

const { createRemoteRep,registerNewToken }    =   require('../lib/remote');

//########################################################################################
const { stdin }           = require('mock-stdin')

beforeAll(() => {
  process.env = Object.assign(process.env, { ENV: 'test' });
});

// Mock stdin so we can send messages to the CLI

let io = null
beforeAll(() => (io = stdin()))
afterAll(() => io.restore())

const keys = {
  up: '\x1B\x5B\x41',
  down: '\x1B\x5B\x42',
  enter: '\x0D',
  space: '\x20'
}


var user = {
  username:'r',
  password:'r'
}

var token;

describe('Remote repo creation test', () => {

  it('should generate a token and return a object',async (done) => {
    token = await registerNewToken('github',user);
    expect(token).toBeDefined()
    done()
  })
  
  const sendKeystrokesFordesc = async () => {
    io.send(keys.enter)
  }
  const sendKeystrokesForPrivOrPub = async () => {
    io.send(keys.enter);
  }
  setTimeout(() => sendKeystrokesFordesc().then(), 3)
  setTimeout(() => sendKeystrokesForPrivOrPub().then(), 4)
  it('should throw a 401 status as wrong creds',async (done) => {
    var repo = await createRemoteRep(token,'Node','test','Github');
    expect(repo).toBeFalsy();
    done()
  })
  
})
