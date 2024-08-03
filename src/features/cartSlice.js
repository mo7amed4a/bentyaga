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
      const response = await api.get(API + '/api/cart/');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for adding a product to the cart with color, size, and quantity
export const addProductToCart = createAsyncThunk(
  'cart/addProductToCart',
  async ({ id, color, quantity, size }, thunkAPI) => {
    try {
      const response = await api.post(API + `/api/cart/`, {
        product: id,
        color: color,
        quantity: quantity,
        size: size
      });
      thunkAPI.dispatch(fetchAllCart()); // Dispatch fetchAllCart to update cart
      return response.data.message; // Return only the message
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const removeProductFromCart = createAsyncThunk(
  'cart/removeProductFromCart',
  async (id, thunkAPI) => {
    try {
      const response = await api.delete(API + `/api/cart/${id}/`);
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
        state.cart = action.payload; // Access the inner array
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
        state.message = action.payload; // Use the returned message
      })
      .addCase(addProductToCart.rejected, (state, action) => {
        state.status = 'failed';
        state.errorMsg = 'Failed to add product to cart';
      })
      .addCase(removeProductFromCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(removeProductFromCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.message = action.payload; // Use the returned message
      })
      .addCase(removeProductFromCart.rejected, (state, action) => {
        state.status = 'failed';
        state.errorMsg = 'Failed to remove product from cart';
      });
  },
});

// Export the reducer
export const { setMsgs } = cartSlice.actions;
export default cartSlice.reducer;
