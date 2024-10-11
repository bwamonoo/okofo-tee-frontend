import { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // For menu icon
import { CartContext } from "../context/CartContext";

const CustomHeader = ({ title, navigation }) => {
  const { cartQuantity } = useContext(CartContext);
  console.log("carqq ", cartQuantity);

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

      <Text style={styles.quantity} onPress={() => navigation.navigate("Cart")}>{cartQuantity}</Text>

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
    paddingHorizontal: 20,
    paddingVertical: 12,
    // backgroundColor: "#d9d9d9",
    height: 60,
  },
  image: {

  },
  quantity: {
    fontSize: 9,
    color: "#fff",
    backgroundColor: "#FA4A0C", 
    borderRadius: 15,
    paddingHorizontal: 6,
    paddingVertical: 2,
    position: 'absolute',
    top: 13,
    right: 8,
    minWidth: 10,
    textAlign: 'center',
    fontWeight: 'bold', 
    zIndex: 1, 
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3, 
  },
  cartImage: {
    width: 25,
    height: 25,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default CustomHeader;
