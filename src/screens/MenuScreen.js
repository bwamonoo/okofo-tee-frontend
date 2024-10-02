import { useContext } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import { CartContext } from '../context/CartContext';

const menuItems = [
  { id: '1', name: 'Pizza', price: '$10' },
  { id: '2', name: 'Burger', price: '$7' },
];

const MenuScreen = ({ navigation }) => {
  const { handleAddToCart } = useContext(CartContext);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <FlatList
        data={menuItems}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={globalStyles.container} onPress={() => navigation.navigate('FoodDetail', { foodItem: item })}>
             <Text style={globalStyles.title}>
							{item.name} - {item.price}
						</Text>
            <Button title="Add to cart" onPress={() => addToCart(item)}/>
          </View>
        )}
      />
    </View>
  );
};

export default MenuScreen;
