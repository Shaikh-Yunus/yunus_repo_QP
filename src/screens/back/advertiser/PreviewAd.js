import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    ScrollView,
    Pressable,
    Image,
    ActivityIndicator,
} from 'react-native'
import CustomAppBar from '../../../components/advertiser/CustomAppBar'
import { useNavigation } from '@react-navigation/native'
import globatStyles from '../../../shared/globatStyles'
import Constants from '../../../shared/Constants'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Slider from 'react-native-slider'
import VideoPlayer from 'react-native-video-player'
import showToastmsg from '../../../shared/showToastmsg'
import EasebuzzCheckout from 'react-native-easebuzz-kit';
import axios from 'axios'

const PreviewAd = (props) => {
    const navigation = useNavigation()
    const [loader, setLoader] = useState(false)
    const callPaymentGateway = (accessKey) => {
        var options = {
            access_key: accessKey,
            pay_mode: "test"
        }
        EasebuzzCheckout.open(options).then((data) => {
            if (data.result.includes("payment_successfull")) {
                let formdata = new FormData()
                formdata.append("advertiser_id", props?.route?.params?.userDetails?.id);
                formdata.append("advertise_name", props?.route?.params?.postDetails?.title);
                formdata.append('advertise_video',
                    {
                        uri: props?.route?.params?.postDetails?.postVideo.assets[0].uri,
                        name: props?.route?.params?.postDetails?.postVideo.assets[0].fileName,
                        type: props?.route?.params?.postDetails?.postVideo.assets[0].type
                    });

                formdata.append("advertise_title", props?.route?.params?.postDetails?.productName);
                formdata.append("advertise_description", props?.route?.params?.postDetails?.description);
                formdata.append("advertise_tag", props?.route?.params?.postDetails?.tags);
                formdata.append("advertise_type", props?.route?.params?.category);
                formdata.append("advertise_location", props?.route?.params?.postDetails?.location);
                formdata.append("advertise_goal", props?.route?.params?.selectGoal);
                formdata.append("product_id", props?.route?.params?.productData?.id);
                formdata.append("business_id", props?.route?.params?.productData?.business_id);
                formdata.append("advertise_target_audience", props?.route?.params?.selectTargetAudience);
                formdata.append("advertise_audience_name", props?.route?.params?.audienceName);
                formdata.append("advertise_audience_location", "maha");
                formdata.append("advertise_audience_interest", "Shpping");
                formdata.append("advertise_audience_gender", "All");
                formdata.append("advertise_audience_age", props?.route?.params?.advertise_audience_age);
                formdata.append("budget", props?.route?.params?.budget);
                formdata.append("duration", props?.route?.params?.duration);
                formdata.append("duration", props?.route?.params?.duration);
                formdata.append("post_status", "complete")
                console.log("form data=>", formdata);
                const headers = {
                    'x-device-id': 'stuff',
                    'Content-Type': 'multipart/form-data',
                }
                axios.post(`${Constants.BASE_URL}advertiser/advertise-post`, formdata, {
                    headers: headers
                }).then((response) => {
                    console.log("response data=>", response.data);
                    setLoader(false)
                    navigation.navigate('/payment-success')
                    // console.log("response data=>", response.data);
                }).catch((error) => {
                    setLoader(false)
                    showToastmsg("Something went wrong. Please try again")
                    console.log("response error=>", error.message);
                })
                // setLoader(false)
                // navigation.navigate('/payment-success')
            }
            else {
                navigation.navigate('/payment-error', {
                    category: props.route.params.category,
                    postDetails: {
                        title: props?.route?.params?.postDetails?.title,
                        postVideo: props?.route?.params?.postDetails?.postVideo,
                        tags: props?.route?.params?.postDetails?.tags,
                        type: props?.route?.params?.postDetails?.type,
                        description: props?.route?.params?.postDetails?.description,
                        location: props?.route?.params?.postDetails?.location,
                        productName: props?.route?.params?.postDetails?.productName
                    },
                    budget: props?.route?.params?.budget,
                    duration: props?.route?.params?.duration,
                    audienceName: props?.route?.params?.audienceName,
                    advertise_audience_gender: props?.route?.params?.advertise_audience_gender,
                    advertise_audience_age: props?.route?.params?.advertise_audience_age,
                    selectGoal: props?.route?.params?.selectGoal,
                    selectTargetAudience: props?.route?.params?.selectTargetAudience,
                    userDetails: props?.route?.params?.userDetails,
                    formdata: props?.route?.params?.formdata,
                    error: true
                })
            }
        })
    }
    const gotoAdPayment = () => {
        setLoader(true)
        axios.post(`${Constants.BASE_URL}auth/easeBuzz-payment-access-token`, {
            "user_id": props?.route?.params?.userDetails?.id,
            "user_type": props?.route?.params?.userDetails?.role_id,
            "address_id": 33,
            "amount": "2400.00",
        }).then((response) => {
            console.log("role_id=>", props?.route?.params?.userDetails?.role_id)
            if (response.data.error) {
                setLoader(false)
                showToastmsg(response.data.msg)
            }
            else {
                if (JSON.parse(response.data.data.payment).access_key) {
                    callPaymentGateway(JSON.parse(response.data.data.payment).access_key)
                    console.log("response==>", JSON.parse(response.data.data.payment).access_key);
                }
            }

            console.log("response==>", response.data);

        }).catch((error) => {
            showToastmsg('Something went wrong. Please try again')
            console.log("error message=>", error.message);
            setLoader(false)
        })
    }
    return (
        <View style={globatStyles.wrapper}>
            {console.log('props_last-check', props?.route?.params?.productData)}
            {console.log("advertiser_id", props?.route?.params?.userDetails?.id)}
            {console.log("advertise_name", props?.route?.params?.postDetails?.title)}
            {console.log("advertise_title", props?.route?.params?.postDetails?.productName)}
            {console.log("advertise_description", props?.route?.params?.postDetails?.description)}
            {console.log("advertise_tag", props?.route?.params?.postDetails?.tags)}
            {console.log("advertise_type", props?.route?.params?.category)}
            {console.log("advertise_location", props?.route?.params?.postDetails?.location)}
            {console.log("advertise_audience_name", props?.route?.params?.audienceName)}

            <StatusBar translucent={true} backgroundColor='transparent' />

            <CustomAppBar navigation={navigation} isMainscreen={false} isReel={false} headerRight={false} title='Preview' />
            <ScrollView style={styles.container}>
                <Text style={{ fontFamily: Constants.fontFamily, flexWrap: 'wrap', }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut .
                </Text>
                <View style={styles.boxContainer}>
                    <Text style={{ fontFamily: Constants.fontFamily, fontSize: 22, marginBottom: 12, }}>Post Details</Text>
                    <View style={styles.imgContainer}>
                        {console.log("video uri", props?.route?.params?.postDetails?.postVideo?.assets[0]?.uri)}
                        <VideoPlayer
                            video={{ uri: props?.route?.params?.postDetails?.postVideo?.assets[0]?.uri }}
                            autoplay
                            repeat={true}
                            resizeMode={'cover'}
                            customStyles={{
                                wrapper: {
                                    width: 120,
                                    height: 200,
                                    borderRadius: 10,
                                    marginRight: 12,
                                    paddingBottom: Constants.padding,
                                },
                                video: {
                                    width: 120,
                                    height: 200,
                                },
                                controls: {
                                    display: 'none',
                                },
                                seekBarBackground: {
                                    backgroundColor: 'transparent',
                                },
                                seekBarProgress: {
                                    backgroundColor: 'transparent',
                                },
                            }} />
                        <View style={{ flex: 1, }}>
                            <Text style={{ fontFamily: Constants.fontFamily, fontSize: 20, marginBottom: 4, }}>{props?.route?.params?.postDetails?.title}</Text>
                            <Text style={{ fontFamily: Constants.fontFamily, }}>
                                {props?.route?.params?.postDetails?.description}
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={styles.boxContainer}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                        <View>
                            <Text style={{ fontSize: 22, fontFamily: Constants.fontFamily, marginBottom: 10, }}>Goal</Text>
                            <Text style={{ fontWeight: '700', fontSize: 20, fontFamily: Constants.fontFamily, }}>{props?.route?.params?.selectGoal}</Text>
                        </View>
                        <FontAwesome name='angle-right' size={24} />
                    </View>
                </View>
                <View style={styles.boxContainer}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                        <View>
                            <Text style={{ fontSize: 22, fontFamily: Constants.fontFamily, marginBottom: 10, }}>Audience</Text>
                            <Text style={{ fontWeight: '700', fontSize: 20, fontFamily: Constants.fontFamily, }}>{props?.route?.params?.selectTargetAudience}</Text>
                        </View>
                        <FontAwesome name='angle-right' size={24} />
                    </View>
                </View>
                <View style={styles.boxContainer}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                        <View>
                            <Text style={{ fontSize: 22, fontFamily: Constants.fontFamily, marginBottom: 10, }}>Budget & Duration</Text>
                            <Text style={{ fontWeight: '700', fontSize: 20, fontFamily: Constants.fontFamily, }}><FontAwesome name='rupee' size={22} /> {props?.route?.params?.budget} / {props?.route?.params?.duration}</Text>
                        </View>
                        <FontAwesome name='angle-right' size={24} />
                    </View>
                </View>
                <View style={styles.boxContainer}>
                    <Text style={{ fontFamily: Constants.fontFamily, fontSize: 22, marginBottom: 12, }}>Cost Summary</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, }}>
                        <Text style={{ fontFamily: Constants.fontFamily, fontSize: 16, }}>Advertisement Cost ({props?.route?.params?.duration})</Text>
                        <Text style={{ fontFamily: Constants.fontFamily, fontSize: 16, }}><FontAwesome name='rupee' size={16} /> 3000</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, }}>
                        <Text style={{ fontFamily: Constants.fontFamily, fontSize: 16, }}>Discount</Text>
                        <Text style={{ fontFamily: Constants.fontFamily, fontSize: 16, }}><FontAwesome name='rupee' size={16} /> 600</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, }}>
                        <Text style={{ fontFamily: Constants.fontFamily, fontSize: 16, }}>Estimated Tax</Text>
                        <Text style={{ fontFamily: Constants.fontFamily, fontSize: 16, }}><FontAwesome name='rupee' size={16} /> 100</Text>
                    </View>
                    <View style={styles.divider}></View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, }}>
                        <Text style={{ fontFamily: Constants.fontFamily, fontSize: 16, }}>Total Amount to be Paid</Text>
                        <Text style={{ fontFamily: Constants.fontFamily, fontSize: 16, }}><FontAwesome name='rupee' size={16} /> 2400</Text>
                    </View>
                </View>
                <Pressable style={[globatStyles.button, { marginBottom: 50, }]} onPress={gotoAdPayment}>
                    {loader ?
                        <ActivityIndicator color={'#fff'} />
                        : <Text style={globatStyles.btnText}>Proceed to pay</Text>}

                </Pressable>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: Constants.padding,
    },
    boxContainer: {
        marginTop: Constants.margin,
        padding: Constants.padding,
        backgroundColor: Constants.colors.whiteColor,
        borderRadius: Constants.borderRadius,
        marginBottom: Constants.margin,
    },
    imgContainer: {
        flexDirection: 'row',
    },
    img: {
        width: 120,
        height: 200,
        borderRadius: 10,
        marginRight: 12,
    },
    divider: {
        height: 1,
        width: '100%',
        backgroundColor: Constants.colors.primaryColor,
    },
})

export default PreviewAd