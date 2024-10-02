import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useEffect, useState } from 'react';

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const loadCart = async () => {
      const storedCart = await AsyncStorage.getItem('cart');
      storedCart && handleGetCart(JSON.parse(storedCart));
    };

    loadCart();
  }, []);

  // const handleGetCart = async () => {
  //   try {
  //     const response = await getCart();
  //     setCart(response.data.data.cartItems);
  //     handlePrice(response.data.data.cartItems);
  //     console.log('sercsrtTotalCartNo::', response.data.data);
  //     setCartTotal(response.data.data.cartTotal);
  //   } catch (error) {
  //     console.error('Error fetching cart items:', error);
  //   }
  // };

  const handleGetCart = (cart) => {
    setCart(cart);
    handlePrice(cart);
  };

  // const handleAddToCart = async (product) => {
  //   try {
  //     await addToCart(product.product_id, 1);
  //     handleGetCart();
  //     toast.success('Item added to cart!');
  //   } catch (error) {
  //     toast.error('Error adding item to cart');
  //     console.error('Error adding item to cart:', error);
  //   }
  // };

  const handleAddToCart = (item) => {
    const existingItemIndex = cart.findIndex(cartItem => cartItem.id === item.id); // Assuming 'id' is a unique identifier
  
    if (existingItemIndex !== -1) return; // Prevent adding if the item is already in the cart
  
    // Add item with quantity
    const updatedCart = [...cart, { ...item, quantity: 1 }]; 
  
    setCart(updatedCart); // Update state
  
    // Save the updated cart
    AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
    handlePrice(updatedCart);
  };
  

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

  const handleRemoveFromCart = (id) => {
    const updatedCart = cart.filter(cartItem => cartItem.id !== id);

    setCart(updatedCart);
    handlePrice(updatedCart);

    const saveCart = async () => {
      await AsyncStorage.setItem('cart', JSON.stringify(cart));
    };

    saveCart();
  };

  const handleClearCart = () => {
    const clearCart = async () => {
      setCart([]);
      await AsyncStorage.removeItem('cart'); // Remove cart from AsyncStorage
    };

    clearCart();
  }

  // const handleUpdateCartQuantity = async (productId, quantity) => {
  //   try {
  //     await updateCartQuantity(productId, quantity);
  //     handleGetCart();
  //   } catch (error) {
  //     toast.error(`Error updating cart quantity: ${error.response.data.messages}`);
  //     console.error(`Errrror updating cart quantity: ${error.response.data.messages}`, error);
  //   }
  // };

  const handleUpdateCartQuantity = (id, quantity = 1) => {
    const updatedCart = cart.map(cartItem => 
      cartItem.id === id ? { ...cartItem, quantity: Math.max(cartItem.quantity + quantity, 1) } : cartItem
    );
    
    setCart(updatedCart);
    handlePrice(updatedCart);

    const saveCart = async () => {
      await AsyncStorage.setItem('cart', JSON.stringify(cart));
    };

    saveCart();
  };

  function handlePrice (cart) {
    let initial = 0;

    cart.forEach((cartItem) => { 
      initial += cartItem.quantity * cartItem.price;
    });

    setSubTotal(formatCurrency(initial));
    setTotalPrice(formatCurrency(initial + 20));
  };

  function formatCurrency(price) {
	  return (price.toFixed(2));
  }
  
  


  return (
    <CartContext.Provider value={{
      cart, handleAddToCart, handleRemoveFromCart, handleClearCart, handleUpdateCartQuantity, subTotal, totalPrice
    }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
