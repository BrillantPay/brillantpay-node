const apiKey = process.env.PUBLISHABLE_KEY;
const apiSecret = process.env.SECRET_KEY;

const express = require('express')();
const brillantpay = require('brillantpay', apiSecret);

app.get('/', function (req, res) {
    res.render("index.pug", apiKey);
});

app.post("/payment", function(req, res) {
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
        .then(function () {
            res.render("payment.pug");
        })
});

app.listen(3000);