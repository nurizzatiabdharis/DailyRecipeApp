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

const RegisterScreen = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [secure, setSecure] = useState(true);
    const [recipeList, setRecipeList] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        let unmounted = false;
        (async () => {
            // getUser();
            // requestRecipeData();
        })();
        return () => {
            unmounted = true;
        };
    }, []);

    const register = (values) => {
        console.log('register', values)
    }


    return (
        <View style={styles.container}>
            <ImageBackground source={require('../../assets/images/loginbackground.jpeg')}
                style={styles.background} >
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                >
                    <Text style={styles.title}>
                        Register
                    </Text>
                    <Text style={styles.subtitle}>
                        Create your account
                    </Text>

                    <Formik
                        enableReinitialize={true}
                        initialValues={{ username: username, email: email, password: password }}
                        onSubmit={values => { register(values) }}
                    >
                        {({ handleChange, handleSubmit, values }) => (
                            <>
                                <View style={styles.inputWrapper}>
                                    <Icon name="account-outline" size={25} color={colors.placeholderColor} />
                                    <TextInput
                                        value={values.username}
                                        placeholder="Username"
                                        placeholderTextColor={colors.placeholderColor}
                                        style={styles.input}
                                        onChangeText={handleChange('username')}
                                        autoCorrect={false}
                                    />
                                </View>
                                <View style={styles.inputWrapper}>
                                    <Icon name="email-outline" size={25} color={colors.placeholderColor} />
                                    <TextInput
                                        value={values.email}
                                        placeholder="Email"
                                        placeholderTextColor={colors.placeholderColor}
                                        style={styles.input}
                                        onChangeText={handleChange('email')}
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
                                        Register
                                    </Text>
                                </TouchableOpacity>
                            </>
                        )}
                    </Formik>
                    <View style={styles.footerWrapper}>
                        <Text style={styles.footerLabel}>Already have an account? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Text style={[styles.footerLabel, { fontWeight: 'bold' }]}>Sign in</Text>
                        </TouchableOpacity>
                    </View>
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
    footerWrapper: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginVertical: 20,
    },
    footerLabel: {
        color: colors.white,
        fontSize: 16
    },
});
export default RegisterScreen
