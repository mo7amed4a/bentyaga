import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API } from './globals';

// Initial state
const initialState = {
  status: 'idle',
  message: '',
  errors: [],
  branches: null,
  error: null,
};

// Async thunk for fetching all branches
export const fetchAllBranches = createAsyncThunk(
  'branches/fetchAllBranches',
  async (thunkAPI) => {
    try {
      const response = await axios.get(API + `/api/branches/get`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Create the slice
const branchesSlice = createSlice({
  name: 'branches',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllBranches.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllBranches.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.message = action.payload.message;
        state.errors = action.payload.errors;
        state.branches = action.payload.data[0]; // Access the inner array
      })
      .addCase(fetchAllBranches.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to fetch branches';
      });
  },
});

// Export the reducer
export default branchesSlice.reducer;
