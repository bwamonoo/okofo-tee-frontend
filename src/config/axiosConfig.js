import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { getAccessToken, refreshAccessToken } from './auth';

// Create the axios instance
const axiosInstance = axios.create({
  baseURL: 'http://192.168.4.188:8000',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'User-Agent': 'MyApp/1.0 ( Mobile Phone )',
  },
});

// Request interceptor to add token to headers
axiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = await getAccessToken();
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiry and retry requests
axiosInstance.interceptors.response.use(
  (response) => {
    return response;  // If the response is successful, just return it
  },
  async (error) => {
    const originalRequest = error.config;
    
    // If the request failed due to an expired token
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark the request as being retried

      // Attempt to refresh the token
      const newAccessToken = await refreshAccessToken();

      if (newAccessToken) {
        // Update the Authorization header with the new token
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

        // Retry the original request with the new token
        return axiosInstance(originalRequest);
      }
    }

    return Promise.reject(error); // If the refresh fails or other errors occur
  }
);

export default axiosInstance;
