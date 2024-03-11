const express=require("express")
const app=express()
const model=require("./model")
app.use(express.json())
app.get("/data",async(req,res)=>{
    const data=await model.find({})
    res.send(data)
    // console.log("bjk")
})
app.post("/data", async (req, res) => {
try{
        const newdata = new model({
            image:"dewj",
            Name:"wait for d=some time...this will be updated at alst of the proojject",
            Age:100,
            ToxicRate:10,//Becuse in this platform all people are dangerose
            Place:"wait for d=some time...this will be updated at alst of the proojject",
            Descripsion:"wait for d=some time...this will be updated at alst of the proojject",
            Precasion:"wait for d=some time...this will be updated at alst of the proojject"
        });
      await newdata.save();
        res.status(401).send({ message: "Pushpa data saved successfully!" });
        }
    catch{
        console.log("error")
        res.status(500).json({message:"error"})
    }
    });
app.put("/data/:id",async (req,res)=>{
    console.log(req.params.id)
        const updated= await model.findOneAndUpdate({_id:req.params.id},req.body)
        res.status(200).send(updated)
})
app.delete("/data/:id",async (req,res)=>{
    console.log(req.params.id)
        const delte= await model.findOneAndDelete({_id:req.params.id})
        res.json(delte)
})
  
module.exports=app