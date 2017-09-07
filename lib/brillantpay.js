/**
 *BRILLANTPAY API LIBRARY
 **/

'use strict';

var http = require('http');
var https = require('https');
var url = require('url');
var querystring = require('querystring');

function BrillantPay(apiSecret) {

    var vm = this;

    vm._API_BASE_URL = "http://dashboard.brillantpay.com:8080/api/v1/";
    vm._API_VERSION = "0.1.5";

    vm._secret = apiSecret;

    vm._parsedUrl = url.parse(vm._API_BASE_URL);
    vm._basePath = vm._parsedUrl.path;
    vm._host = vm._parsedUrl.hostname;
    vm._port = (vm._parsedUrl.protocol === 'https:') ? 443 : 80;
    vm._connector = (vm._parsedUrl.protocol === 'https:') ? https : http;

    vm.execute = function (endpoint, parameters, callback) {
        parameters.Api_Secret = vm._secret;
        parameters.Api_Version = vm._API_VERSION;

        var data = querystring.stringify(parameters);

        var option = {
            host: vm._host,
            port: vm._port,
            method: 'POST',
            path: vm._basePath + endpoint,
            headers: {
                'Content-Length': data.length,
                'Content-Type': 'application/x-www-form-urlencoded'
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
    vm.payments = {

        // CREATE PAYMENT //
        create : function(confirmation,
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
                "confirmationCode": confirmation,
                "account": account,
                "currency": currency,
                "amount": amount,
                "description": description,
                "paymentOption": option,
                "paymentService": service,
                "payer": {
                    "emailAddress": email,
                    "phoneNumber": phone
                }
            };

            vm.execute("payments", parameters, function(err, response) {
                return callback(err, response);
            });
        }
        // CREATE PAYMENT END //
    };

    /**
     * Balance Handler
     **/
    vm.balance = {

        // RETRIEVE BALANCE //
        retrieve : function(callback) {

            var parameters = {};

            vm.execute("balance", parameters, function(err, response) {
                return callback(err, response);
            });
        }
        // RETRIEVE BALANCE END //
    };
}

/**
 * Export BrillantPay as a module constructor
 */

module.exports = BrillantPay;