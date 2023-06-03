import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { FlatList, Pressable, SafeAreaView, StyleSheet, View, Text, Image, ActivityIndicator, } from "react-native";
import CustomAppBar from "../../../components/explore/CustomAppBar";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Constants from '../../../shared/Constants';
import globatStyles from '../../../shared/globatStyles';
import axios from 'axios';
import { Route } from "@react-navigation/native";


const LikeProfileVisit = (props, { userDetails,  }) => {
    const [follows, setfollows] = useState(true)
    const [likeData, setLikeData] = useState('')
    const navigation = useNavigation();
    const [followLoader, setfollowLoader] = useState(false)
    const route = useRoute() 


    const follow = () => {
        setfollowLoader(true)
        setTimeout(() => {
            setfollowLoader(false)
            setfollows(!follows)
        }, 500);
    }

    useEffect(() => {
        axios.post(`${Constants.BASE_URL}explore/GetLikesOfPost`, {
            user_id: props?.route?.params?.userDetails?.id,
            post_id: route?.params?.postDetails
        }).then((response) => {

            console.log("usesrdetail_check=>",response?.data?.Data)
            // console.log("usesrdetail_check=>",postDetails)
            setLikeData(response.data.Data)
        }).catch((error) => {
            console.log("error", error);
        })
    }, [])


    const DATA = [
        {
            id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            uri: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8cHJvZmlsZSUyMHBpY3R1cmV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
            title: 'First Item',
        },
        {
            id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
            uri: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8cHJvZmlsZSUyMHBpY3R1cmV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
            title: 'Second Item',
        },
        {
            id: '58694a0f-3da1-471f-bd96-145571e29d72',
            uri: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8cHJvZmlsZSUyMHBpY3R1cmV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
            title: 'Third Item',
        },
    ];




    return (
        <SafeAreaView style={styles.container}>
            {/* <Pressable style={{ position: "absolute", zIndex: 99999, top: 25 }} onPress={() => navigation.goBack()}><AntDesign name='left' size={30} color={"#000000"}
            // style={props.isReel ? styles.reelBackBtn : styles.backBtn} 
            /></Pressable> */}
            <CustomAppBar navigation={navigation} isMainscreen={false} isReel={false} title='Likes' userDetails={props?.route?.params?.userDetails} type={Object.keys(props.route.params.userDetails)[Object.keys(props.route.params.userDetails).length - 1]}
            />

           {/* {console.log("user_id",props?.route?.params?.userDetails?.id)}
           {console.log("post_id",route?.params?.postDetails)} */}
        {/* {console.log('like+data',likeData)} */}
            <FlatList
                data={likeData?.User}
                renderItem={({ item, index }) => (
                    <View>
                        
                        <View style={{ flexDirection: 'row' }}>

                            <Image style={styles.profileimage} source={{ uri: `${Constants.BASE_IMAGE_URL}${item?.avatar}` }} />
                            <Text style={styles.profilename}>{item?.username}</Text>

                        </View>

                        {/* <Pressable onPress={follow} style={styles.followBtn}>
                            <Text style={[globatStyles.followBtnText, { fontSize: responsiveFontSize(1.2), color: 'black' }]}>

                                {
                                    follows ? "Following" :
                                        "Follow"}
                                {followLoader ? <ActivityIndicator size={10} color={"#fff"} /> : ""}
                            </Text>
                        </Pressable> */}
                    </View>)
                }
                keyExtractor={item => item.id}
            /> 
       
        </SafeAreaView>
    )


}

const styles = StyleSheet.create({
    container:{
      marginTop:'5%'
    },
    item: {
        flexDirection: 'row',
    },
    profileimage: {
        marginTop: responsiveHeight(3),
        marginLeft: responsiveWidth(4),
        width: responsiveHeight(7),
        height: responsiveHeight(7),
        borderRadius: responsiveWidth(80)
    },
    profileimageexplorer: {
        marginTop: responsiveHeight(3),
        marginLeft: responsiveWidth(15),
        width: responsiveHeight(7),
        height: responsiveHeight(7),
        borderRadius: responsiveWidth(80)
    },
    profilename: {
        marginTop: responsiveHeight(5),
        marginLeft: responsiveWidth(4),

    },
    followBtn: {
        position: 'absolute',
        left: responsiveWidth(80),
        height: responsiveHeight(1),
        backgroundColor: 'transparent',
        borderWidth: 1,
        marginTop: '8.5%',
        borderRadius: 4,
        padding: 6,

    },

})


export default LikeProfileVisit;