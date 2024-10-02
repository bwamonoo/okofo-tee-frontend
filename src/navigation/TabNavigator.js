import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import ProfileScreen from '../screens/ProfileScreen';
import OrdersScreen from '../screens/OrdersScreen';
import CustomTabIcon from '../components/CustomTabIcon';  // Import the custom icon component
import { tabIcons } from '../constants/tabIcons';  // Your icons configuration

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarStyle: { height: 100, backgroundColor: "#EFEDED" },
        tabBarIcon: ({ focused, color }) => {
          const iconName = focused ? tabIcons[route.name].focused : tabIcons[route.name].unfocused;
          const size = focused ? 30 : 25;

          return (
            <CustomTabIcon 
              iconName={iconName} 
              size={size} 
              color={color} 
            />
          );
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Orders" component={OrdersScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
