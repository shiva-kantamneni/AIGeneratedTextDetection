const userModel = require("../Models/User");
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const sendingEmail=require("./Email");
const axios=require('axios');
async function emailExists(email) {
    console.log("hii");
  const key = process.env.Email_verify;

  const res = await axios.get(
    `http://apilayer.net/api/check?access_key=${key}&email=${email}& smtp = 1
    & format = 1`
  );
  console.log(res);
  return res.data.format_valid && res.data.smtp_check;
}

const signup=async(req,res)=>{
    try{
        const {name,email,password}=req.body;
        const user=await userModel.findOne({email});
        if(user){
            return res.status(409).json({message:'user is already existed'});
        }
       
        if(await emailExists(email)){
         await sendingEmail(email,
      "Welcome to AiGen 🎉",
      `Hello ${name},\n\nYour signup was successful!\n\nThanks,\nTeam AiGen`
            );
        }else{
           
           return res.status(400).json({message:'Invalid Email',success:false});
        }
         const newUser=new userModel({name,email,password});
        newUser.password=await bcrypt.hash(password,10);
        await newUser.save();
        res.status(201).json({message:'signup success',success:true});


    }
    catch{
        res.status(500).json({message:'Internal server error',success:false});
    }
}

const signin=async(req,res)=>{
    try{
        const {email,password}=req.body;
        const user=await userModel.findOne({email});
        const errMsg="Auth failed email or password is wrong"
        if(!user){
            return res.status(403).json({message:errMsg,success:false});
        }
       const isPassEqual=await bcrypt.compare(password,user.password);
       if(!isPassEqual){
            return res.status(403).json({message:errMsg,success:false});
       }
       const jwtToken=jwt.sign({email:user.email,_id:user._id},
        process.env.JWT_SECRET,{expiresIn:'24h'}
       )
       await sendingEmail(email,"Welcome Back to AiGen🎉",`Hello ${user.name},\n\nYour Login was successful!\n\nThanks,\nTeam AiGen`)
       res.status(200).json({message:'signin success',success:true,jwtToken,email,name:user.name});



    }
    catch{
        res.status(500).json({message:'Internal server error',success:false});
    }
}

module.exports={
    signup,signin
}