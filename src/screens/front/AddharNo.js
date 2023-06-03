import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Pressable,
    ActivityIndicator,
    Alert,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Constants from '../../shared/Constants'
import globatStyles from '../../shared/globatStyles'
import showToastmsg from '../../shared/showToastmsg'
import { apiCall } from '../../service/service'
import endPoints from '../../shared/endPoints'
import AsyncStorage from '@react-native-async-storage/async-storage'

const AadhaarNo = (props) => {


    const [aadhaarNo, setAadhaarNo] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [mahareferid, setMahareferid] = useState()
    console.log("this is maharef id on aadharno.js", mahareferid);
    const [client_refid, setclient_refid] = useState()
    console.log("this is client_refid on aadharno.js", client_refid);
    // console.log("this is props of aadharno.js", props?.route?.params);
    console.log("this is userDetails of aadharno.js", props?.route?.params?.userDetails);
    console.log("this is userType of aadharno.js", props?.route?.params?.userType);
    console.log("this is mobile_number of aadharno.js", props?.route?.params?.userDetails.mobile_number);
    const navigation = useNavigation()
    // const gotoAadhaarNumber = () => {
    //     navigation.navigate('/aadhar-verification', { userDetails: props?.route?.params?.userDetails, userType: props?.route?.params?.userType, mobileNumber: props?.route?.params?.userDetails.mobile_number })
    // }
    const gotoAadhaarNumber = async () => {
        if (aadhaarNo === '' || aadhaarNo === null || aadhaarNo.length === 11) {
            showToastmsg('Please enter owner aadhaar number')
        }
        else {
            setIsLoading(true)
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", "Bearer YOUR_TOKEN");

            var raw = JSON.stringify({
                "Client_refid": "testing1_aadhar",
                "aadhaarno": aadhaarNo,
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
                    if (result.statuscode === "000") {
                        const { mahareferid, client_refid } = result.Data[0];
                        setMahareferid(mahareferid);
                        setclient_refid(client_refid);
                        navigation.navigate('/aadhar-verification', {
                            mahareferid: mahareferid,
                            client_refid: client_refid,
                            aadhaarNo: aadhaarNo,
                            userDetails: props?.route?.params?.userDetails, userType: props?.route?.params?.userType, mobileNumber: props?.route?.params?.userDetails.mobile_number
                        });
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
    useEffect(() => {
        if (props.route.params.aadhaarNumber)
            setAadhaarNo(props.route.params.aadhaarNumber)
        console.log("maharef", props.route.params)
    }, [])
    return (
        <View style={styles.wrapper}>
            <Text style={styles.heading}>Aadhar Verification</Text>
            <Text style={styles.subHeading}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut .</Text>
            <TextInput placeholder='Owner Aadhar Card Number' maxLength={12} keyboardType='number-pad' style={globatStyles.inputText} onChangeText={text => setAadhaarNo(text)} />
            {
                isLoading ? <ActivityIndicator size={30} color={Constants.colors.primaryColor} /> : <Pressable style={globatStyles.button} onPress={gotoAadhaarNumber}><Text style={globatStyles.btnText}>Verify</Text></Pressable>
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
})


export default AadhaarNo