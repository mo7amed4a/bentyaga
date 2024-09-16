import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { FreeMode, Navigation, Autoplay } from "swiper/modules";
import product from "./../../assets/images/product_default.png";
import { useSelector } from "react-redux";
import { api } from "../../API";
import axios from "axios";
import { API } from "../../features/globals";

export default function Home() {
  // const [activeIndexes, setActiveIndexes] = useState(Array(10).fill(0)); // Array to store active image index for each item
  const isAuthentication = useSelector((state) => state.auth.isAuthentication);
  const [showPopup, setShowPopup] = useState(false);
  const [featuredProducts, setFeaturedProducts] = useState([]); // State to store featured products
  const [countries, setCountries] = useState([]); // State to store countries
  const [selectedCountry, setSelectedCountry] = useState("");

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0]; // Get today's date in 'YYYY-MM-DD' format
    const lastPopupDate = sessionStorage.getItem("lastPopupDate");

    if (isAuthentication && lastPopupDate !== today) {
      setShowPopup(true);
      sessionStorage.setItem("lastPopupDate", today); // Store today's date to prevent showing the popup again today
    }
  }, [isAuthentication]);

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  const handleApply = async () => {
    try {
      const { data } = await api.patch(
        `https://api.bantayga.wtf/user/update/`,
        {
          country: selectedCountry,
          currency: "$",
        }
      );
      setShowPopup(false);
    } catch (error) {
      setShowPopup(false);
      console.error("Error fetching products:", error);
    }
  };

  const fetchFeaturedProduct = async () => {
    try {
      const { data } = await axios.get(
        `https://api.bantayga.wtf/get-featured-products/`
      );
      setFeaturedProducts(data);
    } catch (error) {
      // setShowPopup(false);
      console.error("Error fetching products:", error);
    }
  };

  // Fetch Featured Products
  useEffect(() => {
    fetchFeaturedProduct();
  }, []);

  useEffect(() => {
    fetch("https://api.bantayga.wtf/sing/", {
      method: "GET",
      headers: {
        accept: "application/json",
        "X-CSRFToken":
          "5Ur10C8luOKRCZsSBmgZcp11K9IWt66WspXtcWREwrL6Tf4BzFjVYb1MW9BKhgp2",
      },
    })
      .then((response) => response.json())
      .then((data) => setCountries(data))
      .catch((error) => console.error("Error fetching countries:", error));
  }, []);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 7,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };
  // State to keep track of the active slide index for each product
  const [activeIndexes, setActiveIndexes] = useState(
    featuredProducts.map(() => 0) // Initialize with 0 for each product
  );

  // Function to handle dot click
  const handleDotClick = (productIndex, dotIndex) => {
    // Update the active index for the clicked product
    const newIndexes = [...activeIndexes];
    newIndexes[productIndex] = dotIndex;
    setActiveIndexes(newIndexes);

    // Slide to the clicked image
    const swiper = document.querySelectorAll(".mySwiper2")[productIndex];
    swiper.swiper.slideTo(dotIndex);
  };
  const [web, setWeb] = useState();
  async function fetchDesc() {
    try {
      const { data } = await axios.get(`https://api.bantayga.wtf/wep_site/`);
      setWeb(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  useEffect(() => {
    fetchDesc();
  }, []);

  return (
    <>
      <div
        className={`${styles.theBackGround} d-flex flex-column justify-content-center`}
        style={{ backgroundImage: `url(${API + web?.based_pic})` }}
      >
        <div className={styles.layer2}></div>
      </div>

      {showPopup && (
        <>
          <div
            className="hide_content"
            onClick={() => setShowPopup(false)}
          ></div>
          <div className="home_popup">
            <h1>Welcome to Bantayga</h1>
            <h3>We are shipping to :</h3>
            <select name="country" id="country" onChange={handleChange}>
              <option value="">Select Country</option>
              {countries.map((country) => (
                <option key={country.id} value={country.name}>
                  {country.name}
                </option>
              ))}
            </select>
            <button onClick={handleApply}>Apply</button>
          </div>
        </>
      )}

      <Swiper
        slidesPerView={"auto"}
        spaceBetween={5}
        freeMode={true}
        loop={true}
        className="mySwiper"
        modules={[Navigation, FreeMode, Autoplay]}
        // autoplay={{ delay: 2500, disableOnInteraction: false }}
        speed={350}
      >
        {featuredProducts.map((product, index) => (
          <SwiperSlide
            className={`${styles.border} ${styles.imageContainer}`}
            style={{ position: "relative" }}
            key={index}
          >
            {product.sale_status && (
              <span className="sale_span">{product.sale_status}</span>
            )}
            {product.images && product.images.length > 0 ? (
              <Swiper
                slidesPerView={"auto"}
                spaceBetween={5}
                freeMode={true}
                loop={true}
                className={`mySwiper${product.id}`}
                modules={[Navigation, FreeMode, Autoplay]}
                // autoplay={{ delay: 2500, disableOnInteraction: false }}
                speed={350}
              >
                <SwiperSlide key={product.id + 'ojm'}>
                  <Link to={"/productdetails/" + product.id}>
                    <img
                      className="w-100 home_img"
                      src={"https://api.bantayga.wtf" + product.photo || product}
                      alt={product.name}
                    />
                  </Link>
                </SwiperSlide>
                {product.images.map((image, imageIndex) => (
                  <SwiperSlide key={imageIndex}>
                    <Link to={"/productdetails/" + product.id}>
                      <img
                        className="w-100 home_img"
                        src={"https://api.bantayga.wtf" + image.image}
                        alt={product.name}
                      />
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <Link to={"/productdetails/" + product.id}>
                <img
                  className="w-100 home_img"
                  src={"https://api.bantayga.wtf" + product.photo || product}
                  alt={product.name}
                />
              </Link>
            )}
            <div className={styles.checkboxContainer}>
              {product.colors.map((colorObj, colorIndex) => (
                <React.Fragment key={colorIndex}>
                  <label
                    htmlFor={`checkbox-${colorObj.color}-${index}`}
                    className={styles.checkboxLabel}
                    style={{
                      backgroundColor: colorObj.color,
                      width: 20,
                      height: 20,
                    }} // Set the background color
                  ></label>
                </React.Fragment>
              ))}
            </div>
            <div className={styles.sizeOptions}>
              {product.sizes.map((size, sizeIndex) => (
                <span key={sizeIndex} className={styles.size}>
                  {size.size}
                </span>
              ))}
            </div>

            <div className={styles.dotSlider}>
              {product.images?.map((_, dotIndex) => (
                <span
                  key={dotIndex}
                  className={`${styles.dot} ${
                    activeIndexes[index] === dotIndex ? styles.active : ""
                  }`} // Apply active class to the first dot by default
                  onClick={() => handleDotClick(index, dotIndex)}
                ></span>
              ))}
            </div>
            <Link
              to={"/productdetails/" + product.id}
              style={{ textDecoration: "none" }}
            >
              <p className="text-black text-center">{product.name}</p>
            </Link>
            {product.colors.length > 0 && (
              <p className="text-black text-center">
                <span>{product.colors.length} colors</span>
              </p>
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      <Link
        to={"/drop"}
        className={`${styles.theBackGround1} d-flex flex-column justify-content-center`}
        style={{ backgroundImage: `url(${API + web?.based_pic2})` }}
      >
        <div className={styles.layer1}>
          <h1 className="text-white z-2 px-1">Exclusive Fashion</h1>
          <Link
            className={`${styles.link} text-white d-flex align-items-center justify-content-center`}
          >
            <i className="px-1 fa fa-arrow-right"></i>
            Discover
          </Link>
        </div>
      </Link>
    </>
  );
}
