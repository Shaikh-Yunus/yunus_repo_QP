import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    Pressable,
    TextInput,
} from 'react-native'
import Constants from '../../../shared/Constants'
import globatStyles from '../../../shared/globatStyles'
import CustomAppBar from '../../../components/influencer/CustomAppBar'

const ForgotPasswordAdvertiser = ({ navigation }) => {
    const gotoUpdatePassword = () => {
        navigation.navigate('/update-password-advertiser')
    }
    return (
        <View style={styles.container}>
            <StatusBar translucent={true} backgroundColor='transparent' />
            <CustomAppBar navigation={navigation} isMainscreen={false} isReel={false} headerRight={false} title='Forgot Password' />
            <View style={{ padding: Constants.padding }}>
                <Text style={{ fontFamily: Constants.fontFamily }}>
                    Reset your password securely and continue using our services.
                </Text>
                <Text style={{ fontFamily: Constants.fontFamily, marginTop: 12, marginBottom: 12, }}>*Recovery Email ID (**********eer@gmail.com)</Text>
                <TextInput style={globatStyles.inputText} placeholder='Enter Email ID' />
                <Pressable onPress={gotoUpdatePassword} style={globatStyles.button}><Text style={globatStyles.btnText}>Send Mail</Text></Pressable>
                <Text style={{ fontFamily: Constants.fontFamily, }}>A mail has been sent to your registered email ID (please verify)</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

})

export default ForgotPasswordAdvertiser