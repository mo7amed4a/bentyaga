  import React, { useEffect, useState } from 'react'
  import Style from './Checkout.module.css'
import { useSelector } from 'react-redux'
import { api } from '../../API'
  export default function Checkout() {
    const cart = useSelector(state => state.cart.cart)
    const [provinces, setProvinces] = useState([])
    const [city, setCity] = useState('')
    const [cityName, setCityName] = useState('')
    const [address, setAddress] = useState('')
    const [shippingPrice, setShippingPrice] = useState('')

    async function fetchAreas() {
        try {
            const { data } = await api.get(`https://api.bantayga.wtf/Province/`);
            setProvinces(data);            
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    }

    async function getShippingPrice(city) {
        try {
            const { data } = await api.post(`https://api.bantayga.wtf/Province/?id=${city}`);
            setShippingPrice(data.price);            
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    }

    async function redirectToPayment() {
        try {
            const { data } = await api.post(`https://api.bantayga.wtf/payment/`);
            window.location.href = data.payment_url
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    }

    async function handleCheckout(e) {
        e.preventDefault()
        try {
            const { data } = await api.post(`https://api.bantayga.wtf/Address/`, {
              city: cityName,
              province: city,
              detal: address
            });
            redirectToPayment()
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    }

    const handleChangeCity = (e) => {
      setCity(e.target.value)
      getShippingPrice(e.target.value)
    }

    const handleChangeCityName = (e) => {
      setCityName(e.target.value)
    }

    const handleChangeAddress = (e) => {
      setAddress(e.target.value)
    }

    useEffect(() => {
      fetchAreas()
    }, [])

    return <>
    
    <div className={Style.backContact}>
      <div className={Style.layerContact}  >
          <p className='fs-1 fw-light d-flex align-items-center'>Checkout</p>
      </div> 
    </div> 
    
    

      <div className={Style.contactForm}>

        <form className={Style.formContact} onSubmit={handleCheckout}>

          <div className= {Style.container} >
            <p className={Style.firstPara}>Address</p>
          </div>

          <div className='border border-black border-1 contact-form-wrapper'>

              <select className='w-50 p-4' value={city} onChange={handleChangeCity} required>
                <option value=''>Province</option>
                {
                  (provinces && provinces.length > 0) && (
                    provinces.map((province, index) => (
                      <option key={index} value={province.id}>{province.name}</option>
                    ))
                  )
                }
              </select>
              <input type="text" value={cityName} onChange={handleChangeCityName} className='w-50 p-4' required  placeholder='City'  style={{borderRight: "none"}}/>
              <input type="text" className='w-100 p-4' required  placeholder='Postal Code'  style={{borderRight: "none"}}/>


              <textarea onChange={handleChangeAddress} value={address} style={{border: "none", resize: "none"}} required type="text"  className={Style.msg} rows={5} placeholder='Delivary Address'/>
          </div>

          {/* <div className= {Style.container} >
            <p className={Style.firstPara}>Payment</p>
          </div>

          <div className='border-right border-left border-top border-black border-1 contact-form-wrapper' style={{  borderRight: "1px solid #000", borderLeft: "1px solid #000"}}>
            
              <input type="text" className='w-100 p-4'  placeholder='Name On Card' style={{borderRight: "none"}}/>


              <input type="text"  className='w-100 p-4' placeholder='Acount Number' style={{borderRight: "none"}}/>
              <input type="text" className='w-50 p-4'  placeholder='Expiration Date'/>
              <input type="text" className='w-50 p-4'  placeholder='CVV'  style={{borderRight: "none"}}/>


          </div> */}

          {/* <form action="" className="coupon_form mt-5 mb-5">
            <input type="text" name="coupon" id="coupon" placeholder='Enter a Voutcher' />
            <button>Apply</button>
          </form> */}
          <div className={`w-100`}>
              <div className={`mb-4 p-3 border-black ${Style.summaryContainer}`}>
                  <h2 style={{fontWeight: "700 !important", fontSize: 20}}>Order Summary</h2>
                  <div className='d-flex justify-content-between pt-4'>
                      <p className={Style.orderPara} style={{fontWeight: 400, fontSize: 12}}>SubTotal</p>
                      <p className={Style.orderPara} style={{fontWeight: 400, fontSize: 12}}>{cart[0]?.total_price} $</p>
                  </div>
                  {
                    shippingPrice && (
                      <div className='d-flex justify-content-between'>
                          <p className={Style.orderPara} style={{fontWeight: 400, fontSize: 12}}>Delivery</p>
                          <p className={Style.orderPara} style={{fontWeight: 400, fontSize: 12}}>{shippingPrice} $</p>
                      </div>
                    )
                  }
                  <div className={Style.dashed}></div>
                  <div className='d-flex justify-content-between'>
                      <p className={Style.orderPara} style={{fontWeight: 500, fontSize: 13}}>Total</p>
                      <p className={Style.orderPara}  style={{fontWeight: 500, fontSize: 13}}>{parseFloat(cart[0]?.total_price) + parseFloat(shippingPrice || 0)} $</p>
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
