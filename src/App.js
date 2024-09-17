import './App.css';
import * as mui from '@mui/material';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { RouterProvider, createBrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Layout from './component/Layout/Layout';
import Home from './component/Home/Home';
import ContactUs from './component/ContactUs/ContactUs';
import AboutUs from './component/AboutUs/AboutUs';
import Notfound from './component/Notfound/Notfound';
import Register from './component/Register/Register';
import Login from './component/Login/Login';
import '@fontsource/inter';
import '@fontsource/roboto';
import Drop from './component/Drop/Drop';
import ProductDetails from './component/ProductDetails/ProductDetails';
import CartContextProvider from './CartContext';
import Cart from './component/Cart/Cart';
import Wishlist from './component/Wishlist/Wishlist';
import Check from './component/CheckOut/Check';
import { useEffect, useState } from 'react';
import loaderimg from "./../src/assets/images/loader.jpg"
import Checkout from './component/PaymentCheckout/Checkout';
import useAuth from './hooks/useAuth';



const ProtectedRoute = ({ element }) => {
   const { isAuthentication } = useAuth();
  return isAuthentication ? element : <Navigate to="/login" />;
};

const NoProtectedRoute = ({ element }) => {
   const { isAuthentication } = useAuth();
   console.log(isAuthentication);
   
  return !isAuthentication ? element : <Navigate to="/" />;
};



// const ProtectedRoute = ({ element, isAuthentication }) => {
//   return isAuthentication ? element : <Navigate to="/login" />;
// };

let routers = createBrowserRouter([
  { path:'/' ,element: <Layout/> ,children:[
    {index:true ,element:<Home/>},
    {path:'register',element:<NoProtectedRoute element={<Register/>} />},
    {path:'login',element:<NoProtectedRoute element={<Login/>} />},
    {path:'drop',element:<Drop/>},
    {path:'cart',element:<ProtectedRoute element={<Cart />}/>},
    {path:'checkOut',element:<ProtectedRoute element={<Checkout/>} />},
    {path:'wishlist',element:<ProtectedRoute element={<Wishlist/>} />},
    {path : 'productdetails/:id' ,element:<ProductDetails/> },
    {path:'contact',element:<ContactUs/>},
    {path:'about',element:<AboutUs/>},
    {path:'*',element:<Notfound/>}
  ]} 
])

function App() {
  const [loader, setLoader] = useState(true);
  const { isAuthentication } = useAuth();

  useEffect(() => {
    setTimeout(() => setLoader(false), 1000);
  }, []);

  return loader ? (
    <div style={{display: "flex", justifyContent: "center", alignItems: "center", width: '100vw', height: "100vh"}}>
      <img src={loaderimg} alt="Loading..." className='loader' style={{width: 100}}/>
    </div>
  ) : (
    <RouterProvider router={routers}>
      {/* <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={!isAuthentication ? <Login /> : <Navigate to="/" />} />
          <Route path="/register" element={!isAuthentication ? <Register />: <Navigate to="/" />} />
          <Route path="/drop " element={<Drop />} />
          <Route path="cart" element={isAuthentication ? <Cart/> : <Login></Login>} />
          <Route path="checkOut" element={<ProtectedRoute element={<Checkout />} isAuthentication={isAuthentication} />} />
          <Route path="wishlist" element={<ProtectedRoute element={<Wishlist />} isAuthentication={isAuthentication} />} />
          <Route path="productdetails/:id" element={<ProductDetails />} />
          <Route path="contact" element={<ContactUs />} />
          <Route path="about" element={<AboutUs />} />
          <Route path="*" element={<Notfound />} />
        </Route>
      </Routes> */}
    </RouterProvider>
  )
}

export default App;
