import React, { useContext } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from '../components/CustomHeader';
import { OrderContext } from '../context/OrderContext';

const OrdersScreen = ({ navigation }) => {
  const { orders } = useContext(OrderContext);

  const renderEmptyOrderHistory = () => (
    <View style={styles.emptyOrdersContainer}>
      <Image source={require('../assets/images/empty-orders.png')} resizeMode="contain" style={styles.emptyOrdersImage} />
      <Text style={styles.emptyOrdersTitle}>No Orders Yet</Text>
      <Text style={styles.emptyOrdersText}>Place an order and come back here to see your order history.</Text>
    </View>
  );

  const renderOrderItems = ({ item }) => (
    <View style={styles.orderItem}>
      <View style={styles.orderItemImageContainer}>
        <Image source={{ uri: item.imageUrl}} style={styles.orderItemImage} resizeMode={item.shape === "circle" ? "cover": "contain"}/>
      </View>

      <View style={styles.orderItemDetails}>
        <Text style={styles.orderItemName}>{item.name}</Text>
        <Text style={styles.orderItemPrice}>GH₵ {item.price}</Text>
        <Text style={styles.orderItemQuantity}>Quantity: {item.OrderMenu.menuQuantity}</Text>
        <Text style={styles.orderItemDate}>{item.date}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <CustomHeader title="drawer" navigation={navigation} />
      <View style={styles.container}>
        {orders.length === 0 ? (
          renderEmptyOrderHistory()
        ) : (
          <FlatList
            data={orders}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderOrderItems}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#f0f0f0',
  },
  // Empty orders styles
  emptyOrdersContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyOrdersImage: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  emptyOrdersTitle: {
    fontSize: 26,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  emptyOrdersText: {
    fontSize: 16,
    color: '#7d7d7d',
    textAlign: 'center',
    paddingHorizontal: 40,
    lineHeight: 22,
  },
  // Order items styles
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 10,
    marginVertical: 8,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
		borderWidth: .7,
		borderColor: "#D3D3D3",
  },
  orderItemImageContainer: {
    backgroundColor: "#f0f0f0",
    width: 85,
    height: 85,
    borderRadius: 15,
    overflow: 'hidden',
  },
  orderItemImage: {
    width: '100%',
    height: '100%',
  },
  orderItemDetails: {
    flex: 1,
    paddingHorizontal: 15,
  },
  orderItemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A4A4A',
    marginTop: 5,
  },
  orderItemPrice: {
    fontFamily: "Bangers-Regular",
    fontSize: 16,
    color: '#FA4A0C',
  },
  orderItemQuantity: {
    fontSize: 14,
    fontWeight: "bold",
    color: '#4A4A4A',
  },
  orderItemDate: {
    fontSize: 14,
    color: '#999',
  },
});

export default OrdersScreen;
