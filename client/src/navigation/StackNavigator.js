import { View, Text } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
import RegisterScreen from '../screens/RegisterScreen';
import LoginScreen from '../screens/LoginScreen';
import AddRecipeScreen from '../screens/AddRecipeScreen';
import EditRecipeScreen from '../screens/EditRecipeScreen';
import ListScreen from '../screens/ListScreen';
import RecipeDetailScreen from '../screens/RecipeDetailScreen';
import ProfileScreen from '../screens/ProfileScreen';

import colors from '../../assets/colors/colors';

const Stack = createStackNavigator();

const StackNavigator = () => {
	return (
		<Stack.Navigator
			initialRouteName="Login"
			screenOptions={{
				headerBackTitleVisible: false,
				headerTintColor: colors.primaryOrange,
				headerStyle: {
					backgroundColor: colors.white,
					shadowColor: 'transparent',
				},
				gestureEnabled: false,
			}}
		>
			<Stack.Screen
				name="Login"
				component={LoginScreen}
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="Register"
				component={RegisterScreen}
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="Home"
				component={HomeScreen}
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="AddRecipe"
				component={AddRecipeScreen}
				options={{
					headerShown: true,
					headerTitle: 'Add New Recipe',
				}}
			/>
			<Stack.Screen
				name="List"
				component={ListScreen}
				options={{
					headerShown: true,
					headerTitle: '',
					headerStyle: {
						backgroundColor: colors.primaryOrange,
						shadowColor: 'transparent',
					},
					headerTintColor: colors.white,
				}}
			/>
			<Stack.Screen
				name="RecipeDetail"
				component={RecipeDetailScreen}
				options={{
					headerTransparent: true,
					title: '',
				}}
			/>
			<Stack.Screen
				name="EditRecipe"
				component={EditRecipeScreen}
				options={{
					//headerShown: false,
					title: 'Edit Recipe',
				}}
			/>
			<Stack.Screen
				name="Profile"
				component={ProfileScreen}
				options={{
					headerTransparent: true,
					title: '',
				}}
			/>
		</Stack.Navigator>
	);
};

export default StackNavigator;
