import React, { useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    Pressable,
} from 'react-native'
import Images from '../../../assets/images/Images'
import Constants from '../../../shared/Constants'

const RenderBusinessList = () => {
    
    return (
        <View style={styles.container}>
            <View style={styles.headingLine}>
                <View style={{flexDirection: 'row',}}>
                    <View style={styles.barndIcon}>
                        <Image source={Images.nike} />
                    </View>
                    <View>
                        {/* <Text style={{fontFamily: Constants.fontFamily, fontSize: 18, fontWeight: '700',}}>Robert Phan</Text> */}
                        <Text style={{fontFamily: Constants.fontFamily, color: '#A4A4B2'}}>Fashion</Text>
                    </View>
                </View>
                <Text style={{fontFamily: Constants.fontFamily,fontWeight: '700',}}>24M Followers</Text>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{width: '70%'}}>
                    <Text style={{fontFamily: Constants.fontFamily, fontSize: 15, textTransform: 'uppercase', marginTop: 8, marginBottom: 6,}}>Lorem Ipsum Dolor SIt</Text>
                    <Text style={{fontFamily: Constants.fontFamily, fontSize: 12,}}>consectetur adipiscing elit, sed do smod tempor incididunt ut  Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.ipsum dolor sit amet. Lorem ipsum dolor sit amet.ipsum dolor sit amet.</Text>
                </View>
                <View>
                    <Image source={Images.business} />
                </View>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',}}>
                <Text style={{fontFamily: Constants.fontFamily, fontSize: 12, color: '#747474', marginTop: 12,}}>Started on: 12/08/2021</Text>
                <Text style={{fontFamily: Constants.fontFamily, fontSize: 12, color: '#747474', marginTop: 10,}}>ending on: 12/09/2021</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Constants.colors.whiteColor,
        padding: 12,
        marginTop: 12,
        borderRadius: Constants.borderRadius,
        paddingBottom: Constants.padding+12,
    },
    headingLine: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    barndIcon: {
        width: 48,
        height: 48,
        backgroundColor: '#000000',
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
})

export default RenderBusinessList