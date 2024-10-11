import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { forgotPassword, getUser, loginUser, register, resetPassword, sendVerificationToken, updateUser, updateUserPassword, verifyEmail, } from '../services/api';
import { toast } from "../styles/toastStyles";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const loadUser = async () => {
      const storedUser = await AsyncStorage.getItem('user');
      // storedUser ? setUser(JSON.parse(storedUser)) : handleGetUser();
      storedUser && setUser(JSON.parse(storedUser));
    };

    loadUser();
  }, []);

  const saveUser = async (updatedUser) => {
    await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const handleGetUser = async () => {
		const data = await getUser();

    const view = {
      name: data.name,
      email: data.email,
      address: {
        residential: data.address,
        phoneNumber: data.phoneNumber,
      },
      paymentMethod: {
        type: data.paymentMethod,
        provider: data.networkProvider,
      },
      deliveryMethod: data.deliveryMethod,
    };

		setUser(view);
		saveUser(view);
  };

  const handleUpdateUser = async (formData) => {
    const response = await updateUser(formData);

    response.success ? toast.success(response.message) : toast.error(response.message);
    response.success && handleGetUser();
  };

  const handleUpdatePassword = async (formData) => {
    const response = await updateUserPassword(formData);

    response.success ? toast.success(response.message) : toast.error(response.message);
    // response.success && handleGetUser();
  };

  // const updateUser = (data) => {
  //   setUser(data);
  // };

  const handleRegister = async (formData) => {
    const response = await register(formData);

    response.success ? toast.success(response.message) : toast.error(response.message);
    // response.success && handleGetUser;
    return response;
  };

  const handleForgotPassword = async (email) => {
    const response = await forgotPassword(email);

    response.success ? toast.success(response.message) : toast.error(response.message);
    // response.success && handleGetUser;
    return response;
  };

  const handleResetPassword = async (formData) => {
    const response = await resetPassword(formData);

    response.success ? toast.success(response.message) : toast.error(response.message);
    // response.success && handleGetUser;
    return response;
  };

  const handleSendVerificationToken = async () => {
    const response = await sendVerificationToken();

    response.success ? toast.success(response.message) : toast.error(response.message);
    // response.success && handleGetUser;
  };

  const handleVerifyEmail = async (token) => {
    const response = await verifyEmail(token);

    response.success ? toast.success(response.message) : toast.error(response.message);
    // response.success && handleGetUser;
    return response;
  };

  const handleLoginUser = async (formData) => {
    const response = await loginUser(formData);

    response.success ? toast.success(response.message) : toast.error(response.message);

    response.success && handleGetUser();
    return response;
  };

  const handleLogoutUser = async () => {
    const response = await logoutUser();

    response.success ? toast.success(response.message) : toast.error(response.message);
    //response.success && handleGetUser;
  };


  
  

  return (
    <UserContext.Provider value={{ user, handleGetUser, handleUpdateUser, handleUpdatePassword, handleForgotPassword, handleResetPassword, handleRegister, handleSendVerificationToken, handleVerifyEmail,
      handleLoginUser, handleUpdateUser, handleLogoutUser
     }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
