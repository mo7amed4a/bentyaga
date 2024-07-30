import axios from 'axios';
import { setCredentials, clearCredentials } from '../features/auth/authSlice';
import { API } from '../features/globals';

const api = axios.create({
  baseURL: API, // Replace with your API base URL
  withCredentials: false, // Include cookies with requests if needed
});

const setupInterceptors = (store) => {
api.interceptors.request.use(
  (config) => {
    const state = store.getState(); // Access the current state directly from the store
    const token = state.auth.token; // Get the token from the state

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
        store.dispatch(clearCredentials()); // Dispatch the action to clear credentials
        window.location.href = '/login'; // Redirect to login
    }
    return Promise.reject(error);
  }
);
};
export { api, setupInterceptors };