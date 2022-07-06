import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/navigation/StackNavigator';
import messaging from '@react-native-firebase/messaging';

function App() {

  useEffect(async () => {
    try {
      const token = await messaging().getToken();
      console.log('Fcm token received : ', token)
    } catch (error) {
      console.log(error)
    }
  }, [])

  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}

export default App;