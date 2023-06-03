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
const BusinessOtp = (props) => {
    
    const [otp, setOtp] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [coundownTime, setCountDownTime] = useState(30)
    const navigation = useNavigation()
    const [optId,setotpId]=useState(props?.route?.params?.otpId)
    const { phoneNumber } = props.route.params
    useEffect(()=>{
        // if(props?.route?.params?.phoneType){
        //     setotpId(props?.route?.params?.otpId)
        // }
        let timer = setInterval(()=>{
            if(coundownTime>0){
                clearInterval(timer)
                let  coundownT=coundownTime - 1
                setCountDownTime(coundownT)
            }
        }, 1000)
    },[coundownTime])
    
    
    const verifyOtpBusiness = () => {
        if (otp === '' || otp === null) {
            showToastmsg('Please enter OTP')
        }
        else {
            verifyOtp()
        }
    }
    const verifyOtp = async () => {
        setIsLoading(true)
        console.log("dataval",{
            "otp": otp,
                "otp_id": optId
        }
         )
        if(props?.route?.params?.phoneType){
            axios.post(`${Constants.BASE_URL}auth/forgot-password-verify`,{
                "otp": otp,
                    "otp_id": optId
            }).then((response)=>{
                setIsLoading(false)
                if(!response.data.error){
                    navigation.navigate("/update-password",{
                        changeId:response?.data?.data?.user_details?.id,userType:props?.route?.params?.userType
                    })
                }
                else{
                    showToastmsg(response.data.data.msg);
                }
            }).catch((err)=>{
                showToastmsg('Otp verification failed')
                setIsLoading(false)
                console.log('catch error',err.response);
            })
        }
        else{axios.post(Constants.BASE_URL+endPoints.VERIFY_OTP,{
            mobile_number:phoneNumber,
            otp:otp
        }).then((response)=>{
            console.log("otp",response.data.msg )
            if(response.data.msg == "User Found"){
                setIsLoading(false)
                        //   navigation.navigate('/email-verification',{login_type:props.route.params.userType})
                          navigation.navigate('/email-verify',{userType:props.route.params.userType,userDetails: props.route.params.userDetails,emailId: props.route.params.userDetails?.email})
            }
            else {
                setIsLoading(false)
                showToastmsg("OTP not matched" )
                console.log('error response',response.data);
            }
        }).catch((err)=>{
            showToastmsg('Otp verification failed')
            setIsLoading(false)
            console.log('catch error',err.response);
        })}
        // try {
        //     const response = await apiCall('POST', endPoints.VERIFY_OTP, null, { mobile_number: phoneNumber, otp: otp })
        //     if (response && response.error === false && response.data.userExist) {
        //         try {
        //             await AsyncStorage.setItem('users', JSON.stringify({ token: response.data.token, userRole: 'businesss', userDetails: response.data.user }))
        //                                         navigation.navigate('/business-login',{login_type:props.route.params.userType})

        //         } catch (error) {
        //             console.log(error)
        //         }
                
        //         // if(response.data.busnisse_details.is_owner_email_verified=="false"){
        //         //     axios.post(`${Constants.BASE_URL}auth/email-otp`,{aadhaar_number:response.data.busnisse_details.owner_email}).then((res)=>{
                        
        //         //         if(!res.data.error){
        //         //             setIsLoading(false)
        //         //             console.log("dataaaa",res.data.data.Mahareferid.map(item=>item))
        //         //             navigation.navigate('/email-verification',{"userDetails":response.data.user,aadhaarNumber:response.data.busnisse_details.owner_adhar,"MahaRefId":res.data.data.Mahareferid[0].mahareferid})
        //         //         }
        //         //     })            
        //         // }
        //         // else if(response.data.busnisse_details.is_adhar_verifedn && !response.data.busnisse_details.is_adhar_verifeds){
        //         //     navigation.navigate('/bank-details', {phoneNumber: phoneNumber})
        //         // }
        //         // else{
                    
        //         //     props.route.params.authentication('business')
        //         // }               
        //     }
        //     // else if (response.error === false && !response.data.userExist) {
        //     //     navigation.navigate('/business-registration', {phoneNumber: phoneNumber})
        //     // }
        //     else {
        //         setIsLoading(false)
        //         showToastmsg(response.msg)
        //     }
        // } catch (error) {
        //     console.log(error)
        //     setIsLoading(false)
        // }
    }
    // const storeUserDetails = async (data) => {
    //     await storeData('users', data)
    // }
    const resendOtp = async () =>{
        setIsLoading(true)
        try {
            if(props?.route?.params?.phoneType){
                axios.post(`${Constants.BASE_URL}auth/forgot-password`,{
                    "data":phoneNumber
                }).then((response)=>{
                    if(!response.data.error){
                        setIsLoading(false)
                        setotpId(response.data.data.otp_id)        
                        showToastmsg('OTP resend successfully')
                        setCountDownTime(30)
                        console.log("resend_otp",response.data.data.otp);
                    }
                }).catch((error)=>{
                    console.log(error)
                    showToastmsg('Sorry OTP not sent')
                    setIsLoading(false)  
                })
            }
            else {const response = await apiCall('POST', endPoints.USER_LOGIN, null, { mobile_number: phoneNumber})
            if(response.error===null && response.data.otp){
                setIsLoading(false)
                showToastmsg('OTP resend successfully')
                setCountDownTime(30)
            }
            else{
                setIsLoading(false)
                showToastmsg(response.msg)
            }}
        } catch (error) {
            console.log(error)
            showToastmsg('Sorry OTP not sent')
            setIsLoading(false)
        }
    }
    const gotRenterMobileNumber = ()=>{
        if(props?.route?.params?.phoneType){
            navigation.navigate('/business-signup',{userDetails: props.route.params.userDetails,userType:props.route.params.userType,"phoneNumber":props.route.params.phoneNumber,phoneType:props?.route?.params?.phoneType})    
        }
        else 
        {navigation.navigate('/business-signup',{userDetails: props.route.params.userDetails,userType:props.route.params.userType,"phoneNumber":props.route.params.phoneNumber})}
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
                repeat={true}
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
                <Text style={styles.textBelowBusiness}>Enter OTP sent to +91-{props.route.params.phoneNumber} <Text onPress={gotRenterMobileNumber} ><Image source={Images.editOtpPhone} /></Text></Text>
                <OTPTextInput inputCount={4} textInputStyle={styles.otpField} handleTextChange={(otp) => setOtp(otp)} inputCellLength={1}/>
                
                {
                    coundownTime === 0?
                    <Text onPress={resendOtp} style={styles.countdown}>Resend OTP</Text>:
                    <Text style={{color: Constants.colors.whiteColor, alignSelf: 'flex-end',marginRight: 20}}>Resend In <Text style={styles.countdown}>{coundownTime}</Text></Text>
                }
                {
                    isLoading ? <ActivityIndicator size={30} color={Constants.colors.whiteColor} /> : <Pressable style={[globatStyles.button, { width: '88%' }]} onPress={verifyOtpBusiness}><Text style={globatStyles.btnText}>Enter OTP</Text></Pressable>
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
        maxWidth: '85%',
        textAlign: 'center',
        marginTop: 12,
        textTransform:'uppercase',
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
        textTransform:'uppercase',
    },
    textBelowBusiness: {
        fontFamily: Constants.fontFamily,
        color: Constants.colors.whiteColor,
        fontSize: 15,
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

export default BusinessOtp