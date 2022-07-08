import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import colors from '../../assets/colors/colors'

const PrimaryButton = (props) => {
    return (
        <TouchableOpacity style={styles.button}
            onPress={props.onPress}>
            <Text style={styles.labelBtn}>
                {props.label}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
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
});
export default PrimaryButton
