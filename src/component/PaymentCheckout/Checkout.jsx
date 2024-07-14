  import React from 'react'
  import Style from './Checkout.module.css'
  export default function Checkout() {
    return <>
    
    <div className={Style.backContact}>
      <div className={Style.layerContact}  >
          <p className='fs-1 fw-light d-flex align-items-center'>Checkout</p>
      </div> 
    </div> 
    
    

      <div className={Style.contactForm}>

        <form className={Style.formContact} >

          <div className= {Style.container} >
            <p className={Style.firstPara}>Address</p>
          </div>

          <div className='border border-black border-1 contact-form-wrapper'>
            
              <input type="text" className='w-50 p-4'  placeholder='Country'/>


              <input type="text"  className='w-50 p-4' placeholder='City' style={{borderRight: "none"}}/>
              <input type="text" className='w-100 p-4'  placeholder='Postal Code'  style={{borderRight: "none"}}/>


              <textarea style={{border: "none", resize: "none"}} type="text"  className={Style.msg} rows={5} placeholder='Delivary Address'/>
          </div>

          <div className= {Style.container} >
            <p className={Style.firstPara}>Payment</p>
          </div>

          <div className='border-right border-left border-top border-black border-1 contact-form-wrapper' style={{  borderRight: "1px solid #000", borderLeft: "1px solid #000"}}>
            
              <input type="text" className='w-100 p-4'  placeholder='Name On Card' style={{borderRight: "none"}}/>


              <input type="text"  className='w-100 p-4' placeholder='Acount Number' style={{borderRight: "none"}}/>
              <input type="text" className='w-50 p-4'  placeholder='Expiration Date'/>
              <input type="text" className='w-50 p-4'  placeholder='CVV'  style={{borderRight: "none"}}/>


          </div>

          <form action="" className="coupon_form mt-5 mb-5">
            <input type="text" name="coupon" id="coupon" placeholder='Enter a Voutcher' />
            <button>Apply</button>
          </form>
          <div className={`w-100`}>
              <div className={`mb-4 p-3 border-black ${Style.summaryContainer}`}>
                  <h2 style={{fontWeight: "700 !important", fontSize: 20}}>Order Summary</h2>
                  <div className='d-flex justify-content-between pt-4'>
                      <p className={Style.orderPara} style={{fontWeight: 400, fontSize: 12}}>SubTotal</p>
                      <p className={Style.orderPara} style={{fontWeight: 400, fontSize: 12}}>4,420 EGP</p>
                  </div>
                  <div className='d-flex justify-content-between'>
                      <p className={Style.orderPara} style={{fontWeight: 400, fontSize: 12}}>Taxes</p>
                      <p className={Style.orderPara} style={{fontWeight: 400, fontSize: 12}}>0 EGP</p>
                  </div>
                  <div className='d-flex justify-content-between'>
                      <p className={Style.orderPara} style={{fontWeight: 400, fontSize: 12}}>Delivery</p>
                      <p className={Style.orderPara} style={{fontWeight: 400, fontSize: 12}}>60 EGP</p>
                  </div>
                  <div className={Style.dashed}></div>
                  <div className='d-flex justify-content-between'>
                      <p className={Style.orderPara} style={{fontWeight: 500, fontSize: 13}}>Total</p>
                      <p className={Style.orderPara}  style={{fontWeight: 500, fontSize: 13}}>4,480 EGP</p>
                  </div>
              </div>
          </div>

          <div className='d-flex justify-content-center'>

                  <button className=" bg-black text-white w-75 py-3 rounded-0 mt-2 mb-3 ">Continue</button>
          </div>       
        </form>

        <p className={Style.copy}> <span>&copy;</span> 2024 BANTAYGA</p>


      </div>



    
    </>
  }
