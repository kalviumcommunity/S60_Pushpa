import { useState } from "react";
import axios from "axios"
function Forget() {
    const [state,setstate]=useState({})
    const [otpd,setotp]=useState(false)
    function change(e) {
        const {name,value}=e
        setstate({...state,[name]:value})
    }
    function otp() {
        console.log(state)
        axios.post("http://localhost:5000/otp",state).then(
            (res)=>{
                sessionStorage.setItem("otp",res.data)
                setotp(true)
            }
        )
    }
    function reset() {
        axios.post("http://localhost:5000/otpvalid",{...state,otp:sessionStorage.getItem("otp"),userotp:toString(this.userotp)}).then(
            (res)=>{
                console.log(res.data)
            }
        )
        
    }
    return(
        <div className=" flex justify-center items-center">
\        <input placeholder="Email" name="email" onChange={(e)=>{change(e.target)}}/>
        <button onClick={otp}>Send otp</button>
        <input  className={!otpd && " hidden"} placeholder="otp" name="userotp" onChange={(e)=>change(e.target)}/>
        <input className={!otpd && " hidden"} placeholder="New password" name="password" onChange={(e)=>change(e.target)}/>
        <button  className={!otpd && " hidden"} onClick={reset}>Done!</button>
        </div>
    )
}
export default Forget;