import { useContext } from "react"
import thisContext from "./context"
import "../App.css";
import { useNavigate } from "react-router-dom";
import axios from "axios"

export default function AcceptOrder() {
    const nav = useNavigate()
    const { sellerProduct,sellerId } = useContext(thisContext)

    async function print() {
        alert("Accept order?")
        try{
            const res=await axios.post(`http://localhost:5000/seller/acceptOrder`,{
                productId:sellerProduct._id,
                userId:sellerProduct.user._id,
                sellerId
            })
            
        }catch(err){
            console.log(err)
        }
        window.print()
        nav('/sellerView')
    }

    return (
        <div className="relative min-h-screen overflow-x-hidden">
            <h1 className="text-red-700 font-bold relative top-[10vh] left-[5vw] text-2xl">Order details</h1>
            <div className="relative top-[18vh] left-[5vw] w-[30vw] min-h-[70vh] border-[1px] border-black " >
                <p className="relative top-[2vh] left-[2vw] text-lg" >Name:  {sellerProduct.user.name}</p>



                <p className="relative top-[2vh] left-[2vw] text-lg" >Address: </p>

                <p className=" w-[30vw] absolute top-[6vh] left-[7vw] text-lg">{sellerProduct.user.address[0].house}<br></br> {sellerProduct.user.address[0].city}<br></br> {sellerProduct.user.address[0].district}<br></br>{sellerProduct.user.address[0].state}<br></br> pin - {sellerProduct.user.address[0].pinCode}</p>

                      <p className=" w-[30vw] absolute top-[25vh] left-[2vw] text-lg">Mobile number: {sellerProduct.user.mobileNumber}</p>

                {/*for print page*/}
                <div className="print-item">
                      <p className="whitespace-nowrap absolute top-[2vh] left-[2vw] text-lg" >Name:  {sellerProduct.user.name}</p>
                    <p className="whitespace-nowrap w-[30vw]  absolute top-[8vh] left-[2vw] text-lg" >Address:   {sellerProduct.user.address[0].house},{" "}
                        {sellerProduct.user.address[0].city},{" "}<br></br>
                        {sellerProduct.user.address[0].district},{" "}
                        {sellerProduct.user.address[0].state},{" "}
                        pin - {sellerProduct.user.address[0].pinCode} </p>

                        <p className=" w-[30vw] whitespace-nowrap absolute top-[25vh] left-[2vw] text-lg">Mobile number: {sellerProduct.user.mobileNumber}</p>

                </div>

          

                <p className="absolute top-[30vh] left-[5vw] text-red-700 text-lg">Product details</p>
                <p className="absolute top-[33vh] left-[2vw] text-lg">Model name: {sellerProduct.model}</p>
                <p className="absolute top-[36vh] left-[2vw] text-lg">Brand name: {sellerProduct.brand}</p>

                <button className="absolute bottom-[10vh] left-[20vw] bg-red-700 h-[40px] w-[110px] text-white font-bold shadow-[0 0 8px black] max-[500px]:bottom-[210px] active:text-black hover:scale-105  " onClick={print}>accept order</button>



            </div>
        </div>
    )
}