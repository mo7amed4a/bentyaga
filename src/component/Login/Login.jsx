import React from 'react';
import Style from './Login.css';
import { useFormik } from 'formik';
import { Checkbox } from '@mui/material';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const dispatch = useDispatch();
    let navigate = useNavigate();

    async function sendDataToApi(values) {
        // Transform keys to lowercase
        const transformedValues = Object.keys(values).reduce((acc, key) => {
            acc[key.toLowerCase()] = values[key];
            return acc;
        }, {});

        try {
            const res = await axios.post('http://194.164.77.238/login/', transformedValues);
            if (res.data.status === true) {
                dispatch(setCredentials(res.data));
                navigate('/'); // Navigate to the home page upon successful login
            } else {
                alert('Login failed: ' + res.data.message); // Display error message from API
            }
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

        if (!values.Password) {
            errors.Password = 'Password is required';
        } 
        return errors;
    }

    let formik = useFormik({
        initialValues: {
            Email: '',
            Password: '',
        },
        validate,
        onSubmit: loginSubmit,
    });

    return (
        <>
            <div className="align-items-center d-flex flex-column justify-content-center">
                <div className="login_wrapper col-md-6 border border-2 border-black border-bottom-0 py-5">
                    <div className='text-center mt-5 mb-3'>
                        <h3 className='overflow-hidden fw-bold mt-5 mb-5'>LOGIN</h3>
                    </div>
                    <div className='form_wrapper w-100 mx-auto pb-5 pt-3 px-4'>
                        <form onSubmit={formik.handleSubmit} className='pb-5'>
                            <label htmlFor="email" className='pt-4'>Email Address*</label>
                            {formik.errors.Email && formik.touched.Email ? <div className='text-danger py-1'>{formik.errors.Email}</div> : ''}
                            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.Email} type="email" id='email' className='form-control border border-2 border-black p-4' name='Email' />
                            
                            <label htmlFor="password" className='pt-4'>Password*</label>
                            {formik.errors.Password && formik.touched.Password ? <div className='text-danger py-1'>{formik.errors.Password}</div> : ''}
                            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.Password} type="password" id='password' className='form-control border border-2 border-black p-4' name='Password' />

                            <div className="d-flex align-items-center py-2 justify-justify-content-center mb-4">
                                <Checkbox {...<label></label>} checked disabled />
                                <label className='pe-3' htmlFor="">Remember Me</label>
                                <a className='text-decoration-underline text-black ms-auto'>Forget Password</a>
                            </div>

                            <div className='pb-5'>
                                <button type='submit' className='w-100 btn bg-black text-white my-3 py-3 fs-4 border0 mb-5'>Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
