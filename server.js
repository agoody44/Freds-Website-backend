// Load express
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

// Create our express app
const app = express();

// Configure the app (app.set)


// Mount middleware (app.use)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());



// Routes
app.get('/', function (req, res) {
    res.send('<h1>Hello World!</h1>');
});

app.post('/api/forma',(req,res) => {
    let data = req.body
    let smtpTransport = nodemailer.createTransport({
        service:'Gmail',
        port:465,
        auth:{
            user:'agoody44@gmail.com',
            pass: ''
        }
    });

let mailOptions={
    from:data.email,
    to:'agoody44@gmail.com',
    subject:`Message from ${data.name}`,
    html:`
    
    <h3>Information</h3>
        <ul>
        <li>Name: ${data.name}</li>
        <li>Lastname: ${data.lastname}</li>
        <li>Email: ${data.email}</li>
        </ul>

        <h3>Message</h3>
        <p>${data.message}</p>
    
    `
};

smtpTransport.sendMail(mailOptions, (error, response) => {
    if(error){
        res.send(error)
    }
    else{
        res.send('Success')
    }
})  

smtpTransport.close();

})

// Tell the app to listen on port 3001
const port = process.env.PORT || 3001;
app.listen(port, function () {
    console.log(`Express is running on port: ${port}`);
});