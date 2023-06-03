import React, { useEffect, useRef, useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    Pressable,
    ScrollView,
    TouchableOpacity,
} from 'react-native'
import Images from '../../../assets/images/Images'
import Constants from '../../../shared/Constants'
import AntDesign from 'react-native-vector-icons/AntDesign'
import moment from 'moment'
import axios from 'axios'
import showToastmsg from '../../../shared/showToastmsg'
import RBSheet from "react-native-raw-bottom-sheet";
import { TextInput } from 'react-native-gesture-handler'
import LinearGradient from 'react-native-linear-gradient'
import { responsiveWidth } from 'react-native-responsive-dimensions'
const RenderComments = ({ item, userDetails, commentLikeData, getAllLikes }) => {
    // console.log("item=>",item?.item);
    const [like, setLike] = useState(false)
    const refRBSheet = useRef();
    const [showreply, setshowreply] = useState(true);
    const [replydata, setReplydata] = useState([]);
    const [SendLoader, setSendLoader] = useState(false)
    // 
    const [showFullText, setShowFullText] = useState(false);
    const tapCount = useRef(0);

    const additem = () => {
        setSendLoader(true)
        axios.post(`${Constants.BASE_URL}post/add-comment-rly`, {
            "comment_id": item?.item?.id,
            "user_id": userDetails?.id,
            "reply_text": replydata,
           
            // "post_id": postDetails?.id,
            // "comment_text": commentText
        })
            .then((response) => {
                setSendLoader(false)
                // getAllComments()
                // setcommentText('')
            })
            .catch((error) => {
                setSendLoader(false)
                showToastmsg("Something went wrong. Please try again")
                console.log("error=>", error);
            })
        setReplydata([...replydata])
    }

    const addLikeFn = () => {
        axios.post(`${Constants.BASE_URL}post/add-comment-lk`, {
            user_id: userDetails?.id,
            comment_id: item?.item?.id
        }).then((response) => {
            console.log("like", response.data)
            setLike(true)
            // setLikeCount(LikeCount+1)

            getAllLikes()
        })
            .catch((error) => {
                showToastmsg("Something went wrong.Please try again")
            })

        // setLike(!like)
    }
    const removeLikeFn = async () => {

        if (like) {
            await axios.post(`${Constants.BASE_URL}post/${commentLikeData.filter((i) => i.comment_id == item?.item?.id && i.user_id == userDetails?.id)[0].id}/delete-comment-lk`).then(async (response) => {
                console.log("dislike", response.data)
                getAllLikes()
                setLike(false)
                // if(LikeCount>0){
                //     setLikeCount(LikeCount-1)
                // }
            }).catch((error) => {
                showToastmsg("Something went wrong.Please try again")
            })
        }
        // setLike(false)
    }
    const handlePress = () => {
        tapCount.current += 1;
        if (tapCount.current === 2) {
            addLikeFn()
            tapCount.current = 0;
        }
    };
    useEffect(() => {
        // getAllLikes()
        if (commentLikeData.filter((i) => i.comment_id == item?.item?.id && i.user_id == userDetails?.id).length > 0) {
            setLike(true)
        }
        else {
            setLike(false)
        }
    }, [commentLikeData])
    const handleTextPress = () => {
        setShowFullText(!showFullText);
    };
    return (
        <View style={styles.container}>
            {/* {console.log('item?.item?.id', item?.item?.Reply[0]?.reply_text)} */}
            <View style={{ flex: 1, flexDirection: "row" }}>
                <View style={{ width: 45, flexDirection: 'row', marginRight: 5 }}>
                    <Image source={item?.item?.avtar ?
                        {
                            uri: (`${Constants.BASE_IMAGE_URL}${item?.item?.avtar}`),

                        }
                        : Images.avatar} style={{ width: "100%", resizeMode: "cover", height: '50%', aspectRatio: 1, borderRadius: 50, }} />
                </View>
                <View style={{ width: "80%", }}>

                    <Text style={styles.commenters}> {item?.item?.username}</Text>
                    <View style={{ width: '100%' }}>
                        {/* <Text style={{ fontFamily: Constants.fontFamily, paddingTop: 2, flexWrap: 'wrap' }}>
                            {item?.item?.comment_text}
                        </Text> */}
                        {/* <Pressable onPress={() => { handleTextPress(), handlePress() }} >
                            {item?.item?.comment_text.length >= 10 ? <Text style={styles.text}>
                                {showFullText ? "...see more" : ` ${item?.item?.comment_text}${"\nSee less".slice(5, 100)}`}
                            </Text> : <Text style={styles.text}>{item?.item?.comment_text}</Text>}
                           
                        </Pressable> */}
                        <Pressable onPress={handlePress}>
                                    <Text style={styles.desc}>
                                        {showFullText
                                            ? item?.item?.comment_text
                                            : item?.item?.comment_text?.slice(0, 30)}
                                    </Text>
                                </Pressable>
                                {item?.item?.comment_text.length >= 30 ? <Pressable onPress={handleTextPress}>
                                    <Text style={{
                                        fontFamily: Constants.fontFamily,
                                        color: 'black',
                                        // marginLeft: responsiveWidth(2),

                                    }}>{showFullText ? "See less" : "...more"}</Text>
                                </Pressable> : null}
                        
                    </View>
                    <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", paddingTop: 2 }}>
                        <Text style={{ fontFamily: Constants.fontFamily, fontSize: 12, }}>{moment(new Date(item?.item?.created_at)).fromNow()}</Text>

                        <Pressable onPress={() => refRBSheet.current.open()}>
                            <Text>reply</Text>
                        </Pressable>



                        {like ?
                            <AntDesign name={'heart'} style={[styles.icon, { color: '#f54295' }]}
                                size={16}
                                onPress={() => removeLikeFn()}
                            />
                            : null
                        }

                        {!like ?
                            <AntDesign name={'hearto'}
                                size={16}
                                // style={[styles.icon, { color:  '#FFF' }]}
                                onPress={() => addLikeFn()}
                            />
                            : null}
                        {/* <AntDesign name='hearto' size={20} style={{}} /> */}

                    </View>


                    {/*  */}
                    {/* reply on comment  */}

                    <RBSheet
                        ref={refRBSheet}
                        closeOnDragDown={true}
                        closeOnPressMask={true}

                        customStyles={{
                            wrapper: {
                                backgroundColor: "transparent"
                            },
                            draggableIcon: {
                                backgroundColor: "#000"
                            }
                        }}
                    >
                        <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 20, marginTop: 10 }}>
                            {/* <Text style={{ marginRight: 2, marginTop: 3 }}>@RobertPhan</Text> */}

                            <Image source={item?.item?.avtar ?
                                {
                                    uri: (`${Constants.BASE_IMAGE_URL}${item?.item?.avtar}`),

                                }
                                : Images.avatar} style={{ width: 40, resizeMode: "cover", height: 40, aspectRatio: 1, borderRadius: 50, }} />

                            <TextInput
                                style={styles.replyinput}
                                onChangeText={setReplydata}
                                value={replydata}
                                placeholder="reply to comment"
                            />

                            <Pressable onPress={() => additem()}>
                                <Text style={{ fontSize: 15, color: '#795CB2', top: 7 }}>post</Text>
                            </Pressable>
                        </View>
                    </RBSheet>

                    {showreply ? (

                        <Pressable onPress={() => {
                            setshowreply(false)

                        }}>

                            <Text style={{ fontSize: 12, opacity: 0.5 }}> Show Reply</Text>
                        </Pressable>

                    ) : <ScrollView>
                        <View>
                            {console.log('check_data',item)}
                            <View style={{ flexDirection: 'row' }}>
                                <Image source={userDetails?.influencer?.avatar ?
                                    {
                                        uri: (`${Constants.BASE_IMAGE_URL}${item?.item?.avtar}`),

                                    }
                                    : Images.avatar} style={{ width: 30, resizeMode: "cover", height: 30, aspectRatio: 1, borderRadius: 50, }} />
                                <Text style={styles.item}>{item?.item?.username}</Text>

                            </View>
                            <View style={{ width: '80%', flexDirection: 'row' }}>
                                <Text style={{ marginLeft: '5%', flexWrap: 'wrap' }}>{}l</Text>

                            </View>
                        </View>
                        <Pressable onPress={() => setshowreply(true)}>
                            <Text style={{ fontSize: 12, opacity: 0.5 }}> hide replies</Text>
                        </Pressable>
                    </ScrollView>}

                    {/* <--reply on comment -->  */}

                </View>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginBottom: 10,
        padding: Constants.padding - 5,
        backgroundColor: Constants.colors.whiteColor,
    },
    commenters: {
        fontFamily: Constants.fontFamily,
        fontWeight: '700',
    },
    replyinput: {

        width: '70%',

    },
    text: {
        fontFamily: Constants.fontFamily, paddingTop: 2, flexWrap: 'wrap'
    },
    
})

export default RenderComments