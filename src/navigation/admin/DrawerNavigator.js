import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TabNavigator from './TabNavigator';
import ProfileScreen from '../../screens/ProfileScreen';
import OrdersScreen from '../../screens/OrdersScreen';
import SignoutScreen from '../../screens/SignoutScreen';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={TabNavigator} options={{ headerShown: false }} />
      <Drawer.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
      <Drawer.Screen name="Orders" component={OrdersScreen} options={{ headerShown: false }} />
      <Drawer.Screen name="Sign Out" component={SignoutScreen}
			/>
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
