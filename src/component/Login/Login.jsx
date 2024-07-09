import React from 'react';
import Style from './Login.css';
import { Formik, useFormik } from 'formik';

// import * as Yup from 'yup';
import {Checkbox} from '@mui/material';

 

export default function Login() {

    function loginSubmit(values){
        console.log(values);
    }

   

    function validate(values){
        let regexPass = /^[A-Z][a-z0-9]{5,10}$/ ;

        let regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        let errors = {};


        if(!values.Email){
            errors.FirstName = 'Email is required';
        } 
        else if(!regexEmail.test(values.Email)){
            errors.Email = 'Email is invalid'
        }



        return errors;
    }

    let formik = useFormik({
        initialValues:{
            Email:'',

        },validate,
        onSubmit:loginSubmit
    })



  return <>
   
    <div className="align-items-center d-flex flex-column justify-content-center">
        <div className="col-md-6  border border-2 border-black border-bottom-0 py-5">
            <div className='text-center mt-5 mb-3'>
                <h3 className='overflow-hidden fw-bold mt-5 mb-5'>LOGIN</h3>

            </div>
           

             <div className='w-100 mx-auto pb-5 pt-3 px-4'>

                <form onSubmit={formik.handleSubmit} className='pb-5'>
                    
                    
                
                    <label htmlFor="email" className='pt-4'>Email Address*</label>
                    {formik.errors.Email && formik.touched.Email? <div className='text-danger py-1 '>{formik.errors.Email}</div> :''}

                    <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.Email} type="email" id='email' className='form-control border border-2 border-black p-4' name='Email'/>



                    
                <div className="d-flex align-items-center py-2 justify-justify-content-center mb-4">
                    <Checkbox { 
                            ...<label></label>
                        }  checked disabled />
                            <label className='pe-3' for="">Remember Me</label>

                        
                            <a className='text-decoration-underline text-black ms-auto'>Forget Password</a>
                        
                        

                </div>

                        <div className='pb-5'>
                             <button type='submit' className='w-100 btn bg-black text-white my-3 py-3 fs-4 border0 mb-5'>NEXT</button>

                        </div>


                </form>

            </div>
            
        </div>
    </div>


  </>
}
