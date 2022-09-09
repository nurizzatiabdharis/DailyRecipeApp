import React, { useState, useEffect } from 'react';
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	ScrollView,
	TextInput,
	Platform,
	KeyboardAvoidingView,
	Alert,
} from 'react-native';
import colors from '../../assets/colors/colors';
import Button from '../components/PrimaryButton';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import RNPickerSelect from 'react-native-picker-select';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { parseString } from 'react-native-xml2js';
import { Formik } from 'formik';

const addIngredient = () => '';

const addDirection = () => '';

const AddRecipeScreen = ({ navigation }) => {
	const [count, setcount] = useState(1);
	const [pickerData, setPickerData] = useState([]);

	useEffect(() => {
		getRecipeType();
	}, []);

	const getRecipeType = async () => {
		try {
			const value = await AsyncStorage.getItem('@recipeType');
			if (value !== null) {
				parseString(value, (_, result) => {
					{
						/** Set picker Data */
					}
					result.recipe.type.map((item, index) => {
						setPickerData((pickerData) => [
							...pickerData,
							{ label: item['name'][0], value: item['name'][0] },
						]);
					});
				});
			}
		} catch (e) {
			console.log('Error get recipeType data : ', e);
		}
	};

	const initialValues = {
		title: '',
		description: '',
		type: '',
		serving: 1,
		ingredients: [''],
		directions: [''],
		// these info are provided by default just for simplification
		author: 'Izzati Haris',
		image: 'https://img.cuisineaz.com/660x660/2021/04/27/i168679-shutterstock-302939660.jpeg',
		id: Math.random(),
		ratings: 0,
		reviews: 0,
		time: 20,
	};

	const publishRecipe = (values) => {
		values.servings = count;
		storeNewRecipe(values);
		Alert.alert('Recipe publish!', 'Thank you for your new recipe', [
			{ text: 'OK', onPress: () => console.log('OK Pressed') },
		]);
	};

	const storeNewRecipe = async (newRecipe) => {
		let updatedList = [];
		try {
			const value = await AsyncStorage.getItem('@listRecipe');
			if (value !== null) {
				updatedList = JSON.parse(value);
				updatedList.push(newRecipe); // insert new obj
				await AsyncStorage.setItem(
					'@listRecipe',
					JSON.stringify(updatedList)
				);
				navigation.navigate('Home');
			}
		} catch (e) {
			console.log('Error get listRecipe data : ', e);
		}
	};

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			style={styles.container}
		>
			<ScrollView showsVerticalScrollIndicator={false}>
				<Formik
					initialValues={initialValues}
					onSubmit={(values) => publishRecipe(values)}
				>
					{({
						handleChange,
						handleBlur,
						handleSubmit,
						values,
						setFieldValue,
					}) => (
						<View style={{ marginBottom: 30 }}>
							{/**  Photo */}
							<View style={styles.uploadPhotoWrapper}>
								<Icon name="cloud-upload" size={50} />
								<Text
									style={{ fontSize: 16, fontWeight: '500' }}
								>
									Upload Photo
								</Text>
							</View>

							{/**  Title */}
							<TextInput
								placeholder="Recipe name"
								style={styles.recipename}
								value={values.title}
								onChangeText={handleChange(`title`)}
								placeholderTextColor={colors.placeholderColor}
							/>

							{/**  Description */}
							<TextInput
								placeholder="Description of your recipe"
								style={[
									styles.stepInput,
									{
										height: 100,
										paddingTop: 20,
										textAlignVertical: 'top', //for Android
									},
								]}
								multiline={true}
								autoCorrect={false}
								value={values.description}
								onChangeText={handleChange(`description`)}
								placeholderTextColor={colors.placeholderColor}
							/>

							{/**  Type */}
							<View style={styles.sectionWrapper}>
								<Text style={styles.sectionLabel}>Type</Text>
								<TouchableOpacity style={[styles.input]}>
									<RNPickerSelect
										placeholder={{
											label: 'Select type',
											value: 'No type',
										}}
										value={values.type}
										onValueChange={handleChange(`type`)}
										items={pickerData}
										style={{
											chevronDown: {
												display: 'none',
											},
											chevronUp: {
												display: 'none',
											},
											inputAndroid: {
												color: colors.raisinBlack,
											},
											iconContainer: {
												marginRight: 10,
												marginVertical:
													Platform.OS === 'android'
														? 15
														: 0,
											},
										}}
										Icon={() => {
											return (
												<Icon
													name="chevron-down"
													size={24}
													color={colors.gray}
												/>
											);
										}}
									/>
								</TouchableOpacity>
							</View>

							{/**  Servings */}
							<View style={styles.sectionWrapper}>
								<Text style={styles.sectionLabel}>
									Servings
								</Text>
								<View style={styles.servingItemWrapper}>
									<Ionicons
										name="add-circle"
										color={colors.primaryOrange}
										size={25}
										onPress={() => {
											setcount(count + 1);
										}}
									/>
									<View style={styles.servingItem}>
										<Text>{count}</Text>
									</View>
									<Icon
										name="minus-circle"
										color={colors.primaryOrange}
										size={25}
										onPress={() => setcount(count - 1)}
									/>
								</View>
							</View>

							{/**  Ingredients */}
							<View style={styles.horizontalLine}></View>
							<Text
								style={[
									styles.sectionLabel,
									{ marginBottom: 15 },
								]}
							>
								Ingredient
							</Text>
							{values.ingredients.map(({ label }, index) => (
								<View
									key={index}
									style={[
										styles.ingredientInput,
										{ flexDirection: 'row' },
									]}
								>
									<TextInput
										onChangeText={handleChange(
											`ingredients[${index}]`
										)}
										onBlur={handleBlur(
											`ingredients[${index}]`
										)}
										value={values.ingredients[index]}
										style={styles.inputText}
										placeholder="Ingredient..."
									/>
									<FontAwesome
										name="remove"
										size={20}
										color={colors.wildGray}
										onPress={() => {
											values.ingredients.splice(index, 1);
											setFieldValue('ingredients', [
												...values.ingredients,
											]);
										}}
									/>
								</View>
							))}
							<TouchableOpacity
								style={styles.addButtonWrapper}
								onPress={() =>
									setFieldValue('ingredients', [
										...values.ingredients,
										addIngredient(),
									])
								}
							>
								<Ionicons
									name="add-circle"
									color={colors.primaryOrange}
									size={25}
									style={{ marginRight: 10 }}
								/>
								<Text
									style={{
										fontSize: 16,
										fontWeight: '500',
										color: colors.primaryOrange,
									}}
								>
									Add ingredient
								</Text>
							</TouchableOpacity>

							{/**  Directions */}
							<View style={styles.horizontalLine}></View>
							<Text
								style={[
									styles.sectionLabel,
									{ marginBottom: 15 },
								]}
							>
								Cooking directions
							</Text>
							{values.directions.map(({ label }, index) => (
								<View
									key={index}
									style={[
										styles.ingredientInput,
										{ flexDirection: 'row' },
									]}
								>
									<TextInput
										onChangeText={handleChange(
											`directions[${index}]`
										)}
										onBlur={handleBlur(
											`directions[${index}]`
										)}
										value={values.directions[index]}
										style={styles.inputText}
										placeholder="Directions..."
									/>
									<FontAwesome
										name="remove"
										size={20}
										color={colors.wildGray}
										onPress={() => {
											values.directions.splice(index, 1);
											setFieldValue('directions', [
												...values.directions,
											]);
										}}
									/>
								</View>
							))}
							<TouchableOpacity
								style={styles.addButtonWrapper}
								onPress={() =>
									setFieldValue('directions', [
										...values.directions,
										addDirection(),
									])
								}
							>
								<Ionicons
									name="add-circle"
									color={colors.primaryOrange}
									size={25}
									style={{ marginRight: 10 }}
								/>
								<Text
									style={{
										fontSize: 16,
										fontWeight: '500',
										color: colors.primaryOrange,
									}}
								>
									Add ingredient
								</Text>
							</TouchableOpacity>

							<Button
								onPress={handleSubmit}
								label="Publish Recipe"
							/>
						</View>
					)}
				</Formik>
			</ScrollView>
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.white,
		padding: 20,
	},
	name: {
		fontSize: 24,
		fontWeight: 'bold',
		color: colors.raisinBlack,
		marginBottom: 20,
	},
	uploadPhotoWrapper: {
		borderWidth: 2,
		borderColor: colors.primaryOrange,
		borderStyle: 'dashed',
		padding: 10,
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 15,
		borderRadius: 10,
		backgroundColor: colors.softWhite,
	},
	recipename: {
		backgroundColor: colors.softWhite,
		padding: 20,
		borderRadius: 10,
		marginBottom: 10,
	},
	stepInput: {
		backgroundColor: colors.softWhite,
		marginRight: 15,
		borderRadius: 10,
		padding: 15,
		marginBottom: 10,
		width: '100%',
	},
	sectionWrapper: {
		flexDirection: 'row',
		alignItems: 'center',
		marginVertical: 10,
	},
	servingItem: {
		paddingHorizontal: 40,
		paddingVertical: 15,
		backgroundColor: colors.softWhite,
		marginHorizontal: 30,
		borderRadius: 10,
	},
	servingItemWrapper: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	sectionLabel: {
		fontSize: 16,
		fontWeight: 'bold',
		color: colors.raisinBlack,
		flexGrow: 1,
	},
	horizontalLine: {
		width: '100%',
		height: 2,
		backgroundColor: colors.wildGray,
		opacity: 0.2,
		marginVertical: 20,
	},
	input: {
		justifyContent: 'center',
		borderRadius: 5,
		paddingVertical: Platform.OS === 'ios' ? 15 : 0,
		backgroundColor: colors.softWhite,
		width: '60%',
		paddingLeft: 15,
		borderRadius: 10,
		color: colors.black,
	},
	inputText: {
		flex: 1,
		fontSize: 16,
		color: colors.raisinBlack,
	},
	ingredientItemWrapper: {
		flexDirection: 'row',
		marginBottom: 10,
	},
	ingredientInput: {
		backgroundColor: colors.softWhite,
		marginRight: 15,
		borderRadius: 10,
		padding: 15,
	},
	addButtonWrapper: {
		borderWidth: 2,
		borderColor: colors.primaryOrange,
		borderStyle: 'dashed',
		padding: 10,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 15,
		borderRadius: 10,
	},
	ingredientInput: {
		backgroundColor: colors.softWhite,
		borderRadius: 10,
		padding: 10,
		marginBottom: 10,
		width: '100%',
	},
	addButtonWrapper: {
		borderWidth: 2,
		borderColor: colors.primaryOrange,
		borderStyle: 'dashed',
		padding: 10,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 10,
		marginBottom: 15,
	},
});
export default AddRecipeScreen;
