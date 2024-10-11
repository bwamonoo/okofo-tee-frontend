import React, { useState } from 'react';
import { View, FlatList, StyleSheet, Button, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from '../components/CustomHeader';
import MenuItem from '../components/MenuItem';
import { TouchableOpacity } from 'react-native-gesture-handler';

const customStyles = {
	menuItem: {
		height: 200,
		marginVertical: 37,
		marginHorizontal: 10,
	}
}

const MenuListScreen = ({ navigation, route }) => {
	const { data: menuData, title11 } = route.params.menuData;


  return (
    <SafeAreaView style={{ flex: 1 }} >
      <CustomHeader title="stack" navigation={navigation} />

			<View style={styles.title}>
				<Text style={styles.firstTitle}>{title11}</Text>
			</View>

      <View style={styles.menuContainer}>
				<FlatList
					style={styles.menuList}
					data={menuData}
					keyExtractor={item => item.id.toString()}
					renderItem={({ item }) => <MenuItem item={item} navigation={navigation} screen={"MenuListScreen"} customStyles={customStyles} />}
					showsVerticalScrollIndicator={false}
					numColumns={2}
					// ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
	menuContainer: {
		flex: 1,
		alignItems: "center",
    backgroundColor: '#F9F9F9',
		borderTopLeftRadius: 25,
		borderTopRightRadius: 25,

	},
	title: {
    // backgroundColor: "gray",
    marginBottom: 25,
		marginLeft: 30,
  },
  firstTitle: {
    fontFamily: "Bangers-Regular",
    fontSize: 32,
    lineHeight: 35,
  },
  separator: {
    width: 20, // Adjust for horizontal spacing
  },
});

export default MenuListScreen;
