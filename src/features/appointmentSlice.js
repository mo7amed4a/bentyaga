import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API } from './globals';
import { api } from '../API';

// Initial state
const initialState = {
  status: 'idle',
  message: '',
  errorMsg: '',
  errors: [],
  appointments: [],
  selectedAppointment: null,
  error: null,
  page: 1,
  per_page: 20,
  currentPage: 1,
  totalPages: 1,
};

// Async thunk for fetching all appointment items
export const fetchAllAppointments = createAsyncThunk(
  'appointment/fetchAllAppointments',
  async ({page, per_page}, thunkAPI) => {
    try {
      const response = await api.get(API + `/api/appointments/user/pagination?page=${page}&per_page=${per_page}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getAppointmentDetails = createAsyncThunk(
  'appointment/getAppointmentDetails',
  async (id, thunkAPI) => {
    try {
      const response = await api.get(API + `/api/appointments/appointment/${id}`);
      return response.data; // Return only the message
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);


// Create the slice
const appointmentSlice = createSlice({
  name: 'appointment',
  initialState,
  reducers: {
    setMsgs: (state) => {
        state.message = null;
        state.errorMsg = null;
    },  
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllAppointments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllAppointments.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.errors = action.payload.errors;
        state.appointments = action.payload.data[0].data; // Access the inner array
        state.totalPages = action.payload.data[0].last_page; // Access the inner array
        state.currentPage = action.payload.data[0].current_page; // Access the inner array
      })
      .addCase(fetchAllAppointments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = 'Failed to fetch appointment';
      })
      .addCase(getAppointmentDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAppointmentDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedAppointment = action.payload.data[0]
        state.message = "تم الاضافة بنجاح"; // Update message with the returned message
      })
      .addCase(getAppointmentDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.errorMsg =  'Failed to fetch appointment';
      });
  },
});

// Export the reducer
export const { setMsgs } = appointmentSlice.actions;
export default appointmentSlice.reducer;
