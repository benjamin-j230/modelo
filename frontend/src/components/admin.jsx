import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
export default function Admin() {
    const [details, setDetails] = useState("")
    const [sellers, setSellers] = useState([])
    const [sellerOptions, setSellerOptions] = useState("")


    useEffect(() => {
        async function fetchData() {
            const res = await axios.get(`http://localhost:5000/admin/sellers`)
            setSellers(res.data)
            console.log(res.data)
            const productsRes= await axios.get(`http://localhost:5000/admin/products`)
            console.log(productsRes.data)
        }
        fetchData()
    },[])

    async function handleSellerApproval(sellerId){
        try{
            const res = await axios.post(`http://localhost:5000/admin/sellerApproval`, {sellerId})
            if(res.data.success){
                window.location.reload()
            }
        }catch(err){
            console.log(err)
        }

    }


    return (
        <div>
            <div className="mt-0" >
                <nav className="bg-gradient-to-r from-gray-900 to-gray-200 shadow max-[500px]:overflow-x-hidden h-[15vh]">
                    <div className="mx-auto flex flex-wrap items-center justify-between px-4 py-4 lg:px-12 max-[500px]:px-3">


                        <div className="relative max-[500px]:top-[30px] flex w-full items-center lg:w-auto">
                            <div className="mt-0 text-2xl font-bold relative top-[20px] uppercase tracking-[0.2em] text-[#ff8a7a] max-[500px]:text-xl">
                                Modelo
                            </div>
                        </div>
                    </div>
                </nav>
                <div className="min-h-screen w-full overflow-x-hidden bg-[oklch(21%_0.034_264.665)] flex justify-center">
                    <button className={` text-2xl text-center h-[50px] w-[200px] bg-slate-950 border-b border-r border-gray-500 hover:cursor-pointer hover:border-b-red-700 ${details === "seller" ? "border-b-red-700" : ""} ${details === "seller" ? "text-red-700" : "text-white"} `} onClick={() => setDetails("seller")}>Seller details</button>
                    <button className={` text-2xl text-center h-[50px] w-[200px] bg-slate-950 border-b  border-gray-500 hover:cursor-pointer hover:border-b-red-700 ${details === "user" ? "border-b-red-700" : ""} ${details === "user" ? "text-red-700" : "text-white"} `} onClick={() => setDetails("user")}>User details</button>

                    {
                        details === "seller" &&
                        <div className="min-h-full w-full bg-black overflow-x-hidden absolute top-[30vh] flex justify-center flex-wrap ">
                            <button className={` text-xl text-center h-[50px] w-[200px] bg-black border-b border-r border-gray-500 hover:cursor-pointer hover:border-b-red-700${sellerOptions === "approval" ? " border-b-red-700" : ""} ${sellerOptions === "approval" ? "text-red-700" : "text-white"}`} onClick={() => setSellerOptions("approval")}>Seller approval</button>
                            <button className={` text-xl text-center h-[50px] w-[200px] bg-black border-b border-r border-gray-500 hover:cursor-pointer hover:border-b-red-700 ${sellerOptions === "viewSeller" ? " border-b-red-700" : ""} ${sellerOptions === "viewSeller" ? "text-red-700" : "text-white"}`} onClick={() => setSellerOptions("viewSeller")}>View sellers</button>
                            <button className={` text-xl text-center h-[50px] w-[200px] bg-black border-b border-gray-500 hover:cursor-pointer hover:border-b-red-700 ${sellerOptions === "product" ? " border-b-red-700" : ""} ${sellerOptions === "product" ? "text-red-700" : "text-white"}`} onClick={() => setSellerOptions("product")}>Product approval</button>



                            {sellerOptions === "approval" &&
                            <div className="min-h-full w-full basis-full -mt-[30vh] flex justify-center gap-5 ">
                                {
                                    sellers.map(seller=>(
                                        <div className="w-fit min-w-[20vw] h-[50vh] border border-red-700 rounded-xl bg-slate-950 justify-center" key={seller._id} >
                                            <h1 className="text-white text-2xl text-center" >{seller.shop}</h1><br/>
                                            <h1 className="text-white text-lg pl-[50px]" >Address: {seller.address[0].street},</h1>
                                            <h1 className="text-white text-lg pl-[120px] ">{seller.address[0].city}</h1>

                                            <h1 className="text-white text-lg pl-[120px] ">{seller.address[0].state}</h1>
                                            <h1 className="text-white text-lg pl-[50px]">Pin code: {seller.address[0].pinCode}</h1>
                                            <h1 className="text-white text-lg pl-[50px]">Email: {seller.email}</h1>
                                            <h1 className="text-white text-lg pl-[50px]">Phone: {seller.mobileNumber}</h1>
                                            <button className="text-white font-bold bg-green-600 w-[100px] h-[30px] ml-[50px] mt-[50px]" onClick={() => handleSellerApproval(seller._id)}>Accept ✓ </button>
                                            <button className="text-white font-bold bg-red-600 w-[100px] h-[30px] ml-[30px] mt-[50px]" >Reject ✕ </button>

                                        </div>
                                    ))
                                }

                                </div>

                            }
                        </div>

                    }
                </div>
                <footer className="bg-zinc-900 w-full h-[30vh] relative border-t border-red-700  bottom-0 overflow-x-hidden flex justify-center" >
                    <div className="relative max-[500px]:top-[30px] bottom-[50px] flex w-full items-center lg:w-auto">
                        <div className="mt-0 text-2xl font-bold uppercase tracking-[0.2em] text-[#ff8a7a] max-[500px]:text-xl">
                            Modelo
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    )
}