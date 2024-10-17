import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import Styles from "./Drop.module.css";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import TuneIcon from "@mui/icons-material/Tune";
import { PaginationItem, styled } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { api } from "../../API";
import useCart from "../../hooks/useCart";
import { API } from "../../features/globals";
export default function Drop() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [colors, setColors] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [sort, setSort] = useState("");
  const [anchorElView, setAnchorElView] = useState(null);
  const [anchorElDrop, setAnchorElDrop] = useState(null);
  const [grid, setGrid] = useState(1);
  const [columnSize, setColumnSize] = useState(3); // Default to 3 columns on desktop
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [colorInputs, setColorInputs] = useState(
    Array.from({ length: 8 }).fill("")
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [deviceType, setDeviceType] = useState("");
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const cart = useCart();

  // Fetch products from API
  async function fetchProducts(
    search = "",
    cat_id = selectedCategory,
    sort = "",
    color = selectedColor
  ) {
    try {
      const { data } = await axios.get(
        `https://api.bantayga.wtf/api/products?search=${search}&categray__id=${cat_id}&ordering=${sort}&colors_color=${color}`
      );
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  function handleClear(e) {
    e.stopPropagation(); // Prevent propagation to keep drawer open
    toggleDrawer(false)(e); // Close the drawer explicitly
    setSelectedCategory("");
    setSelectedColor("");
    setSort("");
    fetchProducts();
  }

  // Fetch categories from API
  async function fetchCategories() {
    try {
      const { data } = await axios.get(`https://api.bantayga.wtf/categories/`);
      setCategories(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  // Fetch categories from API
  async function fetchColors() {
    try {
      const { data } = await axios.get(`https://api.bantayga.wtf/get_colors`);
      setColors(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  const handleSortChange = (e) => {
    setSort(e.target.value);
    fetchProducts(search, selectedCategory, e.target.value);
  };
  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
    fetchProducts(e.target.value);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Function to determine device type
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

  const CustomPaginationItem = styled(PaginationItem)(({ theme }) => ({
    borderRadius: "0px", // Makes circles square
    // border: "1px solid black", // Black border for all items
    "&.Mui-selected": {
      backgroundColor: "black", // Background color for selected page
      color: "white", // Text color for selected page
      border: "1px solid black", // Black border for selected item
    },
  }));

  // Handle pagination change
  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  // Handle color input change
  const handleColorInputChange = (event, index) => {
    const { value } = event.target;
    setColorInputs((prev) => {
      const newColors = [...prev];
      newColors[index] = value;
      return newColors;
    });
  };
  const [searchParams] = useSearchParams();

  // Using useSearchParams
  const id = searchParams.get("id");

  useEffect(() => {
    if (id) {
      setSelectedCategory(id);
      fetchProducts("", id);
    }
  }, [id]);
  // Drawer list content
  const drawerList = () => (
    <Box
      sx={{ width: "100%", maxWidth: 400 }}
      role="presentation"
      onClick={(e) => e.stopPropagation()}
      onKeyDown={(e) => e.stopPropagation()}
    >
      <div style={{ maxWidth: "400px" }} className="fillter_wrapper">
        <h1 className="mt-3 text-center border-black border-bottom border-2 pb-3">
          <Link
            to={"/drop"}
            className="fas fa-arrow-left overflow-hidden fs-4 me-3 text-decoration-none text-black"
            onClick={(e) => {
              e.stopPropagation(); // Prevent propagation to keep drawer open
              toggleDrawer(false)(e); // Close the drawer explicitly
            }}
          ></Link>
          Filters
        </h1>

        {/* Drops by inputs section */}
        <div className="border-black border-bottom border-2 pb-5">
          <p className={`${Styles.drops} mt-4 mb-2`}>Drops</p>
          <div className="row">
            {categories.map((category, index) => (
              <div key={index} className="col-6">
                <label
                  className={
                    "w-100 p-3 my-1 mx-2 radio-drop" +
                    (selectedCategory == category.id ? " selected" : "")
                  }
                >
                  <input
                    type="radio"
                    name="category"
                    value={category.id}
                    checked={selectedCategory == category.id}
                    onChange={handleClickDrop}
                  />
                  {category.name}
                </label>
              </div>
            ))}
          </div>
        </div>
        {/* Sort by inputs section */}
        <div className="border-black border-bottom border-2 pb-5">
          <p className={`${Styles.drops} mt-4 mb-2`}>Sort By</p>
          <div className="row">
            <div className="col-6">
              <label
                className={
                  "w-100 p-3 my-1 mx-2 radio-drop" +
                  (sort == "-id" ? " selected" : "")
                }
              >
                <input
                  type="radio"
                  name="sort"
                  value={"-id"}
                  checked={sort == "-id"}
                  onChange={handleSortChange}
                />
                Latest Arrival
              </label>
            </div>
            <div className="col-6">
              <label
                className={
                  "w-100 p-3 my-1 mx-2 radio-drop" +
                  (sort == "price" ? " selected" : "")
                }
              >
                <input
                  type="radio"
                  name="sort"
                  value={"price"}
                  checked={sort == "price"}
                  onChange={handleSortChange}
                />
                Ascending Price
              </label>
            </div>
            <div className="col-6">
              <label
                className={
                  "w-100 p-3 my-1 mx-2 radio-drop" +
                  (sort == "-price" ? " selected" : "")
                }
              >
                <input
                  type="radio"
                  name="sort"
                  value={"-price"}
                  checked={sort == "-price"}
                  onChange={handleSortChange}
                />
                Descending Price
              </label>
            </div>
          </div>
        </div>

        {/* Drops by inputs section */}
        <div className="border-black border-bottom border-2 pb-5">
          <p className={`${Styles.drops} mt-4 mb-2`}>Colors</p>
          <div className="row">
            {colors.map((color, index) => (
              <div key={index} className="col-6">
                <label
                  className={
                    "w-100 p-3 my-1 mx-2 radio-drop" +
                    (selectedColor == color.color ? " selected" : "")
                  }
                >
                  <input
                    type="radio"
                    name="color"
                    value={color.color}
                    checked={selectedColor == color.color}
                    onChange={handleChangeColor}
                  />
                  {color.color}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Clear and Apply buttons */}
        <div className={`${Styles.filterBtns} d-flex justify-content-center`}>
          <button
            className={`${Styles.btn1} ms-2 my-4 py-2`}
            onClick={handleClear}
          >
            CLEAR
          </button>
          <button
            className={`${Styles.btn2} ms-2 my-4 py-2`}
            onClick={(e) => {
              e.stopPropagation(); // Prevent propagation to keep drawer open
              toggleDrawer(false)(e); // Close the drawer explicitly
            }}
          >
            APPLY
          </button>
        </div>
      </div>
    </Box>
  );

  // Toggle drawer open/close
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  // Close the view menu
  const handleCloseView = () => {
    setAnchorElView(null);
  };

  // Close the drop menu
  const handleCloseDrop = () => {
    setAnchorElDrop(null);
  };
  const handleDropSelect = () => {
    handleCloseDrop(); // Close drop menu after selection
  };

  // Close drawer on Escape key press
  useEffect(() => {
    const handleEscapeKeyPress = (event) => {
      if (event.key === "Escape") {
        setDrawerOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscapeKeyPress);

    return () => {
      document.removeEventListener("keydown", handleEscapeKeyPress);
    };
  }, []);

  // Close drawer on outside click
  useEffect(() => {
    fetchCategories();
    fetchColors();
    const handleClickOutside = (event) => {
      if (drawerOpen && !event.target.closest(".MuiDrawer-root")) {
        setDrawerOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [drawerOpen]);

  // Handle click to open view menu
  const handleClickView = (event) => {
    setAnchorElView(event.currentTarget);
  };

  // Handle click to open view menu
  const toggleGrid = () => {
    setGrid(!grid);
    const col = deviceType === "Desktop" ? 12 : 6;
    setColumnSize(columnSize == col ? 3 : col);
  };

  // Handle click to open drop menu
  const handleClickDrop = (event) => {
    setSelectedCategory(event.target.value);
    fetchProducts("", event.target.value);
  };

  // Handle click to open drop menu
  const handleChangeColor = (event) => {
    setSelectedColor(event.target.value);
    fetchProducts(search, selectedCategory, sort, event.target.value);
  };

  // Custom style for Pagination item
  const paginationItemStyle = (pageNumber) => ({
    border: pageNumber === currentPage ? "1px solid black" : "2px solid black",
    borderRadius: "0px",
    padding: "0px",
    margin: "0 1px",
  });

  // Navigate to ProductDetails page
  const handleProductClick = (id) => {
    navigate(`/productdetails/${id}`);
  };

  const [isSticky, setIsSticky] = useState(false);
  const elementRef = useRef(null);
  const headRef = useRef(null);

  const handleScroll = () => {
    if (elementRef.current) {
      const offsetTop = elementRef.current.getBoundingClientRect().top;
      console.log();
      if (offsetTop <= 0 && headRef.current.getBoundingClientRect().top <= 0) {
        setIsSticky(true);
      }
      if (headRef.current.getBoundingClientRect().top > 0) {
        setIsSticky(false);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [web, setWeb] = useState();
  async function fetchDesc() {
    try {
      const { data } = await axios.get(`https://api.bantayga.wtf/wep_site/`);
      console.log(data);
      
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
        className={`${Styles.theBackGround} d-flex flex-column justify-content-center`}
        style={{ backgroundImage: `url(${API + web?.based_pic2})` }}
      >
        <div className={Styles.layer2}></div>
      </div>
      <div
        className="search_wrapper_main"
        style={{ position: isSticky ? "fixed" : "relative" }}
        ref={elementRef}
      >
        <form action="">
          <svg
            width="25"
            height="25"
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20.297 20.9935L13.7741 14.4706C13.2533 14.9143 12.6543 15.2577 11.9772 15.5008C11.3001 15.7438 10.6196 15.8654 9.93555 15.8654C8.26749 15.8654 6.85569 15.2879 5.70013 14.1331C4.54457 12.9782 3.9668 11.5668 3.9668 9.8987C3.9668 8.23064 4.54388 6.81849 5.69805 5.66224C6.85221 4.50599 8.26332 3.92717 9.93138 3.92578C11.5994 3.92439 13.0119 4.50217 14.1689 5.65912C15.3258 6.81606 15.9043 8.22821 15.9043 9.89558C15.9043 10.6192 15.7762 11.3195 15.5199 11.9966C15.2637 12.6737 14.9269 13.2529 14.5095 13.7341L21.0324 20.256L20.297 20.9935ZM9.93659 14.8227C11.3185 14.8227 12.4852 14.347 13.4366 13.3956C14.388 12.4442 14.8637 11.2772 14.8637 9.89453C14.8637 8.51189 14.388 7.34523 13.4366 6.39453C12.4852 5.44384 11.3185 4.96814 9.93659 4.96745C8.55464 4.96676 7.38763 5.44245 6.43555 6.39453C5.48346 7.34662 5.00777 8.51328 5.00846 9.89453C5.00916 11.2758 5.48485 12.4425 6.43555 13.3945C7.38624 14.3466 8.55291 14.8223 9.93555 14.8216"
              fill="black"
            />
          </svg>
          <input
            type="text"
            name="search"
            id="search"
            placeholder="WHAT ARE YOU LOOKING FOR?"
            value={search}
            onChange={handleChangeSearch}
          />
        </form>
      </div>
      <div className="mb-5" ref={headRef}>
        {/* Results count and view options */}
        <div
          style={{ backgroundColor: "#fff" }}
          className="px-2 py-2 d-flex justify-content-between bg-white align-items-center"
        >
          <p className={Styles.results}>{products?.length} results</p>
          <div className="d-flex justify-content-center align-items-center">
            <select
              id="demo-positioned-button-drop"
              className={Styles.viewBTN}
              aria-controls={
                anchorElDrop ? "demo-positioned-menu-drop" : undefined
              }
              aria-haspopup="true"
              onChange={handleClickDrop}
              value={selectedCategory}
            >
              <option value={""}>Drop</option>
              {categories &&
                categories.length > 0 &&
                categories.map((cat) => (
                  <option value={cat.id}>{cat.name}</option>
                ))}
            </select>

            <Button
              id="demo-positioned-button-view"
              className={Styles.viewBTN}
              onClick={() => toggleGrid()}
            >
              View
              {grid ? (
                <svg
                  width="27"
                  height="27"
                  viewBox="0 0 27 27"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect x="0.5" y="0.5" width="26" height="26" stroke="black" />
                  <rect
                    x="0.5"
                    y="0.5"
                    width="12.9655"
                    height="12.9655"
                    stroke="black"
                  />
                  <rect
                    x="0.5"
                    y="13.5344"
                    width="12.9655"
                    height="12.9655"
                    stroke="black"
                  />
                  <rect
                    x="13.5352"
                    y="13.5344"
                    width="12.9655"
                    height="12.9655"
                    stroke="black"
                  />
                </svg>
              ) : (
                <svg
                  width="27"
                  height="27"
                  viewBox="0 0 27 27"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect x="0.5" y="0.5" width="26" height="26" stroke="black" />
                  <line
                    x1="13.5342"
                    y1="0.931152"
                    x2="13.5342"
                    y2="27.0001"
                    stroke="black"
                  />
                </svg>
              )}
            </Button>
          </div>
        </div>

        {/* Product grid */}
        <div
          className="row drop_wrapper border-top border-black"
          style={{ width: "calc(100vw + 2px)", transform: "translateX(11px)" }}
        >
          {products?.map((item) => (
            <div
              key={item._id}
              className={`col-${
                deviceType === "Mobile"
                  ? columnSize === 3
                    ? 6
                    : 12
                  : columnSize === 3
                  ? 3
                  : 6
              }`}
              style={{
                borderRight: "1px solid #000",
                borderBottom: "1px solid #000",
                cursor: "pointer",
                position: "relative",
                padding: 0,
              }}
            >
              {item.sale_status != "none" && (
                <span className="sale_span">{item.sale_status}</span>
              )}
              <div style={{position: "absolute", top: "10px", right: "10px", zIndex: 451118}}>
                {cart && cart?.cart[0]?.items?.some((pr) => pr.product === item.id) && (
                  <Link to={'/cart'}><svg
                  viewBox="-2.4 -2.4 28.80 28.80"
                  fill="none"
                  style={{width: "35px", height: "35px"}}
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
                </svg></Link>
                )}
              </div>
              <Swiper
                slidesPerView={"auto"}
                loop={true}
                className={`mySwiper${item.id}`}
                navigation={true} // Enable navigation
                pagination={{ clickable: true }}
                modules={[Navigation, Pagination]}
              >
                <SwiperSlide>
                  <Link to={"/productdetails/" + item.id}>
                    <img
                      className="w-100 home_img drop_img"
                      src={item.photo || item}
                      alt={item.name}
                    />
                  </Link>
                </SwiperSlide>
                {item.images.map((image, imageIndex) => (
                  <SwiperSlide
                    key={imageIndex + image.created_at}
                    id={image.created_at}
                  >
                    <Link to={"/productdetails/" + item.id}>
                      <img
                        className="w-100 home_img drop_img"
                        src={image.image}
                        alt={item.name}
                      />
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>
              <span
                onClick={() => handleProductClick(item._id)}
                style={{ fontSize: "12px !important" }}
                className="text-black mb-4 d-flex justify-content-center pb-5 fw-bolder drop_prod_name"
              >
                {item.name}
              </span>
            </div>
          ))}
        </div>

        {/* Filter button */}
        <div
          className={`${Styles.stickyFilterBtn} d-flex justify-content-center py-5`}
        >
          <Button
            onClick={toggleDrawer(true)}
            variant="contained"
            className={`${Styles.filterBtn} ps-3 py-2`}
          >
            Filters <TuneIcon />
          </Button>
        </div>

        {/* Drawer for filters */}
        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={toggleDrawer(false)}
          sx={{ width: "40%" }}
        >
          {drawerList()}
        </Drawer>

        {/* Pagination */}
        <div className="d-flex justify-content-center mt-3">
          {/* دي تظهر بس بدل الباجيناشن كل ما ينزل يحمل منتجات */}
          {/* <h4 className='mt-5 my-3' style={{ fontWeight: 700, color: "rgba(0, 0, 0, .2)" }}>LOADING</h4> */}
        </div>
      </div>
    </>
  );
}
