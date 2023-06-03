import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Image,
    Pressable,
    ActivityIndicator,
    Alert
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import OTPTextInput from 'react-native-otp-textinput'
import Constants from '../../shared/Constants'
import globatStyles from '../../shared/globatStyles'
import Images from '../../assets/images/Images'
import showToastmsg from '../../shared/showToastmsg'
import { apiCall } from '../../service/service'
import endPoints from '../../shared/endPoints'
import AsyncStorage from '@react-native-async-storage/async-storage'

const AdharVerification = (props) => {
    let propsCheck = props?.route?.params
    console.log("this is propsCheck in aadharverification.js =>", propsCheck);
    const [aadharCard, setAadharCard] = useState(propsCheck.aadhaarNo)
    console.log("this is aadharCard", aadharCard);
    const [mahareferid, setmahareferid] = useState(propsCheck.mahareferid)
    console.log("this is mahareferid", mahareferid);
    const [client_refid, setclient_refid] = useState(propsCheck.client_refid)
    console.log("this is client_refid", client_refid);
    const [isEditable, setIsEditable] = useState(false)
    const [otp, setOtp] = useState('')
    console.log("Type of otp:", typeof otp);
    console.log("Type of otp:", otp);
    const [isLoading, setIsLoading] = useState(false)
    const [coundownTime, setCountDownTime] = useState(30)
    const navigation = useNavigation()
    // useEffect(() => {
    //     let timer = setInterval(() => {
    //         if (coundownTime > 0) {
    //             clearInterval(timer)
    //             let coundownT = coundownTime - 1
    //             setCountDownTime(coundownT)
    //         }
    //     }, 1000)

    // }, [coundownTime])
    // const verifyAddhaar = () => {
    //     navigation.navigate('/bank-details', { propsData : props?.route?.params})

    // }
    const verifyAddhaar = async () => {
        if (!otp) {
            showToastmsg('Please enter OTP')
        }
        else {
            setIsLoading(true)
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                "Client_refid": client_refid,
                "otp": otp,
                "Mahareferid": mahareferid,
                "cpid": "CP12321311",
                "token": "ANk67No8j7ksBxSTKCNRKKnVHEkuBIf0s+xb0gjkO4zq+vWu9KtvCLmhUUnmEWep"
            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch("https://uat.dhansewa.com/Verification/SubmitAadhaarOTP", requestOptions)
                .then(response => response.json())
                .then(result => {
                    console.log(result)
                    if (result.statuscode == "000") {
                        navigation.navigate('/bank-details', { propsData: props?.route?.params })
                    }
                    else if (result.status == "006") {
                        Alert.alert('Invalid OTP/ Already Submitted')
                    }
                })
                .catch(error => console.log('error', error));

        }
    }
    const resendOtp = async () => {
        if (aadharCard === '' || aadharCard === null || aadharCard === 11) {
            showToastmsg('Please enter owner aadhaar number')
        }
        else {
            setIsLoading(true)
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", "Bearer YOUR_TOKEN");

            var raw = JSON.stringify({
                "Client_refid": "testing1_aadhar",
                "aadhaarno": aadharCard,
                "cpid": "CP12321311",
                "token": "ANk67No8j7ksBxSTKCNRKKnVHEkuBIf0s+xb0gjkO4zq+vWu9KtvCLmhUUnmEWep"
            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch("https://uat.dhansewa.com/Verification/AadhaarVerificationOTP", requestOptions)
                .then(response => response.json())
                .then(result => {
                    console.log(result)
                    setIsLoading(false)
                    if (result.statuscode == "000") {
                        setmahareferid(result.Data[0].mahareferid)
                        setclient_refid(result.Data[0].client_refid)
                        Alert.alert("OTP resend Successfully")
                    }
                    else if (result.statuscode == "009") {
                        Alert.alert('Aadhaar Card id Invalid. Please Check your aadhar no.')
                    }
                    else if (result.statuscode == "009") {
                        Alert.alert('Please retry one minute')
                    }
                })
                .catch(error => console.log('error in aadhar verificaiton otp', error));
        }
    }
    return (
        <View style={styles.wrapper}>
            <Text style={styles.heading}>Aadhar Verification</Text>
            <Text style={styles.subHeading}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut .</Text>
            <View>
                <TextInput placeholder='Owner Aadhar Card Number' style={globatStyles.inputText} value={aadharCard} editable={isEditable} />
                <Pressable style={styles.editIcon} onPress={() => setIsEditable(!isEditable)}>
                    <Image source={Images.editAadharIcon} />
                </Pressable>
            </View>
            <View>
                <Text style={styles.textStyle}>Enter OTP sent to registered no.</Text>
                <OTPTextInput inputCount={6} inputCellLength={10} textInputStyle={styles.otpField} handleTextChange={(otp) => setOtp(otp)} />
            </View>
            {
                coundownTime === 0 ?
                    <Text onPress={resendOtp} style={styles.countdown}>Resend OTP</Text> :
                    <Text style={{ color: Constants.colors.whiteColor, alignSelf: 'flex-end', marginRight: 20 }}>Resend In <Text style={styles.countdown}>{coundownTime}</Text></Text>
            }
            {
                isLoading ? <ActivityIndicator size={30} color={Constants.colors.primaryColor} /> : <Pressable style={globatStyles.button} onPress={verifyAddhaar}><Text style={globatStyles.btnText}>Verify</Text></Pressable>
            }

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
    editIcon: {
        position: 'absolute',
        right: 10,
        top: 16,
    },
    textStyle: {
        textAlign: 'center',
        fontFamily: Constants.fontFamily,
        marginBottom: 18,
    },
    otpField: {
        borderBottomWidth: 0,
        backgroundColor: Constants.colors.inputBgColor,
        borderRadius: Constants.borderRadius,
    },
    belowOtp: {
        fontSize: 14,
        marginTop: 12,
        fontFamily: Constants.fontFamily,
        alignSelf: 'flex-end',
        marginEnd: '2%',
    },
    countdown: {
        color: Constants.colors.primaryColor,
        alignSelf: 'flex-end',
        marginRight: 20,
    }
})


export default AdharVerification