import React, { useLayoutEffect, useEffect } from 'react';
import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	Image,
	Animated,
	TouchableOpacity,
} from 'react-native';
import { Avatar } from 'react-native-paper';
import colors from '../../assets/colors/colors';
import StarRating from '../components/StarRating';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const HEADER_MAX_HEIGHT = 200;
const HEADER_MIN_HEIGHT = 100;

const RecipeDetailScreen = ({ route, navigation }) => {
	const { recipe } = route.params;

	const scrollY = new Animated.Value(0);

	const headerHeight = scrollY.interpolate({
		inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
		outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
		extrapolate: 'clamp',
	});
	const headerOpacity = scrollY.interpolate({
		inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
		outputRange: [0.7, 0.1],
		extrapolate: 'clamp',
	});
	const titleHeaderOpacity = scrollY.interpolate({
		inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
		outputRange: [0, 1],
		extrapolate: 'clamp',
	});
	const headerZindex = scrollY.interpolate({
		inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT, 120],
		outputRange: [0, 0, 1],
		extrapolate: 'clamp',
	});

	useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => {
				return (
					<Ionicons
						name="heart-outline"
						size={25}
						style={{ padding: 10 }}
						color={colors.primaryOrange}
						onPress={() => {
							console.log('add to fav');
						}}
					/>
				);
			},
		});
	}, [navigation]);

	return (
		<View style={{ flex: 1 }}>
			{/** Header animated on scroll */}
			<Animated.View
				style={{
					position: 'absolute',
					top: 0,
					left: 0,
					right: 0,
					backgroundColor: colors.black,
					height: headerHeight,
					elevation: headerZindex,
					alignItems: 'center',
				}}
			>
				<Animated.Image
					source={{ uri: recipe.image }}
					style={{
						height: headerHeight,
						width: '100%',
						opacity: headerOpacity,
					}}
				/>
				<Animated.View
					style={{
						position: 'absolute',
						bottom: 20,
						opacity: titleHeaderOpacity,
					}}
				>
					<Text
						style={{
							color: 'white',
							fontSize: 16,
							fontWeight: 'bold',
						}}
					>
						{recipe.title}
					</Text>
				</Animated.View>
			</Animated.View>

			{/** container */}
			<ScrollView
				style={{
					flex: 1,
					zIndex: -1,
					backgroundColor: colors.white,
					padding: 15,
				}}
				scrollEventThrottle={16}
				onScroll={Animated.event(
					[{ nativeEvent: { contentOffset: { y: scrollY } } }],
					{ useNativeDriver: false }
				)}
				showsVerticalScrollIndicator={false}
			>
				<View
					style={{
						marginTop: HEADER_MAX_HEIGHT,
						backgroundColor: colors.white,
						marginBottom: 30,
					}}
				>
					<View
						style={{
							flexDirection: 'row',
							flexWrap: 'wrap',
							justifyContent: 'space-between',
						}}
					>
						<Text style={{ fontWeight: 'bold', fontSize: 26 }}>
							{recipe.title}
						</Text>
						<TouchableOpacity
							style={{
								flexDirection: 'row',
								justifyContent: 'space-around',
								alignItems: 'center',
								padding: 5,
								borderRadius: 5,
								borderWidth: 1,
								borderColor: colors.wildGray,
							}}
							onPress={() =>
								navigation.navigate('EditRecipe', {
									recipe: recipe,
								})
							}
						>
							<Text style={{ color: colors.wildGray }}>Edit</Text>
							<MaterialIcons
								name="edit"
								size={20}
								color={colors.wildGray}
							/>
						</TouchableOpacity>
					</View>
					<Text
						style={{
							fontWeight: '500',
							fontSize: 16,
							color: colors.tealBlue,
						}}
					>
						{recipe.type}
					</Text>
					<Text style={{ lineHeight: 20, marginTop: 10 }}>
						{recipe.description}
					</Text>

					<TouchableOpacity
						style={styles.authorWrapper}
						onPress={() => navigation.navigate('Profile')}
					>
						<Avatar.Image
							source={{
								uri: 'https://images.unsplash.com/photo-1525134479668-1bee5c7c6845?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
							}}
							size={40}
						/>
						<View style={{ flex: 1, marginLeft: 10 }}>
							<Text
								style={{
									fontSize: 14,
									fontWeight: 'bold',
									color: colors.raisinBlack,
								}}
							>
								Recipe By {recipe.author}
							</Text>
							<Text
								style={{
									fontSize: 12,
									color: colors.raisinBlack,
								}}
							>
								Professional Chef
							</Text>
						</View>
						<Ionicons
							name="chevron-forward"
							size={20}
							color={colors.wildGray}
						/>
					</TouchableOpacity>

					<View style={styles.horizontalLine}></View>
					<View style={{ flexDirection: 'row' }}>
						<Text style={styles.sectionTitle}>Comment</Text>
						<Text
							style={{
								fontSize: 13,
								color: colors.primaryOrange,
							}}
						>
							Write a review
						</Text>
						<Ionicons
							name="chevron-forward"
							size={20}
							color={colors.primaryOrange}
						/>
					</View>
					<View
						style={{ flexDirection: 'row', alignItems: 'center' }}
					>
						<Avatar.Image
							source={{
								uri: 'https://image.winudf.com/v2/image/Y29tLmRzcnRlY2guc2VsZmllY2FtZXJhX3NjcmVlbl81XzE1MjkxNTMyMDZfMDgx/screen-5.jpg?fakeurl=1&type=.jpg',
							}}
							size={40}
						/>
						<View
							style={{
								marginLeft: -15,
								borderWidth: 2,
								borderColor: '#fff',
								borderRadius: 100,
							}}
						>
							<Avatar.Image
								source={{
									uri: 'https://images.unsplash.com/photo-1622651795594-aabc6cf90a54?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzZ8fGhpamFifGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80',
								}}
								size={40}
							/>
						</View>
						<View style={{ marginLeft: 20 }}>
							<StarRating
								ratings={recipe.ratings}
								reviews={recipe.reviews}
							/>
						</View>
					</View>
					<View style={styles.horizontalLine}></View>
					<Text style={styles.sectionTitle}>Ingredients</Text>
					{recipe.ingredients.map((item, index) => (
						<View style={styles.ingredientItem} key={index}>
							<Ionicons
								name="square"
								size={20}
								color={colors.primaryOrange}
								style={{ marginRight: 10 }}
							/>
							<Text style={styles.itemLabel}>{item}</Text>
						</View>
					))}

					<View style={styles.horizontalLine}></View>
					<Text style={styles.sectionTitle}>Directions</Text>
					{recipe.directions.map((step, index) => (
						<View style={styles.directionItem} key={index}>
							<Text style={styles.number}>{index + 1}.</Text>
							<Text style={styles.itemLabel}>{step}</Text>
						</View>
					))}
				</View>
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	horizontalLine: {
		width: '100%',
		height: 2,
		backgroundColor: colors.wildGray,
		opacity: 0.2,
		marginVertical: 20,
	},
	sectionTitleWrapper: {
		flexDirection: 'row',
	},
	sectionTitle: {
		color: colors.raisinBlack,
		fontSize: 18,
		fontWeight: 'bold',
		marginBottom: 10,
		flex: 1,
	},
	ingredientItem: {
		flexDirection: 'row',
		marginBottom: 10,
	},
	itemLabel: {
		flexShrink: 1,
		lineHeight: 20,
	},
	number: {
		fontWeight: 'bold',
		paddingRight: 10,
		color: colors.primaryOrange,
	},
	directionItem: {
		flexDirection: 'row',
		marginBottom: 10,
	},
	authorWrapper: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		backgroundColor: colors.softWhite,
		padding: 10,
		borderRadius: 10,
		alignItems: 'center',
		marginTop: 15,
	},
});

export default RecipeDetailScreen;
