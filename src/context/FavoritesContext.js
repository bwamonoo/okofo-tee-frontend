import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addToFavorites, getFavorites, removeFromFavorites } from '../services/api';
import { toast } from "../styles/toastStyles";

export const FavoritesContext = createContext();

const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const loadFavorites = async () => {
      const storedFavorites = await AsyncStorage.getItem('favorites');
      // storedFavorites ? setFavorites(JSON.parse(storedFavorites)) : handleGetFavorites();
      storedFavorites && setFavorites(JSON.parse(storedFavorites));
    };

    loadFavorites();
  }, []);

  const saveFavorites = async (updatedMenus) => {
    await AsyncStorage.setItem('favorites', JSON.stringify(updatedMenus));
  };

  const clearFavorites = async () => {
    await AsyncStorage.removeItem('favorites'); // Remove cart from AsyncStorage
  }; 

  const handleGetFavorites = async () => {
		const data = await getFavorites();
		setFavorites(data);
		saveFavorites(data);
  };

  // const handleFavorites = (favorites) => {
  //   setFavorites(favorites)
  // };

  const handleAddToFavorites = async (menu) => {
    const response = await addToFavorites(menu.id);

    response.success ? toast.success(`${menu.name} has been added to favorites.`, response.message) : toast.error(response.message);
    response.success && handleGetFavorites();
  };

  // const handleAddToFavorites = (item) => {
  //   const updatedFavorites = [...favorites, item];
  //   setFavorites(updatedFavorites);

  //   const saveFavorites = async () => {
  //     await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  //   };

  //   saveFavorites();
  // };

  const handleRemoveFromFavorites = async (menu) => {
    const response = await removeFromFavorites(menu.id);

    response.success ? toast.success(`${menu.name} has been removed from favorites.`, response.message) : toast.error(response.message);
    response.success && handleGetFavorites();
  };

  // const handleRemoveFromFavorites = (id) => {
  //   const updatedFavorites = favorites.filter(favorite => favorite.id !== id);

  //   setFavorites(updatedFavorites);

  //   const saveFavorites = async () => {
  //     await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  //   };

  //   saveFavorites();
  // };

  const handleClearFavorites = async () => {
    const response = await emptyFavorites()
    clearFavorites();

    response.success ? toast.success(response.message) : toast.error(response.message);
    response.success && handleGetCart;
  };

  // const handleClearFavorites = () => {
  //   const clearFavorites = async () => {
  //     setCart([]);
  //     await AsyncStorage.removeItem('favorites'); // Remove cart from AsyncStorage
  //   };

  //   clearFavorites();
  // }


  return (
    <FavoritesContext.Provider value={{ favorites, handleGetFavorites, handleAddToFavorites, handleRemoveFromFavorites, handleClearFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesProvider;
