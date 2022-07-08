import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ImageBackground,
} from 'react-native'
import colors from '../../assets/colors/colors';
import StarRating from './StarRating';

const RecipeBigCard = (props) => {
    return (
        <TouchableOpacity
            style={[styles.itemWrapper, { marginLeft: (props.index === 0) ? 20 : 0 }]}
            onPress={props.onPress} >
            <ImageBackground source={{ uri: props.item.image }} style={styles.imageBackground}>
                <View style={styles.blackBackground}></View>
                <View style={styles.labelWrapper}>
                    <Text style={styles.label}>{props.item.title}</Text>
                    <StarRating ratings={props.item.ratings} reviews={props.item.reviews} />
                </View>
            </ImageBackground>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    itemWrapper: {
        borderRadius: 20,
        backgroundColor: colors.raisinBlack,
        overflow: 'hidden',
    },
    imageBackground: {
        width: 200,
        height: 300,
    },
    blackBackground: {
        backgroundColor: colors.raisinBlack,
        opacity: 0.6,
        height: '100%'
    },
    labelWrapper: {
        position: 'absolute',
        bottom: 30,
        marginLeft: 10,
    },
    label: {
        color: colors.white,
        fontSize: 30,
        fontWeight: '500',
    },
});

export default RecipeBigCard
