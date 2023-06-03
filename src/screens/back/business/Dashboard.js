import React, { useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Image,
    Pressable,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import OTPTextInput from 'react-native-otp-textinput'
import Constants from '../../../shared/Constants'
import globatStyles from '../../../shared/globatStyles'
import Images from '../../../assets/images/Images'

const Dashboard = ()=>{
    const navigation = useNavigation()

    return (
        <View style={styles.wrapper}>
            <Text>Business Dashboard</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    wrapper: {
        padding: 20,
        paddingTop: 28,
        flex: 1,
        backgroundColor: Constants.colors.bodyBg,
    },
   
})


export default Dashboard