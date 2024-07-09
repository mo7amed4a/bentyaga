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
                <Link to={'/wishlist'} className="fa-regular fa-heart fs-3 text-decoration-none text-black"></Link>
                {/* Product images */}
                {deviceType === 'Desktop' ? renderImagesAsList() : renderImagesAsSlider()}
            </div>
            <div className={styles.detailsContainer}>
                <div className={`${styles.detail} detail_1 d-flex justify-content-between align-items-center mt-3 mb-4`}>
                    <h1 className='pt-4'>{product.title.split(' ').slice(0, 3).join(' ')}</h1>
                    <p>${product.price}</p>

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
                <div className="my-3 d-flex flex-column">
                    <button className={`${styles.btnProductDetails} d-flex align-items-center justify-content-between ${showDetails ? 'active' : ''} w-100  text-start p-4 border-left-0`} onClick={toggleDetails} aria-expanded={showDetails} aria-controls="productDetailsCollapse">
                        <span className={styles.detaills}>{showDetails ? 'Product Details' : 'Product Details'}</span>
                        <i className={`fas fa-arrow-${showDetails ? 'up' : 'down'}`}></i>
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

                <div className="my-3 d-flex flex-column">
                    <button className={`${styles.btnProductDetails} d-flex align-items-center justify-content-between ${size ? 'active' : ''} w-100  text-start p-4 border-left-0`} onClick={toggleSize} aria-expanded={size} aria-controls="productDetailsCollapse">
                        <span ame={styles.detaills}>{size ? 'Size & Fit' : 'Size & Fit'}</span>
                        <i className={`fas fa-arrow-${size ? 'up' : 'down'}`}></i>
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
