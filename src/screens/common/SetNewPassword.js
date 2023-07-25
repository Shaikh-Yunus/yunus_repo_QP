import { ActivityIndicator, Pressable, StyleSheet, Text, View, Modal, Alert } from 'react-native'
import React from 'react'
import CustomAppBar from '../../components/explore/CustomAppBar'
import { useNavigation } from '@react-navigation/native'
import Constants from '../../shared/Constants'
import { constants } from 'pako'
import { useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import globatStyles from '../../shared/globatStyles'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import axios from 'axios'
import showToastmsg from '../../shared/showToastmsg'
const SetNewPassword = (props, { userid }) => {
    const [visible, setvisible] = useState()
    const [showPass, setShowPass] = useState(false)
    const [showCPass, setShowCPass] = useState(false)
    const [showCurrentPass, setShowCurrentPass] = useState(false)

    const [currentpassword, setCurrentPasswod] = useState()
    const [newPassword, SetNewPassword] = useState()
    const [confirmPassowrd, setconfirmPassowrd] = useState()
    const [modalVisible, setModalVisible] = useState(false);
    const [buttonLoader, setButtonLoader] = useState(false)
    const navigation = useNavigation();
    const [IsLoading, setIsLoading] = useState(false)

    const [isconfirmPassowrdValid, setIsconfirmPassowrdValid] = useState(true)
    const usernamePattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const [ispasswordValid, setIspasswordValid] = useState(true)
    const [iscupasswordValid, setIscupasswordValid] = useState(true)


    const CheckCurrentPassword = () => {
        console.log("check cureent password")
        if (currentpassword === "" || currentpassword === null) {
            showToastmsg('Please enter your password')
        } else if (!usernamePattern.test(currentpassword)) {
            setIscupasswordValid(false)
            showToastmsg('Password must contain Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character')
        }
        else {
            setIsLoading(true)

            axios.post(`${Constants.BASE_URL}VerifyCurrentPassword`, {
                "user_id": props?.route?.params?.userid,
                "password": currentpassword
            }).then((response) => {
                setIsLoading(false)
                if (response?.data?.Status == 401) {
                    showToastmsg('enter valid password ')
                    console.log("response", "please enter valid current pass")
                }
                else {
                    setModalVisible(true)
                }
            }).catch((err) => {
                setIsLoading(false)
                console.log("err", err)
                showToastmsg(err[AxiosError])
            })
        }
    }

    const ChangePassword = () => {
        if (newPassword === '' || newPassword === null) {
            setIspasswordValid(false)
            showToastmsg('Please enter new password')
        }
        else if (!usernamePattern.test(newPassword)) {
            setIspasswordValid(false)
            showToastmsg('Password must contain Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character')
        }
        else if (confirmPassowrd === '' || confirmPassowrd === null) {
            setIsconfirmPassowrdValid(false)
            showToastmsg('Please enter confirm password')
        }
        else if (newPassword !== confirmPassowrd) {
            setIsconfirmPassowrdValid(false)
            showToastmsg('Password did not match')
        }

        else {
            setIsLoading(true)

            axios.post(`${Constants.BASE_URL}ChangeCurrentPassword`, {
                "user_id": props?.route?.params?.userid,
                "password": confirmPassowrd
            }).then((response) => {
                setIsLoading(false)
                if (response?.data?.Status == 200) {
                    navigation.goBack()
                    // if (props?.route?.params?.userDetails == "business" ) {
                    //     navigation.navigate('/home', { "userDetails": props?.route?.params?.userDetails })
                    // }
                    // else if (props?.route?.params?.userDetails == "advertiser" ) {
                    //     navigation.navigate('/influencer-stack-navigation', { userDetails: props?.route?.params?.userDetails, userType: 'Advertiser' })
                    // }
                    // else if (props?.route?.params?.userDetails == "inflencer") {
                    //     navigation.navigate('/influencer-stack-navigation', { userDetails: props?.route?.params?.userDetails, userType: 'Influencer' })
                    // }
                    // else  if(props?.route?.params?.userDetails == "explorer"){
                    //     navigation.navigate('/influencer-stack-navigation', { userDetails: response.data.user, userType: 'Explorer' })
                    // }
                    showToastmsg('password update successfully')
                    console.log("response", "done pass set")
                }
            }).catch((err) => {
                setIsLoading(false)
                console.log("err", err)
                showToastmsg("Network issue")
            })
        }
    }

    const gotoForgotPass = () => {
        navigation.navigate('/email-verify', { userType: props.route.params.login_type, phoneType: "forgotpassword" })
    }
    return (
        <View style={styles.container}>
            {console.log('props', props?.route?.params?.userDetails)}
            <CustomAppBar navigation={navigation} isMainscreen={false} isReel={false} title='Change password' headerRight={false} />
            <Text style={styles.description}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod  incididunt ut check .
            </Text>

            <View style={styles.viewcontainer}>
                <View>
                    <Text style={[globatStyles.inputLabel, { paddingLeft: 9 }]}>Current Password</Text>

                    <TextInput style={globatStyles.inputText} secureTextEntry={!showCurrentPass} value={currentpassword} placeholder='Current Password' onChangeText={text => { setCurrentPasswod(text), setIscupasswordValid(true) }} />
                    <FontAwesome name={showCurrentPass ? 'eye-slash' : 'eye'} style={styles.eyeIcon} onPress={() => setShowCurrentPass(!showCurrentPass)} />
                    {!iscupasswordValid && <Text style={{ top: 85, color: 'red', position: 'absolute' }}>Please enter  password</Text>}
                </View>

                <Text style={styles.forgotPassLink} onPress={gotoForgotPass}>Forgot Password</Text>
                {IsLoading ? <ActivityIndicator size={30} color={Constants.colors.whiteColor} /> :
                    <Pressable onPress={CheckCurrentPassword} style={[globatStyles.button]}>
                        {buttonLoader ? <ActivityIndicator size={20} color={Constants.colors.whiteColor} />
                            : <Text style={globatStyles.btnText}>Verify Password </Text>}
                    </Pressable>}
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                        setModalVisible(!modalVisible);
                    }}>
                    <CustomAppBar navigation={navigation} isMainscreen={false} isReel={false} title='Change password' headerRight={false} />
                    <Text style={{
                        fontFamily: Constants.fontFamily,
                        marginBottom: 20,
                        padding: Constants.padding,
                    }}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod  incididunt ut check .
                    </Text>
                    <View style={styles.centeredView}>

                        <View style={styles.modalView}>
                            <View>
                                <Text style={[globatStyles.inputLabel, { paddingLeft: 9, fontWeight: '600', fontFamily: 'Aviner' }]}>New password</Text>

                                <TextInput style={[globatStyles.inputText, {
                                    backgroundColor: Constants.colors.primary, borderWidth: 0.5, borderColor: 'gray',
                                }]} secureTextEntry={!showPass}
                                    value={newPassword} placeholder='Password' onChangeText={text => { SetNewPassword(text), setIspasswordValid(true) }} />
                                <FontAwesome name={showPass ? 'eye-slash' : 'eye'} style={styles.eyeIcon} onPress={() => setShowPass(!showPass)} />
                                {!ispasswordValid && <Text style={[globatStyles.errorText, { marginTop: 1 }]}>Please enter confirm password</Text>}

                            </View>
                            <View>
                                <Text style={[globatStyles.inputLabel, { paddingLeft: 9, fontWeight: '600', fontFamily: 'Aviner' }]}>Re-type password</Text>
                                <TextInput style={[globatStyles.inputText, {
                                    backgroundColor: Constants.colors.primary, borderWidth: 0.5, borderColor: 'gray',
                                }]} secureTextEntry={!showCPass}
                                    value={confirmPassowrd} placeholder=' Re-type new password' onChangeText={setconfirmPassowrd} />
                                <FontAwesome name={showCPass ? 'eye-slash' : 'eye'} style={styles.eyeIcon} onPress={() => setShowCPass(!showCPass)} />

                            </View>
                            {IsLoading ? <ActivityIndicator size={30} color={Constants.colors.whiteColor} /> :
                                <Pressable
                                    style={[globatStyles.button]} onPress={() => ChangePassword()}>
                                    {buttonLoader ? <ActivityIndicator size={20} color={Constants.colors.whiteColor} />
                                        : <Text style={globatStyles.btnText}>Change password </Text>}
                                </Pressable>
                            }
                        </View>
                    </View>
                </Modal>





            </View>

        </View>
    )
}

export default SetNewPassword

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 30
    },
    description: {
        fontFamily: Constants.fontFamily,
        marginBottom: Constants.margin,
        padding: Constants.padding,
    },
    textInput: {
        borderWidth: 1,
        height: 50,
        width: "80%",
        padding: 10
    },
    viewcontainer: {
        flex: 1,
        padding: Constants.padding,
    },
    centeredView: {
        flex: 1,
        alignItems: 'center',
        marginTop: 0,
    },
    modalView: {

        height: '70%',
        width: '100%',
        // backgroundColor: 'white',
        backgroundColor: Constants.colors.primary,
        borderRadius: 20,
        padding: Constants.padding,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        }
    },
    eyeIcon: {
        position: 'absolute',
        top: 40,
        right: 25,
        color: '#999999',
        fontSize: 24,

    },
    forgotPassLink: {
        alignSelf: 'flex-start',
        // marginEnd: '%',
        fontSize: 16,
        color: Constants.colors.primaryColor,
        fontFamily: Constants.fontFamily,
        textDecorationLine: 'underline',
        textDecorationColor: Constants.colors.primaryColor,
    },
})