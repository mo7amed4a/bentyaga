import React, { useEffect, useState } from "react";
import Styles from "./Wishlist.module.css"; // Import the CSS module
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAllWishlist,
  removeProductFromWishlist,
} from "../../features/wishlistSlice";
import { API } from "../../features/globals";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

export default function Wishlist() {
  const wishlist = useSelector((state) => state.wishlist.wishlist);
  const dispatch = useDispatch();

  // Function to handle quantity change
  const handleQuantityChange = (itemId, newQuantity) => {
    // dispatch(updateQuantity({ itemId, quantity: newQuantity }));
  };

  // Function to handle item deletion
  const handleRemoveItem = (itemId) => {
    dispatch(removeProductFromWishlist(itemId));
    dispatch(fetchAllWishlist());
  };

  useEffect(() => {
    dispatch(fetchAllWishlist());
  }, [dispatch]);

  return (
    <>
      <div className="container">
        <p className="pt-5 mt-5 fs-4 d-flex align-items-center">
          <Link
            to={"/drop"}
            className="fas fa-arrow-left overflow-hidden fs-4 me-3 text-decoration-none text-black"
          ></Link>
          Wishlist
        </p>
      </div>
      {wishlist.length > 0 && wishlist.length > 0 ? (
        <div className="mb-5">
          {/* Wishlist items */}
          <div
            className={`pt-0 mt-5 border border-bottom-0 ${Styles.flexContainer}`}
          >
            <div className="w-100">
              {wishlist.map((item) => (
                <Link
                  to={"/productdetails/" + item.product.id}
                  style={{ textDecoration: "none", color: "#000" }}
                  key={item.id}
                  className={Styles.all}
                >
                  <div
                    className={`border border-2 border-black ${Styles.imageContainer}`}
                  >
                    {/* <img
                      className="w-100"
                      src={API + item.product.photo}
                      alt=""
                    /> */}
                    {console.log(item)}
                    <Swiper
                      slidesPerView={"auto"}
                      loop={true}
                      className={`mySwiper${item.id}`}
                      navigation={true} // Enable navigation
                      pagination={{ clickable: true }} // Enable pagination and make it clickable
                      modules={[Navigation, Pagination]}
                    >
                      <SwiperSlide>
                          <img
                            // style={{ width: "100%", height: "500px" }}
                            className="w-100"
                            src={
                              `https://api.bantayga.wtf${item.product.photo}` ||
                              item
                            }
                            alt={item.name}
                          />
                      </SwiperSlide>
                      {item?.product?.images?.map((image, imageIndex) => (
                        <SwiperSlide
                          key={imageIndex + image.created_at}
                          id={image.created_at}
                        >
                          {console.log(image)}
                            <img
                              // style={{ width: "100%", height: "500px" }}
                              className="w-100"
                              src={`https://api.bantayga.wtf${image.image}`}
                              alt={item.name}
                            />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>

                  <div
                    className={`border border-2 border-black ${Styles.flexColumn}`}
                  >
                    <div className="d-flex align-items-center justify-content-end bg-danger">
                      <button
                        className={Styles.removeBtn}
                        onClick={() => handleRemoveItem(item.product.id)}
                      >
                        <i className="fa-solid fa-xmark px-2"></i>
                        Remove
                      </button>
                    </div>

                    <div className="d-flex justify-content-between">
                      <h2 className={`${Styles.hh} h5 pt-4 overflow-hidden`}>
                        {item.product.name}
                      </h2>
                      <p className={`${Styles.hh} pt-4`}>
                        ${item.product.price}
                      </p>
                    </div>

                    <p className={`${Styles.hh} h5 pt-4 overflow-hidden`}>
                      {item.product.about_product}
                    </p>

                    <hr
                      style={{
                        padding: "0px",
                        margin: "0px",
                        border: "solid 1px black",
                        backgroundColor: "black",
                      }}
                    />

                    <div className={Styles.customlist}>
                      <p className={Styles.listitem}>{item.product_details}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Order summary section */}
          </div>
        </div>
      ) : (
        <h2 className="text-center py-5 my-3">Nothing added</h2>
      )}
    </>
  );
}
