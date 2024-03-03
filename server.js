const express = require('express');
const app = express();
const port = process.env.PUBLIC_PORT;

app.get("/",(req,res)=>{
    res.send("hey go to ping")
})
app.get("/ping",(req,res)=>{
  res.send("pong")
})
app.listen(port, () => {
    console.log(`server running on PORT: ${3000}`);
  });


module.exports = app;
