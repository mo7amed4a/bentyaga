import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Slider from 'react-slick';
import styles from './ProductDetails.module.css'; // Assuming you have custom styles for buttons and other elements
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper/modules';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [selectedQuantity, setSelectedQuantity] = useState(1);
    const [showDetails, setShowDetails] = useState(false); // Toggle state for showing details
    const [size, setsize] = useState(false); // Toggle state for showing details
    const [deviceType, setDeviceType] = useState('Desktop');

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
                console.log(data.data); // Print the response in the console
                setProduct(data.data); // Set the product data
            } catch (error) {
                console.error("Error fetching product details:", error);
            }
        };

        fetchProduct();
    }, [id]);

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

    const renderImagesAsList = () => (
        <div className={styles.imageList}>
            {product.images.map((image, index) => (
                <img key={index} src={image} alt={`Product image ${index + 1}`} className={styles.productImage} />
            ))}
        </div>
    );

    const renderImagesAsSlider = () => {
        const settings = {
            dots: true,
            infinite: true,
            speed: 200,
            slidesToShow: 1,
            slidesToScroll: 1,
        };

        return (
            <Swiper pagination={true} modules={[Pagination]} className="productSwiper">
                {product.images.map((image, index) => (
                    <SwiperSlide key={index}>
                        <img src={image} alt={`Product image ${index + 1}`} />
                    </SwiperSlide>
                ))}
            </Swiper>
        );
    };

    const handleSizeChange = (event) => {
        setSelectedSize(event.target.value);
    };

    const handleColorChange = (event) => {
        setSelectedColor(event.target.value);
    };

    const handleQuantityChange = (event) => {
        setSelectedQuantity(parseInt(event.target.value));
    };

    const handleBuyClick = () => {
        // Implement buy functionality
        console.log("Buy clicked");
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

    return (
        <div className={`${styles.productDetailsContainer} product_details_wrapper`}>
            <div className={styles.imagesContainer}>
                {/* Heart icon */}
                <Link to={'/wishlist'} className="fs-3 text-decoration-none text-black">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.2 24H10.8V22.6667H9.6V21.3333H8.4V20H7.2V18.6667H6V17.3333H4.8V16H3.6V14.6667H2.4V13.3333H1.2V10.6667H0V4H1.2V2.66667H2.4V1.33333H3.6V0H9.6V1.33333H10.8V2.66667H13.2V1.33333H14.4V0H20.4V1.33333H21.6V2.66667H22.8V4H24V10.6667H22.8V13.3333H21.6V14.6667H20.4V16H19.2V17.3333H18V18.6667H16.8V20H15.6V21.3333H14.4V22.6667H13.2V24ZM4.8 12V13.3333H6V14.6667H7.2V16H8.4V17.3333H9.6V18.6667H10.8V20H13.2V18.6667H14.4V17.3333H15.6V16H16.8V14.6667H18V13.3333H19.2V12H20.4V9.33333H21.6V5.33333H20.4V4H19.2V2.66667H15.6V4H14.4V5.33333H13.2V6.66667H10.8V5.33333H9.6V4H8.4V2.66667H4.8V4H3.6V5.33333H2.4V9.33333H3.6V12H4.8Z" fill="#121212"/>
                    </svg>
                </Link>
                {/* Product images */}
                {deviceType === 'Desktop' ? renderImagesAsList() : renderImagesAsSlider()}
            </div>
            <div className={styles.detailsContainer}>
                <div className={`${styles.detail} detail_1 d-flex justify-content-between align-items-center mt-3 mb-4`}>
                    <h1 className='pt-4'>{product.title.split(' ').slice(0, 3).join(' ')}</h1>
                    <p className='pt-4'>${product.price}</p>

                </div>
                <div className={styles.detailsContainer1}>
                    <p>{product.description}</p>

                </div>
                <div className="my-3 selectContainer">
                    <select id="sizeSelect" className='' value={selectedSize} onChange={handleSizeChange}>
                        <option value=""  className={styles.selection}>Select Size</option>
                        <option>S</option>
                        <option>M</option>
                        <option>L</option>
                    </select>
                </div>
                <div className="my-3 selectContainer">
                    <select id="colorSelect"className=''  value={selectedColor} onChange={handleColorChange}>
                        <option value=""  className={styles.selection}>Select Color</option>
                        <option>Red</option>
                        <option>Black</option>
                        <option>Blue</option>
                    </select>
                </div>
                <div className="my-3 selectContainer">
                    <select id="quantitySelect" className='' value={selectedQuantity} onChange={handleQuantityChange}>
                        <option value="" className={styles.selection}>Select Quantity</option>
                        {/* Replace with actual quantity options based on your product data */}
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                    </select>
                </div>
                <div className="my-3 d-flex flex-column">
                    <Link className={`${styles.buyBtn}`} onClick={handleBuyClick} to={'/checkOut'}>Buy</Link>
                    <Link className={`${styles.addBtn}`} to={'/cart'}
                        // onClick={() => handleAddToCartClick(product.id)}
                    >Add to Cart</Link>
                </div>
                <div className="toggleFeature my-3 mb-0 d-flex flex-column m-0">
                    <button className={`${styles.btnProductDetails} d-flex align-items-center justify-content-between ${showDetails ? 'active' : ''} w-100  text-start p-4 border-left-0`} onClick={toggleDetails} aria-expanded={showDetails} aria-controls="productDetailsCollapse">
                        <span className={styles.detaills}>{showDetails ? 'Product Details' : 'Product Details'}</span>
                        <i className={`fas fa-chevron-${showDetails ? 'up' : 'down'}`}></i>
                    </button>
                    <div className={`collapse ${showDetails ? 'show' : ''}`} id="productDetailsCollapse">
                        <div className={`${styles.specificDetail} card card-body`}>
                            {/* Replace with actual product details */}
                            <p>{product.description}</p>
                            <p><strong>Sold:</strong> {product.sold}</p>
                            <p><strong>Average Rating:</strong> {product.ratingsAverage} ({product.ratingsQuantity} reviews)</p>
                            {/* Add more product details as needed */}
                        </div>
                    </div>
                </div>

                <div className="toggleFeature toggleFeature2 my-5 mt-0 d-flex flex-column m-0">
                    <button className={`${styles.btnProductDetails} d-flex align-items-center justify-content-between ${size ? 'active' : ''} w-100  text-start p-4 border-left-0`} onClick={toggleSize} aria-expanded={size} aria-controls="productDetailsCollapse">
                        <span ame={styles.detaills}>{size ? 'Size & Fit' : 'Size & Fit'}</span>
                        <i className={`fas fa-chevron-${size ? 'up' : 'down'}`}></i>
                    </button>
                    <div className={`collapse ${size ? 'show' : ''}`} id="productDetailsCollapse">
                        <div className={`${styles.specificDetail} card card-body`}>
                            {/* Replace with actual product details */}
                            <p>{product.description}</p>
                            <p><strong>Sold:</strong> {product.sold}</p>
                            <p><strong>Average Rating:</strong> {product.ratingsAverage} ({product.ratingsQuantity} reviews)</p>
                            {/* Add more product details as needed */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
