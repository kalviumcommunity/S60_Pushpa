import { useState, useEffect } from 'react'
import axios from 'axios'

const API_URI = "https://s60-pushpa.onrender.com/data"

function Filter() {
	const [response, setResponse] = useState([])
	const [selected, setSelected] = useState('') // Initialize selected state with default value

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await axios.get(API_URI)
                console.log(res.data)
				setResponse(res.data)
			} catch (err) {
				console.log(err)
			}
		}
		fetchData()
	}, [])
	const change = (e) => {
		setSelected(e.target.value)
	}

	let countinent = []
	return (
		<div className=' w-screen h-screen bg-black '>
			<select value={selected} onChange={change} className=' bg-white w-72 h-10 rounded-3xl border-none relative left-16 m-5'>
				<option value="" className=' '>Choose the continent</option>
				{response.map((user) => {
					if (!countinent.includes(user.Created)) {
						countinent.push(user.Created)
					}
				})}
				{countinent.map((user) => (
					<option key={user} value={user}>
						{user}
					</option>
				))}
			</select>
            {/*      */}
            <div className=" flex flex-wrap justify-around text-white">
			{response
				.filter((user) => user.Created === selected)
				.map((i,j) => (
                <div key={j} className="profile flex justify-evenly  bg-black-600 border-white border-2  p-4  rounded-3xl  shadow-white shadow-md m-4">
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

            ))}
</div>
</div>
            )
}

export default Filter
