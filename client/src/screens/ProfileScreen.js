import {
	FlatList,
	Image,
	ImageBackground,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import React from 'react';
import {
	SafeStatusBar,
	windowHeight,
	windowWidth,
} from '../constants/dimensions';
import { Avatar } from 'react-native-paper';
import colors from '../../assets/colors/colors';
import RecipeSmallCard from '../components/RecipeSmallCard';

const listSpecialties = [
	{
		id: '01italian',
		title: 'Italian',
		iconUrl:
			'https://cdn3.iconfinder.com/data/icons/food-155/100/Sea_food-512.png',
	},
	{
		id: '02thai',
		title: 'Thai',
		iconUrl:
			'https://cdn3.iconfinder.com/data/icons/food-155/100/Sea_food-512.png',
	},
	{
		id: '03mexican',
		title: 'Mexican',
		iconUrl:
			'https://cdn3.iconfinder.com/data/icons/food-155/100/Sea_food-512.png',
	},
	{
		id: '04mexican',
		title: 'Mexican',
		iconUrl:
			'https://cdn3.iconfinder.com/data/icons/food-155/100/Sea_food-512.png',
	},
	{
		id: '05mexican',
		title: 'Mexican',
		iconUrl:
			'https://cdn3.iconfinder.com/data/icons/food-155/100/Sea_food-512.png',
	},
];

const listRecipes = [
	{
		id: '01italian',
		title: 'Italian Plat',
		iconUrl:
			'https://cdn3.iconfinder.com/data/icons/food-155/100/Sea_food-512.png',
	},
	{
		id: '02thai',
		title: 'Thai',
		iconUrl:
			'https://cdn3.iconfinder.com/data/icons/food-155/100/Sea_food-512.png',
	},
	{
		id: '03mexican',
		title: 'Mexican',
		iconUrl:
			'https://cdn3.iconfinder.com/data/icons/food-155/100/Sea_food-512.png',
	},
	{
		id: '04mexican',
		title: 'Mexican',
		iconUrl:
			'https://cdn3.iconfinder.com/data/icons/food-155/100/Sea_food-512.png',
	},
	{
		id: '05mexican',
		title: 'Mexican',
		iconUrl:
			'https://cdn3.iconfinder.com/data/icons/food-155/100/Sea_food-512.png',
	},
];

const ProfileScreen = () => {
	const renderSpecialtiesItem = ({ item, index }) => (
		<View style={{ alignItems: 'center' }}>
			<View style={styles.specialtyIconWrapper}>
				<Image
					source={{
						uri: item.iconUrl,
					}}
					style={{
						width: 40,
						height: 40,
					}}
				/>
			</View>
			<Text>{item.title}</Text>
		</View>
	);

	const renderRecipesItem = ({ item, index }) => (
		<RecipeSmallCard
			item={item}
			index={index}
			onPress={() => {
				console.log(item);
			}}
		/>
	);

	return (
		<View style={styles.container}>
			<ImageBackground
				style={styles.backgroundImg}
				source={require('../../assets/images/profilebackground.jpeg')}
				resizeMode="cover"
			>
				<ScrollView
					style={styles.container}
					showsVerticalScrollIndicator={false}
				>
					{/**Chef's photo and info */}
					<View style={styles.headerWrapper}>
						<View style={styles.avatarWrapper}>
							<Avatar.Image
								source={{
									uri: 'https://images.unsplash.com/photo-1525134479668-1bee5c7c6845?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
								}}
								size={80}
							/>
						</View>
						<View style={styles.infoWrapper}>
							<Text style={styles.name}>Alexis Thomas</Text>
							<Text style={styles.profession}>
								Part Time Professional Chef
							</Text>
							<Text style={styles.quotes}>
								"A recipe has no soul. You as the cook must
								bring soul to the recipe."
							</Text>
							<View style={styles.verticleLine}></View>
							<View style={styles.infoFooter}>
								<View style={styles.nblabelWrapper}>
									<Text style={styles.numbers}>1,320 </Text>
									<Text style={styles.nbLabel}>
										Followers
									</Text>
								</View>
								<View style={styles.nblabelWrapper}>
									<Text style={styles.numbers}>120 </Text>
									<Text style={styles.nbLabel}>
										Following
									</Text>
								</View>
							</View>
						</View>
					</View>

					{/**Specialties*/}
					<View style={styles.sectionWrapper}>
						<Text style={styles.sectionTitle}>SPECIALTIES</Text>
						<FlatList
							horizontal
							data={listSpecialties}
							renderItem={renderSpecialtiesItem}
							keyExtractor={(item) => item.id}
							showsHorizontalScrollIndicator={false}
							ItemSeparatorComponent={() => (
								<View style={{ width: 8 }} />
							)}
						/>
					</View>

					{/**Top Recipe*/}
					<View
						style={[styles.sectionWrapper, { paddingBottom: 50 }]}
					>
						<Text style={styles.sectionTitle}>
							CASSANDRA'S TOP RECIPES
						</Text>
						<FlatList
							horizontal
							data={listRecipes}
							renderItem={renderRecipesItem}
							keyExtractor={(item) => item.id}
							showsHorizontalScrollIndicator={false}
							ItemSeparatorComponent={() => (
								<View style={{ width: 8 }} />
							)}
							style={{
								marginLeft: -20,
								//backgroundColor: colors.tealBlue,
							}}
						/>
					</View>
				</ScrollView>
			</ImageBackground>
			<TouchableOpacity
				style={styles.btnWrapper}
				onPress={() => console.log('follow chef')}
			>
				<Text style={styles.btnLabel}>FOLLOW</Text>
			</TouchableOpacity>
		</View>
	);
};

export default ProfileScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	backgroundImg: {
		flex: 1,
		width: windowWidth,
		height: 0.35 * windowHeight,
	},
	headerWrapper: {
		alignItems: 'center',
		//backgroundColor: 'yellow',
		marginTop: SafeStatusBar + 40,
		marginBottom: 20,
	},
	infoWrapper: {
		backgroundColor: colors.white,
		width: windowWidth - 40,
		marginTop: 10,
		padding: 15,
		borderRadius: 10,
		alignItems: 'center',
		shadowColor: colors.gray,
		shadowOffset: {
			width: 10,
			height: 12,
		},
		shadowOpacity: 0.58,
		shadowRadius: 16.0,
		elevation: 24,
	},
	avatarWrapper: {
		backgroundColor: colors.white,
		padding: 3,
		borderRadius: 80,
		borderWidth: 1,
		borderColor: colors.primaryOrange,
	},
	name: {
		fontSize: 18,
		fontWeight: '600',
		color: colors.darkGray,
		marginBottom: 10,
	},
	profession: {
		fontSize: 12,
		fontWeight: '400',
		color: colors.mediumGray,
		marginBottom: 10,
	},
	quotes: {
		fontSize: 13,
		fontWeight: '500',
		color: colors.primaryOrange,
		textAlign: 'center',
		fontStyle: 'italic',
	},
	numbers: {
		fontSize: 12,
		fontWeight: '500',
		color: colors.darkGray,
		marginBottom: 5,
	},
	nbLabel: {
		fontSize: 12,
		fontWeight: '500',
		color: colors.mediumGray,
		marginBottom: 5,
	},
	verticleLine: {
		height: 1,
		width: '80%',
		backgroundColor: colors.silverWhite,
		marginVertical: 15,
	},
	infoFooter: {
		flexDirection: 'row',
	},
	nblabelWrapper: {
		flexDirection: 'row',
		marginRight: 10,
	},
	sectionWrapper: {
		marginLeft: 20,
		marginBottom: 30,
	},
	specialtyIconWrapper: {
		backgroundColor: colors.white,
		padding: 20,
		borderRadius: 50,
		borderWidth: 2,
		borderColor: colors.silverWhite,
		marginBottom: 5,
	},
	sectionTitle: {
		fontSize: 16,
		fontWeight: '400',
		color: colors.darkGray,
		marginBottom: 10,
	},
	btnWrapper: {
		position: 'absolute',
		bottom: 0,
		width: windowWidth,
		backgroundColor: colors.primaryOrange,
		padding: 25,
	},
	btnLabel: {
		textAlign: 'center',
		fontSize: 15,
		fontWeight: '600',
		color: colors.white,
	},
});
