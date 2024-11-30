import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "./ProductDetails.module.css"; // Assuming you have custom styles for buttons and other elements
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Scrollbar } from "swiper/modules";

import "swiper/css";
import "swiper/css/scrollbar";

// import required modules
import { api } from "../../API";
import { useDispatch, useSelector } from "react-redux";
import { addProductToCart, fetchAllCart } from "../../features/cartSlice";
import {
  addProductToWishlist,
  fetchAllWishlist,
  removeProductFromWishlist,
} from "../../features/wishlistSlice";
import useCart from "../../hooks/useCart";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [showDetails, setShowDetails] = useState(false); // Toggle state for showing details
  const [size, setsize] = useState(false); // Toggle state for showing details
  const [deviceType, setDeviceType] = useState("Desktop");
  const wishlist = useSelector((state) => state.wishlist.wishlist);
  const [isFav, setIsFav] = useState(false);
  const [isReq, setIsReq] = useState(false);
  const cart = useCart();
  const isProductInCart = cart?.cart[0]?.items?.some(
    (pr) => pr.product === parseInt(id)
  );

  const fetchProduct = async () => {
    try {
      const { data } = await api.get(
        `https://api.bantayga.wtf/api/products/${id}/`
      );
      console.log(data); // Print the response in the console
      setProduct(data); // Set the product data
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };
  useEffect(() => {
    fetchProduct();
  }, [id]);
  useEffect(() => {
    dispatch(fetchAllWishlist());
  }, [dispatch]);

  useEffect(() => {
    setIsFav(wishlist.find((item) => item.product.id == id) ? true : false);
  }, [wishlist]);

  const handleAddToWishlist = (id) => {
    dispatch(!isFav ? addProductToWishlist(id) : removeProductFromWishlist(id));
    setTimeout(() => {
      dispatch(fetchAllWishlist());
      fetchProduct();
    }, 1000);
  };

  useEffect(() => {
    const getDeviceType = () => {
      const ua = navigator.userAgent;
      if (/mobile/i.test(ua)) {
        return "Mobile";
      } else if (/iPad|Android|Touch/i.test(ua)) {
        return "Tablet";
      } else {
        return "Desktop";
      }
    };

    setDeviceType(getDeviceType());
  }, []);

  const renderImagesAsList = (device) => (
    <div className={styles.imageList}>
      <Swiper
        slidesPerView={"auto"}
        spaceBetween={5}
        loop={true}
        className="mySwiper mySwiperProductDetails"
        modules={[Autoplay, Scrollbar]}
        autoplay={{ delay: 4100 }}
        scrollbar={{
          hide: false,
        }}
        speed={351}
      >
        <SwiperSlide>
          <Link
            to={"/productdetails/" + product.id}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              // className="w-100 bg-"
              className={styles.productImage}
              src={product.photo || product}
              alt={product.name}
            />
          </Link>
        </SwiperSlide>
        {product.images.map((image, imageIndex) => (
          <SwiperSlide
            key={imageIndex + image.created_at}
            id={image.created_at}
          >
            <Link
              to={"/productdetails/" + product.id}
              className="d-flex justify-content-center align-items-center"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                className={styles.productImage}
                // className="w-100"
                // style={{width: "100%", height: device === "Mobile" ? "350px" : 'auto' }}
                src={image.image}
                alt={product.name}
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );

  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value);
  };

  const handleColorChange = (event) => {
    setSelectedColor(event.target.value);
  };

  const handleQuantityChange = (event) => {
    setSelectedQuantity(parseInt(event.target.value));
  };

  const navigation = useNavigate();

  const handleBuyClick = () => {
    if (!selectedQuantity) {
      setIsReq(true);
      setTimeout(() => {
        setIsReq(false);
      }, 1000);
    } else {
      dispatch(
        addProductToCart({
          id: id,
          color: selectedColor || "none",
          quantity: selectedQuantity || 1,
          size: selectedSize || "none",
        })
      );
      navigation("/checkout");
    }
  };

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };
  const toggleSize = () => {
    setsize(!size);
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  const handleAddToCart = () => {
    if (!selectedQuantity) {
      setIsReq(true);
      setTimeout(() => {
        setIsReq(false);
      }, 1000);
    } else {
      dispatch(
        addProductToCart({
          id: id,
          color: selectedColor || "none",
          quantity: selectedQuantity || 1,
          size: selectedSize || "none",
        })
      );
    }
  };

  return (
    <div
      style={{ position: "relative" }}
      className={`${styles.productDetailsContainer} product_details_wrapper`}
    >
      <div className={styles.imagesContainer}>
        {/* Heart icon */}
        <button
          onClick={() => handleAddToWishlist(id)}
          style={{
            background: "transparent",
            border: "none",
            width: "max-content",
          }}
          className={"fs-3 text-decoration-none text-black px-3"}
        >
          {isFav ? (
            <svg
              width="24"
              height="24"
              viewBox="0 0 39 35"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.5 5.5L11 2L19.5 5.5L25 3H31L36 5.5V12L26.5 27L19.5 33L11 26L2.5 14.5L3.5 5.5Z"
                fill="#FC4343"
              />
              <path
                d="M21.45 35H17.55V33.0556H15.6V31.1111H13.65V29.1667H11.7V27.2222H9.75V25.2778H7.8V23.3333H5.85V21.3889H3.9V19.4444H1.95V15.5556H0V5.83333H1.95V3.88889H3.9V1.94444H5.85V0H15.6V1.94444H17.55V3.88889H21.45V1.94444H23.4V0H33.15V1.94444H35.1V3.88889H37.05V5.83333H39V15.5556H37.05V19.4444H35.1V21.3889H33.15V23.3333H31.2V25.2778H29.25V27.2222H27.3V29.1667H25.35V31.1111H23.4V33.0556H21.45V35ZM7.8 17.5V19.4444H9.75V21.3889H11.7V23.3333H13.65V25.2778H15.6V27.2222H17.55V29.1667H21.45V27.2222H23.4V25.2778H25.35V23.3333H27.3V21.3889H29.25V19.4444H31.2V17.5H33.15V13.6111H35.1V7.77778H33.15V5.83333H31.2V3.88889H25.35V5.83333H23.4V7.77778H21.45V9.72222H17.55V7.77778H15.6V5.83333H13.65V3.88889H7.8V5.83333H5.85V7.77778H3.9V13.6111H5.85V17.5H7.8Z"
                fill="#121212"
              />
            </svg>
          ) : (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.2 24H10.8V22.6667H9.6V21.3333H8.4V20H7.2V18.6667H6V17.3333H4.8V16H3.6V14.6667H2.4V13.3333H1.2V10.6667H0V4H1.2V2.66667H2.4V1.33333H3.6V0H9.6V1.33333H10.8V2.66667H13.2V1.33333H14.4V0H20.4V1.33333H21.6V2.66667H22.8V4H24V10.6667H22.8V13.3333H21.6V14.6667H20.4V16H19.2V17.3333H18V18.6667H16.8V20H15.6V21.3333H14.4V22.6667H13.2V24ZM4.8 12V13.3333H6V14.6667H7.2V16H8.4V17.3333H9.6V18.6667H10.8V20H13.2V18.6667H14.4V17.3333H15.6V16H16.8V14.6667H18V13.3333H19.2V12H20.4V9.33333H21.6V5.33333H20.4V4H19.2V2.66667H15.6V4H14.4V5.33333H13.2V6.66667H10.8V5.33333H9.6V4H8.4V2.66667H4.8V4H3.6V5.33333H2.4V9.33333H3.6V12H4.8Z"
                fill="#121212"
              />
            </svg>
          )}
        </button>
        <div
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            zIndex: 451118,
          }}
        >
          {isProductInCart && (
            <Link to={"/cart"}>
              <svg
                viewBox="-2.4 -2.4 28.80 28.80"
                fill="none"
                style={{ width: "35px", height: "35px" }}
                xmlns="http://www.w3.org/2000/svg"
                stroke="#60e280"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke="#CCCCCC"
                  strokeWidth="0.096"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    opacity="0.5"
                    d="M2.08368 2.7512C2.22106 2.36044 2.64921 2.15503 3.03998 2.29242L3.34138 2.39838C3.95791 2.61511 4.48154 2.79919 4.89363 3.00139C5.33426 3.21759 5.71211 3.48393 5.99629 3.89979C6.27827 4.31243 6.39468 4.76515 6.44841 5.26153C6.47247 5.48373 6.48515 5.72967 6.49184 6H17.1301C18.815 6 20.3318 6 20.7757 6.57708C21.2197 7.15417 21.0461 8.02369 20.699 9.76275L20.1992 12.1875C19.8841 13.7164 19.7266 14.4808 19.1748 14.9304C18.6231 15.38 17.8426 15.38 16.2816 15.38H10.9787C8.18979 15.38 6.79534 15.38 5.92894 14.4662C5.06254 13.5523 4.9993 12.5816 4.9993 9.64L4.9993 7.03832C4.9993 6.29837 4.99828 5.80316 4.95712 5.42295C4.91779 5.0596 4.84809 4.87818 4.75783 4.74609C4.66977 4.61723 4.5361 4.4968 4.23288 4.34802C3.91003 4.18961 3.47128 4.03406 2.80367 3.79934L2.54246 3.7075C2.1517 3.57012 1.94629 3.14197 2.08368 2.7512Z"
                    fill="#60e280"
                  ></path>{" "}
                  <path
                    d="M7.5 18C8.32843 18 9 18.6716 9 19.5C9 20.3284 8.32843 21 7.5 21C6.67157 21 6 20.3284 6 19.5C6 18.6716 6.67157 18 7.5 18Z"
                    fill="#60e280"
                  ></path>{" "}
                  <path
                    d="M16.5 18.0001C17.3284 18.0001 18 18.6716 18 19.5001C18 20.3285 17.3284 21.0001 16.5 21.0001C15.6716 21.0001 15 20.3285 15 19.5001C15 18.6716 15.6716 18.0001 16.5 18.0001Z"
                    fill="#60e280"
                  ></path>{" "}
                  <path
                    d="M15.5421 9.51724C15.8278 9.2173 15.8162 8.74256 15.5163 8.4569C15.2163 8.17123 14.7416 8.18281 14.4559 8.48276L12.1419 10.9125L11.5421 10.2828C11.2565 9.98281 10.7817 9.97123 10.4818 10.2569C10.1818 10.5426 10.1703 11.0173 10.4559 11.3172L11.5988 12.5172C11.7403 12.6659 11.9366 12.75 12.1419 12.75C12.3471 12.75 12.5434 12.6659 12.685 12.5172L15.5421 9.51724Z"
                    fill="#60e280"
                  ></path>{" "}
                </g>
              </svg>
            </Link>
          )}
        </div>
        {/* Product images */}
        {deviceType
          ? renderImagesAsList(deviceType)
          : renderImagesAsList(deviceType)}
      </div>
      <div className={styles.detailsContainer}>
        <div
          className={`${styles.details} detail_1 d-flex justify-content-between align-items-center mt-3 mb-4`}
        >
          <h1 className="pt-4">{product.name}</h1>
          <div class="text-center mt-4 d-flex align-items-center">
            <p class={`ms-2 fw-bold`}>
            {product.Discount > 0 && <span class="text-decoration-line-through text-muted pe-2">
              {product.price}
            </span>}
              {(
                product.price - product.Discount
                // (product.price * product.Discount) / 100
              )} EGP
            </p>
          </div>
          {/* <div className="d-flex">
            <p className="pt-4"> {product.price}</p>
            <p className="pt-4 ps-3"> {product.price}</p>
          </div> */}
        </div>
        <div className={styles.detailsContainer1}>
          <p>{product.about_product}</p>
        </div>
        {product.sizes.length >= 1 && (
          <div className="my-3 selectContainer">
            <select
              id="sizeSelect"
              disabled={product.sizes.length < 1}
              className={isReq && !selectedSize ? "redBorder" : ""}
              value={selectedSize}
              onChange={handleSizeChange}
            >
              <option value="" className={styles.selection}>
                {product.sizes.length < 1 ? (
                  <span>The sizes of the product are sold out</span>
                ) : (
                  "Select Size"
                )}
              </option>
              {product.sizes?.map((size, index) => (
                <option key={index} value={size.size}>
                  {size.size}
                </option>
              ))}
            </select>
          </div>
        )}
        {product.colors.length >= 1 && (
          <div className="my-3 selectContainer">
            <select
              disabled={product.colors.length < 1}
              id="colorSelect"
              className={isReq && !selectedColor ? "redBorder" : ""}
              value={selectedColor}
              onChange={handleColorChange}
            >
              <option value="" className={styles.selection}>
                {product.colors.length < 1 ? (
                  <span>The color of the product are sold out</span>
                ) : (
                  "Select Color"
                )}
              </option>
              {product.colors?.map((color, index) => (
                <option key={index} value={color.color}>
                  {color.color}
                </option>
              ))}
            </select>
          </div>
        )}
        {product.sale_status !== "sold_out" && (
          <div className="my-3 selectContainer">
            <select
              id="quantitySelect"
              className={isReq && !selectedQuantity ? "redBorder" : ""}
              value={selectedQuantity}
              onChange={handleQuantityChange}
            >
              <option value="" className={styles.selection}>
                Select Quantity
              </option>
              {/* Replace with actual quantity options based on your product data */}
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>
        )}
        {isProductInCart ? (
          <div className="my-3 d-flex flex-column">
            <button className={`${styles.buyBtn}`} onClick={handleBuyClick}>
              Buy
            </button>
            <Link to={"/cart"} className={`${styles.addBtn}`}>
              Item added to your cart
            </Link>
          </div>
        ) : product.sale_status !== "sold_out" ? (
          <div className="my-3 d-flex flex-column">
            <button className={`${styles.buyBtn}`} onClick={handleBuyClick}>
              Buy
            </button>
            <button
              className={`${styles.addBtn}`}
              onClick={() => {
                handleAddToCart();
                dispatch(fetchAllCart());
              }}
            >
              Add to Cart
            </button>
          </div>
        ) : (
          <div className="my-3 d-flex flex-column justify-content-center align-items-center p-2">
            <h6 style={{ color: "gray" }}>Sold out</h6>
          </div>
        )}

        <div className="toggleFeature my-3 mb-0 d-flex flex-column m-0">
          <button
            className={`${
              styles.btnProductDetails
            } d-flex align-items-center justify-content-between ${
              showDetails ? "active" : ""
            } w-100  text-start p-4 border-left-0`}
            onClick={toggleDetails}
            aria-expanded={showDetails}
            aria-controls="productDetailsCollapse"
          >
            <span className={styles.detaills}>
              {showDetails ? "Product Details" : "Product Details"}
            </span>
            <i className={`fas fa-chevron-${showDetails ? "up" : "down"}`}></i>
          </button>
          <div
            className={`collapse ${showDetails ? "show" : ""}`}
            id="productDetailsCollapse"
          >
            <div className={`${styles.specificDetail} card card-body`}>
              {/* Replace with actual product details */}

              {/* <p>
                <TextToHTML text={product.details} />
              </p> */}
              <p dangerouslySetInnerHTML={{ __html: product.details }}></p>
              {/* Add more product details as needed */}
            </div>
          </div>
        </div>

        <div className="toggleFeature toggleFeature2 my-5 mt-0 d-flex flex-column m-0">
          <button
            className={`${
              styles.btnProductDetails
            } d-flex align-items-center justify-content-between ${
              size ? "active" : ""
            } w-100  text-start p-4 border-left-0`}
            onClick={toggleSize}
            aria-expanded={size}
            aria-controls="productDetailsCollapse"
          >
            <span ame={styles.detaills}>
              {size ? "Size & Fit" : "Size & Fit"}
            </span>
            <i className={`fas fa-chevron-${size ? "up" : "down"}`}></i>
          </button>
          <div
            className={`collapse ${size ? "show" : ""}`}
            id="productDetailsCollapse"
          >
            <div className={`${styles.specificDetail} card card-body`}>
              {/* Replace with actual product details */}
              {product.sizes.map((size, index) => (
                <div key={index} style={{ fontSize: 12 }}>
                  <p>
                    <b className="bold">Size: </b>
                    <span>{size.size}</span>
                  </p>
                  <p>
                    <b className="bold">Fit: </b>{" "}
                    <span>{size.descrtions_size_fit}</span>
                  </p>
                </div>
              ))}
              {/* Add more product details as needed */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

const TextToHTML = ({ text }) => {
  const parseText = (inputText) => {
    const lines = inputText.split("\n"); // تقسيم النص إلى أسطر
    return lines.map((line, index) => {
      if (/^\*\*(.+?)\*\*$/.test(line)) {
        // النصوص المحاطة بـ ** تصبح غامقة
        return (
          <strong key={index} className="d-block mb-2">
            {line.replace(/\*\*/g, "").trim()}
          </strong>
        );
      } else if (/^\*(.+?)\*$/.test(line)) {
        // النصوص المحاطة بـ * تصبح مائلة
        return (
          <em key={index} className="d-block mb-2">
            {line.replace(/\*/g, "").trim()}
          </em>
        );
      } else if (line.startsWith("-")) {
        // القوائم غير المرتبة
        return (
          <li key={index} className="mb-2">
            {line.replace("-", "").trim()}
          </li>
        );
      } else if (/^\d+\./.test(line)) {
        // القوائم المرتبة
        return (
          <li key={index} className="mb-2">
            {line.replace(/^\d+\./, "").trim()}
          </li>
        );
      } else {
        // النصوص العادية
        return (
          <p key={index} className="mb-2">
            {line.trim()}
          </p>
        );
      }
    });
  };

  return (
    <div>
      {parseText(text).map((element, index) => {
        if (
          element.type === "li" &&
          index > 0 &&
          text.split("\n")[index - 1].startsWith("-")
        ) {
          return <ul key={`ul-${index}`}>{element}</ul>;
        }
        return element;
      })}
    </div>
  );
};
