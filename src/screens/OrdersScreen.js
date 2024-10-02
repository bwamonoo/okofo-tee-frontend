import React, { useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from '../components/CustomHeader';

const OrdersScreen = ({ navigation }) => {
  const [orderList, setOrderList] = useState([]); // Example cart items state (empty)

  const renderEmptyOrderHistory = () => (
    <View style={styles.emptyCartContainer}>
      <Image source={require('../assets/images/empty-orders.png')} resizeMode="contain" style={styles.emptyCartImage} />
      <View style={styles.emptyCartTextContainer}>
        <Text style={styles.emptyCartTextTitle}>No orders yet</Text>
        <Text style={styles.emptyCartText}>This page displays your order history. Add items to cart, proceed to checkout, place your order and come back again.</Text>
      </View>
    </View>
  );

  const renderOrderHistory = () => (
    <>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Image source={{ uri: item.image }} style={styles.cartItemImage} />

            <Text style={styles.cartItemText}>{item.name}</Text>
            <Text style={styles.cartItemPrice}>${item.price}</Text>
          </View>
        )}
      />
      <TouchableOpacity style={styles.checkoutButton} onPress={() => navigation.navigate('Checkout')}>
        <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
      </TouchableOpacity>
    </>
  );

  return (
    <SafeAreaView style={{ flex: 1 }} >
      <CustomHeader title="stack" navigation={navigation} />
      <View style={styles.container}>
        {orderList.length === 0 ? renderEmptyOrderHistory() : renderOrderHistory()}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    // backgroundColor: '#F5F5F5',
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyCartImage: {
    width: 100,
    height: 170,
  },
  emptyCartTextContainer: {
    alignItems: 'center',
    // backgroundColor: "lightblue",
  },
  emptyCartTextTitle: {
    fontSize: 24,
    fontFamily: 'Actor-Regular',
    fontWeight: 'bold',
    color: '#4D4D4D',
    lineHeight: 45,
  },
  emptyCartText: {
    fontSize: 15,
    fontFamily: 'Actor-Regular',
    color: '#B1B1B3',
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    elevation: 3,
  },
  cartItemImage: {
    width: 60,
    height: 60,
    marginRight: 15,
  },
  cartItemText: {
    fontSize: 16,
    flex: 1,
  },
  cartItemPrice: {
    fontSize: 16,
    color: '#FA4A0C',
  },
  checkoutButton: {
    backgroundColor: '#FA4A0C',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 20,
  },
  checkoutButtonText: {
    fontSize: 18,
    color: '#FFF',
  },
});

export default OrdersScreen;
