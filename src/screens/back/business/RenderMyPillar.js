import axios from 'axios'
import React, { useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Pressable,
    Image,
    ActivityIndicator,
} from 'react-native'
import FastImage from 'react-native-fast-image'
import Constants from '../../../shared/Constants'
import showToastmsg from '../../../shared/showToastmsg'


const RenderMyPillar = (props) => {
    const [loader, setLoader] = useState(false)

    const url = `${Constants.BASE_URL}${props?.typename == '/my-pillars' ? 'influencer/res-business-collobration' : 'advertiser/res-advertiser-collobration'}`;
    const endContractFn = (status) => {
        setLoader(true)
        axios.post(url, {
            "collobration_id": props?.pillars?.item?.collabration_id,
            "status": status
        }).then((response) => {

            if (response.data.response == 200) {

                setLoader(false)
                showToastmsg(`Collaboration ${status} successfully`)
                props.getData(props.tabs)
            }
        }).catch((error) => {
            setLoader(false)
            console.log("error data", error.response);
            showToastmsg(`Can't ${status} this collaboration, please try again later.`)
        })
    }

    return (
        <View style={styles.wrapper}>
            {/* {console.log('item', props?.typename)}
            {console.log('props?.pillars?.item?.collabration_id', props?.pillars?.item)} */}

            <View style={styles.cardHeading}>
                <FastImage source={{ uri: `${Constants.BASE_IMAGE_URL}${props?.pillars?.item?.avatar}` }} style={{ width: '20%', height: '100%' }} />
                <View style={{ alignItems: 'flex-start', marginLeft: 16, marginRight: 16, }}>
                    <Text style={styles.heading}>{
                        props?.pillars?.item?.username.length > 10 ? props?.pillars?.item?.username.slice(0, 10) + '...' :
                            props?.pillars?.item?.username}</Text>
                    <Text style={styles.designation}>Influencer</Text>
                </View>
                <View style={styles.ongoingWrapper}>
                    <Text style={styles.onGoing}>{props?.pillars?.item?.collabration_status == "approve" ? 'Ongoing' : props?.pillars?.item?.collabration_status}</Text>
                </View>
            </View>
            <View style={styles.cardBody}>
                <Text style={styles.bodyText}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut . Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut .
                </Text>
            </View>
            <View style={styles.cardFooter}>
                {props?.pillars?.item?.collabration_status == 'pending' ? <Text style={styles.footerText}>Requested on :{props?.pillars?.item?.collabration_created_at} </Text>
                :<Text style={styles.footerText}>{props?.pillars?.item?.collabration_status == 'approve' ? 'Started' : 'Ended'} on: {props?.pillars?.item?.collabration_created_at}</Text>
            }
                {props.tabs == 'ongoing' ?
                    loader ?
                        <ActivityIndicator size={30} color={'#FF0000'} /> :

                        <Pressable style={styles.btnOutline} onPress={() => endContractFn('ended')}>
                            <Text style={styles.btnText}>End Contract</Text>
                        </Pressable> : null}
                {props.tabs == 'pending' ? loader ?
                    <ActivityIndicator size={30} color={'#FF0000'} /> :
                    <>{(props?.pillars?.item?.collabration_status == 'ended' || props?.pillars?.item?.collabration_status == 'reject') ? null :
                        <Pressable style={styles.btnOutline} onPress={() => endContractFn('cancel')}>
                            <Text style={styles.btnText}>Cancel request</Text>
                        </Pressable>}</> : null}
            </View>
            {console.log('props?.pillars?.item?.collabration_status', props?.pillars?.item?.collabration_status)}
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: Constants.colors.whiteColor,
        padding: Constants.padding,
        marginBottom: Constants.margin,
        borderRadius: 16,
    },
    cardHeading: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    heading: {
        fontSize: 22,
        fontFamily: Constants.fontFamily,
        fontWeight: '800',
        textTransform: 'capitalize'
    },
    designation: {
        color: '#A4A4B2',
        fontFamily: Constants.fontFamily,
        fontWeight: '500',
        fontSize: 18,
        fontFamily: 'Aviner',
    },
    ongoingWrapper: {
        padding: 5,
        borderRadius: Constants.borderRadius,
        backgroundColor: '#00ffff',

        backgroundColor: 'rgba(128, 255, 185, 0.37)',
    },
    onGoing: {
        color: '#04751F',
        // fontFamily: Constants.fontFamily,
        fontFamily: 'Aviner',
        fontSize: 14,
        fontWeight: '500',
        textTransform: 'capitalize',
        lineHeight: 19,
        fontStyle: 'normal'
    },
    cardBody: {
        marginTop: 16,
        marginBottom: 16,
    },
    bodyText: {
        fontFamily: Constants.fontFamily,
        fontSize: 14,
    },
    cardFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    footerText: {
        fontFamily: Constants.fontFamily,
        color: '#747474',
        fontSize: 14,
    },
    btnOutline: {
        padding: 8,
        backgroundColor: 'transparent',
        borderWidth: 0.8,
        borderColor: '#FF0000',
        borderRadius: Constants.borderRadius,
    },
    btnText: {
        fontFamily: 'Aviner',
        fontSize: 14,
        fontWeight: '800',
        color: '#FF0000',

    },
})

export default RenderMyPillar