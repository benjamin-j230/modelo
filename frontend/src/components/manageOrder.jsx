import axios from "axios"
import { useEffect, useState } from "react"

export default function ManageOrder() {
    const [acceptedOrders, setAcceptedOrders] = useState([])
    async function updateStatus(value,product){
        try{
            const res=await axios.patch(`http://localhost:5000/seller/status/${product._id}`,{
                status:value,
            },
            {
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("token")}`
                }
            })
             window.location.reload();
        }
        catch(err){
            console.log(err)
        }
    }


    useEffect(() => {
        async function getData() {
            try {
                const token = localStorage.getItem("token")
                const res = await axios.get('http://localhost:5000/seller/getAcceptedOrders', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setAcceptedOrders(res.data.accepted)
            }
            catch (err) {
                console.log(err)
            }
        }
        getData()
    }, [])

    return (
        <div className="overflow-x-hidden">
            <div className="min-h-screen w-full bg-[oklch(21%_0.034_264.665)] relative" >
                <h1 className=" mb-6 text-3xl font-bold leading-[1.1] tracking-tighter uppercase text-red-700 max-[500px]:text-2xl text-center relative top-[30px] ">
                    Manage orders
                </h1>

                <div className="relative top-[10vh] mx-auto bg-black h-[70vh] min-w-[60vw] max-w-[100vw] overflow-y-auto " >
                    {
                        acceptedOrders.map(product => (
                            <div className="h-[10vh] w-[95%] mx-auto border-b-[1px] border-gray-600 relative flex gap-4 ">
                                <div className="h-[30px] w-[30px] absolute bottom-[10px] rounded-full bg-green-600"></div>
                                <h1 className="relative left-[50px] top-[35px] font-bold text-white" >{product.user.name}</h1>
                                <p className="text-gray-200 relative left-[150px] top-[35px] mr-4" >{product.brand}</p>
                                <div className="h-[5px] w-[5px] rounded-full bg-gray-500 relative left-[140px] top-[45px] " ></div>
                                <p className="text-gray-200 relative left-[140px] top-[35px] mr-4" >{product.model}</p>

                                <div className="h-[5px] w-[5px] rounded-full bg-gray-500 relative left-[130px] top-[45px] " ></div>
                                <p className="text-gray-200 relative left-[130px] top-[35px] mr-4" >₹{product.price}</p>
                                

                                <select value={product.status} className={`w-[200px] h-[30px] bg-black absolute top-[30px] right-[20px] shadow-[0_0_2px_rgba(0,0,0,0.15)] shadow-white rounded-lg ${product.status==="accepted"?"text-white":product.status==="packing"?"text-yellow-500":product.status==="packed"?"text-green-500":product.status==="delayed"?"text-red-500":product.status==="sent"?"text-green-500":""}`} onChange={(e)=>updateStatus(e.target.value,product)} >
                                    
                                    <option value="accepted" >⚪order accepted</option>
                                    <option value="packing">🟡packing</option>
                                    <option value="packed" >🟢packed</option>
                                    <option value="delayed" >🔴Delivery delayed</option>
                                    <option value="sent" >🟢Sent for delivery</option>
                                </select>
                               
                            </div>

                        ))
                    }

                </div>
            </div>
        </div>
    )
}