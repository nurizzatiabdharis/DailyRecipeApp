import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import colors from '../../assets/colors/colors';
import StarRating from './StarRating';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { windowWidth } from '../constants/dimensions';

const SmallStarRating = (props) => {
	let stars = [];
	// Set star array
	for (var i = 1; i <= 5; i++) {
		let color = colors.primaryOrange;
		if (i > props.ratings) {
			color = colors.wildGray;
		}
		stars.push(
			<AntDesign
				name="star"
				size={13}
				color={color}
				key={i}
				style={{ marginRight: 5 }}
			/>
		);
	}

	return (
		<View style={{ flexDirection: 'row', alignItems: 'center' }}>
			{stars}
		</View>
	);
};

const RecipeSmallCard = (props) => {
	return (
		<TouchableOpacity
			style={[
				styles.itemWrapper,
				{ marginLeft: props.index === 0 ? 20 : 0 },
			]}
			onPress={props.onPress}
		>
			<Image
				source={{
					uri: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80',
				}}
				style={styles.img}
			/>
			<View style={styles.labelWrapper}>
				<Text style={styles.label}>Mix Pad Thai</Text>
				<SmallStarRating ratings={4.3} />
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	itemWrapper: {
		borderRadius: 10,
		backgroundColor: colors.white,
		width: windowWidth / 2 - 50,
		height: 200,
	},
	img: {
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
		width: '100%',
		height: '70%',
		//height: '20%',
	},
	labelWrapper: {
		padding: 10,
	},
	label: {
		color: colors.darkGray,
		fontSize: 15,
		fontWeight: '600',
		marginBottom: 5,
	},
});

export default RecipeSmallCard;
