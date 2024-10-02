import React, { createContext, useState } from 'react';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    address: {
      name: 'John Doe',
      residential: '123 Main St, Cityville',
      phone: '+1234567890',
    },
    paymentMethod: {
      type: 'Mobile Money',
      provider: 'MTN',
    },
    deliveryMethod: 'Door Delivery',
  });

  const handleUser = (name, value) => {
    setUser({...user, [name]: value});
  };

  return (
    <UserContext.Provider value={{ user, handleUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
