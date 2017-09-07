/**
 * - using dotenv to load .env variables
 * - dotenv will read the .env file in the root folder
 * - It will parse the file and inject the variables to our environment
 * @type {[type]}
 */

'use strict';

require('dotenv').load();

var BrillantPay = require('../lib/brillantpay.js');

var config = {
    key: process.env.PUBLISHABLE_KEY,
    secret: process.env.SECRET_KEY,

    SUCCESS: 'Payment Success',
    FAILURE: 'Payment Failure',

    PAYMENT_ACCOUNT: '',
    PAYMENT_AMOUNT: 0,
    PAYMENT_CURRENCY: '',
    PAYMENT_CONFIRMATION: '',
    PAYMENT_DESCRIPTION: '',
    PAYMENT_OPTION: '',
    PAYMENT_SERVICE: '',
    PAYER_EMAIL: '',
    PAYER_PHONE: ''
};

var brillantpay = new BrillantPay(config.key, config.secret);

module.exports = {
    brillantpay: brillantpay,
    config: config,
    require_var: function(v) {
        return !(!v);
    }
};