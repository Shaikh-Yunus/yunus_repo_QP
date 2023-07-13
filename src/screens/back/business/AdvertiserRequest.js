import React, { useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    ScrollView,
    FlatList,
} from 'react-native'
import CustomAppBar from '../../../components/influencer/CustomAppBar'
import { useNavigation } from '@react-navigation/native'
import globatStyles from '../../../shared/globatStyles'
import Constants from '../../../shared/Constants'
import SearchBar from '../../../components/explore/SearchBar'
import RenderAdvertiserCollobrationRequest from './RenderAdvertiserCollobrationRequest'
import { useEffect } from 'react'
import axios from 'axios'
import showToastmsg from '../../../shared/showToastmsg'

const AdvertiserRequest = (props) => {
    const navigation = useNavigation()
    const [tabs, setTab] = useState('ongoing')
    const [data, setdata] = useState({})
    const [loader, setloader] = useState(false)
    const [ongoing, setOngoing] = useState([]);
    const [pending, setPending] = useState([]);

    useEffect(() => {
        setloader(true)
        axios.post(`${Constants.BASE_URL}getBuiness/Collaboration`, {
            business_id: props?.route?.params?.props?.userDetails?.business?.business_id
        })
            .then((response) => {
                console.log('advertiser list',response?.data)
                setloader(false) 
                setdata(response.data);
                setOngoing(response?.data?.Data?.Ongoing);
                setPending(response?.data?.Data?.Pending);
                console.log('"advertiser==>>', response?.data?.Data?.Pending)
            })
            .catch((error) => { 
                setloader(false)
                showToastmsg("Something went wrong")
                console.log("error=>", error);
            })

    }, [])
    // const ongoing = [
    //     { id: 1, },
    //     { id: 2, },
    //     { id: 3, },
    //     { id: 4, },
    //     { id: 5, },
    // ]
    // const pending = [
    //     { id: 1, },
    //     { id: 2, },
    //     { id: 3, },
    //     { id: 4, },
    //     { id: 5, },
    // ]



    return (
        <View style={globatStyles.wrapper}>
            
            <StatusBar translucent={true} backgroundColor='transparent' />
            <CustomAppBar navigation={navigation} isMainscreen={false} isReel={false} headerRight={false} title='Advertiser Requested ' isCamera={true} />
            <ScrollView style={styles.container}>
                <Text style={styles.desc}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut .
                </Text>
                {/* <SearchBar /> */}
                <View style={styles.tabContainer}>
                {console.log('props====',props?.route?.params?.props?.userDetails?.business?.business_id)}
                    <Text style={[styles.tab, {color: tabs==='ongoing'?Constants.colors.primaryColor:'#676767', textDecorationLine: tabs==='ongoing'?'underline':'none',}]} onPress={()=>setTab('ongoing')}>Ongoing</Text>
                    <Text style={[styles.tab, {color: tabs==='pending'?Constants.colors.primaryColor:'#676767', textDecorationLine: tabs==='pending'?'underline':'none',}]} onPress={()=>setTab('pending')}>Pending</Text>
                </View>
                <FlatList
                    data={tabs === 'ongoing' ? ongoing : pending}
                    renderItem={item => <RenderAdvertiserCollobrationRequest item={item} userdetails={props?.route?.params?.props?.userDetails} tabs={tabs}
                        keyExtractor={item => item?.id?.tostring()}
                    />} />
            </ScrollView>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        padding: Constants.padding,
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

export default AdvertiserRequest
