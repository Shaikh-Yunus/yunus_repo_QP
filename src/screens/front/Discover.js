import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    Image,
    ScrollView,
    StyleSheet,
    Pressable,
    BackHandler,
} from 'react-native'
import VideoPlayer from 'react-native-video-player'
import { useNavigation } from '@react-navigation/native'
import Images from '../../assets/images/Images'
import Constants from '../../shared/Constants'
import globatStyles from '../../shared/globatStyles'
import { apiCall } from '../../service/service'
import endPoints from '../../shared/endPoints'
import Loading from '../../components/Loading'
import { SafeAreaView } from 'react-native-safe-area-context'
import Video from 'react-native-video'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Videos from '../../assets/staticVideos/Videos'
import dynamicLinks from '@react-native-firebase/dynamic-links';
import axios from 'axios'

const Discover = (props) => {
    const navigation = useNavigation()
    const [users, setUsers] = useState([])
    const getAllUsers = async () => {
        setUsers([])
        const users = await apiCall('GET', endPoints.USER_TYPES, '', '')
        if (await AsyncStorage.getItem("userDetails")) {
            if (JSON.parse(await AsyncStorage.getItem("userType")) == 'Business') { navigation.navigate('/home', { "userDetails": JSON.parse(await AsyncStorage.getItem("userDetails")) }) }
            else if (JSON.parse(await AsyncStorage.getItem("userType")) == 'Influencer' || JSON.parse(await AsyncStorage.getItem("userType")) == 'Advertiser') { navigation.navigate('/influencer-stack-navigation', { userDetails: JSON.parse(await AsyncStorage.getItem("userDetails")), userType: JSON.parse(await AsyncStorage.getItem("userType")) }) }
            else if (JSON.parse(await AsyncStorage.getItem("userType")) == 'Explorer') { navigation.navigate('/influencer-stack-navigation', { userDetails: JSON.parse(await AsyncStorage.getItem("userDetails")), userType: JSON.parse(await AsyncStorage.getItem("userType")) }) }
            else {
                navigation.navigate('/advertiser-product', { userDetails: JSON.parse(await AsyncStorage.getItem("userDetails")) })
            }
            setUsers(users)

        }
        else
            setUsers(users)
    }

    const redirectFn = () => {
        if (props.route.params.login_type == 'Business') { navigation.navigate('/home', { "userDetails": response.data.user }) }
        else if (props.route.params.login_type == 'Influencer' || props.route.params.login_type == 'Advertiser') { navigation.navigate('/influencer-stack-navigation', { userDetails: response.data.user }) }
        else if (props.route.params.login_type == 'Explorer') { navigation.navigate('/influencer-stack-navigation', { userDetails: response.data.user }) }
        else {
            navigation.navigate('/advertiser-product', { userDetails: response.data.user })
        }
    }
    const handleDynamicLink = link => {
        // Handle dynamic link inside your own application
        if (link.url.includes("business")) {
            navigation.navigate("/businessView", { userId: link.url.split('business/')[1] })
        }
        else if (link.url.includes("influencer")) {
            navigation.navigate("/influencerView", { userId: link.url.split('influencer/')[1] })
        }
        else {

        }
    };
    useEffect(() => {
        const unsubscribe = dynamicLinks().onLink(handleDynamicLink);
        // When the component is unmounted, remove the listener
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (props?.route?.params?.comeBack) {
            getAllUsers()
        }
        dynamicLinks()
            .getInitialLink()
            .then(link => {
                if (link.url.includes("business")) {
                    navigation.navigate("/businessView", { userId: link.url.split('business/')[1] })
                }
                else if (link.url.includes("influencer")) {
                    navigation.navigate("/influencerView", { userId: link.url.split('influencer/')[1] })
                }
                else
                    getAllUsers()
            }).catch((error) => {
                getAllUsers()
            })
    }, [props])
    // const gotoExploer = () => {
    //     navigation.navigate('/exploer-registration')
    // }
    const gotoLogin = (val) => {
        navigation.navigate('/business-login', { login_type: val })
    }
    // const gotoInfluencer = () => {
    //     navigation.navigate('/infliencer-signup')
    // }
    // const gotoAdvertiser = () => {
    //     navigation.navigate('/advertiser-signup')
    // }
    // const enterAsAdmin = () => {
    //     //navigation.navigate('/admin-signin')
    // }
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView >
                <Text style={styles.header}>DISCOVER</Text>
                {
                    users?.users && users?.users?.length > 0 ? users?.users?.map(user =>
                        user.role_name !== 'Admin' ? (
                            <Pressable style={{ marginBottom: Constants.margin, }} onPress={() => gotoLogin(user.role_name)} key={user.id}>
                                <VideoPlayer
                                    thumbnail={Images.PlusIcon}
                                    // onVideoBuffer={(e) => console.log("buffering", e)}
                                    video={user.role_name === "Business" ? Videos.businessVideo
                                        : user.role_name === "Influencer" ?
                                            Videos.influencerVideo : user.role_name === "Explorer" ?
                                                Videos.exploreVideo : Videos.advertiserVideo}
                                    // video={{ uri: user.role_name==="Business"?"https://acapp.in/uploads/biz1.mp4":user.role_name==="Influencer"?"https://acapp.in/uploads/influencer1.mp4":user.role_name==="Explorer"?"https://acapp.in/uploads/explore.mp4":"https://acapp.in/uploads/adv.mp4"}}
                                    autoplay
                                    repeat={true}
                                    muted
                                    loop
                                    disableSeek
                                    resizeMode={'cover'}
                                    customStyles={{
                                        wrapper: {
                                            width: Constants.width,
                                            height: 145,
                                            paddingBottom: Constants.padding,
                                        },
                                        video: {
                                            width: Constants.width,
                                            height: 145,
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
                                <View style={globatStyles.overlay}></View>
                                <View style={styles.discoverContent}>
                                    <View style={styles.menuTextContainer}>
                                        <Text style={styles.menuTitle}>{user.role_name === 'Explorer' ? user.role_name.slice(0, -1) : user.role_name}</Text>
                                        <Text style={styles.menuText}>{user.role_description}</Text>
                                    </View>
                                    <View style={styles.menuIcon}>
                                        <Image source={user.role_name === 'Explorer' ? Images.explorerIcon : user.role_name === 'Influencer' ? Images.influencerIcon : user.role_name === 'Business' ? Images.businessIcon : user.role_name === 'Advertiser' ? Images.advertizerIcon : null} />
                                    </View>
                                </View>
                            </Pressable>
                        ) : null
                    ) : <Loading />
                }
                {/* {
                users.users && users.users.length > 0 ? (
                    <Pressable style={styles.enterAsAdmin} onPress={enterAsAdmin}>
                        <Image source={Images.usaerIcon} style={styles.userIcon} />
                        <Text>Enter as Admin</Text>
                    </Pressable>
                ) : null
            } */}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: Constants.padding,
    },
    header: {
        color: Constants.colors.primaryColor,
        textAlign: 'center',
        fontSize: 26,
        fontFamily: Constants.fontFamily,
        fontWeight: '800',
        fontStyle: 'normal',
        marginBottom: Constants.margin,
        lineHeight: 36,

    },
    discoverMenu: {
        height: 145,
        position: 'relative',
        marginBottom: Constants.padding,
    },
    discoverContent: {
        position: 'absolute',
        bottom: Constants.padding,
        justifyContent: 'space-between',
        paddingLeft: Constants.padding + 10,
        paddingRight: Constants.padding + 10,
        flexDirection: 'row',
    },
    menuTextContainer: {
        paddingEnd: 35,
        width: '90%',
    },
    menuTitle: {
        fontFamily: Constants.fontFamily,
        fontSize: 28,
        fontWeight: '800',
        color: Constants.colors.whiteColor,
        textTransform: 'uppercase'
    },
    menuText: {
        fontFamily: Constants.fontFamily,
        color: Constants.colors.whiteColor,
    },
    menuIcon: {
        marginTop: 20,
        width: '10%',
    },
    enterAsAdmin: {
        flex: 1,
        width: '100%',
        padding: Constants.padding - 6,
        borderWidth: 1,
        borderColor: Constants.colors.primaryColor,
        borderRadius: Constants.borderRadius,
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 40
    },
    userIcon: {
        marginRight: 12,
    },
})

export default Discover