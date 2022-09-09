import React, { useState, useEffect } from 'react';
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	FlatList,
	TextInput,
	Platform,
} from 'react-native';
import colors from '../../assets/colors/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RecipeCard from '../components/RecipeCard';
import { parseString } from 'react-native-xml2js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ListScreen = ({ navigation }) => {
	const [filter, setfilter] = useState('All');
	const [query, setQuery] = useState('');
	const [type, setType] = useState([]);
	const [recipeList, setRecipeList] = useState([]);

	useEffect(() => {
		getRecipeType();
		getListRecipe();
	}, []);

	const getListRecipe = async () => {
		try {
			const value = await AsyncStorage.getItem('@listRecipe');
			if (value !== null) {
				setRecipeList(JSON.parse(value));
			}
		} catch (e) {
			console.log('Error get listRecipe data : ', e);
		}
	};

	const getRecipeType = async () => {
		try {
			const value = await AsyncStorage.getItem('@recipeType');
			if (value !== null) {
				parseString(value, (_, result) => {
					setType(result.recipe.type);
				});
			}
		} catch (e) {
			console.log('Error get recipeType data : ', e);
		}
	};

	const renderRecipeItem = ({ item }) => (
		<RecipeCard
			item={item}
			onPress={() => {
				navigation.navigate('RecipeDetail', {
					recipe: item,
				});
			}}
		/>
	);

	const renderRecipeTypeItem = ({ item, index }) => (
		<TouchableOpacity
			style={[
				styles.typeItemWrapper,
				{
					marginLeft: index === 0 ? 10 : 0,
					backgroundColor:
						item['name'][0] === filter
							? colors.primaryOrange
							: colors.white,
				},
			]}
			onPress={() => setfilter(item['name'][0])}
		>
			<Text
				style={{
					color:
						item['name'][0] === filter
							? colors.white
							: colors.raisinBlack,
					fontWeight: item['name'][0] === filter ? '700' : '500',
					fontSize: 12,
				}}
			>
				{item['name'][0]}
			</Text>
		</TouchableOpacity>
	);

	const renderRecipeList = () => {
		let list = [];
		if (query === '') {
			if (filter === 'All') {
				list = recipeList;
			} else {
				list = recipeList.filter((recipe) => recipe.type === filter);
			}
		} else {
			list = recipeList.filter((recipe) => recipe.title.includes(query));
		}

		return (
			<FlatList
				data={list}
				renderItem={renderRecipeItem}
				keyExtractor={(item) => item.id}
				ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
				contentContainerStyle={{ paddingBottom: 20 }}
				showsVerticalScrollIndicator={false}
			/>
		);
	};

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<View style={styles.searchBar}>
					<Ionicons
						name="search"
						size={20}
						color={colors.primaryOrange}
					/>
					<TextInput
						placeholder="Search recipe by name"
						placeholderTextColor={colors.primaryOrange}
						autoCorrect={false}
						style={styles.input}
						value={query}
						onChangeText={(label) => setQuery(label)}
						underlineColorAndroid="transparent"
					/>
				</View>
			</View>
			<View style={{ paddingVertical: 10 }}>
				<FlatList
					data={type ?? []}
					keyExtractor={({ $: { id } }) => id}
					renderItem={renderRecipeTypeItem}
					horizontal
					showsHorizontalScrollIndicator={false}
					ItemSeparatorComponent={() => (
						<View style={{ width: 10 }} />
					)}
				/>
			</View>
			<View style={{ flex: 1, paddingHorizontal: 20 }}>
				{renderRecipeList()}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.white,
	},
	header: {
		backgroundColor: colors.primaryOrange,
	},
	searchBar: {
		zIndex: 1,
		flexDirection: 'row',
		backgroundColor: colors.softWhite,
		paddingVertical: Platform.OS === 'ios' ? 15 : 0,
		paddingHorizontal: 10,
		borderRadius: 5,
		marginHorizontal: 10,
		marginBottom: 10,
		justifyContent: 'center',
		alignItems: 'center',
	},
	input: {
		flex: 1,
		marginHorizontal: 5,
		fontSize: 16,
	},
	typeItemWrapper: {
		borderWidth: 1,
		borderColor: colors.primaryOrange,
		paddingHorizontal: 15,
		paddingVertical: 8,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 30,
	},
});
export default ListScreen;
