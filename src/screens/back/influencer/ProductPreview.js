import { useNavigation } from '@react-navigation/native'
import axios from 'axios';
import React, { useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    ImageBackground,
    StatusBar,
    Pressable,
    ActivityIndicator,
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import VideoPlayer from 'react-native-video-player';
import Images from '../../../assets/images/Images'
import CustomAppBar from '../../../components/influencer/CustomAppBar'
import Constants from '../../../shared/Constants'
import globatStyles from '../../../shared/globatStyles'
import showToastmsg from '../../../shared/showToastmsg';

const ProductPreview = (props) => {
    const navigation = useNavigation()
    const [loader, setLoader] = useState(false)
    const [draftLoader, setdraftLoader] = useState(false)
    const gotoProductDescription = (type) => {
        if (props?.route?.params?.userDetails?.role_id == 3 || props?.route?.params?.userDetails?.role_id == '4, 3') {
            navigation.navigate("/ad-details", {
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
                productData: props?.route?.params?.productData,
                userDetails: props?.route?.params?.userDetails,
                formdata: props?.route?.params?.formdata
            })
        }
        else {
            if (type == 'draft') { setdraftLoader(true) }
            else {
                setLoader(true)
            }
            let formdata = props?.route?.params?.formdata
            const headers = {
                'x-device-id': 'stuff',
                'Content-Type': 'multipart/form-data',
            }

            if (type == 'draft') {
                formdata.append('status', 'draft');
            }
            else {
                formdata.append('status', 'complete');
            }
            console.log("form data", formdata);
            if (props?.route?.params?.draft) {
                axios.post(`${Constants.BASE_URL}influencer/influencer-post-product-update`, formdata, {
                    headers: headers
                }).then((response) => {
                    setLoader(false)
                    console.log('sdsda', props?.route?.params?.influencerData?.userDetails)
                    if (response.status == 200) {
                        setdraftLoader(false)
                        showToastmsg(type == 'draft' ? 'Post added to draft successfully' : 'Post added successfully')
                        navigation.navigate('/influencer-stack-navigation', { userDetails: props?.route?.params?.influencerData?.userDetails })
                    }
                    else {
                        setdraftLoader(false)
                        console.log("response", response);
                    }
                }).catch((error) => {
                    setLoader(false)
                    setdraftLoader(false)
                    console.log("error message", error.response);
                    showToastmsg('Cant save post, Please try again later')
                });
            }
            else {
                axios.post(`${Constants.BASE_URL}influencer/influencer-post-product`, formdata, {
                    headers: headers
                }).then((response) => {
                    setLoader(false)
                    if (response.status == 200) {

                        setdraftLoader(false)

                        showToastmsg(type == 'draft' ? 'Post added to draft successfully' : 'Post added successfully')
                        navigation.navigate('/influencer-stack-navigation', { userDetails: props?.route?.params?.influencerData?.userDetails, userType: "influencer" })
                    }
                    else {
                        setdraftLoader(false)
                        console.log("response", response);
                    }
                }).catch((error) => {
                    setLoader(false)
                    setdraftLoader(false)
                    console.log("error message", error.response);
                    showToastmsg('Cant save post, Please try again later')
                });
            }
        }
        // navigation.navigate('/product-description')
    }
    return (
        <View style={globatStyles.wrapper}>
            {console.log('checking_product_detail', props?.route?.params?.productData)}
            <VideoPlayer
                video={{ uri: props?.route?.params?.postDetails?.postVideo?.assets[0].uri }}
                autoplay
                repeat={true}
                loop
                disableSeek
                resizeMode={'cover'}
                customStyles={{
                    wrapper: {
                        width: Constants.width,
                        height: Constants.height,
                        paddingBottom: Constants.padding,
                    },
                    video: {
                        width: Constants.width,
                        height: Constants.height + 50,
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
            <View style={[globatStyles.overlay, { opacity: 1, backfaceVisibility: 'hidden', backgroundColor: 'transparent' }]}>
                <StatusBar translucent={true} backgroundColor='transparent' />
                <CustomAppBar navigation={navigation} isMainscreen={false} isReel={true} headerRight={false} title={props?.route?.params?.postDetails?.title} subtitle={props?.route?.params?.userDetails?.business?.catorige} />
                <View style={[globatStyles.overlay, { backgroundColor: "transparent" }]}></View>
                <View style={styles.productDetailsContainer}>
                    <LinearGradient style={styles.productInfoContainer} colors={['#FFFFFF', '#A4A4B2']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                        <ScrollView>
                            <View style={{ flexDirection: 'row', marginBottom: 20, }}>
                                <Text style={styles.tags}>{props?.route?.params?.userDetails?.role_id == 3 || props?.route?.params?.userDetails?.role_id == '4, 3' ? "Tag Business" : "Tags"} :</Text>
                                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                                    {props?.route?.params?.postDetails?.tags.split(",").map((item) =>
                                    (
                                        <Text style={styles.tags}>#{item},</Text>
                                    )
                                    )

                                    }
                                </View>
                            </View>
                            {props?.route?.params?.userDetails?.role_id == 3 || props?.route?.params?.userDetails?.role_id == '4, 3' ? null : <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                                <Text style={styles.tags}>Tags Business :</Text>
                                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                                    <Text style={[styles.tags, { textTransform: 'capitalize' }]}>{props?.route?.params?.postDetails?.businessTags}</Text>
                                </View>
                            </View>}
                            <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                                <Text style={styles.tags}>Type :</Text>
                                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                                    <Text style={styles.tags}>{props?.route?.params?.postDetails?.type}</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                                <Text style={styles.tags}>Service name :</Text>
                                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                                    <Text style={styles.tags}>{props?.route?.params?.postDetails?.productName}</Text>
                                </View>
                            </View>
                            {props?.route?.params?.userDetails?.role_id !== 3 ? null : <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                                <Text style={styles.tags}>Location:</Text>
                                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                                    <Text style={[styles.tags, { textTransform: 'capitalize' }]}>{props?.route?.params?.postDetails?.location}</Text>
                                </View>
                            </View>}
                            <Text style={{ fontFamily: Constants.fontFamily, fontSize: 16, }}>
                                {props?.route?.params?.postDetails?.description}
                            </Text>
                        </ScrollView>
                    </LinearGradient>
                    <View style={{ flexDirection: 'row', }}>
                        <Pressable style={[globatStyles.btnOutline, { width: '46%' }]} onPress={() => gotoProductDescription('draft')}>{draftLoader ? <ActivityIndicator size={30} color={Constants.colors.whiteColor} /> : <Text style={globatStyles.btnOutlineText}>Save as draft</Text>}</Pressable>
                        <Pressable style={[globatStyles.button, { width: '46%', marginLeft: '8%', }]} onPress={gotoProductDescription}>{loader ? <ActivityIndicator size={30} color={Constants.colors.whiteColor} /> : <Text style={globatStyles.btnText}>{
                            props?.route?.params?.userDetails?.role_id == 3 || props?.route?.params?.userDetails?.role_id == '4, 3' ?
                                "PROCEED"
                                : "Post"}</Text>}</Pressable>
                    </View>
                </View>
            </View>
            {/* </VideoPlayer> */}
        </View>
    )
}

const styles = StyleSheet.create({
    nature: {
        flex: 1
    },
    productDetailsContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        padding: Constants.padding,
        bottom: 20,
    },
    productInfoContainer: {
        padding: Constants.padding,
        borderRadius: 8,
        opacity: 0.7,
    },
    tags: {
        fontFamily: Constants.fontFamily,
        marginRight: 12,
        fontWeight: '700',
    },
})

export default ProductPreview