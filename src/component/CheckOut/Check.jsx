import React, { useState } from 'react';
import Style from './Check.module.css';
import { Link } from 'react-router-dom';
import creditImage from '../../assets/images/credit.png'; // Import the image

export default function Check() {
    const [isChecked, setIsChecked] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    return (
        <>
            <div className="container">
                <p className='pt-5 mt-5 fs-4 d-flex align-items-center'>
                    <Link to={'/cart'} className='fas fa-arrow-left overflow-hidden fs-4 me-3 text-decoration-none text-black'></Link>
                    Check Out
                </p>
            </div>

            <div className="container">
                <div className={`row ${Style.checkoutContainer}`}>
                    <div className={`col-md-3 ${Style.flexColumn}`}>
                        <div className={`border border-2 p-3 border-black ${Style.summaryContainer}`}>
                            <h3>Order Summary</h3>
                            <div className='d-flex justify-content-between pt-4'>
                                <p className={Style.orderPara}>SubTotal</p>
                                <p className={Style.orderPara}>4,420 EGP</p>
                            </div>
                            <div className='d-flex justify-content-between'>
                                <p className={Style.orderPara}>Taxes</p>
                                <p className={Style.orderPara}>0 EGP</p>
                            </div>
                            <div className='d-flex justify-content-between'>
                                <p className={Style.orderPara}>Delivery</p>
                                <p className={Style.orderPara}>60 EGP</p>
                            </div>
                            <div className={Style.dashed}></div>
                            <div className='d-flex justify-content-between'>
                                <p className={Style.orderPara}>Total</p>
                                <p className={Style.orderPara}>4,480 EGP</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-9">
                        <div className='d-flex justify-content-between'>
                            <h3 className={`${Style.addres}`}>Select Address</h3>
                            <Link className='text-decoration-none text-black d-flex align-items-center' onClick={toggleModal}> 
                                <i className=" fa-solid fa-plus pe-2"></i>
                                Add New Address
                            </Link>
                        </div>
                        {showModal && (
                            <div className="modal show" tabIndex="-1" role="dialog" style={{ display: 'block', background: 'rgba(0, 0, 0, 0.8)' }}>
                                <div className="modal-dialog modal-dialog-centered" style={{ width: '75%' }} role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title">Add New Address</h5>
                                            <button type="button" className="btn-close" aria-label="Close" onClick={toggleModal}></button>
                                        </div>
                                        <div className="modal-body">
                                            <form>
                                                <div className='d-flex justify-content-between'>
                                                    <input placeholder='Country' type="text" className={Style.newInput}/>
                                                    <input placeholder='City' type="text" className={Style.newInput}/>
                                                </div>
                                                <div>
                                                    <input placeholder='Postal Code' type="text" className={Style.newInputCity}/>
                                                </div>
                                                <div>
                                                    <textarea placeholder='Detailed address' name="" id=""></textarea>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" onClick={toggleModal} className={Style.saveBtn}>Save changes</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        <input
                            type="text"
                            className={` ${Style.customInput}`}
                            placeholder="11 Moez Al Dawla, Makram Ebied Nasr City, Cairo, Egypt"
                        />

                        <input
                            type="text"
                            className={` ${Style.customInput}`}
                            placeholder="10 First of abbas elakkad street Nasr city Cairo, Egypt"
                        />

                        <div className={` ${Style.inputGroup}`}>
                            <input
                                type="text"
                                className={` ${Style.customInputVoucher}`}
                                placeholder="Enter a voucher"
                            />
                            <button className={`btn  ${Style.customButton}`} type="button">Apply</button>
                        </div>

                        <div className='d-flex justify-content-center '>
                            <img className={`w-25 pt-2 pb-3 ${isChecked ? Style.selectedImage : ''}`} src={creditImage} alt="Credit Card" />
                        </div>

                        <div className='d-flex justify-content-center text-black mb-4'>
                            <label className={Style.customCheckbox}>
                                <input 
                                    type="checkbox" 
                                    checked={isChecked}
                                    onChange={handleCheckboxChange} 
                                />
                                <span className={Style.customCheckboxSpan}></span>
                            </label>
                        </div>

                        <div className={`${Style.confirmOrder} d-flex justify-content-between align-items-center`}>
                            <p className={Style.suringCard}>Please make sure you have enough balance on your card</p>
                            <button className={`btn  ${Style.confirmingButton}`} type="button">Confirm Order</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
