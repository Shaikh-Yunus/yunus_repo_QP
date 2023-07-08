import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    ScrollView,
    FlatList,
    Pressable,
    ActivityIndicator,
} from 'react-native'
import CustomAppBar from '../../../components/advertiser/CustomAppBar'
import { useNavigation } from '@react-navigation/native'
import globatStyles from '../../../shared/globatStyles'
import Constants from '../../../shared/Constants'
import SearchBar from '../../../components/explore/SearchBar'
import axios from 'axios'
import RenderAdvertiserRequest from './RenderAdvertiserRequest'


const AdvertiserList = (props) => {
    const [advertiserData, setadvertiserData] = useState([])
    const [loading, setLoading] = useState(false)
    const navigation = useNavigation()
    const [tabs, setTab] = useState('ongoing')
    const EmptyListMessage = ({ item }) => {
        return (
            // Flat List Item
            <Text
                style={styles.emptyListStyle}
            >
                No Advertiser Found
            </Text>
        );
    };
    const ongoing = [
        { id: 1, },
        { id: 2, },
        { id: 3, },
        { id: 4, },
        { id: 5, },
    ]
    const pending = [
        { id: 1, },
        { id: 2, },
        { id: 3, },
        { id: 4, },
        { id: 5, },
    ]
    const getAdverticerList = () => {
        setLoading(true)
        axios.get(`${Constants.BASE_URL}Get/Adverticer/${props?.route?.params?.userDetails?.business?.business_id}`).then((response) => {
            setLoading(false)
            if (response.status == 200) {
                console.log('response_advertiserList', response.data.Data)
                setadvertiserData(response.data.Data)
            }
        }).catch((error) => {
            setLoading(false)
            console.log("list error", error.response);
        })
    }
    useEffect(() => {
        getAdverticerList()
    }, [props?.route?.params])
    // const sendBusinessRequest = ()=>{
    //     props.navigation.navigate('/influencer-request')
    // }
    return (
        <View style={globatStyles.wrapper}>
            {console.log("advertiserData", props?.route?.params?.userDetails?.business?.business_id)}
            <StatusBar translucent={true} backgroundColor='transparent' />
            <CustomAppBar navigation={navigation} isMainscreen={false} isReel={false} headerRight={false} title={`Advertiser List  (${advertiserData?.length})`} isCamera={true} />
            <ScrollView style={styles.container}>
                <Text style={styles.desc}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut .
                </Text>
                {/* <SearchBar /> */}
                {/* <View style={styles.tabContainer}>
                    <Text style={[styles.tab, {color: tabs==='ongoing'?Constants.colors.primaryColor:'#676767', textDecorationLine: tabs==='ongoing'?'underline':'none',}]} onPress={()=>setTab('ongoing')}>Ongoing</Text>
                    <Text style={[styles.tab, {color: tabs==='pending'?Constants.colors.primaryColor:'#676767', textDecorationLine: tabs==='pending'?'underline':'none',}]} onPress={()=>setTab('pending')}>Pending</Text>
                </View> */}
                {/* {console.log("data==>",influencerData)} */}
                {loading ?
                    <ActivityIndicator size={30} color={'#80FFB9'} style={{ marginTop: 30 }} />
                    :
                    <FlatList
                        data={advertiserData.filter((i) => i.collabration_id == undefined)}
                        renderItem={item => <RenderAdvertiserRequest userDetails={props?.route?.params?.userDetails} item={item}
                            keyExtractor={item => item?.id?.tostring()} />}
                        ListEmptyComponent={EmptyListMessage}

                    />}
                {/* <Pressable onPress={sendBusinessRequest} style={[globatStyles.button, {marginBottom: 20,}]}>
                    <Text style={globatStyles.btnText}>Send Request</Text>
                </Pressable> */}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: Constants.padding,
    },
    emptyListStyle: {
        padding: 10,
        fontSize: 18,
        marginTop: 20,
        textAlign: 'center',
    },
    desc: {
        fontFamily: Constants.fontFamily,
        marginBottom: 12,
    },
    tabContainer: {
        marginTop: 12,
        marginBottom: 12,
        flexDirection: 'row',
    },
    tab: {
        fontFamily: Constants.fontFamily,
        fontSize: 18,
        fontWeight: '700',
        marginRight: 12,
        color: '#676767',
    },
})

export default AdvertiserList