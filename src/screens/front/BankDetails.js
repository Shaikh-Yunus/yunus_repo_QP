import React, { useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Pressable,
    ScrollView,
    Alert,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Constants from '../../shared/Constants'
import globatStyles from '../../shared/globatStyles'
import { apiCall } from '../../service/service'
import endPoints from '../../shared/endPoints'
import showToastmsg from '../../shared/showToastmsg'
import AsyncStorage from '@react-native-async-storage/async-storage'

const BankDetails = (props) => {
    console.log("this is props data on bankDetails =>", props?.route?.params);
    // this is veritfy type after aadhar verificaiton
    // const [verifyType, setVerifyType] = useState(props?.route?.params?.propsData?.userDetails?.business?.business_doc_id)
    // this is direct from business registration
    const [verifyType, setverifyType] = useState(props?.route?.params?.userDetails?.business?.business_doc_id)
    console.log("this is verification type =>", verifyType)

    const navigation = useNavigation()

    const [gstNumber, setGstNumber] = useState('')
    const [shopAct, setShopAct] = useState('')
    const [MCA, setMCA] = useState('')
    const [panCardNo, setPancardNo] = useState('')
    const [bankAccountNo, setBankAccountNo] = useState('')
    const [accountHolderName, setAccountHoldername] = useState('')
    const [ifscCode, setIfscCode] = useState('')
    const [branchName, setBranchName] = useState('')
    const [servicesDetails, setServicesDetails] = useState('')
    const addbankAccountDetails = async () => {
        // if (gstNumber === '' || gstNumber === null) {
        //     showToastmsg('Please enter gst number')
        // }
        // else if (panCardNo === '' || panCardNo === null) {
        //     showToastmsg('Please enter PAN number')
        // }
        if (bankAccountNo === '' || bankAccountNo === null) {
            showToastmsg('Please enter bank account number')
        }
        // else if (accountHolderName === '' || accountHolderName === null) {
        //     showToastmsg('Please enter bank account holder name')
        // }
        else if (ifscCode === '' || ifscCode === null) {
            showToastmsg('Please enter bank\'s IFSC code')
        }
        // else if (branchName === '' || branchName === null) {
        //     showToastmsg('Please enter branch name of the bank')
        // }
        // else if (servicesDetails === '' || servicesDetails === null) {
        //     showToastmsg('Please enter service/product details')
        // }
        else {
            try {
                var myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
                myHeaders.append("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MjM2NTkwNzcsIm5iZiI6MTYyMzY1OTA3NywianRpIjoiOWQ4YzczY2EtNWU0NC00NTU3LTljMTItNTcwOTdjNGFlZjliIiwiZXhwIjoxOTM5MDE5MDc3LCJpZGVudGl0eSI6ImRldi5tb2F6YW1odXNzYWluMTZAYWFkaGFhcmFwaS5pbyIsImZyZXNoIjpmYWxzZSwidHlwZSI6ImFjY2VzcyIsInVzZXJfY2xhaW1zIjp7InNjb3BlcyI6WyJyZWFkIl19fQ.7YqR49ovgkRV0yDw18ScURNpSTo7aqDlsSrh0KGf4WQ");

                var raw = JSON.stringify({
                    "id_number": bankAccountNo,
                    "ifsc": ifscCode
                });

                var requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: raw,
                    redirect: 'follow'
                };

                fetch("https://kyc-api.aadhaarkyc.io/api/v1/bank-verification/", requestOptions)
                    .then(response => response.json())
                    .then(result => console.log(result))
                    .catch(error => console.log('error', error));
            } catch (error) {
                Alert.alert("alert error in bank details try catch")
            }
        }
    }                                // navigation.navigate('/business-otp', { userDetails: response.data.data.user_details, phoneNumber: PhoneNumber, userType: props.route.params.type })
    const verifyGST = () => {

    }
    return (
        <ScrollView style={{ flex: 1 }}>
            <View style={styles.wrapper}>
                <Text style={styles.heading}>Bank Details</Text>
                <Text style={styles.subHeading}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut .</Text>
                {verifyType == "With GST" ?
                    <TextInput placeholder='GST Number' style={globatStyles.inputText} onChangeText={(text) => setGstNumber(text)} />
                    : null
                }
                {verifyType == "Shopact License" ?
                    <TextInput placeholder='Shopact License' style={globatStyles.inputText} onChangeText={(text) => setShopAct(text)} />
                    : null
                }
                {verifyType == "With MCA" ?
                    <TextInput placeholder='MCA' style={globatStyles.inputText} onChangeText={(text) => setMCA(text)} />
                    : null
                }
                <TextInput placeholder='PAN Card Number' style={globatStyles.inputText} onChangeText={(text) => setPancardNo(text)} />
                <TextInput placeholder='Bank Account Number' style={globatStyles.inputText} onChangeText={(text) => setBankAccountNo(text)} />
                <TextInput placeholder='Bank Account Holder Name' style={globatStyles.inputText} onChangeText={(text) => setAccountHoldername(text)} />
                <TextInput placeholder='Bank IFSC' style={globatStyles.inputText} onChangeText={(text) => setIfscCode(text)} />
                <TextInput placeholder='Bank Branch' style={globatStyles.inputText} onChangeText={(text) => setBranchName(text)} />
                <TextInput placeholder='Product/Service Detail' style={globatStyles.inputText} onChangeText={(text) => setServicesDetails(text)} />
                <Pressable style={globatStyles.button} onPress={addbankAccountDetails}><Text style={globatStyles.btnText}>Next</Text></Pressable>
                <View></View>
            </View >
        </ScrollView>

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


export default BankDetails