import React, { useState, useRef, useEffect } from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
    Pressable,
    ActivityIndicator
} from 'react-native'
import VideoPlayer from 'react-native-video-player'
import Images from '../../assets/images/Images'
import OTPTextInput from 'react-native-otp-textinput'
import Constants from '../../shared/Constants'
import globatStyles from '../../shared/globatStyles'
import showToastmsg from '../../shared/showToastmsg'
import { apiCall } from '../../service/service'
import endPoints from '../../shared/endPoints'
import { storeData } from '../../shared/asyncStorage'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import Videos from '../../assets/staticVideos/Videos'
const NumberOtp = (props) => {
    const { mobile_number, } = props.route.params;
    const [otp, setOtp] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [coundownTime, setCountDownTime] = useState(30)
    const navigation = useNavigation()
    const [usertype, setusertype] = useState('')

    const { emailId } = props.route.params
    useEffect(() => {
        // if(props?.route?.params?.phoneType){
        //     setotpId(props?.route?.params?.otpId)
        // }
        let timer = setInterval(() => {
            if (coundownTime > 0) {
                clearInterval(timer)
                let coundownT = coundownTime - 1
                setCountDownTime(coundownT)
            }
        }, 1000)
    }, [coundownTime])


    const verifyOtpBusiness = () => {
        if (otp === '' || otp === null) {
            showToastmsg('Please enter OTP')
        }
        else {
            verifyOtp()
        }
    }
    const SetType = () => {
        if (props?.route?.params?.userType == 'Business') { setusertype(4) }
        else if (props?.route?.params?.userType == 'Influencer') {
            { setusertype(2) }
        }
        else if (props?.route?.params?.userType == 'Explorer') {
            { setusertype(1) }
        }
        else if (props?.route?.params?.userType == 'Advertiser') {
            { setusertype(3) }
        }

    }
    useEffect(() => {
        SetType()
    }, [props]);

    const signinverificatoin = async () => {
        setIsLoading(true)
        try {
            let fcmtoken = await AsyncStorage.getItem("fcmtoken");
            if (mobile_number == '' || mobile_number == null || otp == '' || otp == null) {
                setIsLoading(false)
                showToastmsg('Please enter Otp ')
            }
            else {
                const response = await apiCall('POST', 'auth/VerifyWithOtp', null, { mobile_number: mobile_number, otp: otp, type: usertype })
                if (response && response.error === false) {
                    try {

                        if (response.data.login_success) {

                            await axios.post(`${Constants.BASE_URL}auth/device-token`, {
                                user_id: response?.data?.user?.id,
                                device_token: fcmtoken
                            })
                            await axios.post("https://testfcm.com/api/notify",
                                {
                                    "postBody": {
                                        "notification": {
                                            "title": `Welcome ${response.data.user?.name} !`,
                                            "body": `You have logged in as ${props.route.params.login_type} successfully`,
                                            "click_action": null,
                                            "icon": null
                                        },
                                        "data": null,
                                        "to": fcmtoken
                                    },
                                    "serverKey": "AAAAdLYZPyI:APA91bFVhnrT3tUYJWS5aKMBM9ObqK4LBFIrhwS5CoHHKlnORXOIadVwpjE4QTXMKicbQTxifccSdphB2EF7Jw_jCkyjHciMHGlQ0zvufnNHtAifxqUgQ0Ww01XprMn8a2dVa4EKsNc8"
                                }
                            ).then((resp) => {
                                setIsLoading(false)
                            })
                                .catch((error) => {
                                    setIsLoading(false)
                                })
                            showToastmsg("Login successfull")
                            await AsyncStorage.setItem("userDetails", JSON.stringify(response.data.user));
                            await AsyncStorage.setItem("userType", JSON.stringify(usertype));
                            if (props.route.params.login_type == 'Business') { navigation.navigate('/home', { userDetails: response.data.user ,userType: props?.route?.params?.login_type  }) }
                            else if (props.route.params.login_type == 'Influencer' || props.route.params.login_type == 'Advertiser') { navigation.navigate('/influencer-stack-navigation', { userDetails: response.data.user, userType: props?.route?.params?.login_type }) }
                            else if (props.route.params.login_type == 'Explorer') { navigation.navigate('/influencer-stack-navigation', { userDetails: response.data.user, userType: props?.route?.params?.login_type }) }
                            else {
                                navigation.navigate('/advertiser-product', { userDetails: response.data.user ,userType: props?.route?.params?.login_type })
                            }

                            // await AsyncStorage.setItem('users', JSON.stringify({ token: response.data.token, userRole: props?.route?.params?.login_type, userDetails: response.data.user }))
                        }
                        else {
                            setIsLoading(false)
                            showToastmsg('Login cred. or password is invalid')
                        }
                    } catch (error) {
                        console.log(error)
                    }
                }
                else {
                    setIsLoading(false)
                    showToastmsg(response.msg)
                }
            }
        } catch (error) {
            console.log(error)
            setIsLoading(false)
        }
    }
    // const storeUserDetails = async (data) => {
    //     await storeData('users', data)
    // }
    const resendOtp = async () => {
        setIsLoading(true)
        
        axios.post(`${Constants.BASE_URL}auth/VerifyWithOtp`, {
            "mobile_number": mobile_number,
            "otp": otp,
            "type": usertype,
        }).then((response) => {
            setIsLoading(false)
            showToastmsg("Login successfull")

            if (props.route.params.login_type == 'Business') { navigation.navigate('/home', { "userDetails": response.data.user }) }
            else if (props.route.params.login_type == 'Influencer' || props.route.params.login_type == 'Advertiser') { navigation.navigate('/influencer-stack-navigation', { userDetails: response.data.user, userType: props?.route?.params?.login_type }) }
            else if (props.route.params.login_type == 'Explorer') { navigation.navigate('/influencer-stack-navigation', { userDetails: response.data.user, userType: props?.route?.params?.login_type }) }
            else {
                navigation.navigate('/advertiser-product', { userDetails: response.data.user })
            }

        }).catch((err) => {
            showToastmsg('Otp verification failed')
            setIsLoading(false)
            console.log('catch error', err.response);
        })
    }
    const gotRenterMobileNumber = () => {
        if (props?.route?.params?.phoneType) {
            navigation.navigate('/email-verify', { userType: props.route.params.userType, emailId: props.route.params.emailId, phoneType: props?.route?.params?.phoneType })
        }
        else { navigation.navigate('/email-verify', { userDetails: props.route.params.user_details, userType: props.route.params.userType, emailId: props.route.params.emailId }) }
    }
    return (
        <View style={styles.background}>
            <VideoPlayer
                video={props?.route?.params?.userType === "Business" ? Videos.businessVideo
                    : props?.route?.params?.userType === "Influencer" ?
                        Videos.influencerVideo : props?.route?.params?.userType === "Explorer" ?
                            Videos.exploreVideo : Videos.advertiserVideo}
                autoplay
                repeat={true}
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
                <Text style={styles.textBelowLogo}>Welcome to Quarterillars</Text>
                <View style={styles.business}>
                    <Text style={styles.businessText}>{props.route.params.userType}</Text>
                    <Image source={Images.businessIcon} />
                </View>
                <Text style={styles.textBelowBusiness}>Enter OTP sent to {props?.route?.params?.emailId} <Text onPress={gotRenterMobileNumber} ><Image source={Images.editOtpPhone} /></Text></Text>
                <OTPTextInput inputCount={4} textInputStyle={styles.otpField} handleTextChange={(otp) => setOtp(otp)} inputCellLength={1} />
                {coundownTime === 0 ?
                    <Text onPress={resendOtp} style={styles.countdown}>Resend OTP</Text> :
                    <Text style={{ color: Constants.colors.whiteColor, alignSelf: 'flex-end', marginRight: 20 }}>Resend In <Text style={styles.countdown}>{coundownTime}</Text></Text>
                }
                {
                    isLoading ? <ActivityIndicator size={30} color={Constants.colors.whiteColor} /> : <Pressable style={[globatStyles.button, { width: '88%' }]} onPress={signinverificatoin}><Text style={globatStyles.btnText}>Enter OTP</Text></Pressable>
                }
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
        borderRadius: 5,
    },
    textBelowBusiness: {
        fontFamily: Constants.fontFamily,
        color: Constants.colors.whiteColor,
        fontSize: 16,
        fontWeight: '400',
        marginBottom: 20,
    },
    phoneNumberContainer: {
        flexDirection: 'row',
    },
    countryDropdown: {
        borderWidth: 0,
        backgroundColor: 'transparent',
        width: 75,
        position: 'absolute',
        left: 14,
        top: 0,
    },
    countryCode: {
        flexDirection: 'row',
        backgroundColor: Constants.colors.whiteColor,
        width: 90,
        borderRadius: Constants.borderRadius,
        height: 50,
    },
    countryFlag: {
        position: 'absolute',
        left: 5,
        top: 12,
    },
    textInput: {
        backgroundColor: Constants.colors.whiteColor,
        width: '60%',
        borderRadius: Constants.borderRadius,
        marginLeft: 20,
        paddingLeft: 12,
    },
    dropdownIcon: {
        position: 'absolute',
        right: 6,
        top: 23,
    },
    belowOtp: {
        fontSize: 14,
        color: Constants.colors.whiteColor,
        marginTop: 12,
        fontFamily: Constants.fontFamily,
        alignSelf: 'flex-end',
        marginEnd: '19%',
    },
    otpField: {
        borderBottomWidth: 0,
        backgroundColor: Constants.colors.whiteColor,
        borderRadius: Constants.borderRadius,
    },
    countdown: {
        color: Constants.colors.primaryColor,
        alignSelf: 'flex-end',
        marginRight: 20,
    },
})

export default NumberOtp