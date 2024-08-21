import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API } from './globals';
import { api } from '../API';

// Initial state
const initialState = {
  status: 'idle',
  message: '',
  errorMsg: '',
  errors: [],
  wishlist: [],
  error: null,
};

// Async thunk for fetching all wishlist items
export const fetchAllWishlist = createAsyncThunk(
  'wishlist/fetchAllWishlist',
  async (_, thunkAPI) => {
    try {
      const response = await api.get(API + '/wishlist/');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for adding a product to the wishlist with color, size, and quantity
export const addProductToWishlist = createAsyncThunk(
  'wishlist/addProductToWishlist',
  async (id, thunkAPI) => {
    try {
      const response = await api.post(API + `/wishlist/`, {
        product_id: id,
      });
      thunkAPI.dispatch(fetchAllWishlist()); // Dispatch fetchAllWishlist to update wishlist
      return response.data.message; // Return only the message
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const removeProductFromWishlist = createAsyncThunk(
  'wishlist/removeProductFromWishlist',
  async (id, thunkAPI) => {
    try {
      const response = await api.delete(API + `/wishlist/`, {
        data: {
          product_id: id
        }
      });
      thunkAPI.dispatch(fetchAllWishlist()); // Dispatch fetchAllWishlist to update wishlist
      return response.data.message; // Return only the message
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Create the slice
const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    setMsgs: (state) => {
      state.message = null;
      state.errorMsg = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllWishlist.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllWishlist.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.errors = action.payload.errors;
        state.wishlist = action.payload; // Access the inner array
      })
      .addCase(fetchAllWishlist.rejected, (state, action) => {
        state.status = 'failed';
        state.error = 'Failed to fetch wishlist';
        state.wishlist = []
      })
      .addCase(addProductToWishlist.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addProductToWishlist.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.message = action.payload; // Use the returned message
      })
      .addCase(addProductToWishlist.rejected, (state, action) => {
        state.status = 'failed';
        state.errorMsg = 'Failed to add product to wishlist';
      })
      .addCase(removeProductFromWishlist.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(removeProductFromWishlist.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.message = action.payload; // Use the returned message
      })
      .addCase(removeProductFromWishlist.rejected, (state, action) => {
        state.status = 'failed';
        state.errorMsg = 'Failed to remove product from wishlist';
      });
  },
});

// Export the reducer
export const { setMsgs } = wishlistSlice.actions;
export default wishlistSlice.reducer;
