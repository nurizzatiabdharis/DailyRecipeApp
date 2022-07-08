import React from 'react';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../../assets/colors/colors';

AntDesign.loadFont();

const StarRating = (props) => {
    let stars = [];
    // Set star array 
    for (var i = 1; i <= 5; i++) {
        let color = colors.primaryOrange;
        if (i > props.ratings) {
            color = colors.wildGray;
        }
        stars.push((<AntDesign name="star" size={18} color={color} key={i} style={{ marginRight: 5 }} />));
    }

    return (
        <View>
            <View style={styles.starWrapper}>
                {stars}
            </View>
            <View style={styles.starWrapper}>
                <Text style={styles.ratingsLabel}>{props.ratings}</Text>
                <Text style={styles.text}>({props.reviews} Reviews)</Text>
            </View>
        </View>
    );

}

const styles = StyleSheet.create({
    starWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingsLabel: {
        fontSize: 16,
        color: colors.primaryOrange,
    },
    text: {
        fontSize: 14,
        marginLeft: 10,
        color: colors.wildGray,
    },
});

export default StarRating;
