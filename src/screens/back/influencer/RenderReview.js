import React from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
} from 'react-native'
import Constants from '../../../shared/Constants'
import Images from '../../../assets/images/Images'

const RenderReview=({item})=>{
    return (
        <View style={styles.container}>
            <View style={styles.avatarAndName}>
                <Image source={Images.avatar} />
                <View style={{marginLeft: 12,}}>
                    <Text style={styles.name}>Robert Phan</Text>
                    <Text style={styles.designation}>Designer</Text>
                </View>
            </View>
            <Text style={styles.reviewText}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut . Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut .
            </Text>
            <Text style={styles.postedOn}>posted on: 12/08/2021</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Constants.colors.whiteColor,
        padding: Constants.padding,
        marginBottom: 12,
        borderRadius: Constants.borderRadius,
    },
    avatarAndName: {
        flexDirection: 'row',
    },
    name: {
        fontFamily: Constants.fontFamily,
        fontSize: 18,
        fontWeight: '700',
    },
    designation: {
        fontFamily: Constants.fontFamily,
        color: '#A4A4B2',
    },
    reviewText: {
        fontFamily: Constants.fontFamily,
    },
    postedOn: {
        fontFamily: Constants.fontFamily,
        color: '#747474',
        marginTop: 12,
    },
})

export default RenderReview