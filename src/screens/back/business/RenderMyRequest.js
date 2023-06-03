import React, { useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Pressable,
    Image,
    ActivityIndicator,
} from 'react-native'
import axios from 'axios'
import Images from '../../../assets/images/Images'
import Constants from '../../../shared/Constants'
import showToastmsg from '../../../shared/showToastmsg'
import { useNavigation } from '@react-navigation/native'
import FastImage from 'react-native-fast-image'

const RenderMyRequest = ({ pillars, tabs, getBussinessRequests }) => {
    const navigation = useNavigation()
    const [loader, setLoader] = useState(false)
    const endContractFn = (status) => {
        setLoader(true)
        axios.post(`${Constants.BASE_URL}influencer/res-business-collobration`, {
            "collobration_id": pillars?.item?.collabration_id,
            "status": status
        }).then((response) => {
            console.log("collobration", pillars?.item?.collabration_id)
            if (response.data.response == 200) {
                setLoader(false)
                showToastmsg(`Collaboration ${status} successfully`)
                if (status == 'approve')
                    getBussinessRequests('ongoing')
                else
                    getBussinessRequests(tabs)
            }
        }).catch((error) => {
            setLoader(false)
            console.log("error data", error.response);
            showToastmsg(`Can't ${status} this collaboration, please try again later.`)
        })
    }
    const createPost = () => {
        navigation.navigate('/profileScreen', { userDetails: pillars.item, type: 'influencer' })
    }
    console.log("business data", pillars.item);
    return (
        <View style={styles.wrapper}>
            {console.log(' pillars.item,', pillars.item)}
            <View style={styles.cardHeading}>
                <FastImage source={{ uri: `${Constants.BASE_IMAGE_URL}${pillars?.item?.business_profile_pic}` }} style={{ width: '20%', height: '100%' }} />
                <View style={{ alignItems: 'flex-start', marginLeft: 16, marginRight: 16, }}>
                    <Text style={styles.heading}>{
                        pillars?.item?.username.length > 10 ? pillars?.item?.username.slice(0, 10) + '...' :
                            pillars?.item?.username
                    }</Text>
                    <Text style={styles.designation}>Business</Text>
                </View>
                <View style={styles.ongoingWrapper}>
                    <Text style={styles.onGoing}>{pillars?.item?.collabration_status == "approve" ? 'Ongoing' : pillars?.item?.collabration_status}</Text>
                </View>
            </View>
            <View style={styles.cardBody}>
                <Text style={styles.bodyText}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut . Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut .
                </Text>
            </View>
            <View style={styles.cardFooter}>
                {tabs == 'ongoing' ? <Text style={styles.footerText}>{pillars?.item?.collabration_status == 'ended' ? 'Ended' : 'Started'} on: {new Date(pillars?.item?.created_at).getDate()}/{new Date(pillars?.item?.created_at).getMonth() + 1}/{new Date(pillars?.item?.created_at).getFullYear()}</Text> : null}
                {/* {tabs=='ongoing'?
            loader?
                <ActivityIndicator size={30} color={'#FF0000'}/>:
                
                    <Pressable style={styles.btnOutline} onPress={()=>endContractFn('ended')}>
                <Text style={styles.btnText}>End Contract</Text>
            </Pressable>:null} */}
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
                        <Pressable onPress={() => endContractFn('approve')} style={[styles.btnOutline, { borderColor: Constants.colors.primaryColor, marginRight: 8 }]}>
                            <Text style={[styles.btnText, { color: '#00A928' }]}>Accept</Text>
                        </Pressable>
                        <Pressable onPress={() => endContractFn('reject')} style={styles.btnOutline}>
                            <Text style={styles.btnText}>Reject</Text>
                        </Pressable>
                    </View> : null}
            </View>
            {/* {tabs=='pending'?<View style={styles.cardFooter}>
                <Pressable style={[styles.btnOutline, {borderColor: Constants.colors.primaryColor,marginRight:8}]}>
                    <Text style={[styles.btnText, {color: '#00A928'}]}>Accept</Text>
                </Pressable>
                <Pressable style={styles.btnOutline}>
                    <Text style={styles.btnText}>Reject</Text>
                </Pressable>
            </View>:null} */}

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
        width: 48,
        height: 48,
        backgroundColor: '#000000',
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
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
    },
    designation: {
        color: '#A4A4B2',
        fontFamily: Constants.fontFamily,
        fontWeight: '500',
        fontSize: 18,
    },
    ongoingWrapper: {
        padding: 5,
        borderRadius: Constants.borderRadius,
        backgroundColor: '#80FFB9',
        marginRight: 25
    },
    onGoing: {
        color: '#04751F',
        fontFamily: Constants.fontFamily,
        fontSize: 14,
        fontWeight: '800',
        textTransform: 'capitalize'
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
        // flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    footerText: {
        fontFamily: Constants.fontFamily,
        color: '#747474',
        fontSize: 14,
    },
    btnOutline: {
        padding: 8,
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#FF0000',
        borderRadius: Constants.borderRadius,
        width: '48%',
        marginLeft: 10
    },
    btnText: {
        fontFamily: Constants.fontFamily,
        fontSize: 14,
        fontWeight: '800',
        color: '#FF0000',
        alignSelf: 'center',
    },
})

export default RenderMyRequest