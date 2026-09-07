import bgImage from "./images/background-2.jpg"
import { useState } from "react"
import axios from "axios"
import thisContext from "./context"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"
export default function Login() {
    const nav = useNavigate()
    const { email, password, setEmail, setPassword,emailLogin,setEmailLogin } = useContext(thisContext)
    async function handleNext() {
        try {
            setEmailLogin(false)
            const res = await axios.post("http://localhost:5000/user/login", {
                email: email,
                password: password,
                setRole: localStorage.getItem("role")
            })
            
            localStorage.setItem("token", res.data.token)
            if (localStorage.getItem("role") === "user") {
                nav("/userPage")
            }
            else if (localStorage.getItem("role") === "seller") {
                nav("/sellerView")
            }
        }
        catch (err) {
            if (err.response?.status === 401) {
                alert(err.response.data.message)
            }
        }

    }

    async function handleEmailLogin() {
        try{
            setEmailLogin(true)
            const res=await axios.post(`http://localhost:5000/user/register`,
                {
                    role:"login",
                    setRole:localStorage.getItem("role")
                }
            )
            window.location.href = res.data.url;
        }
        catch(err){
            console.log(err)
        }
    }

    return (
        <div className=' flex justify-center items-center h-screen w-full bg-cover bg-no-repeat' style={{ backgroundImage: `url(${bgImage})` }}>
            <div className='flex justify-center shadow-[0_0_8px_black] rounded-3xl object-center bg-black/50 justify w-[500px] max-[500px]:w-full max-[500px]:h-screen sm:h-screen max-[500px]:rounded-none overflow-x-hidden md:h-1/2 min-[700px]:max-[1030px]:w-[600px] relative'>

                <h1 className='text-red-500 font-bold absolute top-[20px] text-2xl'>{localStorage.getItem("role")} login</h1>
                <label className="absolute top-[80px] left-[30px] text-white text-lg font-semibold max-[500px]:top-[140px] max-w-full" >Email: </label>
                <input type="text" placeholder="Email" className="w-[260px] h-8 absolute top-[80px] rounded-2xl border-2 focus:border-black focus:scale-105 max-[500px]:w-[180px] max-[500px]:left-[130px] max-[500px]:text-md max-[500px]:top-[140px] max-w-full" onChange={(e) => setEmail(e.target.value)} ></input>

                <label className="absolute top-[130px] left-[30px] text-white text-lg font-semibold max-[500px]:top-[180px] max-w-full" >Password: </label>
                <input type="password" placeholder="Password" className="w-[260px] h-8 absolute top-[130px] rounded-2xl border-2 focus:border-black focus:scale-105 max-[500px]:w-[180px] max-[500px]:left-[130px] max-[500px]:text-md max-[500px]:top-[180px] max-w-full" onChange={(e) => setPassword(e.target.value)} ></input>


                <button className="absolute bottom-[150px] max-[500px]:bottom-[300px] right-[120px] bg-white h-[30px] w-[50px] text-red-700 font-bold shadow-[0 0 8px black] max-[500px]:bottom-[450px] max-[500px]:right-[40px] active:text-black hover:scale-105 max-w-full" onClick={handleNext} >next</button>

                <p className=" absolute bottom-[100px] max-[500px]:bottom-[300px] text-gray-500  font-xl ">or</p>

                <div className="h-[1px] w-[90%] bg-gray-500 absolute bottom-[100px] max-[500px]:bottom-[290px] max-w-full "></div>

                <div className="flex h-[10px] w-[300px] items-center justify-center absolute bottom-[60px] max-[500px]:bottom-[240px] mx-auto ">
                    <button className="px-4 py-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150 bg-[oklch(21%_0.034_264.665)] max-w-full " onClick={handleEmailLogin} >
                        <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-6 h-6" loading="lazy" alt="google logo" />
                        <span>Login with Google</span>
                    </button>
                </div>

            </div>
        </div>
    )

}