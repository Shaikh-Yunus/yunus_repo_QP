import React from 'react'
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    FlatList,
    Pressable,
    Image,
    Dimensions
} from 'react-native'
import axios from 'axios'
import { useState, useEffect } from 'react';
import Constants from '../../../shared/Constants';
import { useNavigation } from '@react-navigation/native'
import Video from 'react-native-video';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import FastImage from 'react-native-fast-image';


const windowWidth = Dimensions.get('window').width;
const imageWidth = (windowWidth - 20) / 3;

const RenderSearchPosts = ({ item }) => {
 const navigation=useNavigation()

    // console.log("Search for  posts", item?.item?.id);
    const image = item?.item?.product_image;
    return (
        <Pressable style={styles.postContainer} onPress={() => navigation.navigate('/visit-profile', {
            userDetails: item
                })}>
            <FastImage
                style={styles.postImage}
                source={
                    item?.item?.product_image === undefined
                        ? null
                        : { uri: Constants.BASE_IMAGE_URL + image }
                }
            />
        </Pressable>
    );
}
const styles = StyleSheet.create({

    postContainer: {
        width: '90%',
        height: 300,
        margin: 5,
        backgroundColor: '#eee',
        borderRadius: 5,
        // overflow: 'hidden',
    },
    postImage: {
        width: '100%',
        height: '100%',
    },

})

export default RenderSearchPosts
{/* <Video
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
                /> */}
{/* <Image style={styles.profileimage} source={{ uri: `${Constants.BASE_IMAGE_URL}${item?.item?.Influencer?.avatar}` }} /> */ }