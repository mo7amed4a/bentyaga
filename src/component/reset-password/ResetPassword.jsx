import React from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../features/auth/authSlice';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

export default function ResetPassword() {
    const { uid, token } = useParams();
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const { isAuthentication } = useAuth();

    async function sendDataToApi(values) {
        const payload = {
            new_password: values.Password,
        };

        try {
            const res = await axios.post(`https://api.bantayga.wtf/reset-password/${uid}/${token}/`, payload);
            dispatch(setCredentials(res.data));
            navigate('/');
        } catch (err) {
            console.error(err);
            alert('An error occurred while resetting the password. Please try again later.');
        }
    }

    function loginSubmit(values) {
        sendDataToApi(values);
    }

    function validate(values) {
        let errors = {};

        // Validation for Password
        if (!values.Password) {
            errors.Password = 'Password is required';
        } else if (values.Password.length < 8) {
            errors.Password = 'Password must be at least 8 characters';
        }

        // Validation for Confirm Password
        if (!values.ConfirmPassword) {
            errors.ConfirmPassword = 'Confirm Password is required';
        } else if (values.ConfirmPassword !== values.Password) {
            errors.ConfirmPassword = 'Passwords do not match';
        }

        return errors;
    }

    let formik = useFormik({
        initialValues: {
            Password: '',
            ConfirmPassword: '',
        },
        validate,
        onSubmit: loginSubmit,
    });

    return isAuthentication ? <Navigate to={'/'} /> : (
        <>
            <div className="align-items-center d-flex flex-column justify-content-center">
                <div className="login_wrapper col-md-6 border border-2 border-black border-bottom-0 py-5">
                    <div className="text-center mt-5 mb-3">
                        <h3 className="overflow-hidden fw-bold mt-5 mb-5">Reset Password</h3>
                    </div>
                    <div className="form_wrapper w-100 mx-auto pb-5 pt-3 px-4">
                        <form onSubmit={formik.handleSubmit} className="pb-5">
                            {/* Password Field */}
                            <label htmlFor="password" className="pt-4">New Password*</label>
                            {formik.errors.Password && formik.touched.Password ? (
                                <div className="text-danger py-1">{formik.errors.Password}</div>
                            ) : ''}
                            <input
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.Password}
                                type="password"
                                id="password"
                                className="form-control border border-2 border-black p-4"
                                name="Password"
                            />

                            {/* Confirm Password Field */}
                            <label htmlFor="confirmPassword" className="pt-4">Confirm New Password*</label>
                            {formik.errors.ConfirmPassword && formik.touched.ConfirmPassword ? (
                                <div className="text-danger py-1">{formik.errors.ConfirmPassword}</div>
                            ) : ''}
                            <input
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.ConfirmPassword}
                                type="password"
                                id="confirmPassword"
                                className="form-control border border-2 border-black p-4"
                                name="ConfirmPassword"
                            />

                            <div className="pb-5">
                                <button type="submit" className="w-100 btn bg-black text-white my-3 py-3 fs-4 border0 mb-5">Reset Password</button>
                            </div>
                            <p className="text-center mb-5">Remember your password? <Link className="text-decoration-underline text-black" to="/login">Login</Link></p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
