// api.js
import { createAxiosInstance } from '../config/axiosConfig'; 
import { storeUserSession, clearUserSession, refreshAccessToken } from '../config/userToken';

// Check if frontend can connect to backend
export const healthCheck = async () => {
  return await axiosInstance.get('/api/healthcheck/')
};


// handle authentication and users
export const register = async (userData) => {
  try {
    const axiosInstance = await createAxiosInstance();
    const response = await axiosInstance.post('/api/auth/register', userData);
    
    const data = response.data;
    return { success: true, message: data.messages };
  } catch (error) {
    console.error("Error registering: ", error.response?.data?.message || error.message);
    
    return { success: false, message: error.response?.data?.message || error.message };
  }
};

export const sendVerificationToken = async () => {
  try {
    const axiosInstance = await createAxiosInstance();
    const response = await axiosInstance.get(`/api/auth/send-verification-token/`)
    
    const data = response.data;
    return { success: true, message: data.messages };
  } catch (error) {
    console.error("Error verifying email: ", error.response?.data?.message || error.message);
    
    return { success: false, message: error.response?.data?.message || error.message };
  }
};

export const verifyEmail = async (token) => {
  try {
    const axiosInstance = await createAxiosInstance();
    const response = await axiosInstance.post("api/auth/verify-token", { token });

    const data = response.data;
    return { success: true, message: data.messages };
  } catch (error) {
    console.error("Error confirming email: ", error.response?.data?.message || error.message);

    return { success: false, message: error.response?.data?.message || error.message };
  }
};

export const loginUser = async (formData) => {
  try {
    const axiosInstance = await createAxiosInstance();
    const response = await axiosInstance.post('/api/auth/login', formData);
    const data = response.data;
    const accessToken = data.data.accessToken;
    const refreshToken = data.data.refreshToken;

    await storeUserSession(accessToken, refreshToken);
    
    return { success: true, message: data.messages };
  } catch (error) {
    console.error("Error loging in: ", error.response?.data?.message || error.message);
    
    return { success: false, message: error.response?.data?.message || error.message };
  }
};

export const logoutUser = async () => {
  try {
    const axiosInstance = await createAxiosInstance();
    const response = await axiosInstance.get('/api/auth/logout');
    
    const data = response.data;
    return { success: true, message: data.messages };
  } catch (error) {
    console.error("Error loging out: ", error.response?.data?.message || error.message);
    
    return { success: false, message: error.response?.data?.message || error.message };
  }
};

export const getUser = async () => {
  try {
    const axiosInstance = await createAxiosInstance();
    const response = await axiosInstance.get('api/user/');
    const data = response.data;
    return data.data;
  } catch (error) {
    console.error("Error fetching user: ", error.response?.data?.message || error.message)
  }
};

export const updateUser = async (userData) => {
  try {
    const axiosInstance = await createAxiosInstance();
    const response = await axiosInstance.post('/api/user/update', userData);
    
    const data = response.data;
    return { success: true, message: data.messages };
  } catch (error) {
    console.error("Error updating user: ", error.response?.data?.message || error.message);
    
    return { success: false, message: error.response?.data?.messages|| error.message };
  }
};

export const requestPasswordReset = async (email) => {
  try {
    const axiosInstance = await createAxiosInstance();
    const response = await axiosInstance.post('/api/auth/password-reset-request', { email });
    
    const data = response.data;
    return { success: true, message: data.messages };
  } catch (error) {
    console.error("Error sending password reset token: ", error.response?.data?.message || error.message);
    
    return { success: false, message: error.response?.data?.message || error.message };
  }
};

export const resetPassword = async (token) => {
  try {
    const axiosInstance = await createAxiosInstance();
    const response = await axiosInstance.post("/api/auth/password-reset/", { token });
    
    const data = response.data;
    return { success: true, message: data.messages };
  } catch (error) {
    console.error("Error resetting password: ", error.response?.data?.message || error.message);
    
    return { success: false, message: error.response?.data?.message || error.message };
  }
};


// Handle menus
export const getMenus = async () => {
  try {
    const axiosInstance = await createAxiosInstance();
    const response = await axiosInstance.get('/api/menus/');
    const data = response.data;
    return data.data;
  } catch (error) {
    console.error("Error fetching menus: ", error.response?.data?.message || error.message)
  }

};

export const searchMenus = async (query) => {
  try {
    const axiosInstance = await createAxiosInstance();
    const response = await axiosInstance.get(`/api/menu/search?query=${query}`);
    const data = response.data;
    return data.data;
  } catch (error) {
    console.error("Error searching menu: ", error.response?.data?.message || error.message)
  }
};

// Manage menu (admins only)
export const addToMenu = async (catId, formData) => {
  try {
    const axiosInstance = await createAxiosInstance();
    const response = await axiosInstance.post(`/api/menu/create/${catId}`, formData);

    const data = response.data;
    return { success: true, message: data.messages };
  } catch (error) {
    console.error("Error creating menu: ", error.response?.data?.message || error.message);

    return { success: false, message: error.response?.data?.message || error.message };
  }
};

export const updateMenu = async (menuId, formData) => {
  try {
    const axiosInstance = await createAxiosInstance();
    const response = await axiosInstance.post(`/api/menu/update/${menuId}`, formData);

    const data = response.data;
    return { success: true, message: data.messages };
  } catch (error) {
    console.error("Error updating menu: ", error.response?.data?.message || error.message);

    return { success: false, message: error.response?.data?.message || error.message };
  }
};

export const removeFromMenus = async (menuId) => {
  try {
    const axiosInstance = await createAxiosInstance();
    const response = await axiosInstance.post(`/api/menu/delete/${menuId}`);

    const data = response.data;
    return { success: true, message: data.messages };
  } catch (error) {
    console.error("Error updating menu: ", error.response?.data?.message || error.message);

    return { success: false, message: error.response?.data?.message || error.message };
  }
};


// Manage favorites
export const addToFavorites = async (menuId) => {
  try {
    const axiosInstance = await createAxiosInstance();
    const response = await axiosInstance.post('/api/favorite/add', { menuId });

    const data = response.data;
    return { success: true, message: data.messages };
  } catch (error) {
    console.error("Error adding to favorites: ", error.response?.data?.message || error.message);

    return { success: false, message: error.response?.data?.message || error.message };
  }
};

export const getFavorites = async () => {
  try {
    const axiosInstance = await createAxiosInstance();
    const response = await axiosInstance.get('/api/favorite/');
    const data = response.data;
    return data.data;
  } catch (error) {
    console.error("Error searching menu: ", error.response?.data?.message || error.message)
  }
};

export const removeFromFavorites = async (menuId) => {
  try {
    const axiosInstance = await createAxiosInstance();
    const response = await axiosInstance.post('/api/favorite/delete', { menuId });

    const data = response.data;
    return { success: true, message: data.messages };
  } catch (error) {
    console.error("Error removing from favorites: ", error.response?.data?.message || error.message);

    return { success: false, message: error.response?.data?.message || error.message };
  }
};


// Manage cart
export const getCart = async () => {
  try {
    const axiosInstance = await createAxiosInstance();
    const response = await axiosInstance.get('/api/cart/');
    const data = response.data;
    return data.data;
  } catch (error) {
    console.error("Error fetching cart: ", error.response?.data?.message || error.message)
  }
};

export const addToCart = async (menuId, quantity) => {
  try {
    const axiosInstance = await createAxiosInstance();
    const response = await axiosInstance.post('/api/cart/add', { menuId, quantity });

    const data = response.data;
    return { success: true, message: data.messages };
  } catch (error) {
    console.error("Error adding to cart: ", error.response?.data?.message || error.message);

    return { success: false, message: error.response?.data?.message || error.message };
  }
};

export const removeFromCart = async (menuId) => {
  try {
    const axiosInstance = await createAxiosInstance();
    const response = await axiosInstance.post('/api/cart/delete', { menuId });

    const data = response.data;
    return { success: true, message: data.messages };
  } catch (error) {
    console.error("Error removing from cart: ", error.response?.data?.message || error.message);

    return { success: false, message: error.response?.data?.message || error.message };
  }
};
export const emptyCart = async (menuId) => {
  try {
    const axiosInstance = await createAxiosInstance();
    const response = await axiosInstance.get('/api/cart/empty');

    const data = response.data;
    return { success: true, message: data.messages };
  } catch (error) {
    console.error("Error emptying cart: ", error.response?.data?.message || error.message);

    return { success: false, message: error.response?.data?.message || error.message };
  }
};


// Mange orders
export const getOrders = async () => {
  try {
    const axiosInstance = await createAxiosInstance();
    const response = await axiosInstance.get('/api/order/');
    const data = response.data;
    return data.data;
  } catch (error) {
    console.error("Error fetching orders: ", error.response?.data?.message || error.message)
  }
};

export const checkout = async () => {
  try {
    const axiosInstance = await createAxiosInstance();
    const response = await axiosInstance.post('/api/order/checkout');
    const data = response.data;
    return data.data;
  } catch (error) {
    console.error("Error searching checking out: ", error.response?.data?.message || error.message)
  }
};

export const confirmOrder = async (reference) => {
  try {
    const axiosInstance = await createAxiosInstance();
    const response = await axiosInstance.post(`/api/order/${reference}`);

    const data = response.data;
    return { success: true, message: data.messages };
  } catch (error) {
    console.error("Error confirming order: ", error.response?.data?.message || error.message);

    return { success: false, message: error.response?.data?.message || error.message };
  }
};
