'use strict'

const crypto = require('crypto')

const cipherName = 'aes256'
const cipherSize = 32 // in bytes

function SecureString () {
  let encryptedValue
  let key = crypto.randomBytes(cipherSize)
  let iv = crypto.randomBytes(16)
  
  function value(fn) {
    const cipher = crypto.createDecipheriv(cipherName, key, iv)
    const a = cipher.update(encryptedValue)
    const b = cipher.final()
    const c = Buffer.concat([a, b])
    try {
      fn(c)
    } finally {
      crypto.randomFillSync(a)
      crypto.randomFillSync(b)
      crypto.randomFillSync(c)
    }
  }
  
  function clear() {
    if (encryptedValue) {
      crypto.randomFillSync(encryptedValue)
    }
    const cipher = crypto.createCipheriv(cipherName, key, iv)
    encryptedValue = Buffer.concat([cipher.update(''), cipher.final()])
  }
  
  function appendCodePoint (codePoint) {
    let cipher = crypto.createDecipheriv(cipherName, key, iv)
    const a = cipher.update(encryptedValue)
    const b = cipher.final()
    
    cipher = crypto.createCipheriv(cipherName, key, iv)
    encryptedValue = Buffer.concat([
      cipher.update(a), 
      cipher.update(b),
      cipher.update(Buffer.from(String.fromCodePoint(codePoint))),
      cipher.final()])
    crypto.randomFillSync(a)
    crypto.randomFillSync(b)
  }
  
  clear()
  
  this.value = value
  this.appendCodePoint = appendCodePoint
  this.clear = clear
}

module.exports = SecureString