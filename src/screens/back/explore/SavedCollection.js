import axios from "axios";
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, ScrollView, StatusBar, StyleSheet, View, Text } from "react-native";
import Video from "react-native-video";
import CustomAppBar from "../../../components/explore/CustomAppBar";
import Constants from '../../../shared/Constants'
import globatStyles from '../../../shared/globatStyles'
import showToastmsg from '../../../shared/showToastmsg'
import { FlatList } from 'react-native-gesture-handler'
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import DashBoardLoader from "../business/DashBoardLoader";
const SavedCollection = (props) => {
    const [loader, setloader] = useState(false)
    const [data, setdata] = useState([])
    const navigation = useNavigation()
    useEffect(() => {
        setloader(true)
        axios.post(`${Constants.BASE_URL}influencer/influencerPosts/User/GetAllSavedPost`, {
            user_id: props?.route?.params?.userDetails?.id
        })
            .then((response) => {
                setloader(false)
                setdata(response.data.data);
            })
            .catch((error) => {
                setloader(false)
                showToastmsg("Something went wrong")
                console.log("error=>", error);
            })

    }, [])
    return (
        <SafeAreaView>
            <View style={{ height: "100%" }}>
                <StatusBar translucent={true} backgroundColor='transparent' />
                <CustomAppBar isMainscreen={false} isReel={false} title='My Saved Post' headerRight={false} />
                <ScrollView style={{ height: "100%" }}>
                    {loader ?
                        <ActivityIndicator size={'large'} /> :
                        <View style={styles.profileSection}>
                            {data?.length > 0 ?
                                <FlatList
                                    data={data}
                                    keyExtractor={(item, index) => index?.toString()}
                                    numColumns={2}
                                    renderItem={item => (
                                        <View style={styles.profileBgImg} >

                                            <Pressable onPress={() => navigation.navigate("/specific-post", { video: `${Constants.BASE_IMAGE_URL}${JSON.parse(item?.item?.video)[0]}`, userDetails: props?.route?.params?.userDetails })}>
                                                <Video
                                                    source={{ uri: `${Constants.BASE_IMAGE_URL}${JSON.parse(item?.item?.video)[0]}` }}
                                                    // onLoad={(e)=>console.log("onload",e)}
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
                                                    style={{ width: "100%", height: "100%" }}
                                                />
                                            </Pressable>
                                            {/* <View style={styles.comments}>
                                <AntDesign name='hearto' size={15} color={Constants.colors.whiteColor} style={{fontWeight:"900"}}/>
                                <Text style={{fontFamily: Constants.fontFamily,color: Constants.colors.whiteColor,marginStart: 8, marginEnd: 10,
                                fontSize:15,fontWeight:"800"
                                }}>
                                    {item?.item?.likes?item?.item?.likes:0}
                                </Text>
                                <FontAwesome name='comment-o' size={15} color={Constants.colors.whiteColor} style={{fontWeight:"900"}} />
                                <Text style={{fontFamily: Constants.fontFamily,color: Constants.colors.whiteColor,marginStart: 8,
                                fontSize:15,fontWeight:"800"
                                }}>{item?.item?.comments?item?.item?.comments:0}</Text>
                                            </View> */}
                                        </View>
                                    )}
                                />
                                :
                                <View style={{ display: 'flex', alignItems: 'center', width: "100%" }}>
                                    <Text style={[styles.socialValue, { color: '#000' }]}>
                                        No post found
                                    </Text>
                                </View>
                            }
                        </View>
                    }
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    profileBgImg: {
        width: '50%',
        height: 252,
        resizeMode: 'cover',
        // marginBottom : 4,
    },
    profileSection: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        height: "100%"
    }, socialValue: {
        color: '#007635',
        fontFamily: Constants.fontFamily,
        fontWeight: '700',
        fontSize: 22,
    },
})
export default SavedCollection