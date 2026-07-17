import {useNavigate} from 'react-router-dom'
import bgImage from "./images/background-2.jpg"
export default function FirstPage(){
const nav=useNavigate()
    return(
        <div className=' flex justify-center items-center h-screen w-screen bg-cover bg-no-repeat' style={{ backgroundImage: `url(${bgImage})` }}>
            <div className='shadow-[0_0_8px_black] rounded-3xl object-center bg-black/50 max-[500px]:w-screen sm:w-screen md:w-1/3 max-[500px]:h-screen sm:h-screen max-[500px]:rounded-none  md:h-1/2 relative'>
                <button className="bg-white text-red-700 shadow-[0_0_8px_black] rounded-full text-2xl font-bold w-[380px] h-16 absolute top-[100px] left-16 transition duration-300 max-[500px]:left-24 max-[500px]:text-xl max-[500px]:w-[190px] active:text-black hover:scale-105"  onClick={()=>nav("/userConfig")}>Login as user</button>
                <button className="bg-white text-red-700 shadow-[0_0_8px_black] rounded-full text-2xl font-bold w-[380px] h-16 absolute top-[200px] left-16 transition duration-300 max-[500px]:left-24 max-[500px]:text-xl max-[500px]:w-[190px] active:text-black hover:scale-105" onClick={()=>nav("/sellerConfig")}>Login as seller</button>
            </div>
        </div>
    )
}