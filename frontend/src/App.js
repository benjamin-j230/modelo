import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import thisContext from './components/context';
import FirstPage from './components/firstPage'
import UserConfig from './components/userConfig'
import UserRegister from './components/userRegister'
import EmailVerification from './components/emailVerification'
import UserPage from './components/userPage';
import SellerRegister from './components/sellerRegister';
import SellerConfig from './components/sellerConfig';
import ViewModel from './components/viewModel';
import Login from './components/login';
import SellerPage from './components/sellerPage';
import SellerView from './components/sellerView';
import AddProduct from './components/addProduct';
import AcceptOrder from './components/acceptOrder';
import ManageOrder from './components/manageOrder';
import TrackOrder from './components/trackOrder';


function App() {
  const [view, setView] = useState("")
  const [password, setPassword] = useState("")
  const [house, setHouse] = useState("")
  const [street, setStreet] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [pin, setPin] = useState("")
  const [mobile, setMobile] = useState("")
  const [shop, setShop] = useState("")
  const [email, setEmail] = useState("")
  const [seller, setSeller] = useState("")
  const [district, setDistrict] = useState("")
  const [user, setUser] = useState(null)
  const [sellerProduct, setSellerProduct] = useState([])
  const [sellerId, setSellerId] = useState("")
  const [emailLogin,setEmailLogin]=useState(true)
  const val = {
    shop,
    setShop,
    password,
    setPassword,
    house,
    setHouse,
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
    email,
    setEmail,
    view,
    setView,
    seller,
    setSeller,
    district,
    setDistrict,
    user,
    setUser,
    sellerProduct,
    setSellerProduct,
    sellerId,
    setSellerId,
    emailLogin,
    setEmailLogin
  }

  return (
    <thisContext.Provider value={val} >
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<FirstPage />} />
          <Route path='/userConfig' element={<UserConfig />} />
          <Route path='/register' element={<UserRegister />} />
          <Route path='/emailVerification' element={<EmailVerification />} />
          <Route path="/userPage" element={<UserPage />} />
          <Route path="/sellerRegister" element={<SellerRegister />} />
          <Route path="/sellerConfig" element={<SellerConfig />} />
          <Route path='/viewModel' element={<ViewModel />} />
          <Route path='/login' element={<Login />} />
          <Route path='/sellerPage' element={<SellerPage />} />
          <Route path='/sellerView' element={<SellerView />} />
          <Route path='/addProduct' element={<AddProduct />} />
          <Route path='/acceptOrder' element={<AcceptOrder />} />
          <Route path='/manageOrder' element={<ManageOrder/>}/>
          <Route path='/trackOrder' element={<TrackOrder/>}/>
        </Routes>
      </BrowserRouter>
    </thisContext.Provider>
  );
}

export default App;
