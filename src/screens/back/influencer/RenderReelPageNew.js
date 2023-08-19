import React, { useEffect, useRef, useState } from 'react'
import {
    View,
    Pressable,
    ActivityIndicator,
    ScrollView
} from 'react-native'
import Swiper from 'react-native-swiper'
import Constants from '../../../shared/Constants'
import { SwiperFlatList } from 'react-native-swiper-flatlist'
import Video from 'react-native-video'
import convertToProxyURL from 'react-native-video-cache';
import RenderReeels from '../explore/RenderReeels'
import RenderReeelsAdv from '../explore/RenderReeelsAdv'

const RenderReelPageNew = ({ postLoader, postData, styles, showDrawer, likeData,
    setbadgeCount, getLikeData, commentData, currentInd, pageTitle, userDetails, closePopup }) => {

    return (
        <Swiper
            style={{ backgroundColor: 'black', height: '100%', borderRadius: showDrawer ? Constants.borderRadius + 50 : 0 }} horizontal={true} showsButtons={false} loop={false} dot={<View></View>} activeDot={<View></View>}>

            {postLoader ?
                <View style={{ alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%' }}>
                    <ActivityIndicator size={40} color={Constants.colors.primaryColor} />
                </View>
                :
                postData.filter((i) => i.post_type === pageTitle).length > 0 ?
                    postData.filter((i) => i.post_type === pageTitle)
                        .map((data, i) => (
                            <View style={[styles.reel, { width: '100%', height: '100%' }]} key={i + 1}>

                                <SwiperFlatList
                                    data={[data]}
                                    style={[styles.category,
                                    { borderRadius: showDrawer ? Constants.borderRadius + 50 : 0 }
                                    ]}
                                    renderItem={item => (userDetails?.role_id == 3 ?
                                        <RenderReeelsAdv item={item} userDetails={userDetails}
                                        /> :
                                        <RenderReeels item={item} userDetails={userDetails}
                                            likeData={likeData}
                                            setbadgeCount={setbadgeCount}
                                            getLikeData={getLikeData}
                                            commentData={commentData}
                                            closePopup={closePopup}
                                            lastindexID={postData[i].id}
                                        />)}
                                    // renderItem={(item) =>
                                    //     <RenderReeels item={item} userDetails={userDetails}
                                    //         likeData={likeData}
                                    //         setbadgeCount={setbadgeCount}
                                    //         getLikeData={getLikeData}
                                    //         commentData={commentData}
                                    //         closePopup={closePopup}
                                    //     />
                                    // }
                                    keyExtractor={(item, index) => item?.id?.toString()}
                                // onChangeIndex={onChangeIndex}
                                />
                            </View>
                        )) : null}
        </Swiper>
    )
}

export default RenderReelPageNew