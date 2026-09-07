import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import bgImage from "./images/background-2.jpg"
import { useContext } from 'react'
import thisContext from './context'
export default function UserRegister() {
    const { password, setPassword, house, setHouse, city, setCity, district, setDistrict, state, setState, pin, setPin, mobile, setMobile } = useContext(thisContext)
    const nav = useNavigate()
    const [showRules, setShowRules] = useState(false)
    const validations = {
        length: password.length >= 6,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /\d/.test(password),
        special: /[@$!%*?&#^()_+\-=[\]{};':"\\|,.<>/?]/.test(password),
    };

    function handleNext() {
        const isPasswordValid =
            validations.length &&
            validations.uppercase &&
            validations.lowercase &&
            validations.number &&
            validations.special;



        if (house === "") {
            alert("Please enter your house/building name")
        }
        if (district === "") {
            alert("Please enter your district")
        }
        if (state === "") {
            alert("Please enter your state")
        }
        if (pin.length != 6) {
            alert("Check your pin code")
        }
        if (mobile.length != 10) {
            alert("Check your mobile number")
        }
        if (house !== "" && district !== "" && state !== "" && pin.length == 6 && mobile.length == 10 && isPasswordValid) {
            localStorage.removeItem("role")
            localStorage.setItem("role", "user")
            nav("/emailVerification")
        }

    }



    return (
        <div className=' flex justify-center items-center h-screen w-screen bg-cover bg-no-repeat overflow-hidden' style={{ backgroundImage: `url(${bgImage})` }}>
            <div className='flex justify-center shadow-[0_0_8px_black] rounded-3xl object-center bg-black/50 max-[500px]:w-screen sm:w-screen max-[500px]:h-screen sm:h-screen max-[500px]:rounded-none min-[700px]:max-[1300px]:w-[600px]  md:h-1/2 relative'>



                <label className="absolute top-[50px] left-[30px] text-white text-lg font-semibold max-[500px]:top-[80px]" >password: </label>
                <input type="password" value={password} onFocus={() => setShowRules(true)} onBlur={() => setShowRules(false)} placeholder="user password" className="w-[260px] h-8 absolute top-[50px] rounded-2xl border-2 focus:border-black focus:scale-105 max-[500px]:w-[180px] max-[500px]:left-[130px] max-[500px]:text-md max-[500px]:top-[80px]" onChange={(e) => setPassword(e.target.value)} ></input>{
                    showRules == false ? null : (
                        <ul className='w-[260px] absolute left-[120px] font-semibold [@media(min-width:500px)]: left-[50px] '>
                            <li className={`absolute top-[100px] max-[500px]:top-[120px] ${validations.length ? "text-green-500" : "text-red-500"}`} >Atleast 6 characters</li>
                            <li className={`absolute top-[120px] max-[500px]:top-[140px] ${validations.uppercase ? "text-green-500" : "text-red-500"}`} >Include atleast one uppercase letter</li>
                            <li className={`absolute top-[140px] max-[500px]:top-[160px] ${validations.lowercase ? "text-green-500" : "text-red-500"}`} >Include atleast one lowercase letter</li>
                            <li className={`absolute top-[160px] max-[500px]:top-[180px] ${validations.number ? "text-green-500" : "text-red-500"}`} >Include numbers</li>
                            <li className={`absolute top-[180px] max-[500px]:top-[200px] ${validations.special ? "text-green-500" : "text-red-500"}`} >Include special characters</li>
                        </ul>
                    )
                }

                {showRules == true ? null : (<><label className="absolute top-[90px] left-[30px] text-white text-lg font-semibold max-[500px]:top-[120px]">Address:</label>
                    <input type="text" placeholder="House / Building Name" className="w-[260px] h-8 absolute top-[90px] rounded-2xl border-2 focus:border-black focus:scale-105 max-[500px]:w-[180px] max-[500px]:left-[130px] max-[500px]:text-md max-[500px]:top-[120px]" onChange={(e) => setHouse(e.target.value)} />
                    {house === "" ? <span className="text-white absolute top-[90px] right-[100px] max-[500px]:right-[50px] max-[500px]:top-[120px] ">**</span> : null}
                    <input type="text" placeholder="City" className="w-[260px] h-8 absolute top-[130px] rounded-2xl border-2 focus:border-black focus:scale-105 max-[500px]:w-[180px] max-[500px]:left-[130px] max-[500px]:text-md max-[500px]:top-[160px]" onChange={(e) => setCity(e.target.value)} />
                    <input type="text" placeholder="District" className="w-[260px] h-8 absolute top-[170px] rounded-2xl border-2 focus:border-black focus:scale-105 max-[500px]:w-[180px] max-[500px]:left-[130px] max-[500px]:text-md max-[500px]:top-[200px]" onChange={(e) => setDistrict(e.target.value)} />
                    {district === "" ? <span className="text-white absolute top-[170px] right-[100px] max-[500px]:right-[50px] max-[500px]:top-[200px]">**</span> : null}
                    <input type="text" placeholder="State" className="w-[260px] h-8 absolute top-[210px] rounded-2xl border-2 focus:border-black focus:scale-105 max-[500px]:w-[180px] max-[500px]:left-[130px] max-[500px]:text-md max-[500px]:top-[240px]" onChange={(e) => setState(e.target.value)} />
                    {state === "" ? <span className="text-white absolute top-[210px] right-[100px] max-[500px]:right-[50px] max-[500px]:top-[240px]">**</span> : null}
                    <input type="text" placeholder="PIN Code" className="w-[260px] h-8 absolute top-[250px] rounded-2xl border-2 focus:border-black focus:scale-105 max-[500px]:w-[180px] max-[500px]:left-[130px] max-[500px]:text-md max-[500px]:top-[280px]" onChange={(e) => setPin(e.target.value)} />
                    {pin.length != 6 ? <span className="text-white absolute top-[250px] right-[100px]  max-[500px]:right-[50px] max-[500px]:top-[280px]">**</span> : null}
                </>)}

                <label className="absolute top-[290px] left-[30px] text-white text-lg font-semibold max-[500px]:top-[320px]" >Mobile: </label>
                <input type="text" placeholder="Mobile Number" className="w-[260px] h-8 absolute top-[290px] rounded-2xl border-2 focus:border-black focus:scale-105 max-[500px]:w-[180px] max-[500px]:left-[130px] max-[500px]:text-md max-[500px]:top-[320px]" onChange={(e) => setMobile(e.target.value)} ></input>
                {mobile.length != 10 ? <span className="text-white absolute top-[290px] right-[100px] max-[500px]:right-[50px] max-[500px]:top-[320px]">**</span> : null}
                <button className="absolute bottom-[20px] right-[60px] bg-white h-[30px] w-[50px] text-red-700 font-bold shadow-[0 0 8px black] max-[500px]:bottom-[210px] active:text-black hover:scale-105" onClick={handleNext} >next</button>


            </div>
        </div>
    )
}