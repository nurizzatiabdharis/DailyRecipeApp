import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import AddRecipeScreen from './src/screens/AddRecipeScreen';
import RecipeDetailScreen from './src/screens/RecipeDetailScreen';
import ListScreen from './src/screens/ListScreen';
import EditRecipeScreen from './src/screens/EditRecipeScreen';

import colors from './assets/colors/colors';
const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerBackTitleVisible: false,
          headerTintColor: colors.primaryOrange,
          headerStyle: {
            backgroundColor: colors.white,
            shadowColor: 'transparent'
          },
          gestureEnabled: false
        }}>
        <Stack.Screen name="Login" component={LoginScreen}
          options={{
            headerShown: false
          }} />
        <Stack.Screen name="Home" component={HomeScreen}
          options={{
            headerShown: false
          }} />
        <Stack.Screen name="AddRecipe" component={AddRecipeScreen}
          options={{
            headerShown: true,
            headerTitle: 'Add New Recipe'
          }} />
        <Stack.Screen name="List" component={ListScreen}
          options={{
            headerShown: true,
            headerTitle: '',
            headerStyle: {
              backgroundColor: colors.primaryOrange,
              shadowColor: 'transparent',
            },
            headerTintColor: colors.white,
          }} />
        <Stack.Screen name="RecipeDetail" component={RecipeDetailScreen}
          options={{
            headerTransparent: true,
            title: '',
          }} />
        <Stack.Screen name="EditRecipe" component={EditRecipeScreen}
          options={{
            //headerShown: false,
            title: 'Edit Recipe',
          }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;