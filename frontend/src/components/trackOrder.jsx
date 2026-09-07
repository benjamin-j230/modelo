import axios from "axios"
import { useEffect, useState } from "react"

export default function TrackOrder() {
    const [orders, setOrders] = useState([])
    useEffect(() => {
        async function getOrder() {
            try {
                const token = localStorage.getItem("token")
                const res = await axios.get(`http://localhost:5000/user/getOrders`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )
                setOrders(res.data.orders)

            }
            catch (err) {
                console.log(err)
            }
        }
        getOrder()
    }, [])
    return (
        <div className="overflow-x-hidden">
            <div className="min-h-screen w-full bg-[oklch(21%_0.034_264.665)] relative">

                <h1 className="mb-6 text-3xl font-bold leading-[1.1] tracking-tighter uppercase text-red-700 max-[500px]:text-2xl text-center relative top-[30px]">
                    Track your orders
                </h1>

                <div className="pt-[20vh] w-full min-h-screen flex flex-wrap gap-4 justify-center
                        max-[500px]:pt-[5vh]
                        max-[500px]:px-2
                        max-[500px]:gap-4
                        max-[500px]:overflow-x-hidden">

                    {
                        orders.map((product, index) => (
                            <div
                                key={index}
                                className="h-[60vh] w-[20vw] bg-black hover:scale-105
                                   max-[500px]:h-[65vh]
                                   max-[500px]:w-full
                                   max-[500px]:max-w-[350px]"
                            >

                                <img
                                    src={`http://localhost:5000/uploads/${product.image}`}
                                    className="h-[50%] w-[95%] mx-auto max-[500px]:w-[95%]"
                                />

                                <h1 className="relative top-[15px] text-white font-bold text-xl text-center max-[500px]:text-lg">
                                    {product.model}
                                </h1>

                                <h1 className="relative top-[20px] text-white font-bold text-xl text-center max-[500px]:text-lg">
                                    Price: {product.price}rs
                                </h1>

                                <h1 className="relative top-[25px] text-white font-bold text-xl text-center max-[500px]:text-lg">
                                    Brand: {product.brand}
                                </h1>

                                <h1 className="relative top-[40px] text-white font-bold text-xl text-center max-[500px]:text-lg">
                                    Status: {product.status}
                                </h1>

                            </div>
                        ))
                    }

                </div>
            </div>
        </div>
    )
}