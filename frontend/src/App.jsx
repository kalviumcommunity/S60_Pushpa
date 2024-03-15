import { Route, Routes } from 'react-router-dom'
import './App.css'
import Add from './comp/DataAdd'
import Login from "./comp/login"
import Home from './comp/Home'
import Update from './update'
import Sigin from './comp/sign'
function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/sigin' element={<Sigin/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path='/add' element={<Add/>}/>
      <Route path='/update/:id' element={<Update/>}/>
    </Routes>
     {/* <Add/> */}
    </>
  )
}

export default App
