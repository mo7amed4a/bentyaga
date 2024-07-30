import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API } from './globals';

// Initial state
const initialState = {
  status: 'idle',
  message: '',
  errors: [],
  consultations: null,
  error: null,
};

// Async thunk for fetching all consultations
export const fetchAllConsultations = createAsyncThunk(
  'consultations/fetchAllConsultations',
  async (thunkAPI) => {
    try {
      const response = await axios.get(API + `/api/consultations/get`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Create the slice
const consultationsSlice = createSlice({
  name: 'consultations',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllConsultations.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllConsultations.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.message = action.payload.message;
        state.errors = action.payload.errors;
        state.consultations = action.payload.data[0]; // Access the inner array
      })
      .addCase(fetchAllConsultations.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to fetch consultations';
      });
  },
});

// Export the reducer
export default consultationsSlice.reducer;
