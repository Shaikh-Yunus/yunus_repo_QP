import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    Pressable,
    TextInput,
    ActivityIndicator,
} from 'react-native'
import DatePicker from 'react-native-date-picker'
import Images from '../../../assets/images/Images'
import CustomAppBar from '../../../components/business/CustomAppBar'
import Constants from '../../../shared/Constants'
import Fontisto from 'react-native-vector-icons/Fontisto'
import SelectDropdown from 'react-native-select-dropdown'
import globatStyles from '../../../shared/globatStyles'
import { useNavigation } from '@react-navigation/native'
import Dialog, { SlideAnimation, DialogContent, DialogTitle } from 'react-native-popup-dialog';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import Feather from 'react-native-vector-icons/Feather'
import axios from 'axios'
import AntDesign from 'react-native-vector-icons/AntDesign'
import showToastmsg from '../../../shared/showToastmsg'

const EditUser = (props) => {
    const [cameraImg, setCameraImg] = useState(null)
    const [imageLoader, setImageLoader] = useState(false)
    const [open, setOpen] = useState(false)
    const [gender, setGender] = useState('male')
    const [visible, setvisible] = useState(false)
    const [name, setname] = useState()
    const [username, setusername] = useState()
    const [Age, setAge] = useState()
    const [Email, setEmail] = useState()
    console.log("this is email", Email);
    const [phoneNumber, setPhoneNumber] = useState()
    const [password, setPassword] = useState();
    console.log("this is password =>", password);
    const [dob, setdob] = useState(new Date())
    const [buttonLoader, setButtonLoader] = useState(false)
    const navigation = useNavigation()
    const [subCategory, setSubCategory] = useState('')
    const categories = ['Xyz', 'abc', 'xyz123', 'abc123']
    const UserType = Object.keys(props.route.params.userDetails)[Object.keys(props.route.params.userDetails).length - 1]

    const gotoUserManagement = () => {
        if (!cameraImg) {
            showToastmsg('Please add profile image')
        }
        else if (username == '' || username == null) {
            showToastmsg('Please add username')
        }
        else if (UserType !== 'business' && (name == '' || name == null)) {
            showToastmsg('Please add name')
        }
        else if (UserType !== 'business' && (dob == '' || dob == null)) {
            showToastmsg('Please add date of birth')
        }
        else {
            setButtonLoader(true)
            const headers = {
                'x-device-id': 'stuff',
                'Content-Type': 'multipart/form-data',
            }
            var formdata = new FormData();

            formdata.append("username", username);
            if (UserType == 'influencer' || UserType == 'explore') {
                formdata.append("name", name);
                formdata.append("dob", `${dob.getDate()}/${dob.getMonth() + 1}/${dob.getFullYear()}`);
                formdata.append("gender", gender);
                formdata.append('avatar', { uri: cameraImg.uri, name: cameraImg.fileName, type: cameraImg.type });
            }
            if (UserType == 'explore') {
                console.log("explore api");

                formdata.append("explore_id", props?.route?.params?.userDetails?.explore?.explore_id);
                console.log("form data", formdata);
                axios.post(`${Constants.BASE_URL}explore/edit_explore_profile`, formdata, {
                    headers: headers
                }).then((response) => {
                    if (response.status == 200) {
                        setButtonLoader(false)
                        navigation.navigate('/view-explore-profile', { userDetails: response.data.data.user_details })
                        showToastmsg('Profile updated successfully')
                    }
                    else {
                        showToastmsg('Profile updation failed. Please try again')
                        setButtonLoader(false)
                    }
                }).catch((err) => {
                    showToastmsg('Profile updation failed. Please try again')
                    setButtonLoader(false)
                    console.log("explore edit error", err.response);
                })
            }
            else if (UserType == 'influencer') {
                console.log("influencer api");

                formdata.append("influencer_id", props?.route?.params?.userDetails?.influencer?.influencer_id);
                console.log("form data", formdata);
                axios.post(`${Constants.BASE_URL}influencer/edit-influencer-profile`, formdata, {
                    headers: headers
                }).then((response) => {
                    if (response.status == 200) {
                        setButtonLoader(false)
                        navigation.navigate('/profile', { userDetails: response.data.data.user_details })
                        showToastmsg('Profile updated successfully')
                    }
                    else {
                        showToastmsg('Profile updation failed. Please try again')
                        setButtonLoader(false)
                    }
                }).catch((err) => {
                    showToastmsg('Profile updation failed. Please try again')
                    setButtonLoader(false)
                    console.log("influencer edit error", err.response);
                })
            }
            else if (UserType == 'business') {
                console.log("business api");

                formdata.append("business_id", props?.route?.params?.userDetails?.business?.business_id);
                formdata.append("sub_catorige", subCategory);
                formdata.append('profile_avatar', { uri: cameraImg.uri, name: cameraImg.fileName, type: cameraImg.type });
                formdata.append('mobile_number',phoneNumber);
                formdata.append('email',Email );
                formdata.append('age', Age);
                formdata.append('name',name );
                formdata.append('gender',gender );
                console.log("form data", formdata);
                axios.post(`${Constants.BASE_URL}business/edit-bussiness-profile`, formdata, {
                    headers: headers
                }).then((response) => {
                    if (response.status == 200) {
                        setButtonLoader(false)
                        navigation.navigate('/profileScreen', { userDetails: response.data.data.user_details })
                        showToastmsg('Profile updated successfully')
                    }
                    else {
                        showToastmsg('Profile updation failed. Please try again')
                        setButtonLoader(false)
                    }
                }).catch((err) => {
                    showToastmsg('Profile updation failed. Please try again')
                    setButtonLoader(false)
                    console.log("influencer edit error", err.response);
                })
            }
            else if (UserType == 'advertiser') {
                console.log("advertiser api");
                formdata.append("advertiser_id", props?.route?.params?.userDetails?.advertiser?.advertiser_id);
                formdata.append("name", name);
                formdata.append('avatar', { uri: cameraImg.uri, name: cameraImg.fileName, type: cameraImg.type });
                console.log("form data", formdata);
                axios.post(`${Constants.BASE_URL}advertiser/edit_advertiser_profile`, formdata, {
                    headers: headers
                }).then((response) => {
                    if (response.status == 200) {
                        setButtonLoader(false)
                        navigation.navigate('/advertiser-product', { userDetails: response.data.data.user_details })
                        showToastmsg('Profile updated successfully')
                    }
                    else {
                        showToastmsg('Profile updation failed. Please try again')
                        setButtonLoader(false)
                    }
                }).catch((err) => {
                    showToastmsg('Profile updation failed. Please try again')
                    setButtonLoader(false)
                    console.log("influencer edit error", err.response);
                })
            }
            else {
                console.log("else part");
            }
        }
    }
    const openCamera = async () => {
        try {
            const result = await launchCamera()
            console.log("images", result.assets[0])

            setCameraImg(result.assets[0])
            setvisible(false)
            // setCameraImg([...cameraImg])
        }
        catch (err) {
            console.log("err")
        }
    }
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
    const removeImg = () => {
        setCameraImg()
    }
    useEffect(() => {
        setImageLoader(true)
        if (props?.route?.params?.type == 'influencer') {
            axios.get(`${Constants.BASE_IMAGE_URL}${props?.route?.params?.userDetails?.influencer?.avatar}`, { responseType: "stream" })
                .then((response) => {
                    setImageLoader(false)
                    setCameraImg({ "fileName": props?.route?.params?.userDetails?.influencer?.avatar.split('/')[props?.route?.params?.userDetails?.influencer?.avatar.split('/').length - 1], "fileSize": response.headers['content-length'], "height": 177, "type": response.headers['content-type'], "uri": Constants.BASE_IMAGE_URL + props?.route?.params?.userDetails?.influencer?.avatar, "width": 285 })
                }).catch((err) => { setImageLoader(false) });
        }
        else if (props?.route?.params?.type == 'explore') {
            axios.get(`${Constants.BASE_IMAGE_URL}${props?.route?.params?.userDetails?.explore?.avatar}`, { responseType: "stream" })
                .then((response) => {
                    setImageLoader(false)
                    setCameraImg({ "fileName": props?.route?.params?.userDetails?.explore?.avatar.split('/')[props?.route?.params?.userDetails?.explore?.avatar.split('/').length - 1], "fileSize": response.headers['content-length'], "height": 177, "type": response.headers['content-type'], "uri": Constants.BASE_IMAGE_URL + props?.route?.params?.userDetails?.explore?.avatar, "width": 285 })
                }).catch((err) => { setImageLoader(false) });
        }
        else if (props?.route?.params?.type == 'business') {
            axios.get(`${Constants.BASE_IMAGE_URL}${props?.route?.params?.userDetails?.business?.business_profile_pic}`, { responseType: "stream" })
                .then((response) => {
                    setImageLoader(false)
                    setCameraImg({ "fileName": props?.route?.params?.userDetails?.business?.business_profile_pic.split('/')[props?.route?.params?.userDetails?.business?.business_profile_pic.split('/').length - 1], "fileSize": response.headers['content-length'], "height": 177, "type": response.headers['content-type'], "uri": Constants.BASE_IMAGE_URL + props?.route?.params?.userDetails?.business?.business_profile_pic, "width": 285 })
                }).catch((err) => { setImageLoader(false) });
        }
        else if (props?.route?.params?.type == 'advertiser') {
            axios.get(`${Constants.BASE_IMAGE_URL}${props?.route?.params?.userDetails?.advertiser?.avatar}`, { responseType: "stream" })
                .then((response) => {
                    setImageLoader(false)
                    setCameraImg({ "fileName": props?.route?.params?.userDetails?.advertiser?.avatar.split('/')[props?.route?.params?.userDetails?.advertiser?.avatar.split('/').length - 1], "fileSize": response.headers['content-length'], "height": 177, "type": response.headers['content-type'], "uri": Constants.BASE_IMAGE_URL + props?.route?.params?.userDetails?.advertiser?.avatar, "width": 285 })
                }).catch((err) => { setImageLoader(false) });
        }
        else {
            setImageLoader(false)
            setCameraImg()
        }
        const datas = props?.route?.params?.userDetails
        if (UserType == 'influencer') {
            setname(datas?.influencer?.name)
            setusername(datas?.name)
            let [day, month, year] = datas?.influencer?.dob.split('/');
            let date = new Date(+year, month - 1, day);
            setdob(date)
            setGender(datas?.influencer?.gender)
        }
        else if (UserType == 'explore') {
            setname(datas?.explore?.name)
            setusername(datas?.name)
            let [day, month, year] = datas?.explore?.dob.split('/');
            let date = new Date(+year, month - 1, day);
            setdob(date)
            setGender(datas?.explore?.gender)
        }
        else if (UserType == 'business') {
            setSubCategory(datas?.business?.sub_catorige)
            setusername(datas?.name)
            setPassword(datas?.password)
            setEmail(datas?.business?.owner_email)
            setPhoneNumber(datas?.mobile_number)
            setGender(datas?.gender)
            setAge(datas?.age)

        }
        else if (UserType == 'advertiser') {
            setname(datas?.advertiser?.name)
            setusername(datas?.name)
        }
        else {
            setname()
            setusername()
            setdob()
            setGender('male')
        }
    }, [])
    return (
        <View style={styles.wrapper}>
            <CustomAppBar navigation={props.navigation} isMainscreen={false} isReel={false} title='Edit User Info' />
            {console.log('checking_data0', props?.route?.params?.userDetails)}
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
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                        <Pressable style={styles.cameraContainerinner} onPress={openCamera}>
                            <Image source={Images.cameraIcon} alt='Img' />
                            <Text style={styles.addCameraText}>Add</Text>
                        </Pressable>
                        <Pressable style={[styles.cameraContainerinner, { marginLeft: 10 }]} onPress={choosePhotoFromLibrary}>
                            <Feather name="folder-plus" />
                            <Text style={styles.addCameraText}>Add</Text>
                        </Pressable>
                    </View>
                </DialogContent>
            </Dialog>
            <ScrollView>
                <View style={[styles.container, { alignSelf: 'center' }]}>
                    <Text style={styles.editText}>Edit public information about yourself. These changes will be visible to the other users.</Text>
                </View>
                <View style={styles.container}>
                    {
                        imageLoader ?
                            <View style={[styles.cameraContainer, { position: 'relative' }]}>
                                <Image source={Images.userInfoLogo} style={[styles.logo, { opacity: 0.5 }]} />
                                <View style={{ position: 'absolute', width: '100%', top: '35%' }}>
                                    <ActivityIndicator size={40} color={'red'} />
                                </View>
                            </View>
                            : cameraImg ? (
                                <View style={styles.cameraContainer}>
                                    <Pressable onPress={() => setvisible(!visible)}>
                                        <Image source={{ uri: cameraImg.uri }} alt='Img' style={styles.logo} />
                                    </Pressable>
                                    <Pressable onPress={removeImg} style={styles.removeImg}><Text style={styles.removeIcon}>X</Text></Pressable>
                                </View>
                            ) : (
                                <Pressable style={styles.cameraContainer} onPress={() => setvisible(!visible)}>
                                    <Image source={Images.userInfoLogo} style={styles.logo} />
                                    <Image source={Images.cameraIcontTwo} style={styles.cameraIcon} />
                                </Pressable>
                            )
                    }
                    <View>
                        <Text style={globatStyles.inputLabel}>Username</Text>
                        <TextInput style={globatStyles.inputText} value={username} onChangeText={setusername} />
                    </View>
                    {
                        UserType == 'business' &&
                        <View>
                            {/* <TextInput style={globatStyles.inputText} secureTextEntry value={password ? "*****" : setPassword} onChangeText={(pass) => setPassword(pass)} /> */}
                            <Text style={globatStyles.inputLabel}>EmailId</Text>
                            <TextInput style={globatStyles.inputText} value={Email} onChangeText={setEmail} />
                            <Text style={globatStyles.inputLabel}>Phone Number</Text>
                            <TextInput style={globatStyles.inputText}  keyboardType='number-pad'  value={phoneNumber} onChangeText={setPhoneNumber} />
                            <Text style={globatStyles.inputLabel}>Age</Text>
                            <TextInput style={globatStyles.inputText}  keyboardType='number-pad' value={Age} onChangeText={setAge} />
                            <Text style={globatStyles.inputLabel}>Gender</Text>
                            <View style={styles.gender}>
                                {
                                    gender === 'male' ? <Fontisto name='radio-btn-active' onPress={() => setGender('male')} style={styles.genderIcon} /> : <Fontisto style={styles.genderIcon} name='radio-btn-passive' onPress={() => setGender('male')} />
                                }<Text style={styles.genderLabel}> Male</Text>
                                {
                                    gender === 'female' ? <Fontisto name='radio-btn-active' onPress={() => setGender('female')} style={styles.genderIcon} /> : <Fontisto style={styles.genderIcon} name='radio-btn-passive' onPress={() => setGender('female')} />
                                }<Text style={styles.genderLabel}> Female</Text>
                                {
                                    gender === 'others' ? <Fontisto name='radio-btn-active' onPress={() => setGender('others')} style={styles.genderIcon} /> : <Fontisto style={styles.genderIcon} name='radio-btn-passive' onPress={() => setGender('others')} />
                                }<Text style={styles.genderLabel}> Others</Text>
                            </View>
                        </View>
                    }
                    {UserType !== 'business' &&
                        <><View>
                            <Text style={globatStyles.inputLabel}>Name</Text>
                            <TextInput style={globatStyles.inputText} value={name} onChangeText={setname} />
                        </View>
                            {UserType !== 'advertiser' && <View style={{ width: '100%' }}>
                                <Text style={globatStyles.inputLabel}>Date of birth</Text>

                                <Pressable style={[globatStyles.inputText, { height: 50, }]} onPress={() => setOpen(true)}><Text style={[globatStyles.inputLabel, { position: 'absolute', left: 10, top: 5, zIndex: 999, color: '#999999', }]}>{dob ? `${dob.getDate()}/${dob.getMonth() + 1}/${dob.getFullYear()}` : `Date Of Birth`}</Text>
                                    <AntDesign name='calendar' style={styles.calenderIcon} size={32} color='#999999' />
                                    <Text></Text></Pressable>
                                <DatePicker
                                    modal
                                    mode='date'
                                    textColor={'black'}
                                    open={open}
                                    date={dob ? dob : new Date()}
                                    onConfirm={(date) => {
                                        setOpen(false)
                                        setdob(date)
                                    }}
                                    onCancel={() => {
                                        setOpen(false)
                                    }}
                                />
                            </View>}
                            {UserType !== 'advertiser' && <View>
                                <Text style={globatStyles.inputLabel}>Gender</Text>
                                <View style={styles.gender}>
                                    {
                                        gender === 'male' ? <Fontisto name='radio-btn-active' onPress={() => setGender('male')} style={styles.genderIcon} /> : <Fontisto style={styles.genderIcon} name='radio-btn-passive' onPress={() => setGender('male')} />
                                    }<Text style={styles.genderLabel}> Male</Text>
                                    {
                                        gender === 'female' ? <Fontisto name='radio-btn-active' onPress={() => setGender('female')} style={styles.genderIcon} /> : <Fontisto style={styles.genderIcon} name='radio-btn-passive' onPress={() => setGender('female')} />
                                    }<Text style={styles.genderLabel}> Female</Text>
                                    {
                                        gender === 'others' ? <Fontisto name='radio-btn-active' onPress={() => setGender('others')} style={styles.genderIcon} /> : <Fontisto style={styles.genderIcon} name='radio-btn-passive' onPress={() => setGender('others')} />
                                    }<Text style={styles.genderLabel}> Others</Text>
                                </View>
                            </View>}</>}
                    <Pressable onPress={gotoUserManagement} style={globatStyles.button}>{buttonLoader ? <ActivityIndicator size={20} color={Constants.colors.whiteColor} /> : <Text style={globatStyles.btnText}>Save</Text>}</Pressable>

                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    calenderIcon: {
        position: 'absolute',
        top: 8,
        right: 10,
        zIndex: 999,
    },
    wrapper: {
        flex: 1,
    },
    container: {
        flex: 1,
        padding: Constants.padding,
    },
    editText: {
        fontFamily: Constants.fontFamily,
        flexWrap: 'wrap'
    },
    logo: {
        alignSelf: 'center',
        marginTop: Constants.margin,
        marginBottom: Constants.margin + 30,
        borderWidth: 2,
        width: 175,
        height: 175,
    },
    cameraIcon: {
        position: 'absolute',
        top: '75%',
        left: '45%',
        width: 42,
        height: 32,
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
        right: 85,
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
    cameraContainerinner: {
        marginTop: Constants.margin,
        marginBottom: 12,
        width: 90,
        height: 90,
        backgroundColor: Constants.colors.inputBgColor,
        borderWidth: 0.7,
        borderColor: '#D2D2D2',
        borderStyle: 'dashed',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Constants.borderRadius,
    },
})

export default EditUser