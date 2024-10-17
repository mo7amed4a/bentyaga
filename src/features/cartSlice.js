import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API } from './globals';
import { api } from '../API';

const initialState = {
  status: 'idle',
  message: '',
  errorMsg: '',
  errors: [],
  cart: [],
  error: null,
};


export const fetchAllCart = createAsyncThunk(
  'cart/fetchAllCart',
  async (_, thunkAPI) => {
    try {     
      const response = await api.get(API + '/api/cart');      
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const addProductToCart = createAsyncThunk(
  'cart/addProductToCart',
  async ({ id, color, quantity, size }, thunkAPI) => {
    try {
      let data = {}
      if (size != "none") {
        data.size = size
      }
      if (color != "none") {
        data.color = color
      }
      const response = await api.post(API + `/api/cart/add-item/${id}/`, {
        quantity: quantity,
        ...data
      });
      thunkAPI.dispatch(fetchAllCart());
      return response.data.message;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const removeProductFromCart = createAsyncThunk(
  'cart/removeProductFromCart',
  async (id, thunkAPI) => {
    try {
      const response = await api.delete(API + `/api/cart/remove-item/${id}/`);
      thunkAPI.dispatch(fetchAllCart());
      return response.data.message;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateQuantity = createAsyncThunk(
  'cart/updateQuantity',
  async ({ id, quantity }, thunkAPI) => {
    try {
      // TODO: افتكر نوع الميثود
      const response = await api.put(API + `/Incersquntity/`, {
        product_id: id,
        quantity: parseInt(quantity)
      });
      thunkAPI.dispatch(fetchAllCart());
      return response.data.message;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setMsgs: (state) => {
      state.message = null;
      state.errorMsg = null;
    },
    clearCart: (state) => {
      state.cart = [];
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
        state.cart = action.payload;
      })
      .addCase(fetchAllCart.rejected, (state) => {
        state.status = 'failed';
        state.error = 'Failed to fetch cart';
      })
      .addCase(addProductToCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addProductToCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.message = action.payload;
      })
      .addCase(addProductToCart.rejected, (state) => {
        state.status = 'failed';
        state.errorMsg = 'Failed to add product to cart';
      })
      .addCase(removeProductFromCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(removeProductFromCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.message = action.payload;
      })
      .addCase(removeProductFromCart.rejected, (state) => {
        state.status = 'failed';
        state.errorMsg = 'Failed to remove product from cart';
      })
      .addCase(updateQuantity.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateQuantity.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.message = action.payload;
      })
      .addCase(updateQuantity.rejected, (state) => {
        state.status = 'failed';
        state.errorMsg = 'Failed to update product quantity';
      });
  },
});

export const { setMsgs, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
