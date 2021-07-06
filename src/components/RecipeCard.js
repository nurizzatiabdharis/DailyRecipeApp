import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
} from 'react-native'
import colors from '../../assets/colors/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

Ionicons.loadFont();
MaterialIcons.loadFont();

const RecipeCard = (props) => {
    return (
        <TouchableOpacity style={styles.itemWrapper} onPress={props.onPress}>
            <Image
                source={{ uri: props.item.image }}
                style={styles.image} />
            <View style={styles.descriptionWrapper}>
                <Text style={styles.title}>{props.item.title}</Text>
                <Text style={styles.subtitle}>{props.item.type}</Text>
                <View style={styles.ratingWrapper}>
                    <AntDesign name="star" size={18} color={colors.primaryOrange} style={{ marginRight: 5 }} />
                    <Text style={styles.ratingsLabel}>{props.item.ratings} ({props.item.reviews})</Text>
                </View>
                <View style={styles.labelWrapper}>
                    <View style={[styles.labelItemWrapper, { marginRight: 20 }]}>
                        <Ionicons name="time-outline" color={colors.gray} size={18} />
                        <Text style={styles.label}>{props.item.time} min</Text>
                    </View>
                    <View style={styles.labelItemWrapper}>
                        <Ionicons name="restaurant-outline" color={colors.gray} size={18} />
                        <Text style={styles.label}>{props.item.serving} Serving</Text>
                    </View>
                </View>
            </View>
            <Ionicons name="heart-outline" size={20} style={{ padding: 10 }} color={colors.wildGray} />
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    itemWrapper: {
        flexDirection: 'row',
        backgroundColor: colors.softWhite,
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 10,
    },
    image: {
        width: 100,
        height: '100%',
    },
    descriptionWrapper: {
        flex: 1,
        padding: 10,
        flexDirection: 'column',
        justifyContent: 'space-evenly'
    },
    title: {
        fontSize: 16,
        color: colors.raisinBlack,
        fontWeight: '600',
    },
    subtitle: {
        fontSize: 12,
        color: colors.tealBlue,
        fontWeight: '500',
    },
    ratingWrapper: {
        flexDirection: 'row',
        marginVertical: 10,
    },
    label: {
        fontSize: 12,
        color: colors.wildGray,
        fontWeight: '500',
    },
    labelWrapper: {
        flexDirection: 'row'
    },
    labelItemWrapper: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    ratingsLabel: {
        fontSize: 12,
        color: colors.raisinBlack,
        fontWeight: '500',
    },
});
export default RecipeCard