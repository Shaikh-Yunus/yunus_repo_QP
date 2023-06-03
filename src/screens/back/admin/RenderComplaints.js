import React, { useState } from 'react'
import {
    View,
    StyleSheet,
    Text,
    Image,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Constants from '../../../shared/Constants'
import Images from '../../../assets/images/Images'

const RenderComplaints = (props) => {
    const navigation = useNavigation()

    return (
        <View style={styles.container}>
            <Image source={Images.avatar} />
            <View style={{flex: 1,}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginStart: 12,}}>
                    <View style={{flexDirection: 'row', alignItems: 'center',}}>
                        <Text style={{fontFamily: Constants.fontFamily, fontWeight: '700',}}>Mark Soel</Text>
                        <Text style={{fontFamily: Constants.fontFamily, padding: 4, backgroundColor: 'rgba(0, 169, 40, 0.14)', marginStart: 12, color: Constants.colors.primaryColor, borderRadius: Constants.borderRadius,}}>Explore</Text>
                        <Text style={{fontFamily: Constants.fontFamily, color: 'rgba(0,0,0,0.6)', marginStart: 60,}}>45 mins ago</Text>
                    </View>                
                </View>
                <Text style={{fontFamily: Constants.fontFamily, fontSize: 18,marginStart: 12,}}>mark.soel34@gmail.com</Text>
                <Text style={{fontFamily: Constants.fontFamily,marginStart: 12, }}>
                    Description goes here and it ca goes here and it ca goes here and it ca nbe very...
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: Constants.padding,
        marginTop: 3,
        backgroundColor: Constants.colors.whiteColor,
        flexDirection: 'row',
    },

})

export default RenderComplaints