/* eslint-env mocha */

'use strict'

const chai = require('chai')
const expect = chai.expect
chai.use(require('dirty-chai'))
const SecureString = require('..')

describe('SecureString', () => {
  it('created with new', () => {
    const password = new SecureString()
    expect(password).to.be.instanceOf(SecureString)
  })
  
  it('plain text is a buffer', () => {
    const password = new SecureString()
    password.value(plainText => {
      expect(plainText).to.exist();
      expect(plainText).to.be.instanceOf(Buffer)
      expect(plainText.toString()).to.equal('')
    })
  })
  
  it('plain text is a UTF-8 encoded buffer', () => {
    const password = new SecureString()
    password.appendCodePoint(0x41)
    password.appendCodePoint(0x24B62)
    password.appendCodePoint(0x42)
    password.value(plainText => {
      expect(plainText).to.exist();
      expect(plainText).to.be.instanceOf(Buffer)
      const expected = Buffer.from('41f0a4ada242', 'hex')
      expect(plainText).to.deep.equal(expected)
    })
  })

  it('clears plain text after making the call', () => {
    const password = new SecureString()
    password.appendCodePoint(0x41)
    let plain
    password.value(plainText => {
      plain = plainText
      expect(plainText.toString()).to.equal('A')
    })
    expect(plain.toString()).to.not.equal('A')
  })

  it('can append non-ASCII characters', () => {
    const password = new SecureString()
    password.appendCodePoint(0x41)
    password.appendCodePoint(0x24B62)
    password.appendCodePoint(0x42)
    password.value(plainText => {
      expect(plainText.toString()).to.equal('A\u{24b62}B')
    })
  })

  it('can be cleared', () => {
    const password = new SecureString()
    password.appendCodePoint(0x41)
    password.value(plainText => {
      expect(plainText.toString()).to.equal('A')
    })
    password.clear()
    password.value(plainText => {
      expect(plainText.toString()).to.equal('')
    })
  })
})
