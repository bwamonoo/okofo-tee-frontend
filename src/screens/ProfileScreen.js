import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { UserContext } from '../context/UserContext';
import CustomHeader from '../components/CustomHeader';
import { SafeAreaView } from 'react-native-safe-area-context';

const iconNames = {
  MTN: require("../assets/images/MTN.png"),
  AirtelTigo: require("../assets/images/AirtelTigo.png"),
  Telecel: require("../assets/images/Telecel.png"),
};

const ProfileScreen = ({ navigation }) => {
  const { user: userData } = useContext(UserContext);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f0f0f0' }}>
      <CustomHeader title="drawer" navigation={navigation} />
      <View style={styles.container}>
        {/* Profile Card */}
        <View style={styles.card}>
          <Image style={styles.profilePic} source={require("../assets/images/profile-picture.jpeg")} />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{userData.name}</Text>
            <Text style={styles.profileEmail}>{userData.email}</Text>
          </View>
          <TouchableOpacity style={styles.editIcon} onPress={() => navigation.navigate('UserInfo')}>
            <Ionicons name="create-outline" size={30} color="#FA4A0C" />
          </TouchableOpacity>
        </View>


        <View style={styles.card}>
          <Text style={styles.cardTitle}>Address Details</Text>
          <Text style={styles.cardContent}>{userData.address.name}</Text>
          <Text style={styles.cardContent}>{userData.address.residential}</Text>
          <Text style={styles.cardContent}>{userData.address.phone}</Text>
          <TouchableOpacity style={styles.editIcon} onPress={() => navigation.navigate('UserInfo')}>
            <Ionicons name="create-outline" size={30} color="#FA4A0C" />
          </TouchableOpacity>
        </View>


        <View style={styles.card}>
          <Text style={styles.cardTitle}>Payment Method</Text>
          <View style={styles.paymentContainer}>
            <Ionicons name={userData.paymentMethod.type === 'Mobile Money' ? "phone-portrait-outline" : "card-outline"} size={30} color="#FA4A0C" />
            <Text style={styles.cardContent}>{userData.paymentMethod.type}</Text>
          </View>
          {userData.paymentMethod.type === 'Mobile Money' && (
            <View style={styles.paymentContainer}>
              <Image style={styles.networkIcon}source={iconNames[userData.paymentMethod.provider]} resizeMode={"contain"}/>
              <Text style={styles.cardContent}>{userData.paymentMethod.provider}</Text>
            </View>
          )}
          <TouchableOpacity style={styles.editIcon} onPress={() => navigation.navigate('PaymentAndDelivery', { section: "payment" })}>
            <Ionicons name="create-outline" size={30} color="#FA4A0C" />
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Delivery Method</Text>
          <View style={styles.deliveryContainer}>
            <Ionicons name={userData.deliveryMethod === "Pick Up" ? "walk-outline" : "home-outline"} size={25} color="#FA4A0C" />
            <Text style={styles.cardContent}>{userData.deliveryMethod}</Text>
          </View>
          <TouchableOpacity style={styles.editIcon} onPress={() => navigation.navigate('PaymentAndDelivery', { section: "delivery" })}>
            <Ionicons name="create-outline" size={30} color="#FA4A0C" />
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>  

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#f0f0f0',
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 17,
    marginVertical: 7,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  profilePic: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#EFEFEF',
    marginBottom: 5,
  },
  profileInfo: {
    marginLeft: 15,
    justifyContent: 'center',
  },
  profileName: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#333',
  },
  profileEmail: {
    fontSize: 13,
    color: '#777',
  },
  editIcon: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 5,
  },
  cardContent: {
    fontSize: 13,
    color: '#555',
    marginLeft: 5,
  },
  paymentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  networkIcon: {
    width: 30,
    height: 30,
  },
  deliveryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  passwordButton: {
    backgroundColor: '#FA4A0C',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginVertical: 10,
  },
  passwordButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
