import { useContext, useEffect, useRef, useState } from "react";
import thisContext from "./context";
import profilePic from "./images/profileAvatar.jpg"
import axios from "axios";
import { useNavigate,useLocation } from "react-router-dom";
export default function ViewModel() {
  const nav = useNavigate()
  const loc=useLocation()
  const [open, setOpen] = useState(false);
  const { view, setView } = useContext(thisContext)
  const [profile, setProfile] = useState("")
  const [dropDown, setDropDown] = useState("")
  const [name, setName] = useState("")
  const [address, setAddress] = useState({})
  const [secondaryAddress,setSecondaryAddress]=useState({})
  const { mobile, setMobile,setPrimaryAddress,setSecondaryAddressCh,addressType,setAddressType } = useContext(thisContext)
  const [products, setProducts] = useState([])
  const [location, setLocation] = useState(null)
  const [placeName, setPlaceName] = useState("")
  const profileRef = useRef()
  const dropdownRef = useRef()
  const { user, setUser, emailLogin, setEmailLogin } = useContext(thisContext)
  const [seller,setSeller]=useState([])
  const [locationName,setLocationName]=useState("")
  const [viewDetails,setViewDetails]=useState(false)
  const [selectedProduct,setSelectedProduct]=useState("")
  const [searchValue,setSearchValue]=useState("")
  const [scale,setScale]=useState("")
  const filterProduct=products.filter(product=>{
   return(
    (
     (product.model||"").toLowerCase().includes(searchValue.toLowerCase())||
     (product.brand||"").toLowerCase().includes(searchValue.toLowerCase())||
     product.price?.toString().includes(searchValue)
    )&&
    (scale == "" || product.scale === scale)
  )

  })
  


  useEffect(() => {
    async function fetchData() {
      if (emailLogin === true) {
        const token = document.cookie.split("; ").find(row => row.startsWith("token="))?.split("=")[1];
        localStorage.setItem("token", token)
      }
      try {
        const res = await axios.get("http://localhost:5000/user/getProfile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        })
        console.log(res.data.user)
        setUser(res.data.user)
        setName(res.data.user.name)
        setAddress(res.data.user.address[0])
        setSecondaryAddress(res.data.user.address[1])
        const productRes = await axios.get("http://localhost:5000/user/getProducts")
        setProducts(productRes.data.products)
        const sellerRes=await axios.get("http://localhost:5000/user/getSellers")
        setSeller(sellerRes.data.sellers)
        console.log(productRes.data.products)
        console.log(sellerRes.data.sellers)

      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
  }, [])


  async function handleOrder(product) {
    const productId = product._id
    const amount = product.price
    if(secondaryAddress!=undefined&&addressType===""){
      setPrimaryAddress(address)
      setSecondaryAddressCh(secondaryAddress)
       nav("/chooseAddress", {
        state: { product }
    });

    return;
    }
    else{
      setAddressType("primary")
    }
    try {
      const res = await axios.post(`http://localhost:5000/payment/createOrders`, {
        amount: amount,
        orderId: productId
      },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`
          }
        })
      const options = {
        key: "rzp_test_TUeij09k01uWXJ",

        amount: res.data.amount,

        currency: res.data.currency,

        name: "Modelo",

        description: "Order Payment",

        order_id: res.data.razorpayOrderId,

        handler: async function (response) {
          console.log(response);
          try {
            const verify = await axios.post(
              "http://localhost:5000/payment/verify",
              {
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                product,
                user,
                addressType
              },
              {
                headers: {
                  authorization: `Bearer ${localStorage.getItem("token")}`
                }
              }
            )

            alert(verify.data.data)
            window.location.reload()

          } catch (error) {
            console.log(error);
          }
        }
      }


      const razorpay = new window.Razorpay(options);

      razorpay.open();
    } catch (err) {
      console.log(err)
    }
  


  }

  useEffect(() => {
    const state = loc.state;

    if (state?.continueOrder && state.product) {
        nav("/viewModel", {
            replace: true,
            state: null
        });

        handleOrder(state.product);
    }
}, [loc.state]);


  function getLocation() {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        console.log("LAT:", position.coords.latitude);
        console.log("LON:", position.coords.longitude);
        console.log("ACCURACY:", position.coords.accuracy);
        console.log("LAT:", position.coords.latitude);
        console.log("LON:", position.coords.longitude);
        console.log("ACCURACY:", position.coords.accuracy);

        setLocation({
          latitude,
          longitude,
        });
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );

          const data = await res.json();

          setPlaceName(data.display_name);
        } catch (err) {
          console.log(err);
        }
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

 
function LocationName({ seller, className }) {
  const [locationName, setLocationName] = useState("");

  useEffect(() => {
    seller.location&&
    getLocationName(
      seller.location.coordinates[1],
      seller.location.coordinates[0]
    )
  
  }, [seller]);

  async function getLocationName(latitude, longitude) {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
      );

      const data = await res.json();

      setLocationName(data.display_name);
    } catch (err) {
      console.log(err);
    }
  }

  return <p className={className}>{locationName}</p>;
}
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

function productMoreDetails(product){
  setSelectedProduct(product)
  setViewDetails(true)
}

function productLessDetails(){
  setSelectedProduct("")
  setViewDetails(false)
}

async function handleAddToCart(product){
  try{
    const res=await axios.post(`http://localhost:5000/user/addToCart`,{product},{
      headers:{
        Authorization:`Bearer ${localStorage.getItem("token")}`
      }
    })
    if(res.data.success){
      alert("Product added to cart successfully")
    }
  }catch(err){
    console.log(err)
  }
}

  return (
   <div className="mt-0 font-sans antialiased">
      {/* ------------------------------------------------- */}
      {/* Header */}
      {/* ------------------------------------------------- */}
      <nav className="bg-gradient-to-r from-gray-900 to-gray-800 shadow-lg">
        <div className="mx-auto flex flex-wrap items-center justify-between px-4 py-4 lg:px-12">
          {/* Logo */}
          <div className="flex w-full items-center lg:w-auto">
            <h1 className="text-2xl font-bold uppercase tracking-wider text-[#ff8a7a]">
              Modelo
            </h1>
          </div>
          {/* Desktop menu */}
          <div className="w-full flex-grow lg:flex lg:w-auto lg:items-center lg:px-3">
            <div className="hidden lg:flex gap-2">
              <button
                onClick={() => setView("model")}
                className={`rounded px-4 py-2 text-sm font-medium transition-colors ${
                  view === "model"
                    ? "bg-red-600 text-white"
                    : "text-red-400 hover:bg-red-600 hover:text-white"
                }`}
              >
                Search by model
              </button>
              <button
                onClick={() => setView("seller")}
                className={`rounded px-4 py-2 text-sm font-medium transition-colors ${
                  view === "seller"
                    ? "bg-red-600 text-white"
                    : "text-red-400 hover:bg-red-600 hover:text-white"
                }`}
              >
                Search by shop
              </button>
             
            </div>
            {/* Search bar – Desktop */}
            <div className="relative hidden lg:block ml-4">
              <input
                className="h-10 w-64 rounded-lg border border-gray-700 bg-gray-800 px-3 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600"
                type="search"
                name="search"
                placeholder="Search"
                onChange={(e)=>setSearchValue(e.target.value)}
              />
              <button
                type="submit"
                aria-label="Search"
                className="absolute right-2 top-2.5 text-gray-400 hover:text-white"
              >
                {/* magnifying glass */}
                <svg
                  className="h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 56.966 56.966"
                >
                  <path
                    fill="currentColor"
                    d="M55.146 51.887L41.588 37.786c3.486-4.144 5.396-9.358 5.396-14.786 0-12.682-10.318-23-23-23s-23 10.318-23 23 10.318 23 23 23c4.761 0 9.298-1.436 13.177-4.162l13.661 14.208c.571.593 1.339.92 2.162.92.779 0 1.518-.297 2.079-.837 1.147-1.193 1.109-3.095-.038-4.288zM23.984 6c9.374 0 17 7.626 17 17s-7.626 17-17 17-17-7.626-17-17 7.626-17 17-6z"
                  />
                </svg>
              </button>
            </div>
            {/* Profile avatar */}
            <div className="flex items-center ml-auto">
              <button onClick={() => setProfile(!profile)} className="focus:outline-none">
                <img
                  className="h-10 w-10 rounded-full object-cover transition-transform hover:scale-105"
                  src={profilePic}
                  alt="Profile"
                />
              </button>
            </div>
          </div>
        </div>
      </nav>
      {/* ------------------------------------------------- */}
      {/* Mobile navigation (hidden on lg) */}
      {/* ------------------------------------------------- */}
      <div className="flex justify-around border-b border-gray-700 bg-gray-900 px-4 py-3 lg:hidden">
        <button
          onClick={() => setView("model")}
          className={`rounded px-2 py-1 text-sm font-medium transition-colors ${
            view === "model"
              ? "bg-red-600 text-white"
              : "text-red-400 hover:bg-red-600 hover:text-white"
          }`}
        >
          Search by model
        </button>
        <button
          onClick={() => setView("seller")}
          className={`rounded px-2 py-1 text-sm font-medium transition-colors ${
            view === "seller"
              ? "bg-red-600 text-white"
              : "text-red-400 hover:bg-red-600 hover:text-white"
          }`}
        >
          Search by shop
        </button>
      </div>
      {/* Mobile search bar */}
      <div className="relative border-b border-gray-700 bg-gray-900 px-4 py-3 lg:hidden">
        <input
          className="h-10 w-full rounded-lg border border-gray-700 bg-gray-800 px-3 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600"
          type="search"
          name="search"
          placeholder="Search"
        />
      </div>
      {/* ------------------------------------------------- */}
      {/* Main content */}
      {/* ------------------------------------------------- */}
      <div className="relative min-h-screen bg-[oklch(21%_0.034_264.665)] pb-32">
        {/* Profile dropdown */}
        {profile && (
          <div
            ref={profileRef}
            className="absolute top-2 right-2 z-50 w-64 rounded-lg bg-gray-800 border border-red-600 p-4 shadow-xl"
          >
            <img
              className="mx-auto mb-4 h-24 w-24 rounded-full object-cover"
              src={profilePic}
              alt="Profile"
            />
            <h5 className="text-center text-2xl font-semibold text-red-400">{name}</h5>
            <p className="mt-2 text-sm text-gray-300">
              <span className="font-medium text-red-400">Address:</span>{' '}
              {address?.house && <>{address.house}<br /></>}
              {address?.city && <>{address.city}<br /></>}
              {address?.district && <>{address.district}<br /></>}
              {address?.state && <>{address.state}<br /></>}
              {address?.pinCode && <>{address.pinCode}<br /></>}
            </p>
            {secondaryAddress===undefined?(
              <button className=" rounded-lg bg-red-600 px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-red-500 hidden sm:block"
      onClick={()=>nav("/secondaryAddress")} >Add secondary address</button>
            ):<>
            <p className="mt-2 text-sm text-gray-300">
              <span className="font-medium text-red-400">Secondary Address:</span>{' '}
              {secondaryAddress?.house && <>{secondaryAddress.house}<br /></>}
              {secondaryAddress?.city && <>{secondaryAddress.city}<br /></>}
              {secondaryAddress?.district && <>{secondaryAddress.district}<br /></>}
              {secondaryAddress?.state && <>{secondaryAddress.state}<br /></>}
              {secondaryAddress?.pinCode && <>{secondaryAddress.pinCode}<br /></>}
            </p>
            </>}
          </div>
        )}
        {/* Product detail modal */}
        {viewDetails && (
          <div className="fixed top-32 right-2 z-50 w-80 rounded-lg bg-gray-800 border border-red-600 p-4 shadow-xl">
            <h1 className="text-white text-xl text-center mb-2">
              Scale: {selectedProduct?.scale}
            </h1>
            <p className="text-white text-center mb-4">
              Description: {selectedProduct?.description}
            </p>
            <button
              onClick={productLessDetails}
              className="mx-auto block w-full rounded-full bg-red-600 px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-red-500"
            >
              Back
            </button>
          </div>
        )}
        {/* Location button / display */}
        {location == null ? (
          <button
            className="absolute left-10 top-12 text-gray-400 hover:underline"
            onClick={getLocation}
          >
            Get your location
          </button>
        ) : (
          <p className="absolute left-10 top-12 text-gray-400">{placeName}</p>
        )}
        {/* CTA buttons */}
          <div className="relative left-[55vw] top-[6vh] w-[260px]">
  {/* The native arrow is hidden and we add a custom chevron via background‑image */}
  <select
    className={`
      block w-full h-10 pl-4 pr-10
      rounded-2xl
      bg-black
      border border-white/20
      text-red-600
      placeholder-gray-400
      focus:outline-none focus:ring-2 focus:ring-red-600
      cursor-pointer
      appearance-none   /* hide the default select arrow */
    `}
    value={scale}
    onChange={(e) => setScale(e.target.value)}
  >
    <option value="">Select Scale</option>
    <option value="1:12">1:12</option>
    <option value="1:18">1:18</option>
    <option value="1:24">1:24</option>
    <option value="1:32">1:32</option>
    <option value="1:36">1:36</option>
    <option value="1:43">1:43</option>
    <option value="1:64">1:64</option>
  </select>
  {/* Chevron icon – positioned on the right side of the select */}
  <svg
    className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-red-600"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z"
      clipRule="evenodd"
    />
  </svg>
</div>
        <button
          onClick={() => nav("/userCart")}
          className="absolute top-12 right-72 rounded-lg bg-red-600 px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-red-500 hidden sm:block"
        >
          View cart
        </button>
        <button
          onClick={() => nav("/trackOrder")}
          className="absolute top-12 right-32 rounded-lg bg-red-600 px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-red-500 hidden sm:block"
        >
          Track your orders
        </button>
        {/* Product / Seller grid */}
        <div className="pt-40 flex flex-wrap justify-center gap-6 lg:gap-8">
          {/* Models view */}
          {view === "model" &&
            filterProduct.map((product, index) => (
              <div
                key={index}
                className="relative h-[70vh] w-[20vw] max-w-sm bg-gray-900 rounded-xl shadow-lg overflow-hidden transform transition-transform hover:scale-105"
              >
                <img
                  src={`http://localhost:5000/uploads/${product.image}`}
                  alt={product.model}
                  className="h-1/2 w-full object-cover"
                />
                <div className="p-4 text-center">
                  <h2 className="text-white text-lg font-semibold">{product.model}</h2>
                  <p className="text-gray-400">Price: {product.price} rs</p>
                  <p className="text-gray-400 mb-2">Brand: {product.brand}</p>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-600 text-white mr-2 hover:bg-red-500"
                  >
                    🛒
                  </button>
                  <button
                    onClick={() => handleOrder(product)}
                    className="inline-block w-full rounded-full bg-black border border-white/20 px-4 py-2 text-xs font-bold text-red-600 transition-colors hover:bg-red-600 hover:text-white"
                  >
                    Place order
                  </button>
                  <button
                    onClick={() => productMoreDetails(product)}
                    className="mt-2 inline-block w-full rounded-full bg-black border border-white/20 px-4 py-2 text-xs font-bold text-red-600 transition-colors hover:bg-red-600 hover:text-white"
                  >
                    View details
                  </button>
                </div>
              </div>
            ))}
          {/* Sellers view */}
          {view === "seller" &&
            seller.map((s, idx) => (
              <div
                key={idx}
                className="relative h-[50vh] w-[80vw] max-w-2xl mx-auto rounded-xl bg-gray-900 p-6 shadow-lg hover:scale-105 transition-transform"
              >
                <h3 className="text-red-400 text-2xl font-bold mb-2">{s.shop}</h3>
                <LocationName seller={s} className="text-gray-400 text-sm" />
                
              </div>
            ))}
        </div>
      </div>
      {/* ------------------------------------------------- */}
      {/* Footer */}
      {/* ------------------------------------------------- */}
     <footer className="bg-zinc-900 w-full h-[30vh] relative border-t border-red-700  bottom-0 overflow-x-hidden flex justify-center" >
                    <div className="relative max-[500px]:top-[30px] bottom-[50px] flex w-full items-center lg:w-auto">
                        <div className="mt-0 text-2xl font-bold uppercase tracking-[0.2em] text-[#ff8a7a] max-[500px]:text-xl">
                            Modelo
                        </div>
                    </div>
                </footer>
    </div>
  )
}
