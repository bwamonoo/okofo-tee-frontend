import React, { createContext, useState } from 'react';

export const OrderContext = createContext();

const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  const addToOrders = (item) => {
    setOrders([...orders, item]);
  };

  return (
    <OrderContext.Provider value={{ orders, addToOrders }}>
      {children}
    </OrderContext.Provider>
  );
};

export default OrderProvider;
