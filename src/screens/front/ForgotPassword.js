import React from 'react'
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

const ForgotPassword = (props) => {
    const navation = useNavigation()
    const sendEmail = () => {
        navation.navigate('/reset-password')
    }

    return (
        <View style={styles.wrapper}>
            <CustomAppBar navigation={props.navigation} isMainscreen={false} isReel={false} title='Forgot Password' />
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.forgotPasswordText}>
                        Reset your password securely and continue using our services.
                    </Text>
                    <Text style={[styles.forgotPasswordText, { marginBottom: 12 }]}>
                        *Recovery Email ID (**********eer@gmail.com)
                    </Text>
                    <TextInput style={globatStyles.inputText} placeholder='Enter Email ID' />
                    <Pressable onPress={sendEmail} style={globatStyles.button}><Text style={globatStyles.btnText}>Send Mail</Text></Pressable>
                    <Text style={styles.forgotPasswordText}>
                        A mail has been sent to your registered email ID (please verify)
                    </Text>
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

})

export default ForgotPassword