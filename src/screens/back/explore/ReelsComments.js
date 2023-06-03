import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    Pressable,
    FlatList,
    TextInput,
    Image,
    ActivityIndicator,
} from 'react-native'
import EmojiSelector, { Categories } from 'react-native-emoji-selector'
import CustomAppBar from '../../../components/explore/CustomAppBar'
import Constants from '../../../shared/Constants'
import Feather from 'react-native-vector-icons/Feather'
import RenderComments from './RenderComments'
import Images from '../../../assets/images/Images'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import showToastmsg from '../../../shared/showToastmsg'
import { FlashList } from '@shopify/flash-list'
import { responsiveWidth } from 'react-native-responsive-dimensions'

const ReelsComments = ({ userDetails, postDetails }) => {
    const navigation = useNavigation()
    const [loader, setLoader] = useState(false)
    const [commentsData, setcommentsData] = useState([])
    const [showEmoji, setShowEmoji] = useState(false)
    const [selectedEmoji, setSelectedEmoji] = useState([])
    const [comment, setComment] = useState('')
    const [finalComment, setFinalComment] = useState('')
    const [commentLikeData, setcommentLikeData] = useState([])

    const [commentText, setcommentText] = useState()
    const [SendLoader, setSendLoader] = useState(false)
    const comments = [
        { id: 1, },
        { id: 2, },
        { id: 3, },
    ]
    const addComment = () => {
        setSendLoader(true)
        axios.post(`${Constants.BASE_URL}post/add-comment`, {
            "user_id": userDetails?.id,
            "post_id": postDetails?.id,
            "comment_text": commentText
        })
            .then((response) => {
                setSendLoader(false)
                getAllComments()
                setcommentText('')
            })
            .catch((error) => {
                setSendLoader(false)
                showToastmsg("Something went wrong. Please try again")
                console.log("error=>", error);
            })

    }
    const addComments = (e) => {
        setComment(e.nativeEvent.text)
        setFinalComment(e.nativeEvent.text)
    }
    const getAllComments = () => {
        setLoader(true)
        axios.post(`${Constants.BASE_URL}post/read-comment`, {
            "post_id": postDetails?.id,
            "user_id": userDetails?.id,

        }).then((response) => {
            // console.log('response_read_comment', response)
            setLoader(false)
            if (response.data.length > 0) {
                setcommentsData(response.data.filter((i) => i.post_id == postDetails?.id))
            }
        })
            .catch((error) => {
                setLoader(false)
                showToastmsg("Something went wrong.")
                console.log("errro=>", error);
            })
    }
    const getAllLikes = () => {
        axios.post(`${Constants.BASE_URL}post/read-comment-lk`)
            .then((response) => {
                setcommentLikeData(response.data)
            })
            .catch((error) => {
                console.log("error=>", error);
            })
    }
    useEffect(() => {
        getAllComments()
        getAllLikes()
    }, [postDetails])
    return (
        <View style={{ flex: 1, }}>

            <StatusBar translucent={true} backgroundColor='transparent' />
            {/* <CustomAppBar title='Comments' navigation={navigation} /> */}
            {/* {console.log('checking=>',userDetails?.influencer?.avatar)} */}
            <Text style={{ fontFamily: 'Aviner', fontSize: 20, fontWeight: '500', alignSelf: 'center', marginTop: 10 }}>  Comments</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
            </View>



            {/* <> */}
            {loader ?
                <ActivityIndicator color={Constants.colors.primaryColor} size={35} />
                :
                <>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={commentsData}
                        style={{ marginBottom: 40, }}
                        renderItem={item => <RenderComments item={item} userDetails={userDetails}
                            commentLikeData={commentLikeData}
                            getAllLikes={getAllLikes}
                        />}
                        keyExtractor={item => item?.id?.toString()}
                        ListEmptyComponent={<View style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: 50 }}>
                            <Text style={styles.commenters}>No comments found.</Text>
                        </View>}
                    />
                    <View style={{ height: 100, borderTopColor: 'gray', borderTopWidth: 0.3 }}>
                        <View style={styles.writeCommentContainer}>
                            <Image source={userDetails?.influencer?.avatar ?
                                {
                                    uri: (`${Constants.BASE_IMAGE_URL}${userDetails?.influencer?.avatar}`),

                                }
                                : Images.avatar} style={{ marginLeft: 10, width: 40, resizeMode: "cover", height: 40, aspectRatio: 1, borderRadius: 50, }} />
                            <TextInput style={styles.writeComments} numberOfLines={2} ultiline={true} placeholder={'Add comment...'} value={commentText} onChangeText={setcommentText} />
                            {/* <Pressable style={styles.emoji} onPress={() => {
                        setShowEmoji(!showEmoji)
                        setFinalComment(finalComment + showEmoji)
                    }}>
                        <Image source={Images.emoji} />
                    </Pressable> */}
                            {SendLoader ?
                                <ActivityIndicator />
                                :
                                <Pressable style={styles.send} onPress={() => addComment()}>
                                    <Text style={{ fontSize: 15, color: '#795CB2' }}>Post</Text>
                                    {/* <Feather name='send' style={{  fontSize: 18, color: 'gray' }} /> */}
                                </Pressable>}
                            {/* <Text style={styles.comments}>{finalComment}{selectedEmoji}</Text> */}
                        </View>
                    </View>
                    <View style={{ display: showEmoji ? 'flex' : 'none', position: 'absolute', bottom: 65, width: '100%', left: 0, right: 0, height: 230, backgroundColor: Constants.colors.whiteColor, zIndex: 9999 }}>
                        <EmojiSelector onEmojiSelected={emoji => setSelectedEmoji([...selectedEmoji, emoji])} showSearchBar={false} style={{ height: 205, }} />
                    </View>
                </>}
        </View>
    )
}

const styles = StyleSheet.create({
    actionContainer: {

    },
    writeCommentContainer: {
        flex: 1,
        flexDirection: 'row',
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0,
        top: 0,
        alignItems: 'center',
        backgroundColor: Constants.colors.whiteColor,
    },
    writeComments: {
        width: '75%',
        height: 50,
        flexWrap: 'wrap',
        // marginTop: 13,
        padding: 6,
        paddingStart: 12,
        paddingRight: 30,
        // backgroundColor: '#F9F9F9',
        // color: '#F9F9F9'
    },
    send: {
        flexDirection: 'row',
        // backgroundColor: Constants.colors.primaryColor,
        // width: '15%',
        borderRadius: responsiveWidth(10),
        // marginTop: 12,
    },
    emoji: {
        position: 'absolute',
        padding: 20,
        right: 60,
        top: 10,
        backgroundColor: Constants.colors.whiteColor,
        zIndex: 9999,
    },
    comments: {
        position: 'absolute',
        left: 12,
        top: 25,
    },
    commenters: {
        fontFamily: Constants.fontFamily,
        fontWeight: '700',
        fontSize: 20
    },
})

export default ReelsComments 