// Load express
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');


require("dotenv").config();

// Create our express app
const app = express();


// Mount middleware (app.use)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());



// Routes
app.get('/', function (req, res) {
    res.send('<h1>Hello World!</h1>');
});

app.post('/api/form',(req,res) => {
    console.log(req.body)
    let data = req.body
    let smtpTransport = nodemailer.createTransport({
        host:'gmail.com',
        port:465,
        auth:{
            user:'process.env.EMAIL',
            pass:'process.env.PASSWORD'
        }
    });

let mailOptions={
    from:data.email,
    to:'process.env.EMAIL',
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

smtpTransport.sendMail(mailOptions, (err, res) => {
    if(err){
        res.send('error')
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











// const transporter = nodemailer.createTransport({
//     host: 'smtp.gmail.com', //replace with your email provider
//     port: 465,
//     auth: {
//         user: process.env.EMAIL,
//         pass: process.env.PASSWORD
//     }
// });

// verify connection configuration
// transporter.verify(function(error, success) {
//     if (error) {
//         console.log(error);
//     } else {
//         console.log("Server is ready to take our messages");
//     }
// });

// app.post('/api/forma', (req, res, next) => {
// let name = req.body.name
// let lastname = req.body.lastname
// let email = req.body.email
// let message = req.body.message

// let mail = {
//     from: name,
//     to: process.env.EMAIL,
//     // subject: subject,
//     text: message,
// }

// transporter.sendMail(mail, (err, data) => {
//     if (err) {
//         res.json({
//             status: 'fail'
//     })
// } else {
//     res.json({
//         status: 'success'
//     })
// }
// })
// })
