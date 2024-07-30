import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API } from './globals';

// Initial state
const initialState = {
  status: 'idle',
  message: '',
  errors: [],
  services: null,
  all_services: null,
  notes: {},
  page: 1,
  per_page: 20,
  currentPage: 1,
  totalPages: 1,
  error: null,
  packages_status: 'idle',
  packages_message: '',
  packages_errors: [],
  packages: null,
  packages_notes: {},
  packages_page: 1,
  packages_per_page: 20,
  packages_currentPage: 1,
  packages_totalPages: 1,
  packages_error: null,
  search_status: 'idle',
  search_message: '',
  search_errors: [],
  search_results: null,
  search_notes: {},
  search_page: 1,
  search_per_page: 20,
  search_currentPage: 1,
  search_totalPages: 1,
  search_error: null,
};

// Async thunk for fetching services
export const fetchServices = createAsyncThunk(
  'services/fetchServices',
  async ({page, per_page}, thunkAPI) => {
    try {
      const response = await axios.get(API + `/api/services/get-services-pagination?page=${page}&per_page=${per_page}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getAllServices = createAsyncThunk(
  'services/getAllServices',
  async (thunkAPI) => {
    try {
      const response = await axios.get(API + `/api/services/get-all-services`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for fetching packages
export const fetchPackages = createAsyncThunk(
  'services/fetchPackages',
  async ({packages_page, packages_per_page}, thunkAPI) => {
    try {
      const response = await axios.get(API + `/api/services/get-packages-pagination?page=${packages_page}&per_page=${packages_per_page}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for searching services
export const searchServices = createAsyncThunk(
  'services/searchServices',
  async ({query, page, per_page}, thunkAPI) => {
    try {
      const response = await axios.get(API + `/api/services/get-packages-search?search=${query}&page=${page}&per_page=${per_page}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Create the slice
const servicesSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch services
      .addCase(fetchServices.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.message = action.payload.message;
        state.errors = action.payload.errors;
        state.services = action.payload.data[0].data; // Access the inner array
        state.totalPages = action.payload.data[0].last_page; // Access the inner array
        state.currentPage = action.payload.data[0].current_page; // Access the inner array
        state.notes = action.payload.notes;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to fetch services';
      })
      // Fetch packages
      .addCase(fetchPackages.pending, (state) => {
        state.packages_status = 'loading';
      })
      .addCase(fetchPackages.fulfilled, (state, action) => {
        state.packages_status = 'succeeded';
        state.packages_message = action.payload.message;
        state.packages_errors = action.payload.errors;
        state.packages = action.payload.data[0].data; // Access the inner array
        state.packages_totalPages = action.payload.data[0].last_page; // Access the inner array
        state.packages_currentPage = action.payload.data[0].current_page; // Access the inner array
        state.packages_notes = action.payload.notes;
      })
      .addCase(fetchPackages.rejected, (state, action) => {
        state.packages_status = 'failed';
        state.packages_error = action.payload || 'Failed to fetch packages';
      })
      // Search services
      .addCase(searchServices.pending, (state) => {
        state.search_status = 'loading';
      })
      .addCase(searchServices.fulfilled, (state, action) => {
        state.search_status = 'succeeded';
        state.search_message = action.payload.message;
        state.search_errors = action.payload.errors;
        state.search_results = action.payload.data[0].data; // Access the inner array
        state.search_totalPages = action.payload.data[0].last_page; // Access the inner array
        state.search_currentPage = action.payload.data[0].current_page; // Access the inner array
        state.search_notes = action.payload.notes;
      })
      .addCase(searchServices.rejected, (state, action) => {
        state.search_status = 'failed';
        state.search_error = action.payload || 'Failed to search services';
      })
      // get all services
      .addCase(getAllServices.fulfilled, (state, action) => {
        state.all_services = action.payload.data[0]; // Access the inner array
      })
  },
});

// Export actions and reducer
export const { setPage } = servicesSlice.actions;
export default servicesSlice.reducer;
