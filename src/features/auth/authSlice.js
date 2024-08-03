import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: null,
  email: null,
  phone: null,
  picture: null,
  token: null,
  isAuthentication: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.token = action.payload.access;
      state.isAuthentication = true;
    },
    clearCredentials: (state) => {
      state.name = null;
      state.email = null;
      state.phone = null;
      state.picture = null;
      state.token = null;
      state.isAuthentication = false;
    },
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;
export default authSlice.reducer;
