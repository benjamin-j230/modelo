import bgImage from "./images/background-2.jpg"
import { useContext } from "react"
import thisContext from "./context"
import axios from "axios"
import {useNavigate} from "react-router-dom"
export default function AddSecondaryAddress(){
    const { password, setPassword, house, setHouse, city, setCity, district, setDistrict, state, setState, pin, setPin, mobile, setMobile } = useContext(thisContext)
    const nav=useNavigate()
    async function addAddress(){
        try{
            if(house!=""&&city!=""&&district!=""&&state!=""&&pin!=""){
            const res=await axios.post(`http://localhost:5000/user/addSecondaryAddress`,{
                house:house,
                city:city,
                district:district,
                state:state,
                pinCode:pin
            },{
                headers:{
                    authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            if(res.data.success){
                alert("new address added")
                nav("/viewModel")
            }
        }
        else{
            alert("Form not filled fully")
        }
        }catch(err){
            console.log(err)
        }
    }
    return(
        <div className=' flex justify-center items-center h-screen w-screen bg-cover bg-no-repeat overflow-hidden' style={{ backgroundImage: `url(${bgImage})` }}>
                    <div className='flex justify-center shadow-[0_0_8px_black] rounded-3xl object-center bg-black/50 max-[500px]:w-screen w-[600px] max-[500px]:h-screen sm:h-screen max-[500px]:rounded-none min-[700px]:max-[1300px]:w-[600px]  md:h-1/2 relative'>
                    <label className="absolute top-[90px] left-[30px] text-white text-lg font-semibold max-[500px]:top-[120px]">Address:</label>
                    <input type="text" placeholder="House / Building Name" className="w-[260px] h-8 absolute top-[90px] rounded-2xl border-2 focus:border-black focus:scale-105 max-[500px]:w-[180px] max-[500px]:left-[130px] max-[500px]:text-md max-[500px]:top-[120px] pl-2" onChange={(e) => setHouse(e.target.value)} />
                    {house === "" ? <span className="text-white absolute top-[90px] right-[100px] max-[500px]:right-[50px] max-[500px]:top-[120px] ">**</span> : null}
                    <input type="text" placeholder="City" className="w-[260px] h-8 absolute top-[130px] rounded-2xl border-2 focus:border-black focus:scale-105 max-[500px]:w-[180px] max-[500px]:left-[130px] max-[500px]:text-md max-[500px]:top-[160px] pl-2" onChange={(e) => setCity(e.target.value)} />
                    <input type="text" placeholder="District" className="w-[260px] h-8 absolute top-[170px] rounded-2xl border-2 focus:border-black focus:scale-105 max-[500px]:w-[180px] max-[500px]:left-[130px] max-[500px]:text-md max-[500px]:top-[200px]" onChange={(e) => setDistrict(e.target.value)} />
                    {district === "" ? <span className="text-white absolute top-[170px] right-[100px] max-[500px]:right-[50px] max-[500px]:top-[200px]">**</span> : null}
                    <input type="text" placeholder="State" className="w-[260px] h-8 absolute top-[210px] rounded-2xl border-2 focus:border-black focus:scale-105 max-[500px]:w-[180px] max-[500px]:left-[130px] max-[500px]:text-md max-[500px]:top-[240px] pl-2" onChange={(e) => setState(e.target.value)} />
                    {state === "" ? <span className="text-white absolute top-[210px] right-[100px] max-[500px]:right-[50px] max-[500px]:top-[240px]">**</span> : null}
                    <input type="text" placeholder="PIN Code" className="w-[260px] h-8 absolute top-[250px] rounded-2xl border-2 focus:border-black focus:scale-105 max-[500px]:w-[180px] max-[500px]:left-[130px] max-[500px]:text-md max-[500px]:top-[280px] pl-2" onChange={(e) => setPin(e.target.value)} />
                    {pin.length != 6 ? <span className="text-white absolute top-[250px] right-[100px]  max-[500px]:right-[50px] max-[500px]:top-[280px]">**</span> : null}
                     <button className="absolute bottom-[20px] right-[60px] bg-white h-[30px] w-[100px] text-red-700 font-bold shadow-[0 0 8px black] max-[500px]:bottom-[210px] active:text-black hover:scale-105" onClick={addAddress} >Add address</button>
                
        </div>
        </div>
    )
}