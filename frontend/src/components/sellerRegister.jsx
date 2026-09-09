import bgImage from "./images/background-2.jpg"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { useContext } from "react"
import thisContext from "./context"
export default function SellerRegister() {
    const nav=useNavigate()
    const {shop,setShop,password,setPassword,street,setStreet,city,setCity,state,setState,pin,setPin,mobile,setMobile,seller,setSeller}=useContext(thisContext)
    console.log(seller)
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

        if (shop === "") {
            alert("Please enter your house/building name")
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
        if (shop !== "" && state !== "" && pin.length == 6 && mobile.length == 10 && isPasswordValid) {
            localStorage.removeItem("role")
            localStorage.setItem("role","seller")
            nav("/emailVerification")
        }}
    

    return (
        <div className=' flex justify-center items-center h-screen w-full bg-cover bg-no-repeat overflow-x-hidden' style={{ backgroundImage: `url(${bgImage})` }}>
            <div className='flex justify-center shadow-[0_0_8px_black] rounded-3xl object-center bg-black/50  w-[600px] max-w-full min-[700px]:max-[1030px]:w-[600px] max-[500px]:h-screen sm:h-screen max-[500px]:rounded-none  md:h-1/2 relative'>
                <label className="absolute top-[50px] left-[10px] max-w-full text-white text-lg font-semibold max-[500px]:top-[100px]" >{seller?seller:"Shop name"}: </label>
                <input type="text" placeholder={seller?seller:"shop name"} className="w-[260px] h-8 absolute top-[50px] max-w-full rounded-2xl border-2 focus:border-black focus:scale-105 max-[500px]:w-[180px] max-[500px]:left-[130px] max-[500px]:text-md max-[500px]:top-[100px] pl-2" onChange={(e) => setShop(e.target.value)}></input>
                <label className="absolute top-[90px] left-[10px] max-w-full text-white text-lg font-semibold max-[500px]:top-[140px]" >Password: </label>
               <input type="password" value={password} onFocus={() => setShowRules(true)} onBlur={() => setShowRules(false)} placeholder="user password" className="w-[260px] max-w-full h-8 absolute top-[90px] rounded-2xl border-2 focus:border-black focus:scale-105 max-[500px]:w-[180px] max-[500px]:left-[130px] max-[500px]:text-md max-[500px]:top-[140px] pl-2" onChange={(e) => setPassword(e.target.value)} ></input>{
                    showRules == false ? null : (
                        <ul className='w-[260px] max-w-full absolute left-[120px] font-semibold '>
                            <li className={`absolute top-[120px] max-[500px]:top-[180px] ${validations.length ? "text-green-500" : "text-red-500"}`} >Atleast 6 characters</li>
                            <li className={`absolute top-[140px] max-[500px]:top-[200px] ${validations.uppercase ? "text-green-500" : "text-red-500"}`} >Include atleast one uppercase letter</li>
                            <li className={`absolute top-[160px] max-[500px]:top-[220px] ${validations.lowercase ? "text-green-500" : "text-red-500"}`} >Include atleast one lowercase letter</li>
                            <li className={`absolute top-[180px] max-[500px]:top-[240px] ${validations.number ? "text-green-500" : "text-red-500"}`} >Include numbers</li>
                            <li className={`absolute top-[200px] max-[500px]:top-[260px] ${validations.special ? "text-green-500" : "text-red-500"}`} >Include special characters</li>
                        </ul>
                    )
                }

               {showRules == true ? null : (<> <label className="absolute top-[130px] left-[10px] text-white text-lg font-semibold max-w-full max-[500px]:top-[180px]">{seller=="username"?"Address":"Shop address"}:</label>
                <input type="text" placeholder="Street" className="w-[260px] max-w-full h-8 absolute top-[130px] rounded-2xl border-2 focus:border-black focus:scale-105 max-[500px]:w-[180px] max-[500px]:left-[130px] max-[500px]:text-md max-[500px]:top-[180px] pl-2" onChange={(e) => setStreet(e.target.value)} />
                <input type="text" placeholder="City" className="w-[260px] max-w-full h-8 absolute top-[170px] rounded-2xl border-2 focus:border-black focus:scale-105 max-[500px]:w-[180px] max-[500px]:left-[130px] max-[500px]:text-md max-[500px]:top-[220px] pl-2" onChange={(e) => setCity(e.target.value)} />
                <input type="text" placeholder="State" className="w-[260px] max-w-full h-8 absolute top-[210px] rounded-2xl border-2 focus:border-black focus:scale-105 max-[500px]:w-[180px] max-[500px]:left-[130px] max-[500px]:text-md max-[500px]:top-[260px] pl-2" onChange={(e) => setState(e.target.value)} />
                {state === "" ? <span className="text-white absolute top-[200px] right-[100px] max-[500px]:right-[30px] max-[500px]:top-[260px] ">**</span> : null}
                <input type="text" placeholder="PIN Code" className="w-[260px] max-w-full h-8 absolute top-[250px] rounded-2xl border-2 focus:border-black focus:scale-105 max-[500px]:w-[180px] max-[500px]:left-[130px] max-[500px]:text-md max-[500px]:top-[300px] pl-2" onChange={(e) => setPin(e.target.value)} />{pin.length != 6 ? <span className="text-white absolute top-[240px] right-[100px] max-[500px]:right-[30px] max-[500px]:top-[300px] ">**</span> : null}

 </>)}
                <label className="absolute top-[290px] left-[10px] text-white text-lg font-semibold max-w-full max-[500px]:top-[340px]" >Mobile: </label>
                <input type="text" placeholder="Mobile Number" className="w-[260px] max-w-full h-8 absolute top-[290px] rounded-2xl border-2 focus:border-black focus:scale-105 max-[500px]:w-[180px] max-[500px]:left-[130px] max-[500px]:text-md max-[500px]:top-[340px] pl-2" onChange={(e) => setMobile(e.target.value)} ></input>
                {mobile.length != 10 ? <span className="text-white absolute top-[280px] right-[100px] max-[500px]:right-[30px] max-[500px]:top-[340px] ">**</span> : null}


                <button className="absolute bottom-[20px] right-[60px] bg-white h-[30px] w-[50px] text-red-700 font-bold shadow-[0 0 8px black] max-[500px]:bottom-[210px] active:text-black hover:scale-105" onClick={handleNext} >next</button>
            </div>
        </div>
    )
}