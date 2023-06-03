import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    Pressable,
} from 'react-native'
import Constants from '../../../shared/Constants'
import Feather from 'react-native-vector-icons/Feather'
import globatStyles from '../../../shared/globatStyles'

const PaymentSuccess = ({navigation})=>{
    const gotoCategory = ()=>{
        navigation.navigate('/category')
    }
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={Constants.colors.primaryColor} />
            <View style={styles.middleContant}>
                <View style={styles.circle}>
                    <Feather name='check' size={35} color={Constants.colors.whiteColor} />
                </View>
                <Text style={styles.successHeading}>Payment successful</Text>
                <Text style={styles.successText}>
                    It Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut . It Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut . It Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut .
                </Text>
                <Pressable onPress={gotoCategory} style={[globatStyles.button, {backgroundColor: Constants.colors.whiteColor, marginTop: 40,}]}>
                    <Text style={[globatStyles.btnText, { color: Constants.colors.primaryColor }]}>Continue</Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Constants.colors.primaryColor,
    },
    middleContant: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: Constants.padding,
    },
    circle:{
        padding: 35,
        backgroundColor: 'rgba(255,255,255,0.6)',
        borderRadius: 100,
    },
    successHeading: {
        fontFamily: Constants.fontFamily,
        fontSize: 22,
        color: Constants.colors.whiteColor,
        marginTop: Constants.margin,
        marginBottom: Constants.margin,
    },
    successText: {
        fontFamily: Constants.fontFamily,
        color: Constants.colors.whiteColor,
    },
})

export default PaymentSuccess