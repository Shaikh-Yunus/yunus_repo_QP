import React, { useState } from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
    Pressable,
    TextInput,
} from 'react-native'
import VideoPlayer from 'react-native-video-player'
import { useNavigation } from '@react-navigation/native'
import Images from '../../../assets/images/Images'
import Constants from '../../../shared/Constants'
import globatStyles from '../../../shared/globatStyles'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const AdvertiserSiginWithPass = (props) => {
    const navigation = useNavigation()
    const [showPass, setShowPass] = useState(false)
    const gotoAdvertiserResgistration = () => {
        navigation.navigate('/advertise-registration')
    }
    const gotoForgotPass = () => {
        navigation.navigate('/forgot-password-advertiser')
    }
    const gotoCreateAccount = () => {

    }
    return (
        <View style={styles.background}>
            <VideoPlayer
                video={{ uri: 'http://qp.flymingotech.in/public/videos/pexels-artem-podrez-6780089.mp4' }}
                autoplay
                loop
                disableSeek
                resizeMode={'cover'}
                customStyles={{
                    wrapper: {
                        width: Constants.width,
                        height: Constants.height,
                        paddingBottom: Constants.padding,
                    },
                    video: {
                        width: Constants.width,
                        height: Constants.height + 25,
                    },

                    controls: {
                        display: 'none',
                    },

                    seekBarBackground: {
                        backgroundColor: 'transparent',
                    },

                    seekBarProgress: {
                        backgroundColor: 'transparent',
                    },

                }} />
            <View style={globatStyles.overlay}></View>
            <View style={styles.container}>
                <Image source={Images.logo} />
                <Text style={styles.textBelowLogo}>Welcome to Quarterpillars</Text>
                <View style={styles.business}>
                    <Text style={styles.businessText}>ADVERTISER</Text>
                    <Image source={Images.advertizerIcon} />
                </View>
                <Text style={styles.textBelowBusiness}>Enter Mobile Number and Sign In</Text>
                <View style={styles.phoneNumberContainer}>
                    <TextInput keyboardType={'email-address'} style={styles.textInput} placeholder='Email ID' />
                    <View style={{ flex: 1, width: '100%', alignItems: 'center', }}>
                        <TextInput style={styles.textInput} placeholder='Password' secureTextEntry={!showPass} />
                        <FontAwesome name={showPass ? 'eye-slash' : 'eye'} style={styles.eyeIcon} onPress={() => setShowPass(!showPass)} />
                    </View>
                    <Text style={styles.forgotPassLink} onPress={gotoForgotPass}>Forgot Password</Text>
                </View>
                <Text style={styles.belowPhoneNumber}></Text>
                <Pressable style={[globatStyles.button, { width: '92%', marginTop: 0, }]} onPress={gotoAdvertiserResgistration}><Text style={globatStyles.btnText}>Sign In</Text></Pressable>
                <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center', }}>
                    <View style={styles.divider}></View>
                    <Pressable onPress={gotoCreateAccount}><Text style={{ fontFamily: Constants.fontFamily, color: '#FFFFFF', }}> &nbsp; or create new account &nbsp; </Text></Pressable>
                    <View style={styles.divider}></View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        height: Constants.width,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        width: '100%',
        padding: Constants.padding,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
    },

    textBelowLogo: {
        fontFamily: Constants.fontFamily,
        fontSize: 26,
        fontWeight: '700',
        color: Constants.colors.whiteColor,
        maxWidth: '60%',
        textAlign: 'center',
        marginTop: 12,
    },

    business: {
        flexDirection: 'row',
        marginTop: 12,
        alignItems: 'center',
        marginTop: 40,
        marginBottom: 40,
        backgroundColor: 'rgba(51, 51, 51, 0.2)',
        padding: 8,
        paddingStart: 16,
        paddingEnd: 16,
        borderRadius: 5,
    },

    businessText: {
        fontFamily: Constants.fontFamily,
        fontSize: 24,
        color: Constants.colors.whiteColor,
        fontWeight: '700',
        marginRight: Constants.margin,
    },

    textBelowBusiness: {
        fontFamily: Constants.fontFamily,
        color: Constants.colors.whiteColor,
        fontSize: 16,
        fontWeight: '400',
        marginBottom: 20,
    },
    phoneNumberContainer: {
        flex: 1,
        flexDirection: 'column',
        width: '100%',
        alignItems: 'center',
    },
    textInput: {
        backgroundColor: Constants.colors.whiteColor,
        width: '90%',
        borderRadius: Constants.borderRadius,
        marginTop: 20,
        padding: 12,
    },
    belowPhoneNumber: {
        fontSize: 13,
        color: Constants.colors.whiteColor,
        marginTop: 12,
        fontFamily: Constants.fontFamily,
    },
    eyeIcon: {
        position: 'absolute',
        top: 34,
        right: 25,
        color: '#999999',
        fontSize: 24,
    },
    forgotPassLink: {
        alignSelf: 'flex-end',
        marginEnd: '5%',
        fontSize: 16,
        color: Constants.colors.primaryColor,
        fontFamily: Constants.fontFamily,
        textDecorationLine: 'underline',
        textDecorationColor: Constants.colors.primaryColor,
    },
    divider: {
        height: 1,
        width: '100%',
        backgroundColor: Constants.colors.whiteColor,
        width: '20%',
    },
})

export default AdvertiserSiginWithPass