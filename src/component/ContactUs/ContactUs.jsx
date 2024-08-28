  import React, { useEffect, useState } from 'react'
  import Style from './ContactUs.module.css'
import axios from 'axios';
import { API } from '../../features/globals';
  export default function ContactUs() {
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
  
  
    return <>
    
    <div className={Style.backContact}
      style={{ backgroundImage: `url(${API + web?.contect_us_pic})` }}
    >
      <div className={Style.layerContact}  >
          <p className='fs-1 fw-light d-flex align-items-center'>contact us</p>
      </div> 
    </div> 
    
    

      <div className={Style.contactForm}>

        <form className={Style.formContact} >

          <div className= {Style.container} >
            <p className={Style.firstPara}>send messege</p>
            <p className={Style.secondPara}>
              {web?.contect_us	}
            </p>
          </div>

          <div className='border border-black border-1 contact-form-wrapper'>
            
              <input type="text" className='w-50 p-4'  placeholder='Name'/>


              <input type="Email"  className='w-50 p-4' placeholder='Email Address' style={{borderRight: "none"}}/>
              <input type="tel" className='w-50 p-4'  placeholder='Phone Number'/>


              <input type="Email"  className='w-50 p-4' placeholder='Subject'  style={{borderRight: "none"}}/>
              <textarea style={{border: "none", resize: "none"}} type="text"  className={Style.msg} rows={5} placeholder='Messege'/>
          </div>

          <div className='d-flex justify-content-center'>

                  <button className=" bg-dark text-white w-75 py-3 rounded-0 mt-2 mb-3 ">Send Messege</button>
          </div>       
        </form>

        <p className={Style.copy}>
        {web?.trademark	}
        </p>


      </div>



    
    </>
  }
