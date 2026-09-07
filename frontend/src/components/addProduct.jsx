import axios from "axios"
import bgImage from "./images/background-2.jpg"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
export default function AddProduct() {
    const [image,setImage]=useState(null)
    const [brand,setBrand]=useState("")
    const [model,setModel]=useState("")
    const [price,setPrice]=useState("")
    const nav=useNavigate()
    function handleImageChange(e){
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };
  async function handleAddProduct(){
    const formData = new FormData();
    formData.append('brand',brand)
    formData.append('model',model)
    formData.append('price',price)
    formData.append('image', image);
    try{
        const res=await axios.post('http://localhost:5000/seller/addProduct',formData,
            {
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')}`,
                }
            }
        )
        alert("product added successfully")
        nav("/sellerView")
    }catch(err){
        console.log(err)
    }
  }
    return (
        <div className=' flex justify-center items-center h-screen w-screen bg-cover bg-no-repeat' style={{ backgroundImage: `url(${bgImage})` }}>
            <div className='flex justify-center shadow-[0_0_8px_black] rounded-3xl object-center bg-black/50 max-[500px]:w-screen sm:w-screen md:w-1/3 max-[500px]:h-screen sm:h-screen max-[500px]:rounded-none  md:h-1/2 relative'>


                <label className="absolute top-[50px] left-[50px] text-white text-lg font-semibold max-[500px]:top-[320px]" >Brand: </label>
                <input type="text" placeholder="Brand name" className="w-[260px] h-8 absolute top-[50px] rounded-2xl border-2 focus:border-black focus:scale-105 max-[500px]:w-[180px] max-[500px]:left-[150px] max-[500px]:text-md max-[500px]:top-[320px]" value={brand} onChange={(e) => setBrand(e.target.value)} ></input>

                <label className="absolute top-[90px] left-[50px] text-white text-lg font-semibold max-[500px]:top-[320px]" >Model: </label>
                <input type="text" placeholder="Model" className="w-[260px] h-8 absolute top-[90px] rounded-2xl border-2 focus:border-black focus:scale-105 max-[500px]:w-[180px] max-[500px]:left-[150px] max-[500px]:text-md max-[500px]:top-[320px]" value={model} onChange={(e) => setModel(e.target.value)} ></input>

                <label className="absolute top-[130px] left-[50px] text-white text-lg font-semibold max-[500px]:top-[320px]" >price: </label>
                <input type="number" placeholder="price" className="w-[260px] h-8 absolute top-[130px] rounded-2xl border-2 focus:border-black focus:scale-105 max-[500px]:w-[180px] max-[500px]:left-[150px] max-[500px]:text-md max-[500px]:top-[320px]" value={price} onChange={(e) => setPrice(e.target.value)} ></input>

                <label className="absolute top-[170px] left-[50px] text-white text-lg font-semibold max-[500px]:top-[320px]" >product image:  </label>

                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="absolute top-[170px] left-[200px] hover:cursor-pointer"
                />


                <button className="absolute bottom-[20px] right-[60px] bg-white h-[30px] w-[50px] text-red-700 font-bold shadow-[0 0 8px black] max-[500px]:bottom-[210px] active:text-black hover:scale-105" onClick={handleAddProduct} >Add</button>
            </div>
        </div>
    )
}