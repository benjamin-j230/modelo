import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import FirstPage from './components/firstPage'
import UserConfig from './components/userConfig'
import Register from './components/register'
import EmailVerification from './components/emailVerification'
import HomePage from './components/homepage';
import SellerRegister from './components/sellerRegister';
import SellerConfig from './components/sellerConfig';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<FirstPage/>}/>
        <Route path='/userConfig' element={<UserConfig/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/emailVerification' element={<EmailVerification/>}/>
        <Route path="/homePage" element={<HomePage/>}/>
        <Route path="/sellerRegister" element={<SellerRegister/>}/>
        <Route path="/sellerConfig" element={<SellerConfig/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
