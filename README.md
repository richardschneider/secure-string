# secure-string

[![Travis build status](https://travis-ci.org/richardschneider/secure-string.svg)](https://travis-ci.org/richardschneider/secure-string)
[![Coverage Status](https://coveralls.io/repos/github/richardschneider/secure-string/badge.svg?branch=master)](https://coveralls.io/github/richardschneider/secure-string?branch=master)
[![npm version](https://badge.fury.io/js/secure-string.svg)](https://badge.fury.io/js/secure-string) 
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/richardschneider/secure-string/releases)

Text that should be kept confidential

The [change log](https://github.com/richardschneider/secure-string/releases) is automatically produced with
the help of [semantic-release](https://github.com/semantic-release/semantic-release).

## Features

- The text is stored in an encrypted buffer
- The plain text is only available in a `callback`
- Prompting the user for a secure string

## Getting started

**secure-string** is available for [Node.js](https://nodejs.org) and the browser.  Most modern browsers are supported.  If you want to know if your browser is compatible, run the [online test suite](https://rawgit.com/richardschneider/secure-string/master/test/index.html).


Install with [npm](http://blog.npmjs.org/post/85484771375/how-to-install-npm)

    > npm install secure-string --save

### Usage

```js
const SecureString = require('secure-string')

const password = new SecureString()
password.appendCodePoint(0x41)
password.value(plainText => {
  console.log('the passowrd is', plainText.toString())
})
```

See the [spec](./test/secure-string.spec.js) for more examples.

### Ask

`SecureString.ask` prompts the user for some data

```js
const SecureString = require('secure-string')

SecureString.ask('password', (err, answer) => {
  if (err) return console.log(err)
  answer.value(plainText => {
    console.log('the passowrd is', plainText.toString())
  })
})
```

## Browser

Include the package from the [unpkg CDN](https://unpkg.com)

    <script src="https://unpkg.com/secure-string/dist/bundle.min"></script>

This creates `SecureString` as a global object, or `define` it if you are using [AMD](https://en.wikipedia.org/wiki/Asynchronous_module_definition).

# License
The [MIT license](./LICENSE).

Copyright © 2017 Richard Schneider [(makaretu@gmail.com)](mailto:makaretu@gmail.com?subject=secure-string)
