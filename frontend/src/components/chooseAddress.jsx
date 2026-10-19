import { useContext } from "react"
import thisContext from "./context"
import { useNavigate, useLocation } from "react-router-dom";
export default function ChooseAddress(){
    const nav=useNavigate()
    const loc=useLocation()
    const {primaryAddress,secondaryAddressCh,addressType,setAddressType}=useContext(thisContext)
    function handlePrimaryAddress(){
        setAddressType("primary")
    }
    function handleSecondaryAddress(){
        setAddressType("secondary")
    }
    function handleSubmit(){
      if (addressType === "") {
        alert("Please select an address");
        return;
    }

    nav("/viewModel", {
        state: {
            continueOrder: true,
            product: loc.state?.product,
        }
    });
    }
    return(
        <div className="h-[100vh] w-[100vw] overflow-x-hidden flex">
            <div className="h-[60vh] w-[30vw] mt-[10vh] ml-[10vw] border-2 border-black" onClick={handlePrimaryAddress}>
                <div className={`h-[10px] w-[10px] mt-[20px] ml-[20px] border border-black rounded-full ${addressType==="primary"?"bg-blue-700":"bg-white"}`}></div>
                <h1 className="font-bold text-2xl text-red-500 text-center mt-[30px]">Primary address</h1>
                <p className="mt-[40px] ml-[40px] font-semibold text-xl ">{primaryAddress.house},<br></br> {primaryAddress.city},<br></br>{primaryAddress.district},<br></br>{primaryAddress.state}<br></br>Pin- {primaryAddress.pinCode}</p>

            </div>

             <div className="h-[60vh] w-[30vw] mt-[10vh] ml-[10vw] border-2 border-black" onClick={handleSecondaryAddress} >
                <div className={`h-[10px] w-[10px] mt-[20px] ml-[20px] border border-black rounded-full ${addressType==="secondary"?"bg-blue-700":"bg-white"}`}></div>
                <h1 className="font-bold text-2xl text-red-500 text-center mt-[30px]">Secondary address</h1>
                <p className="mt-[40px] ml-[40px] font-semibold text-xl ">{secondaryAddressCh.house},<br></br> {secondaryAddressCh.city},<br></br>{secondaryAddressCh.district},<br></br>{secondaryAddressCh.state}<br></br>Pin- {secondaryAddressCh.pinCode}</p>

            </div>

            <button className="bg-red-600 text-white h-[30px] w-[80px] relative top-[80vh] " onClick={handleSubmit}>Submit</button>

        </div>
    )
}