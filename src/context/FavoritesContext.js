import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const FavoritesContext = createContext();

const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const loadFavorites = async () => {
      const storedFavorites = await AsyncStorage.getItem('favorites');
      storedFavorites && handleFavorites(JSON.parse(storedFavorites));
    };

    loadFavorites();
  }, []);

  const handleFavorites = (favorites) => {
    setFavorites(favorites)
  };

  const handleAddToFavorites = (item) => {
    const updatedFavorites = [...favorites, item];
    setFavorites(updatedFavorites);

    AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const handleRemoveFromFavorites = (id) => {
    const updatedFavorites = favorites.filter(favorite => favorite.id !== id);

    setFavorites(updatedFavorites);

    const saveFavorites = async () => {
      await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
    };

    saveFavorites();
  };

  const handleClearFavorites = () => {
    const clearFavorites = async () => {
      setCart([]);
      await AsyncStorage.removeItem('favorites'); // Remove cart from AsyncStorage
    };

    clearFavorites();
  }



  return (
    <FavoritesContext.Provider value={{ favorites, handleAddToFavorites, handleRemoveFromFavorites, handleClearFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesProvider;
