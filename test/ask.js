/* eslint-env mocha */

'use strict'

const chai = require('chai')
const expect = chai.expect
chai.use(require('dirty-chai'))
const SecureString = require('..')
const Readable = require('stream').Readable;

describe('ask', () => {
  it('static', () => {
    const password = new SecureString()
    expect(SecureString.ask).to.exist()
  })

  it.skip('returns a secure string', done => {
    SecureString.ask('password', (err, answer) => {
      expect(err).to.not.exist()
      expect(answer).to.exist()
      expect(answer).to.be.instanceOf(SecureString)
      answer.value(plainText => {
        expect(plainText).to.exist();
        expect(plainText).to.be.instanceOf(Buffer)
        expect(plainText.toString()).to.equal('')
        done()
      })
    })
  })
})
