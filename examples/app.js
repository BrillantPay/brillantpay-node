const apiKey = process.env.PUBLISHABLE_KEY;
const apiSecret = process.env.SECRET_KEY;

const app = require("express")() ;
const brillantpay = require("brillantpay");
const transaction = new brillantpay.BrillantPay(apiSecret);

app.get('/', function (req, res) {
    res.render("form.pug", apiKey);
});

app.post('/payment', function (req, res) {

    this.formData = {
        "confirmation": "HJVHGFT65675",
        "confirm": 424324324,
        "currency": "KES",
        "amount": 500,
        "description": "Chiffon dress",
        "option": "MOBILEMONEY",
        "service": "MPESA",
        "email": "john.doe@brillantpay.com",
        "phone": 254718287827
    };

    transaction.payments(this.formData.confirmation,
        this.formData.confirm,
        this.formData.currency,
        this.formData.amount,
        this.formData.description,
        this.formData.option,
        this.formData.service,
        this.formData.email,
        this.formData.phone, function(err, response) {
            if (err) {
                // Deal with an error
            }
            // A new payment created. Do something
            res.render("callback.pug")
        });
});

app.listen(3456);