import React, { useRef, useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, TouchableWithoutFeedback, FlatList , Dimensions } from 'react-native';
import CustomHeader from '../components/CustomHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import MenuItem from '../components/MenuItem';
import { MenuContext } from "../context/MenuContext";


const { width, height } = Dimensions.get('window');

// Function to scale sizes based on the screen width and height
const scaleWidth = (size) => (width / 360) * size;   // Assuming 360px is the base width of the design
const scaleHeight = (size) => (height / 812) * size; // Assuming 812px is the base height of the design


const SearchScreen = ({ navigation }) => {
	const { searchedMenus, handlSearchMenus } = useContext(MenuContext);
  console.log("mnus", searchedMenus)
  const searchRef = useRef(null);

	useEffect(() => {
    if (searchRef.current) {
      searchRef.current.focus();
    }
  }, []);

	const searchMenus = async value => {
		await handlSearchMenus(value);
	};


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#EFEDED' }}>
      <CustomHeader title="drawer" navigation={navigation} />

      <View style={styles.homeContentsContainer}>
        <View style={styles.upperSection}>
          <TouchableWithoutFeedback style={styles.searchBarContainer} onPress={() => searchRef.current.focus()}>
            <View style={styles.searchBar}>
              <Ionicons style={styles.searchIcon} name="search-outline" size={22} color="black" />
              <TextInput
                ref={searchRef}
                style={styles.textInput}
								autoFocus={true} 
                onChangeText={searchMenus}
                placeholder="Search here"
              />
            </View>
          </TouchableWithoutFeedback>

        </View>

        <FlatList
          style={styles.menuList}
          data={searchedMenus}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) =>  <MenuItem item={item} navigation={navigation} screen={"MenuListScreen"} customStyles={customStyles} />}
					showsVerticalScrollIndicator={false}
					numColumns={3}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
					  contentContainerStyle={{ paddingBottom: 60 }}
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
    paddingTop: 10,
    // backgroundColor: "yellow",
  },
  searchBar: {
    backgroundColor: "#FFFFFF",
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 40,
    elevation: 2, // Add shadow effect for Android
    marginHorizontal: 15,
		marginBottom: 5,
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
  menuList: {
    // flex: 1,
		paddingTop: 50,
    // backgroundColor: "blue",
  },
  separator: {
    // width: 5,
  },
});

const customStyles = StyleSheet.create({
  menuItem: {
    height: scaleHeight(120),
    width: scaleWidth(110),
    marginVertical: scaleHeight(29),
    marginHorizontal: scaleWidth(5),
  },
  imageContainer: {
    top: scaleHeight(-30),
    height: scaleHeight(80),
    width: scaleWidth(70),
  },
  menuItemText: {
    fontSize: scaleWidth(10),
    width: scaleWidth(80),
  },
  menuItemPrice: {
    fontSize: scaleWidth(10),
    bottom: scaleHeight(15),
  },
});

export default SearchScreen;
