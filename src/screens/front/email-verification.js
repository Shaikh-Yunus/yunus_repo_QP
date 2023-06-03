import React, {useState} from 'react'
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
const EmailVerification=(props)=>{
    const navigation  = useNavigation()
    const countries = ["+91", "+92", "+93", "+94", "+95"]
    const [email, setemail] = useState(props?.route?.params?.emailId?props?.route?.params?.emailId:'')
    const [isLoading, setIsLoading] = useState(false)
    const emailIdPattern=/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const generateOtpBusiness = ()=>{
        if(email==='' || email===null){
            showToastmsg('Please enter your email id')
        }
        else if(!emailIdPattern.test(email)){
            showToastmsg('Please enter valid email id')
        }
        else{
            setIsLoading(true)
            userSignup()
        }
    }
    const userSignup = async () =>{
        try {
            if(props?.route?.params?.phoneType){
                axios.post(`${Constants.BASE_URL}auth/forgot-password`,{
                    "data":email
                }).then((response)=>{
                    setIsLoading(false)
                    if(!response.data.error){
                        navigation.navigate('/email-otp', 
                        {emailId:email,userType:props?.route?.params?.userType,otpId:response.data.data.otp_id,phoneType:props?.route?.params?.phoneType}
                        )
                    }
                }).catch((error)=>{
                    setIsLoading(false)
                    console.log("phone otp error",error);
                })
            }
            else {
                axios.post(`${Constants.BASE_URL}auth/email-otp`,{
                    "email":email
                }).then((response)=>{
                    setIsLoading(false)
                    if(!response.data.error){
                        navigation.navigate('/email-otp', {userDetails: props?.route?.params?.userDetails,emailId:email,userType:props?.route?.params?.userType})
                    }
                }).catch((error)=>{
                    console.log("email otp error",error);
                    showToastmsg("Email otp validation failed")
                    setIsLoading(false)
                })
            }
            // const response = await apiCall('POST', endPoints.USER_LOGIN, null, { mobile_number: email})
            // if(response.error===null && response.data.otp){
            //     setIsLoading(false)
            //     navigation.navigate('/business-otp', {userDetails: props?.route?.params?.userDetails,emailId:email,userType:props?.route?.params?.userType})
            //     console.log("number otp",response.data.otp)
            // }
            // else{
            //     setIsLoading(false)
            //     showToastmsg(response.msg)
            // }
        } catch (error) {
            console.log(error)
            setIsLoading(false)
        }
    }
    const gotoPhoneVerification=()=>{
        navigation.navigate("/business-signup",{phoneType:"forgotpassword",userType:props?.route?.params?.userType})
    }
    return (
        <View style={styles.background}>
            <VideoPlayer
                  video={props?.route?.params?.userType==="Business"?Videos.businessVideo
                  :props?.route?.params?.userType==="Influencer"?
                  Videos.influencerVideo:props?.route?.params?.userType==="Explorer"?
                  Videos.exploreVideo:Videos.advertiserVideo}
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
                         height: Constants.height+25,
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
                <Text style={styles.textBelowBusiness}>Enter Email Id for verification</Text>
                <View style={styles.phoneNumberContainer}>
                    {/* <View style={styles.countryCode}>
                        <Image source={Images.indiaFlag} style={styles.countryFlag} />
                        <SelectDropdown
                            data={countries}
                            buttonStyle={styles.countryDropdown}
                            defaultValue={+91}
                            onSelect={(selectedItem, index) => {
                                console.log(selectedItem, index)
                        }} />
                        <Image source={Images.dropdownIcon} style={styles.dropdownIcon} />
                    </View> */}
                    <TextInput keyboardType={'email-address'} style={styles.textInput} 
                    defaultValue={props?.route?.params?.emailId}
                    placeholder='Email Id' onChangeText={(e)=>setemail(e)} />
                </View>
                <Text style={styles.belowPhoneNumber}>We will send you an OTP to {props?.route?.params?.phoneType?'reset password on your email id':'validate your email id'}.</Text>
                {
                    isLoading?<ActivityIndicator size={30} color={Constants.colors.whiteColor} />:<Pressable style={[globatStyles.button, {width: '92%'}]} onPress={generateOtpBusiness}><Text style={globatStyles.btnText}>Generate OTPs</Text></Pressable>
                }
                {props?.route?.params?.phoneType&&
                <>
                 <View style={{flexDirection: 'row', marginTop: 20, alignItems: 'center',}}>
                    <View style={styles.divider}></View> 
                    <View><Text style={{fontFamily: Constants.fontFamily, color: '#FFFFFF',}}>&nbsp; or &nbsp;</Text></View>
                    
                    <View style={styles.divider}></View>
                </View>
                <Pressable onPress={gotoPhoneVerification}
                ><Text style={{fontFamily: Constants.fontFamily, color: '#FFFFFF',textDecoration:"underline",textTransform:"capitalize"}}
                > &nbsp;  Reset through <Text style={styles.forgotPassLink}>Phone number</Text> &nbsp; </Text></Pressable></>}
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
        textTransform:'uppercase'
    },
    business: {
        flexDirection: 'row',
        marginTop: 12,
        alignItems: 'center',
        marginTop: 40,
        marginBottom: 40,
        backgroundColor: 'rgba(51, 51, 51, 0.2)',
        padding:8,
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
        textTransform:'uppercase',
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

export default EmailVerification