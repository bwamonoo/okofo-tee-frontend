import { useState, useEffect } from 'react';
import * as Font from 'expo-font';  // Font loading from expo-font
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';  // SplashScreen API
import { SafeAreaProvider } from 'react-native-safe-area-context';
// import { ThemeProvider } from '@react-navigation/native';
import UserProvider from './src/context/UserContext';
import ThemeProvider from './src/context/ThemeContext';
import MenuProvider from './src/context/MenuContext';
import CartProvider from './src/context/CartContext';
import OrderProvider from './src/context/OrderContext';
import FavoritesProvider from './src/context/FavoritesContext';
import MainNavigator from './src/navigation/MainNavigator';
import { fonts } from './src/constants/fonts';
import UserDataProvider from './src/context/UserDataContext';


SplashScreen.preventAutoHideAsync();  // Keep the splash screen visible until fonts are loaded

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync(fonts);
      setFontsLoaded(true);
      SplashScreen.hideAsync();  // Hide the splash screen once fonts are loaded
    }
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null;  // Render nothing until fonts are loaded
  }

  return (
    <UserProvider>
      <ThemeProvider>
        <MenuProvider>
          <CartProvider>
            <OrderProvider>
              <FavoritesProvider>
                <UserDataProvider>
                  <SafeAreaProvider>
                    <MainNavigator />
                  </SafeAreaProvider>
                </UserDataProvider>
              </FavoritesProvider>
            </OrderProvider>
          </CartProvider>
        </MenuProvider>
      </ThemeProvider>
    </UserProvider>
  );
}
