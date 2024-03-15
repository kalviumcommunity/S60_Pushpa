const mongoose=require("mongoose")
const user=mongoose.Schema({
    name:String,
    password:String,
    email:String
})
const usercoll=mongoose.model("user",user)
module.exports=usercoll;