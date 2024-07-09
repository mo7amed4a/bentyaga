import React from 'react';
import Style from './Wishlist.module.css';
import { Link } from 'react-router-dom';
// import { CartContext } from '../../CartContext';

export default function Wishlist() {

  // let { getLoggedToCart } = useContext(CartContext);

  // async function getCart() {
  //   let response = await getLoggedToCart();
  //   console.log(response);
  // }

  return (<>
    <div className="container">
    <p className={`${Style.small} pt-5 mt-5 fs-4 d-flex align-items-center`}>
      <Link to={'/drop'} className='fas fa-arrow-left overflow-hidden fs-4 me-3 text-decoration-none text-black'></Link>
        Wishlist
    </p>
    </div>

   
  <div className="container mb-5">
      <div className={`row pt-0 mt-5 border border-bottom-0 ${Style.flexContainer}`}>
      <div className={`col-md-3 ${Style.flexColumn} p-0 m-0`}>
        <div className={`py-5 border border-2 border-end-0 border-black ${Style.imageContainer} `}>
          <img
            className='w-100'
            src="https://s3-alpha-sig.figma.com/img/d73b/5913/bc830d6295ca64d6a68d48b3da92a9e0?Expires=1721001600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=XYxqxak0iD93PEHYi87xSY-oIOngUsQKwg9vNOM8oKk0OBAQwZG4mrl4s7JBxi0qys1Kpt3uG65zljzUpo-ki5m3WN662DdM872UpF35ACV7jYR-ptkZCKMYuz7Kj1irMo8qwSGLQmkLzzmotL7eLkr7HXz03NFC5OYa~fbYYXnmuxGErU6N2fZc12DR1wmsSq-v4LR4LC4dGmm7SFJ20sZeanlavLa24Yk6l2XjVJjJBMzSFBSFhMPkbSf9zf5b08rd9nZWEsIluMAZ-dOSSX8PZ9ybjQVWWPK~uRYSZ54jpTKFHg8IzbZq~-BLoIsmCUeXvE2Kysqyq1-cO4pchQ__"
            alt=""
          />
        </div>
      </div>

      <div className={`col-md-6 border border-2 border-black ${Style.flexColumn}`}>
        <div className='d-flex align-items-center justify-content-end bg-danger'>
          <button className={Style.removeBtn}>
            <i className="fa-solid fa-xmark px-2"></i>
            Remove
          </button>
        </div>

        <div className='d-flex justify-content-between'>
          <h2 className='h5 pt-5 overflow-hidden'>Man Slim Fit Mock</h2>
          <p className='pt-5'>390 L.E</p>
        </div>

        <div className='d-flex pt-4'>
          <p>Color : <span className={Style.light}>Brown</span></p>
          <p className='ps-5'>Size :
          <span className={Style.light}>M</span>
             </p>
        </div>

        <div className='d-flex justify-content-between align-items-center'>
        <span className={Style.light}>Delivered within 3-5 working days</span>
          <p className=''>Quantity :  
            <select className='ml-2' style={{ width: '60px', background: 'black', color: 'white', marginLeft: '10px', 
              borderRadius:'10px' , padding:'5px 10px'
            }}>
              {[...Array(10).keys()].map((num) => (
                <option key={num} value={num + 1}>{num + 1}</option>
              ))}
            </select>
          </p>
        </div>

        <hr />

        <div className='d-flex justify-content-between'>
          <p>Size & Fit</p>
        </div>

        <div className={Style.customlist}>
          <div className={Style.listitem}>This item is unisex</div>
          <div className={Style.listitem}>Mid-waist</div>
          <div className={Style.listitem}>Drawstring waist</div>
          <div className={Style.listitem}>Covered zip fly</div>
          <div className={Style.listitem}>6 belt loops</div>
          <div className={Style.listitem}>2 slash pockets at front</div>
        </div>
      </div>

     <div className={`col-md-3 p-0 m-0 ${Style.flexColumn}`}>
            <div className={`border border-2 p-3 border-start-0 border-black ${Style.summaryContainer}`}>
              <h3>Order Summary</h3>
              <div className='d-flex justify-content-between pt-4'>
                <p className={Style.orderPara}>SubTotal</p>
                <p className={Style.orderPara}>4.420 EGP</p>
              </div>
              <div className='d-flex justify-content-between'>
                <p className={Style.orderPara}>taxes</p>
                <p className={Style.orderPara}>0 EGP</p>
              </div>
              <div className='d-flex justify-content-between'>
                <p className={Style.orderPara}>Delivery</p>
                <p className={Style.orderPara}>60 EGP</p>
              </div>
              <div className={Style.dashed}></div>

              <div className='d-flex justify-content-between'>
                <p className={Style.orderPara}>Total</p>
                <p className={Style.orderPara}>4.480 EGP</p>
              </div>
            </div>
          <button className={Style.continueBtn}>Continue</button>

          </div>

    </div>
  </div>   
</>

  );
}
