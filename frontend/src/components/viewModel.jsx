import { useContext, useEffect, useRef, useState } from "react";
import thisContext from "./context";
import profilePic from "./images/profileAvatar.jpg"
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function ViewModel() {
  const nav = useNavigate()
  const [open, setOpen] = useState(false);
  const { view, setView } = useContext(thisContext)
  const [profile, setProfile] = useState("")
  const [dropDown, setDropDown] = useState("")
  const [name, setName] = useState("")
  const [address, setAddress] = useState({})
  const { mobile, setMobile } = useContext(thisContext)
  const [products, setProducts] = useState([])
  const [location, setLocation] = useState(null)
  const [placeName, setPlaceName] = useState("")
  const profileRef = useRef()
  const dropdownRef = useRef()
  const { user, setUser, emailLogin, setEmailLogin } = useContext(thisContext)
  const [seller,setSeller]=useState([])
  const [locationName,setLocationName]=useState("")



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
                user
              },
              {
                headers: {
                  authorization: `Bearer ${localStorage.getItem("token")}`
                }
              }
            )

            alert(verify.data.data)

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
  return (
    <div className="mt-0" >
      <nav className="bg-gradient-to-r from-gray-900 to-gray-200 shadow max-[500px]:overflow-x-hidden">
        <div className="mx-auto flex flex-wrap items-center justify-between px-4 py-4 lg:px-12 max-[500px]:px-3">

          {/* Logo */}
          <div className="relative max-[500px]:top-[30px] flex w-full items-center lg:w-auto">
            <div className="mt-0 text-2xl font-bold uppercase tracking-[0.2em] text-[#ff8a7a] max-[500px]:text-xl">
              Modelo
            </div>
          </div>

          {/* Menu */}
          <div className="w-full flex-grow lg:flex lg:w-auto lg:items-center lg:px-3 max-[500px]:overflow-x-hidden">

            {/* Search-by links - Desktop */}
            <div className="hidden text-md font-bold lg:flex lg:flex-grow lg:flex-row lg:items-center">
              <button
                onClick={() => setView("model")}
                className={
                  view === "model"
                    ? "mr-2 inline-block rounded bg-red-700 px-4 py-2 text-white"
                    : "mr-2 inline-block rounded px-4 py-2 text-red-600 hover:bg-red-700 hover:text-white"
                }
              >
                Search by model
              </button>

              <button
                onClick={() => setView("seller")}
                className={
                  view === "seller"
                    ? "mr-2 inline-block rounded bg-red-700 px-4 py-2 text-white"
                    : "mr-2 inline-block rounded px-4 py-2 text-red-600 hover:bg-red-700 hover:text-white"
                }
              >
                Search by shop
              </button>
            </div>

            {/* Search - Desktop */}
            <div className="relative right-[6vw] hidden bg-black text-white lg:block lg:mt-0">
              <input
                className="h-10 w-full rounded-lg border-2 border-gray-800 bg-black pl-2 pr-8 text-sm focus:outline-none lg:w-auto"
                type="search"
                name="search"
                placeholder="Search"
              />

              <button
                type="submit"
                aria-label="Search"
                className="absolute right-2 top-3"
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

            {/* Profile */}
            <div className="flex flex-col lg:flex-row lg:items-center">
              <button onClick={() => setProfile(!profile)}>
                <img
                  className="relative top-[2vh] mb-6 h-[40px] w-[40px] rounded-full max-[500px]:top-0 max-[500px]:left-[300px] max-[500px]:mb-2"
                  src={profilePic}
                  alt="Profile"
                />
              </button>
            </div>

          </div>
        </div>
      </nav>

      {/* Search-by links - Mobile */}
      <div className="flex justify-around border-b border-gray-200 bg-white px-4 py-3 lg:hidden max-[500px]:overflow-x-hidden max-[500px]:px-2">

        <button
          onClick={() => setView("model")}
          className={
            view === "model"
              ? "mr-2 inline-block rounded bg-red-700 px-4 py-2 text-white max-[500px]:px-2"
              : "mr-2 inline-block rounded px-4 py-2 text-red-600 hover:bg-red-700 hover:text-white max-[500px]:px-2"
          }
        >
          Search by model
        </button>

        <button
          onClick={() => setView("seller")}
          className={
            view === "seller"
              ? "mr-2 inline-block rounded bg-red-700 px-4 py-2 text-white max-[500px]:px-2"
              : "mr-2 inline-block rounded px-4 py-2 text-red-600 hover:bg-red-700 hover:text-white max-[500px]:px-2"
          }
        >
          Search by shop
        </button>

      </div>

      {/* Search bar - Mobile */}
      <div className="relative border-b border-gray-200 bg-white px-4 py-3 text-gray-600 lg:hidden max-[500px]:overflow-x-hidden max-[500px]:px-2">
        <input
          className="h-10 w-full rounded-lg border-2 border-gray-300 bg-white pl-3 pr-10 text-sm focus:outline-none"
          type="search"
          name="search"
          placeholder="Search"
        />
      </div>
      <div className="relative min-h-screen w-full bg-[oklch(21%_0.034_264.665)]" >
        {profile &&
          <div ref={profileRef} className="z-50 max-[500px]:h-[40vh] max-[500px]:w-full absolute top-[2px] right-[2px] bg-black border-2 border-red-700 min-h-[50vh] w-[20vw]">
            <img
              className="mx-auto relative top-[5px] mb-6 h-24 w-24 rounded-full"
              src={profilePic}
              alt="Bonnie image"
            />

            <h5 className="mb-0.5 text-2xl text-center font-semibold tracking-tight text-red-700">{name}
            </h5>


            <span className="relative top-[10px] left-[10px] text-md font-semibold text-red-700">
              Address:
            </span>
            <span className="text-sm text-red-700 relative left-[20px] top-[10px] ">{address.house}<br></br></span>
            <span className="text-sm text-red-700 relative left-[80px] top-[10px] ">{address.city}<br></br>{address.district}<br></br> {address.state}<br></br>{address.pinCode}</span>


          </div>
        }
        {location == null ?
          <button className="text-gray-400 absolute left-[40px] top-[50px] hover:cursor-pointer" onClick={getLocation}>get your location</button> :
          <p className="text-gray-400 absolute left-[40px] top-[50px]">{placeName}</p>
        }

        <button className="z-40 absolute top-[50px] right-[150px] max-[500px]:right-[0px] max-[500px]:top-[0px] max-[500px]:bg-white max-[500px]:text-red-700  border border-white/20 bg-red-700 px-8 py-4 text-[10px] font-bold tracking-widest text-white uppercase transition-all hover:bg-black hover:text-red-700 shadow-[0_0_18px_rgba(128,128,128,0.6)] block mx-auto" onClick={() => nav("/trackOrder")} >Track your orders</button>


        <div className="pt-[20vh] relative max-[500px]:top-[100px] w-full min-h-screen flex flex-wrap gap-4 justify-center max-[500px]:overflow-x-hidden max-[500px]:pt-[5vh] max-[500px]:px-2">

          {view == "model" ? (
            products.map((product, index) => (
              <div
                key={index}
                className="h-[60vh] w-[20vw] bg-black hover:scale-105 max-[500px]:h-[65vh] max-[500px]:w-full max-[500px]:max-w-[350px]"
              >

                <img
                  src={`http://localhost:5000/uploads/${product.image}`}
                  className="h-[50%] w-[95%] mx-auto max-[500px]:w-[95%]"
                />

                <h1 className="relative top-[5px] text-white font-bold text-xl text-center max-[500px]:text-lg">
                  {product.model}
                </h1>

                <h1 className="relative top-[20px] text-white font-bold text-xl text-center max-[500px]:text-lg">
                  Price: {product.price}rs
                </h1>

                <h1 className="relative top-[25px] text-white font-bold text-xl text-center max-[500px]:text-lg">
                  Brand: {product.brand}
                </h1>

                <button
                  className="relative top-[50px]  border border-white/20 bg-black px-8 py-4 text-[10px] font-bold tracking-widest text-red-700 uppercase transition-all hover:bg-red-700 hover:text-white shadow-[0_0_18px_rgba(128,128,128,0.6)] block mx-auto max-[500px]:px-6 max-[500px]:py-3"
                  onClick={() => handleOrder(product)}
                >
                  Place order
                </button>

              </div>
            ))
          ) : (
            ""
          )}
          
          <div className="w-full min-h-screen gap-4  ">
          {view == "seller" ?(
            seller.map(seller=>(
              <div className="h-[50vh] w-[80vw] relative left-[10vw] bg-black mb-16 hover:scale-105 ">
                <h1 className="text-red-700 font-bold text-2xl relative top-[30px] left-[40px]">{seller.shop}</h1>
               <LocationName seller={seller} className="text-gray-500 text-sm relative top-[30px] left-[30px] " />
               
                </div>
            ))
            ) : (
              ""
            )
          }
          </div>

        </div>
        
<footer className="bg-black w-full h-[30vh] absolute bottom-0 overflow-x-hidden flex justify-center" >
  <div className="relative max-[500px]:top-[30px] bottom-[50px] flex w-full items-center lg:w-auto">
            <div className="mt-0 text-2xl font-bold uppercase tracking-[0.2em] text-[#ff8a7a] max-[500px]:text-xl">
              Modelo
            </div>
          </div>
</footer>
      </div>



    </div>
    
  )
}