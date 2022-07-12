const express = require("express");
const cookieParser = require('cookie-parser')
const path = require('path')
const app = express()

require('dotenv').config()
require('./db/mongoose')


const PublicPath = path.join(__dirname,'./Public')
const usersroute = require('./Routes/users')
const projectsroute = require('./Routes/projects')
const ticketsroute = require('./Routes/tickets')
const commentsroute = require('./Routes/comments')

app.use(cookieParser())
app.use(express.json());
// app.use(express.json({ limit: '20MB' }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(PublicPath))

app.use(usersroute)
app.use(projectsroute)
app.use(ticketsroute)
app.use(commentsroute)

app.listen(process.env.PORT,()=>{
    console.log('Server Started at 127.0.0.1:'+process.env.PORT);
})

