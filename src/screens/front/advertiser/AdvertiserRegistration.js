import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    TextInput, Image,
    Pressable,
    ActivityIndicator,
    PermissionsAndroid,
    Modal
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import SelectDropdown from 'react-native-select-dropdown'
import Constants from '../../../shared/Constants'
import globatStyles from '../../../shared/globatStyles'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useState } from 'react'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import Feather from 'react-native-vector-icons/Feather'
import Images from '../../../assets/images/Images'
import Entypo from 'react-native-vector-icons/Entypo'
import { ScrollView } from 'react-native-gesture-handler'
import showToastmsg from '../../../shared/showToastmsg'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import axios from 'axios'
import Dialog, { SlideAnimation, DialogContent, DialogTitle } from 'react-native-popup-dialog';

const AdvertiserRegistration = (props) => {
    const navigation = useNavigation()
    const [cameraImg, setCameraImg] = useState()
    const [buttonLoader, setButtonLoader] = useState(false)
    const [fullName, setfullName] = useState()
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [password, setpassword] = useState()
    const [cPassword, setCpassword] = useState()
    const [username, setUsername] = useState()
    const [emailId, setemailId] = useState()
    const [phone, setPhone] = useState()
    const [companyName, setcompanyName] = useState()
    const [companyWebsite, setcompanyWebsite] = useState()
    const [companyAddress, setcompanyAddress] = useState()
    const [companyOwnerName, setcompanyOwnerName] = useState()
    const [gstNo, setgstNo] = useState()
    const [panCard, setpanCard] = useState()
    const [visible, setvisible] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const requestCameraPermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                    {
                        title: 'Camera Permission',
                        message: 'App needs camera permission',
                    },
                );
                // If CAMERA Permission is granted
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } catch (err) {
                console.warn(err);
                return false;
            }
        } else return true;
    };
    const requestExternalWritePermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: 'External Storage Write Permission',
                        message: 'App needs write permission',
                    },
                );
                // If WRITE_EXTERNAL_STORAGE Permission is granted
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } catch (err) {
                console.warn(err);
                console.log('Write permission err', err);
            }
            return false;
        } else return true;
    };
    const choosePhotoFromLibrary = async () => {
        try {
            const result = await launchImageLibrary()
            setCameraImg(result.assets[0])
            setvisible(false)
        }
        catch (err) {
            console.log("err")
        }
    }
    const openCamera = async () => {
        setCameraImg(null)
        setvisible(false)
        let options = {
            mediaType: 'photo',
            //   maxWidth: 300,
            //   maxHeight: 550,
            //   quality: 1,
            //   videoQuality: 'low',
            //   durationLimit: 30, //Video max duration in seconds
            saveToPhotos: false,
        };
        let isCameraPermitted = await requestCameraPermission();
        let isStoragePermitted = await requestExternalWritePermission();
        if (isCameraPermitted && isStoragePermitted) {
            launchCamera(options, (response) => {
                // console.log('Response = ', response);

                if (response.didCancel) {
                    console.log('User cancelled camera picker');
                    return;
                } else if (response.errorCode == 'camera_unavailable') {
                    console.log('Camera not available on device');
                    return;
                } else if (response.errorCode == 'permission') {
                    console.log('Permission not satisfied');
                    return;
                } else if (response.errorCode == 'others') {
                    console.log(response.errorMessage);
                    return;
                }
                // if(type=='video'){
                setCameraImg(response.assets[0])
                // }
                // else
                // {setCameraImg(response)};
            });
        }
    };

    const removeImg = () => {
        setCameraImg()
    }
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const UrlRegex = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
    const emailIdPattern = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const gstPattern = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
    const gotoOtherDetails = () => {
        if (!cameraImg) {
            showToastmsg('Please add avatar image')
        }
        else if (fullName == '' || fullName == null) {
            showToastmsg('Please add full name')
        }
        else if (emailId == '' || emailId == null) {
            showToastmsg('Please add email id')
        }
        else if (!emailIdPattern.test(emailId)) {
            showToastmsg('Please add valid email id')
        }
        else if (emailId == '' || emailId == null) {
            showToastmsg('Please add email id')
        }
        else if (companyName == '' || companyName == null) {
            showToastmsg('Please add company name')
        }
        else if (companyAddress == '' || companyAddress == null) {
            showToastmsg('Please add company address')
        }
        else if (companyOwnerName == '' || companyOwnerName == null) {
            showToastmsg('Please add company owner name')
        }
        else if (gstNo == '' || gstNo == null) {
            showToastmsg('Please add gst number')
        }
        else if (!gstPattern.test(gstNo)) {
            showToastmsg('Please enter valid gst number')
        }
        else if (panCard == '' || panCard == null) {
            showToastmsg('Please add pan card number')
        }
        else if (phone == '' || phone == null) {
            showToastmsg('Please add phone')
        }
        else if (phone.length < 10) {
            showToastmsg('Please enter 10 digit phone number')
        }
        else if (companyWebsite == '' || phone == companyWebsite) {
            showToastmsg('Please add company website')
        }
        else if (!UrlRegex.test(companyWebsite)) {
            showToastmsg('Please enter valid website link')
        }
        else if (username == '' || username == null) {
            showToastmsg('Please add username')
        }
        else if (password == '' || password == null) {
            showToastmsg('Please add password')
        }
        else if (!passwordPattern.test(password)) {
            showToastmsg('Password must contain Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character')
        }
        else if (cPassword == '' || cPassword == null) {
            showToastmsg('Please add confirm password')
        }
        else if (password != cPassword) {
            showToastmsg('Password did not matched with confirm password')
        }
        else {
            setButtonLoader(true)
            var formdata = new FormData();
            formdata.append("name", fullName);
            formdata.append("username", username);
            formdata.append("email", emailId);
            formdata.append('profile_avatar', { uri: cameraImg.uri, name: cameraImg.fileName, type: cameraImg.type });
            formdata.append("mobile_number", phone);
            formdata.append("gst", gstNo);
            formdata.append("pan_card", panCard);
            formdata.append("company_name", companyName);
            formdata.append("company_website", companyWebsite);
            formdata.append("company_address", companyAddress);
            formdata.append("campany_Owner_name", companyOwnerName);
            formdata.append("is_email_verified", "false");
            formdata.append("is_mobile_verified", "false");
            formdata.append("is_gst_verified", "false");
            formdata.append("is_pan_card_verified", "false");
            formdata.append("is_company_verified", "false");
            formdata.append("password", password);
            formdata.append("age", "40");
            formdata.append("gender", "male");
            const headers = {
                'x-device-id': 'stuff',
                'Content-Type': 'multipart/form-data',
            }
            axios.post(`${Constants.BASE_URL}advertiser/registration`, formdata, {
                headers: headers
            }).then((response) => {
                showToastmsg(response.data.msg)
                if (response.status == 200) {

                    try {
                        axios.post(`${Constants.BASE_URL}auth/mobile-number`, { mobile_number: phone }).then((res) => {

                            if (res.data.response == 200) {
                                setButtonLoader(false)
                                navigation.navigate('/business-otp', { userDetails: response.data.data.user_details, phoneNumber: phone, userType: props.route.params.type })
                                // navigation.navigate('/influencer-stack-navigation',{userDetails:res.data.data.user_details.influencer})   

                                showToastmsg(res.data.msg)
                            }
                            else {
                                setButtonLoader(false)
                                showToastmsg(res.msg)
                            }

                        }).catch((err) => {
                            setButtonLoader(false)
                            console.log("phone number otp error", err)
                        })
                    } catch (error) {
                        setButtonLoader(false)
                        console.log(error)
                    }
                }
                else {
                    setButtonLoader(false)
                }
            }).catch((err) => {
                setButtonLoader(false)
                console.log("influencer registration error", err.response);
            })
        }

    }
    return (
        <SafeAreaView style={styles.wrapper}>
            <Text style={styles.heading}>Advertiser Registration</Text>
            <ScrollView showsVerticalScrollIndicator={false} onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.subHeading}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut .</Text>
                {/* <Text style={styles.heading}>Avatar image</Text> */}
                <Dialog
                    visible={visible}
                    onTouchOutside={() => setvisible(!visible)}
                    onHardwareBackPress={() => setvisible(!visible)}
                    dialogTitle={<DialogTitle title="Profile Image" />}
                    dialogAnimation={new SlideAnimation({
                        slideFrom: 'bottom',
                    })}
                >

                    <DialogContent>
                        {
                            cameraImg ? (
                                <>
                                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap', padding: Constants.padding, }}>


                                        <View style={styles.cameraContainer}>

                                            <Image source={{ uri: cameraImg.uri }} alt='Img' style={{
                                                width: '100%',
                                                height: 100,
                                                resizeMode: 'contain',
                                                margin: 5, marginBottom: 20
                                            }} />
                                            <Pressable onPress={() => removeImg()} style={styles.removeImg}><Text style={styles.removeIcon}>X</Text></Pressable>

                                        </View>

                                    </View>
                                    {/* <View style={{display:'flex',flexDirection:'row',justifyContent:'space-around'}}>
                                <Pressable style={styles.cameraContainer} onPress={openCamera}>
                                    <Image source={Images.cameraIcon} alt='Img' />
                                    <Text style={styles.addCameraText}>Add more</Text>
                                </Pressable>
                                 <Pressable style={styles.cameraContainer} onPress={choosePhotoFromLibrary}>
                                 <Feather name="folder-plus" style={{fontSize:20}}/>
                                 <Text style={styles.addCameraText}>Add more</Text>
                             </Pressable>
                             </View> */}
                                </>
                            ) : (<View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                                <Pressable style={styles.cameraContainer} onPress={openCamera}>
                                    <Image source={Images.photocamera} alt='Img' style={{ height: 40, width: 40 }} />
                                    {/* <Text style={styles.addCameraText}>Add</Text> */}
                                </Pressable>
                                <Pressable style={styles.cameraContainer} onPress={choosePhotoFromLibrary}>
                                    <FontAwesome5 name="folder-plus" size={35} />
                                    {/* <Text style={styles.addCameraText}>Add</Text> */}
                                </Pressable>
                            </View>
                            )
                        }
                    </DialogContent>
                </Dialog>

                {
                    cameraImg ? (
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap', padding: Constants.padding, }}>

                            <View style={styles.cameraContainer}>
                                <Image source={{ uri: cameraImg.uri }} alt='Img' style={{
                                    width: '100%',
                                    height: 100,
                                    resizeMode: 'contain',
                                    margin: 5, marginBottom: 20
                                }} />
                                <Pressable onPress={() => removeImg()} style={styles.removeImg}><Text style={styles.removeIcon}>X</Text></Pressable>

                            </View>

                        </View>
                    ) : (<Pressable
                        style={[styles.button, styles.buttonOpen]}
                        onPress={() => setvisible(!visible)}
                    >
                        <Image
                            style={{ height: 60, width: 60, marginTop: '7%', marginBottom: '2%', alignContent: 'center', alignSelf: 'center', alignItems: 'center' }}
                            source={Images.Avatarprofile}
                        />
                        <Text style={{
                            alignContent: 'center', alignSelf: 'center', alignItems: 'center', color: '#007635', fontWeight: '700', marginBottom: '2%'
                        }}>Upload profile</Text>
                    </Pressable>)

                }


                <TextInput style={globatStyles.inputText} placeholder='Full Name' onChangeText={setfullName} />
                <TextInput style={globatStyles.inputText} placeholder='User name' onChangeText={setUsername} />
                <TextInput style={globatStyles.inputText} placeholder='Email ID' onChangeText={setemailId} />
                <TextInput style={globatStyles.inputText} placeholder='Company name' onChangeText={setcompanyName} />
                <TextInput style={globatStyles.inputText} placeholder='Company website' onChangeText={setcompanyWebsite} />
                <TextInput style={globatStyles.inputText} placeholder='Company address' onChangeText={setcompanyAddress} />
                <TextInput style={globatStyles.inputText} placeholder='Company owner name' onChangeText={setcompanyOwnerName} />
                <TextInput style={globatStyles.inputText} placeholder='Gst number' onChangeText={setgstNo} />
                <TextInput style={globatStyles.inputText} placeholder='Pan card number' onChangeText={setpanCard} />
                <TextInput keyboardType={'name-phone-pad'} placeholder='Phone number' style={globatStyles.inputText} onChangeText={setPhone} />

                <View style={{ marginTop: 12, }}>

                    <TextInput style={globatStyles.inputText} secureTextEntry={!showPassword} placeholder='Enter Password' onChangeText={setpassword} />
                    {
                        showPassword ? (
                            <Entypo name='eye-with-line' color='#D0C9D6' size={22} style={styles.password} onPress={() => setShowPassword(false)} />
                        ) : (
                            <Entypo name='eye' color='#D0C9D6' size={22} style={styles.password} onPress={() => setShowPassword(true)} />
                        )
                    }
                </View>
                <View>
                    <TextInput style={globatStyles.inputText} secureTextEntry={!showConfirmPassword} placeholder='Confirm Password' onChangeText={setCpassword} />
                    {
                        showConfirmPassword ? (
                            <Entypo name='eye-with-line' color='#D0C9D6' size={22} style={styles.password} onPress={() => setShowConfirmPassword(false)} />
                        ) : (
                            <Entypo name='eye' color='#D0C9D6' size={22} style={styles.password} onPress={() => setShowConfirmPassword(true)} />
                        )
                    }
                </View>
                <Pressable style={globatStyles.button} onPress={!buttonLoader && gotoOtherDetails}>{buttonLoader ? <ActivityIndicator size={20} color={Constants.colors.whiteColor} /> : <Text style={globatStyles.btnText}>Next</Text>}</Pressable>
            </ScrollView>
        </SafeAreaView>)
}
const styles = StyleSheet.create({
    wrapper: {
        padding: Constants.padding,
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
    desc: {
        fontFamily: Constants.fontFamily,
        marginTop: Constants.margin,
        marginBottom: Constants.margin,
    },
    calenderIcon: {
        position: 'absolute',
        top: 8,
        right: 10,
        zIndex: 999,
    },
    gender: {
        flexDirection: 'row',
    },
    genderIcon: {
        fontSize: 24,
        marginTop: 10,
    },
    genderLabel: {
        marginLeft: 8,
        marginRight: Constants.margin + 12,
        marginTop: 10,
    },
    socialIcon: {
        height: 60,
        width: 60,
        backgroundColor: Constants.colors.whiteColor,
        borderRadius: Constants.borderRadius,
        marginRight: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    socialCheck: {
        position: 'absolute',
        top: -8,
        left: -8,
    },
    password: {
        position: 'absolute',
        top: 15,
        right: 10,
        zIndex: 999,
    },
    cameraContainer: {

        marginTop: Constants.margin,
        marginBottom: 12,
        width: 90,
        height: 90,
        
        // backgroundColor: Constants.colors.inputBgColor,
        // borderWidth: 0.7,
        // borderColor: '#D2D2D2',
        // borderStyle: 'dashed',
        alignItems: 'center',
        justifyContent: 'center',
        // borderRadius: Constants.borderRadius,
        margin: 20,
    },
    cameraImgContainer: {
        marginTop: Constants.margin,
        marginBottom: 12,
        width: 90,
        height: 90,
        backgroundColor: Constants.colors.inputBgColor,
        borderWidth: 0.7,
        borderColor: '#D2D2D2',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Constants.borderRadius,
    },
    removeImg: {
        position: 'absolute',
        left: 80,
        top: 10,
        width: 25,
        height: 25,
        borderRadius: 25,
        backgroundColor: Constants.colors.primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: Constants.colors.whiteColor,
    },
    removeIcon: {
        fontSize: 16,
        color: Constants.colors.inputBgColor,
    },
    addCameraText: {
        marginTop: 10,
        color: '#007635',
        fontWeight: '700'
    },
    modalView: {
        marginTop: '28%',
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 37,
        shadowColor: "#000",
        right: 3,

        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
})


export default AdvertiserRegistration