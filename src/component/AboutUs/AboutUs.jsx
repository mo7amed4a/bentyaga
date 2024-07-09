import React from 'react';
import Styles from './AboutUs.module.css';
import { Link } from 'react-router-dom';

export default function AboutUs() {
  return (
    <>
      <div className={Styles.backAbout}>
        <div className={`${Styles.layerAbout} d-flex align-items-center`}>
          <p className='fs-1 fw-light d-flex align-items-center'>About Us</p>
        </div>
      </div>

      <div className={Styles.container}>
        <p className={Styles.paragraph}>
          There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. There are many variations of passages of Lorem Ipsum available. some form, by injected humour, or randomised words which don't look even slightly believable.
        </p>

        <p className={Styles.paragraph}>
          There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. There are many variations of passages of Lorem Ipsum available. some form, by injected humour, or randomised words which don't look even slightly believable.
        </p>

        <p className={Styles.paragraph}>
          There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. There are many variations of passages of Lorem Ipsum available. some form, by injected humour, or randomised words which don't look even slightly believable.
        </p>

        <p className={Styles.paragraph}>
          There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. There are many variations of passages of Lorem Ipsum available. some form, by injected humour, or randomised words which don't look even slightly believable.
        </p>

        <p className={`${Styles.copyRight} fw-medium`}>
          <span>&copy;</span> 2024 BANTAYGA
        </p>

        <button 
          type="button"
          className={`${Styles.btnAbout} btn btn-dark`}
        >
          <Link className='text-decoration-none text-white' to="/contact">
            Contact Us
          </Link>
        </button>

     
      </div>
    </>
  );
}
