import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Styles from './Navbar.module.css'; // Import the CSS module
import logo from './../../assets/images/logo.jpg'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCart } from '../../features/cartSlice';
import useAuth from '../../hooks/useAuth';
export default function Navbar() {
  const location = useLocation();
  const dispatch = useDispatch()
  const isHome = location.pathname === '/' || location.pathname === '/drop';
  const [showNav, setShowNav] = useState(false)
  const cart = useSelector((state => state.cart.cart))
  const { isAuthentication } = useAuth();
  // Function to handle link clicks and collapse the navbar
  const handleNavLinkClick = () => {
    setShowNav(!showNav)
  };

  useEffect(() => {
    if (isAuthentication)   {
      dispatch(fetchAllCart())    
    }
  }, [])

  return (
    <>
      <nav style={{zIndex: 1019}} className={`navbar navbar-expand-lg fixed-top ${isHome ? 'bg-transparent' : 'bg-black'} ${Styles.navbar}`}>
        <div className="container">
          <button onClick={handleNavLinkClick} className={`navbar-toggler ${Styles.navbarToggler}`} type="button">
            <span className={`navbar-toggler-icon ${Styles.navbarTogglerIcon}`}></span>
          </button>
          <img src={logo} className={Styles.logo} alt="logo" />
          <div className={"navbar-collapse" + " " + (showNav ? "open" : "")} id="navbarSupportedContent">
            <i className="fa fa-close" onClick={handleNavLinkClick} type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"></i>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item px-3" >
                <Link className={`${Styles.navLink} nav-link text-white fw-bold`} to="/" onClick={handleNavLinkClick}>Home</Link>
              </li>
              <li className="nav-item px-3">
                <Link className={`${Styles.navLink} nav-link text-white fw-bold`} to="/drop" onClick={handleNavLinkClick}>Drop</Link>
              </li>
              <li className="nav-item px-3">
                <Link className={`${Styles.navLink} nav-link text-white fw-bold`} to="/about" onClick={handleNavLinkClick}>About us</Link>
              </li>
              <li className="nav-item px-3">
                <Link className={`${Styles.navLink} nav-link text-white fw-bold`} to="/contact" onClick={handleNavLinkClick}>Contact us</Link>
              </li>
            </ul>

            <div className={Styles.icon + " nav_icons d-flex align-items-center"}>
              <div style={{position: "relative"}}>
                {
                  (cart.length > 0 && cart[0]?.items) && (
                    <span className='cart_num'>
                      {cart[0]?.items?.length}
                    </span>
                  ) 
                }
              <Link to={'/cart'} className="text-decoration-none fa-solid fa-cart-shopping text-white px-3" onClick={handleNavLinkClick}></Link>
              </div>
              <Link to={'/wishlist'} className="text-decoration-none fa-regular fa-heart text-white px-3" onClick={handleNavLinkClick}></Link>
              <Link to="/login" onClick={handleNavLinkClick}>
                <i className="fa-regular fa-user text-white ps-3 pe-5"></i>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
