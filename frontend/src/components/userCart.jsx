import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
export default function UserCart(){
    const [cart,setCart]=useState([])
    const [totalPrice,setTotalPrice]=useState(0)

    useEffect(()=>{
        async function getCart(){
            try{
                const token=localStorage.getItem("token")
                const res=await axios.get(`http://localhost:5000/user/getCart`,
                    {
                        headers:{
                            Authorization:`Bearer ${token}`
                        }
                    })
                setCart(res.data)
                const totalPrice=res.data.reduce((acc,curr)=>acc+curr.product.price*curr.quantity,0)
                setTotalPrice(totalPrice)
                console.log(res.data)
            }
            catch(err){
                console.log(err)
            }
        }
        getCart()
    },[])

    async function handleIncrement(data){
        try{
            const token=localStorage.getItem("token")
            const res=await axios.patch(`http://localhost:5000/user/incrementCart/${data._id}`,{},{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            if(res.data.success){
                window.location.reload()
            }
        }catch(err){
            console.log(err)
        }
    }

    async function handleDecrement(data){
         try{
            const token=localStorage.getItem("token")
            if(data.quantity>1){
            const res=await axios.patch(`http://localhost:5000/user/decrementCart/${data._id}`,{},{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            if(res.data.success){
                window.location.reload()
            }
        }
        }catch(err){
            console.log(err)
        }
    }

    return(
        <div className="font-sans antialiased overflow-x-hidden bg-gradient-to-b from-gray-900 to-gray-800">
  <div className="min-h-screen w-full bg-[oklch(21%_0.034_264.665)] relative p-4 md:p-8">
    {/* Page title */}
    <h1 className="mb-6 text-4xl font-bold leading-snug tracking-tighter uppercase text-[#ff8a7a] text-center">
      View cart
    </h1>
    {/* Total price */}
    <h2 className="mb-8 text-2xl font-bold text-white text-center">
      Total Price: {totalPrice} rs
    </h2>
    {/* Products grid */}
    <div className="pt-12 w-full flex flex-wrap gap-6 justify-center
                    max-md:pt-6 max-md:px-2 max-md:gap-4">
      {cart.map((data, index) => (
        <div
          key={index}
          className="relative h-[60vh] w-[22vw] max-w-sm rounded-xl bg-black/40 backdrop-blur-lg
                     border border-red-700 shadow-xl hover:scale-105 transform transition
                     max-md:h-[65vh] max-md:w-full max-md:max-w-[350px]"
        >
          {/* Product image */}
          <img
            src={`http://localhost:5000/uploads/${data.product.image}`}
            alt={data.product.model}
            className="h-1/2 w-full object-cover rounded-t-lg"
          />
          {/* Info block */}
          <div className="p-4 text-center space-y-2">
            <h3 className="text-white text-xl font-semibold">{data.product.model}</h3>
            <p className="text-gray-300">Price: {data.product.price} rs</p>
            <p className="text-gray-300">Brand: {data.product.brand}</p>
            <p className="text-gray-300">Quantity: {data.quantity}</p>
            {/* Quantity controls */}
            <div className="flex justify-center space-x-4 mt-4">
              <button
                onClick={() => handleDecrement(data)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-red-600 text-white font-bold
                           transition-colors hover:bg-red-500 focus:outline-none"
              >
                –
              </button>
              <button
                onClick={() => handleIncrement(data)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-red-600 text-white font-bold
                           transition-colors hover:bg-red-500 focus:outline-none"
              >
                +
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
    {/* Footer */}
    <footer className="bg-zinc-900 w-full py-8 border-t border-red-700 mt-12 flex justify-center">
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