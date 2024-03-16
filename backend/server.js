const express = require('express');
const app = express();
const {connectDB,isConnected}=require("./Database/db")
const routes=require("./routes/route")
require("dotenv").config()
const port = 5000;
connectDB(process.env.DB_URI)
routes.listen(port,()=>{
  console.log(`server running on PORT: ${port}`);
})
