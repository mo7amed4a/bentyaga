import {React,useState} from 'react';
import Style from './Register.css';
import { Formik, useFormik } from 'formik';
import { Link } from 'react-router-dom';

// import * as Yup from 'yup';
import {Checkbox} from '@mui/material';
// import Box from '@mui/material/Box';
// import IconButton from '@mui/material/IconButton';
// import Input from '@mui/material/Input';
// import FilledInput from '@mui/material/FilledInput';
// import OutlinedInput from '@mui/material/OutlinedInput';
// import InputLabel from '@mui/material/InputLabel';
// import InputAdornment from '@mui/material/InputAdornment';
// import FormHelperText from '@mui/material/FormHelperText';
// import FormControl from '@mui/material/FormControl';
// import TextField from '@mui/material/TextField';
// import Visibility from '@mui/icons-material/Visibility';
// import VisibilityOff from '@mui/icons-material/VisibilityOff';



export default function Register() {

    function registerSubmit(values){
        // console.log(values);
    }
    const [showPassword, setShowPassword] = useState(false);

const handleClickShowPassword = () => {
  setShowPassword((prev) => !prev);
};

const handleMouseDownPassword = (event) => {
  event.preventDefault();
};
   

    function validate(values){
        let regexPass = /^[A-Z][a-z0-9]{5,10}$/ ;

        let regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        let errors = {};

        if(!values.FirstName){
            errors.FirstName = 'Name is required';
        }
        else if (values.FirstName.length < 3){
            errors.FirstName = 'Name length is 3'
        }
        else if(values.FirstName.length > 10){
            errors.FirstName = 'Name length is 10'
        }

        if(!values.Email){
            errors.FirstName = 'Email is required';
        } 
        else if(!regexEmail.test(values.Email)){
            errors.Email = 'Email is invalid'
        }

        if(!values.Password){
            errors.Password = 'Password is required';
        } 
        else if(!regexPass.test(values.Password)){
            errors.Password = 'Password first letter must be uppercase followed by any thing'
        }


        return errors;
    }

    let formik = useFormik({
        initialValues:{
            Civility:'',
            FirstName:'',
            Birthday:'',
            Email:'',
            Password:'',
            Country:''

        },validate,
        onSubmit:registerSubmit
    })



  return <>
   
    <div className="align-items-center d-flex flex-column justify-content-center">
        <div className="col-md-6  border border-2 border-black border-bottom-0 py-5" >
        <div className='text-center pt-5'>
        <h3 className='overflow-hidden fw-bold mt-5 pt-5'>CREATE A PROFILE </h3>
            <p>Create a profile and benefit from order delivery updates and <br /> return management as well as personalized  <br />recommendations</p>

        </div>
           

             <div className='w-100 mx-auto py-3 px-4'>

                <form onSubmit={formik.handleSubmit}>
                    
                    <label htmlFor="civility" className='pt-4'>Civility*</label>
                    

                    <select onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.Civility}  name="Civility" id="civility" className='form-control border border-2 border-black  p-4'>
                        <option value="Mr">MR. </option>
                        <option value="Mrs">MRS.</option>
                    </select>

                    

                    <label htmlFor="firstName" className='pt-4'>FirstName*</label>
                    {formik.errors.FirstName && formik.touched.FirstName? <div className='text-danger py-1 '>{formik.errors.FirstName}</div> :''}

                    <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.FirstName} type="text" id='firstName' className='form-control border border-2 border-black p-4' name='FirstName'/>



                    <label htmlFor="birthday" className='pt-4'>Birthdate (DD/MM/YYYY)*</label>
                    <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.Birthday} type="date" id='birthday' className='form-control border border-2 border-black p-4' name='Birthday'/>


                    <label htmlFor="email" className='pt-4'>Email*</label>
                    {formik.errors.Email && formik.touched.Email? <div className='text-danger py-1 '>{formik.errors.Email}</div> :''}

                    <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.Email} type="email" id='email' className='form-control border border-2 border-black p-4' name='Email'/>


                    <label htmlFor="password" className='pt-4'>Password*</label>
                    {formik.errors.Password && formik.touched.Password? <div className='text-danger py-1 '>{formik.errors.Password}</div> :''}

                    <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.Password} type="password" id='password' className='form-control border border-2 border-black p-4' name='Password'/>


                    <label htmlFor="country" className='pt-4'>Country/Region of residence*</label>
                    <select onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.Country}  name="Country" id="country" className='form-control border border-2 border-black  p-4'>
                        <option value="Egypt / EGP">Egypt / EGP</option>
                        <option value="Saudi Arbia">Sauid Arabia / riyal.</option>
                    </select>


                   {/* <div className="d-flex align-items-center py-2 ">
                   <input type="checkbox" required id="terms" name="terms" value="terms" className='mx-1'/>
                    <label for="terms"> I have read and understood the privacy policy and I agree to the Terms of use. *</label><br></br>
                   </div> */}

                  <div className="d-flex align-items-center py-2">
                    <Checkbox { 
                        ...<label></label>
                    }  checked disabled />
                        {/* <input type="checkbox" required className='mx-1' id="updates" name="updates" value="updates" /> */}
                        <label className='' for="updates">I have read and understood the <span className='text-decoration-underline'>privacy policy</span> and I agree to the <br /> <span className='text-decoration-underline'> Terms of use.</span> *

                        </label>

                        </div>


                   <div className="d-flex align-items-center py-2 mb-5">
                   <Checkbox { 
                    ...<label></label>
                   }  checked disabled/>
                    {/* <input type="checkbox" required className='mx-1' id="updates" name="updates" value="updates" /> */}
                    <label className='ps-2' for="updates"> I would like to receive updates about Bantayga new activities, exclusive products, tailored services and to have a personalised client experience based on my interests.*

                    </label>

                    </div>

                    

                    {/* <FormControl sx={{ m: 1, width: '100ch' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl> */}
            



                    <button type='submit'  className='w-100 btn bg-black text-white my-5 py-3 fs-4 border0'>Create My Profile</button>

                    <p className='text-center mb-5'>Already have a profile? <Link to="/login" className='text-decoration-underline text-black'>Log in</Link>  </p>

                </form>

            </div>
            
        </div>
    </div>


  </>
}
