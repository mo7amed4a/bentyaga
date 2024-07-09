import React, { useEffect, useState } from 'react';
import styles from './Footer.module.css'; // Import the CSS module
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export default function Footer() {
    const [showDetails, setShowDetails] = useState({}); // State to toggle details for each section
    const [deviceType, setDeviceType] = useState('Desktop');

    useEffect(() => {
        // Function to determine device type
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

        // Set initial device type
        setDeviceType(getDeviceType());
    }, []);

    // Toggle function for showing details in mobile view
    const toggleDetails = (section) => {
        setShowDetails(prevState => ({
            ...prevState,
            [section]: !prevState[section]
        }));
    };

    // Function to handle click on h3 elements in mobile view
    const handleToggleMobileDetails = (section) => {
        if (deviceType === 'Mobile') {
            toggleDetails(section);
        }
    };

    // Function to render arrow icon based on section toggle state
    const renderArrowIcon = (section) => {
        if (deviceType === 'Mobile' && showDetails[section]) {
            return <FontAwesomeIcon icon={faChevronUp} className={`${styles.arrowIcon}`} />;
        } else if (deviceType === 'Mobile' && !showDetails[section]) {
            return <FontAwesomeIcon icon={faChevronDown} className={`${styles.arrowIcon}`} />;
        }
        return null;
    };

    return (
        <>
            <div className={`${styles.rowFooter} `}>
            <div className="col-md-1 border border-1 border-black"></div>

                {/* NEWSLETTER */}
                <div className="col-md-2 border border-1 border-black pb-2 pt-3 ps-2">
                    <h3
                        className={`d-flex justify-content-between ${deviceType === 'Mobile' ? 'cursor-pointer' : ''}`}
                        onClick={() => handleToggleMobileDetails('newsletter')}
                    >
                        NEWSLETTER
                        {deviceType === 'Mobile' && renderArrowIcon('newsletter')}
                    </h3>
                    {(deviceType === 'Desktop' || showDetails['newsletter']) && (
                        <a className="text-black ps-2 text-decoration-none">Subscribe to our newsletter</a>
                    )}
                </div>

                {/* CLIENT SERVICES */}
                <div className="col-md-2 border border-1 border-black pb-2 pt-3 ps-2">
                    <h3
                        className={`d-flex justify-content-between ${deviceType === 'Mobile' ? 'cursor-pointer' : ''}`}
                        onClick={() => handleToggleMobileDetails('clientServices')}
                    >
                        CLIENT SERVICES
                        {deviceType === 'Mobile' && renderArrowIcon('clientServices')}
                    </h3>
                    {(deviceType === 'Desktop' || showDetails['clientServices']) && (
                        <div className="d-flex flex-column ps-2">
                            <a>Returns</a>
                            <a>Delivery</a>
                            <a>Payment</a>
                        </div>
                    )}
                </div>

                {/* THE COMPANY */}
                <div className="col-md-2 border border-1 border-black pb-2 pt-3 ps-2">
                    <h3
                        className={`d-flex justify-content-between   ${deviceType === 'Mobile' ? 'cursor-pointer' : ''}`}
                        onClick={() => handleToggleMobileDetails('company')}
                    >
                        THE COMPANY
                        {deviceType === 'Mobile' && renderArrowIcon('company')}
                    </h3>
                    {(deviceType === 'Desktop' || showDetails['company']) && (
                        <a className='ps-2 text-decoration-none text-black'>About Us</a>
                    )}
                </div>

                {/* FOLLOW US */}
                <div className="col-md-2 border border-1 border-black pb-2 pt-3 ps-2">
                    <h3
                        className={`d-flex justify-content-between ${deviceType === 'Mobile' ? 'cursor-pointer' : ''}`}
                        onClick={() => handleToggleMobileDetails('followUs')}
                    >
                        FOLLOW US
                        {deviceType === 'Mobile' && renderArrowIcon('followUs')}
                    </h3>
                    {(deviceType === 'Desktop' || showDetails['followUs']) && (
                        <div className="d-flex flex-column ps-2">
                            <a>Facebook</a>
                            <a>Instagram</a>
                            <a>Tiktok</a>
                            <a>Spotify</a>
                        </div>
                    )}
                </div>

                {/* CONTACT US */}
                <div className="col-md-2 border border-1 border-black pb-2 pt-3 ps-2">
                    <h3
                        className={`d-flex justify-content-between ${deviceType === 'Mobile' ? 'cursor-pointer' : ''}`}
                        onClick={() => handleToggleMobileDetails('contactUs')}
                    >
                        CONTACT US
                        {deviceType === 'Mobile' && renderArrowIcon('contactUs')}
                    </h3>
                    {(deviceType === 'Desktop' || showDetails['contactUs']) && (
                        <span className='ps-2'>Call US at: <br /> <a className="text-black ps-2 text-decoration-none">+201090359579</a></span>
                    )}
                </div>

                {/* Empty column for spacing */}
                <div className="col-md-1 border border-1 border-black"></div>
            </div>

            {/* Footer */}
            <div className={`${styles.foot} d-flex flex-column align-items-center justify-content-center`}>
                <p className={`${styles.banagia} mt-2 pt-1`}> <span>&copy;</span> 2024 BANTAYGA</p>
                <p>Powered by <Link to="https://webbing-agency.com/" className={styles.webbing}>Webbing Agency</Link></p>
            </div>
        </>
    );
}
