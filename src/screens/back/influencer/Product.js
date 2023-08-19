import React, { useEffect, useRef, useState } from 'react'
import {
    View,
    Text,
    Modal,
    Image,
    StyleSheet,
    StatusBar,
    Pressable,
    Animated,
    ScrollView,
    ActivityIndicator,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Images from '../../../assets/images/Images'
import CustomAppBar from '../../../components/influencer/CustomAppBar'
import Constants from '../../../shared/Constants'
import globatStyles from '../../../shared/globatStyles'
import Feather from 'react-native-vector-icons/Feather'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Entypo from 'react-native-vector-icons/Entypo'
import Octicons from 'react-native-vector-icons/Octicons'
import { useNavigation } from '@react-navigation/native'
import RenderReeels from '../explore/RenderReeels'
import Swiper from 'react-native-swiper'
import { SwiperFlatList } from 'react-native-swiper-flatlist'
import axios from 'axios'
import showToastmsg from '../../../shared/showToastmsg'
import RenderReeelsAdv from '../explore/RenderReeelsAdv'
import VideoCompress from 'react-native-video-compressor'
import RenderReelPageNew from './RenderReelPageNew'
import { data } from 'jquery'

const Product = (props) => {
    const navigation = useNavigation()
    const [newPost, setNewPost] = useState(false)
    const [showDrawer, setShowDrawer] = useState(false)
    const [showRateus, setShowRateus] = useState(true)
    const [postData, setpostData] = useState([])
    const [activeMenu, setActiveMenu] = useState('')
    const [modalVisible, setModalVisible] = useState(false)
    const [postLoader, setpostLoader] = useState(false)
    const [swiperData, setswiperData] = useState([])
    const [likeData, setlikeData] = useState([])
    const [commentData, setcommentsData] = useState([])
    const [modalLoader, setmodalLoader] = useState(false)
    const [badgeCount, setbadgeCount] = useState(0)
    const [cartLoader, setcartLoader] = useState(false)
    const [currindex, setcurrindex] = useState(0)
    const [pageTitle, setpageTitle] = useState('Travel')
    const [currentInd, setcurrentInd] = useState(0)
    // const [cartNumber,setcartNumber]=useState(0)
    const offsetValue = useRef(new Animated.Value(0)).current
    const scaleValue = useRef(new Animated.Value(1)).current
    const titleTypes = ['Travel', 'Fashion', 'LifeStyle', 'Food']

    const openPopup = () => {
        setNewPost(!newPost)
    }
    const openDrawer = () => {
        setShowDrawer(!showDrawer)
    }
    // console.log("user type=>",props?.route?.params?.props?.route?.params?.userType);
    // const props?.route?.params?.userType=props?.route?.params?.props?.route?.params?.userType
    let fcmtoken = AsyncStorage.getItem("fcmtoken");
    const switchAcBtn = async () => {
        // console.log("Switch Button Working Of Accounts")
        // console.log({
        //     user_id:props?.route?.params?.userDetails?.id,
        //     user_type:props?.route?.params?.userDetails?.role_id
        // })
        setmodalLoader(true)
        axios.post(`${Constants.BASE_URL}auth/switch-user`,
            //body start->
            {
                user_id: props?.route?.params?.userDetails?.id,
                user_type: props?.route?.params?.userDetails?.role_id
            })
            .then((response) => {
                setmodalLoader(false)
                AsyncStorage.clear()
                console.log("repsonse data=>", response.data);
                // if (!response.data.error) {
                //     navigation.navigate('/business-login', { login_type: props?.route?.params?.userType == "influencer" ? "Explorer" : props?.route?.params?.userType == "explore" ? "Influencer" : "Business", userName: props?.route?.params?.userDetails?.name })
                //     console.log("reponse=>", response.data.error)
                // }
                // else {
                //     showToastmsg("Something went wrong. Please try again.")
                // }



                try {
                    if (!response.data.error) {
                        axios.post(`${Constants.BASE_URL}auth/device-token`, {
                            user_id: response?.data?.data?.user_details?.id,
                            device_token: fcmtoken
                        })
                        axios.post("https://testfcm.com/api/notify",
                            {
                                "postBody": {
                                    "notification": {
                                        "title": `Welcome ${response?.data?.data?.user_details?.name} !`,
                                        "body": `You have logged in as ${props?.route?.params?.userType} successfully`,
                                        "click_action": null,
                                        "icon": null
                                    },
                                    "data": null,
                                    "to": fcmtoken
                                },
                                "serverKey": "AAAAdLYZPyI:APA91bFVhnrT3tUYJWS5aKMBM9ObqK4LBFIrhwS5CoHHKlnORXOIadVwpjE4QTXMKicbQTxifccSdphB2EF7Jw_jCkyjHciMHGlQ0zvufnNHtAifxqUgQ0Ww01XprMn8a2dVa4EKsNc8"
                            }
                        ).then((resp) => {
                            setIsLoading(false)
                        })
                            .catch((error) => {
                                setIsLoading(false)
                            })
                        showToastmsg("Login successfull")
                        AsyncStorage.setItem("userDetails", JSON.stringify(response?.data?.data?.user_details));
                        AsyncStorage.setItem("userType", JSON.stringify(props?.route?.params?.userType == "influencer" ? "Explorer" : props?.route?.params?.userType == "explore" ? "Influencer" : "Business"));
                        if (props.route.params.userType == "influencer") { navigation.navigate('/influencer-stack-navigation', { userDetails: response.data.user, userType: props?.route?.params?.userType == "influencer" ? "Explorer" : props?.route?.params?.userType == "explore" ? "Influencer" : "Business" }) }
                        else if (props.route.params.userType == 'explore') { navigation.navigate('/influencer-stack-navigation', { userDetails: response?.data?.data?.user_details, userType: props?.route?.params?.userType == "influencer" ? "Explorer" : props?.route?.params?.userType == "explore" ? "Influencer" : "Business" }) }

                    }
                    else {
                        setIsLoading(false)
                        showToastmsg('Login cred. or password is invalid')
                    }
                } catch (error) {
                    console.log(error)
                }


            })
            .catch((error) => {
                setmodalLoader(false)
                console.log("error=>", error);
                showToastmsg("Something went wrong. Please try again.")
            })
    }
    const getLikeData = () => {
        axios.post(`${Constants.BASE_URL}post/read-like`)
            .then((response) => {
                setlikeData(response.data)
            })
            .catch((error) => {
                setpostLoader(false)
                console.log("error val=>", error);
            })
    }
    const closePopup = () => {
        setNewPost(false)
    }
    const getAllComments = () => {
        // setLoader(true)
        axios.post(`${Constants.BASE_URL}post/read-comment`)
            .then((response) => {
                // setLoader(false)
                if (response.data.length > 0) {
                    setcommentsData(response.data)
                }
                // console.log("repsonse=>",response.data);
            })
            .catch((error) => {
                // setLoader(false)
                // showToastmsg("Something went wrong for comments.")
                console.log("errro=>", error);
            })
    }
    const getReelsApi = async () => {
        // setpostLoader(true)
        if (props?.route?.params?.userType == 'explore' || props?.route?.params?.userType == 'influencer') {
            await axios.post(`${Constants.BASE_URL}auth/get-cart-item`, {
                user_id: props?.userDetails?.id
            }).then((response) => {
                if (response.data.data.cart_item && response.data.data.cart_item.length > 0) {
                    setbadgeCount(response.data.data.cart_item.length);
                }
            })
                .catch((error) => {
                    setbadgeCount(0)
                })
            await axios.get(`${Constants.BASE_URL}influencer/get-all-influencer-post`, { userid: props?.userDetails?.id, }).then((response) => {
                getLikeData()
                getAllComments()
                // setpostLoader(false)
                if (response.data.data.influencerPosts) {
                    response.data.data.influencerPosts.filter((i) => i.status == 'complete').map((item, i) => {
                        swiperData.push(
                            {
                                id: i + 1,
                                video: item.video,
                                isVideo: true,
                                isImage: false,
                                image: ''
                            },
                            JSON.parse(item.image).map((images, ind) => ({
                                id: ind + 1,
                                video: '',
                                isVideo: false,
                                isImage: true,
                                image: images
                            }))[0]
                        );
                    })
                    setswiperData([...swiperData])
                    setpostData(response.data.data.influencerPosts.filter((i) => i.status == 'complete'))
                    // AsyncStorage.setItem("gesture","true")
                }
            })
                .catch((error) => {
                    // setpostLoader(false)
                    console.log("error val abc", error);
                    showToastmsg('Failed to reload')
                })
        }

        else if (props?.route?.params?.userType == 'advertiser') {
            axios.post(`${Constants.BASE_URL}advertiser/get-advertise`, {
                advertiser_id: props?.route?.params?.userDetails?.id
            }).then((response) => {
                setpostLoader(false)

                if (response.data.data.post_details) {
                    setpostData(response.data.data.post_details.filter((i) => i.post_status == 'complete'))
                    // AsyncStorage.setItem("gesture","true")
                }
            })
                .catch((error) => {
                    setpostLoader(false)
                    console.log("error val==>", error.response);
                    showToastmsg('Failed to reload')
                })
        }
    }
    const useEffectFunction = async () => {
        if (!await AsyncStorage.getItem("gesture")) {
            navigation.navigate('/GuideScreen')
        }
        // axios.post(`${Constants.BASE_URL}auth/get-cart-item`,{
        //     user_id:props?.route?.params?.userDetails?.id
        // }).then((response)=>{
        //     setcartLoader(false)
        //     if(response.data.data.cart_item)
        //     setcartNumber(response.data.data.cart_item.length)
        // }).catch((error)=>{
        //     setcartLoader(false)
        //     setcartNumber(0)
        // })
        getReelsApi()
    }
    useEffect(() => {
        useEffectFunction()
    }, [])
    function isImage() {
        var url = ''
        if (props?.route?.params?.userType == 'influencer') {
            url = `${Constants.BASE_IMAGE_URL}${props?.route?.params?.userDetails?.influencer?.avatar}`
        }
        else {
            url = `${Constants.BASE_IMAGE_URL}${props?.route?.params?.userDetails?.explore?.avatar}`
        }
        return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
    }
    const onChangeIndex = (index) => {

        setcurrindex(index + 1)
        console.log("onChangeIndex=>", index)
    }

    // console.log("props value",props?.route?.params?.userType);
    return (
        <View style={globatStyles.wrapper}>
            {
                Animated.timing(scaleValue, {
                    toValue: showDrawer ? 0.88 : 1,
                    duration: 300,
                    useNativeDriver: false,
                }).start()
            }
            {
                Animated.timing(offsetValue, {
                    toValue: showDrawer ? 245 : 0,
                    duration: 300,
                    useNativeDriver: false,
                }).start()
            }
            <View style={styles.menubg}>
                {console.log('props.route.params.userType', props.route.params.userType)}
                <StatusBar translucent={true} backgroundColor={'transparent'} />
                <View style={styles.header}>
                    <View style={styles.profileDetails}>
                        <View style={styles.profileIcon}>
                            <Image source={isImage ?
                                {
                                    uri: props?.route?.params?.userType == 'influencer' ? `${Constants.BASE_IMAGE_URL}${props?.route?.params?.userDetails?.influencer?.avatar}` :
                                        props?.route?.params?.userType == 'advertiser' ?
                                            `${Constants.BASE_IMAGE_URL}${props?.route?.params?.userDetails?.advertiser?.avatar}`
                                            :
                                            `${Constants.BASE_IMAGE_URL}${props?.route?.params?.userDetails?.explore?.avatar}`
                                }
                                :
                                Images.avatar} style={{ width: 50, height: '100%' }} />
                        </View>
                        <View>
                            <Text style={styles.preofileName}>{props?.route?.params?.userDetails?.name?.length > 10 ? props?.route?.params?.userDetails?.name?.slice(0, 10) + '...' : props?.route?.params?.userDetails?.name}</Text>
                            <Text style={styles.founder}>{props?.route?.params?.userType}</Text>
                        </View>
                    </View>
                </View>
                {
                    props?.route?.params?.userDetails?.role_id == 3 || props?.route?.params?.userDetails?.role_id == '4, 3' ?
                        <ScrollView style={styles.drawerItemContainer}>
                            {
                                setMenuItem(setActiveMenu, activeMenu, 'feather', 'bell', 'Notification', navigation, '/Notification', props)
                            }
                            {
                                setMenuItem(setActiveMenu, activeMenu, 'feather', 'gift', 'Business List', navigation, '/business-list', props)
                            }
                            {/* {
                            setMenuItem(setActiveMenu, activeMenu, 'image', 'arrow-switch', 'Switch View As', navigation, '/about', props, setModalVisible, modalVisible, setShowDrawer)

                        } */}
                            {
                                setMenuItem(setActiveMenu, activeMenu, 'ant', 'setting', 'Settings', navigation, '/settings', props)
                            }
                            {
                                setMenuItem(setActiveMenu, activeMenu, 'feather', 'help-circle', 'Help/Support', navigation, '/HelpAnd-Supports', props)
                            }
                            {
                                setMenuItem(setActiveMenu, activeMenu, 'ant', 'infocirlceo', 'About', navigation, '/About', props)
                            }
                            {/* {
     setMenuItem(setActiveMenu, activeMenu, 'fa', 'bank', 'Bank Details', navigation, '/bank-details',props)
 } */}
                            {/* {
     setMenuItem(setActiveMenu, activeMenu, 'ant', 'redenvelopes', 'Drafts', navigation, '/all-drafts',props)
 } */}
                        </ScrollView>
                        :
                        <ScrollView style={styles.drawerItemContainer}>
                            {
                                setMenuItem(setActiveMenu, activeMenu, 'feather', 'bell', 'Notification', navigation, '/Notification', props)
                            }
                            {
                                props?.route?.params?.userType == 'influencer' &&
                                setMenuItem(setActiveMenu, activeMenu, 'fa5', 'comments-dollar', 'Share & Earn', navigation, '/share-and-earn', props)
                            }
                            {/* {props?.route?.params?.userType !== 'explore' ?
                                setMenuItem(setActiveMenu, activeMenu, 'fa5', 'users', 'User Management', navigation, '/user-management', props)
                                : null} */}
                            {/* {
                        setMenuItem(setActiveMenu, activeMenu, 'fa', 'money', 'Earnings', navigation, '/earnings',props)
                    } */}

                            {props?.route?.params?.userType == 'influencer' &&
                                setMenuItem(setActiveMenu, activeMenu, 'ant', 'dashboard', 'Dashboard', navigation, '/dashboard', props)
                            }
                            {(props?.route?.params?.userType == 'influencer' || props?.route?.params?.userType == 'explore') &&
                                setMenuItem(setActiveMenu, activeMenu, 'en', 'box', 'My Orders', navigation, '/my-orders', props)
                            }
                            {(props?.route?.params?.userType == 'influencer' || props?.route?.params?.userType == 'advertiser') &&
                                setMenuItem(setActiveMenu, activeMenu, 'feather', 'gift', 'My Requests', navigation, '/my-requests', props)
                            }
                            {
                                setMenuItem(setActiveMenu, activeMenu, 'image', 'arrow-switch', 'Switch View As', navigation, '/about', props, setModalVisible, modalVisible, setShowDrawer)
                            }
                            {
                                setMenuItem(setActiveMenu, activeMenu, 'fa5', 'bookmark', 'Saved Post', navigation, '/saved-collection', props, setModalVisible, modalVisible, setShowDrawer)
                            }
                            {
                                props?.route?.params?.userType == 'explore' ?
                                    setMenuItem(setActiveMenu, activeMenu, 'ant', 'user', 'Profile', navigation, '/view-explore-profile', props) : setMenuItem(setActiveMenu, activeMenu, 'ant', 'user', 'Profile', navigation, '/profile', props)
                            }
                            {

                                setMenuItem(setActiveMenu, activeMenu, 'ant', 'setting', 'Settings', navigation, '/settings', props)
                            }
                            {
                                setMenuItem(setActiveMenu, activeMenu, 'feather', 'help-circle', 'Help/Support', navigation, '/HelpAnd-Supports', props)
                            }
                            {
                                setMenuItem(setActiveMenu, activeMenu, 'ant', 'infocirlceo', 'About', navigation, '/About', props)
                            }
                            {/* {
                        setMenuItem(setActiveMenu, activeMenu, 'fa', 'bank', 'Bank Details', navigation, '/bank-details',props)
                    } */}
                            {/* {
                        setMenuItem(setActiveMenu, activeMenu, 'ant', 'redenvelopes', 'Drafts', navigation, '/all-drafts',props)
                    } */}
                        </ScrollView>}
                <Pressable
                    onPress={() => { navigation.navigate('/'), console.log("logout fn"), AsyncStorage.clear() }}
                    style={{ flexDirection: 'row', margin: 12, marginLeft: 0, marginBottom: 52, backgroundColor: 'rgba(60, 255, 106, 0.47)', padding: 16, width: '62%', }}>
                    <AntDesign name='logout' size={22} color={Constants.colors.whiteColor} />
                    <Text style={{ color: Constants.colors.whiteColor, fontFamily: Constants.fontFamily, fontWeight: '700', fontSize: 18, marginLeft: 12, }}>Logout</Text>
                </Pressable>
            </View>
            <Animated.View style={{
                position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, borderRadius: showDrawer ? 30 : 0, transform: [
                    { scale: scaleValue },
                    { translateX: offsetValue }
                ]
            }}>

                {/* {console.log("post_data", postData[0].video)} */}
                {postLoader ?
                    <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%', backgroundColor: '#e5e5e5' }}>
                        <ActivityIndicator size={40} color={Constants.colors.primaryColor} />
                    </View>
                    :
                    postData.length > 0 ?
                        <View style={{ width: Constants.width, height: Constants.height, backgroundColor: 'black' }}>

                            <Swiper
                                loadMinimalLoader={
                                    <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%', backgroundColor: '#e5e5e5' }}>
                                        <ActivityIndicator size={40} color={Constants.colors.primaryColor} />
                                    </View>
                                }
                                onIndexChanged={(ind) => setcurrentInd(ind)}
                                style={{ backgroundColor: 'black', borderRadius: showDrawer ? Constants.borderRadius + 50 : 0 }} horizontal={false} showsButtons={false} loop={false} dot={<View></View>} activeDot={<View></View>}>
                                {titleTypes.map((rec) =>
                                    postData.filter((i) => i.post_type === rec).length > 0 ? <>
                                        <CustomAppBar navigation={navigation} isMainscreen={true} isReel={true}
                                            title={rec}
                                            headerRight={true}
                                            openPopup={openPopup} newPost={newPost} openDrawer={openDrawer} showDrawer={showDrawer}
                                            badgeCount={badgeCount}
                                            setbadgeCount={setbadgeCount}
                                            userDetails={props?.route?.params?.userDetails}
                                        />
                                        <RenderReelPageNew
                                            likeData={likeData}
                                            setbadgeCount={setbadgeCount}
                                            getLikeData={getLikeData}
                                            commentData={commentData}
                                            closePopup={closePopup}
                                            setcurrentInd={setcurrentInd}
                                            currentInd={currentInd}
                                            pageTitle={rec}
                                            setpageTitle={setpageTitle}
                                            postLoader={postLoader}
                                            postData={postData}
                                            styles={styles}
                                            showDrawer={showDrawer}
                                            userDetails={props?.route?.params?.userDetails}
                                        />
                                    </> :
                                        null & console.log('null')
                                    // <SwiperFlatList

                                    //     data={[data]}
                                    //     style={[styles.category, { borderRadius: showDrawer ? Constants.borderRadius + 50 : 0 }]}
                                    //     renderItem={item =>
                                    //         <RenderReeelsAdv item={item} userDetails={props?.route?.params?.userDetails}
                                    //         />}
                                    //     keyExtractor={item => item?.id?.toString()} />
                                )
                                }
                            </Swiper>
                        </View>
                        :

                        <View style={[styles.productDetailsBg, { backgroundColor: '#e5e5e5', borderRadius: showDrawer ? Constants.borderRadius + 50 : 0, }]}>
                            <CustomAppBar navigation={navigation} isMainscreen={true}
                                explore={props?.route?.params?.userType == 'explore'}
                                userDetails={props?.route?.params?.userDetails}
                                badgeCount={badgeCount}
                                setbadgeCount={setbadgeCount}
                                isReel={true} title='' headerRight={true} openPopup={openPopup} newPost={newPost} openDrawer={openDrawer} showDrawer={showDrawer} />
                            <View style={{ display: 'flex', justifyContent: 'center', alignItems: "center", height: '100%', marginTop: -(Constants.padding + 80) }}>
                                <Text style={[styles.menuName, { color: 'black', fontSize: 24 }]}>No {props?.route?.params?.userDetails?.role_id == 3 || props?.route?.params?.userDetails?.role_id == '4, 3' ? 'ad' : 'reels'} found</Text>
                                <Pressable onPress={getReelsApi}><Text style={[styles.menuName, { color: 'blue', fontSize: 18, textDecorationLine: 'underline' }]}>Refresh</Text></Pressable>
                            </View>
                        </View>
                }
                {console.log('props?.route?.params?.userDetails?.role_id ', props?.route?.params?.userDetails?.role_id)}

            </Animated.View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    //   Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                    setShowDrawer(true)
                }}
            >

                <View style={[styles.centeredView,
                    // {backgroundColor:"rgba(0, 38, 17, 0.64)"}
                ]}>
                    <View style={styles.modalView}>
                        <View style={styles.switchViewText}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', paddingRight: 80 }}>Switch View As</Text>
                        </View>
                        {props?.route?.params?.userType == 'influencer' ?
                            <Text style={styles.switchText}>
                                Your account has been switched to an Explorer Account giving you access to advance exploring features.

                            </Text>
                            :
                            <Text style={styles.switchText}>
                                Your Explore account will be switched to an Influencer account giving you more access to advanced features.

                            </Text>}

                        <View style={styles.modalconatiner}>
                            <View style={{ display: "flex", justifyContent: 'flex-end', flexDirection: 'row', width: '100%', paddingTop: 20 }}>
                                <AntDesign name='close' size={23} color='#000000' onPress={() => { setModalVisible(!modalVisible); setShowDrawer(true) }} />
                            </View>
                        </View>
                        <View style={styles.accountContainer}>
                            <View style={[styles.account, styles.modalCard1]}>
                                <Image source={isImage ?
                                    {
                                        uri: props?.route?.params?.userType == 'influencer' ? `${Constants.BASE_IMAGE_URL}${props?.route?.params?.userDetails?.influencer?.avatar}` :
                                            props?.route?.params?.userType == 'advertiser' ?
                                                `${Constants.BASE_IMAGE_URL}${props?.route?.params?.userDetails?.advertiser?.avatar}`
                                                :
                                                `${Constants.BASE_IMAGE_URL}${props?.route?.params?.userDetails?.explore?.avatar}`
                                    }
                                    :
                                    Images.avatar}
                                    style={{ marginRight: 20, width: 50, height: '100%' }}
                                    alt='Img' />
                                <View>
                                    <Text style={styles.accountName}>{props?.route?.params?.userDetails?.name}</Text>
                                    <Text style={[styles.accountType, { textTransform: 'capitalize' }]}>{props?.route?.params?.userType} Account</Text>
                                </View>
                            </View>
                            <Pressable onPress={switchAcBtn}>
                                {modalLoader ?
                                    <ActivityIndicator style={[styles.switchAc, styles.activityIndicator]} />
                                    :
                                    <>
                                        <View style={{
                                            marginTop: 20,
                                            marginBottom: 20,
                                        }}>
                                            <Image source={Images.switchAc} style={styles.switchAc} />
                                            <Text style={{ fontSize: 12, alignSelf: 'center', color: '#000000', }}> click here to switch </Text>
                                        </View>
                                    </>}
                            </Pressable>
                            <Pressable onPress={switchAcBtn}>
                                <View style={[styles.account, styles.modalCard2]}>
                                    <Image source={isImage ?
                                        {
                                            uri: props?.route?.params?.userType == 'influencer' ? `${Constants.BASE_IMAGE_URL}${props?.route?.params?.userDetails?.influencer?.avatar}` :
                                                props?.route?.params?.userType == 'advertiser' ?
                                                    `${Constants.BASE_IMAGE_URL}${props?.route?.params?.userDetails?.advertiser?.avatar}`
                                                    :
                                                    `${Constants.BASE_IMAGE_URL}${props?.route?.params?.userDetails?.explore?.avatar}`
                                        }
                                        :
                                        Images.avatar}
                                        style={{ marginRight: 20, width: 50, height: '100%' }}
                                        alt='Img' />
                                    <View>
                                        <Text style={styles.accountName}>{props?.route?.params?.userDetails?.name}</Text>
                                        <Text style={styles.accountType}>{props?.route?.params?.userType == "influencer" ? "Explore" :
                                            props?.route?.params?.userType == 'explore' ? "Influencer" : props?.route?.params?.userType == 'business' ? "Advertiser" : "Business"} Account</Text>
                                    </View>
                                </View>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const setMenuItem = (setActiveMenu, activeMenu, icon, iconName, title, navigation, url, props, setModalVisible, modalVisible, setShowDrawer) => {
    const modalFunction = () => {
        setModalVisible(!modalVisible)
        setShowDrawer(false)
    }
    return (
        <Pressable style={[styles.drawerItem, { backgroundColor: activeMenu === title ? 'rgba(0, 169, 40, 0.1);' : 'transparent', padding: 14 }]} onPress={() => {
            setActiveMenu(title)
            title === "Switch View As" ?
                modalFunction() :
                navigation.navigate(url, { userDetails: props.route.params.userDetails })
        }}>
            {
                icon === 'feather' ? <Feather name={iconName} size={26} color={Constants.colors.whiteColor} /> : null
            }

            {
                icon === 'fa5' ? <FontAwesome5 name={iconName} size={26} color={Constants.colors.whiteColor} /> : null
            }
            {
                icon === 'ant' ? <AntDesign name={iconName} size={26} color={Constants.colors.whiteColor} /> : null
            }
            {
                icon === 'en' ? <Entypo name={iconName} size={26} color={Constants.colors.whiteColor} /> : null
            }
            {
                icon === 'oct' ? <Octicons name={iconName} size={26} color={Constants.colors.whiteColor} /> : null
            }
            {
                icon === 'fa' ? <FontAwesome name={iconName} size={26} color={Constants.colors.whiteColor} /> : null
            }
            {
                icon === 'image' ? <Image source={Images.switchIcon} /> : null
            }
            <Text style={[styles.menuName]}>{title}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    menubg: {
        flex: 1,
        backgroundColor: 'rgba(4,56,16,1)',
    },
    mainArea: {
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
    },
    drawerItemContainer: {
        marginTop: 12,
        padding: 12,
        paddingLeft: 0,
        flexGrow: 1,
    },
    drawerItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    menuName: {
        fontFamily: Constants.fontFamily,
        color: Constants.colors.whiteColor,
        fontWeight: '700',
        fontSize: 18,
        marginLeft: 12,
    },
    productDetailsBg: {
        height: '100%',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        zIndex: 1,
    },
    container: {
        padding: Constants.padding,
    },
    category: {
        // position: 'absolute',
        height: Constants.height,
        left: 90,
        top: -15,
        backgroundColor: '#1B3F24',
        color: '#04751F',
        borderRadius: Constants.borderRadius,
        padding: 8,
        fontFamily: Constants.fontFamily,
        fontWeight: '800',
        zIndex: 99,
    },
    iconGroup: {
        position: 'absolute',
        bottom: Constants.padding + 200,
        right: Constants.padding + 20,
        zIndex: 99,
    },
    icon: {
        marginTop: 25,
        fontSize: 25,
        color: Constants.colors.whiteColor,
    },
    iconText: {
        fontFamily: Constants.fontFamily,
        color: Constants.colors.whiteColor,
        fontSize: 12,
        marginTop: 6,
    },
    productDetailsContainer: {
        padding: Constants.padding,
        opacity: 0.9,
        position: 'absolute',
        width: '94%',
        bottom: 0,
        left: '3%',
        zIndex: 99,
        borderTopLeftRadius: Constants.borderRadius,
        borderTopRightRadius: Constants.borderRadius,
    },
    imgContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    titlename: {
        fontFamily: Constants.fontFamily,
        fontWeight: '800',
        color: Constants.colors.whiteColor,
        fontSize: 20,
        marginRight: 10,
    },
    desc: {
        fontFamily: Constants.fontFamily,
        color: Constants.colors.whiteColor,
        fontSize: 13.4,
        marginTop: 12,
    },
    moreBtn: {
        fontFamily: Constants.fontFamily,
        fontSize: 16,
    },
    ago: {
        fontFamily: Constants.fontFamily,
        fontSize: 12,
        color: Constants.colors.whiteColor,
    },
    header: {
        padding: Constants.padding,
        paddingStart: 12,
        height: 120,
        marginTop: 20,
    },
    profileDetails: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#676767',
        width: '62%',
        paddingBottom: Constants.padding,
    },
    profileIcon: {
        borderRadius: Constants.borderRadius,
        borderWidth: 1,
        borderColor: '#000000',
        padding: 8,
        marginEnd: 6,
        marginTop: 10
    },
    preofileName: {
        fontFamily: Constants.fontFamily,
        fontSize: 20,
        fontWeight: '700',
        color: Constants.colors.whiteColor,
        textTransform: "capitalize"
    },
    founder: {
        color: '#424242',
        opacity: 0.78,
        fontFamily: Constants.fontFamily,
        color: Constants.colors.whiteColor,
        textTransform: "capitalize"
    },
    rateusContainer: {
        position: 'absolute',
        bottom: Constants.padding,
        left: Constants.padding,
        right: Constants.padding,
        padding: Constants.padding,
        backgroundColor: Constants.colors.whiteColor,
        borderRadius: Constants.borderRadius,
        zIndex: 9999,
    },
    reel: {
        flex: 1,
    },
    category: {
        position: 'absolute',
        top: 0,
        bottom: 0,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        // marginTop: 22,

    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        // borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    modalheading: {
        top: -150,
    },
    modalCard1: {
        backgroundColor: 'white',
        elevation: 5,
        borderRadius: 15,
    },
    modalCard2: {
        backgroundColor: '#F8F8F8',
        elevation: 5,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: '#c0c0c0'
    },
    switchViewText: {
        top: 7,
        fontWeight: 'bold',
        fontFamily: 'Avenir',

    },
    modalconatiner: {
        position: 'absolute',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    switchText: {
        fontFamily: Constants.fontFamily,
        marginTop: Constants.margin,
        marginBottom: Constants.margin,
    },
    account: {
        backgroundColor: Constants.colors.whiteColor,
        padding: 10,
        borderRadius: Constants.borderRadius,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    accountName: {
        fontFamily: Constants.fontFamily,
        fontSize: 20,
        fontWeight: '800',
    },
    accountType: {
        fontFamily: Constants.fontFamily,
        color: '#A4A4B2',
        fontSize: 18,
    },
    switchAc: {
        alignSelf: 'center',
        width: 20,
        height: 20,

    },
    activityIndicator: {
        marginBottom: 20,
        marginTop: 20
    },
})

export default Product