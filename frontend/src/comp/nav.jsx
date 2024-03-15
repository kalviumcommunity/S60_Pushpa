import { Link } from "react-router-dom";
function Nav() {
    function getCookie(name) {
		let cookieArray = document.cookie.split('; ')
		let cookie = cookieArray.find((row) => row.startsWith(name + '='))
		return cookie ? cookie.split('=')[1] :""
	}
    return(
        <div className=" flex justify-evenly w-full relative h-16 items-center text-xl">
            {/* <img/> */}
            <div><Link to="/">Home</Link></div>
            <div><Link to="/">About</Link></div>
            <div><Link to="/add">Add</Link></div>
            <div className={getCookie("user") ? " hidden" : "absolute right-16 w-24 flex"}>
                <div>
                <Link to={"/sigin"}><button className=" border-white border-2 p-1 m-1">Sign</button></Link>
                </div>
                <div>
                <Link to={"/login"}><button className="p-1 bg-gray-500 m-1">Login</button></Link>
                </div>
            </div>
            <div className={!getCookie() && "hidden"}>
                <button>Logout</button>
            </div>
        </div>
    )
}
export default Nav;