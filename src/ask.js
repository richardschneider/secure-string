`use strict`

const process = require('process')
const readline = require('readline')
const SecureString = require('./secure-string')

function ask (prompt, callback) {
  const secret = new SecureString()
  const stdin = process.stdin
  const stdout = process.stdout
  const rl = readline.createInterface({
    input: stdin,
    output: null
  })
  
  function keypress(s, key) {
    if (s === '\r' || s === '\n') {
      stdin.removeListener('keypress', keypress)
      rl.close()
      callback(null, secret)
    } else if (s !== undefined) {
      secret.appendCodePoint(s.codePointAt(0))
    }
  }
  
  stdin.on('keypress', keypress)
  readline.emitKeypressEvents(stdin)
  if (stdin.isTTY)
    process.stdin.setRawMode(true)
  
  if (stdout)
    stdout.write(prompt)
  stdin.resume()
}

module.exports = ask
