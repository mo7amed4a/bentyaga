import React from 'react';
import Styles from './Cart.module.css'; // Import the CSS module
import { Link } from 'react-router-dom';

export default function Cart() {
  return (
    <>
      <div className="container">
        <p className='pt-5 mt-5 fs-4 d-flex align-items-center'>
          <Link to={'/drop'} className='fas fa-arrow-left overflow-hidden fs-4 me-3 text-decoration-none text-black'></Link>
          Cart
        </p>
      </div>

      <div className="mb-5">
        {/* First item in the cart */}
        <div className={`pt-0 mt-5 border border-bottom-0 ${Styles.flexContainer}`}>
          <div className={Styles.all}>
            <div className={`border border-2 border-black ${Styles.imageContainer}`}>
              <img
                className='w-100'
                src="https://s3-alpha-sig.figma.com/img/d73b/5913/bc830d6295ca64d6a68d48b3da92a9e0?Expires=1721001600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=XYxqxak0iD93PEHYi87xSY-oIOngUsQKwg9vNOM8oKk0OBAQwZG4mrl4s7JBxi0qys1Kpt3uG65zljzUpo-ki5m3WN662DdM872UpF35ACV7jYR-ptkZCKMYuz7Kj1irMo8qwSGLQmkLzzmotL7eLkr7HXz03NFC5OYa~fbYYXnmuxGErU6N2fZc12DR1wmsSq-v4LR4LC4dGmm7SFJ20sZeanlavLa24Yk6l2XjVJjJBMzSFBSFhMPkbSf9zf5b08rd9nZWEsIluMAZ-dOSSX8PZ9ybjQVWWPK~uRYSZ54jpTKFHg8IzbZq~-BLoIsmCUeXvE2Kysqyq1-cO4pchQ__"
                alt="Product"
              />
            </div>

            <div className={`border border-2 border-black ${Styles.flexColumn}`}>
              <div className='d-flex align-items-center justify-content-end bg-danger'>
                <button className={Styles.removeBtn}>
                  <i className="fa-solid fa-xmark px-2"></i>
                  Remove
                </button>
              </div>

              <div className='d-flex justify-content-between'>
                <h2 className={`${Styles.hh} h5 pt-4 overflow-hidden`}>Man Slim Fit Mock</h2>
                <p className={`${Styles.hh} pt-4`}>390 L.E</p>
              </div>

              <div className='d-flex'>
                <p className={Styles.color}>Color : <span className={Styles.light}>Brown</span></p>
                <p className={`${Styles.color} ps-5`}>Size : <span className={Styles.light}>M</span></p>
              </div>

              <div className='d-flex justify-content-between align-items-center'>
                <span className={Styles.light}>Delivered within 3-5 working days</span>
                <p className={`${Styles.quantity} d-flex align-items-center`}>Quantity 
                  <select className='ml-2' style={{
                    width: '60px', background: 'black', color: 'white', marginLeft: '10px',
                    borderRadius: '10px', padding: '5px'
                  }}>
                    {[...Array(10).keys()].map((num) => (
                      <option key={num} value={num + 1}>{num + 1}</option>
                    ))}
                  </select>
                </p>
              </div>
              <hr style={{
                padding: '0px', margin: '0px', border: 'solid 1px black', backgroundColor: 'black',
              }} />
              <div className='d-flex justify-content-between'>
                <p className={Styles.size}>Size & Fit</p>
                <Link className={Styles.move}>Move to Wishlist</Link>
              </div>

              <div className={Styles.customlist}>
                <p className={Styles.listitem}>This item is unisex</p>
                <p className={Styles.listitem}>Mid-waist</p>
                <p className={Styles.listitem}>Drawstring waist</p>
                <p className={Styles.listitem}>Covered zip fly</p>
                <p className={Styles.listitem}>6 belt loops</p>
                <p className={Styles.listitem}>2 slash pockets at front</p>
              </div>
            </div>
          </div>
          
          {/* Order summary section */}
          <div className={`p-0 m-0 ${Styles.flexColumn2}`}>
            <div className={`border border-2 p-3 border-start-0 border-black ${Styles.summaryContainer}`}>
              <h3>Order Summary</h3>
              <div className='d-flex justify-content-between pt-4'>
                <p className={Styles.orderPara}>SubTotal</p>
                <p className={Styles.orderPara}>4.420 EGP</p>
              </div>
              <div className='d-flex justify-content-between'>
                <p className={Styles.orderPara}>taxes</p>
                <p className={Styles.orderPara}>0 EGP</p>
              </div>
              <div className='d-flex justify-content-between'>
                <p className={Styles.orderPara}>Delivery</p>
                <p className={Styles.orderPara}>60 EGP</p>
              </div>
              <div className={Styles.dashed}></div>
              <div className='d-flex justify-content-between'>
                <p className={Styles.orderPara1}>Total</p>
                <p className={Styles.orderPara1}>4.480 EGP</p>
              </div>
            </div>
          </div>
        </div>
        <Link to={'/checkOut'} className={Styles.Continue}>Continue</Link>
      </div>
    </>
  );
}
