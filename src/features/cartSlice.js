import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API } from './globals';
import { api } from '../API';

// Initial state
const initialState = {
  status: 'idle',
  message: '',
  errorMsg: '',
  errors: [],
  cart: [],
  error: null,
};

// Async thunk for fetching all cart items
export const fetchAllCart = createAsyncThunk(
  'cart/fetchAllCart',
  async (_, thunkAPI) => {
    try {
      const response = await api.get(API + '/api/cart/get');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const addProductToCart = createAsyncThunk(
  'cart/addProductToCart',
  async (id, thunkAPI) => {
    try {
      const response = await api.post(API + `/api/cart/put-product?product_id=${id}&quantity=1`);
      thunkAPI.dispatch(fetchAllCart()); // Dispatch fetchAllCart to update cart
      return response.data.message; // Return only the message
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);


export const removeProductFromCart = createAsyncThunk(
  'cart/remove-product',
  async (id, thunkAPI) => {
    try {
      const response = await api.post(API + `/api/cart/remove-product?product_id=${id}`);
      thunkAPI.dispatch(fetchAllCart()); // Dispatch fetchAllCart to update cart
      return response.data.message; // Return only the message
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Create the slice
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setMsgs: (state) => {
        state.message = null;
        state.errorMsg = null;
    },  
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.errors = action.payload.errors;
        state.cart = action.payload.data[0]; // Access the inner array
      })
      .addCase(fetchAllCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = 'Failed to fetch cart';
      })
      .addCase(addProductToCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addProductToCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.message = "تم الاضافة بنجاح"; // Update message with the returned message
      })
      .addCase(addProductToCart.rejected, (state, action) => {
        state.status = 'failed';
        state.errorMsg =  'Failed to add product to cart';
      })
      .addCase(removeProductFromCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(removeProductFromCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.message = "تم الحذف بنجاح"; // Update message with the returned message
      })
      .addCase(removeProductFromCart.rejected, (state, action) => {
        state.status = 'failed';
        state.errorMsg =  'Failed to remove product from cart';
      });
  },
});

// Export the reducer
export const { setMsgs } = cartSlice.actions;
export default cartSlice.reducer;
