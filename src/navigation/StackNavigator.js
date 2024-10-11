import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, ActivityIndicator } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import CustomerDrawer from './customer/DrawerNavigator';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import FoodDetailScreen from '../screens/FoodDetailScreen';
import MenuScreen from '../screens/MenuScreen';
import MenuListScreen from '../screens/MenuListScreen';
import CartScreen from '../screens/CartScreen';
import EditPaymentDeliveryScreen from '../screens/EditPaymentDeliveryScreen';
import UserDetailsScreen from '../screens/UserDetailsScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import VerifyEmailScreen from '../screens/VerifyEmailScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
import SearchScreen from '../screens/SearchScreen';
import PaymentScreen from '../screens/PaymentScreen';


const Stack = createStackNavigator();

const StackNavigator = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if the user is logged in
  const checkLoginStatus = async () => {
    try {
      const userToken = await SecureStore.getItemAsync('accessToken');

      console.log("userToken::: ", userToken);

      setIsLoggedIn(!!userToken);
    } catch (error) {
      console.error('Failed to fetch login status', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#FA4A0C" />
      </View>
    );
  }

  return (
    <Stack.Navigator>
      
      {isLoggedIn ? (
        <>
          {/* Main app navigation with Drawer */}
          <Stack.Screen name="Customer" component={CustomerDrawer} options={{ headerShown: false }} />   

          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      </>
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Customer" component={CustomerDrawer} options={{ headerShown: false }} /> 
        </>
      )}
      <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} /> 

      {/* Individual Food Details can be accessed from any screen */}
      <Stack.Screen name="FoodDetail" component={FoodDetailScreen} options={{ headerShown: false }} />

      <Stack.Screen name="Menu" component={MenuScreen} options={{ headerTitle: 'Menu' }} />

      <Stack.Screen name="MenuList" component={MenuListScreen} options={{ headerShown: false }} />

      <Stack.Screen name="Cart" component={CartScreen} options={{ headerShown: false }} />

      <Stack.Screen name="UserInfo" component={UserDetailsScreen} options={{ headerShown: false }} />

      <Stack.Screen name="PaymentAndDelivery" component={EditPaymentDeliveryScreen} options={{ headerShown: false }} />

      <Stack.Screen name="Checkout" component={CheckoutScreen} options={{ headerShown: false }} />

      <Stack.Screen name="EmailVerification" component={VerifyEmailScreen} options={{ headerShown: false }} />

      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ headerShown: false }} />

      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} options={{ headerShown: false }} />

      <Stack.Screen name="Search" component={SearchScreen} options={{ headerShown: false }} />

      <Stack.Screen name="Payment" component={PaymentScreen} options={{ headerShown: false }} />

    </Stack.Navigator>
  );
};

export default StackNavigator;
