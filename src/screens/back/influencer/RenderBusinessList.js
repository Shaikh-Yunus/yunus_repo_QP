import React, { useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    Pressable,
    ActivityIndicator,
} from 'react-native'
import SelectDropdown from 'react-native-select-dropdown'
import Images from '../../../assets/images/Images'
import Constants from '../../../shared/Constants'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import globatStyles from '../../../shared/globatStyles'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import axios from 'axios'
import showToastmsg from '../../../shared/showToastmsg'
import { useNavigation } from '@react-navigation/native'
import FastImage from 'react-native-fast-image'

const RenderBusinessList = ({ item, userdetails, tabs }) => {

    const [loader, setLoader] = useState(false)
    const navigation = useNavigation()

    const createPost = () => {
        navigation.navigate('/profileScreen', { userDetails: item?.item, type: 'advertiser', advertiser: userdetails })
    }
    const Reject = () => {
        setLoader(true)
        axios.post(`${Constants.BASE_URL}Change/AdvertiserCollabration/Status`, {
            "From": 2,
            "collabration_id": item?.item?.id,
            "status": 3
        }).then((response) => {
            console.log("collobration", response?.data)
            if (response.status == 200) {
                setLoader(false)
                showToastmsg('Collaboration Rejected')
                // getBussinessRequests('ongoing')
                // getBussinessRequests(tabs)
            }
        }).catch((error) => {
            setLoader(false)
            console.log("error data", error.response);
            showToastmsg("Can't Reject this collaboration, please try again later.")
        })
    }
    const Accept = () => {
        setLoader(true)
        axios.post(`${Constants.BASE_URL}Change/AdvertiserCollabration/Status`, {
            "From": 2,
            "collabration_id": item?.item?.id,
            "status": 2
        }).then((response) => {
            console.log("collobration", response?.data)
            if (response.status == 200) {
                setLoader(false)
                showToastmsg('Collaboration successfully')
                // getBussinessRequests('ongoing')
                // getBussinessRequests(tabs)
            }
        }).catch((error) => {
            setLoader(false)
            console.log("error data", error.response);
             showToastmsg("Can't approved this collaboration, please try again later.")
        })
    }
    const endContractFn = () => {
        setLoader(true)
        axios.post(`${Constants.BASE_URL}Change/AdvertiserCollabration/Status`, {
            "From": 2,
            "collabration_id": item?.item?.id,
            "status": 4
        }).then((response) => {
            console.log("collobration", response?.data)
            if (response.status == 200) {
                setLoader(false)
                showToastmsg('Contract Ended')
                // getBussinessRequests('ongoing')
                // getBussinessRequests(tabs)
            }
        }).catch((error) => {
            setLoader(false)
            console.log("error data", error.response);
            showToastmsg("Can't approved this collaboration, please try again later.")
        })
    }
    return (
        <View style={styles.container}>
            {console.log("collobrationid", item?.item)}
            {console.log('check_list', userdetails)}
            <View style={styles.headingLine}>
                <View style={{ flexDirection: 'row', }}>
                    <View style={styles.barndIcon}>
                        <FastImage source={item?.item?.business_profile_pic ?
                            { uri: `${Constants.BASE_IMAGE_URL}${item?.item?.business_profile_pic}` }
                            : Images.nike} style={{
                                width: item?.item?.business_profile_pic && 48,
                                height: item?.item?.business_profile_pic && 48,
                            }} />
                    </View>
                    <View>
                        <Text style={{ fontFamily: Constants.fontFamily, fontSize: responsiveFontSize(2.2), fontWeight: '700', }}>{item?.item?.username}</Text>
                        <Text style={{ fontFamily: Constants.fontFamily, color: '#A4A4B2' }}>Fashion</Text>
                    </View>
                </View>
                {/* <Text style={{ fontFamily: Constants.fontFamily, fontWeight: '700', }}>24M Followers</Text> */}
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ width: '70%' }}>
                    <Text style={{ fontFamily: Constants.fontFamily, fontSize: 15, textTransform: 'uppercase', marginTop: 8, marginBottom: 6, }}>Lorem Ipsum Dolor SIt</Text>
                    <Text style={{ fontFamily: Constants.fontFamily, fontSize: 12, }}>consectetur adipiscing elit, sed do smod tempor incididunt ut . Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.ipsum dolor sit amet. Lorem ipsum dolor sit amet.ipsum dolor sit amet.</Text>
                </View>
                <View>
                    <Image source={Images.business} />
                </View>
            </View>
            {tabs == 'ongoing' ? loader ?
                <ActivityIndicator size={30} color={'#FF0000'} /> :
                <View style={{ display: 'flex', flexDirection: 'row', marginTop: 10 }}>
                    <Pressable onPress={createPost} style={[styles.btnOutline, { borderColor: Constants.colors.primaryColor, marginRight: 8 }]}>
                        <Text style={[styles.btnText, { color: '#00A928' }]}>Create Post</Text>
                    </Pressable>
                    <Pressable style={styles.btnOutline} onPress={() => endContractFn('ended')}>
                        <Text style={styles.btnText}>End Contract</Text>
                    </Pressable>
                </View> : null}
            {tabs == 'pending' ? loader ?
                <ActivityIndicator size={30} color={'#FF0000'} /> :
                <View style={{ display: 'flex', flexDirection: 'row', marginTop: 10 }}>
                    <Pressable onPress={() => Accept('approve')} style={[styles.btnOutline, { borderColor: Constants.colors.primaryColor, marginRight: 8 }]}>
                        <Text style={[styles.btnText, { color: '#00A928' }]}>Accept</Text>
                    </Pressable>
                    <Pressable onPress={() => Reject('reject')} style={styles.btnOutline}>
                        <Text style={styles.btnText}>Reject</Text>
                    </Pressable>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                        <Text style={{ fontFamily: Constants.fontFamily, fontSize: 12, color: '#747474', marginTop: 12, }}>Requested at: {item?.item?.StartedAt}</Text>
                        {/* <Text style={{ fontFamily: Constants.fontFamily, fontSize: 12, color: '#747474', marginTop: 10, }}>ending on: 12/09/2021</Text> */}
                    </View>
                </View> : null}


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Constants.colors.whiteColor,
        padding: 12,
        marginTop: 12,
        borderRadius: Constants.borderRadius,
        paddingBottom: Constants.padding + 12,
    },
    headingLine: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    barndIcon: {
        width: responsiveWidth(15),
        height: responsiveHeight(7),
        // backgroundColor: '#000000',
        borderRadius: 15,
        // alignItems: 'center',
        // justifyContent: 'center',
        marginRight: 12,
        borderWidth: 1
    },
    btnText: {
        fontFamily: Constants.fontFamily,
        fontSize: 14,
        fontWeight: '800',
        color: '#FF0000',
        alignSelf: 'center',
    }, btnOutline: {
        padding: 8,
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#FF0000',
        borderRadius: Constants.borderRadius,
        width: '44%',
        marginLeft: 10
    },


})

export default RenderBusinessList