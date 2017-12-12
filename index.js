`use strict`

const crypto = require('crypto')

const cipherName = 'aes256'
const cipherSize = 32 // in bytes

function SecureString () {
  let encryptedValue
  let key = crypto.randomBytes(cipherSize)
  let iv = crypto.randomBytes(16)
  
  function value(cb) {
    const cipher = crypto.createDecipheriv(cipherName, key, iv)
    cipher.update(encryptedValue)
    const plainValue = cipher.final()
    try {
      cb(plainValue)
    } finally {
      crypto.randomFillSync(plainValue)
    }
  }
  
  function clear() {
    if (encryptedValue) {
      crypto.randomFillSync(encryptedValue)
    }
    const cipher = crypto.createCipheriv(cipherName, key, iv)
    cipher.update('')
    encryptedValue = cipher.final()
  }
  
  function appendCodePoint (codePoint) {
    let cipher = crypto.createDecipheriv(cipherName, key, iv)
    cipher.update(encryptedValue)
    const plainValue = cipher.final()
    cipher = crypto.createCipheriv(cipherName, key, iv)
    cipher.update(plainValue)
    cipher.update(Buffer.from(String.fromCodePoint(codePoint)))
    encryptedValue = cipher.final()
    crypto.randomFillSync(plainValue)
  }
  
  clear()
  
  this.value = value
  this.appendCodePoint = appendCodePoint
  this.clear = clear
}

module.exports = SecureString