import axios from 'axios';
import { setCredentials, clearCredentials } from '../features/auth/authSlice';
import { API } from '../features/globals';

const api = axios.create({
  baseURL: API, 
  withCredentials: false, 
});

const setupInterceptors = (store) => {
api.interceptors.request.use(
  (config) => {
    const state = store.getState(); 
    const token = state.auth.token; 
    
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
        store.dispatch(clearCredentials()); 
        if (originalRequest.method === 'post' )
        window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
};
export { api, setupInterceptors };