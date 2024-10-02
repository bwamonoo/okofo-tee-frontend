import React, { useContext } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from '../components/CustomHeader';
import { CartContext } from '../context/CartContext';

function shortenString(str) {
  if (str.length > 15) {
    return str.slice(0, 13) + '...';
  }
  return str;
}

const CheckoutScreen = ({ navigation }) => {
  const { cart, subTotal, totalPrice } = useContext(CartContext);

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
            <Text>GHC{subTotal}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text>Delivery Fee</Text>
            <Text>GHC 20.00</Text>
          </View>
          <View style={styles.infoRow}>
					<Text style={styles.total}>Total</Text>
					<Text style={styles.total}>{totalPrice}</Text>
          </View>
        </View>

        {/* Customer Address Card */}
        <View style={styles.card}>
          <Text style={styles.title}>CUSTOMER ADDRESS</Text>
					<View style={styles.divider} />
          <Text style={styles.addressRow}>
            John Doe | 1234 Main St, City, Country | +1234567890
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
            data={cart}
            keyExtractor={(item) => item.id.toString()}
            numColumns={3}
            renderItem={({ item }) => (
              <View style={styles.orderItem}>
                <Image source={item.image} style={styles.orderItemImage} resizeMode={item.type === "circle" ? "cover" : "contain"} />
                <Text style={styles.orderItemText}>{shortenString(item.name)}</Text>
                <Text style={styles.orderItemText}>Price: ₵{item.price}</Text>
              </View>
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
            <TouchableOpacity onPress={() => navigation.navigate('PaymentMethod')}>
              <Text style={styles.changeMethodText}>Change Method</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.divider} />
          <Text style={styles.paymentMethodText}>Mobile Money: MTN</Text>
        </View>

      </ScrollView>
				<TouchableOpacity style={styles.confirmOrderButton} >
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
  deliveryText: {
    fontSize: 13,
    color: '#4D4D4D',
  },
  orderItem: {
		alignItems: "center",
		width: '32%',
		height: 100,
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
    fontSize: 10,
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
