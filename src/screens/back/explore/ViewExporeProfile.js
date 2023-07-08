import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    ActivityIndicator,
} from 'react-native'
import Images from '../../../assets/images/Images'
import CustomAppBar from '../../../components/business/CustomAppBar'
import Constants from '../../../shared/Constants'
import { useNavigation } from '@react-navigation/native'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import axios from 'axios'
import showToastmsg from '../../../shared/showToastmsg'
import FastImage from 'react-native-fast-image'

const ViewExploreProfile = (props) => {
    const [cameraImg, setCameraImg] = useState(null)
    const [imageLoader, setImageLoader] = useState(false)
    const [orderCount, setorderCount] = useState(0)
    const [gender, setGender] = useState('male')
    const [showDrawer, setShowDrawer] = useState(false)
    const [username, setusername] = useState()
    const [dob, setdob] = useState()
    const [followingCount, setfollowingCount] = useState(0)
    const UserType = Object.keys(props.route.params.userDetails)[Object.keys(props.route.params.userDetails).length - 1]
    const openDrawer = () => {
        setShowDrawer(!showDrawer)
    }

    function calculate_age(dob) {
        var diff_ms = Date.now() - dob.getTime();
        var age_dt = new Date(diff_ms);

        return Math.abs(age_dt.getUTCFullYear() - 1970);
    }
    
    useEffect(() => {
        setImageLoader(true)
        axios.get(`${Constants.BASE_IMAGE_URL}${props?.route?.params?.userDetails?.explore?.avatar}`, { responseType: "stream" })
            .then(async (response) => {
                axios.get(`${Constants.BASE_URL}explore/get-explore-profile/${props?.route?.params?.userDetails?.id}`)
                    .then(async (res) => {
                        // console.log('sdsd',res.data.data.explore.explore_details.explore.dob)
                        setImageLoader(false)
                        if (res.data) {
                            setorderCount(res.data.data.explore.orders)
                            setfollowingCount(res.data.data.explore.following)
                            setdob(res.data.data.explore.explore_details.explore.dob)
                        }
                    })
                    .catch((error) => {
                        console.log("error data", error);
                        setImageLoader(false)
                    })
                setCameraImg({ "fileName": props?.route?.params?.userDetails?.explore?.avatar.split('/')[props?.route?.params?.userDetails?.explore?.avatar.split('/').length - 1], "fileSize": response.headers['content-length'], "height": 177, "type": response.headers['content-type'], "uri": Constants.BASE_IMAGE_URL + props?.route?.params?.userDetails?.explore?.avatar, "width": 285 })
            }).catch((err) => { setImageLoader(false) });
        const datas = props?.route?.params?.userDetails

        setusername(datas?.name)
        // let [day, month, year] = datas?.explore?.dob.split('/');
        // let date = new Date(+year, month - 1, day);
        // setdob(date)
        setGender(datas?.explore?.gender)

    }, [props])
    return (
        <View style={styles.wrapper}>
            <CustomAppBar navigation={props.navigation} isMainscreen={false} isReel={false} title='Profile' editable={true}
                isInfluencer={props?.route?.params?.type} type={UserType}
                name={props?.route?.params?.type ? props?.route?.params?.userDetails?.username : props?.route?.params?.userDetails?.name} openDrawer={openDrawer} userDetails={props?.route?.params?.userDetails} showDrawer={showDrawer}
            />

            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.editText}></Text>
                </View>
                <View style={styles.container}>
                    {
                        imageLoader ?
                            <View style={[styles.cameraContainer, { position: 'relative' }]}>
                                <FastImage source={Images.userInfoLogo} style={[styles.logo, { opacity: 0.5 }]} />
                                <View style={{ position: 'absolute', width: '100%', top: '35%' }}>
                                    <ActivityIndicator size={40} color={'red'} />
                                </View>
                            </View>
                            : cameraImg ? (
                                <View style={styles.cameraContainer}>
                                    {/* <Pressable onPress={()=>setvisible(!visible)}> */}
                                    <FastImage source={{ uri: cameraImg.uri }} alt='Img' style={styles.logo} />
                                    {/* </Pressable> */}
                                    {/* <Pressable onPress={removeImg} style={styles.removeImg}><Text style={styles.removeIcon}>X</Text></Pressable> */}
                                </View>
                            ) : (
                                <View style={styles.cameraContainer}>
                                    <FastImage source={Images.userInfoLogo} style={styles.logo} />
                                    <FastImage source={Images.cameraIcontTwo} style={styles.cameraIcon} />
                                </View>
                            )
                    }
                    <View style={{ width: '100%', paddingLeft: 40 }}>
                        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                            <Text style={styles.leftText}>
                                Name
                            </Text>
                            <Text style={styles.rightText}>
                                {username}
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                            <Text style={styles.leftText}>
                                Email
                            </Text>
                            <Text style={styles.rightText}>
                                {props?.route?.params?.userDetails?.email}
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                            <Text style={styles.leftText}>
                                Phone Number
                            </Text>
                            <Text style={styles.rightText}>
                                +91 {props?.route?.params?.userDetails?.mobile_number}
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                            <Text style={styles.leftText}>
                                Gender
                            </Text>
                            <Text style={[styles.rightText, { textTransform: 'capitalize' }]}>
                                {gender}
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                            <Text style={styles.leftText}>
                                Age
                            </Text>
                            {console.log('check_age', props?.route?.params?.userDetails?.explore?.dob)}
                            <Text style={[styles.rightText, { textTransform: 'capitalize' }]}>
                                {dob
                                    ? isNaN(calculate_age(new Date(dob)))
                                        ? 'Invalid date'
                                        : calculate_age(new Date(dob))
                                    : '0'}
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                            <Text style={styles.leftText}>
                                DOB
                            </Text>
                            <Text style={[styles.rightText, { textTransform: 'capitalize' }]}>
                                {dob
                                    ? dob.split('-').reverse().join('/')
                                    : ''}
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={styles.divider}></View>
                <View style={{ paddingLeft: 30, width: "95%", paddingTop: 30, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                    <View style={[styles.boxstyle, { width: '40%' }]}>
                        <Text style={styles.boxTextStyle}>
                            Orders   <Text style={{ fontWeight: "700" }}>{orderCount}</Text>
                        </Text>
                    </View>
                    <View style={styles.boxstyle}>
                        <Text style={styles.boxTextStyle}>
                            Following   <Text style={{ fontWeight: "700" }}>{followingCount}</Text>
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    boxstyle: {
        backgroundColor: "rgba(0, 169, 40, 0.14)",
        borderRadius: 10,
        width: "50%"
    },
    boxTextStyle: {
        fontFamily: Constants.fontFamily,
        fontWeight: "400",
        fontSize: 18,
        paddingLeft: 12, paddingTop: 10, paddingBottom: 10,
        color: '#00A928',
        textAlign: 'center'
    },
    divider: {
        width: '80%',
        height: 1,
        backgroundColor: '#D1D1D1',
        marginLeft: 45,
    },
    leftText: {
        width: "35%",
        fontFamily: Constants.fontFamily,
        color: '#484848',
        fontSize: 14,
        fontWeight: '300'
    },
    rightText: {
        width: "75%",
        fontFamily: Constants.fontFamily,
        color: '#484848',
        fontSize: 14,
        fontWeight: 'bold'
    },
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

export default ViewExploreProfile