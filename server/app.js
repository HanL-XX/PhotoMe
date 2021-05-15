const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const dotenv=require("dotenv")
const mongoose = require('mongoose')

dotenv.config({path:"./config.env"})

mongoose.connect(process.env.mongoUri,{
    useNewUrlParser : true,
    useUnifiedTopology : true,
    useCreateIndex:true,
    useFindAndModify:false,
})

mongoose.connection.on("connected",() =>{
    console.log("Connect Success")
})

mongoose.connection.on("error",(err) =>{
    console.log("error",error)
})

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use('/api/user',require("./router/user"))
app.use('/api/login',require("./router/login"))

app.get('/',(req,res)=>{
    res.send("welcome to Photo Me")
})

app.listen(3000,() =>{
    console.log("server running")
})  
