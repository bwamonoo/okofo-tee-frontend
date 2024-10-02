import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, TouchableWithoutFeedback, FlatList } from 'react-native';
import CustomHeader from '../components/CustomHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import MenuItem from '../components/MenuItem';
import { foodData, drinkData, snackData, sauceData } from '../database/menuData';

const edibles = {
  foods:  {title1: "DELICIOUS", title11: "FOODS", title2: "FOOD FOR YOU", data: foodData},
  drinks: {title1: "DRINKS", title11: "DRINKS", title2: "FOR YOU", data: drinkData},
  snacks: {title1: "SNACKS", title11: "SNACKS", title2: "FOR YOU", data: snackData},
  sauce:  {title1: "SAUCE", title11: "SAUCE", title2: "FOR YOU", data: sauceData},
};

const HomeScreen = ({ navigation }) => {
  const searchRef = useRef(null);
  const [searchInput, setSearchInput] = useState("");
  const [focusedField, setFocusedField] = useState(null);
  const [edible, setEdible] = useState("foods");

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#EFEDED' }}>
      <CustomHeader title="drawer" navigation={navigation} />

      <View style={styles.homeContentsContainer}>
        <View style={styles.title}>
          <Text style={styles.firstTitle}>{edibles[edible].title1}</Text>
          <Text style={styles.secondTitle}>{edibles[edible].title2}</Text>
        </View>

        <TouchableWithoutFeedback onPress={() => searchRef.current.focus()}>
          <View style={styles.searchBar}>
            <Ionicons style={styles.searchIcon} name="search-outline" size={22} color="black" />
            <TextInput
              ref={searchRef}
              style={styles.textInput}
              value={searchInput}
              onChangeText={setSearchInput}
              placeholder="Search here"
            />
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

        <TouchableOpacity
         style={styles.seeMore}
         onPress={() => navigation.navigate("MenuList", {menuData: edibles[edible]})}
         >
          <Text style={styles.seeMoreText}>see more</Text>
        </TouchableOpacity>

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
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  title: {
    // backgroundColor: "gray",
    marginBottom: 20,
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
  },
  edibleOption: {
    paddingHorizontal: 12,
  },
  seeMore: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 35,
  },
  seeMoreText: {
    color: "#F00707",
  },
  separator: {
    width: 20, // Adjust for horizontal spacing
  },
});

export default HomeScreen;
