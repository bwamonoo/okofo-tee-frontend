import React, { useContext } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Swipeable } from 'react-native-gesture-handler';
import CustomHeader from '../components/CustomHeader';
import { FavoritesContext } from '../context/FavoritesContext';
import { Ionicons } from '@expo/vector-icons';

const FavoritesScreen = ({ navigation }) => {
  const { favorites, handleRemoveFromFavorites } = useContext(FavoritesContext);

  // Render the "delete" icon when swiping left
  const renderRightActions = (item) => (
    <TouchableOpacity style={styles.deleteButton} onPress={() => handleRemoveFromFavorites(item.id)}>
      <Animated.View style={styles.deleteButtonContent}>
        <Ionicons name="trash-outline" size={24} color="white" />
        <Text style={styles.deleteText}>Remove</Text>
      </Animated.View>
    </TouchableOpacity>
  );

  const renderFavoriteItems = () => (
    <FlatList
      data={favorites}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <Swipeable renderRightActions={() => renderRightActions(item)}>
          <View style={styles.favoriteItem}>
            <View style={styles.favoriteItemImageContainer}>
              <Image source={item.image} style={styles.favoriteItemImage} resizeMode="cover" />
            </View>
            <View style={styles.favoriteItemDetails}>
              <Text style={styles.favoriteItemText}>{item.name}</Text>
              <Text style={styles.favoriteItemPrice}>₵{item.price}</Text>
              {/* Keep the "Remove from Favorites" button */}
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => handleRemoveFromFavorites(item.id)}>
                <Ionicons name="heart-dislike-outline" size={23} color="#FA4A0C" />
              </TouchableOpacity>
            </View>
          </View>
        </Swipeable>
      )}
      showsVerticalScrollIndicator={false}
    />
  );

  const renderEmptyFavorites = () => (
    <View style={styles.emptyFavoritesContainer}>
      <Image source={require('../assets/images/empty-cart.png')} style={styles.emptyFavoritesImage} />
      <Text style={styles.emptyFavoritesTextTitle}>No Favorites Yet</Text>
      <Text style={styles.emptyFavoritesText}>Browse and add items to your favorites to see them here.</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <CustomHeader title="stack" navigation={navigation} />
      <View style={styles.container}>
        {favorites.length === 0 ? renderEmptyFavorites() : renderFavoriteItems()}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 16,
    backgroundColor: '#f9f9f9',
  },
  emptyFavoritesContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyFavoritesImage: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  emptyFavoritesTextTitle: {
    fontSize: 26,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  emptyFavoritesText: {
    fontSize: 16,
    color: '#7d7d7d',
    textAlign: 'center',
    paddingHorizontal: 40,
    lineHeight: 22,
  },
  favoriteItem: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginVertical: 8,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  favoriteItemImageContainer: {
    backgroundColor: "#f0f0f0",
    width: 80,
    height: 80,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  favoriteItemImage: {
    width: '100%',
    height: '100%',
  },
  favoriteItemDetails: {
    flex: 1,
    paddingHorizontal: 15,
    justifyContent: 'center',
  },
  favoriteItemText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A4A4A',
  },
  favoriteItemPrice: {
    fontSize: 16,
    color: '#FA4A0C',
    marginTop: 4,
  },
  removeButton: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
  deleteButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    backgroundColor: '#FA4A0C',
    borderRadius: 15,
    marginVertical: 8,
  },
  deleteButtonContent: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteText: {
    color: 'white',
    fontSize: 12,
    marginTop: 5,
  },
});

export default FavoritesScreen;
