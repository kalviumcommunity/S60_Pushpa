// import axios from "axios";
// import { useRef, useState } from "react";
// import jat from "../assets/jat.jpg";
// import bala from "../assets/bala.jpg";
// import Nav from "./nav";
// import { useNavigate } from "react-router-dom";

// function Home() {
//   const nav = useNavigate();
//   const [data, setData] = useState([]);
//   const [selectedProfile, setSelectedProfile] = useState(null); // New state to keep track of selected profile
//   const ref = useRef();

//   useState(() => {
//     axios.get("http://localhost:5000/data").then((res) => {
//       setData(res.data);
//     });
//   }, []);

//   function openDialog(profile) {
//     setSelectedProfile(profile);
//     ref.current.style.display = "block"; // Show the dialog
//   }

//   function closeDialog() {
//     setSelectedProfile(null);
//     ref.current.style.display = "none"; // Hide the dialog
//   }

//   return (
//     <div className="w-full bg-black text-white">
//       <Nav />
//       <div className="w-full bg-gray-600 size-96">
//         {/* Some content here */}
//       </div>
//       {/* Rest of your JSX */}
//       <div className="flex flex-wrap justify-around">
//         {data.map((profile, index) => (
//           <div
//             key={index}
//             className="profile flex justify-evenly bg-black-600 border-white border-2 p-4 rounded-3xl shadow-white shadow-md"
//             onClick={() => openDialog(profile)}
//           >
//             {/* Profile card content */}
//           </div>
//         ))}
//       </div>

//       {/* Dialog */}
//       
//     </div>
//   );
// }

// export default Home;
