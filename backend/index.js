const express=require("express")
const app=express()
const cors=require("cors")
const bodyparser=require("body-parser");
const AuthRouter=require("./Routes/AuthRouter");
const ModelRouter=require('./Routes/ModelRouter');
require('dotenv').config();
require('./Models/db')


app.use(bodyparser.json())
app.use(cors())
app.use('/auth',AuthRouter)
app.use('/model',ModelRouter)




  app.listen(process.env.port,()=>{
    console.log("Server is running");
  })
