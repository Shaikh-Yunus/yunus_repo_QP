
import { useNavigation } from '@react-navigation/native'
import { constants } from 'pako'
import React, { useState } from 'react'
import { useEffect } from 'react'
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    Pressable,
    FlatList,
    InteractionManager,
    Image,
    TouchableOpacity
} from 'react-native'
import FastImage from 'react-native-fast-image'
import Images from '../../../assets/images/Images'
import CustomAppBar from '../../../components/business/CustomAppBar'
import SearchBar from '../../../components/business/SearchBar'
import Loading from '../../../components/Loading'
import CustomTabNavigationAdmin from '../../../navigations/CustomTabNavigationAdmin'
import Constants from '../../../shared/Constants'
import RenderNotification from './RenderNotification'
const NotificationScreen = (props) => {
    const navigation = useNavigation()
    const [showDrawer, setShowDrawer] = useState(false)
    const [pageLoader, setpageLoader] = useState(false)
    const checkingId = props.route.params.userDetails.business.business_id
    console.log("checking business id", checkingId);
    const [tabs, setTabs] = useState('all')
    const all = [
        {
            id: 1,
            img: Images.notification
        },
        {
            id: 2,
            img: ''
        },
        {
            id: 3,
            img: Images.notification
        },
        {
            id: 4,
            img: Images.notification
        },
        {
            id: 5,
            img: ''
        },
    ]
    const seen = [
        {
            id: 1,
            img: Images.notification
        },
        {
            id: 2,
            img: Images.notification
        },
        {
            id: 3,
            img: ''
        },
        {
            id: 4,
            img: ''
        },
        {
            id: 5,
            img: Images.notification
        },
    ]
    const unseen = [
        {
            id: 1,
            img: ''
        },
        {
            id: 2,
            img: Images.notification
        },
        {
            id: 3,
            img: Images.notification
        },
        {
            id: 4,
            img: Images.notification
        },
        {
            id: 5,
            img: ''
        },
    ]
    const checkingNoti = props?.route?.params?.userDetails
    console.log("checking noti props data=>", checkingNoti);


    // testing 

    const [NotiData, setNotiData] = useState([])
    console.log("this is noti data", NotiData);
    const [NotiId, setNotiId] = useState([])

    const [SeenData, setSeenData] = useState([])
    const [UnSeenData, setUnSeenData] = useState([])
    // const [notifications, setNotifications] = useState([]);
    // to check seen noti

    // yunus
    const [currentItemId, setCurrentItemId] = useState(null);
    // yunus

    const [numSeen, setNumSeen] = useState(0);
    useEffect(() => {
        getAllNoti()
    }, [])
    const getAllNoti = () => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(`${Constants.BASE_URL}explore/Get/Notifications/${checkingId}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log("vvvd", result?.Data?.All[0].id)
                setCurrentItemId(result?.Data?.All[0].id);
                setNotiData(result.Data.All)
                setSeenData(result.Data.Seen)
                setUnSeenData(result.Data.Unseen)
                // setNotifications(result.Data.All);
            })
            .catch(error => console.log('error', error));
    }
    // NotiData.map((item) => {
    //     setNotiId([...id, item.id])
    // })
    useEffect(() => {
        // updateSeenNoti();
    }, []);
    // yunus
    useEffect(() => {
        // Find the currently displayed data and get its ID
        const currentItem = NotiData.find(item => item.id === currentItemId);
        const currentItemId = currentItem ? currentItem.id : null;
        // Do something with the current item ID
        console.log("currentItemId", currentItemId);
    }, [currentItemId, NotiData]);
    const currentItem = NotiData.find(item => item.id === currentItemId);
    // yunus

    const updateSeenNoti = () => {

        var myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "user_id": checkingId,
            "id": [

            ]
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`${Constants.BASE_URL}UpdateNotificationStatus`, requestOptions)
            .then(response => response.json())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }


    // const cleanedImageString = NotiData.ProductImage.replace(/"/g, '');
    // const imageArray = JSON.parse(cleanedImageString);
    console.log("this is noti id data=>", NotiId);
    return (
        <>
            <View>
                {console.log('sasa', NotiData)}
                <CustomAppBar
                    title='Hello!'
                    navigation={navigation} isMainscreen={false} isReel={false} />
                {pageLoader ? <Loading /> :
                    <View style={styles.warapper} onScroll={(event) => {
                        const offsetY = event.nativeEvent.contentOffset.y;
                        const contentSizeHeight = event.nativeEvent.contentSize.height;
                        const visibleHeight = event.nativeEvent.layoutMeasurement.height;
                        const newNumSeen = Math.floor(offsetY / contentSizeHeight * NotiData.length);
                        setNumSeen(newNumSeen);
                    }}>
                        <View style={styles.container}>
                            <SearchBar />
                        </View>
                        <View style={styles.tabs}>

                            <Pressable onPress={() => setTabs('all')}>
                                <Text style={{ ...styles.tabText, color: tabs === 'all' ? Constants.colors.primaryColor : null, fontWeight: tabs === 'all' ? '800' : '400', textDecorationColor: tabs === 'all' ? Constants.colors.primaryColor : 'transparent' }}>All</Text>
                                {tabs === 'all' ? <View style={styles.activeTab}></View> : <View style={{ ...styles.activeTab, backgroundColor: 'transparent' }}></View>}
                            </Pressable>
                            <Pressable onPress={() => setTabs('unseen')}>
                                <Text style={{ ...styles.tabText, color: tabs === 'unseen' ? Constants.colors.primaryColor : null, fontWeight: tabs === 'unseen' ? '800' : '400', textDecorationColor: tabs === 'unseen' ? Constants.colors.primaryColor : 'transparent' }}>Unseen</Text>
                                {tabs === 'unseen' ? <View style={styles.activeTab}></View> : <View style={{ ...styles.activeTab, backgroundColor: 'transparent' }}></View>}
                            </Pressable>
                            <Pressable onPress={() => setTabs('seen')}>
                                <Text style={{ ...styles.tabText, color: tabs === 'seen' ? Constants.colors.primaryColor : null, fontWeight: tabs === 'seen' ? '800' : '400', textDecorationColor: tabs === 'seen' ? Constants.colors.primaryColor : 'transparent' }}>Seen</Text>
                                {tabs === 'seen' ? <View style={styles.activeTab}></View> : <View style={{ ...styles.activeTab, backgroundColor: 'transparent' }}></View>}
                            </Pressable>
                        </View>
                        {/* testing */}
                        {tabs === 'all' ?
                            <ScrollView style={{ height: '62%' }}>
                                {/* {console.log('cureenid',currentItemId)} */}
                                {NotiData.map((item) => (
                                    <View style={styles.Notificationcontainer}>
                                        {
                                            item.Image ? <FastImage source={{ uri: `${Constants.BASE_IMAGE_URL}${item?.Image}` }} style={{ height: 50, width: 50, borderRadius: 5 }} /> : null
                                        }

                                        <View style={styles.notifica}>
                                            <Text style={styles.notoficationHeading}>{item.title}</Text>
                                            <Text style={styles.notificationText}>{item.body}</Text>
                                        </View>
                                        <View style={styles.textStatus}>
                                            <Text style={styles.status}>{item.SeenType}</Text>
                                            <Text style={styles.time}>{item.Time}</Text>
                                        </View>

                                    </View>
                                ))}
                            </ScrollView>
                            : null
                        }
                        {tabs === 'unseen' ?
                            <ScrollView style={{ height: '62%' }}>
                                {UnSeenData.map((item) => (
                                    <View style={styles.Notificationcontainer}>
                                        {
                                            item.Image ? <FastImage source={{ uri: `${Constants.BASE_IMAGE_URL}${item?.Image}` }} style={{ height: 50, width: 50, borderRadius: 5 }} /> : null
                                        }
                                        <View style={styles.notifica}>
                                            {console.log('shasja_image', item.Image)}
                                            <Text style={styles.notoficationHeading}>{item.title}</Text>
                                            <Text style={styles.notificationText}>{item.body}</Text>
                                        </View>
                                        <View style={styles.textStatus}>
                                            {/* <Text style={styles.status}>{item.SeenType}</Text> */}
                                            <Text style={styles.time}>{item.Time}</Text>
                                        </View>

                                    </View>
                                ))}
                            </ScrollView>
                            : null
                        }
                        {tabs === 'seen' ?
                            <ScrollView style={{ height: '62%' }}>
                                {SeenData.map((item) => (
                                    <View style={styles.Notificationcontainer}>
                                        {
                                            item.Image ? <FastImage source={{ uri: `${Constants.BASE_IMAGE_URL}${item?.Image}` }} style={{ height: 50, width: 50, borderRadius: 5 }} /> : null
                                        }

                                        <View style={styles.notifica}>
                                            <Text style={styles.notoficationHeading}>{item.title}</Text>
                                            <Text style={styles.notificationText}>{item.body}</Text>
                                        </View>
                                        <View style={styles.textStatus}>
                                            {/* <Text style={styles.status}>{item.SeenType}</Text> */}
                                            <Text style={styles.time}>{item.Time}</Text>
                                        </View>

                                    </View>
                                ))}
                            </ScrollView>
                            : null
                        }
                        {/* <RenderNotification id={props.route.params.userDetails.business.business_id} notification={item} /> */}
                        {/* <FlatList
                            data={tabs === 'all' ? all : tabs === 'seen' ? seen : unseen}
                            renderItem={item => <RenderNotification id={props.route.params.userDetails.business.business_id} notification={item} />}
                            keyExtractor={item => item?.id?.toString()}
                            showsVerticalScrollIndicator={false}
                        /> */}

                    </View>
                }

            </View>
            <CustomTabNavigationAdmin navigation={navigation} showDrawer={showDrawer} activeTab='notification'
                propValue={props?.route?.params?.userDetails}
            />
        </>
    )
}

const styles = StyleSheet.create({
    warapper: {
        marginBottom: 190,
    },
    container: {
        padding: Constants.padding,
    },
    tabs: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: Constants.padding,
    },
    tabText: {
        fontFamily: Constants.fontFamily,
        fontSize: 16,
        marginRight: Constants.margin + 12,
    },
    activeTab: {
        height: 3,
        width: '60%',
        backgroundColor: Constants.colors.primaryColor,
        marginTop: 6,
    },
    // styling to show notify
    Notificationcontainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 12,
        backgroundColor: Constants.colors.whiteColor,
        padding: Constants.padding,
    },
    notoficationHeading: {
        fontFamily: Constants.fontFamily,
        fontSize: 16,
        fontWeight: '800',
        flexWrap: 'wrap',
    },
    notifica: {
        maxWidth: '55%',
        marginLeft: 12,
    },
    notificationText: {
        fontFamily: Constants.fontFamily,
    },
    textStatus: {
        alignSelf: 'flex-end',
        alignItems: 'flex-end',
        alignContent: 'space-between',
    },
    status: {
        fontFamily: Constants.fontFamily,
        color: Constants.colors.primaryColor,
        fontSize: 16,
    },
    time: {
        fontFamily: Constants.fontFamily,
        marginTop: Constants.margin,
    },
})

export default NotificationScreen