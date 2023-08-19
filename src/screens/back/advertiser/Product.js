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
import CustomAppBar from '../../../components/influencer/CustomAppBar'

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

    // const [cartLoader,setcartLoader]=useState(false)
    // const [cartNumber,setcartNumber]=useState(0)
    const offsetValue = useRef(new Animated.Value(0)).current
    const scaleValue = useRef(new Animated.Value(1)).current

    const travelPosts = [
        { id: 1, video: 'http://qp.flymingotech.in/public/videos/videoTravel.mp4' },
        { id: 2, video: 'http://qp.flymingotech.in/public/videos/inf.mp4' },
        { id: 3, video: 'http://qp.flymingotech.in/public/videos/adv.mp4' },
        { id: 4, video: 'http://qp.flymingotech.in/public/videos/business.mp4' }
    ]
    const fashionPosts = [
        { id: 5, video: 'http://qp.flymingotech.in/public/videos/food.mp4' },
        { id: 6, video: 'http://qp.flymingotech.in/public/videos/inf.mp4' },
        { id: 7, video: 'http://qp.flymingotech.in/public/videos/adv.mp4' },
        { id: 8, video: 'http://qp.flymingotech.in/public/videos/business.mp4' }
    ]
    const lifestylePosts = [
        { id: 9, video: 'http://qp.flymingotech.in/public/videos/videoFashion.mp4' },
        { id: 10, video: 'http://qp.flymingotech.in/public/videos/inf.mp4' },
        { id: 11, video: 'http://qp.flymingotech.in/public/videos/adv.mp4' },
        { id: 12, video: 'http://qp.flymingotech.in/public/videos/business.mp4' },
    ]
    const foodPosts = [
        { id: 13, video: 'http://qp.flymingotech.in/public/videos/lifesty.mp4' },
        { id: 14, video: 'http://qp.flymingotech.in/public/videos/inf.mp4' },
        { id: 15, video: 'http://qp.flymingotech.in/public/videos/adv.mp4' },
        { id: 16, video: 'http://qp.flymingotech.in/public/videos/business.mp4' }
    ]

    const openPopup = () => {
        setNewPost(!newPost)
    }
    const openDrawer = () => {
        setShowDrawer(!showDrawer)
    }
    const userType = Object.keys(props?.route?.params?.userDetails)[Object.keys(props?.route?.params?.userDetails).length - 1]
    const switchAcBtn = () => {
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
                console.log("repsonse data=>", response.data);
                if (!response.data.error) {
                    navigation.navigate('/business-login', { login_type: userType == "influencer" ? "explore" : userType == "explore" ? "influencer" : "business", userName: props?.route?.params?.userDetails?.name })
                    console.log("reponse=>", response.data.error)
                }
                else {
                    showToastmsg("Something went wrong. Please try again.")
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
                showToastmsg("Something went wrong.")
                console.log("errro=>", error);
            })
    }
    const getReelsApi = () => {
        setpostLoader(true)
        if (userType == 'explore' || userType == 'influencer') {
            axios.get(`${Constants.BASE_URL}influencer/get-all-influencer-post`).then((response) => {
                getLikeData()
                getAllComments()
                setpostLoader(false)
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
                }
            })
                .catch((error) => {
                    setpostLoader(false)
                    console.log("error val abc", error);
                    showToastmsg('Failed to reload')
                })
        }
        else if (userType == 'advertiser') {
            axios.post(`${Constants.BASE_URL}advertiser/get-advertise`, {
                advertiser_id: props?.route?.params?.userDetails?.id
            }).then((response) => {
                setpostLoader(false)
                if (response.data.data.post_details) {
                    setpostData(response.data.data.post_details.filter((i) => i.post_status == 'complete'))
                }
            })
                .catch((error) => {
                    setpostLoader(false)
                    console.log("error val==>", error.response);
                    showToastmsg('Failed to reload')
                })
        }
    }
    useEffect(() => {
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
        // console.log("data=====>");
    }, [])
    function isImage() {
        var url = ''
        if (Object.keys(props?.route?.params?.userDetails)[Object.keys(props?.route?.params?.userDetails).length - 1] == 'influencer') {
            url = `${Constants.BASE_IMAGE_URL}${props?.route?.params?.userDetails?.influencer?.avatar}`
        }
        else {
            url = `${Constants.BASE_IMAGE_URL}${props?.route?.params?.userDetails?.explore?.avatar}`
        }
        return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
    }
    // console.log("props value",Object.keys(props?.route?.params?.userDetails)[Object.keys(props?.route?.params?.userDetails).length-1]);
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
                <StatusBar translucent={true} backgroundColor={'transparent'} />
                <View style={styles.header}>
                    <View style={styles.profileDetails}>
                        <View style={styles.profileIcon}>
                            <Image source={isImage ?
                                {
                                    uri: Object.keys(props?.route?.params?.userDetails)[Object.keys(props?.route?.params?.userDetails).length - 1] == 'influencer' ? `${Constants.BASE_IMAGE_URL}${props?.route?.params?.userDetails?.influencer?.avatar}` :
                                        Object.keys(props?.route?.params?.userDetails)[Object.keys(props?.route?.params?.userDetails).length - 1] == 'advertiser' ?
                                            `${Constants.BASE_IMAGE_URL}${props?.route?.params?.userDetails?.advertiser?.avatar}`
                                            :
                                            `${Constants.BASE_IMAGE_URL}${props?.route?.params?.userDetails?.explore?.avatar}`
                                }
                                :
                                Images.avatar} style={{ width: 50, height: '100%' }} />
                        </View>
                        <View>
                            <Text style={styles.preofileName}>{props?.route?.params?.userDetails?.name?.length > 10 ? props?.route?.params?.userDetails?.name?.slice(0, 10) + '...' : props?.route?.params?.userDetails?.name}</Text>
                            <Text style={styles.founder}>{Object.keys(props?.route?.params?.userDetails)[Object.keys(props?.route?.params?.userDetails).length - 1]}</Text>
                        </View>
                    </View>
                </View>
                {props?.route?.params?.userDetails?.role_id == 3 ?
                    <ScrollView style={styles.drawerItemContainer}>
                        {
                            setMenuItem(setActiveMenu, activeMenu, 'feather', 'bell', 'Notification', navigation, '/notification', props)
                        }
                        {
                            setMenuItem(setActiveMenu, activeMenu, 'feather', 'gift', 'Business List', navigation, '/business-list', props)
                        }
                        {
                            setMenuItem(setActiveMenu, activeMenu, 'image', 'arrow-switch', 'Switch View As', navigation, '/about', props)

                        }
                        {
                            setMenuItem(setActiveMenu, activeMenu, 'ant', 'setting', 'Settings', navigation, '/settings', props)
                        }
                        {
                            setMenuItem(setActiveMenu, activeMenu, 'feather', 'help-circle', 'Help/Support', navigation, '/help-support', props)
                        }
                        {
                            setMenuItem(setActiveMenu, activeMenu, 'ant', 'infocirlceo', 'About', navigation, '/about', props)
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
                            setMenuItem(setActiveMenu, activeMenu, 'feather', 'bell', 'Notification', navigation, '/notification', props)
                        }
                        {userType == 'influencer' &&
                            setMenuItem(setActiveMenu, activeMenu, 'fa5', 'comments-dollar', 'Share & Earn', navigation, '/share-and-earn', props)
                        }
                        {userType !== 'explore' ?
                            setMenuItem(setActiveMenu, activeMenu, 'fa5', 'users', 'User Management', navigation, '/user-management', props)
                            : null}
                        {/* {
                        setMenuItem(setActiveMenu, activeMenu, 'fa', 'money', 'Earnings', navigation, '/earnings',props)
                    } */}

                        {userType == 'influencer' &&
                            setMenuItem(setActiveMenu, activeMenu, 'ant', 'dashboard', 'Dashboard', navigation, '/dashboard', props)
                        }
                        {(userType == 'influencer' || userType == 'explore') &&
                            setMenuItem(setActiveMenu, activeMenu, 'en', 'box', 'My Orders', navigation, '/my-orders', props)
                        }
                        {(userType == 'influencer' || userType == 'advertiser') &&
                            setMenuItem(setActiveMenu, activeMenu, 'feather', 'gift', 'My Requests', navigation, '/my-requests', props)
                        }
                        {
                            setMenuItem(setActiveMenu, activeMenu, 'image', 'arrow-switch', 'Switch View As', navigation, '/about', props, setModalVisible, modalVisible, setShowDrawer)
                        }
                        {userType == 'explore' ?
                            setMenuItem(setActiveMenu, activeMenu, 'ant', 'user', 'Profile', navigation, '/view-explore-profile', props) : setMenuItem(setActiveMenu, activeMenu, 'ant', 'user', 'Profile', navigation, '/profile', props)
                        }
                        {
                            setMenuItem(setActiveMenu, activeMenu, 'ant', 'setting', 'Settings', navigation, '/settings', props)
                        }
                        {
                            setMenuItem(setActiveMenu, activeMenu, 'feather', 'help-circle', 'Help/Support', navigation, '/help-support', props)
                        }
                        {
                            setMenuItem(setActiveMenu, activeMenu, 'ant', 'infocirlceo', 'About', navigation, '/about', props)
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
                {/* <ImageBackground source={Images.productExploer} style={[styles.productDetailsBg, ]}>
                    <CustomAppBar navigation={navigation} isMainscreen={true} isReel={false} headerRight={true} title='' openPopup={openPopup} newPost={newPost} openDrawer={openDrawer} showDrawer={showDrawer} />
                    <View style={styles.overlay}></View>
                    <View style={styles.iconGroup}>
                        <AntDesign name='hearto' style={styles.icon} />
                        <Text style={styles.iconText}>nnk</Text>
                        <AntDesign name='message1' style={styles.icon} />
                        <Text style={styles.iconText}>00n</Text>
                        <Feather name='send' style={styles.icon} />
                        <Text style={styles.iconText}>00n</Text>
                    </View>
                    <View style={styles.productDetailsContainer}>
                        <View style={styles.imgContainer}>
                            <Image source={Images.avatar} style={{marginRight: 20,}} />
                            <Text style={styles.titlename}>Robert Phan</Text>
                            <Pressable style={globatStyles.followBtn}><Text style={globatStyles.btnText}>Follow</Text></Pressable>
                        </View>
                        <Text style={styles.desc}>
                            Lolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt Lolor sit amet... <Text onPress={()=>gotoMore()} style={styles.moreBtn}>more</Text>
                        </Text>
                        <Text style={styles.ago}>10 minutes ago</Text>
                        <Pressable style={[globatStyles.button,{marginTop: 8, flexDirection: 'row', justifyContent: 'space-between',}]}><Text style={globatStyles.btnText}>Buy</Text><FontAwesome name='angle-right' size={20} color={Constants.colors.whiteColor} /></Pressable>
                    </View>
                    {
                        newPost || showRateus?<View style={[globatStyles.overlay, {zIndex: 999,}]}></View>:null
                    }
                    {
                        showRateus?(
                            <View style={styles.rateusContainer}>
                                <Text style={{alignSelf: 'flex-end', fontSize: 20,}} onPress={()=>setShowRateus(false)}>X</Text>
                                <View style={{alignItems: 'center',}}>
                                    <Image source={Images.collageOne} />
                                    <Text style={{fontWeight: '900', fontSize: 20, marginTop: 12,}}>Your opinion matters to us!</Text>
                                    <Text style={{fontFamily: Constants.fontFamily, color: '#717171', marginTop: 12, marginBottom: 12, textAlign: 'center'}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut .</Text>
                                    <View style={{flexDirection: 'row'}}>
                                        <Text><AntDesign name='star' size={26} color='#E7CC3E' /> &nbsp; </Text>
                                        <Text><AntDesign name='star' size={26} color='#E7CC3E' /> &nbsp; </Text>
                                        <Text><AntDesign name='star' size={26} color='#E7CC3E' /> &nbsp; </Text>
                                        <Text><AntDesign name='star' size={26} color='#E7CC3E' /> &nbsp; </Text>
                                        <AntDesign name='staro' size={26} color='#22215B75' />
                                    </View>
                                    <View style={{flexDirection: 'row',}}>
                                        <Pressable style={[globatStyles.btnOutline, {width: '45%'}]}><Text style={globatStyles.btnOutlineText}>Later</Text></Pressable>
                                        <Pressable style={[globatStyles.button, {width: '45%', marginStart: '10%'}]}><Text style={globatStyles.btnText}>Submit</Text></Pressable>
                                    </View>
                                </View>
                            </View>
                        ):null
                    }
                </ImageBackground> */}
                {postLoader ?
                    <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%', backgroundColor: '#e5e5e5' }}>
                        <ActivityIndicator size={40} color={Constants.colors.primaryColor} />
                    </View>
                    :
                    postData.length > 0 ?
                        <Swiper style={{ backgroundColor: 'black', borderRadius: showDrawer ? Constants.borderRadius + 50 : 0 }} horizontal={false} showsButtons={false} loop={false} dot={<View></View>} activeDot={<View></View>}>
                            {postLoader ?
                                <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%' }}>
                                    <ActivityIndicator size={40} color={Constants.colors.primaryColor} />
                                </View>
                                :
                                postData.map((data, i) => (
                                    <View style={styles.reel} key={i + 1}>
                                        <CustomAppBar navigation={navigation} isMainscreen={true}
                                            explore={userType == 'explore'}
                                            userDetails={props?.route?.params?.userDetails}
                                            isReel={true}
                                            title={userType == 'advertiser' ? data.advertise_type :
                                                data.post_type}
                                            // cartLoader={cartLoader}
                                            // cartNumber={cartNumber}
                                            headerRight={true} openPopup={openPopup} newPost={newPost} openDrawer={openDrawer} showDrawer={showDrawer} />
                                        <SwiperFlatList
                                            data={[data]}
                                            style={[styles.category, { borderRadius: showDrawer ? Constants.borderRadius + 50 : 0 }]}
                                            renderItem={item => (props?.route?.params?.userDetails?.role_id == 3 ?
                                                <RenderReeelsAdv item={item} userDetails={props?.route?.params?.userDetails} /> :
                                                <RenderReeels item={item} userDetails={props?.route?.params?.userDetails}
                                                    likeData={likeData}
                                                    getLikeData={getLikeData}
                                                    commentData={commentData}
                                                />)}
                                            keyExtractor={item => item?.id?.toString()} />
                                    </View>))}
                            {/* <View style={styles.reel}>
                <CustomAppBar navigation={navigation} isMainscreen={true} isReel={true} title='Fashion' headerRight={true} />
                <SwiperFlatList
                    data={fashionPosts}
                    style={styles.category}
                    renderItem={item=><RenderReeels item={item} />}
                    keyExtractor={item=>item?.id?.toString()} />
            </View>
            <View style={styles.reel}>
                <CustomAppBar navigation={navigation} isMainscreen={true} isReel={true} title='Life Style' headerRight={true} />
                <SwiperFlatList
                    data={lifestylePosts}
                    style={styles.category}
                    renderItem={item=><RenderReeels item={item} />}
                    keyExtractor={item=>item?.id?.toString()} />
            </View>
            <View style={styles.reel}>
                <CustomAppBar navigation={navigation} isMainscreen={true} isReel={true} title='Food' headerRight={true} />
                <SwiperFlatList
                    data={foodPosts}
                    style={styles.category}
                    renderItem={item=><RenderReeels item={item} />}
                    keyExtractor={item=>item?.id?.toString()} />
            </View> */}
                        </Swiper> :

                        <View style={[styles.productDetailsBg, { backgroundColor: '#e5e5e5', borderRadius: showDrawer ? Constants.borderRadius + 50 : 0, }]}>
                            <CustomAppBar navigation={navigation} isMainscreen={true}
                                explore={userType == 'explore'}
                                userDetails={props?.route?.params?.userDetails}
                                isReel={true} title='' headerRight={true} openPopup={openPopup} newPost={newPost} openDrawer={openDrawer} showDrawer={showDrawer} />
                            <View style={{ display: 'flex', justifyContent: 'center', alignItems: "center", height: '100%', marginTop: -(Constants.padding + 80) }}>
                                <Text style={[styles.menuName, { color: 'black', fontSize: 24 }]}>No {props?.route?.params?.userDetails?.role_id == 3 ? 'ad' : 'reels'} found</Text>
                                <Pressable onPress={getReelsApi}><Text style={[styles.menuName, { color: 'blue', fontSize: 18, textDecorationLine: 'underline' }]}>Refresh</Text></Pressable>
                            </View>
                        </View>

                }
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
                            <Text style={{ fontSize: 20, fontWeight: 'bold', paddingRight: 120 }}>Switch View As</Text>
                        </View>
                        <Text style={styles.switchText}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut .
                        </Text>
                        <View style={styles.modalconatiner}>
                            <View style={{ display: "flex", justifyContent: 'flex-end', flexDirection: 'row', width: '100%', paddingTop: 20 }}>
                                <AntDesign name='close' size={23} color='#000000' onPress={() => { setModalVisible(!modalVisible); setShowDrawer(true) }} />
                            </View>
                        </View>
                        <View style={styles.accountContainer}>
                            <View style={[styles.account, styles.modalCard1]}>
                                <Image source={Images.avatar} style={{ marginRight: 20, }} alt='Img' />
                                <View>
                                    <Text style={styles.accountName}>{props?.route?.params?.userDetails?.name}</Text>
                                    <Text style={[styles.accountType, { textTransform: 'capitalize' }]}>{userType} Account</Text>
                                </View>
                            </View>
                            <Pressable onPress={switchAcBtn}>
                                {modalLoader ?
                                    <ActivityIndicator style={styles.switchAc} />
                                    :
                                    <Image source={Images.switchAc} style={styles.switchAc} />}
                            </Pressable>
                            <View style={[styles.account, styles.modalCard2]}>
                                <Image source={Images.avatar} style={{ marginRight: 20, }} alt='Img' />
                                <View>
                                    <Text style={styles.accountName}>{props?.route?.params?.userDetails?.name}</Text>
                                    <Text style={styles.accountType}>{userType == "influencer" ? "Explore" :
                                        userType == 'explore' ? "Influencer" : "Advertiser"
                                    } Account</Text>
                                </View>
                            </View>
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
        position: 'absolute',
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
        borderRadius: 15
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
        marginTop: 20,
        marginBottom: 20,
    },
})

export default Product