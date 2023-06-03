import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    Pressable,
    Modal,
    ActivityIndicator,
    Share,
    ScrollView,
    RefreshControl,

} from 'react-native'
import Images from '../../../assets/images/Images'
// import VideoPlayer from 'react-native-video-player'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import Constants from '../../../shared/Constants'
import globatStyles from '../../../shared/globatStyles'
import { useNavigation } from '@react-navigation/native'
import RenderReelsComment from './RenderReelsComment'
import moment from 'moment/moment'
import axios from 'axios'
import StoriesPage from './StoriesPage'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import Video from 'react-native-video'
import DashBoardLoader from '../business/DashBoardLoader'
import FastImage from 'react-native-fast-image'

const RenderReeelsAdv = ({ item, userDetails }) => {

    const [like, setLike] = useState(false)
    const [refresh, setrefresh] = useState(false)
    const [loader, setLoader] = useState(false)
    const [VideoLoader, setVideoLoader] = useState(false)
    const [showCommentPopup, setShowCommentPopup] = useState(false)
    const [modalVisible, setModalVisible] = useState(false);
    const [doubleTapCounter, setdoubleTapCounter] = useState(0)
    const navigation = useNavigation()
    const [showFullText, setShowFullText] = useState(false);
    // const [followLoader,setfollowLoader] = useState(false)
    const comments = [
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 4 },
        { id: 5 },
        { id: 6 },
    ]
    const gotoMore = () => {

    }

    //  VIEW OF POSt

    const fetchpostview = () => {
        axios.post(`${Constants.BASE_URL}advertiser/advertise-post-click`, {

            post_id: item?.item?.id
        })
            .then(function (response) {
                console.log("post_ID_NEW", item?.item?.id)
                console.log("VIEW_RESPONSE", response.data.data);
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    //  VIEW OF POSt    

    const gotoProductDetails = () => {
        navigation.navigate('/product-details', {
            productDetails: item.item, userDetails: userDetails,
            LikeCount: LikeCount,
            commentCount: commentCount,
            isLiked: like,
            shareCount: shareCount,
            gotoComments: gotoComments, onShare: onShare,
            removeLikeFn: removeLikeFn,
            addLikeFn: addLikeFn
        })
    }
    const gotoDescription = () => {
        navigation.navigate('/product-description')
    }
    const gotoReview = () => {
        navigation.navigate('/explore-review')
    }
    const gotoComments = () => {
        navigation.navigate('/reels-comments', { userDetails: userDetails, postDetails: item?.item })
    }


    const gotoStoriespage = () => {
        // navigation.navigate('/StoriesPage')
        setModalVisible(!modalVisible);
    };
    // const gotoBuy=()=>{
    //     navigation.navigate('/cart')
    // }
    // navigate to guide screen 
    // useEffect(()=>{
    //     setTimeout(() => {
    //         navigation.navigate('/GuideScreen')
    //     }, 20000);

    // },[])
    // 
    useEffect(() => {
        setVideoLoader(true)
        // console.log(`${Constants.BASE_IMAGE_URL}${JSON.parse(item?.item?.video)[0]}`);
        // setLoader(true)
        // setvideoVar(null)
        // // console.log("video var",JSON.parse(item?.item?.video)[0]);
        // axios.get(`${Constants.BASE_IMAGE_URL}${JSON.parse(item?.item?.video)[0]}`, { responseType:'stream' })
        // .then((response)=> {
        //     setvideoVar({
        //         "bitrate": 154604, "duration": 1, 
        //         "fileName": JSON.parse(item?.item?.video)[0], 
        //         "fileSize": response.headers["content-length"], "height": 320, "type": "video/mp4", 
        //         "uri": `${Constants.BASE_IMAGE_URL}${JSON.parse(item?.item?.video)[0]}`, 
        //         "width": 240
        //         })
        //     // setTimeout(() => {
        //         setLoader(false)        
        //     // }, 1000);    


        //     // setvideoVar(`${Constants.BASE_IMAGE_URL}${JSON.parse(item?.item?.video)[0]}`)
        // }).catch((err)=>{setLoader(false)})
    }, [])

    const handleClick = (e) => {
        switch (e.detail) {
            case 1:
                console.log("click");
                break;
            case 2:
                console.log("double click");
                break;
            case 3:
                console.log("triple click");
                break;
        }
    };
    const Refershpull = () => {
        get()
    }
    const handleTextPress = () => {
        setShowFullText(!showFullText);
    };
    return (
        <>
            {loader ? <View style={{ display: 'flex', width: Constants.width, height: Constants.height, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size={30} color={'#80FFB9'} style={{ marginTop: 30 }} /></View> :
                <ScrollView
                // refreshControl={<RefreshControl
                //     refreshing={refresh}
                //     onRefresh={() => Refershpull()}
                // />}
                >
                    <Pressable style={{ flex: 1, width: Constants.width, height: Constants.height, zIndex: 999, position: 'relative' }}
                        onLongPress={gotoStoriespage}
                        onPress={handleClick}
                    >
                        {console.log('check adv', userDetails)}
                        <View style={[globatStyles.overlay, { zIndex: 9, height: '103%', backgroundColor: 'transparent' }]}>

                        </View>
                        {VideoLoader ?
                            <DashBoardLoader height={Constants.height} /> : null
                        }

                        <Video
                            source={{ uri: `${Constants.BASE_IMAGE_URL}${JSON.parse(item?.item?.video)[0]}` }}
                            onLoad={(e) => fetchpostview()}
                            // onBandwidthUpdate={()=>console.log("bandwidht")}
                            // onBuffer={()=>console.log("buffering...")}
                            // onReadyForDisplay={(e)=>console.log("ready display",e)}
                            autoplay
                            repeat={true}
                            loop
                            muted
                            disableSeek
                            // onVideoBuffer={(e)=>console.log("bueeee",e)}
                            resizeMode={'cover'}
                            fullscreen
                            style={{ width: "100%", height: "100%" }}
                            customStyles={{
                                wrapper: {
                                    width: '100%',
                                    height: '100%',
                                    paddingBottom: Constants.padding,
                                },
                                video: {
                                    width: '100%',
                                    height: '103%',
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
                        {/* <View style={styles.iconGroup}>
                            <AntDesign name={like ? 'heart' : 'hearto'} style={[styles.icon, { color: like ? '#f54295' : '#FFF' }]} onPress={() => setLike(!like)} />
                            <Text style={styles.iconText}>nnk</Text>
                            <AntDesign name='message1' style={styles.icon}
                            // onPress={gotoComments} 
                            />
                            <Text style={styles.iconText}>00n</Text>
                            <Feather name='send' style={styles.icon}
                            // onPress={gotoReview}
                            />
                            <Text style={styles.iconText}>00n</Text>
                            <Feather name='bookmark' style={styles.icon}
                            // onPress={gotoDescription} 
                            />
                        </View> */}

                        <View style={styles.productDetailsContainer}>
                            {console.log('item', item)}
                            <View style={styles.imgContainer}>
                                <View style={{ height: responsiveHeight(2), width: responsiveWidth(17), bottom: 18, right: 15 }}>
                                    <FastImage source={item?.item?.avatar ?
                                        { uri: `${Constants.BASE_IMAGE_URL}${item?.item?.avatar}` }
                                        : Images.avatar} style={{
                                            width: item?.item?.avatar && 45,
                                            height: item?.item?.avatar && 45,
                                            borderRadius: 50
                                        }} />
                                </View>
                                <Text style={styles.titlename}>{item?.item?.advertise_title ? item?.item?.advertise_title : 'faizaninfluencer'} ["Ad"]</Text>

                            </View>

                            <Text style={styles.desc}>
                                {showFullText
                                    ? item?.item?.advertise_description
                                    : item?.item?.advertise_description?.slice(0, 30) + '...'}
                            </Text>

                            {item?.item?.advertise_description?.length >= 30 ? <Pressable onPress={handleTextPress}>
                                <Text style={{
                                    fontFamily: Constants.fontFamily,
                                    color: Constants.colors.whiteColor,
                                    marginLeft: responsiveWidth(2),
                                    width: 80,


                                }}>{showFullText ? "See less" : "...more"}</Text>
                            </Pressable> : null}
                            <Text style={styles.minsAgo}>{moment(new Date(item?.item?.created_at)).fromNow()}</Text>
                        </View>

                        <Modal
                            animationType="slide"
                            // transparent={true}
                            visible={modalVisible}
                            onRequestClose={() => {
                                //   Alert.alert("Modal has been closed.");
                                setModalVisible(!modalVisible);
                            }}>
                            <StoriesPage
                                images={item?.item?.image}
                                gotoStoriespage={gotoStoriespage}
                            />
                        </Modal>
                    </Pressable>
                </ScrollView>}
        </>
    )
}

const styles = StyleSheet.create({
    left: {
        position: 'absolute',
        right: Constants.margin,
        bottom: 20,
        alignItems: 'center',
        zIndex: 999,
    },
    iconGroup: {
        position: 'absolute',
        bottom: Constants.padding + 110,
        right: Constants.padding + 5,
        zIndex: 99,
    },
    icon: {
        marginTop: 8,
        fontSize: responsiveFontSize(3.2),
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
        // marginTop : responsiveHeight(4),
        // paddingBottom: 2,
        opacity: 0.9,
        position: 'absolute',
        width: '92%',
        bottom: 0,
        left: '3%',
        zIndex: 99,
        marginBottom: responsiveHeight(12),
        borderTopLeftRadius: Constants.borderRadius,
        borderTopRightRadius: Constants.borderRadius,
    },
    imgContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center",
        right: 37
    },
    titlename: {
        fontFamily: Constants.fontFamily,
        fontWeight: '800',
        color: Constants.colors.whiteColor,
        fontSize: responsiveFontSize(2.3),
        marginRight: 15,
        textTransform: 'capitalize',
    },
    desc: {
        fontFamily: Constants.fontFamily,
        color: Constants.colors.whiteColor,
        marginTop: 14,
        marginLeft: responsiveWidth(2),
        width: 250,
    },
    moreBtn: {
        color: '#F1F1F1',
        fontFamily: Constants.fontFamily,
    },
    minsAgo: {
        fontSize: 13,
        fontFamily: Constants.fontFamily,
        color: Constants.colors.whiteColor,
        marginLeft: responsiveWidth(2)


    },
})

export default RenderReeelsAdv