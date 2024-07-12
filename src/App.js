import './App.css';
import * as mui from '@mui/material';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { RouterProvider, createBrowserRouter} from 'react-router-dom';
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

let routers = createBrowserRouter([
  { path:'/' ,element: <Layout/> ,children:[


    {index:true ,element:<Home/>},

    {path:'register',element:<Register/>},
    {path:'login',element:<Login/>},
    {path:'drop',element:<Drop/>},
    {path:'cart',element:<Cart/>},
    {path:'checkOut',element:<Check/>},
    {path:'wishlist',element:<Wishlist/>},
    {path : 'productdetails/:id' ,element:<ProductDetails/> },
    {path:'contact',element:<ContactUs/>},
    {path:'about',element:<AboutUs/>},
    {path:'*',element:<Notfound/>}

  ]} 
])


function App() {
  const [loader, setLoader] = useState(true)
  useEffect(() => {
    setTimeout(() => setLoader(false), 1000);
  }, []);

  return loader ? (
    <div style={{display: "flex", justifyContent: "center", alignItems: "center", width: '100vw', height: "100vh"}}>
      <img src={loaderimg} alt="" className='loader' style={{width: 100}}/>
    </div>
  ) : (
    <RouterProvider router={routers}></RouterProvider>
  )

}

export default App;
