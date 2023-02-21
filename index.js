const express = require('express');
const app = express();
const https = require('https');
const bodyParser = require("body-parser");
//const request = require('request');  
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));


app.get("/", (req,res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", (req,res) => {
    var firstN = req.body.firstName;
    var lastN = req.body.secondName;
    var email = req.body.email;
    console.log(email + firstN);

    // data to be sent
    let data = {
        members: [
            {
                email_address:email,
                STATUS: "suscribed",
                merge_fields: {
                    FNAME: firstN,
                    LNAME: lastN
                }
            }
        ]
    }

    var jsonD = JSON.stringify(data);

    // url that the data will be sent to
    const url = "https://us13.api.mailchimp.com/3.0/lists/5595b319ec";

    //options on how the data will be sent, it contains datda like method
    const options = {
        method: "POST",
            
            auth: "tunji:c5f1611f316828047b10b1960b10c9ae-us13"
    }
    const request = https.request(url,options, (response) => {
        if(response.statusCode == 200) {
            res.sendFile(__dirname + "/success.html");
        }
        else {
            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data", (data) => {
            console.log(JSON.parse(data));
        })
    })

    // to send the jsonD (stingified data) to the app
    request.write(jsonD);

    // end the request
    request.end();
    
});


app.post("/failure", (req,res) => {
    res.redirect("/");
})
app.listen(port, () => {
    console.log(`Port opened at ${port}`);
});

// bc90b9dd74a8867d1961b78ff66e0916-us13

// 5595b319ec


// api key: c5f1611f316828047b10b1960b10c9ae-us13