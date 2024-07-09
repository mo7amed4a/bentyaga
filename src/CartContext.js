// import axios from 'axios';
// import {createContext } from 'react'

// import axios from "axios";

// export let CartContext = createContext();

// let userToken = localStorage.getItem('userToken')

// let headers = {
//     token : userToken
// }

// function addToCart(productId){
//     return axios.post(`https://route-ecommerce.onrender.com/api/v1/cart`,
//         {
//         productId : productId
//         },
//         {
//             headers :headers
//         }).then((response)=> response)
//         .catch((error)=>error)

// }

// function getLoggedToCart(){
//     return axios.get(`https://route-ecommerce.onrender.com/api/v1/cart`,{
//         headers:headers
//     }).then((res)=>res)
//     .catch((err)=>err)
// }

// export default function CartContextProvider(props){

//     return <CartContextProvider value={{addToCart , getLoggedToCart}}>
//             {props.children}
//     </CartContextProvider>

// }