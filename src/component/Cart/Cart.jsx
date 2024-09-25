import React, { useEffect, useState } from 'react';
import Styles from './Cart.module.css'; // Import the CSS module
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllCart, removeProductFromCart } from '../../features/cartSlice';
import { addProductToWishlist } from '../../features/wishlistSlice';

export default function Cart() {
  const cart = useSelector(state => state.cart.cart);
  const dispatch = useDispatch();

  // Function to handle quantity change
  const handleQuantityChange = (itemId, newQuantity) => {
    // dispatch(updateQuantity({ itemId, quantity: newQuantity }));
  };

  // Function to handle item deletion
  const handleRemoveItem = (itemId) => {
    dispatch(removeProductFromCart(itemId));
  };

  // Function to handle item deletion
  const handleMoveToWishlist = (itemId) => {
    dispatch(addProductToWishlist(itemId));
  };

  useEffect(() => {
    dispatch(fetchAllCart());
  }, [dispatch]);

  return (
    <>
      <div className="container">
        <p className='pt-5 mt-5 fs-4 d-flex align-items-center'>
          <Link to={'/drop'} className='fas fa-arrow-left overflow-hidden fs-4 me-3 text-decoration-none text-black'></Link>
          Cart
        </p>
      </div>
      {
        cart.length > 0 && cart[0]?.items?.length > 0 ? (
          <div className="mb-5">
            {/* Cart items */}
            <div className={`pt-0 mt-5 border border-bottom-0 ${Styles.flexContainer}`}>
              <div className='w-100'>
                {cart[0].items.map((item, index) => (
                  <div key={item.id} className={Styles.all}>
                    <div className={`border border-2 border-black ${Styles.imageContainer}`}>
                      <img
                        className='w-100'
                        src={item.product_photo}
                        alt=""
                      />
                    </div>

                    <div className={`border border-2 border-black ${Styles.flexColumn}`}>
                      <div className='d-flex align-items-center justify-content-end '>
                        <button
                          className={Styles.removeBtn}
                          onClick={() => handleRemoveItem(item.product)}
                        >
                          <i className="fa-solid fa-xmark px-2"></i>
                          Remove
                        </button>
                      </div>

                      <div className='d-flex justify-content-between'>
                        <h2 className={`${Styles.hh} h5 pt-4 overflow-hidden`}>{item.product_name}</h2>
                        <p className={`${Styles.hh} pt-4`}>${item.converted_price}</p>
                      </div>

                      <div className='d-flex'>
                        <p className={Styles.color}>Color : <span className={Styles.light}>{item.color}</span></p>
                        <p className={`${Styles.color} ps-5`}>Size : <span className={Styles.light}>{item.size}</span></p>
                      </div>

                      <div className='d-flex justify-content-between align-items-center'>
                        <span className={Styles.light}>Delivered within 3-5 working days</span>
                        <p className={`${Styles.quantity} d-flex align-items-center`}>
                          Quantity 
                          <select
                            className='ml-2'
                            style={{
                              width: '60px', background: 'black', color: 'white', marginLeft: '10px',
                              borderRadius: '10px', padding: '5px'
                            }}
                            value={item.quantity}
                            onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                          >
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
                        <p className={Styles.size}>Details</p>
                        <button onClick={() => handleMoveToWishlist(item.product)} style={{background: "transparent", border: 'none'}} className={Styles.move}>Move to Wishlist</button>
                      </div>

                      <div className={Styles.customlist}>
                        <p className={Styles.listitem}>{item.product_details}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order summary section */}
              <div className={`p-0 m-0 ${Styles.flexColumn2}`}>
                <div className={`border border-2 p-3 border-start-0 border-black ${Styles.summaryContainer}`}>
                  <h3>Order Summary</h3>
                  <div className='d-flex justify-content-between pt-4'>
                    <p className={Styles.orderPara}>SubTotal</p>
                    <p className={Styles.orderPara}>{cart[0]?.total_price} EGP</p>
                  </div>
                  <div className={Styles.dashed}></div>
                  <div className='d-flex justify-content-between'>
                    <p className={Styles.orderPara1}>Total</p>
                    <p className={Styles.orderPara1}>{cart[0]?.total_price} EGP</p>
                  </div>
                </div>
              </div>
            </div>
            <Link to={'/checkOut'} className={Styles.Continue}>Continue</Link>
          </div>
        ) : (
          <h2 className='text-center py-5 my-3'>Nothing added</h2>
        )
      }
    </>
  );
}
