import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API } from './globals';
import { api } from '../API';

// Initial state
const initialState = {
  status: 'idle',
  message: '',
  errorMsg: '',
  errors: [],
  visits: [],
  selectedVisit: null,
  error: null,
  page: 1,
  per_page: 20,
  currentPage: 1,
  totalPages: 1,
};

// Async thunk for fetching all visit items
export const fetchAllVisits = createAsyncThunk(
  'visit/fetchAllVisits',
  async ({page, per_page}, thunkAPI) => {
    try {
      const response = await api.get(API + `/api/visits/user/pagination?page=${page}&per_page=${per_page}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getVisitDetails = createAsyncThunk(
  'visit/getVisitDetails',
  async (id, thunkAPI) => {
    try {
      const response = await api.get(API + `/api/visits/visit/${id}`);
      return response.data; // Return only the message
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);


// Create the slice
const visitSlice = createSlice({
  name: 'visit',
  initialState,
  reducers: {
    setMsgs: (state) => {
        state.message = null;
        state.errorMsg = null;
    },  
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllVisits.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllVisits.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.errors = action.payload.errors;
        state.visits = action.payload.data[0].data; // Access the inner array
        state.totalPages = action.payload.data[0].last_page; // Access the inner array
        state.currentPage = action.payload.data[0].current_page; // Access the inner array
      })
      .addCase(fetchAllVisits.rejected, (state, action) => {
        state.status = 'failed';
        state.error = 'Failed to fetch visit';
      })
      .addCase(getVisitDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getVisitDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedVisit = action.payload.data[0]
        state.message = "تم الاضافة بنجاح"; // Update message with the returned message
      })
      .addCase(getVisitDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.errorMsg =  'Failed to fetch visit';
      });
  },
});

// Export the reducer
export const { setMsgs } = visitSlice.actions;
export default visitSlice.reducer;
