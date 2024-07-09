import React from 'react'
import Style from './Layout.css';
import Navbar from '../Navbar/Navbar';

import { Outlet }   from 'react-router-dom';
import Footer from '../Footer/Footer';

export default function Layout() {
  return <>
  
  
  
    <Navbar />

    <Outlet></Outlet>


    <Footer />


  
  </>
}
