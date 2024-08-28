import React, { useEffect, useState } from 'react';
import Styles from './AboutUs.module.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API } from '../../features/globals';

export default function AboutUs() {
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
      <div className={Styles.backAbout}
        style={{ backgroundImage: `url(${API + web?.about_us_pic  })` }}
      >
        <div className={`${Styles.layerAbout} d-flex align-items-center`}>
          <p className='fs-1 fw-light d-flex align-items-center'>About Us</p>
        </div>
      </div>

      <div className={Styles.container}>
        <p className={Styles.paragraph}>
          {
            web?.about_us
          }
        </p>


        <p className={`${Styles.copyRight} fw-medium`}>
          {web?.trademark	}
        </p>

        <button 
          type="button"
          className={`${Styles.btnAbout} btn btn-dark`}
        >
          <Link className='text-decoration-none text-white' to="/contact">
            Contact Us
          </Link>
        </button>

     
      </div>
    </>
  );
}
