import React, { createContext, useState, useEffect, useContext } from 'react';
import { UserContext } from './UserContext';
import { ThemeContext } from './ThemeContext';
import { CartContext } from './CartContext';
import { OrderContext } from './OrderContext';
import { FavoritesContext } from './FavoritesContext';


export const UserDataContext = createContext();

const UserDataProvider = ({ children }) => {
  const { handleGetCart } = useContext(CartContext);
  const { handleGetOrders } = useContext(OrderContext);
  const { handleGetFavorites } = useContext(FavoritesContext);
  // const { handleGetUser } = useContext(UserContext);

  // useEffect(() => {

  // }, []);

	const fetchUserData = async () => {
		await handleGetCart();
		await handleGetOrders();
		await handleGetFavorites();
		// await handleGetUser();
	};



  return (
    <UserDataContext.Provider value={{ fetchUserData }}>
      {children}
    </UserDataContext.Provider>
  );
};

export default UserDataProvider;
