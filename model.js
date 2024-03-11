const mongoose=require("mongoose")
const schema=mongoose.Schema({
    image:String,
    Name:String,
    Age:Number,
    ToxicRate:Number,
    Place:String,
    Descripsion:String,
    Precasion:String
})
const model=mongoose.model("pushpa",schema)
module.exports=model;