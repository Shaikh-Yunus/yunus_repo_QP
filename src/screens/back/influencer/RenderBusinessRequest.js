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
import FastImage from 'react-native-fast-image'

const RenderBusinessRequest = ({ item, userDetails }) => {
    const [loader, setLoader] = useState(false)

    const sendRequest = () => {
        setLoader(true)
        axios.post(`${Constants.BASE_URL}BusinessAdvertiser/Collabration`, {
            "from":1,
            "advertiser_id": userDetails?.advertiser?.advertiser_id,
            "business_id": item?.item?.id,
        }).then((response) => {

            setLoader(false)

            if (response.status == 200) {
                showToastmsg('Request for collaboration sended to Business')
                // navigation.navigate('/my-pillars', { userDetails: userDetails, page: 'pending' })
            }
            else {
                showToastmsg(response?.Msg)
            }
        }).catch((error) => {
            setLoader(false)
            console.log("error data", error.response);
            showToastmsg('Cannot send request to Business. Please try again later')
        })
    }
    return (
        <View style={styles.container}>
            {console.log('item', item?.item?.business_profile_pic)}
            {console.log('userDetails_userDetails=>', userDetails?.advertiser?.advertiser_id)}
            <View style={styles.headingLine}>
                <View style={{ flexDirection: 'row', }}>
                    <View style={styles.barndIcon}>
                        <FastImage source={item?.item?.business_profile_pic ?
                            { uri: `${Constants.BASE_IMAGE_URL}${item?.item?.business_profile_pic}` }
                            : Images.nike} style={{
                                width: item?.item?.business_profile_pic && 48,
                                height: item?.item?.business_profile_pic && 48,
                                borderRadius: 15
                            }} />
                    </View>
                    <View>
                        <Text style={{ fontFamily: Constants.fontFamily, fontSize: 18, fontWeight: '700', }}>{item?.item?.username}</Text>
                        <Text style={{ fontFamily: Constants.fontFamily, color: '#A4A4B2' }}>Fashion</Text>
                    </View>
                </View>
                <Text style={{ fontFamily: Constants.fontFamily, fontWeight: '700', }}>24M Followers</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ width: '70%' }}>
                    <Text style={{ fontFamily: Constants.fontFamily, fontSize: 15, textTransform: 'uppercase', marginTop: 8, marginBottom: 6, }}>Lorem Ipsum Dolor SIt</Text>
                    <Text style={{ fontFamily: Constants.fontFamily, fontSize: 12, }}>consectetur adipiscing elit, sed do smod tempor incididunt ut . Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.ipsum dolor sit amet. Lorem ipsum dolor sit amet.ipsum dolor sit amet.</Text>
                </View>
                <View>
                    <Image source={Images.business} />
                </View>
            </View>
            <View style={{ justifyContent: 'center', }}>
                {loader ?
                    <ActivityIndicator size={30} color={'#80FFB9'} />
                    :
                    <Pressable onPress={sendRequest} style={[globatStyles.btnOutline, { width: '50%', alignSelf: 'center', padding: 6, }]}><Text style={globatStyles.btnOutlineText}>Send Request</Text></Pressable>}
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

export default RenderBusinessRequest