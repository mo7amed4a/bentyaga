  import React from 'react'
  import Style from './ContactUs.module.css'
  export default function ContactUs() {
    return <>
    
    <div className={Style.backContact}>
      <div className={Style.layerContact}  >
          <p className='fs-1 fw-light d-flex align-items-center'>contact us</p>
      </div> 
    </div> 
    
    

      <div className={Style.contactForm}>

        <form className={Style.formContact} >

          <div className= {Style.container} >
            <p className={Style.firstPara}>send messege</p>
            <p className={Style.secondPara}>feel free to message us any time , anywhere</p>
          </div>

          <div className='border border-black border-1'>
            
              <input type="text" className='w-50 p-4'  placeholder='Name'/>


              <input type="Email"  className='w-50 p-4' placeholder='Email Address'/>
              <input type="tel" className='w-50 p-4'  placeholder='Phone Number'/>


              <input type="Email"  className='w-50 p-4' placeholder='Subject'/>
              <textarea type="text"  className={Style.msg} rows={5} placeholder='Messege'/>
          </div>

          <div className='d-flex justify-content-center'>

                  <button className=" bg-dark text-white w-75 py-3 rounded-0 mt-2 mb-3 ">Send Messege</button>
          </div>       
        </form>

        <p className={Style.copy}> <span>&copy;</span> 2024 BANTAYGA</p>


      </div>



    
    </>
  }
