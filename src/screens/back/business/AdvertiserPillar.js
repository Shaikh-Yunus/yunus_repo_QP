import { FlashList } from '@shopify/flash-list'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Pressable,
    ScrollView,
    ActivityIndicator,
} from 'react-native'
import Images from '../../../assets/images/Images'
import CustomAppBar from '../../../components/business/CustomAppBar'
import Constants from '../../../shared/Constants'
import RenderMyPillar from './RenderMyPillar'

const AdvertiserPillar = (props) => {
    const [tabs, setTabs] = useState('ongoing')
    const [pillarsData, setpillarsData] = useState([])
    const [pillarsEndedData, setpillarsEndedData] = useState([])
    const [loader, setLoader] = useState(false)
    const getData = (type) => {
        setLoader(true)
        axios.get(`${Constants.BASE_URL}business/request-Advertiser-collobration/${props?.route?.params?.userDetails?.business?.business_id}`)
            .then((response) => {

                if (response.data.response == 200) {
                    console.log('response', response?.data?.data?.Advertiser)
                    // console.log("response data",response.data.data.influencer.filter((i)=>i.collabration_status=='ended'));
                    if (type == 'ongoing') {
                        setTabs('ongoing')
                        setpillarsData(response.data.data.Advertiser.filter((i) => i.collabration_status == 'approve'));
                        setpillarsEndedData([])
                    }
                    else if (type == 'ended') {
                        setTabs('ended')
                        setpillarsData([])
                        setpillarsEndedData(response.data.data.Advertiser.filter((i) => i.collabration_status == 'ended'));
                    }
                    else if (type == 'pending') {
                        setTabs('pending')
                        setpillarsData([])
                        setpillarsEndedData(response.data.data.Advertiser.filter((i) => i.collabration_status == 'pending'));
                    }
                    else {
                        setTabs('rejected')
                        setpillarsData([])
                        setpillarsEndedData(response.data.data.Advertiser.filter((i) => i.collabration_status == 'reject'));
                    }
                    setLoader(false)
                }
                else {
                    setLoader(false)
                }
            }).catch((err) => {
                setLoader(false)
                console.log("api error", err.response);
            })
    }
    useEffect(() => {
        if (props?.route?.params?.page) {
            getData(props?.route?.params?.page)
        }
        else {
            getData(tabs)
        }
        console.log("aaa", props?.route?.params?.userDetails);
    }, [props?.route?.params])
    const EmptyListMessage = ({ item }) => {
        return (
            // Flat List Item
            <Text
                style={styles.emptyListStyle}
            >
                No Data Found
            </Text>
        );
    };
    return (
        <View style={StyleSheet.wrapper}>
            {console.log('props_to_check_Advertiser-Pillers', props?.route?.name)}
            <CustomAppBar navigation={props.navigation} isMainscreen={false} isReel={false} title='Advertiser Pillars' />

            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.myPillarText}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut .
                    </Text>
                    <View style={styles.tabs}>
                        <Pressable onPress={() => getData('ongoing')}>
                            <Text style={{ ...styles.tabText, color: tabs === 'ongoing' ? Constants.colors.primaryColor : null, fontWeight: tabs === 'ongoing' ? '800' : '400', textDecorationColor: tabs === 'ongoing' ? Constants.colors.primaryColor : 'transparent' }}>Ongoing</Text>
                            {tabs === 'ongoing' ? <View style={styles.activeTab}></View> : <View style={{ ...styles.activeTab, backgroundColor: 'transparent' }}></View>}
                        </Pressable>
                        <Pressable onPress={() => getData('pending')}>
                            <Text style={{ ...styles.tabText, color: tabs === 'pending' ? Constants.colors.primaryColor : null, fontWeight: tabs === 'pending' ? '800' : '400', textDecorationColor: tabs === 'pending' ? Constants.colors.primaryColor : 'transparent' }}>Pending</Text>
                            {tabs === 'pending' ? <View style={styles.activeTab}></View> : <View style={{ ...styles.activeTab, backgroundColor: 'transparent' }}></View>}
                        </Pressable>
                        <Pressable onPress={() => getData('rejected')}>
                            <Text style={{ ...styles.tabText, color: tabs === 'rejected' ? Constants.colors.primaryColor : null, fontWeight: tabs === 'rejected' ? '800' : '400', textDecorationColor: tabs === 'rejected' ? Constants.colors.primaryColor : 'transparent' }}>Rejected</Text>
                            {tabs === 'rejected' ? <View style={styles.activeTab}></View> : <View style={{ ...styles.activeTab, backgroundColor: 'transparent' }}></View>}
                        </Pressable>
                        <Pressable onPress={() => getData('ended')}>
                            <Text style={{ ...styles.tabText, color: tabs === 'ended' ? Constants.colors.primaryColor : null, fontWeight: tabs === 'ended' ? '800' : '400', textDecorationColor: tabs === 'ended' ? Constants.colors.primaryColor : 'transparent' }}>Ended</Text>
                            {tabs === 'ended' ? <View style={styles.activeTab}></View> : <View style={{ ...styles.activeTab, backgroundColor: 'transparent' }}></View>}
                        </Pressable>

                    </View>
                    {loader ?
                        <ActivityIndicator size={30} color={'#80FFB9'} style={{ marginTop: 30 }} />
                        :
                        <FlatList
                            style={{ marginBottom: 80, marginTop: 10 }}
                            data={tabs == 'ongoing' ? pillarsData : pillarsEndedData}
                            renderItem={item => <RenderMyPillar pillars={item} getData={getData} tabs={tabs} typename={props?.route?.name} />}
                            keyExtractor={item => item?.id?.toString()}
                            ListEmptyComponent={EmptyListMessage}
                        />}
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    emptyListStyle: {
        padding: 10,
        fontSize: 18,
        marginTop: 20,
        textAlign: 'center',
    },
    container: {
        flex: 1,
        padding: Constants.padding,
    },
    myPillarText: {
        fontFamily: Constants.fontFamily,
        fontSize: 14,
    },
    tabs: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: Constants.padding,
    },
    tabText: {
        fontFamily: Constants.fontFamily,
        fontSize: 16,
        marginRight: Constants.margin + 12,
    },
    activeTab: {
        height: 3,
        width: '60%',
        backgroundColor: Constants.colors.primaryColor,
        marginTop: 6,
    },
})

export default AdvertiserPillar