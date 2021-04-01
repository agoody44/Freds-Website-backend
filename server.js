const express = require('express');
const bodyParser = require("body-parser");
const nodemailer = require('nodemailer');
const cors = require('cors');

require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());


app.get('/', (req, res)=>{
    res.send('welcome to my form');
})

app.post('/send', (req,res)=>{

let data = req.body;

let transporter = nodemailer.createTransport({
    service:'gmail',
    port:465,
    secure: true,
    auth:{
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    }
});


let mailOptions={
    from:data.email,
    to: process.env.EMAIL,
    subject:`Message from ${data.name}`,
    html:`
    
    <h3>Informations</h3>
    <ul>
        <li>Name: ${data.name}</li>
        <li>Email: ${data.email}</li>
    
    </ul> 
    <h3>Message</h3> 
    <p>${data.message}</p>  
    
    `

};


transporter.sendMail(mailOptions, (error,response)=>{

    if(error){
        res.send(error)
    }
    else{
        res.send('Success')
    }

    transporter.close();
})






})



const PORT = process.env.PORT||3001;

app.listen(PORT,()=>{
    console.log(`server listening at port ${PORT}`);
    
})