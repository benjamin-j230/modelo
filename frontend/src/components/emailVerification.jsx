import GoogleButton from './assets/googleLogin'
import googleButton from './assets/googleLogin'
import bgImage from "./images/background-2.jpg"
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import thisContext from './context'
export default function EmailVerification() {
    const nav = useNavigate()
    const { shop, password, street, district, city, state, pin, mobile, house, seller, setSeller } = useContext(thisContext)

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const error = params.get("error");

        if (error === "email_exists") {
            alert("User email already exists");
        }
    }, []);
    async function auth() {
        const role = localStorage.getItem("role");

        try {

            if (role === "user") {
                const res = await axios.post('http://localhost:5000/user/register', {
                    password: password,
                    house: house,
                    district: district,
                    city: city,
                    state: state,
                    pin: pin,
                    mobile: mobile,
                    role: localStorage.getItem("role")
                })


                window.location.href = res.data.url;
            }
            else if (role == "seller") {
                let sellerValue = seller;

                if (seller === "shop name") {
                    sellerValue = "shop";
                } else if (seller === "username") {
                    sellerValue = "private seller";
                }
                const res = await axios.post('http://localhost:5000/user/register', {
                    password: password,
                    shop: shop,
                    street: street,
                    city: city,
                    state: state,
                    pin: pin,
                    mobile: mobile,
                    seller: sellerValue,
                    role: localStorage.getItem("role")
                })


                window.location.href = res.data.url;
            }
        }
        catch (err) {
            if (err.response.status === 409) {
                alert(err.response.data.message);
            }
        }
    }
    return (
        <div className=' flex justify-center items-center h-screen w-screen bg-cover bg-no-repeat' style={{ backgroundImage: `url(${bgImage})` }}>
            <div className='flex justify-center shadow-[0_0_8px_black] rounded-3xl object-center bg-black/50 max-[500px]:w-screen w-[600px] min-[700px]:max-[1030px]:w-[600px] max-[500px]:h-screen sm:h-screen max-[500px]:rounded-none  md:h-1/2 relative'>
                <GoogleButton onClick={auth} />
            </div>
        </div>
    )
}