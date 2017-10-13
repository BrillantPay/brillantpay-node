const publishableKey = process.env.PUBLISHABLE_KEY;
const secretKey = process.env.SECRET_KEY;

const app = require("express")() ;
app.locals = {
    apiKey: publishableKey,
    apiSecret: secretKey
};

const brillantpay = require("brillantpay");
const client = new brillantpay.BrillantPay(app.locals.apiSecret);

app.get('/', function (req, res) {
    res.render("form.pug");
});

app.post('/payment', function (req, res) {

    this.formData = {
        "confirmation": "HJVHGFT65675",
        "account": 424324324,
        "bp_token": "tftyfwyf76567233dsfd2",
        "currency": "KES",
        "amount": 500,
        "description": "Chiffon dress",
        "option": "MOBILEMONEY",
        "service": "MPESA",
        "email": "john.doe@brillantpay.com",
        "phone": 254718287827
    };

    client.payments(this.formData.confirmation,
        this.formData.account,
        this.formData.bp_token,
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