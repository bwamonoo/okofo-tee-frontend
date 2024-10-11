import React, { useState, useContext, useEffect } from 'react';
import { SafeAreaView, ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import { OrderContext } from '../context/OrderContext';
import { CartContext } from '../context/CartContext';
import { toast } from "../styles/toastStyles";

const PaymentScreen = ({ navigation, route }) => {
	const { handleConfrimOrder } = useContext(OrderContext);
	const { handleGetCart } = useContext(CartContext);
  const [paymentUrl, setPaymentUrl] = useState(null);
	const { url } = route.params;

	const insets = useSafeAreaInsets();

	useEffect(() => {
		setPaymentUrl(url);
  }, []);

	const verifyPayment = async (reference) => {
		const response = await handleConfrimOrder(reference);
		response.success && await handleGetCart();
		response.success && navigation.navigate("Orders");
	};


  return (
    <SafeAreaView style={[{ flex: 1, backgroundColor: "#F5F3F3" }, { paddingTop: insets.top }]}>
      {!paymentUrl ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <WebView
          source={{ uri: paymentUrl }}
          onNavigationStateChange={(event) => {
						const url = new URL(event.url);
						const status = url.searchParams.get('status');
						const reference = url.searchParams.get('reference');
						const trxref = url.searchParams.get('trxref');
						console.log("event.url :", event.url);
					
						if (status === 'success' || reference) {

							console.log('Payment successful');
							verifyPayment(reference);

						} else if (status === 'failed') {

							console.log('Payment failed');
							toast.error('Payment failed');
							navigation.navigate('Checkout');
							
            }
          }}
        />
      )}
    </SafeAreaView>
  );
};

export default PaymentScreen;
