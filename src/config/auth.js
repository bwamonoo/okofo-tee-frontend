import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

export const getAccessToken = async () => {
  return await SecureStore.getItemAsync('accessToken');
};

export const storeUserSession = async (accessToken, refreshToken) => {
  try {
    await SecureStore.setItemAsync('accessToken', accessToken);
    console.log("refToken: ", refreshToken);
    await SecureStore.setItemAsync('refreshToken', refreshToken);
  } catch (error) {
    console.error("Error storing tokens", error);
  }
};

export const clearUserSession = async () => {
  try {
    await SecureStore.deleteItemAsync('accessToken');
    await SecureStore.deleteItemAsync('refreshToken');
  } catch (error) {
    console.error("Error clearing session", error);
  }
};

// Function to refresh tokens
export const refreshAccessToken = async () => {
  const refreshToken = await SecureStore.getItemAsync('refreshToken');
  
  if (refreshToken) {
    try {
      const response = await axios.post('http://192.168.38.188:8000/api/refresh', { refreshToken });
      const newAccessToken = response.data.accessToken;
      const newRefreshToken = response.data.refreshToken;
      
      // Store the new tokens securely
      await SecureStore.setItemAsync('accessToken', newAccessToken);
      await SecureStore.setItemAsync('refreshToken', newRefreshToken);
      
      return newAccessToken;
    } catch (error) {
      console.error("Token refresh failed: ", error.response?.data?.messages || error.message);
      // Handle logout or prompt user to re-login
      return null;
    }
  }
};
