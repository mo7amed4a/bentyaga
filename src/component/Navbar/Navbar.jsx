import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Styles from './Navbar.module.css'; // Import the CSS module

export default function Navbar() {
  const location = useLocation();
  const isHome = location.pathname === '/' || location.pathname === '/drop';

  // Function to handle link clicks and collapse the navbar
  const handleNavLinkClick = () => {
    const navbarCollapse = document.getElementById('navbarSupportedContent');
    if (navbarCollapse.classList.contains('show')) {
      navbarCollapse.classList.remove('show');
    }
  };

  return (
    <>
      <nav className={`navbar navbar-expand-lg fixed-top ${isHome ? 'bg-transparent' : 'bg-black'}`}>
        <div className="container">
          <button className={`navbar-toggler ${Styles.navbarToggler}`} type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className={`navbar-toggler-icon ${Styles.navbarTogglerIcon}`}></span>
          </button>
          <img src="https://s3-alpha-sig.figma.com/img/6cb5/319f/6b3e6ed3ca920dd39630004e75e34edd?Expires=1721001600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=akbsKQPpNF9XQIdsXrgV9hUxFpSRSZaxZPjVrW5jP3wjxIXpwbpbZIbjX0pAjRBGuTTPNicD7vSrWMJSj4KKpH92RxX25L5QOpJrm4UGs3dqOE07KBTdDovg39CrbxNfmfiqbogg8hDKAQ8wkM9wGoQ4c0TTIpKT16KABfX0mm-MQV7XeWDcHAv1x0VRweXB9HNjNnlMHOYF5INYgiALH5tWSwC3OoJvxSUuK2ZPe7GvZo60OkIbhzdSKuB7WLO-FpdwrR-0Uu7NPIaPDzjrhdNwawLiR~GZr1~cJfiNY1GTColGfIyxHQcwKhitLqHLZW9YRyc5Zo3o3BBWj4wsUw" className={Styles.logo} alt="logo" />
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <i className="fa fa-close" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"></i>
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

            <div className={Styles.icon + " nav_icons"}>
              <Link to={'/cart'} className="text-decoration-none fa-solid fa-cart-shopping text-white px-3" onClick={handleNavLinkClick}></Link>
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
