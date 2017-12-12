# secure-string

[![Greenkeeper badge](https://badges.greenkeeper.io/richardschneider/secure-string.svg)](https://greenkeeper.io/)

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

## Getting started

**secure-string** is available for [Node.js](https://nodejs.org).

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

# License
The [MIT license](./LICENSE).

Copyright © 2017 Richard Schneider [(makaretu@gmail.com)](mailto:makaretu@gmail.com?subject=secure-string)
