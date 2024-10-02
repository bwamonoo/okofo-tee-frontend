import React, { useContext, useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from '../components/CustomHeader';
import { CartContext } from '../context/CartContext';

import CartItem from '../components/CartItem';

const CartScreen = ({ navigation }) => {
  const { cart, handleClearCart, subTotal, totalPrice } = useContext(CartContext);

  const renderEmptyCart = () => (
    <View style={styles.emptyCartContainer}>
      <Image source={require('../assets/images/empty-cart.png')} style={styles.emptyCartImage} />
      <View style={styles.emptyCartTextContainer}>
        <Text style={styles.emptyCartTextTitle}>No items in cart yet</Text>
        <Text style={styles.emptyCartText}>Items added to cart will appear here. Go add something to cart and come back again.</Text>
      </View>
    </View>
  );

  const renderFooter = () => (
    <TouchableOpacity style={styles.clearCartButton} onPress={() => handleClearCart()}>
      <Text style={styles.clearCartButtonText}>Empty Cart</Text>
    </TouchableOpacity>
  );

  const renderCartItems = () => (
    <>
      <View style={styles.upperDiv}>
        <View style={styles.upperSection}>
          <Text style={{fontWeight: "bold"}}>CART SUMMARY</Text>
          <View style={styles.divider} />
        </View>

        <View style={styles.midSection}>
          <View style={styles.infoSection}>
            <Text>Items({cart.length})</Text>
            <Text>GHC {subTotal}</Text>
          </View>

          <View style={styles.infoSection}>
            <Text>Delivery Fee</Text>
            <Text>GHC 20.00</Text>
          </View>

          <View style={styles.infoSection}>
            <Text>Sub Total</Text>
            <Text>{subTotal}</Text>
          </View>
        </View>

        <View style={styles.lowerSection}>
          <View style={styles.infoSection}>
            <Text style={styles.total}>Total</Text>
            <Text style={styles.total}>{totalPrice}</Text>
          </View>

          <TouchableOpacity style={styles.checkoutButton} onPress={() => navigation.navigate('Checkout')}>
            <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.lowerDiv}>
        <FlatList
          // contentContainerStyle={}
          data={cart}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <CartItem item={item} navigation={navigation}/>
          )}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={renderFooter}
        />
      </View>
    </>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CustomHeader title="stack" navigation={navigation} />
      <View style={styles.container}>
        {cart.length === 0 ? renderEmptyCart() : renderCartItems()}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 13,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyCartImage: {
    width: 130,
    height: 125,
    marginBottom: 20,
  },
  emptyCartTextContainer: {
    alignItems: 'center',
  },
  emptyCartTextTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4D4D4D',
    lineHeight: 45,
  },
  emptyCartText: {
    fontSize: 15,
    color: '#B1B1B3',
  },
  upperDiv: {
    flex: 1,
    backgroundColor: '#F5F3F3',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 12,
    borderWidth: 0.3,
    borderColor: 'gray',
    borderRadius: 5,
  },
  divider: {
    height: 1,
    backgroundColor: '#C0C0C0',
    marginVertical: 10,
  },
  midSection: {

  },
  infoSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  lowerSection: {},
  total: {
    color: '#C72C24',
    fontWeight: 'bold',
  },
  lowerDiv: {
    flex: 3,
    backgroundColor: '#F5F3F3',
    marginVertical: 10,
    paddingVertical: 1,
    paddingHorizontal: 10,
    borderWidth: 0.3,
    borderRadius: 5,
    borderColor: 'gray',
  },
  checkoutButton: {
    backgroundColor: '#FA4A0C',
    padding: 8,
    marginTop: 15,
    borderRadius: 15,
    alignItems: 'center',
  },
  checkoutButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: '#FFF',
  },
  clearCartButton: {
    backgroundColor: "#FAFAFA",
    borderRadius: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#FA4A0C',
    alignItems: 'center',
    marginVertical: 25,
  },
  clearCartButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FA4A0C',
  },
});

export default CartScreen;
