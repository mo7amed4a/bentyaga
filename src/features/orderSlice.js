import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API } from './globals';
import { api } from '../API';

// Initial state
const initialState = {
  status: 'idle',
  message: '',
  errorMsg: '',
  errors: [],
  orders: [],
  selectedOrder: null,
  error: null,
  page: 1,
  per_page: 20,
  currentPage: 1,
  totalPages: 1,
};

// Async thunk for fetching all order items
export const fetchAllOrders = createAsyncThunk(
  'order/fetchAllOrders',
  async ({page, per_page}, thunkAPI) => {
    try {
      const response = await api.get(API + `/api/orders/user/pagination?page=${page}&per_page=${per_page}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getOrderDetails = createAsyncThunk(
  'order/getOrderDetails',
  async (id, thunkAPI) => {
    try {
      const response = await api.get(API + `/api/orders/order/${id}`);
      return response.data; // Return only the message
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);


// Create the slice
const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setMsgs: (state) => {
        state.message = null;
        state.errorMsg = null;
    },  
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllOrders.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.errors = action.payload.errors;
        state.orders = action.payload.data[0].data; // Access the inner array
        state.totalPages = action.payload.data[0].last_page; // Access the inner array
        state.currentPage = action.payload.data[0].current_page; // Access the inner array
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = 'Failed to fetch order';
      })
      .addCase(getOrderDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedOrder = action.payload.data[0]
        state.message = "تم الاضافة بنجاح"; // Update message with the returned message
      })
      .addCase(getOrderDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.errorMsg =  'Failed to fetch order';
      });
  },
});

// Export the reducer
export const { setMsgs } = orderSlice.actions;
export default orderSlice.reducer;
