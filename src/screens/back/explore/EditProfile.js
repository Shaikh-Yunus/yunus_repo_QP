import React, { useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    Pressable,
    TextInput,
} from 'react-native'
import DatePicker from 'react-native-date-picker'
import Images from '../../../assets/images/Images'
import CustomAppBar from '../../../components/business/CustomAppBar'
import Constants from '../../../shared/Constants'
import { launchCamera } from 'react-native-image-picker'
import Fontisto from 'react-native-vector-icons/Fontisto'
import globatStyles from '../../../shared/globatStyles'
import { useNavigation } from '@react-navigation/native'

const EditProfile = (props)=>{
    const [cameraImg, setCameraImg] = useState(null)
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const [gender,setGender] = useState('m')
    const navigation = useNavigation()
    const openCamera = async ()=>{
		try{
			const result = await launchCamera()
			setCameraImg(result.assets[0].uri)
		}catch(err){
			console.log(err)
		}
    }
    const removeImg = ()=>{
        setCameraImg(null)
    }
    const gotoUserManagement = ()=>{
        navigation.navigate('/user-management')
    }
    return (
        <View style={styles.wrapper}>
            <CustomAppBar navigation={props.navigation} isMainscreen={false} isReel={false} title='Edit Profile'  />
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.editText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut .</Text>
                </View>
                <View style={styles.container}>
                    {
                        cameraImg?(
                            <View style={styles.cameraContainer}>
                                <Image source={{uri: cameraImg}} alt='Img' style={styles.logo} />
                                <Pressable onPress={removeImg} style={styles.removeImg}><Text style={styles.removeIcon}>X</Text></Pressable>
                            </View>
                        ):(
                            <Pressable style={styles.cameraContainer} onPress={openCamera}>
                                <Image source={Images.userInfoLogo} style={styles.logo} />
                                <Image source={Images.cameraIcontTwo} style={styles.cameraIcon} />
                            </Pressable>
                        )
                    }
                    <View>
                        <Text style={globatStyles.inputLabel}>Name</Text>
                        <TextInput style={globatStyles.inputText} value='Tanveer Inamdar' />
                    </View>
                    <View>
                        <Text style={globatStyles.inputLabel}>Email</Text>
                        <TextInput style={globatStyles.inputText} value='tanveerinamdar@gmail.com' />
                    </View>
                    <View>
                        <Text style={globatStyles.inputLabel}>Phone Number</Text>
                        <TextInput style={globatStyles.inputText} value='+91 9827336473' />
                    </View>
                    <View>
                        <Text style={globatStyles.inputLabel}>Gender</Text>
                        <View style={styles.gender}>
                            {
                                gender==='m'?<Fontisto name='radio-btn-active' onPress={()=>setGender('m')} style={styles.genderIcon} />:<Fontisto style={styles.genderIcon} name='radio-btn-passive' onPress={()=>setGender('m')} />
                            }<Text style={styles.genderLabel}> Male</Text>
                            {
                                gender==='f'?<Fontisto name='radio-btn-active' onPress={()=>setGender('f')} style={styles.genderIcon} />:<Fontisto style={styles.genderIcon} name='radio-btn-passive' onPress={()=>setGender('f')} />
                            }<Text style={styles.genderLabel}> Female</Text>
                            {
                                gender==='o'?<Fontisto name='radio-btn-active' onPress={()=>setGender('o')} style={styles.genderIcon} />:<Fontisto style={styles.genderIcon} name='radio-btn-passive' onPress={()=>setGender('o')} />
                            }<Text style={styles.genderLabel}> Others</Text>
                        </View>
                        <View>
                            <Text style={globatStyles.inputLabel}>Age</Text>
                            <TextInput style={globatStyles.inputText} value='35 yrs' />
                        </View>
                        <View>
                            <Text style={globatStyles.inputLabel}>DOB</Text>
                            <Pressable style={[globatStyles.inputText,{height: 50,}]} onPress={()=>setOpen(true)}><Text></Text></Pressable>
                            <DatePicker
                                modal
                                mode='date'
                                textColor={'black'}
                                open={open}
                                date={date}
                                onDateChange={setDate}
                                onConfirm={(date) => {
                                    setOpen(false)
                                    setDate(date)
                                }}
                                onCancel={() => {
                                    setOpen(false)
                                }}
                            />
                        </View>
                        <Pressable onPress={gotoUserManagement} style={globatStyles.button}><Text style={globatStyles.btnText}>Save</Text></Pressable>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

const styles= StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    container: {
        flex: 1,
        padding: Constants.padding,
    },
    editText: {
        fontFamily: Constants.fontFamily,
    },
    logo: {
        alignSelf: 'center',
        marginTop: Constants.margin,
        marginBottom: Constants.margin+30,
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
    genderIcon:{
        fontSize: 24,
        marginTop: 10,
    },
    genderLabel: {
        marginLeft: 8,
        marginRight: Constants.margin+12,
        marginTop: 10,
    },
})

export default EditProfile