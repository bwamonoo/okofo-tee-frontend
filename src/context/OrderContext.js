import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { checkout, confirmOrder, getOrders } from '../services/api';
import { toast } from "../styles/toastStyles";

export const OrderContext = createContext();

const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const loadOrders = async () => {
      const storedOrders = await AsyncStorage.getItem('orders');
      // storedOrders ? setOrders(JSON.parse(storedOrders)) : handleGetOrders();
      storedOrders && setOrders(JSON.parse(storedOrders));
    };

    loadOrders();
  }, []);

  const saveOrders = async (updatedOrders) => {
    await AsyncStorage.setItem('orders', JSON.stringify(updatedOrders));
  };

  const clearOrders = async () => {
    await AsyncStorage.removeItem('orders'); // Remove cart from AsyncStorage
  }; 

  const handleGetOrders = async () => {
		const data = await getOrders();
    console.log("orders: ", data);
		setOrders(data);
		saveOrders(data);
  };

  // const handleOrders = (orders) => {
  //   setOrders(orders)
  // };

  	const handleCheckout = async () => {
      const response = await checkout();
      console.log("checkoutData: ", response.data);

      response.success ? toast.success(response.message) : toast.error(response.message);
      response.success && handleGetOrders();
      return response;
    };

  // const handleAddToOrders = (item) => {
  //   const updatedOrders = [...orders, ...item];
  //   setOrders(updatedOrders);

  //   AsyncStorage.setItem('orders', JSON.stringify(updatedOrders));
  // };

  const handleConfrimOrder = async (reference) => {
    const response = await confirmOrder(reference);

    response.success ? toast.success(response.message) : toast.error(response.message);
    response.success && handleGetOrders();
    return response;
  };


  return (
    <OrderContext.Provider value={{ orders, handleCheckout, handleConfrimOrder, handleGetOrders }}>
      {children}
    </OrderContext.Provider>
  );
};

export default OrderProvider;
