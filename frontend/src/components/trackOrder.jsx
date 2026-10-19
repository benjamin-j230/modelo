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
        <div className="font-sans antialiased overflow-x-hidden bg-gradient-to-b from-gray-900 to-gray-800">
  <div className="min-h-screen w-full bg-[oklch(21%_0.034_264.665)] relative p-4 md:p-8">
    {/* Page title */}
    <h1 className="mb-8 text-4xl font-bold leading-snug tracking-tighter uppercase text-[#ff8a7a] text-center">
      Track your orders
    </h1>
    {/* Orders grid */}
    <div className="pt-12 w-full flex flex-wrap gap-6 justify-center
                    max-md:pt-6 max-md:px-2 max-md:gap-4">
      {orders.map((product, index) => (
        <div
          key={index}
          className="relative h-[60vh] w-[22vw] max-w-sm rounded-xl bg-black/40 backdrop-blur-lg
                     border border-red-700 shadow-xl hover:scale-105 transform transition
                     max-md:h-[65vh] max-md:w-full max-md:max-w-[350px]"
        >
          {/* Image */}
          <img
            src={`http://localhost:5000/uploads/${product.image}`}
            alt={product.model}
            className="h-1/2 w-full object-cover rounded-t-lg"
          />
          {/* Info block */}
          <div className="p-4 text-center space-y-2">
            <h2 className="text-white text-xl font-semibold">{product.model}</h2>
            <p className="text-gray-300">Price: {product.price} rs</p>
            <p className="text-gray-300">Brand: {product.brand}</p>
            <p className="text-gray-300">Status: {product.status}</p>
          </div>
        </div>
      ))}
    </div>
    {/* Footer */}
   <footer className="bg-zinc-900 relative top-[30px] right-[30px] h-[20vh] mb-0  w-screen py-8 border-t border-red-700 mt-12 flex justify-center">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold uppercase tracking-wider text-[#ff8a7a]">
          Modelo
        </h1>
      </div>
    </footer>
  </div>
</div>
    )
}