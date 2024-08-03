import React, { useState } from 'react';
import Style from './Register.css';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { Checkbox } from '@mui/material';
import axios from 'axios';

export default function Register() {

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
      setShowPassword((prev) => !prev);
  };

  const handleMouseDownPassword = (event) => {
      event.preventDefault();
  };

  async function sendDataToApi(values) {
      const transformedValues = {};
      for (const key in values) {
          transformedValues[key.toLowerCase()] = values[key];
      }

      try {
          const res = await axios.post('http://194.164.77.238/sing/', transformedValues);
          navigate('/login'); // Navigate to the login page upon successful registration
      } catch (err) {
          console.error(err);
          alert('An error occurred while registering. Please try again later.');
      }
  }

  function registerSubmit(values) {
      sendDataToApi(values);
  }

  function validate(values) {
      let regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      let errors = {};

      if (!values.firstname) {
          errors.firstname = 'Name is required';
      } else if (values.firstname.length < 3) {
          errors.firstname = 'Name length must be at least 3 characters';
      } else if (values.firstname.length > 10) {
          errors.firstname = 'Name length must be at most 10 characters';
      }

      if (!values.username) {
          errors.username = 'Username is required';
      }

      if (!values.email) {
          errors.email = 'Email is required';
      } else if (!regexEmail.test(values.email)) {
          errors.email = 'Email is invalid';
      }

      if (!values.password) {
          errors.password = 'Password is required';
      } 

      if (!values.password2) {
          errors.password2 = 'Password confirmation is required';
      } else if (values.password2 !== values.password) {
          errors.password2 = 'Passwords must match';
      }

      if (!values.country) {
          errors.country = 'Country is required';
      }

      if (!values.currence) {
          errors.currence = 'Currency is required';
      }

      return errors;
  }

  let formik = useFormik({
      initialValues: {
          civility: '',
          firstname: '',
          username: '',
          birthday: '',
          email: '',
          password: '',
          password2: '',
          country: '',
          currence: ''
      },
      validate,
      onSubmit: registerSubmit
  });

  return (
    <>
      <div className="login_wrapper align-items-center d-flex flex-column justify-content-center">
        <div className="col-md-6 border border-2 border-black border-bottom-0 py-5">
          <div className='text-center pt-5 register_title'>
            <h3 className='overflow-hidden fw-bold mt-5 pt-5'>CREATE A PROFILE</h3>
            <p>Create a profile and benefit from order delivery updates and <br /> return management as well as personalized <br />recommendations</p>
          </div>
          <div className='w-100 mx-auto py-3 px-4'>
            <form onSubmit={formik.handleSubmit}>
              <label htmlFor="civility" className='pt-4'>Civility*</label>
              <select onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.civility} name="civility" id="civility" className='form-control border border-2 border-black p-4'>
                <option value="">Select Civility</option>
                <option value="Mr">MR.</option>
                <option value="Mrs">MRS.</option>
              </select>
              <label htmlFor="firstname" className='pt-4'>First Name*</label>
              {formik.errors.firstname && formik.touched.firstname ? <div className='text-danger py-1'>{formik.errors.firstname}</div> : ''}
              <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.firstname} type="text" id='firstname' className='form-control border border-2 border-black p-4' name='firstname' />
              <label htmlFor="username" className='pt-4'>Username*</label>
              {formik.errors.username && formik.touched.username ? <div className='text-danger py-1'>{formik.errors.username}</div> : ''}
              <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.username} type="text" id='username' className='form-control border border-2 border-black p-4' name='username' />
              <label htmlFor="birthday" className='pt-4'>Birthdate (DD/MM/YYYY)*</label>
              <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.birthday} type="date" id='birthday' className='form-control border border-2 border-black p-4' name='birthday' />
              <label htmlFor="email" className='pt-4'>Email*</label>
              {formik.errors.email && formik.touched.email ? <div className='text-danger py-1'>{formik.errors.email}</div> : ''}
              <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="email" id='email' className='form-control border border-2 border-black p-4' name='email' />
              <label htmlFor="password" className='pt-4'>Password*</label>
              {formik.errors.password && formik.touched.password ? <div className='text-danger py-1'>{formik.errors.password}</div> : ''}
              <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} type={showPassword ? 'text' : 'password'} id='password' className='form-control border border-2 border-black p-4' name='password' />
              <label htmlFor="password2" className='pt-4'>Confirm Password*</label>
              {formik.errors.password2 && formik.touched.password2 ? <div className='text-danger py-1'>{formik.errors.password2}</div> : ''}
              <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password2} type={showPassword ? 'text' : 'password'} id='password2' className='form-control border border-2 border-black p-4' name='password2' />
              <label htmlFor="country" className='pt-4'>Country/Region of residence*</label>
              <select onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.country} name="country" id="country" className='form-control border border-2 border-black p-4'>
                <option value="">Select Country</option>
                <option value="Egypt">Egypt / EGP</option>
                <option value="Saudi Arabia">Saudi Arabia / SAR</option>
                {/* Add other countries as needed */}
              </select>
              <label htmlFor="currence" className='pt-4'>Currency*</label>
              <select onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.currence} name="currence" id="currence" className='form-control border border-2 border-black p-4'>
                <option value="">Select Currency</option>
                <option value="EGP">Egyptian Pound</option>
                <option value="SAR">Saudi Riyal</option>
                {/* Add other currencies as needed */}
              </select>
              <div className="d-flex align-items-center py-2">
                <Checkbox checked disabled />
                <label htmlFor="updates">I have read and understood the <span className='text-decoration-underline'>privacy policy</span> and I agree to the <br /> <span className='text-decoration-underline'> Terms of use.</span> *</label>
              </div>
              <div className="d-flex align-items-center py-2 mb-5">
                <Checkbox checked disabled />
                <label className='ps-2' htmlFor="updates">I would like to receive updates about Bantayga new activities, exclusive products, tailored services and to have a personalised client experience based on my interests.*</label>
              </div>
              <button type='submit' className='w-100 btn bg-black text-white my-5 py-3 fs-4 border-0'>Create My Profile</button>
              <p className='text-center mb-5'>Already have a profile? <Link to="/login" className='text-decoration-underline text-black'>Log in</Link></p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
