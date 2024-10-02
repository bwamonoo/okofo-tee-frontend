import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DrawerNavigator from './DrawerNavigator';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import FoodDetailScreen from '../screens/FoodDetailScreen';
import MenuScreen from '../screens/MenuScreen';
import MenuListScreen from '../screens/MenuListScreen';
import CartScreen from '../screens/CartScreen';
import EditPaymentDeliveryScreen from '../screens/EditPaymentDeliveryScreen';
import EditProfileScreen from '../screens/UserDetailsScreen';
import UserDetailsScreen from '../screens/UserDetailsScreen';
import CheckoutScreen from '../screens/CheckoutScreen';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      {/* You can have Login and Signup outside the Drawer and Tab navigation */}
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
      
      {/* Main app navigation with Drawer */}
      <Stack.Screen name="Main" component={DrawerNavigator} options={{ headerShown: false }} />

      {/* Individual Food Details can be accessed from any screen */}
      <Stack.Screen name="FoodDetail" component={FoodDetailScreen} options={{ headerTitle: 'Food Detail' }} />

      <Stack.Screen name="Menu" component={MenuScreen} options={{ headerTitle: 'Menu' }} />

      <Stack.Screen name="MenuList" component={MenuListScreen} options={{ headerShown: false }} />

      <Stack.Screen name="Cart" component={CartScreen} options={{ headerShown: false }} />

      <Stack.Screen name="UserInfo" component={UserDetailsScreen} options={{ headerShown: false }} />

      <Stack.Screen name="PaymentAndDelivery" component={EditPaymentDeliveryScreen} options={{ headerShown: false }} />

      <Stack.Screen name="Checkout" component={CheckoutScreen} options={{ headerShown: false }} />

    </Stack.Navigator>
  );
};

export default StackNavigator;
