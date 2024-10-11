import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from '../components/CustomHeader';
import { CartContext } from '../context/CartContext';
import { FavoritesContext } from '../context/FavoritesContext';
import { Ionicons } from '@expo/vector-icons';

const FoodDetailScreen = ({ navigation, route }) => {
  const { handleAddToCart } = useContext(CartContext);
  const { favorites, handleAddToFavorites, handleRemoveFromFavorites } = useContext(FavoritesContext);
  const { foodItem } = route.params;

  // State to track if the item is in favorites
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // Check if the current item is already in the favorites
    const found = favorites.some(item => item.id === foodItem.id);
    setIsFavorite(found);
  }, [favorites, foodItem]);

  const toggleFavorite = () => {
    isFavorite ? handleRemoveFromFavorites(foodItem) : handleAddToFavorites(foodItem);
    setIsFavorite(!isFavorite);  // Toggle favorite state
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <CustomHeader title="stack" navigation={navigation} />
      <View style={styles.menuItem}>
        {/* Favorite Button */}
        <TouchableOpacity style={styles.favoriteButton} onPress={toggleFavorite}>
          <Ionicons
            name={isFavorite ? 'heart' : 'heart-outline'}
            size={28}
            color={isFavorite ? '#FA4A0C' : '#FA4A0C'}
          />
        </TouchableOpacity>

        <View style={styles.imageContainer}>
          <View style={[styles.menuImageContainer, foodItem.shape === "circle" ? { backgroundColor: '#ffff' } : { backgroundColor: 'transparent' }]}>
            <Image
              style={[styles.menuImage, foodItem.shape === "circle" ? { width: '100%', height: '100%' } : { width: '80%', height: '90%' }]}
              source={{ uri: foodItem.imageUrl}}
              resizeMode={foodItem.shape === "circle" ? "cover" : "contain"}
            />
          </View>

          <View style={styles.dotsContainer}>
            <Image
              style={styles.dots}
              source={require("../assets/images/dots.png")}
              resizeMode="contain"
            />
          </View>
        </View>

        <View style={styles.menuItemInfo}>
          <View style={styles.infoTitle}>
            <Text style={styles.menuItemText}>{foodItem.name}</Text>
            <Text style={styles.menuItemPrice}>GH₵ {foodItem.price}</Text>
          </View>

          <View style={styles.infoContent}>
            <Text style={styles.infoHeader}>Delivery info</Text>
            <Text style={styles.infoText}>
              Delivered between Monday Aug and Thursday 20 from 8 PM to 9:32 PM
            </Text>

            <Text style={styles.infoHeader}>Return policy</Text>
            <Text style={styles.infoText}>
              All our foods are double checked before leaving our stores, so in case you find a broken food, please contact our hotline immediately.
            </Text>

            <TouchableOpacity
              onPress={() => { handleAddToCart(foodItem); }}
              style={styles.addButton}>
              <Text style={styles.addText}>Add to cart</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
  </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#d9d9d9',
  },
  menuItem: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
    backgroundColor: '#f0f0f0',
  },
  favoriteButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 10,
    backgroundColor: '#F8F8F8',
    padding: 4,
    borderRadius: 50,
		borderWidth: .5,
		borderColor: "#D3D3D3",
    elevation: 3,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuImageContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderRadius: 100,
    width: '52%',
    height: '90%',
  },
  menuImage: {},
  dotsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dots: {
    width: 40,
    height: 30,
  },
  menuItemInfo: {
    flex: 2,
    paddingHorizontal: 20,
  },
  infoTitle: {
    flex: 0.4,
    alignItems: "center",
  },
  menuItemText: {
    fontFamily: 'ADLaMDisplay-Regular',
    fontSize: 20,
    textAlign: 'center',
  },
  menuItemPrice: {
    fontFamily: 'Bangers-Regular',
    fontSize: 17,
    color: '#FA4A0C',
  },
  infoContent: {
    flex: 2.5,
    justifyContent: "center",
    paddingBottom: 50,
  },
  infoHeader: {
    fontWeight: 'bold',
    marginTop: 10,
  },
  infoText: {
    marginBottom: 20,
  },
  addButton: {
    marginTop: 20,
    backgroundColor: '#FA4A0C',
    alignItems: 'center',
    paddingHorizontal: 100,
    paddingVertical: 17,
    borderRadius: 22,
  },
  addText: {
    fontWeight: "bold",
    color: "white",
  }
});

export default FoodDetailScreen;
