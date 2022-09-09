import { Dimensions, Platform, StatusBar } from 'react-native';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const SafeStatusBar = Platform.select({
	ios: 44,
	android: StatusBar.currentHeight,
});

export { windowHeight, windowWidth, SafeStatusBar };
