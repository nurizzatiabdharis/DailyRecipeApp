import React, { useEffect, useState } from 'react';
import {
	View,
	SafeAreaView,
	Text,
	StyleSheet,
	TouchableOpacity,
	FlatList,
	ScrollView,
	LogBox,
	ActivityIndicator,
} from 'react-native';
import { Avatar } from 'react-native-paper';
import colors from '../../assets/colors/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import RecipeCard from '../components/RecipeCard';
import RecipeBigCard from '../components/RecipeBigCard';
import { parseString } from 'react-native-xml2js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ navigation }) => {
	const [recipeList, setRecipeList] = useState([]);
	const [isLoading, setLoading] = useState(true);
	const [username, setUsername] = useState('');

	LogBox.ignoreLogs(['Sending...']);

	useEffect(() => {
		getUser();
		getListRecipe();
		requestRecipeTypeData();
	});

	const getListRecipe = async () => {
		try {
			const value = await AsyncStorage.getItem('@listRecipe');
			if (value !== null) {
				setRecipeList(JSON.parse(value));
				setLoading(false);
			}
		} catch (e) {
			console.log('Error get listRecipe data : ', e);
		}
	};

	const getUser = async () => {
		try {
			const value = await AsyncStorage.getItem('username');
			if (value !== null) {
				setUsername(value);
			}
		} catch (err) {
			console.log(err);
		}
	};

	const requestRecipeTypeData = async () => {
		var url =
			'https://gist.githubusercontent.com/nurizzatiabdharis/be208f776aa6f68493ec5125ff0bc79f/raw/c2767106f992a6ccc495a0ee9284a155920d3506/recipetypes.xml';
		fetch(url)
			.then((response) => response.text())
			.then(async (responseText) => {
				await AsyncStorage.setItem('@recipeType', responseText);
			})
			.catch((error) => {
				console.log('Error fetching : ', error);
			});
	};

	const logOut = async () => {
		try {
			await AsyncStorage.clear();
			navigation.navigate('Login');
		} catch (err) {
			console.log('error log out');
		}
	};

	const renderItem = ({ item, index }) => (
		<RecipeBigCard
			item={item}
			index={index}
			onPress={() => {
				navigation.navigate('RecipeDetail', {
					recipe: item,
				});
			}}
		/>
	);

	const renderTopRatedRecipe = () => {
		let list = [];
		recipeList.forEach((item) => {
			if (parseFloat(item.ratings) >= 4.5) list.push(item);
		});
		return (
			<FlatList
				horizontal
				data={list}
				renderItem={renderItem}
				keyExtractor={(item) => item.id}
				showsHorizontalScrollIndicator={false}
				ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
			/>
		);
	};

	return (
		<SafeAreaView
			style={{
				flex: 1,
				backgroundColor: colors.white,
				justifyContent: 'center',
				alignContent: 'center',
			}}
		>
			{isLoading ? (
				<ActivityIndicator size="large" color={colors.primaryOrange} />
			) : (
				<View style={{ flex: 1 }}>
					<View
						style={{
							marginHorizontal: 20,
							marginBottom: 10,
							flexDirection: 'row',
							alignItems: 'center',
						}}
					>
						<View style={{ flexDirection: 'row', flex: 1 }}>
							<Avatar.Image
								size={40}
								source={{
									uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKQA7rcxYM75v3hz0PrnzryTL6Y0-YnkJb-w&usqp=CAU',
								}}
							/>
							<Ionicons.Button
								name="search"
								size={25}
								color={colors.raisinBlack}
								style={styles.iconBtn}
								underlayColor={colors.white}
								onPress={() => navigation.navigate('List')}
							/>
						</View>

						<MaterialIcons.Button
							name="logout"
							size={30}
							color={colors.raisinBlack}
							style={styles.iconBtn}
							onPress={logOut}
						/>
					</View>
					<ScrollView
						style={styles.container}
						showsVerticalScrollIndicator={false}
					>
						<View style={{ marginHorizontal: 20 }}>
							<Text style={styles.titleHello}>
								Hello {username} !
							</Text>
							<Text style={styles.titleQuestion}>
								What would you like to cook today?
							</Text>
						</View>

						{/** Display Top Rated Recipe */}
						<View style={styles.sectionTitleWrapper}>
							<Text style={styles.sectionTitle}>
								Top Rated Recipe
							</Text>
						</View>
						{renderTopRatedRecipe()}

						{/** Display Today Recommendation Recipe */}
						<View style={styles.sectionTitleWrapper}>
							<Text style={styles.sectionTitle}>
								Today Recommendation
							</Text>
							<TouchableOpacity
								onPress={() => navigation.navigate('List')}
							>
								<Text style={styles.sectionSubtitle}>
									See all
								</Text>
							</TouchableOpacity>
						</View>
						<View style={{ marginHorizontal: 20 }}>
							{recipeList.slice(3).map((item, index) => (
								<RecipeCard
									item={item}
									key={index}
									onPress={() => {
										navigation.navigate('RecipeDetail', {
											recipe: item,
										});
									}}
								/>
							))}
						</View>
					</ScrollView>

					<TouchableOpacity
						style={styles.addButton}
						onPress={() => {
							navigation.navigate('AddRecipe');
						}}
					>
						<Text style={styles.buttonLabel}>+</Text>
					</TouchableOpacity>
				</View>
			)}
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.white,
	},
	titleHello: {
		fontSize: 18,
		color: colors.raisinBlack,
		fontWeight: '600',
	},
	titleQuestion: {
		fontSize: 24,
		color: colors.raisinBlack,
		fontWeight: 'bold',
		marginTop: 10,
	},
	sectionTitleWrapper: {
		flexDirection: 'row',
		margin: 20,
	},
	sectionTitle: {
		flex: 1,
		fontSize: 20,
		fontWeight: 'bold',
		color: colors.raisinBlack,
	},
	sectionSubtitle: {
		fontSize: 16,
		color: colors.primaryOrange,
	},
	addButton: {
		backgroundColor: colors.primaryOrange,
		height: 50,
		width: 50,
		borderRadius: 50,
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
		right: 30,
		bottom: 20,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	buttonLabel: {
		fontSize: 40,
		fontWeight: '300',
		color: colors.white,
	},
	iconBtn: { backgroundColor: colors.white, marginRight: -20 },
});
export default HomeScreen;
