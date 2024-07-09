import React from 'react';
import Style from './Cart.module.css';
import { Link } from 'react-router-dom';
import { style } from '@mui/system';

export default function Cart() {
    return (
        <>
            <div className="container">
                <p className='pt-5 mt-5 fs-4 d-flex align-items-center'>
                    <Link to={'/drop'} className='fas fa-arrow-left overflow-hidden fs-4 me-3 text-decoration-none text-black'></Link>
                    Cart
                </p>
            </div>

            <div className="container mb-5">
                {/* First item in the cart */}
                <div className={` pt-0 mt-5 border border-bottom-0 ${Style.flexContainer}`}>
                    
                <div className={Style.all}>
                        <div className={`border border-2 border-black ${Style.imageContainer}`}>
                        {/* <img
                                className='w-100'
                                src="https://s3-alpha-sig.figma.com/img/d73b/5913/bc830d6295ca64d6a68d48b3da92a9e0?Expires=1721001600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=XYxqxak0iD93PEHYi87xSY-oIOngUsQKwg9vNOM8oKk0OBAQwZG4mrl4s7JBxi0qys1Kpt3uG65zljzUpo-ki5m3WN662DdM872UpF35ACV7jYR-ptkZCKMYuz7Kj1irMo8qwSGLQmkLzzmotL7eLkr7HXz03NFC5OYa~fbYYXnmuxGErU6N2fZc12DR1wmsSq-v4LR4LC4dGmm7SFJ20sZeanlavLa24Yk6l2XjVJjJBMzSFBSFhMPkbSf9zf5b08rd9nZWEsIluMAZ-dOSSX8PZ9ybjQVWWPK~uRYSZ54jpTKFHg8IzbZq~-BLoIsmCUeXvE2Kysqyq1-cO4pchQ__"
                                alt=""
                            /> */}
                        </div>

                    <div className={` border border-2 border-black ${Style.flexColumn}`}>
                        <div className='d-flex align-items-center justify-content-end bg-danger'>
                            <button className={Style.removeBtn}>
                                <i className="fa-solid fa-xmark px-2"></i>
                                Remove
                            </button>
                        </div>

                        <div className='d-flex justify-content-between'>
                            <h2 className={`${Style.hh} h5 pt-4 overflow-hidden`}>Man Slim Fit Mock</h2>
                            <p className={`${Style.hh} pt-4`}>390 L.E</p>
                        </div>

                        <div className='d-flex'>
                            <p className={Style.color}>Color : <span className={Style.light}>Brown</span></p>
                            <p className={`${Style.color} ps-5`}>Size :
                                <span className={Style.light}>M</span>
                            </p>
                        </div>

                        <div className='d-flex justify-content-between align-items-center'>
                            <span className={Style.light}>Delivered within 3-5 working days</span>
                            <p className={`${Style.quantity} d-flex align-items-center`}>Quantity 
                                <select className='ml-2' style={{
                                    width: '60px', background: 'black', color: 'white', marginLeft: '10px',
                                    borderRadius: '10px', padding: '5px 10px'
                                }}>
                                    {[...Array(10).keys()].map((num) => (
                                        <option key={num} value={num + 1}>{num + 1}</option>
                                    ))}
                                </select>
                            </p>
                        </div>

                        <hr />

                        <div className='d-flex justify-content-between'>
                            <p className={Style.size}>Size & Fit</p>
                            <Link className={Style.move}>Move to Wishlist</Link>
                        </div>

                        <div className={Style.customlist}>
                            <p className={Style.listitem}>This item is unisex</p>
                            <p className={Style.listitem}>Mid-waist</p>
                            <p className={Style.listitem}>Drawstring waist</p>
                            <p className={Style.listitem}>Covered zip fly</p>
                            <p className={Style.listitem}>6 belt loops</p>
                            <p className={Style.listitem}>2 slash pockets at front</p>
                        </div>
                    </div>
                 </div>

                    {/* Order summary section */}
                    <div className={` p-0 m-0 ${Style.flexColumn2}`}>
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
                                <p className={Style.orderPara1}>Total</p>
                                <p className={Style.orderPara1}>4.480 EGP</p>
                            </div>
                            
                        </div>

                    </div>


                </div>
                <Link to={'/checkOut'} className={Style.continueBtn}>Continue</Link>


            </div>
        </>
    );
}
