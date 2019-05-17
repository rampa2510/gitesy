//= =======================================================================================
/*                                                                                      *
 *                                 require the functions                                *
 *                                                                                      */
//= =======================================================================================

const { askRemoteCreds } = require('../lib/questions')
const { stdin } = require('mock-stdin')

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

describe('Test for asking Questions', () => {
  const sendKeystrokesForUsername = async () => {
    io.send('r')
    io.send(keys.enter)
  }
  const sendKeystrokesForPass = async () => {
    io.send('r')
    io.send(keys.enter)
  }
  setTimeout(() => sendKeystrokesForUsername().then(), 5)
  setTimeout(() => sendKeystrokesForPass().then(), 7)
  it('should be equal to the specidied object', async (done) => {
    const creds = await askRemoteCreds('github')
    expect(creds).toStrictEqual({ username: 'r', password: 'r' })
    done()
  })
})
