import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { getCookie } from "./nav";

function Add(){
    const [data,setvalue]=useState({})
    const nav=useNavigate()
    function va(e) {
        const {name,value}=e.target
        const ne={...data}
        ne[name]=value
        setvalue(ne)
    }
    function submit() {
        axios.post("https://s60-pushpa.onrender.com/data",{...data,Created:getCookie("username")}).then(
            (res)=>{
                console.log(res)
                nav("/")
            }
        ).catch((e)=>{console.log(e)})
        setvalue({})
    }
    return(
        <div className="h-screen bg-black flex justify-center items-center">
     <div className="w-96 rounded-2xl bg-slate-900">
  <div className="flex flex-col gap-2 p-8">
  <p className="text-center text-3xl text-gray-300 mb-4">Add the data</p> 
    <input className="bg-slate-900 text-white w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800" 
    name="name"
    onChange={(e)=>{va(e)}} value={data.name}
    placeholder="Name"/>
    
    <input className="bg-slate-900 w-full text-white rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800" 
    name="age"
    onChange={(e)=>{va(e)}} value={data.age}
    placeholder="Age"/>
    

    <input className="bg-slate-900 w-full text-white rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800" 
    name="Place"
    onChange={(e)=>{va(e)}}
    placeholder="Place"/>
    <select name="Catogary" value={"select"} className="bg-slate-900 w-full text-white rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800 ">
        <option value={"Flat-Earther"}>
            Flat-Earther
        </option>
        <option value={"Alien"}>
            Alien
        </option>
        <option value={"Insta-Aliens"}>
            Insta-Aliens
        </option>
    </select>

    <input className="bg-slate-900 w-full text-white rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800" 
    name="image"
    onChange={(e)=>{va(e)}}
    placeholder="image link"/>

    <textarea className="bg-slate-900 w-full text-white rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800" 
    name="Description"
    onChange={(e)=>{va(e)}}
    placeholder="Description"/>
    <button className="cursor-pointer transition-all 
bg-gray-700 text-white px-6 py-2 rounded-lg
border-green-400 
border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
active:border-b-[2px] active:brightness-90 active:translate-y-[2px] hover:shadow-xl hover:shadow-green-300 shadow-green-300 active:shadow-none"
onClick={submit}
>
  submit
</button>
  </div>
</div>
    {/* <button onClick={submit}>Submit</button> */}
</div>
    )
}
export default Add;