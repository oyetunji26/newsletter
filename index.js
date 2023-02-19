const express = require('express');
const app = express();
const https = require('https');
const bodyParser = require("body-parser");
//const request = require('request');  
const port = 300;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));


app.get("/", (req,res) => {
    res.sendFile(__dirname + "/index.html");
});


app.post("/", (req,res) => {
    const first = req.body.firstName;
    const last = req.body.secondName;
    const email = req.body.email;
    var data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: first,
                    LNAME: last
                }
            }
        ]
    };

    var jsonD = JSON.stringify(data);
    const url = "https://us13.api.mailchimp.com/3.0/lists/5595b319ec";
    const ops = {
        method: "POST",
        auth: "tunji1:c5f1611f316828047b10b1960b10c9ae-us13"
    }

    // http request
    const request = https.request(url, ops, (resp) => {
        if (resp.statusCode === 200) {
            //res.send("succesful");
            res.sendFile(__dirname + "/success.html");
            // to redirect from success.html or failure
            // use res.redirect("/");
        }
         else {
            res.sendFile(__dirname + "/failure.html");
            //res.redirect("/");
        }
        resp.on("data", (data) => {
            console.log(JSON.parse(data));
        });
    });
    

    request.write(jsonD);
    request.end();
});

// to redirect
app.post("/failure", (req,res) => {
    res.redirect("/");
});

app.listen(process.env.PORT || 300, () => {
    console.log(`Port opened at ${port}`);
});

// bc90b9dd74a8867d1961b78ff66e0916-us13


// audience id: 5595b319ec


// api key: c5f1611f316828047b10b1960b10c9ae-us13