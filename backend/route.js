const express=require("express")
const cookie_parser=require("cookie-parser")
const app=express()
const path=require("path")
const jwt=require("jsonwebtoken")
const model=require("./model")
const user=require("./userschema")
const cores=require("cors")
const Joi = require("joi")
const signvalid=Joi.object({
    name:Joi.string().required(),
    email:Joi.string().email(),
    password:Joi.string().required()
})
app.use(cores("*"))
const loginvalid=Joi.object({
    email:Joi.string().email(),
    password:Joi.string().required()
})
const data=Joi.object({
    Name:Joi.string().required(),
    Age:Joi.number().integer().required(),
    Place:Joi.string().required(),
    Descripsion:Joi.string().required(),
    Precasion:Joi.string().required(),
    ToxicRate:Joi.string().required()
})
app.use(express.json())
app.use(cookie_parser())

app.get("/data",async(req,res)=>{
    const data=await model.find({})
    res.send(data)
})
app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/frontend/index.html")
})
app.post("/data", async (req, res) => {
try{
    const {name,age,toxicscale,Place,Descripsion,Catogary,image} = req.body
        const newdata = new model({
            image:image,
            Name:name,
            Age:age,
            ToxicRate:toxicscale,
            Place:Place,
            Description:Descripsion,
            Catogary:Catogary
        });
        if(!data.validate(newdata)){
            await newdata.save();
            res.status(201).send({ message: "Pushpa data saved successfully!" });
        }
        else{
            res.json({message:"Data not valid"})
        }
        }
    catch{
        console.log("error")
        res.status(500).json({message:"error"})
    }
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
app.post("/sign",async (req,res)=>{
    try{
  const check=await user.findOne({email:req.body.email})
  if(check){
    res.json({message:"the custmore is already in db"})
  }
  else{
  const userdata = new user({
   name:req.body.name,
   email:req.body.email,
   password:req.body.password
});
if (!signvalid.validate(req.body).error){
    await userdata.save();
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
                const token=jwt.sign(req.body,"secret")
                res.cookie("username",req.body.name)
                res.cookie("token",token)
                res.json({message:"ok login"})
        }
        else{
            res.json({message:"password is wrong"})
        }
        
       }
        else{
            res.json({message:uservalid.validate(req.body).error.message})
        }
       
    }
    else{
        res.json({message:"user not in database please sign"})
    }
        
})
  
module.exports=app
