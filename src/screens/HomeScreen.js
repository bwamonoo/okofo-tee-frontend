import React, { useRef, useState, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, TouchableWithoutFeedback, FlatList } from 'react-native';
import CustomHeader from '../components/CustomHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import MenuItem from '../components/MenuItem';
import { foodData, drinkData, snackData, sauceData } from '../database/menuData';
import { MenuContext } from "../context/MenuContext"


const HomeScreen = ({ navigation }) => {
  const { menus } = useContext(MenuContext);

  const edibles = {
    foods:  {title1: "DELICIOUS", title11: "FOODS", title2: "FOOD FOR YOU", data: menus.foodData},
    drinks: {title1: "DRINKS", title11: "DRINKS", title2: "FOR YOU", data: menus.drinkData},
    snacks: {title1: "SNACKS", title11: "SNACKS", title2: "FOR YOU", data: menus.snackData},
    sauce:  {title1: "SAUCE", title11: "SAUCE", title2: "FOR YOU", data: menus.sauceData},
  };

  const [focusedField, setFocusedField] = useState(null);
  const [edible, setEdible] = useState("foods");

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#EFEDED' }}>
      <CustomHeader title="drawer" navigation={navigation} />

      <View style={styles.homeContentsContainer}>
        <View style={styles.upperSection}>
          <View style={styles.title}>
            <Text style={styles.firstTitle}>{edibles[edible].title1}</Text>
            <Text style={styles.secondTitle}>{edibles[edible].title2}</Text>
          </View>

          <TouchableWithoutFeedback style={styles.searchBarContainer} onPress={() => navigation.navigate("Search")}>
            <View style={styles.searchBar}>
              <Ionicons style={styles.searchIcon} name="search-outline" size={22} color="black" />
              <View style={styles.textInput}>
                <Text style={styles.placeholderText}>Search here</Text>
              </View>
            </View>
          </TouchableWithoutFeedback>

          <View style={styles.edibles}>
            {['Foods', 'Drinks', 'Snacks', 'Sauce'].map((item) => (
              <TouchableOpacity
                key={item}
                style={[
                  styles.edibleOption,
                  {
                    borderBottomColor: focusedField === item ? '#FA4A0C' : '#B1B1B3',
                    borderBottomWidth: focusedField === item ? 2 : 0,
                  },
                ]}
                onPress={() => {
                  setFocusedField(item);
                  setEdible(item.toLowerCase());
                }}
              >
                <Text style={styles.text}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.seeMore}>
            <TouchableOpacity
            onPress={() => navigation.navigate("MenuList", {menuData: edibles[edible]})}
            >
              <Text style={styles.seeMoreText}>see more</Text>
            </TouchableOpacity>
          </View>

        </View>

        <FlatList
          style={styles.menuList}
          data={edibles[edible].data}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => <MenuItem item={item} navigation={navigation} />}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  homeContentsContainer: {
    flex: 1,
    // backgroundColor: "gray",
  },
  upperSection: {
    flex: 1.15,
    paddingTop: 40,
    // backgroundColor: "yellow",
  },
  title: {
    // backgroundColor: "gray",
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  firstTitle: {
    fontFamily: "Bangers-Regular",
    fontSize: 32,
    color: "#F00707",
    lineHeight: 35,
  },
  secondTitle: {
    fontFamily: "Bangers-Regular",
    fontSize: 32,
    lineHeight: 35,
  },
  searchBar: {
    backgroundColor: "#FFFFFF",
    height: 50,
    marginBottom: 40,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 40,
    elevation: 2, // Add shadow effect for Android
    marginHorizontal: 20,
  },
  searchIcon: {
    position: "absolute",
    top: 14,
    left: 18,
    zIndex: 1,
  },
  textInput: {
    backgroundColor: "#FFFFFF",
    flex: 1,
    paddingHorizontal: 50,
    borderRadius: 40,
  },
  edibles: {
    // backgroundColor: "lightblue",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderRadius: 10,
    paddingHorizontal: 20,
  },
  edibleOption: {
    paddingHorizontal: 12,
  },
  seeMore: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 35,
    paddingHorizontal: 20,
  },
  seeMoreText: {
    color: "#F00707",
  },
  menuList: {
    flex: 1,
    // backgroundColor: "blue",
  },
  separator: {
    width: 10,
  },
});

export default HomeScreen;
