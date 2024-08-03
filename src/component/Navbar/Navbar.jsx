import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Styles from './Navbar.module.css'; // Import the CSS module
import logo from './../../assets/images/logo.jpg'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCart } from '../../features/cartSlice';
export default function Navbar() {
  const location = useLocation();
  const dispatch = useDispatch()
  const isHome = location.pathname === '/' || location.pathname === '/drop';
  const [showNav, setShowNav] = useState(false)
  const cart = useSelector((state => state.cart.cart))
  // Function to handle link clicks and collapse the navbar
  const handleNavLinkClick = () => {
    setShowNav(!showNav)
  };

  useEffect(() => {
    dispatch(fetchAllCart())    
  }, [])

  return (
    <>
      <nav className={`navbar navbar-expand-lg fixed-top ${isHome ? 'bg-transparent' : 'bg-black'} ${Styles.navbar}`}>
        <div className="container">
          <button onClick={handleNavLinkClick} className={`navbar-toggler ${Styles.navbarToggler}`} type="button">
            <span className={`navbar-toggler-icon ${Styles.navbarTogglerIcon}`}></span>
          </button>
          <img src={logo} className={Styles.logo} alt="logo" />
          <div className={"navbar-collapse" + " " + (showNav ? "open" : "")} id="navbarSupportedContent">
            <i className="fa fa-close" onClick={handleNavLinkClick} type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"></i>
            <div className="search_wrapper">
              <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.297 20.9935L13.7741 14.4706C13.2533 14.9143 12.6543 15.2577 11.9772 15.5008C11.3001 15.7438 10.6196 15.8654 9.93555 15.8654C8.26749 15.8654 6.85569 15.2879 5.70013 14.1331C4.54457 12.9782 3.9668 11.5668 3.9668 9.8987C3.9668 8.23064 4.54388 6.81849 5.69805 5.66224C6.85221 4.50599 8.26332 3.92717 9.93138 3.92578C11.5994 3.92439 13.0119 4.50217 14.1689 5.65912C15.3258 6.81606 15.9043 8.22821 15.9043 9.89558C15.9043 10.6192 15.7762 11.3195 15.5199 11.9966C15.2637 12.6737 14.9269 13.2529 14.5095 13.7341L21.0324 20.256L20.297 20.9935ZM9.93659 14.8227C11.3185 14.8227 12.4852 14.347 13.4366 13.3956C14.388 12.4442 14.8637 11.2772 14.8637 9.89453C14.8637 8.51189 14.388 7.34523 13.4366 6.39453C12.4852 5.44384 11.3185 4.96814 9.93659 4.96745C8.55464 4.96676 7.38763 5.44245 6.43555 6.39453C5.48346 7.34662 5.00777 8.51328 5.00846 9.89453C5.00916 11.2758 5.48485 12.4425 6.43555 13.3945C7.38624 14.3466 8.55291 14.8223 9.93555 14.8216" fill="black"/>
              </svg>
              <input type="text" name="search" id="search" placeholder='WHAT ARE YOU LOOKING FOR?' />
            </div>
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
