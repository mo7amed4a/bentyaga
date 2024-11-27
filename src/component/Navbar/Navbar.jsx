import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Styles from './Navbar.module.css'; // Import the CSS module
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCart } from '../../features/cartSlice';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import { API } from '../../features/globals';

export default function Navbar() {
  const location = useLocation();
  const dispatch = useDispatch()
  const router = useNavigate()
  const isHome = location.pathname === '/' || location.pathname === '/drop';
  const [showNav, setShowNav] = useState(false)
  const [showNavCat, setShowNavCat] = useState(false)
  const cart = useSelector((state => state.cart.cart))
  const wishlist = useSelector((state => state.wishlist.wishlist))
  const { isAuthentication } = useAuth();

  // Function to handle link clicks and collapse the navbar
  const handleNavLinkClick = () => {
    setShowNav(prevState => {
      const newState = !prevState;
      if (newState) {
        document.body.classList.add('nav_opened');
      } else {
        document.body.classList.remove('nav_opened');
      }
      return newState;
    });
  };
  const handleDropClick = (event) => {
    if (window.innerWidth <= 767.98) {
      event.preventDefault();
      // Perform your custom action here
      console.log("Screen width is less than or equal to 767.98px. Custom action triggered.");
      setShowNavCat (true)
      // Example: Toggle a dropdown or open a modal
    }
  };

  const handleDropBack = (event) => {
    if (window.innerWidth <= 767.98) {
      event.preventDefault();
      // Perform your custom action here
      setShowNavCat (false)
      // Example: Toggle a dropdown or open a modal
    }
  };

  useEffect(() => {
    if (isAuthentication) {
      dispatch(fetchAllCart())
    }
  }, [isAuthentication, dispatch]);
  const [categories, setCategories] = useState([]);

  // Fetch categories from API
  async function fetchCategories() {
    try {
      const { data } = await axios.get(`https://api.bantayga.wtf/categories/`);
      setCategories(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }
  useEffect(() => {
    fetchCategories();
  }, []);

  const [web, setWeb] = useState()
  async function fetchDesc() {
    try {
        const { data } = await axios.get(`https://api.bantayga.wtf/wep_site/`);
        setWeb(data);
                   
    } catch (error) {
        console.error("Error fetching products:", error);
    }
}


useEffect(() => {
  fetchDesc()
}, [])



  return (
    <>
      <nav style={{ zIndex: 1019 }} className={`navbar navbar-expand-lg fixed-top ${isHome ? 'bg-transparent' : 'bg-black'} ${Styles.navbar}`}>
        <div className="container">
          <button onClick={handleNavLinkClick} className={`navbar-toggler ${Styles.navbarToggler}`} type="button">
            <span className={`navbar-toggler-icon ${Styles.navbarTogglerIcon}`}></span>
          </button>
          <img onClick={() => router('/')} src={API + web?.logo} className={Styles.logo} alt="logo" />
          <div className={"navbar-collapse" + " " + (showNav ? "open" : "")} id="navbarSupportedContent">
            <i className="fa fa-close" onClick={handleNavLinkClick} type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"></i>
            {
              !showNavCat && (
                <>
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item px-3" >
                <Link className={`${Styles.navLink} nav-link text-white fw-bold`} to="/" onClick={handleNavLinkClick}>Home</Link>
              </li>
              <li className="nav-item px-3">
                <Link
                  className={`${Styles.navLink} dorp-link nav-link text-white fw-bold`}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                  to="/drop"
                  onClick={handleDropClick}
                >
                  Drop
                  <svg width="15" height="15" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M7.05256 2.158L14.2956 9.41399C14.3608 9.4763 14.4125 9.5513 14.4476 9.63437C14.4827 9.71744 14.5004 9.80682 14.4996 9.897C14.4998 10.0831 14.4265 10.2617 14.2956 10.394C11.6756 12.95 9.15056 15.417 6.72056 17.795C6.59556 17.912 6.09556 18.203 5.70956 17.771C5.32356 17.338 5.55756 16.961 5.70956 16.805L12.7776 9.897L6.03056 3.138C5.78456 2.799 5.80456 2.486 6.09056 2.199C6.37656 1.912 6.69756 1.898 7.05256 2.158Z"
                      fill="black"
                    />
                  </svg>
                </Link>              </li>
              <li className="nav-item px-3">
                <Link className={`${Styles.navLink} nav-link text-white fw-bold`} to="/about" onClick={handleNavLinkClick}>About us</Link>
              </li>
              <li className="nav-item px-3">
                <Link className={`${Styles.navLink} nav-link text-white fw-bold`} to="/contact" onClick={handleNavLinkClick}>Contact us</Link>
              </li>
            </ul>

            <div className={Styles.icon + " nav_icons d-flex align-items-center"}>
              <div style={{ position: "relative" }}>
                {
                  (cart.length > 0 && cart[0]?.items && cart[0]?.items.length > 0) && (
                    <span className='cart_num'>
                      {cart[0]?.items?.length}
                    </span>
                  )
                }
                <Link to={'/cart'} className="text-decoration-none fa-solid fa-cart-shopping text-white px-3" onClick={handleNavLinkClick}></Link>
              </div>
              {isAuthentication && <div style={{ position: "relative" }}>
                {
                  (wishlist.length > 0 && wishlist) && (
                    <span className='cart_num' style={{ width: 10, height: 10, top: 0, left: 4 }}>
                    </span>
                  )
                }
                <Link to={'/wishlist'} className="text-decoration-none fa-regular fa-heart text-white px-3" onClick={handleNavLinkClick}>
                </Link>
              </div>}
              {!isAuthentication ? <Link to="/login" onClick={handleNavLinkClick}>
                <i className="fa-regular fa-user text-white ps-3 pe-5"></i>
              </Link> : 
                <div style={{cursor: 'pointer'}} onClick={() => {
                  localStorage.removeItem("persist:root")
                  setTimeout(() => {
                    window.location.href = '/login'
                  }, 1000);
                }}>
                  <i className="fa fa-sign-out text-white ps-3 pe-5"></i>
                </div>
              }
            </div>
</>
              )
            }

                {
                  showNavCat && (
                    <ul className="navbarDrop navbar-nav me-auto mb-2 mb-lg-0">
                      <li>
                        <Link
                        to={'/'}
                                          onClick={handleDropBack}
                                          style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', textDecoration: 'none' }}  
                         > 
                        <svg width="8" height="13" viewBox="0 0 11 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.5912 2.225L9.10788 0.75L0.866211 9L9.11621 17.25L10.5912 15.775L3.81621 9L10.5912 2.225Z" fill="black"/>
</svg>

                        DROP
                        <span></span>
                        </Link>
                      </li>
                      {
                        (categories && categories.length > 0) && (
                          categories.map(cat => (
                            <li className="nav-item px-3">
                              <Link
                                                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                                                onClick={handleNavLinkClick}
                               className={`${Styles.navLink} nav-link text-white fw-bold`} to={"/drop?id=" + cat.id} >{cat.name}
                                                 <svg width="15" height="15" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M7.05256 2.158L14.2956 9.41399C14.3608 9.4763 14.4125 9.5513 14.4476 9.63437C14.4827 9.71744 14.5004 9.80682 14.4996 9.897C14.4998 10.0831 14.4265 10.2617 14.2956 10.394C11.6756 12.95 9.15056 15.417 6.72056 17.795C6.59556 17.912 6.09556 18.203 5.70956 17.771C5.32356 17.338 5.55756 16.961 5.70956 16.805L12.7776 9.897L6.03056 3.138C5.78456 2.799 5.80456 2.486 6.09056 2.199C6.37656 1.912 6.69756 1.898 7.05256 2.158Z"
                      fill="black"
                    />
                  </svg>

                               </Link>
                            </li>
                          ))
                        )
                      }
                    </ul>

                  )
                }

          </div>
        </div>
      </nav>
    </>
  );
}
