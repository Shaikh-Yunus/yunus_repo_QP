import React, { useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    Pressable,
    ActivityIndicator,
} from 'react-native'
import SelectDropdown from 'react-native-select-dropdown'
import Images from '../../../assets/images/Images'
import Constants from '../../../shared/Constants'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import globatStyles from '../../../shared/globatStyles'
import AntDesign from 'react-native-vector-icons/AntDesign'
import axios from 'axios'
import showToastmsg from '../../../shared/showToastmsg'
import { useNavigation } from '@react-navigation/native'
import { responsiveFontSize } from 'react-native-responsive-dimensions'
import FastImage from 'react-native-fast-image'



const RenderAdvertiserRequest = ({ item, userDetails }) => {
    const [loader, setLoader] = useState(false)
    const navigation = useNavigation()
    const sendRequest = () => {
        setLoader(true)
        axios.post(`${Constants.BASE_URL}Advertiser/Collabration`,{
            "from":2,
            "advertiser_id": item?.item?.id,
            "business_id": userDetails?.business?.business_id,
        }).then((response) => {

            setLoader(false)

            if (response.status == 200) {
                showToastmsg('Request for collaboration sended to Advertiser')
                // navigation.navigate('/my-pillars', { userDetails: userDetails, page: 'pending' })
            }
            else {
                showToastmsg('Cannot send request to Advertiser. Please try again later')
            }
        }).catch((error) => {
            setLoader(false)
            console.log("error data", error.response);
            showToastmsg('Cannot send request to Advertiser. Please try again later')
        })
    }
    return (
        <View style={styles.container}>
            {console.log("item_item", item?.item)}
            <View style={styles.headingLine}>
                <View style={{ flexDirection: 'row', }}>
                    <View style={styles.barndIcon}>
                        <FastImage source={item?.item?.avtar ?
                            { uri: `${Constants.BASE_IMAGE_URL}${item?.item?.avtar}` }
                            : Images.nike} style={{
                                width: item?.item?.avtar && 48,
                                height: item?.item?.avtar && 48,
                                borderRadius: 15
                            }} />
                    </View>
                    <View>
                        <Text style={{ fontFamily: Constants.fontFamily, fontSize: responsiveFontSize(2), fontWeight: '700', textTransform: 'capitalize' }}>{item?.item?.username}</Text>
                        <Text style={{ fontFamily: Constants.fontFamily, color: '#A4A4B2' }}>Advertiser</Text>
                    </View>
                </View>
                <Text style={{ fontFamily: Constants.fontFamily, fontWeight: '700', }}>{item?.item?.insta_follower_count} Followers</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ width: '99%' }}>
                    <Text style={{ fontFamily: Constants.fontFamily, fontSize: 15, textTransform: 'uppercase', marginTop: 8, marginBottom: 6, }}>Lorem Ipsum Dolor SIt</Text>
                    <Text style={{ fontFamily: Constants.fontFamily, fontSize: 12, }}>consectetur adipiscing elit, sed do smod tempor incididunt ut . Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.ipsum dolor sit amet. Lorem ipsum dolor sit amet.ipsum dolor sit amet.</Text>
                </View>

                <FastImage source={Images.business} />

            </View>
            <View style={{ justifyContent: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{
                    marginTop: 35, fontFamily: Constants.fontFamily,
                    color: '#747474',
                    fontSize: 12,
                    width: '50%', alignSelf: 'center', padding: 0,
                }}> Created at : {item?.item?.CreatedAt} </Text>

{
                    item?.item?.Ok === true ? (
                        <View  style={ {padding: 5, width: '100%',
                             marginTop: 32, borderColor:'red', width: '40%', alignSelf: 'center',  }}>
                        <Text style={[globatStyles.btnOutlineText ,{color:'red', fontSize:12,textTransform: 'none',  }]}>Already Requested</Text>
                        </View>
                    ) : (
                        <>
                          {loader ?  <ActivityIndicator size={30} color={'#80FFB9'} />
                            :<Pressable
                                onPress={sendRequest}
                                style={[
                                    globatStyles.btnOutline,
                                    { width: '40%', alignSelf: 'center', padding: 5 },
                                ]}
                            >
                                <Text style={globatStyles.btnOutlineText}>Send Request</Text>
                            </Pressable>}
                        </>
                    )
                }
                {/* {loader ?
                    <ActivityIndicator size={30} color={'#80FFB9'} />
                    :
                    <Pressable onPress={sendRequest} style={[globatStyles.btnOutline, {width: '40%', alignSelf: 'center', padding: 5, }]}><Text style={globatStyles.btnOutlineText}>Send Request</Text></Pressable>} */}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Constants.colors.whiteColor,
        padding: 12,
        marginTop: 12,
        borderRadius: Constants.borderRadius,
        paddingBottom: Constants.padding + 12,
    },
    headingLine: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    barndIcon: {
        width: 48,
        height: 48,
        backgroundColor: '#000000',
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
})

export default RenderAdvertiserRequest