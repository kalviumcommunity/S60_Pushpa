const express = require('express');
const app = express();
const {connectDB,isConnected}=require("./Database/db")
const routes=require("./routes/route")
require("dotenv").config()
const port = 5000;
app.use("/",routes)
app.get("/ping",(req,res)=>{
  res.send("pong")
})
connectDB(process.env.DB_URI)
app.listen(port,()=>{
  console.log(`server running on PORT: ${port}`);
})
