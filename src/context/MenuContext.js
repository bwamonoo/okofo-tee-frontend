import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addToMenu, getMenus, removeFromMenus, searchMenus, updateMenu } from '../services/api';
import { toast } from "../styles/toastStyles";

export const MenuContext = createContext();

const MenuProvider = ({ children }) => {
  const [menus, setMenus] = useState([]);
  const [searchedMenus, setSearchedMenus] = useState([]);

  useEffect(() => {
    const loadMenus = async () => {
      //await clearMenus();
      const storedMenus = await AsyncStorage.getItem('menus');
      storedMenus ? setMenus(JSON.parse(storedMenus)) : handleGetMenus();
      console.log(menus);
    };

    loadMenus();
  }, []);

	const saveMenus = async (updatedMenus) => {
    await AsyncStorage.setItem('menus', JSON.stringify(updatedMenus));
  };

  async function clearMenus() {
    await AsyncStorage.removeItem('menus'); // Remove cart from AsyncStorage
  }; 

  const handleGetMenus = async () => {
		const data = await getMenus();
		setMenus(data);
		saveMenus(data);
  };

  const handlSearchMenus = async (query) => {
		const response = await searchMenus(query);
		setSearchedMenus(response.data);
  };

	const handleAddToMenus = async (catId, formData) => {
    const response = await addToMenu(catId, formData);

    response.success ? toast.success(response.message) : toast.error(response.message);
    response.success && handleGetMenus;
  };

	const handleUpdateMenus = async (menuId, formData) => {
    const response = await updateMenu(menuId, formData);

    response.success ? toast.success(response.message) : toast.error(response.message);
    response.success && handleGetMenus;
  };

	const handleRemoveFromMenus = async (menuId) => {
    const response = await removeFromMenus(menuId)

    response.success ? toast.success(response.message) : toast.error(response.message);
    response.success && handleGetMenus;
  };

  return (
    <MenuContext.Provider value={{ menus, searchedMenus, handleGetMenus, handlSearchMenus, handleAddToMenus, handleUpdateMenus, handleRemoveFromMenus }}>
      {children}
    </MenuContext.Provider>
  );
};

export default MenuProvider;
