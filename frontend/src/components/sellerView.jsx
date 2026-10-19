import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import profilePic from "./images/profileAvatar.jpg";
import axios from "axios";
import thisContext from "./context";
import { useContext } from "react";
import bgImage from "./images/sellerViewImage3.jpg"
export default function SellerView() {
  const nav = useNavigate();
  const {
    street,
    setStreet,
    city,
    setCity,
    state,
    setState,
    pin,
    setPin,
    mobile,
    setMobile,
    sellerProduct,
    setSellerProduct,
    sellerId,
    setSellerId,
    emailLogin,
  } = useContext(thisContext);
  const [open, setOpen] = useState(false);
  const [dropdown, setDropDown] = useState(false);
  const [profile, setProfile] = useState(false);
  const [profileType, setProfileType] = useState("");
  const [sellerName, setSellerName] = useState("");
  const [sellerProducts, setSellerProducts] = useState([]);
  const [location, setLocation] = useState(null);
  const [locationButton, setLocationButton] = useState(true);
  const [orders, setOrders] = useState([]);
  const dropdownRef = useRef(null);
  const profileRef = useRef(null);
  function getLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => console.error(error),
      { enableHighAccuracy: true, maximumAge: 0, timeout: 10000 }
    );
  }
  async function saveLocation() {
    alert("Are you sure about the location");
    try {
      const res = await axios.post("http://localhost:5000/seller/location", {
        sellerId,
        latitude: location.latitude,
        longitude: location.longitude,
      });
      alert(res.data.message);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    const fetchSellerData = async () => {
      if (emailLogin === true) {
        const token = document.cookie
          .split("; ")
          .find((row) => row.startsWith("token="))
          ?.split("=")[1];
        localStorage.setItem("token", token);
      }
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/seller/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSellerId(res.data.seller._id);
        setSellerName(res.data.seller.shop);
        setProfileType(res.data.seller.seller);
        setStreet(res.data.seller.address[0].street);
        setCity(res.data.seller.address[0].city);
        setState(res.data.seller.address[0].state);
        setPin(res.data.seller.address[0].pinCode);
        setMobile(res.data.seller.mobileNumber);
        setSellerProducts(res.data.seller.product);
        setOrders(res.data.seller.orders);
        if (res.data.seller.location) {
          setLocation({
            longitude: res.data.seller.location.coordinates[0],
            latitude: res.data.seller.location.coordinates[1],
          });
          setLocationButton(false);
        } else {
          setLocation(null);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchSellerData();
  }, []);
  // Click‑outside handling for dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropDown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  // Click‑outside handling for profile panel
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfile(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  function acceptOrder(order) {
    setSellerProduct(order);
    nav("/acceptOrder");
  }
  return (
    <div className="overflow-x-hidden bg-gray-950 text-red-300">
      {/* Navigation Bar */}
      <nav className="bg-gradient-to-r from-gray-900 to-gray-800 shadow-md">
        <div className="mx-auto flex flex-wrap items-center justify-between px-4 py-4 lg:px-12">
          <div className="flex w-full items-center justify-between lg:w-auto">
            <div className="text-2xl font-bold uppercase tracking-[0.2em] text-red-500">
              Modelo
            </div>
            <button
              type="button"
              aria-label="Toggle menu"
              aria-expanded={open}
              className="inline-flex items-center justify-center rounded p-2 text-red-400 hover:bg-gray-800 lg:hidden"
            >
              <img
                className="w-[40px] h-[40px] mb-6 rounded-full"
                src={profilePic}
                alt="Profile"
              />
            </button>
          </div>
          <div
            className={`${
              open ? "block" : "hidden"
            } w-full flex-grow lg:flex lg:w-auto lg:items-center lg:px-3`}
          >
            <div className="absolute top-[2vh] right-[5vw] flex flex-col lg:flex-row lg:items-center">
              <button onClick={() => setProfile(true)}>
                <img
                  className="w-[40px] h-[40px] mb-6 rounded-full"
                  src={profilePic}
                  alt="Profile"
                />
              </button>
            </div>
          </div>
        </div>
      </nav>
      {/* Mobile Search Bar */}
      <div className="relative border-b border-gray-700 bg-gray-900 px-4 py-3 text-gray-400 lg:hidden">
        <input
          className="h-10 w-full rounded-lg border-2 border-gray-600 bg-gray-800 pl-3 pr-10 text-sm focus:outline-none text-gray-200"
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
            className="h-4 w-4 fill-current text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 56.966 56.966"
          >
            <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887zM23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17s-17-7.626-17-17S14.61,6,23.984,6z"/>
          </svg>
        </button>
      </div>
      {/* Main Content Area */}
      <div className="w-screen h-[92vh] bg-gray-950">
        <div className=" inset-0 z-0">
                            <img
                                src={bgImage}
                                alt="Silver scale model car in museum setting"
                                className="h-full w-full object-cover opacity-40"
                            />
                            <div className=" inset-0 bg-gradient-to-r from-[#1a1e23] via-[#1a1e23]/80 to-transparent" />
                        </div>
        {/* Profile Panel */}
        {profile && (
          <div
            ref={profileRef}
            className="absolute right-0 top-[9vh] min-h-[50vh] z-10 bg-gray-900 bg-opacity-80 backdrop-blur-lg max-w-xs w-full p-6 border border-red-600 rounded-lg shadow-lg"
          >
            <button
              onClick={() => setDropDown(true)}
              className="absolute top-2 end-2 text-white bg-gray-800 border border-transparent rounded-full p-1.5 hover:text-gray-300 hover:bg-gray-700 focus:ring-4 focus:ring-gray-600 focus:outline-none"
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
              <div
                ref={dropdownRef}
                className="absolute top-10 right-0 z-10 w-36 bg-gray-800 rounded-lg shadow-lg"
              >
                <ul
                  className="p-2 text-sm text-gray-200 font-medium"
                  aria-labelledby="dropdownButton"
                >
                  <li>
                    <a
                      href="#"
                      className="inline-flex w-full items-center rounded-md p-2 text-white hover:bg-gray-700 hover:text-red-400"
                    >
                      Edit
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="inline-flex w-full items-center rounded-md p-2 text-white hover:bg-gray-700 hover:text-red-400"
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
                alt="Profile"
              />
              <h5 className="mb-0.5 text-2xl font-semibold tracking-tight text-red-400">
                {sellerName}
              </h5>
              <span className="text-sm text-red-500">{profileType}</span>
              <span className="relative right-[100px] top-[10px] text-md font-semibold text-red-400">
                Address:
              </span>
              <span className="text-sm text-red-300 relative bottom-[20px]">
                {street}
                <br />
                {city}
                <br />
                {state}
                <br />
                {pin}
              </span>
              <span className="relative right-[100px] text-md font-semibold text-red-400">
                Mobile:
              </span>
              <span className="text-sm text-red-300 relative bottom-[20px]">
                {mobile}
              </span>
              {location == null ? (
                <button className="text-gray-500" onClick={getLocation}>
                  get your location
                </button>
              ) : (
                <div>
                  <p className="text-gray-400">
                    Latitude: {location.latitude}
                  </p>
                  <p className="text-gray-400">
                    Longitude: {location.longitude}
                  </p>
                  {locationButton && (
                    <button
                      className="mt-2 border border-white/20 bg-gray-800 px-5 py-2 text-xs font-bold tracking-widest text-red-500 uppercase transition-colors hover:bg-red-700 hover:text-white shadow-md"
                      onClick={saveLocation}
                    >
                      Add this location
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
        {/* Manage Products Section */}
        <div className="absolute top-[20vh] left-[20px] w-[50vw] h-[30vh] bg-gray-900 bg-opacity-70 backdrop-blur-md shadow-lg rounded-lg">
          <h1 className="mb-6 text-4xl font-bold leading-[1.1] tracking-tighter uppercase text-red-500 text-center pt-4">
            Manage products
          </h1>
          <button
            className="absolute bottom-[5vh] left-[10vw] border border-white/20 bg-gray-800 px-5 py-2 text-xs font-bold tracking-widest text-red-500 uppercase transition-colors hover:bg-red-700 hover:text-white shadow-md"
            onClick={() => nav("/addProduct")}
          >
            Add products
          </button>
          <button
            className="absolute bottom-[5vh] left-[28vw] border border-white/20 bg-gray-800 px-5 py-2 text-xs font-bold tracking-widest text-red-500 uppercase transition-colors hover:bg-red-700 hover:text-white shadow-md"
            onClick={() => nav("/manageOrder")}
          >
            Manage order status
          </button>
        </div>
        {/* Orders List */}
        <div className="absolute top-[20vh] right-[100px] w-[30vw] h-[70vh] bg-gray-900 bg-opacity-70 backdrop-blur-md overflow-y-auto overflow-x-hidden rounded-lg">
          <h1 className="mb-6 text-3xl font-bold leading-[1.1] tracking-tighter uppercase text-red-500 text-center pt-4">
            Orders
          </h1>
          {orders.map((order,index) => (
            <div
              key={index}
              className="w-full h-[12vh] border-y border-red-600 hover:scale-105 hover:font-bold relative p-2 bg-gray-800"
            >
              <p className="relative left-[10px] text-red-400 font-medium">{order.model}</p>
              <p className="relative left-[10px] text-red-400 font-medium">price: {order.price}</p>
              <p className="relative left-[10px] text-red-400 font-medium">Brand: {order.brand}</p>
              <button
                className="absolute right-[20px] bottom-[8px] border border-white/20 bg-gray-800 px-4 py-2 text-xs font-bold tracking-widest text-red-500 uppercase transition-colors hover:bg-red-700 hover:text-white shadow-md"
                onClick={() => acceptOrder(order)}
              >
                Accept order
              </button>
            </div>
          ))}
        </div>
       
      </div>
      {/* Products Grid */}
      <div className="relative w-full min-h-screen bg-gray-950 py-8 border-1 border-t border-red-700">
        <h1 className="mb-6 text-3xl font-bold leading-[1.1] tracking-tighter uppercase text-red-500 text-center">
          My products
        </h1>
        <div className="w-full flex flex-wrap gap-4 justify-center">
          {sellerProducts.map((product, index) => (
            <div
              key={index}
              className="relative h-[85vh] w-[20vw] bg-gray-900 bg-opacity-70 backdrop-blur-md border border-red-600 rounded-lg m-4 hover:scale-105 transition-transform"
            >
              <img
                src={`http://localhost:5000/uploads/${product.image}`}
                alt={product.image}
                className="w-[95%] h-[40%] mx-auto rounded-md"
              />
              <h2 className="mt-2 text-center text-white font-bold text-lg">
                model: {product.model}
              </h2>
              <p className="text-center text-gray-300 px-2">
                Description: {product.description}
              </p>
              <p className="text-center text-white">Price: ₹{product.price}</p>
              <p className="text-center text-white">Scale: {product.scale}</p>
              <p className="text-center text-white">Brand: {product.brand}</p>
               <p className="text-center text-white">Stock: {product.stock}</p>
              <div className="flex justify-center space-x-2 mt-4">
                <button className="border border-white/20 bg-gray-800 px-4 py-2 text-xs font-bold tracking-widest text-red-500 uppercase transition-colors hover:bg-red-700 hover:text-white shadow-md rounded-full">
                  Edit
                </button>
                <button className="border border-white/20 bg-gray-800 px-4 py-2 text-xs font-bold tracking-widest text-red-500 uppercase transition-colors hover:bg-red-700 hover:text-white shadow-md rounded-full">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Footer */}
      <footer className="bg-gray-900 w-full h-[30vh] border-t border-red-600 flex justify-center items-center">
        <div className="text-2xl font-bold uppercase tracking-[0.2em] text-[#ff8a7a]">
          Modelo
        </div>
      </footer>
    </div>
  );
}