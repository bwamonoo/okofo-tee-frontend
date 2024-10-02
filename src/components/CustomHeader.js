import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // For menu icon

const CustomHeader = ({ title, navigation }) => {
  const drawer = () => navigation.openDrawer();
  const stack = () => navigation.goBack();

  const icon = {
    drawer: {
      image: require("../assets/icons/menu.png"),
      style: {  width: 20, height: 16 }
    },
    stack: {
      image: require("../assets/icons/go-back.png"),
      style: { width: 29, height: 25 }
    }
  }


  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={title === "drawer" ? drawer : stack}>
			<Image style={[styles.image, icon[title].style]} source={icon[title].image} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
        <Image style={styles.cartImage} source={require("../assets/icons/shopping-cart.png")} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    // backgroundColor: "gray", // Customize this color
    height: 60,
  },
  image: {

  },
  cartImage: {
    width: 22,
    height: 22,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default CustomHeader;
