import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './StackNavigator';
import Toast from 'react-native-toast-message';
import { toastConfig } from "../styles/toastStyles";

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <StackNavigator />
      <Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} />
    </NavigationContainer>
  );
};

export default MainNavigator;
