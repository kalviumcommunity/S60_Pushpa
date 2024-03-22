import axios from "axios";
import aliens from "../assets/alien.jpeg"
import flate from "../assets/flate.avif"
import insta from "../assets/insta.webp"
import pushpa from "../assets/pushpa.avif"
import { useRef, useState } from "react";
import bala from "../assets/bala.jpg"
import Nav from "./nav";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Link } from "react-router-dom";
function Home(){
    const im=[aliens,flate,insta]
    const [Profile,setprofile]=useState()
    const [data,setdata]=useState([])
    const [load,setload]=useState(true)
    const [index,setindex]=useState(0)
    const ref=useRef()
    const blur=useRef()
    useState(()=>{
        axios.get("https://s60-pushpa.onrender.com/data").then((res)=>{
            setdata(res.data)
        setload(false)
        })
    },[])
    // function go(id,data){
    //         console.log("bkdjbewjk")
    //         ref.current.style.display="no"
    //         // nav("/update/"+id,data)
    // }
    function openDialog(profile) {
        setprofile(profile);
        ref.current.style.display="block"
        blur.current.style.display="none"
    }
    
    function closeDialog() {
        ref.current.style.display="none"
        setprofile("");
    }
    function del(id) {
        axios.delete(`https://s60-pushpa.onrender.com/data/${id}`).then(
            (res)=>{
                console.log(res)
                // location.reload()
            }
        )
    }
    return(
        <div className=" w-full  bg-black text-white" ref={blur}>
        <Nav/>
        <div className=" w-full bg-gray-600 size-96 relative pl-20 pr-20 pt-2 pb-2">
        <ArrowForwardIosIcon onClick={()=>{setindex(index==im.length-1 ? 0 : index+1)}} className=" absolute right-4 top-48"/>
            <img className=" w-full h-full rounded-md" src={im[index]}/>
        <ArrowBackIosIcon onClick={()=>{setindex(index==0 ? im.length-1 : index-1)}} className=" absolute left-4 top-48"/>
        </div>
        <p className=" text-3xl text-center  hover:text-purple-500 mt-8">This platform will save you from the aliens,flatearther and instagram aliens </p>
        <p className=" text-2xl text-center font-thin">And Here is the people will save you</p>
        <div className=" flex justify-center flex-wrap">
            <div className=" w-52 bg-gray-500 p-2 text-center rounded-2xl m-11  ">
            <img src={pushpa} className=" h-20 w-20 rounded-full relative left-1/4"/>
                <p className=" text-2xl left-1/2">Pushapa</p>
                <p className=" font-semibold text-sm">Kalvian</p>
                <p className=" line-clamp-6">He is the guy who saved so many people from aliens where they came from other galaxys if you see his 
                whatsapp all aliens groups will there somethime nasea people will come and ask his advises
                </p>
            </div>
            <div className=" w-52 bg-gray-500 p-2 text-center rounded-2xl m-11">
                <img src={bala} className=" h-20 w-20 rounded-full relative left-1/4"/>
                <p className=" text-2xl">Balaya Babu</p>
                <p className=" font-semibold text-sm">Kalvian</p>
                <p className=" line-clamp-6">He is the guy who saved so many people from aliens where they came from other galaxys if you see his 
                whatsapp all aliens groups will there somethime nasea people will come and ask his advises
                </p>
            </div>            
            <div>
            </div>
        </div>
        <h1>The aliens and insta aliens</h1>
        <select  className=" text-black w-96 bg-slate-400 h-12 rounded-3xl">
            <option value="aliens">aliens</option>
            <option value="insta aliens">Insta aliens</option>
            <option value="flatearthers">flatearthers</option>
        </select>
        <div className=" flex flex-wrap justify-around">
            {!load ? data.map((i,j)=>(
                <div key={j} className="profile flex justify-evenly  bg-black-600 border-white border-2  p-4  rounded-3xl  shadow-white shadow-md m-4" onClick={()=>openDialog(i)}>
        <div  className=" flex content-center items-center photo m-1">
            <img src={i.image} className=" size-24 rounded-full"/>
        </div>
        <div className=" w-60">
            <p  className=" text-2xl">{i.Name}</p>
            <p className=" font-mono text-xl p-2">Age:{i.Age || "♾️"}</p>
            <p>{i.Place}</p>
            <p className="line-clamp-1 p">{i.Description}</p>
            {/* <div className="scale"><div className="toxic"></div></div>*/}
            
     </div>
     </div>
            )): (<h1 className=" text-white">loading...</h1>)}
            {Profile && (
        <div className=" h-dvh w-screen fixed top-0 backdrop-blur-lg">
         <dialog className="shadow-xl shadow-white p-4 " ref={ref}>
           <button onClick={closeDialog} className="absolute top-0 right-0 p-2 text-white">
             ❌
           </button>
           <div className="flex">
             <div>
               <img src={Profile.image} className="h-96 w-80 rounded-2xl relative right-14 bottom-4" alt={Profile.name} />
             </div>
             <div className="grid grid-rows-3 ml-4">
               <p className="text-4xl text-white">Name: {Profile.Name}</p>
               <p className="text-4xl text-white">Age: {Profile.Age || "♾️"}</p>
               <p className="text-4xl text-white">Place: {Profile.Place || "Unknown"}</p>
               <div>
             <Link to={`/update/${Profile._id}`}><button className=" bg-green-500 text-white p-2 rounded-xl">Update</button></Link>
             <button onClick={()=>{del(Profile._id)}} className=" bg-red-500 text-white p-2 rounded-xl ml-4">Delete</button>
</div>

             </div>
           </div>
           <div className=" absolute bottom-10 left-6 ">
             <p className="text-xl text-white">{Profile.Description}</p>
           </div>
         </dialog>
         </div>
       )}
        </div>
        </div>
    )
}
export default Home;