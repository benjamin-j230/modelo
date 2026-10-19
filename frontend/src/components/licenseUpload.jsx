import React, { useEffect } from 'react';
import { useState } from 'react';
import bgImage from "./images/background-2.jpg"
import { useContext } from 'react';
import thisContext from './context';
import axios from 'axios';
export default function LicenseUpload() {
    const { licenseImage, setLicenseImage } = useContext(thisContext)
    const [email, setEmail] = useState("")

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const message = params.get("message");
        const email = params.get("email");
        setEmail(email)

        if (message === "upload_license") {
            alert("Please upload your license to proceed.");
        }
    }, []);

    function handleImageChange(e) {
        const file = e.target.files[0];
        if (file) {
            setLicenseImage(file);
        }
    };

    async function handleNext() {
        try {
            const formData = new FormData();
            formData.append('email', email)
            formData.append('licenseImage', licenseImage)
            const res=await axios.post(`http://localhost:5000/admin/uploadLicense`, formData)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className=' flex justify-center items-center h-screen w-screen bg-cover bg-no-repeat' style={{ backgroundImage: `url(${bgImage})` }}>
            <div className='flex justify-center shadow-[0_0_8px_black] rounded-3xl object-center bg-black/50 max-[500px]:w-screen w-[600px] min-[700px]:max-[1030px]:w-[600px] max-[500px]:h-screen sm:h-screen max-[500px]:rounded-none  md:h-1/2 relative'>
                <h1 className='text-red-500 font-bold absolute top-[20px] text-2xl'>{'License upload'}</h1>
                <p className="text-white absolute top-[80px] left-[30px] text-lg max-[500px]:top-[140px] max-w-full" >Please upload your license in an image format: </p>
                <input type="file" accept="image/*" className="w-[260px] max-w-full h-8 absolute top-[130px] text-white focus:border-black focus:scale-105 max-[500px]:w-[180px] max-[500px]:left-[130px] max-[500px]:text-md max-[500px]:top-[180px] pl-2" onChange={(e) => handleImageChange(e)} ></input>
                <button className="absolute bottom-[20px] right-[60px] bg-white h-[30px] w-[50px] text-red-700 font-bold shadow-[0 0 8px black] max-[500px]:bottom-[210px] active:text-black hover:scale-105" onClick={handleNext} >next</button>


            </div>

        </div>
    )
}