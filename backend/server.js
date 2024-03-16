const express = require('express');
const app = express();
const {connectDB,isConnected}=require("./db")
const routes=require("./routes/route")
require("dotenv").config()
const port = 5000;
connectDB(process.env.DB_URI)
// app.get("/",(req,res)=>{
//   res.send(isConnected()? '<h1>Connected to db</h1>':'<h1>Not connected yet!</h1>')
// })

routes.listen(port,()=>{
  console.log(`server running on PORT: ${port}`);
})
