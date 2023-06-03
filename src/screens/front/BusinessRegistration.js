import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Pressable,
    ScrollView,
    Image,
    ActivityIndicator,
    PermissionsAndroid,
    Modal
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import SelectDropdown from 'react-native-select-dropdown'
import Constants from '../../shared/Constants'
import globatStyles from '../../shared/globatStyles'
import AntDesign from 'react-native-vector-icons/AntDesign'
import showToastmsg from '../../shared/showToastmsg'
import { apiCall } from '../../service/service'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import AsyncStorage from '@react-native-async-storage/async-storage'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import axios from 'axios';
import Images from '../../assets/images/Images'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Feather from 'react-native-vector-icons/Feather'
import Dialog, { SlideAnimation, DialogContent, DialogTitle } from 'react-native-popup-dialog';
import { set } from 'react-native-reanimated'

const BusinessRegistration = (props) => {
    const [buttonLoader, setButtonLoader] = useState(false)
    const [cameraImg, setCameraImg] = useState()
    const [companyName, setCompanyName] = useState('')
    const [isCompanyNameValid, setIsCompanyNameValid] = useState(true); // Track the validation status
    const [ownerName, setOwnerName] = useState('')
    const [isownerNameValid, setIsownerNameValid] = useState(true); // Track the validation status
    const [emailId, setEmailId] = useState('')
    const [isemailIdValid, setIsemailIdValid] = useState(true); // Track the validation status
    const [businessemailId, setBusinessEmailId] = useState('')
    const [isbusinessemailIdValid, setIsbusinessemailIdValid] = useState(true)
    const [PhoneNumber, setPhoneNumber] = useState('')
    const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(true)
    // const [subCategory, setSubCategory] = useState('')
    const [username, setusername] = useState('')
    const [isusernameValid, setIsusernameValid] = useState(true)
    const [password, setPassword] = useState('')
    const [ispasswordValid, setIspasswordValid] = useState(true)
    const [confirmPassowrd, setConfirmPassowrd] = useState('')
    const [isconfirmPassowrdValid, setIsconfirmPassowrdValid] = useState(true)
    const [showPass, setShowPass] = useState(false)
    const [showCPass, setShowCPass] = useState(false)
    const [address, setAddress] = useState('')
    const [isaddressValid, setIsaddressValid] = useState(true)


    const [StatesData, setStatesData] = useState([])
    console.log("this is States Data", StatesData);
    const [stateCode, setStateCode] = useState('')
    console.log("this is stateCode", stateCode);
    const [state, setstate] = useState('')
    const [isstateValid, setIsstateValid] = useState(true)

    console.log("this is selected state", state);

    const [cityData, setCityData] = useState([])
    console.log("this is cityData", cityData);
    const [city, setcity] = useState('')
    const [iscityValid, setIscityValid] = useState(true)
    console.log("this is city");
    const [aadharNo, setaadharNo] = useState('')
    const [gstNo, setgstNo] = useState('' ? null : '')
    // console.log("this is gst ", gstNo);
    const [shopAct, setShopAct] = useState('' ? null : null)
    // console.log("this is shopAct ", shopAct);
    const [MCA, setMCA] = useState('' ? null : null)
    // console.log("this is MCA ", MCA);
    const categories = ['Xyz', 'abc', 'xyz123', 'abc123']
    const [isgst, setisgst] = useState('No')
    const [businessType, setbusinessType] = useState("Product")
    const [businessDocId, setbusinessDocId] = useState(null)
    const [isbusinessDocIdValid, setIsbusinessDocIdValid] = useState(true)
    console.log("this is businessDocId", businessDocId);
    const businessDocarray = [
        { id: 1, name: "With GST" },
        { id: 2, name: "With Shopact License" },
        { id: 3, name: "With MCA" },
    ]
    const [modalVisible, setModalVisible] = useState(false);
    const [visible, setvisible] = useState(false);
    // const years = [ '20012', '2013', '2015', '2016', '2017' ]
    const usernamePattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const emailIdPattern = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const gstPattern = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
    const navigation = useNavigation()
    useEffect(() => {
        getStates()
    }, [])

    const userRegistration = async () => {
        if (!cameraImg) {
            showToastmsg('Please add avatar image')
        }
        else if (companyName === '' || companyName === null) {
            setIsCompanyNameValid(false); // Set the validation status to false
            // showToastmsg('Please enter company name')
        }
        else if (ownerName === '' || ownerName === null) {
            setIsownerNameValid(false);
            // showToastmsg('Please enter owner name')
        }
        else if (emailId === '' || emailId === null) {
            setIsemailIdValid(false)
            // showToastmsg('Please enter email ID')
        }
        else if (!emailIdPattern.test(emailId)) {
            setIsemailIdValid(false)
            showToastmsg('Please enter valid email id')
        }
        else if (businessemailId === '' || businessemailId === null) {
            setIsbusinessemailIdValid(false)
            // showToastmsg('Please enter business email ID')
        }
        else if (!emailIdPattern.test(businessemailId)) {
            setIsbusinessemailIdValid(false)
            showToastmsg('Please enter valid business email id')
        }
        else if (PhoneNumber === '' || PhoneNumber === null) {
            setIsPhoneNumberValid(false)
            // showToastmsg('Please enter phone number')
        }
        else if (PhoneNumber.length < 10) {
            setIsPhoneNumberValid(false)
            showToastmsg('Please enter 10 digit phone number')
        }
        else if (address === '' || address === null) {
            setIsaddressValid(false)
            // showToastmsg('Please enter address')
        }
        else if (state === '' || state === null) {
            setIsstateValid(false)
            // showToastmsg('Please enter state')
        }
        else if (city === '' || city === null) {
            setIscityValid(false)
            // showToastmsg('Please enter city')
        }
        else if (businessDocId === '' || businessDocId === null) {
            setIsbusinessDocIdValid(false)
            showToastmsg('Please select verification')
        }
        else if (username === '' || username === null) {
            setIsusernameValid(false)
            showToastmsg('Username cannot be empty')
        }
        else if (password === '' || password === null) {
            setIspasswordValid(false)
            showToastmsg('Please enter your password')
        }
        else if (!usernamePattern.test(password)) {
            setIspasswordValid(false)
            showToastmsg('Password must contain Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character')
        }
        else if (confirmPassowrd === '' || confirmPassowrd === null) {
            setIsconfirmPassowrdValid(false)
            showToastmsg('Please enter confirm password')
        }
        else if (password !== confirmPassowrd) {
            setIsconfirmPassowrdValid(false)
            showToastmsg('Password did not match')
        }
        else {
            setButtonLoader(true)
            const headers = {
                'x-device-id': 'stuff',
                'Content-Type': 'multipart/form-data',
            }
            var formdata = new FormData();
            formdata.append("catorige", props.route.params.category);
            formdata.append("company_name", companyName);
            formdata.append("owner_name", ownerName);
            formdata.append("business_email", businessemailId);
            formdata.append("owner_email", emailId);
            formdata.append("owner_phone", PhoneNumber);
            // formdata.append("owner_adhar", aadharNo);
            formdata.append("business_doc_id", businessDocId);
            // formdata.append("has_gst", isgst === "Yes" ? gstNo : "");
            formdata.append("business_password", password);
            formdata.append("business_address", address);
            formdata.append("username", username);
            // formdata.append("is_product", businessType === "Product");
            // formdata.append("is_service", businessType === "Service");
            formdata.append("city", city);
            formdata.append("state", state);
            formdata.append("country", "India");
            formdata.append("is_biz_email_verified", "false");
            formdata.append("is_owner_email_verified", "false");
            formdata.append("is_phone_no_verified", "false");
            formdata.append("is_adhar_verifed", "false");
            formdata.append("is_business_doc_verfied", "false");
            formdata.append("is_gst_verfied", "false");
            formdata.append('profile_avatar', { uri: cameraImg.uri, name: cameraImg.fileName, type: cameraImg.type });
            // formdata.append("sub_catorige", subCategory);
            formdata.append("age", "40");
            formdata.append("gender", "male");

            axios.post(`${Constants.BASE_URL}business/registration`, formdata, {
                headers: headers
            }).then((response) => {
                console.log("form_data=>", response.data)
                showToastmsg(response.data.msg)
                if (response.status == 200) {

                    try {
                        axios.post(`${Constants.BASE_URL}auth/mobile-number`, { mobile_number: PhoneNumber }).then((res) => {
                            console.log("res-data=>", res.data.response)
                            if (res.data.response == 200) {
                                setButtonLoader(false)
                                // console.log("data values", response.data.data.user_details);
                                // navigation.navigate('/bank-details', { userDetails: response.data.data.user_details, phoneNumber: PhoneNumber, userType: props.route.params.type })
                                // navigation.navigate('/addhaar-no', { userDetails: response.data.data.user_details, phoneNumber: PhoneNumber, userType: props.route.params.type })
                                navigation.navigate('/business-otp', { userDetails: response.data.data.user_details, phoneNumber: PhoneNumber, userType: props.route.params.type })
                                // navigation.navigate('/influencer-stack-navigation',{userDetails:res.data.data.user_details.influencer})   

                                showToastmsg(res.data.msg)
                                console.log("mobile otp value", res.data.data.otp)
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
                        showToastmsg('Registration failed')
                    }
                }
                else {
                    setButtonLoader(false)
                    showToastmsg('Registration failed')
                }
            }).catch((err) => {
                if (err.response.data.Msg == "Email Already Existe") {
                    showToastmsg('Email Already Existe')
                }
                else if (err.response.data.Msg == "Username Already Existe") {
                    showToastmsg('Username Already Existe')
                }
                else if (err.response.data.Msg == "Mobile Number Already Existe") {
                    showToastmsg('Mobile Number Already Existe')
                }
                else {
                    showToastmsg('Registration failed')
                }
                setButtonLoader(false)

                console.log("influencer registration error", err.response);
            })
        }
    }
    const getStates = () => {
        var myHeaders = new Headers();
        myHeaders.append("X-CSCAPI-KEY", "ZzRCdFJRUjhGMnk5MEhublExMmRXczJXTHJwVTdjSFlabWZ1YVJZNQ==");

        var raw = "";

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://api.countrystatecity.in/v1/countries/IN/states", requestOptions)
            .then(response => response.json())
            .then(result => {
                // console.log(result)
                setStatesData(result)
            })
            .catch(error => console.log('error', error));
    }
    const getCities = (stateCODE) => {
        var myHeaders = new Headers();
        myHeaders.append("X-CSCAPI-KEY", "ZzRCdFJRUjhGMnk5MEhublExMmRXczJXTHJwVTdjSFlabWZ1YVJZNQ==");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`https://api.countrystatecity.in/v1/countries/IN/states/${stateCODE}/cities`, requestOptions)
            .then(response => response.json())
            .then(result => {
                // console.log(result)
                setCityData(result)
            })
            .catch(error => console.log('error', error));
    }
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
            console.log("folder image", result.assets[0]);
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
                console.log("repsonse image", response);
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
    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false} onPress={() => setModalVisible(!modalVisible)}>
            <View style={styles.wrapper}>
                <Text style={styles.heading}>Business Registration</Text>
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
                                    resizeMode: 'cover',
                                    margin: 5, marginBottom: 20, borderRadius: Constants.borderRadius,
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


                <TextInput placeholder='Company Name' style={globatStyles.inputText}
                    onChangeText={(text) => {
                        setCompanyName(text)
                        setIsCompanyNameValid(true)
                    }
                    } />
                {!isCompanyNameValid && <Text style={globatStyles.errorText}>Please enter company name</Text>}
                <TextInput placeholder='Owner Name' style={globatStyles.inputText} onChangeText={text => {
                    setOwnerName(text)
                    setIsownerNameValid(true)
                }
                } />
                {!isownerNameValid && <Text style={globatStyles.errorText}>Please enter owner name</Text>}
                <TextInput keyboardType={'email-address'} placeholder='Email ID' style={globatStyles.inputText}
                    onChangeText={(text) => {
                        setEmailId(text)
                        setIsemailIdValid(true)
                    }} />
                {!isemailIdValid && <Text style={globatStyles.errorText}>Please enter Email Id</Text>}

                <TextInput keyboardType={'email-address'} placeholder='Business Email ID' style={globatStyles.inputText}
                    onChangeText={text => {
                        setBusinessEmailId(text)
                        setIsbusinessemailIdValid(true)
                    }} />
                {!isbusinessemailIdValid && <Text style={globatStyles.errorText}>Please enter business email id</Text>}

                <TextInput keyboardType={'phone-pad'} style={globatStyles.inputText} maxLength={10} placeholder='Phone number'
                    onChangeText={(e) => {
                        setPhoneNumber(e)
                        setIsPhoneNumberValid(true)
                    }} />
                {!isPhoneNumberValid && <Text style={globatStyles.errorText}>Please enter phone number</Text>}

                <TextInput style={globatStyles.inputText} placeholder='Address' onChangeText={(e) => {
                    setAddress(e)
                    setIsaddressValid(true)
                }} />
                {!isaddressValid && <Text style={globatStyles.errorText}>Please enter address</Text>}

                <SelectDropdown
                    data={StatesData.map(state => state.name, state.iso2)}
                    defaultButtonText='Select State'
                    search
                    buttonStyle={globatStyles.dropDownBox}
                    buttonTextStyle={globatStyles.dropdownTextStyle}
                    rowTextStyle={globatStyles.dropDownListStyle}
                    renderDropdownIcon={() => <AntDesign name='down' />}
                    onSelect={(selectedItem, index) => {
                        const selectedState = StatesData[index]; // Get the selected state object
                        setstate(selectedItem)
                        setStateCode(selectedState.iso2); // Set the selected state ID
                        getCities(selectedState.iso2)
                        setIsstateValid(true)
                    }} />
                {!isstateValid && <Text style={globatStyles.errorText}>Please select state</Text>}

                <SelectDropdown
                    data={cityData.map(city => city.name)}
                    defaultButtonText='Select City'
                    search
                    buttonStyle={globatStyles.dropDownBox}
                    buttonTextStyle={globatStyles.dropdownTextStyle}
                    rowTextStyle={globatStyles.dropDownListStyle}
                    renderDropdownIcon={() => <AntDesign name='down' />}
                    onSelect={(selectedItem, index) => {
                        const selectedState = StatesData[index]; // Get the selected state object
                        setcity(selectedItem)
                        setIscityValid(true)
                    }} />
                {!iscityValid && <Text style={globatStyles.errorText}>Please select state</Text>}

                <Text style={styles.subHeading}>
                    How do you want to verify your business
                </Text>
                <SelectDropdown
                    data={businessDocarray.map(type => type.name)}
                    defaultButtonText='Business verification'
                    buttonStyle={globatStyles.dropDownBox}
                    buttonTextStyle={globatStyles.dropdownTextStyle}
                    rowTextStyle={globatStyles.dropDownListStyle}
                    renderDropdownIcon={() => <AntDesign name='down' />}
                    onSelect={(selectedItem, index) => {
                        setbusinessDocId(selectedItem)
                        setIsbusinessDocIdValid(true)
                    }}
                />
                {!isbusinessDocIdValid && <Text style={globatStyles.errorText}>Please select verification type</Text>}

                <TextInput placeholder='Username' style={globatStyles.inputText}
                    onChangeText={text => {
                        setusername(text)
                        setIsusernameValid(true)
                    }
                    } />
                {!isusernameValid && <Text style={globatStyles.errorText}>Please enter user name</Text>}

                <View style={{ flex: 1, width: '100%', justifyContent: "center", position: "relative" }}>
                    <TextInput style={globatStyles.inputText} placeholder='Create Password'
                        onChangeText={text => {
                            setPassword(text)
                            setIspasswordValid(true)
                        }} secureTextEntry={!showPass} />
                    <FontAwesome name={showPass ? 'eye-slash' : 'eye'} style={styles.eyeIcon} onPress={() => setShowPass(!showPass)} />
                </View>
                {!ispasswordValid && <Text style={globatStyles.errorText}>Please enter password</Text>}

                <View style={{ flex: 1, width: '100%', justifyContent: 'center', position: "relative" }}>
                    <TextInput style={globatStyles.inputText} placeholder='Confirm Password' onChangeText={text => {
                        setConfirmPassowrd(text)
                        setIsconfirmPassValid(true)
                    }} secureTextEntry={!showCPass} />
                    <FontAwesome name={showCPass ? 'eye-slash' : 'eye'} style={styles.eyeIcon} onPress={() => setShowCPass(!showCPass)} />
                </View>
                {!isconfirmPassowrdValid && <Text style={globatStyles.errorText}>Please enter confirm password</Text>}

                <Pressable style={[globatStyles.button, { marginTop: 10 }]}
                    onPress={!buttonLoader && userRegistration}
                >
                    {buttonLoader ?
                        <ActivityIndicator size={20} color={Constants.colors.whiteColor} />
                        :
                        <Text style={globatStyles.btnText}>Next</Text>}
                </Pressable>
            </View>
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
    eyeIcon: {
        position: 'absolute',
        top: 15,
        right: 25,
        color: '#999999',
        fontSize: 24,
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
        marginTop: '18%',
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


export default BusinessRegistration