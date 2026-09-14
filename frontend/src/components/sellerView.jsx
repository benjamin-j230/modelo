import { useRef, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import profilePic from "./images/profileAvatar.jpg"
import axios from "axios"
import thisContext from "./context"
import { useContext } from "react"

export default function SellerView() {
    const nav = useNavigate()
    const { street, setStreet, city, setCity, state, setState, pin, setPin, mobile, setMobile, sellerProduct, setSellerProduct, sellerId, setSellerId,emailLogin } = useContext(thisContext)
    const [open, setOpen] = useState(false)
    const [dropdown, setDropDown] = useState(false)
    const [profile, setProfile] = useState(false)
    const [profileType, setProfileType] = useState("")
    const [sellerName, setSellerName] = useState("")
    const [sellerProducts, setSellerProducts] = useState([])

    const dropdownRef = useRef(null)
    const profileRef = useRef(null)
    const [location, setLocation] = useState(null);
    const [locationButton, setLocationButton] = useState(true)
    const [orders, setOrders] = useState([])

    function getLocation() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
            },
            (error) => {
                console.error(error);
            },
            {
                enableHighAccuracy: true,
                maximumAge: 0,
                timeout: 10000,
            }
        );
    };


    async function saveLocation() {
        alert("Are you sure about the location")
        try {
            const res = await axios.post("http://localhost:5000/seller/location", {
                sellerId: sellerId,
                latitude: location.latitude,
                longitude: location.longitude
            })
            alert(res.data.message)
            window.location.reload();
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        const fetchSellerData = async () => {
            if (emailLogin === true) {
                const token = document.cookie.split("; ").find(row => row.startsWith("token="))?.split("=")[1];
                localStorage.setItem("token", token)
            }
            try {
                const token = localStorage.getItem("token")
                const res = await axios.get("http://localhost:5000/seller/profile",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                console.log(res.data.seller)
                setSellerId(res.data.seller._id)
                setSellerName(res.data.seller.shop)
                setProfileType(res.data.seller.seller)
                setStreet(res.data.seller.address[0].street)
                setCity(res.data.seller.address[0].city)
                setState(res.data.seller.address[0].state)
                setPin(res.data.seller.address[0].pinCode)
                setMobile(res.data.seller.mobileNumber)
                setSellerProducts(res.data.seller.product)
                setOrders(res.data.seller.orders)
                if (res.data.seller.location) {
                    setLocation({
                        longitude: res.data.seller.location.coordinates[0],
                        latitude: res.data.seller.location.coordinates[1]
                    })

                    setLocationButton(false)
                }
                else {
                    setLocation(null)
                }

            } catch (err) {
                console.log(err)
            }
        }
        fetchSellerData()
    }, [])




    useEffect(() => {
        function handleClickOutside(event) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setDropDown(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    useEffect(() => {
        function handleClickOutside(event) {
            if (
                profileRef.current &&
                !profileRef.current.contains(event.target)
            ) {
                setProfile(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);



    function acceptOrder(order) {
        setSellerProduct(order)
        nav('/acceptOrder')
    }




    return (
        <div className="overflow-x-hidden">
            <nav className="bg-gradient-to-r from-gray-900 to-gray-200 shadow ">
                <div className="mx-auto flex flex-wrap items-center justify-between px-4 py-4 lg:px-12">
                    {/* Logo + mobile toggle */}
                    <div className="flex w-full items-center justify-between lg:w-auto">
                        <div className="text-2xl font-bold uppercase tracking-[0.2em] text-[#ff8a7a] mt-0 ">
                            Modelo
                        </div>
                        <button
                            type="button"
                            aria-label="Toggle menu"
                            aria-expanded={open}
                            className="inline-flex items-center justify-center rounded p-2 text-red-700 hover:bg-gray-800 lg:hidden"
                        >
                            <img className="w-[40px] h-[40px] mb-6 rounded-full" src={profilePic} alt="Bonnie image" />
                        </button>
                    </div>

                    {/* Menu */}
                    <div
                        className={`${open ? "block" : "hidden"
                            } w-full flex-grow lg:flex lg:w-auto lg:items-center lg:px-3`}
                    >
                        {/* Search-by links: desktop only inside navbar */}




                        <div className="absolute top-[2vh] right-[5vw] flex flex-col lg:flex-row lg:items-center">

                            <button onClick={() => setProfile(true)} ><img className="w-[40px] h-[40px] mb-6 rounded-full" src={profilePic} alt="Bonnie image" /></button>

                        </div>
                    </div>
                </div>
            </nav>



            {/* Search bar: mobile only, below the search-by buttons */}
            <div className="relative border-b border-gray-200 bg-white px-4 py-3 text-gray-600 lg:hidden">
                <input
                    className="h-10 w-full rounded-lg border-2 border-gray-300 bg-white pl-3 pr-10 text-sm focus:outline-none"
                    type="search"
                    name="search"
                    placeholder="Search"
                />
                <button
                    type="submit"
                    aria-label="Search"
                    className="absolute right-6 top-1/2 -translate-y-1/2"
                >
                    <svg
                        className="h-4 w-4 fill-current text-gray-600"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 56.966 56.966"
                    >
                        <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887zM23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17s-17-7.626-17-17S14.61,6,23.984,6z" />
                    </svg>
                </button>
            </div>
            <div className="w-screen h-[92vh] bg-[oklch(21%_0.034_264.665)]" >

                {profile && (

                    <div ref={profileRef}
                        className="absolute right-[0px] top-[9vh] min-h-[50vh] z-10 bg-black max-w-xs w-full p-6 border border-red-700 rounded-base shadow-xs "
                    >
                        <button onClick={() => setDropDown(true)}
                            className="absolute top-2 end-2 text-white bg-gray-800 border border-transparent rounded-base p-1.5 hover:text-heading hover:bg-neutral-tertiary focus:ring-4 focus:ring-neutral-tertiary focus:outline-none"

                        >
                            <span className="sr-only">Open dropdown</span>

                            <svg
                                className="w-6 h-6"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeWidth="3"
                                    d="M6 12h.01m6 0h.01m5.99 0h.01"
                                />
                            </svg>
                        </button>

                        {dropdown && (

                            <div ref={dropdownRef} className="absolute top-10vh right-[0px] z-10 w-36 bg-gray-900 rounded-base shadow-lg">
                                <ul
                                    className="p-2 text-sm text-body font-medium"
                                    aria-labelledby="dropdownButton"
                                >
                                    <li>
                                        <a
                                            href="#"
                                            className="inline-flex w-full items-center rounded-md p-2 text-white hover:bg-neutral-tertiary-medium hover:text-red-700"
                                        >
                                            Edit
                                        </a>
                                    </li>

                                    <li>
                                        <a
                                            href="#"
                                            className="inline-flex w-full items-center rounded-md p-2 text-white hover:bg-neutral-tertiary-medium hover:text-red-700"
                                        >
                                            Add item
                                        </a>
                                    </li>

                                </ul>
                            </div>
                        )}

                        <div className="flex flex-col items-center">
                            <img
                                className="mb-6 h-24 w-24 rounded-full"
                                src={profilePic}
                                alt="Bonnie image"
                            />

                            <h5 className="mb-0.5 text-2xl font-semibold tracking-tight text-red-700">
                                {sellerName}
                            </h5>

                            <span className="text-sm text-red-700">{profileType}</span>

                            <span className="relative right-[100px] top-[10px] text-md font-semibold text-red-700">
                                Address:
                            </span>
                            <span className="text-sm text-red-700 relative bottom-[20px] ">{street}<br></br>{city}<br></br> {state}<br></br>{pin}</span>

                            <span className="relative right-[100px] text-md font-semibold text-red-700">
                                Mobile:
                            </span>


                            <span className="text-sm text-red-700 relative bottom-[20px] ">{mobile}</span>

                            {
                                location == null ?
                                    <button className="text-gray-400 " onClick={getLocation}>get your location</button>
                                    :
                                    <div>
                                        <p className="text-gray-400">Latitude: {location.latitude}</p>
                                        <p className="text-gray-400">Longitude: {location.longitude}</p>
                                        {locationButton &&
                                            <button className=" relative top-[10px] border border-white/20 bg-black px-8 py-4 text-[10px] font-bold tracking-widest text-red-700 uppercase transition-all hover:bg-red-700 hover:text-white shadow-[0_0_18px_rgba(128,128,128,0.6)]" onClick={saveLocation}>Add this location</button>}
                                    </div>
                            }

                        </div>
                    </div>
                )}




                <div className="absolute top-[20vh] left-[20px] w-[50vw] h-[30vh]  bg-black shadow-[0_0_18px_rgba(128,128,128,0.6)]" >

                    <h1 className="mb-6 text-4xl font-bold leading-[1.1] tracking-tighter uppercase text-red-700 max-[500px]:text-2xl text-center relative top-[10px]  ">
                        Manage products

                    </h1>

                    <button className="absolute bottom-[5vh] left-[10vw] border border-white/20 bg-black px-8 py-4 text-[10px] font-bold tracking-widest text-red-700 uppercase transition-all hover:bg-red-700 hover:text-white shadow-[0_0_18px_rgba(128,128,128,0.6)]" onClick={() => nav("/addProduct")}>
                        Add products
                    </button>

                    <button className="absolute bottom-[5vh] left-[28vw] border border-white/20 bg-black px-8 py-4 text-[10px] font-bold tracking-widest text-red-700 uppercase transition-all hover:bg-red-700 hover:text-white shadow-[0_0_18px_rgba(128,128,128,0.6)]" onClick={() => nav('/manageOrder')}>
                        Manage order status
                    </button>

                </div>

                <div className="absolute top-[20vh] right-[100px] w-[30vw] h-[70vh] z-1 bg-black shadow-[0_0_18px_rgba(128,128,128,0.6)] overflow-y-auto overflow-x-hidden">
                    <h1 className=" mb-6 text-3xl font-bold leading-[1.1] tracking-tighter uppercase text-red-700 max-[500px]:text-2xl text-center relative top-[30px] mb-[50px]  ">
                        Orders
                    </h1>

                    {
                        orders.map((order) => (
                            <div className="w-full h-[12vh] border-y border-red-700 hover:scale-105 hover:font-bold relative" >
                                <p className="relative left-[20px] top-[3px] text-red-700 font-semiBold">{order.model}</p>

                                <p className="relative left-[20px] top-[3px] text-red-700 font-semiBold">price:{order.price}</p>

                                <p className="relative left-[20px] top-[3px] text-red-700 font-semiBold">Brand:{order.brand}</p>

                                <button className="absolute right-[20px] bottom-[22px] border border-white/20 bg-black px-8 py-4 text-[10px] font-bold tracking-widest text-red-700 uppercase transition-all hover:bg-red-700 hover:text-white shadow-[0_0_18px_rgba(128,128,128,0.6)]" onClick={() => acceptOrder(order)}>Accept order</button>

                            </div>
                        ))


                    }
                </div>


                <span className="h-[1px] w-full bg-red-700 absolute bottom-0" ></span>

            </div>
            <div className="relative w-full min-h-screen bg-[oklch(21%_0.034_264.665)] ">

                <h1 className=" mb-6 text-3xl font-bold leading-[1.1] tracking-tighter uppercase text-red-700 max-[500px]:text-2xl text-center relative top-[30px] ">
                    My products
                </h1>
                <div className=" w-full bottom-0 flex flex-wrap gap-4 justify-center">

                    {
                        sellerProducts.map((product, index) => (
                            <div key={index} className="relative h-[60vh] w-[20vw] bg-black border-2 border-red-500 m-8 hover:scale-105">
                                <img src={`http://localhost:5000/uploads/${product.image}`} alt={product.image} className=" w-[95%] h-[50%] mx-auto" />
                                <h1 className="relative top-[5px] text-white font-bold text-xl text-center">{product.model}</h1>

                                <h1 className="relative top-[5px] text-white font-bold text-xl text-center"> ₹{product.price}</h1>

                                <h1 className="relative top-[5px] text-white font-bold text-xl text-center">Brand: {product.brand}</h1>

                            </div>

                        ))
                    }
                </div>
                  <footer className="bg-black w-full h-[30vh] relative bottom-0 overflow-x-hidden flex justify-center" >
  <div className="relative max-[500px]:top-[30px] bottom-[50px] flex w-full items-center lg:w-auto mt-4">
            <div className="mt-0 text-2xl font-bold uppercase tracking-[0.2em] text-[#ff8a7a] max-[500px]:text-xl">
              Modelo
            </div>
          </div>
</footer>
            </div>


        </div>
    )
}