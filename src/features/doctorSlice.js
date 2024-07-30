import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API } from './globals';

// Initial state
const initialState = {
  status: 'idle',
  message: '',
  errors: [],
  doctors: null,
  error: null,
};

// Async thunk for fetching all doctors
export const fetchAllDoctors = createAsyncThunk(
  'doctors/fetchAllDoctors',
  async (thunkAPI) => {
    try {
      const response = await axios.get(API + `/api/doctors/get`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Create the slice
const doctorsSlice = createSlice({
  name: 'doctors',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllDoctors.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllDoctors.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.message = action.payload.message;
        state.errors = action.payload.errors;
        state.doctors = action.payload.data[0]; // Access the inner array
      })
      .addCase(fetchAllDoctors.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to fetch doctors';
      });
  },
});

// Export the reducer
export default doctorsSlice.reducer;
