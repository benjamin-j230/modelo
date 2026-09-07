import {useNavigate} from 'react-router-dom'
import bgImage from "./images/background-2.jpg"
import { useState } from 'react'
export default function UserConfig(){
    const nav=useNavigate()
    function login(){
        localStorage.removeItem("role")
        localStorage.setItem("role","user")
        nav("/login")
    }
    return(
        <div className=' flex justify-center items-center h-screen w-screen bg-cover bg-no-repeat' style={{ backgroundImage: `url(${bgImage})` }}>
            <div className='shadow-[0_0_8px_black] rounded-3xl object-center bg-black/50 [@media(min-width:700px)_and_(max-width:1030px)]:w-[600px] max-[500px]:w-full sm:w-screen md:w-1/3 max-[500px]:h-screen sm:h-screen max-[500px]:rounded-none mx-auto  md:h-1/2 relative flex flex-col justify-center items-center gap-[20px]'>
            <h1 className='text-red-500 font-bold absolute top-[20px] text-2xl'>User</h1>
           <button className="bg-white text-red-700 shadow-[0_0_8px_black] rounded-full text-2xl font-bold w-[380px] h-16  transition duration-300 max-[500px]:text-xl max-[500px]:w-[190px] active:text-black hover:scale-105 "  onClick={()=>nav("/register")}>Register</button>

<button className="bg-white text-red-700 shadow-[0_0_8px_black] rounded-full text-2xl font-bold w-[380px] h-16 duration-300 max-[500px]:text-xl max-[500px]:w-[190px] active:text-black hover:scale-105"  onClick={login}>login</button>
            </div>
        </div>
    )
}