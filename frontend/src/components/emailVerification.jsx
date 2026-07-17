import GoogleButton from './assets/googleLogin'
import googleButton from './assets/googleLogin'
import bgImage from "./images/background-2.jpg"
import axios from 'axios'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
export default function EmailVerification() {
    const nav = useNavigate()

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const error = params.get("error");

        if (error === "email_exists") {
            alert("User email already exists");
        }
    }, []);
    async function auth() {
        try {
            const res = await axios.post('http://localhost:5000/user/register', {
                password: localStorage.getItem("password"),
                house: localStorage.getItem("house"),
                street: localStorage.getItem("street"),
                city: localStorage.getItem("city"),
                state: localStorage.getItem("state"),
                pin: localStorage.getItem("pin"),
                mobile: localStorage.getItem("mobile")
            })
            window.location.href = res.data.url;
        }
        catch (err) {
            if (err.response.status === 409) {
                alert(err.response.data.message);
            }
        }
    }
    return (
        <div className=' flex justify-center items-center h-screen w-screen bg-cover bg-no-repeat' style={{ backgroundImage: `url(${bgImage})` }}>
            <div className='flex justify-center shadow-[0_0_8px_black] rounded-3xl object-center bg-black/50 max-[500px]:w-screen sm:w-screen md:w-1/3 max-[500px]:h-screen sm:h-screen max-[500px]:rounded-none  md:h-1/2 relative'>
                <GoogleButton onClick={auth} />
            </div>
        </div>
    )
}