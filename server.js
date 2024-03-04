const express = require('express');
const app = express();
const port = 5050;
app.get("/",(req,res)=>{
    res.send("hey go to ping")
})
app.get("/ping",(req,res)=>{
  res.send("pong")
})
app.listen(port, () => {
    console.log(`server running on PORT: ${port}`);
  });


module.exports = app;
