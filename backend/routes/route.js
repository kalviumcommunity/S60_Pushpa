const express=require("express")
const cookie_parser=require("cookie-parser")
const app=express()
const path=require("path")
const jwt=require("jsonwebtoken")
const model=require("../models/model")
const user=require("../models/userschema")
const nodemailer=require("nodemailer")
const cores=require("cors")
const Joi = require("joi")
const crypto=require("crypto")
const otpGenerator = require('otp-generator')
const signvalid=Joi.object({
    name:Joi.string().required(),
    email:Joi.string().email(),
    password:Joi.string().required()
})
const loginvalid=Joi.object({
    email:Joi.string().email(),
    password:Joi.string().required()
})
const data=Joi.object({
    Name:Joi.string().required(),
    Age:Joi.number().integer().required(),
    Place:Joi.string().required(),
    Description:Joi.string().required(),
    image:Joi.string().required()

})
function hashOTP(otp) {
    const hash = crypto.createHash('sha256');
    hash.update(otp);
    return hash.digest("hex");
}
app.use(express.json())
app.use(cookie_parser())
app.use(cores())
app.get("/data",async(req,res)=>{
    const data=await model.find({})
    res.send(data)
})

app.post("/data", async (req, res) => {
// try{
    
    const {name,age,Place,Description,Created,image} = req.body
            if(!data.validate({
                image:image,
                Name:name,
                Age:age,
                Place:Place,
                Description:Description
                }).error){
                    const newdata = new model({
                        image:image,
                        Name:name,
                        Age:age,
                        Place:Place,
                        Description:Description,
                        Created:Created
                    });
                await newdata.save();
                res.status(201).send({ message: "Pushpa data saved successfully!" });  }
                else{
                    res.status(200).send(data.validate({
                        image:image,
                        Name:name,
                        Age:age,
                        Place:Place,
                        Description:Description
                        }).error.message)
                }      
        // }
     
        
    // catch{
    //     console.log("error")
    //     res.status(500).json({message:"error"})
    // }
    });
app.put("/data/:id",async (req,res)=>{
        await model.findOneAndUpdate({_id:req.params.id},req.body)
        res.status(200).send({message:"Pushapa update sucessfull"})
})
app.delete("/data/:id",async (req,res)=>{
    console.log(req.params.id)
        const delte= await model.findOneAndDelete({_id:req.params.id})
        res.json(delte)
})

app.post("/otp",async(req,res)=>{
    // var transporter = nodemailer.createTransport({
    //     service: 'gmail',
    //     auth: {
    //       user: 'mohanavamsi16@gmail.com',
    //       pass: 'vamsi0614'
    //     }
    //   });
const otp=otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false,lowerCaseAlphabets:false });
    
const transporter = nodemailer.createTransport({
        service: "outlook",
        auth: {
          user: "mohanavamsi16@outlook.com",
          pass: "fmyeynjakqxqxtsm",
        }
      });
      var mailOptions = {
        from: "mohanavamsi16@outlook.com",
        to: req.body.email,
        subject: 'Your otp '+otp,
        html: '<h1>Hey welcome</h1> <p>Here is your otp </p>'+`<h2> '${otp}'</h2>`
      };
      await transporter.sendMail(mailOptions)
      console.log("sended")
      res.send(hashOTP(otp))
})
app.post("/otpvalid",async (req,res)=>{
    const otp=req.body.userotp
    const hasedotp=req.body.otp
    if (hashOTP((otp))==hasedotp){
        const update=await user.findOneAndUpdate({email:req.body.email},{password:req.body.password})
        console.log(update)
        if (!update){
            res.send("user not in database ")
        }
        else{
        res.send("done")
        }
    }
    else{
        res.send("notvalid")
    }
})
app.post("/sign",async (req,res)=>{
    try{
  const check=await user.findOne({email:req.body.email})
  if(check){
    res.json({message:"the custmore is already in db"})
  }
  else{
  const Userdata = new user({
   name:req.body.name,
   email:req.body.email,
   password:req.body.password,
});
if (!signvalid.validate(req.body).error){
    await Userdata.save();
    res.status(201).send({ message: "Pushpa data saved successfully!" });
    }
else{
    res.json({message:uservalid.validate(req.body).error.message})
}}}
catch{
    res.status(400).send("something wrong")
}
})
app.post("/login",async (req,res)=>{
        const check=await user.findOne({email:req.body.email})
        console.log(check)
        if(check){
            if(!loginvalid.validate(req.body).error){
            if (req.body.password==check.password){
                res.cookie("username",req.body.email)
                res.json({...check,message:"ok login"})
        }
        else{
            res.status(200).json({message:"password is wrong"})
        }
       }
        else{
            res.status(404).json({message:uservalid.validate(req.body).error.message})
        }
       
    }
    else{
        res.json({message:"user not in database please sign"})
    }
        
})
  
module.exports=app