import React, { useState } from 'react'
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TextInput,
    Pressable,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import CustomAppBar from '../../components/business/CustomAppBar'
import Constants from '../../shared/Constants'
import globatStyles from '../../shared/globatStyles'
import Entypo from 'react-native-vector-icons/Entypo'

const ChangePassword = (props) => {
    const [passwordNewEye, setPasswordNewEye] = useState(false)
    const [passwordConfirmEye, setPasswordConfirmEye] = useState(false)
    const navation = useNavigation()
    const sendEmail = () => {
        navation.navigate('/reset-password')
    }
    const togglePasswordNew = () => {
        setPasswordNewEye(!passwordNewEye)
    }
    const togglePasswordConfirm = () => {
        setPasswordConfirmEye(!passwordConfirmEye)
    }

    return (
        <View style={styles.wrapper}>
            <CustomAppBar navigation={props.navigation} isMainscreen={false} isReel={false} title='Forgot Password' />
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.forgotPasswordText}>
                        Reset your password securely and continue.
                    </Text>
                    <View style={styles.fieldContainer}>
                        <TextInput style={globatStyles.inputText} placeholder='New Password' secureTextEntry={!passwordNewEye} />
                        <Entypo name={passwordNewEye ? 'eye-with-line' : 'eye'} style={styles.passwordToggle} onPress={togglePasswordNew} />
                    </View>
                    <View style={styles.fieldContainer}>
                        <TextInput style={globatStyles.inputText} placeholder='Confirm Password' secureTextEntry={!passwordConfirmEye} />
                        <Entypo name={passwordConfirmEye ? 'eye-with-line' : 'eye'} style={styles.passwordToggle} onPress={togglePasswordConfirm} />
                    </View>
                    <Pressable onPress={sendEmail} style={globatStyles.button}><Text style={globatStyles.btnText}>Change Password</Text></Pressable>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    container: {
        flex: 1,
        padding: Constants.padding,
    },
    forgotPasswordText: {
        fontFamily: Constants.fontFamily,
        fontSize: 14,
        marginTop: Constants.margin,
    },
    fieldContainer: {
        marginTop: Constants.margin,
    },
    passwordToggle: {
        position: 'absolute',
        right: 12,
        top: 12,
        fontSize: 25,
        color: '#D0C9D6',
    },
})

export default ChangePassword