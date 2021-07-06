import React, { useState, useEffect, useRef } from 'react'
import {
    View,
    Text,
    ImageBackground,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Platform,
    KeyboardAvoidingView,
} from 'react-native'
import colors from '../../assets/colors/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Formik } from 'formik';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { parseString } from 'react-native-xml2js';

Icon.loadFont();

const LoginScreen = ({ navigation }) => {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [secure, setSecure] = useState(true);
    const [recipeList, setRecipeList] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        let unmounted = false;
        (async () => {
            getUser();
            requestRecipeData();
        })();
        return () => {
            unmounted = true;
        };
    }, []);

    const logIn = async (values) => {
        try {
            await AsyncStorage.setItem('username', values.login)
            await AsyncStorage.setItem('password', values.password)
            navigation.navigate('Home')
        } catch (err) {
            console.log(err)
        }
    }

    const getUser = async () => {
        try {
            const username = await AsyncStorage.getItem('username')
            const password = await AsyncStorage.getItem('password')
            if (username !== null) {
                setLogin(username)
            }
            if (password !== null) {
                setPassword(password)
            }
        } catch (err) {
            console.log(err)
        }
    }

    const requestRecipeData = async () => {
        {/** Request All Recipe Data */ }
        var listRecepiUrl = 'https://gist.githubusercontent.com/nurizzatiabdharis/b1cddb9d13766f9d36a1c3f31801eada/raw/ca620420eec4d8b05cdbc8a670ed8f0f2ff6b2de/recipelist.xml'
        await fetch(listRecepiUrl)
            .then((response) => response.text())
            .then(async (responseText) => {
                let myArray = [];
                parseString(responseText, (_, result) => {
                    result.cookbook.recipe.map((item, index) => {
                        let recipe = {
                            id: index,
                            title: item["title"][0],
                            description: item["description"][0],
                            time: item["time"][0],
                            image: item["image"][0]["$"]["url"],
                            type: item["type"][0],
                            serving: item["serving"][0],
                            author: item["author"][0],
                            ratings: item["ratings"][0],
                            reviews: item["reviews"][0],
                            ingredients: item["ingredients"][0]["label"],
                            directions: item["directions"][0]["step"],
                        }
                        myArray.push(recipe);
                    })
                });
                await AsyncStorage.setItem('@listRecipe', JSON.stringify(myArray));
            })
            .catch((error) => {
                console.log('Error fetching : ', error);
            })
            .finally(() => setLoading(false));
    }

    return (
        <View style={styles.container}>
            <ImageBackground source={require('../../assets/images/loginbackground.jpeg')}
                style={styles.background} >
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                >
                    <Text style={styles.title}>
                        Daily Recipe
                    </Text>
                    <Text style={styles.subtitle}>
                        Cooking is now easy
                    </Text>

                    <Formik
                        enableReinitialize={true}
                        initialValues={{ login: login, password: password }}
                        onSubmit={values => { logIn(values) }}
                    >
                        {({ handleChange, handleSubmit, values }) => (
                            <>
                                <View style={styles.inputWrapper}>
                                    <Icon name="account-outline" size={25} color={colors.placeholderColor} />
                                    <TextInput
                                        value={values.login}
                                        placeholder="Username"
                                        placeholderTextColor={colors.placeholderColor}
                                        style={styles.input}
                                        onChangeText={handleChange('login')}
                                        autoCorrect={false}
                                    />
                                </View>
                                <View style={styles.inputWrapper}>
                                    <Icon name="lock-outline" size={25} color={colors.placeholderColor} />
                                    <TextInput
                                        value={values.password}
                                        placeholder="Password"
                                        placeholderTextColor={colors.placeholderColor}
                                        style={styles.input}
                                        onChangeText={handleChange('password')}
                                        secureTextEntry={secure}
                                        autoCorrect={false}
                                    />
                                    <Icon
                                        name={secure ? 'eye-off-outline' : "eye-outline"}
                                        size={25}
                                        color={colors.placeholderColor}
                                        onPress={() => setSecure(!secure)} />
                                </View>
                                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                                    <Text style={styles.labelBtn}>
                                        Login
                                    </Text>
                                </TouchableOpacity>
                            </>
                        )}
                    </Formik>
                </KeyboardAvoidingView>
            </ImageBackground>

        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        padding: 25,
    },
    title: {
        color: colors.white,
        fontSize: 40,
    },
    subtitle: {
        fontSize: 18,
        color: colors.silverWhite,
        marginBottom: 50,
    },
    inputWrapper: {
        flexDirection: 'row',
        paddingVertical: (Platform.OS === 'ios') ? 15 : 0,
        paddingHorizontal: (Platform.OS === 'ios') ? 10 : 5,
        borderRadius: 5,
        marginVertical: 10,
        alignItems: 'center',
        marginVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: colors.placeholderColor,
        backgroundColor: 'rgba(52, 52, 52, 0.5)'
    },
    input: {
        flex: 1,
        fontSize: 18,
        paddingLeft: 10,
        color: colors.white,
    },
    button: {
        backgroundColor: colors.primaryOrange,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        height: 50,
        marginTop: 50,
    },
    labelBtn: {
        color: colors.silverWhite,
        fontWeight: 'bold',
        fontSize: 18,
    },
    text: {
        fontSize: 16,
        color: colors.silverWhite,
        alignSelf: 'center',
        marginTop: 10,
    },
});
export default LoginScreen
