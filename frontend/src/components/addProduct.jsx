import axios from "axios"
import bgImage from "./images/background-2.jpg"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
export default function AddProduct() {
    const [image, setImage] = useState(null)
    const [brand, setBrand] = useState("")
    const [model, setModel] = useState("")
    const [price, setPrice] = useState("")
    const [scale,setScale]=useState("")
    const [description,setDescription]=useState("")
    const nav = useNavigate()
    function handleImageChange(e) {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
        }
    };
    async function handleAddProduct() {
        const formData = new FormData();
        formData.append('brand', brand)
        formData.append('model', model)
        formData.append('price', price)
        formData.append('image', image)
        formData.append('description',description)
        formData.append('scale',scale)
        try {
            const res = await axios.post('http://localhost:5000/seller/addProduct', formData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    }
                }
            )
            if (res.data.success === true) {
                alert("Product requested to add. We will verify your product and notify you when we accept through email.")
            }
            nav("/sellerView")
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div className=' flex justify-center items-center h-screen w-screen bg-cover bg-no-repeat' style={{ backgroundImage: `url(${bgImage})` }}>
            <div className='flex justify-center shadow-[0_0_8px_black] rounded-3xl object-center bg-black/50 max-[500px]:w-screen sm:w-screen md:w-1/3 max-[500px]:h-screen sm:h-screen max-[500px]:rounded-none  md:h-1/2 relative'>


                <label className="absolute top-[20px] left-[50px] text-white text-lg font-semibold max-[500px]:top-[320px]" >Brand: </label>
                <input type="text" placeholder="Brand name" className="w-[260px] h-8 absolute top-[20px] rounded-2xl border-2 focus:border-black focus:scale-105 max-[500px]:w-[180px] max-[500px]:left-[150px] max-[500px]:text-md max-[500px]:top-[320px] pl-2" value={brand} onChange={(e) => setBrand(e.target.value)} ></input>

                <label className="absolute top-[60px] left-[50px] text-white text-lg font-semibold max-[500px]:top-[320px]" >Model: </label>
                <input type="text" placeholder="Model" className="w-[260px] h-8 absolute top-[60px] rounded-2xl border-2 focus:border-black focus:scale-105 max-[500px]:w-[180px] max-[500px]:left-[150px] max-[500px]:text-md max-[500px]:top-[320px] pl-2" value={model} onChange={(e) => setModel(e.target.value)} ></input>
                <label className="absolute top-[100px] left-[10px] text-white text-lg font-semibold max-[500px]:top-[320px]" >Description:</label>
                <textarea placeholder="Product description" rows="5" className="w-[260px] h-[100px] absolute top-[100px] p-2 rounded-2xl pl-2" onChange={(e)=>setDescription(e.target.value)}  />

                <label className="absolute top-[210px] left-[50px] text-white text-lg font-semibold max-[500px]:top-[320px]">Scale: </label>

                <select className="h-8 w-[260px] absolute top-[210px] rounded-2xl " value={scale} onChange={(e) => setScale(e.target.value)}>
                    <option value="">Select Scale</option>
                    <option value="1:12">1:12</option>
                    <option value="1:18">1:18</option>
                    <option value="1:24">1:24</option>
                    <option value="1:32">1:32</option>
                    <option value="1:36">1:36</option>
                    <option value="1:43">1:43</option>
                    <option value="1:64">1:64</option>
                </select>

                <label className="absolute top-[250px] left-[50px] text-white text-lg font-semibold max-[500px]:top-[320px]" >price: </label>
                <input type="number" placeholder="price" className="w-[260px] h-8 absolute top-[250px] rounded-2xl border-2 focus:border-black focus:scale-105 max-[500px]:w-[180px] max-[500px]:left-[150px] max-[500px]:text-md max-[500px]:top-[320px] pl-2" value={price} onChange={(e) => setPrice(e.target.value)} ></input>

                <label className="absolute top-[290px] left-[50px] text-white text-lg font-semibold max-[500px]:top-[320px]" >product image:  </label>

                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="absolute top-[290px] left-[200px] text-white hover:cursor-pointer"
                />


                <button className="absolute bottom-[20px] right-[60px] bg-white h-[30px] w-[50px] text-red-700 font-bold shadow-[0 0 8px black] max-[500px]:bottom-[210px] active:text-black hover:scale-105" onClick={handleAddProduct} >Add</button>
            </div>
        </div>
    )
}