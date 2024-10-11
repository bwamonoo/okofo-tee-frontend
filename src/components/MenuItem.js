import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';


const defaultStyles = {
	height: "75%",
	marginVertical: 55,
	marginHorizontal: 5,
};

const extraStyles = {
  1: {
    imageContainer: {
      height: 100,
      width: 100,
      overflow: 'hidden',
      borderColor: "#F0F0F0",
      borderRadius: 70,
      borderWidth: 1,
      top: -30,
    },
    image: {
      width: '120%',
      height: '120%',
    }
  },

  2: {
    imageContainer: {
      overflow: 'hidden',
      height: 110,
      width: 100,
      top: -30,
      borderRadius: 50,
      backgroundColor: 'transparent',
      shadowColor: '#fff', // Black shadow
      shadowOffset: { width: 0, height: 0 }, // No offset
      shadowOpacity: 0.5, // Semi-transparent shadow
      shadowRadius: 10,   // Create a blurred shadow effect
      elevation: 5, // For Android
    },
    image: {
      width: '50%',
      height: "106%",  // Larger height to allow for movement
      position: "absolute",
      bottom: -19, 
    }
  },
  
  3: {
    imageContainer: {
      overflow: 'hidden',
      height: 100,
      width: 100,
      top: -30,
      borderRadius: 70,
      backgroundColor: 'transparent',
      shadowColor: '#fff', // Black shadow
      shadowOffset: { width: 0, height: 0 }, // No offset
      shadowOpacity: 0.5, // Semi-transparent shadow
      shadowRadius: 10,   // Create a blurred shadow effect
      elevation: 5, // For Android
    },
    image: {
      width: '100%',
      height: "100%",  // Larger height to allow for movement
      position: "absolute",
      bottom: -16, 
    }
  },
  
  4: {
    imageContainer: {
      height: 100,
      width: 100,
      overflow: 'hidden',
      borderColor: "#F0F0F0",
      borderRadius: 70,
      borderWidth: 1,
      top: -30,
    },
    image: {
      width: '120%',
      height: '120%',
    }
  },
}

const MenuItem = ({ item, navigation, screen, customStyles }) => {
  return (
    <TouchableOpacity style={[styles.menuItem, screen ? customStyles.menuItem : defaultStyles]} onPress={() => navigation.navigate('FoodDetail', { foodItem: item })}>
      <View style={[styles.imageContainer, extraStyles[item.menuCategoryId].imageContainer, screen ? customStyles.imageContainer : {}]}>
			<Image style={[styles.image, extraStyles[item.menuCategoryId].image ]}  source={{ uri: item.imageUrl }}  resizeMode="cover"/>
      </View>
      <Text style={[styles.menuItemText, screen ? customStyles.menuItemText : {}]}>{item.name}</Text>
      <Text style={[styles.menuItemPrice, screen ? customStyles.menuItemPrice : {}]}>GH₵ {item.price}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  menuItem: {
    width: 150,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 25,
    elevation: 3,
		position: "relative",
  },
  imageContainer: {
    backgroundColor: "#FAFAFA",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
  },
  image: {

  },
  menuItemText: {
    fontFamily: "Amaranth-Regular",
    fontSize: 19,
    marginTop: 5,
    textAlign: 'center',
    width: 120,
  },
  menuItemPrice: {
    fontFamily: "Bangers-Regular",
    marginTop: 2,
    color: '#FA4A0C',
    position: "absolute",
    bottom: 30,
  },
});

export default MenuItem;
