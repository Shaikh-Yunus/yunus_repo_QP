import React, { useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Pressable,
    TextInput,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Constants from '../../../shared/Constants'
import globatStyles from '../../../shared/globatStyles'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const  OtherDetails=()=>{
    const [showPass, setShowPass] = useState(false)
    const [showConPass, setShowConPass] = useState(false)
    const navigation = useNavigation()
    const gotoProduct = ()=>{
        
        navigation.navigate('/advertiser-product')

    }
    return (
        <View style={styles.wrapper}>
            <Text style={styles.heading}>Other Details</Text>
            <Text style={styles.subHeading}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut .</Text>
            <TextInput placeholder='Account Number' style={globatStyles.inputText} />
            <TextInput placeholder='IFSC Code' style={globatStyles.inputText} />
            <TextInput placeholder='Email Address' style={globatStyles.inputText} />
            <View style={{width: '100%', alignItems: 'center',}}>
                <TextInput style={[globatStyles.inputText, {width: '100%'}]} placeholder='Password' secureTextEntry={!showPass} />
                <FontAwesome name={showPass?'eye-slash':'eye'} style={styles.eyeIcon} onPress={()=>setShowPass(!showPass)} />
            </View>
            <View style={{width: '100%', alignItems: 'center',}}>
                <TextInput style={[globatStyles.inputText, {width: '100%'}]} placeholder='Confirm Password' secureTextEntry={!showConPass} />
                <FontAwesome name={showConPass?'eye-slash':'eye'} style={styles.eyeIcon} onPress={()=>setShowConPass(!showConPass)} />
            </View>
            <Pressable style={globatStyles.button} onPress={gotoProduct}><Text style={globatStyles.btnText}>Next</Text></Pressable>
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
    heading: {
        fontSize: 24,
        fontFamily: Constants.fontFamily,
        fontWeight: '800',
        marginTop: 12,
    },
    subHeading: {
        fontSize: 14,
        fontFamily: Constants.fontFamily,
        marginTop: 18,
        marginBottom: Constants.padding,
    },
    eyeIcon: {
        position: 'absolute',
        top: 12,
        right: 12,
        color: '#999999',
        fontSize: 24,
    },
})
export default OtherDetails