import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { UserContext } from '../context/UserContext';
import { Ionicons } from '@expo/vector-icons';
import CustomHeader from '../components/CustomHeader';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const EditPaymentDeliveryScreen = ({ route, navigation }) => {
	const insets = useSafeAreaInsets();
  const { section } = route.params;
  const { user: userData } = useContext(UserContext);
  const [selectedPayment, setSelectedPayment] = useState(userData.paymentMethod);
  const [selectedDelivery, setSelectedDelivery] = useState(userData.deliveryMethod);
  const [showNetworkOptions, setShowNetworkOptions] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState('');

  const handleSave = () => {
    // Save payment and delivery methods
    navigation.goBack();
  };

  const networkProviders = ['MTN', 'Airteltigo', 'Telecel']; // Add more if needed

  return (
    <SafeAreaView style={[{ flex: 1, backgroundColor: "#F5F3F3" }, { paddingTop: insets.top }]}>
      <CustomHeader title="stack" navigation={navigation} />
			<View style={styles.container}>

				<View style={styles.sectionContainer}>
					<View style={styles.section}>
						<Text style={styles.title}>Payment Method</Text>
						<TouchableOpacity
							style={[styles.optionButton, selectedPayment === 'Mobile Money' && styles.selectedOption]}
							onPress={() => {
								setSelectedPayment('Mobile Money');
								setShowNetworkOptions(!showNetworkOptions);
							}}
						>
							<Ionicons
								name="phone-portrait-outline"
								size={20}
								color={selectedPayment === 'Mobile Money' ? '#FA4A0C' : '#888'}
							/>
							<Text style={[styles.optionText, selectedPayment === 'Mobile Money' && styles.selectedText]}>
								Mobile Money
							</Text>
						</TouchableOpacity>

						{showNetworkOptions && (
							<View style={styles.networkOptions}>
								{networkProviders.map((provider) => (
									<TouchableOpacity
										key={provider}
										style={styles.radioButton}
										onPress={() => setSelectedNetwork(provider)}
									>
										<View style={[styles.radioCircle, selectedNetwork === provider && styles.selectedCircle]}>
											{selectedNetwork === provider && <View style={styles.innerDot} />}
										</View>
										<Text style={[styles.optionText, selectedNetwork === provider && styles.selectedText]}>
											{provider}
										</Text>
									</TouchableOpacity>
								))}
							</View>
						)}

						<TouchableOpacity
							style={[styles.optionButton, selectedPayment === 'Card' && styles.selectedOption]}
							onPress={() => {
								setSelectedPayment('Card');
								setShowNetworkOptions(false); // Hide network options if switching to Card
							}}
						>
							<Ionicons
								name="card-outline"
								size={20}
								color={selectedPayment === 'Card' ? '#FA4A0C' : '#888'}
							/>
							<Text style={[styles.optionText, selectedPayment === 'Card' && styles.selectedText]}>
								Card
							</Text>
						</TouchableOpacity>
					</View>

					<View style={styles.section}>
					<Text style={styles.title}>Delivery Method</Text>
					<TouchableOpacity
						style={[styles.optionButton, selectedDelivery === 'Door Delivery' && styles.selectedOption]}
						onPress={() => setSelectedDelivery('Door Delivery')}
					>
						<Ionicons
							name="home-outline"
							size={20}
							color={selectedDelivery === 'Door Delivery' ? '#FA4A0C' : '#888'}
						/>
						<Text style={[styles.optionText, selectedDelivery === 'Door Delivery' && styles.selectedText]}>
							Door Delivery
						</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={[styles.optionButton, selectedDelivery === 'Pick Up' && styles.selectedOption]}
						onPress={() => setSelectedDelivery('Pick Up')}
					>
						<Ionicons
							name="walk-outline"
							size={20}
							color={selectedDelivery === 'Pick Up' ? '#FA4A0C' : '#888'}
						/>
						<Text style={[styles.optionText, selectedDelivery === 'Pick Up' && styles.selectedText]}>
							Pick Up
						</Text>
					</TouchableOpacity>
					</View>
				</View>

				<View style={styles.buttonContainer}>
					<TouchableOpacity style={styles.saveButton} onPress={handleSave}>
						<Text style={styles.saveText}>Save Changes</Text>
					</TouchableOpacity>
				</View>				

			</View>
		</SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 15,
		justifyContent: "center",
  },
  sectionContainer: {
		flex: 2,
		marginTop: 15,
  },
  buttonContainer: {
		flex: 1,
		justifyContent: "center",
  },
  section: {
		marginHorizontal: 5,
    marginBottom: 30,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: '#333',
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  optionText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#888',
  },
  selectedOption: {
    backgroundColor: '#FAF3F0',
    borderColor: '#FA4A0C',
    borderWidth: 1,
  },
  selectedText: {
    color: '#FA4A0C',
  },
  networkOptions: {
    marginTop: 10,
    paddingLeft: 20,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderColor: '#888',
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  innerDot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#FA4A0C',
  },
  saveButton: {
    backgroundColor: '#FA4A0C',
    borderRadius: 22,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 40,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  saveText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default EditPaymentDeliveryScreen;
