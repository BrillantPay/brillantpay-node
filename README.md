# BrillantPay Node.js Library

[![Version](https://img.shields.io/npm/v/brillantpay.svg)](https://www.npmjs.org/package/brillantpay)
[![Build Status](https://travis-ci.org/BrillantPay/brillantpay-node.svg?branch=master)](https://travis-ci.org/BrillantPay/brillantpay-node)
[![Downloads](https://img.shields.io/npm/dm/brillantpay.svg)](https://www.npmjs.com/package/brillantpay)

The BrillantPay Node library provides convenient access to the BrillantPay API
from applications written in server-side JavaScript.

Please keep in mind that this package is for use with server-side Node that
uses BrillantPay keys. To maintain compliance and offer ideal user experience,
always call [brillantpay.js] in all integrations or [checkout.js] in the script
src attribute of the form when using [BrillantPay Checkout](http://docs.brillantpay.com).

## Documentation

See the [Node API documentation](http://docs.brillantpay.com).

## Installation

Install the package with:

    npm install brillantpay --save

## Usage

The package needs to be configured with your account's publishable and secret
keys which are available in your [BrillantPay Dashboard](http://dashboard.brillantpay.com).
Require it with the Secret Key value:

``` js
const brillantpay = require('brillantpay')('bp_stest_...');
```

### Using Promises

Every method returns a promise which can be used instead of a regular
callback:

``` js
// Create a new payment:
brillantpay.payments.create({
        confirmation: "LYET673VGT6367",
        account: "XTU77E8D",
        currency: "KES",
        amount: 500,
        description: "Chiffon blouse",
        option: "mobile-money",
        service: "mpesa",
        email: "john.doe@brillantpay.com",
        phone: 254700112233
    })
.then(function(response) {
  // A new payment created. Do something
}).catch(function(err) {
  // Deal with an error
});
```

### Configuring Timeout

Request timeout is configurable (the default is Node's default of 120 seconds):

``` js
brillantpay.setTimeout(30000); // in ms (this is 30 seconds)
```

### Writing a Plugin

If you're writing a plugin that uses the library, we'd appreciate it if you identified using `brillantpay.setAppInfo()`:

``` js
brillantpay.setAppInfo({
  name: 'MyAwesomePlugin',
  version: '1.2.34', // Optional
  url: 'https://myawesomeplugin.info', // Optional
});
```

This information is passed along when the library makes calls to the BrillantPay API.

## Development

Run all tests:

``` bash
$ npm install
$ npm test
```

Run a single test suite:

```bash
$ npm run mocha -- test/resources/payment.spec.js
```

[api-keys]: https://dashboard.brillantpay.com/settings