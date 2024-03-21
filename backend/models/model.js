const mongoose=require("mongoose")
const schema=mongoose.Schema({
    image:String,
    Name:String,
    Age:String,
    Place:String,
    Description:String,
    Created:String
})

const model=mongoose.model("pushpa",schema)
module.exports=model;