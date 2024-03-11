const monongo=require("mongoose")
function connectDB(uri) {
    monongo.connect(uri).then(()=>{
        console.log("connected")
    }).catch((error)=>{
        console.log(error)
    })
}
function isConnected(){
    return monongo.connection.readyState == 1;
}
module.exports={connectDB,isConnected}