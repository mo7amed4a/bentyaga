import React, { useEffect, useState } from "react";
import styles from "./Footer.module.css"; // Import the CSS module
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { api } from "../../API";

export default function Footer() {
  const [showDetails, setShowDetails] = useState({}); // State to toggle details for each section
  const [deviceType, setDeviceType] = useState("Desktop");
  const [medai, setMedia] = useState();
  const [successNewsletter , setSuccessNewsletter] = useState(null);
  const [errorNewsletter, setErrorNewsletter] = useState(null);


  async function fetchSocial() {
    try {
      const { data } = await axios.get(`https://api.bantayga.wtf/medai/`);
      setMedia(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }
  async function fetchDesc() {
    try {
      const { data } = await axios.get(`https://api.bantayga.wtf/wep_site/`);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  async function tst() {
    try {
      const { data } = await api.post(`https://api.bantayga.wtf/wishlist/`, {
        product_id: 2,
      });
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  useEffect(() => {
    fetchSocial();
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
    setShowDetails((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  // Function to handle click on h3 elements in mobile view
  const handleToggleMobileDetails = (section) => {
    if (deviceType === "Mobile") {
      toggleDetails(section);
    }
  };

  // Function to render arrow icon based on section toggle state
  const renderArrowIcon = (section) => {
    if (deviceType === "Mobile" && showDetails[section]) {
      return (
        <FontAwesomeIcon icon={faChevronUp} className={`${styles.arrowIcon}`} />
      );
    } else if (deviceType === "Mobile" && !showDetails[section]) {
      return (
        <FontAwesomeIcon
          icon={faChevronDown}
          className={`${styles.arrowIcon}`}
        />
      );
    }
    return null;
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

  const sendEmailNewsletterHandler = async (event) => {
    event.preventDefault();
    const email = event.target[0].value;
    try {
      const { data } = await axios.post(`https://api.bantayga.wtf/newsletter/`, {
        email: email,
      });
      setErrorNewsletter(null)
      setSuccessNewsletter(data.message)
    } catch (error) {
      setSuccessNewsletter(null)
      setErrorNewsletter(error.response.data.email[0])
      console.log("Error fetching:", error.response.data.email[0]);
    }
  };

  return (
    <>
      <div className={`${styles.rowFooter} `}>
        {/* NEWSLETTER */}
        <div className="col-md-2 border-top border-t-1 border-black pt-3 ps-2 pb-2">
          <h3
            className={`px-2 pb-1 d-flex justify-content-between ${
              deviceType === "Mobile" ? "cursor-pointer" : ""
            }`}
            onClick={() => handleToggleMobileDetails("newsletter")}
          >
            NEWSLETTER
            {deviceType === "Mobile" && renderArrowIcon("newsletter")}
          </h3>
          {successNewsletter && <label style={{color: "green",paddingLeft: "10px", fontSize: "12px", fontWeight: "bold", marginTop: "10px"}}>{ successNewsletter } </label>}
          {errorNewsletter && <label style={{color: "red",paddingLeft: "10px", fontSize: "12px", fontWeight: "bold", marginTop: "10px"}}>{ errorNewsletter } </label>}
          <form className="d-flex px-2" onSubmit={sendEmailNewsletterHandler}>
            <input type="email" className="w-100  p-2" placeholder="Enter your email" />
            {/* {(deviceType === "Desktop" || showDetails["newsletter"]) && ( */}
            <button className="p-2 text-decoration-none text-center" style={{background: "black", color: "white"}}>
              Subscribe
            </button>
            {/* )} */}
          </form>
        </div>

        {/* CLIENT SERVICES */}
        <div className="col-md-2 border-top border-t-1 border-black pt-3 ps-2 pb-2 ">
          <h3
            className={`px-2 pb-1 d-flex justify-content-between ${
              deviceType === "Mobile" ? "cursor-pointer" : ""
            }`}
            onClick={() => handleToggleMobileDetails("clientServices")}
          >
            CLIENT SERVICES
            {deviceType === "Mobile" && renderArrowIcon("clientServices")}
          </h3>
          {(deviceType === "Desktop" || showDetails["clientServices"]) && (
            <div className="d-flex flex-column p-2 bg-white-m">
              <Link className="text-decoration-none text-black" to={"/drop"}>
                Drop
              </Link>
              <Link className="text-decoration-none text-black" to={"/cart"}>
                Cart
              </Link>
              {/* <a>Returns</a>
                            <a>Delivery</a>
                            <a>Payment</a> */}
            </div>
          )}
        </div>

        {/* THE COMPANY */}
        <div className="col-md-2 border-top border-t-1 border-black pt-3  ps-2 pb-2">
          <h3
            className={`px-2 pb-1 d-flex justify-content-between   ${
              deviceType === "Mobile" ? "cursor-pointer" : ""
            }`}
            onClick={() => handleToggleMobileDetails("company")}
          >
            THE COMPANY
            {deviceType === "Mobile" && renderArrowIcon("company")}
          </h3>
          {(deviceType === "Desktop" || showDetails["company"]) && (
            <>
              <Link
                to={"/about"}
                className="p-2 text-decoration-none text-black  w-100 d-block bg-white-m"
              >
                About Us
              </Link>
              <Link
                to={"/contact"}
                className="p-2 text-decoration-none text-black  w-100 d-block bg-white-m"
              >
                Contact Us
              </Link>
              <Link
                to={"/privacy"}
                className="p-2 text-decoration-none text-black  w-100 d-block bg-white-m"
              >
                Privacy and Policy
              </Link>
            </>
          )}
        </div>

        {/* FOLLOW US */}
        <div className="col-md-2 border-top border-t-1 border-black pt-3 ps-2 pb-2 ">
          <h3
            className={`d-flex px-2 pb-1 justify-content-between ${
              deviceType === "Mobile" ? "cursor-pointer" : ""
            }`}
            onClick={() => handleToggleMobileDetails("followUs")}
          >
            FOLLOW US
            {deviceType === "Mobile" && renderArrowIcon("followUs")}
          </h3>
          {(deviceType === "Desktop" || showDetails["followUs"]) && (
            <div className="d-flex flex-column p-2 bg-white-m">
              {medai?.length > 0 &&
                medai &&
                medai.map((social, index) => (
                  <a
                    href={social.link}
                    key={index}
                    style={{ color: "black", textDecoration: "none" }}
                    target="_blanck"
                  >
                    {social.name}
                  </a>
                ))}
            </div>
          )}
        </div>

        {/* CONTACT US */}
 

        {/* Empty column for spacing */}
        {/* <div className="col-md-1 border-top border-t-1 border-black"></div> */}

        <div className="col-md-2 border-top border-t-1 border-black pt-3  ps-2 pb-2 ">
          <h3
            className={`px-2 pb-1 d-flex justify-content-between ${
              deviceType === "Mobile" ? "cursor-pointer" : ""
            }`}
            onClick={() => handleToggleMobileDetails("contactUs")}
          >
            CONTACT US
            {deviceType === "Mobile" && renderArrowIcon("contactUs")}
          </h3>
          {(deviceType === "Desktop" || showDetails["contactUs"]) && (
            <>
              <Link to={"/contact"} className="text-decoration-none text-black">
                contact us page
              </Link>
              <div
                style={{ textDecoration: "none" }}
                className="ps-2 p-2 bg-white-m w-100 d-block"
              >
                Call US at: <br />
                <a
                  className="text-black ps-2 text-decoration-none"
                  href="tel:+201000598141"
                >
                  +201000598141
                </a>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Footer */}
      <div
        className={`${styles.foot} d-flex flex-column align-items-center justify-content-center`}
      >
        <p className={`${styles.banagia} mt-2 pt-1`}> {web?.trademark}</p>
        <p>
          Powered by{" "}
          <Link to="https://webbing-agency.com/" className={styles.webbing}>
            Webbing Agency
          </Link>
        </p>
      </div>
    </>
  );
}
