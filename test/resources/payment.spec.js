'use strict';

var assert = require('assert');
var init = require('../init.spec.js');

var config = init.config;

describe('Payment', function() {
    var vm = this;
    vm.timeout(0);

    describe('#make_payment(confirmation, paymentAccount, paymentCurrency, paymentAmount, paymentDescription, option, service, email, phone, callback)', function() {
        it('should make payment without error', function(done) {
            if (!config.PAYMENT_ACCOUNT &&
                !config.PAYMENT_AMOUNT &&
                !config.PAYMENT_CURRENCY &&
                !config.PAYMENT_CONFIRMATION &&
                !config.PAYMENT_DESCRIPTION &&
                !config.PAYMENT_OPTION &&
                !config.PAYMENT_SERVICE &&
                !config.PAYER_EMAIL &&
                !config.PAYER_PHONE
            ) {
                it('skip test - missing parameters', function() {});
                return done();
            }

            init.brillantpay.payments.create(
                config.PAYMENT_ACCOUNT,
                config.PAYMENT_AMOUNT,
                config.PAYMENT_CURRENCY,
                config.PAYMENT_CONFIRMATION,
                config.PAYMENT_DESCRIPTION,
                config.PAYMENT_OPTION,
                config.PAYMENT_SERVICE,
                config.PAYER_EMAIL,
                config.PAYER_PHONE,

                function(err, response) {
                if (err) throw err;

                assert.equal(response.status(200), config.SUCCESS);

                done();
            });
        });
    });
});