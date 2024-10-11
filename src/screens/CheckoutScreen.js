import React, { useContext } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from '../components/CustomHeader';
import { CartContext } from '../context/CartContext';
import { UserContext } from '../context/UserContext';
import { OrderContext } from '../context/OrderContext';

function shortenString(str) {
  if (str.length > 15) {
    return str.slice(0, 13) + '...';
  }
  return str;
}

const CheckoutScreen = ({ navigation }) => {
  const { cart, subTotal, totalPrice } = useContext(CartContext);
  const { handleCheckout } = useContext(OrderContext);
  const { user } = useContext(UserContext);

  const submit = async () => {
    const response = await handleCheckout();
    response.success && navigation.navigate("Payment", { url: response.data.authorization_url });
    console.log("checkoutData::: ", response.data);
  }

  // Get screen width
  const screenWidth = Dimensions.get('window').width;
  
  // Calculate item size to ensure 3 items per row, including margin
  const itemSize = (screenWidth - 65) / 3; // Subtract 40 for padding/margins, and divide by 3 for 3 columns

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CustomHeader title="stack" navigation={navigation} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>

        {/* Order Summary Card */}
        <View style={styles.card}>
          <Text style={styles.title}>ORDER SUMMARY</Text>
					<View style={styles.divider} />
          <View style={styles.infoRow}>
            <Text>Items ({cart.length})</Text>
            <Text>GH₵ {subTotal}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text>Delivery Fee</Text>
            <Text>GH₵ 20.00</Text>
          </View>
          <View style={styles.infoRow}>
					<Text style={styles.total}>Total</Text>
					<Text style={styles.total}>GH₵ {totalPrice}</Text>
          </View>
        </View>

        {/* Customer Address Card */}
        <View style={styles.card}>
          <Text style={styles.title}>CUSTOMER ADDRESS</Text>
					<View style={styles.divider} />
          <Text style={styles.addressRow}>
            {user.name} | {user.address.residential} | {user.address.phoneNumber}
          </Text>
        </View>

        {/* Delivery Detail Card */}
        <View style={styles.card}>
          <Text style={styles.title}>DELIVERY DETAILS</Text>
					<View style={styles.divider} />
          <View style={styles.deliveryRow}>
            <Text style={styles.deliveryText}>Delivery Date: 25th Sep, 2024 | Door Delivery</Text>
          </View>
          <FlatList
            style={styles.flatlist}
            data={cart}
            keyExtractor={(item) => item.id.toString()}
            numColumns={3}
            renderItem={({ item }) => (
              <TouchableOpacity style={[styles.orderItem, { width: itemSize, height: itemSize }]} onPress={() => navigation.navigate('FoodDetail', { foodItem: item })}>
                <Image source={{ uri: item.imageUrl }} style={styles.orderItemImage} resizeMode={item.shape === "circle" ? "cover" : "contain"} />
                <Text style={styles.orderItemText}>{shortenString(item.name)}</Text>
                <Text style={styles.orderItemText}>Price: GH₵ {item.price}</Text>
              </TouchableOpacity>
            )}
            showsVerticalScrollIndicator={false}
						scrollEnabled={false}  // Disable FlatList scrolling to allow ScrollView control
          />

          <TouchableOpacity style={styles.modifyCartButton} onPress={() => navigation.navigate('Cart')}>
            <Text style={styles.modifyCartButtonText}>Modify Cart</Text>
          </TouchableOpacity>
        </View>

        {/* Payment Method Card */}
        <View style={styles.card}>
          <View style={styles.paymentMethodHeader}>
            <Text style={styles.title}>PAYMENT METHOD</Text>
            <TouchableOpacity onPress={() => navigation.navigate('PaymentAndDelivery')}>
              <Text style={styles.changeMethodText}>Change Method</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.divider} />
          <Text style={styles.paymentMethodText}>{user.paymentMethod.type === "Card" ? "Card" : `${user.paymentMethod.type}: ${user.paymentMethod.provider}`}</Text>
        </View>

      </ScrollView>
				<TouchableOpacity
          style={styles.confirmOrderButton}
          onPress={() => submit()}
        >
					<Text style={styles.confirmOrderButtonText}>Confirm Order</Text>
				</TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 15,
    backgroundColor: '#E8E8E8',
  },
  card: {
    backgroundColor: '#F8F8F8',
    padding: 12,
    marginBottom: 15,
    borderRadius: 8,
    elevation: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
	total: {
    color: '#C72C24',
    fontWeight: 'bold',
  },
  addressRow: {
    fontSize: 13,
    color: '#4D4D4D',
  },
	deliveryRow: {
    marginBottom: 10,
  },
  flatlist: {
  },
  deliveryText: {
    fontSize: 13,
    color: '#4D4D4D',
  },
  orderItem: {
		alignItems: "center",
    backgroundColor: '#FFFFFF',
		paddingTop: 5,
    paddingBottom: 15,
		paddingHorizontal: 10,
    margin: 2,
    borderRadius: 10,
		borderWidth: .5,
		borderColor: "#D3D3D3",
    overflow: 'hidden',
  },
  orderItemImage: {
    width: "90%",
    height: "80%",
  },
  orderItemText: {
    fontSize: 9,
		fontWeight: "500"
  },
  modifyCartButton: {
		backgroundColor: "#FAFAFA",
    padding: 7,
    marginTop: 15,
		// marginHorizontal: 90,
    borderRadius: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FA4A0C',
  },
  modifyCartButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FA4A0C',
  },
  paymentMethodHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  changeMethodText: {
    fontSize: 14,
    color: '#FA4A0C',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E5E5',
    marginVertical: 10,
  },
  paymentMethodText: {
    fontSize: 15,
  },
	confirmOrderButton: {
    backgroundColor: '#FA4A0C',
    padding: 11,
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 17,
    alignItems: 'center',
  },
	confirmOrderButtonText: {
    fontSize: 16,
		fontWeight: "bold",
    color: '#FFF',
  },
});

export default CheckoutScreen;
