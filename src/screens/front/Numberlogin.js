import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
    Pressable,
    TextInput,
    ActivityIndicator,
} from 'react-native'
import VideoPlayer from 'react-native-video-player'
import { useNavigation } from '@react-navigation/native'
import Images from '../../assets/images/Images'
import SelectDropdown from 'react-native-select-dropdown'
import Constants from '../../shared/Constants'
import globatStyles from '../../shared/globatStyles'
import showToastmsg from '../../shared/showToastmsg'
import { apiCall } from '../../service/service'
import endPoints from '../../shared/endPoints'
import axios from 'axios'
import Videos from '../../assets/staticVideos/Videos'
const NumberLogin = (props) => {
    const navigation = useNavigation()
    const countries = ["+91", "+92", "+93", "+94", "+95"]
    const [number, setnumber] = useState('');
    const [usertype, setusertype] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    // const emailIdPattern=/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    const gotoCreateAccount = () => {
        if (props?.route?.params?.login_type == 'Business') { navigation.navigate('/advertiser-categories', { type: props.route.params.login_type }) }
        else if (props?.route?.params?.login_type == 'Influencer' || props.route.params.login_type == 'Explorer') {
            navigation.navigate('/influencer-registration', { type: props.route.params.login_type })
        }
        else {
            navigation.navigate('/advertise-registration', { type: props.route.params.login_type })
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

    const generateOtpBusiness = (text) => {


        if (number === '' || number === null) {
            showToastmsg('Please enter your number ')
        }
        else if (number.length < 10) {
            showToastmsg('Please enter 10 digit phone number')
        }
        else {
            setIsLoading(true)
            userSignup()

        }
    }
    const userSignup = async () => {
        try {
            axios.post(`${Constants.BASE_URL}auth/SendloginOtp`, {
                "mobile_number": number,
                "type": usertype,
            }).then((response) => {
                setIsLoading(false)
                console.log('nnn', response.data)
                if (response.data.Msg == "Otp sent successfully") {

                    navigation.navigate('/Number-Otp', { userDetails: props?.route?.params?.userDetails, userType: props?.route?.params?.userType, mobile_number: number, login_type: props?.route?.params?.login_type })
                }
                else if (response.data.msg == "Number Not Existe") {
                    showToastmsg('Number not Exist ')
                }
            }).catch((error) => {
                console.log("number otp error", error);
                setIsLoading(false)
            })
        } catch (error) {
            console.log(error)
            setIsLoading(false)
        }
    }


    return (
        <View style={styles.background}>
            <VideoPlayer
                video={props?.route?.params?.userType === "Business" ? Videos.businessVideo
                    : props?.route?.params?.userType === "Influencer" ?
                        Videos.influencerVideo : props?.route?.params?.userType === "Explorer" ?
                            Videos.exploreVideo : Videos.advertiserVideo}
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
                    <Text style={styles.businessText}>{props?.route?.params?.userType}</Text>
                    <Image source={Images.businessIcon} />
                </View>
                <Text style={styles.textBelowBusiness}>Enter Your Registered Mobile Number</Text>
                <View style={styles.phoneNumberContainer}>

                    <TextInput keyboardType={'numeric'} style={styles.textInput}


                        placeholder='Number' onChangeText={(e) => setnumber(e)}
                    />
                </View>
                <Text style={styles.belowPhoneNumber}>We will send you an OTP to {props?.route?.params?.phoneType ? 'Login on your Registered Mobile Number' : 'validate your Mobile Number'}.</Text>
                {
                    isLoading ? <ActivityIndicator size={30} color={Constants.colors.whiteColor} /> : <Pressable style={[globatStyles.button, { width: '92%' }]} onPress={generateOtpBusiness}><Text style={globatStyles.btnText}>Generate OTP</Text></Pressable>
                }


                <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center', }}>
                    <View style={styles.divider}></View>
                    <View><Text style={{ fontFamily: Constants.fontFamily, color: '#FFFFFF', }}>&nbsp; or &nbsp;</Text></View>

                    <View style={styles.divider}></View>
                </View>
                <Pressable onPress={gotoCreateAccount}><Text style={{ fontFamily: Constants.fontFamily, color: '#FFFFFF', textDecoration: "underline", textTransform: "capitalize" }}> &nbsp;  create new account &nbsp; </Text></Pressable>

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
    forgotPassLink: {
        // alignSelf: 'flex-end',
        // marginEnd: '5%',
        fontSize: 16,
        color: Constants.colors.primaryColor,
        fontFamily: Constants.fontFamily,
        textDecorationLine: 'underline',
        textDecorationColor: Constants.colors.primaryColor,
    },
    textBelowLogo: {
        fontFamily: Constants.fontFamily,
        fontSize: 26,
        fontWeight: '700',
        color: Constants.colors.whiteColor,
        maxWidth: '75%',
        textAlign: 'center',
        marginTop: 12,
        textTransform: 'uppercase'
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
        textTransform: 'uppercase',
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
        width: '80%',
        borderRadius: Constants.borderRadius,
        marginLeft: 20,
        paddingLeft: 12,
        height: 50,
    },
    dropdownIcon: {
        position: 'absolute',
        right: 6,
        top: 23,
    },
    belowPhoneNumber: {
        fontSize: 13,
        color: Constants.colors.whiteColor,
        marginTop: 12,
        fontFamily: Constants.fontFamily,
    },
})

export default NumberLogin