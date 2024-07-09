import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Styles from './Drop.module.css';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import WindowIcon from '@mui/icons-material/Window';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import TuneIcon from '@mui/icons-material/Tune';
import Pagination from '@mui/material/Pagination';
import { PaginationItem, styled } from '@mui/material';

export default function Drop() {
    const [products, setProducts] = useState([]);
    const [anchorElView, setAnchorElView] = useState(null);
    const [anchorElDrop, setAnchorElDrop] = useState(null);
    const [grid, setGrid] = useState(1);
    const [columnSize, setColumnSize] = useState(4); // Default to 3 columns on desktop
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [colorInputs, setColorInputs] = useState(Array.from({ length: 8 }).fill(''));
    const [currentPage, setCurrentPage] = useState(1);
    const [deviceType, setDeviceType] = useState('');

    const navigate = useNavigate();
    
    // Fetch products from API
    async function fetchProducts() {
        try {
            const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/products");
            setProducts(data.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    }

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
        borderRadius: '0px', // Makes circles square
        border: '1px solid black', // Black border for all items
        '&.Mui-selected': {
          backgroundColor: 'black', // Background color for selected page
          color: 'white', // Text color for selected page
          border: '1px solid black', // Black border for selected item
        },
      }));

    // Handle pagination change
    const handleChange = (event, value) => {
        setCurrentPage(value);
    };

    // Handle color input change
    const handleColorInputChange = (event, index) => {
        const { value } = event.target;
        setColorInputs(prev => {
            const newColors = [...prev];
            newColors[index] = value;
            return newColors;
        });
    };

    // Drawer list content
    const drawerList = () => (
        <Box
            sx={{ width: '100%', maxWidth: 400 }}
            role="presentation"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
        >
            <h1 className='mt-3 text-center border-black border-bottom border-2 pb-3'>
                <Link to={'/drop'} className='fas fa-arrow-left overflow-hidden fs-4 me-3 text-decoration-none text-black'
                    onClick={(e) => {
                        e.stopPropagation(); // Prevent propagation to keep drawer open
                        toggleDrawer(false)(e); // Close the drawer explicitly
                    }}
                ></Link>
                Filters
            </h1>

            {/* Drops by inputs section */}
            <div className='border-black border-bottom border-2 pb-5'>
                <p className={`${Styles.drops} mt-4 mb-2`}>Drops</p>
                <div className="row">
                    <div className="col-6">
                        <input type="text" placeholder='999' className='w-100 p-3 mx-2 my-1 px-3' />
                    </div>
                    <div className="col-6">
                        <input type="text" placeholder='999' className='w-100 p-3 my-1 ' />
                    </div>
                    <div className="col-6">
                        <input type="text" placeholder='999' className='w-100 p-3 mx-2 my-1' />
                    </div>
                    <div className="col-6">
                        <input type="text" placeholder='999' className='w-100 p-3 my-1' />
                    </div>
                </div>
            </div>

            {/* Sort by inputs section */}
            <div className='border-black border-bottom border-2 pb-5'>
                <p className={`${Styles.drops} mt-4 mb-2`}>Sort By</p>
                <div className="row">
                    <div className="col-6">
                        <input type="text" placeholder='Latest Arrival' className='w-100 p-3 mx-2 my-1 px-3' />
                    </div>
                    <div className="col-6">
                        <input type="text" placeholder='Ascending Price' className='w-100 p-3 my-1 ' />
                    </div>
                    <div className="col-6">
                        <input type="text" placeholder='Descending Price' className='w-100 p-3 mx-2 my-1' />
                    </div>
                </div>
            </div>

            {/* Color inputs section */}
            <div className='border-black border-bottom border-2 pb-5'>
                <p className={`${Styles.drops} mt-4 mb-2`}>Colors</p>
                <div className="row m-auto">
                    {colorInputs.map((value, index) => (
                        <div key={index} className={`${Styles.colorInputContainer} col-md-6`}>
                            <div className={`${Styles.customInput} d-flex align-items-center`}>
                                <input
                                    type="checkbox"
                                    id={`colorCheckbox${index}`}
                                    className={`${Styles.checkboxes}`}
                                />
                                <input
                                    type="text"
                                    placeholder='Red'
                                    className={`${Styles.colorInput} w-100 py-3 mx-2 my-1 `}
                                    value={value}
                                    onChange={(e) => handleColorInputChange(e, index)}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Clear and Apply buttons */}
            <div className={`${Styles.filterBtns} d-flex justify-content-center`}>
                <button className={`${Styles.btn1} ms-2 my-4 py-2`}>CLEAR</button>
                <button className={`${Styles.btn2} ms-2 my-4 py-2`}>APPLY</button>
            </div>
        </Box>
    );

    // Toggle drawer open/close
    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
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
            if (event.key === 'Escape') {
                setDrawerOpen(false);
            }
        };

        document.addEventListener('keydown', handleEscapeKeyPress);

        return () => {
            document.removeEventListener('keydown', handleEscapeKeyPress);
        };
    }, []);

    // Close drawer on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (drawerOpen && !event.target.closest('.MuiDrawer-root')) {
                setDrawerOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [drawerOpen]);

    // Handle click to open view menu
    const handleClickView = (event) => {
        setAnchorElView(event.currentTarget);
    };

    // Handle click to open view menu
    const toggleGrid = () => {
        setGrid(!grid)
        setColumnSize(columnSize == 6 ? 4 : 6)
    };

    // Handle click to open drop menu
    const handleClickDrop = (event) => {
        setAnchorElDrop(event.currentTarget);
    };

    // Custom style for Pagination item
    const paginationItemStyle = (pageNumber) => ({
        border: pageNumber === currentPage ? '1px solid black' : '3px solid black',
        borderRadius: '0px',
        padding: '0px',
        margin: '0 1px',
    });

    // Navigate to ProductDetails page
    const handleProductClick = (id) => {
        navigate(`/productdetails/${id}`);
    };

    return (
        <>
            <div className={`${Styles.theBackGround} d-flex flex-column justify-content-center`}>
                <div className={Styles.layer2}></div>
            </div>

            <div className="mb-5 mx-3">

                {/* Results count and view options */}
                <div className="mt-2 d-flex justify-content-between align-items-center">
                    <p className={Styles.results}>{products.length} results</p>
                    <div className="d-flex justify-content-center align-items-center pb-2">

                        <Button
                            id="demo-positioned-button-drop"
                            className={Styles.viewBTN}
                            aria-controls={anchorElDrop ? 'demo-positioned-menu-drop' : undefined}
                            aria-haspopup="true"
                            aria-expanded={Boolean(anchorElDrop)}
                            onClick={handleClickDrop}
                        >
                            Drop
                        </Button>
                        <Menu
                            id="demo-positioned-menu-drop"
                            anchorEl={anchorElDrop}
                            open={Boolean(anchorElDrop)}
                            onClose={handleCloseDrop}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                        >
                            <MenuItem onClick={() => handleDropSelect()}>999</MenuItem>
                            <MenuItem onClick={() => handleDropSelect()}>999</MenuItem>
                            <MenuItem onClick={() => handleDropSelect()}>999</MenuItem>

                        </Menu>

                        <Button
                            id="demo-positioned-button-view"
                            className={Styles.viewBTN}
                            onClick={() => toggleGrid()}
                        >
                            View 
                            {
                                grid ? (
                                    <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="0.5" y="0.5" width="26" height="26" stroke="black"/>
                                    <rect x="0.5" y="0.5" width="12.9655" height="12.9655" stroke="black"/>
                                    <rect x="0.5" y="13.5344" width="12.9655" height="12.9655" stroke="black"/>
                                    <rect x="13.5352" y="13.5344" width="12.9655" height="12.9655" stroke="black"/>
                                    </svg>
                                )
                                :
                                (
                                    <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="0.5" y="0.5" width="26" height="26" stroke="black"/>
                                    <line x1="13.5342" y1="0.931152" x2="13.5342" y2="27.0001" stroke="black"/>
                                    </svg>
                                )
                            }
                        </Button>
                    </div>
                </div>

                {/* Product grid */}
                <div className="row">
                    {products.map((item) => (
                        <div
                            key={item._id}
                            className={`col-${deviceType === 'Desktop' ? columnSize : columnSize == 4 ? 6 : 12} border border-1 border-black`}
                            onClick={() => handleProductClick(item._id)}
                            style={{ cursor: 'pointer' }}
                        >
                            <img src={item.imageCover} className="w-100" alt="" />
                            <br />
                            <span className="text-black d-flex justify-content-center pb-5 pt-2 fw-bolder">Leather Jacket</span>
                        </div>
                    ))}
                </div>

                {/* Filter button */}
                <div className={`${Styles.stickyFilterBtn} d-flex justify-content-center py-5`}>
                    <Button onClick={toggleDrawer(true)} variant="contained" className={`${Styles.filterBtn} ps-3 py-2`}>
                        Filters <TuneIcon />
                    </Button>
                </div>

                {/* Drawer for filters */}
                <Drawer
                    anchor="right"
                    open={drawerOpen}
                    onClose={toggleDrawer(false)}
                    sx={{ width: '40%' }}
                >
                    {drawerList()}
                </Drawer>

                {/* Pagination */}
                <div className="d-flex justify-content-center mt-3">
                    <Pagination
                        count={6}
                        page={currentPage}
                        onChange={handleChange}
                        renderItem={(item) => (
                            <CustomPaginationItem
                                {...item}
                                style={{
                                    ...paginationItemStyle(item.page), // Optional custom styles for other pages
                                }}
                            />
                        )}
                    />
                </div>
            </div>
        </>
    );
}
