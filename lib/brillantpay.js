/**
 *BRILLANTPAY API LIBRARY
 **/

'use strict';

var http = require('http');
var https = require('https');
var url = require('url');

function BrillantPay(apiSecret) {

    if (!(this instanceof BrillantPay)) {
        return new BrillantPay(apiSecret);
    }

    var vm = this;

    vm._API_BASE_URL = "http://dashboard.brillantpay.com:8080/api/v1/";
    vm._API_VERSION = require('../package.json').version;

    vm._parsedUrl = url.parse(vm._API_BASE_URL);
    vm._basePath = vm._parsedUrl.path;
    vm._host = vm._parsedUrl.hostname;
    vm._port = (vm._parsedUrl.protocol === 'https:') ? 8443 : 8080;
    vm._connector = (vm._parsedUrl.protocol === 'https:') ? https : http;

    vm.execute = function (endpoint, method, parameters, callback) {
        var data = JSON.stringify(parameters);

        var option = {
            host: vm._host,
            port: vm._port,
            method: method,
            path: vm._basePath + endpoint,
            headers: {
                'Api-Key': apiSecret,
                'Content-Length': data.length,
                'Content-Type': 'application/json'
            }
        };

        var request = vm._connector.request(option, function(response) {
            var body = '';

            response.on('data', function(chunk) {
                body += chunk;
            });

            response.on('end', function() {
                var cb_response;

                try {
                    cb_response = JSON.parse(body);
                }
                catch (err) {
                    return callback(err, {});
                }

                return callback(null, cb_response);
            });
        });

        request.on('error', function(err) {
            return callback(err, {});
        });

        if (data !== null) {
            request.write(data);
        }

        request.end();
    };


    //////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////// API CALLS //////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////

    /**
     * Payments Handler
     **/
    vm.payments = function(confirmation,
                           account,
                           currency,
                           amount,
                           description,
                           option,
                           service,
                           email,
                           phone,
                           callback) {

        var parameters = {
            confirmationCode: confirmation,
            confirmAccount: account,
            currency: currency,
            amount: amount,
            description: description,
            transactionOption: option,
            transactionService: service,
            customer: {
                email: email,
                phoneNumber: phone
            }
        };

        var method = 'POST';

        vm.execute("payments", method, parameters, function(err, response) {
            return callback(err, response);
        });
    };

    /**
     * Balance Handler
     **/
    vm.balance = function(callback) {

        var parameters = {};

        var method = 'GET';

        vm.execute("balance", method, parameters, function(err, response) {
            return callback(err, response);
        });

    };
}

/**
 * Export BrillantPay as a module constructor
 */

module.exports = BrillantPay;

module.exports.BrillantPay = BrillantPay;