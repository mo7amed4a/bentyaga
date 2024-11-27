import React from 'react';
import Style from '../Login/Login.css';
import { useFormik } from 'formik';
import { Checkbox } from '@mui/material';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../features/auth/authSlice';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

export default function Login() {
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const { isAuthentication } = useAuth();

    async function sendDataToApi(values) {
        // Transform keys to lowercase
        const transformedValues = Object.keys(values).reduce((acc, key) => {
            acc[key.toLowerCase()] = values[key];
            return acc;
        }, {});

        try {
            const res = await axios.post('https://api.bantayga.wtf/request-reset-password/', transformedValues);
            dispatch(setCredentials(res.data));
            navigate('/');
        } catch (err) {
            console.error(err);
            alert('An error occurred while logging in. Please try again later.');
        }
    }

    function loginSubmit(values) {
        sendDataToApi(values);
    }

    function validate(values) {
        let regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        let errors = {};

        if (!values.Email) {
            errors.Email = 'Email is required';
        } else if (!regexEmail.test(values.Email)) {
            errors.Email = 'Email is invalid';
        }

        return errors;
    }

    let formik = useFormik({
        initialValues: {
            Email: '',
        },
        validate,
        onSubmit: loginSubmit,
    });

    return isAuthentication ? <Navigate to={'/'} /> : (
        <>
            <div className="align-items-center d-flex flex-column justify-content-center">
                <div className="login_wrapper col-md-6 border border-2 border-black border-bottom-0 py-5">
                    <div className='text-center mt-5 mb-3'>
                        <h3 className='overflow-hidden fw-bold mt-5 mb-5'>Forgot Password</h3>
                    </div>
                    <div className='form_wrapper w-100 mx-auto pb-5 pt-3 px-4'>
                        <form onSubmit={formik.handleSubmit} className='pb-5'>
                            <label htmlFor="email" className='pt-4'>Email Address*</label>
                            {formik.errors.Email && formik.touched.Email ? <div className='text-danger py-1'>{formik.errors.Email}</div> : ''}
                            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.Email} type="email" id='email' className='form-control border border-2 border-black p-4' name='Email' />
                            
                    

                            <div className='pb-5'>
                                <button type='submit' className='w-100 btn bg-black text-white my-3 py-3 fs-4 border0 mb-5'>Send</button>
                            </div>
                            <p class="text-center mb-5">Do you have account? <Link class="text-decoration-underline text-black" to="/register">Register</Link></p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
