import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { CartContext } from '../context/CartContext';
import { Ionicons } from '@expo/vector-icons'; // Import icon library

const CartItem = ({ item, navigation }) => {
  const { handleRemoveFromCart, handleUpdateCartQuantity} = useContext(CartContext);

  return (
  <View style={styles.cartItem} >
    <TouchableOpacity style={styles.cartItemImageContainer}  onPress={() => navigation.navigate('FoodDetail', { foodItem: item })}>
      <Image source={item.image} style={styles.cartItemImage} resizeMode={item.type === "circle" ? "cover": "contain"}/>
    </TouchableOpacity>

    <View style={styles.cartItemCenter}>
      <Text style={styles.cartItemText}>{item.name}</Text>
      <Text style={styles.cartItemPrice}>₵{item.price}</Text>
    </View>

    <View style={styles.cartItemRight}>
      {/* Delete Icon positioned at the top-right corner */}
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleRemoveFromCart(item.id)}>
        <Ionicons name="trash-outline" size={23} color="red" />
      </TouchableOpacity>

      {/* Quantity Control at the bottom-right corner */}
      <View style={styles.quantityContainer}>
        <TouchableOpacity onPress={() => handleUpdateCartQuantity(item.id, -1)}>
          <Ionicons name="remove-circle-outline" size={21} color="gray" />
        </TouchableOpacity>

        <Text style={styles.quantityText}>{item.quantity}</Text>

        <TouchableOpacity onPress={() => handleUpdateCartQuantity(item.id)}>
          <Ionicons name="add-circle-outline" size={21} color="gray" />
        </TouchableOpacity>
      </View>
    </View>
  </View>
  );
};

const styles = StyleSheet.create({
 cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 12,
    marginTop: 10,
    marginHorizontal: 2,
    borderRadius: 15,
    elevation: 3,
  },
  cartItemImageContainer: {
    backgroundColor: "#F5F5F5",
    width: 82,
    height: 82,
    borderRadius: 40,
    overflow: 'hidden',
    justifyContent: "center",
    alignItems: "center",
  },
  cartItemImage: {
    width: "100%",
    height: "80%",
  },
  cartItemCenter: {
    flex: 1,
    paddingHorizontal: 15,
  },
  cartItemText: {
    fontSize: 15,
  },
  cartItemPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FA4A0C',
  },
  cartItemRight: {
    position: 'relative',
  },
  deleteButton: {
    position: 'absolute',
    bottom: 10,
    right: 0,
  },
  quantityContainer: {
    position: 'absolute',
    top: 10,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityText: {
    marginHorizontal: 8,
    fontSize: 16,
  },
});

export default CartItem;
