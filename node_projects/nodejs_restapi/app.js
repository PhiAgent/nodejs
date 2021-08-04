// Load our app server using express somehow
// import a library called express by creating a constant and 
// requiring

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');
const nodemailer=require('nodemailer');
const transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
        user: 'pgaddai@outlook.com',
        pass: 'Whatsap3!'
    }
})

app.use(bodyParser.urlencoded({extended: false}))

app.use(express.static('./public'))

app.post('/user_create', (req, res) =>{
    console.log('Creating a new user')
    let status = 'User Info Received'
    let user_info = { name: req.body.create_name, email: req.body.create_email, status: status}
    res.json(user_info)

    const options = {
        from: 'pgaddai@outlook.com',
        to: req.body.create_email,
        subject: 'email test',
        text: `hahaha  ${req.body.create_name} ,youve been spammed! haha!`
    }

    transporter.sendMail(options, function (err, success) {
        if (err) {
            console.log('Error: ', err)
        } else {
            console.log('Email sent!')
        }
    })
    res.end()
})

// create new variable and set to new instance of express

app.get("/", (req, res)=>{
    console.log('responding to routes')
    res.send('hello from the other side')
})

app.get("/users", (req, res) => {
    let user1={firstName: 'Prince', lastName: 'Addai'}
    let user2 = { firstName: 'Nana', lastName: 'Gyekye' }
    res.json([user1,user2])
    // console.log('testing dummy route')
    // res.send('nodemon updates in realtime')
})


//localhost 3000
app.listen(3000,()=>{
    console.log('server is up and listening on 3000')
})