import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useEffect, useState } from 'react';
import { addToCart, emptyCart, getCart, removeFromCart } from '../services/api';
import { toast } from "../styles/toastStyles";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartQuantity, setCartQuantity] = useState(0);

  useEffect(() => {
    const loadCart = async () => {
      const storedCart = await AsyncStorage.getItem('cart');
      // storedCart ? setCart(JSON.parse(storedCart)) : handleGetCart();
      storedCart && handleStoredCart(JSON.parse(storedCart));
      console.log("cart", cart);
    };

    loadCart();
  }, []);

  function handleStoredCart(cart) {
    setCart(cart);
    handlePrice(cart);
    getCartQuantity();
  };

  const saveCart = async (updatedCart) => {
    await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const clearCart = async () => {
    await AsyncStorage.removeItem('cart'); // Remove cart from AsyncStorage
  }; 

  const saveCartQuantity = async (cartQuantity) => {
    await AsyncStorage.setItem("cartQuantity", cartQuantity.toString())
  };

  const getCartQuantity = async () => {
     const quantity =  await AsyncStorage.getItem("cartQuantity");
     setCartQuantity( parseInt(quantity, 10) );
  };

  const handleGetCart = async () => {
    const data = await getCart();
    setCart(data.cartItems);
    handlePrice(data.cartItems);
    saveCart(data.cartItems);

    setCartQuantity(data.cartQuantity);
    saveCartQuantity(data.cartQuantity);
  };

  const handleAddToCart = async (menu, quantity = 1) => {
    const response = await addToCart(menu.id, quantity)

    response.success ? toast.success(`${menu.name} has been added to cart.`, response.message) : toast.error(response.message);
    response.success && handleGetCart();
  };

  const handleUpdateCartQuantity = async (menuId, quantity = 1) => {
    const response = await addToCart(menuId, quantity)
    response.success && handleGetCart();
  };

  // const handleAddToCart = (item) => {
  //   const existingItemIndex = cart.findIndex(cartItem => cartItem.id === item.id); // Assuming 'id' is a unique identifier
  
  //   if (existingItemIndex !== -1) return; // Prevent adding if the item is already in the cart
  
  //   // Add item with quantity
  //   const updatedCart = [...cart, { ...item, quantity: 1 }]; 
  
  //   setCart(updatedCart); // Update state
  
  //   // Save the updated cart
  //   AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
  //   handlePrice(updatedCart);
  // };
  

  // const handleRemoveFromCart = async (productId) => {
  //   try {
  //     await removeFromCart(productId);
  //     handleGetCart();
  //     toast.success('Item removed from cart!');
  //   } catch (error) {
  //     toast.error('Error removing item from cart');
  //     console.error('Error removing item from cart:', error);
  //   }
  // };

  const handleRemoveFromCart = async (menu) => {
    const response = await removeFromCart(menu.id)
    response.success ? toast.success(`${menu.name} has been removed from cart.`, response.message) : toast.error(response.message);
    response.success && handleGetCart();
  };

  // const handleRemoveFromCart = (id) => {
  //   const updatedCart = cart.filter(cartItem => cartItem.id !== id);

  //   setCart(updatedCart);
  //   handlePrice(updatedCart);

  //   const saveCart = async () => {
  //     await AsyncStorage.setItem('cart', JSON.stringify(cart));
  //   };

  //   saveCart();
  // };

  const handleClearCart = async () => {
    const response = await emptyCart()
    await clearCart();

    response.success ? toast.success(response.message) : toast.error(response.message);
    response.success && handleGetCart();
  };

  // const handleClearCart = () => {
  //   setCart([]);
  //   const clearCart = async () => {
  //     await AsyncStorage.removeItem('cart'); // Remove cart from AsyncStorage
  //   };

  //   clearCart();
  // }

  // const handleUpdateCartQuantity = (id, quantity = 1) => {
  //   const updatedCart = cart.map(cartItem => 
  //     cartItem.id === id ? { ...cartItem, quantity: Math.max(cartItem.quantity + quantity, 1) } : cartItem
  //   );
    
  //   setCart(updatedCart);
  //   handlePrice(updatedCart);

  //   const saveCart = async () => {
  //     await AsyncStorage.setItem('cart', JSON.stringify(cart));
  //   };

  //   saveCart();
  // };

  function handlePrice (cart) {
    let initial = 0;

    if (cart.length !== 0) {
      cart.forEach((cartItem) => { 
        initial += cartItem.quantity * cartItem.price;
      });

      setSubTotal(formatCurrency(initial));
      setTotalPrice(formatCurrency(initial + 20));

     } else {
      setSubTotal(formatCurrency(initial));
      setTotalPrice(formatCurrency(initial));
     };
  };

  function formatCurrency(price) {
	  return (price.toFixed(2));
  }
  
  


  return (
    <CartContext.Provider value={{
      cart, cartQuantity, handleGetCart, handleAddToCart, handleUpdateCartQuantity, handleRemoveFromCart, handleClearCart, subTotal, totalPrice
    }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
