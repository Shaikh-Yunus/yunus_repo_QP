import { useNavigation } from '@react-navigation/native'
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
import RenderMyRequest from './RenderMyRequest'

const MyRequest = (props) => {
    const navigation = useNavigation()
    const [tabs, setTabs] = useState('pending')
    const [loader, setLoader] = useState(false)
    const [influencerRequestdata, setInfluencerRequestdata] = useState([])
    const [influencerApprovedata, setInfluencerApprovedata] = useState([])
    const EmptyListMessage = ({ item }) => {
        return (
            // Flat List Item
            <Text
                style={styles.emptyListStyle}
            >
                {tabs === 'pending' ? 'No pending requests found' : 'No ongoing request found'}
            </Text>
        );
    };
    const getBussinessRequests = (type) => {
        setLoader(true)
        axios.get(`${Constants.BASE_URL}influencer/get-req-influencer-collabration/${props?.route?.params?.userDetails?.influencer?.influencer_id}`)
            .then((response) => {
                setLoader(false)
                if (response.data.response == 200) {
                    console.log("response", response.data.data.Business);
                    if (type == 'pending') {
                        setTabs('pending');
                        setInfluencerRequestdata(response.data.data.Business.filter((i) => i.collabration_status == 'pending'))
                        setInfluencerApprovedata([])
                    }
                    else {
                        setTabs('ongoing');
                        setInfluencerRequestdata([])
                        setInfluencerApprovedata(response.data.data.Business.filter((i) => i.collabration_status == 'approve'))
                    }
                }
            }).catch((error) => {
                setLoader(false)
                console.log("get api error", error.response);
            })
    }
    const products = [
        {
            id: 1,
            img: Images.myPillarIcon,
        },
        {
            id: 2,
            img: Images.myPillarIcon,
        },
        {
            id: 3,
            img: Images.myPillarIcon,
        },
        {
            id: 4,
            img: Images.myPillarIcon,
        },
        {
            id: 5,
            img: Images.myPillarIcon,
        },
        {
            id: 6,
            img: Images.myPillarIcon,
        },
    ]
    const services = [
        {
            id: 1,
            img: Images.usaerIcon,
        },
        {
            id: 2,
            img: Images.usaerIcon,
        },
        {
            id: 3,
            img: Images.usaerIcon,
        },
        {
            id: 4,
            img: Images.usaerIcon,
        },
        {
            id: 5,
            img: Images.usaerIcon,
        },
        {
            id: 6,
            img: Images.usaerIcon,
        },
    ]
    useEffect(() => {
        if (props?.route?.params?.page)
            getBussinessRequests(props?.route?.params?.page)
        else
            getBussinessRequests(tabs)
    }, [props?.route?.params])
    return (
        <View style={StyleSheet.wrapper}>
            <CustomAppBar navigation={navigation} isMainscreen={false} isReel={false} title={`My Request (${tabs === 'pending' ? influencerRequestdata.length : influencerApprovedata.length})`} />
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.myPillarText}>
                        View and manage your pending request here. It will be updated once the business approves.
                    </Text>
                    <View style={styles.tabs}>
                        <Pressable onPress={() => getBussinessRequests('pending')}>
                            <Text style={{ ...styles.tabText, color: tabs === 'pending' ? Constants.colors.primaryColor : null, fontWeight: tabs === 'pending' ? '800' : '400', textDecorationColor: tabs === 'pending' ? Constants.colors.primaryColor : 'transparent' }}>Pending</Text>
                            {tabs === 'pending' ? <View style={styles.activeTab}></View> : <View style={{ ...styles.activeTab, backgroundColor: 'transparent' }}></View>}
                        </Pressable>
                        <Pressable onPress={() => getBussinessRequests('ongoing')}>
                            <Text style={{ ...styles.tabText, color: tabs === 'ongoing' ? Constants.colors.primaryColor : null, fontWeight: tabs === 'ongoing' ? '800' : '400', textDecorationColor: tabs === 'product' ? Constants.colors.primaryColor : 'transparent' }}>Ongoing</Text>
                            {tabs === 'ongoing' ? <View style={styles.activeTab}></View> : <View style={{ ...styles.activeTab, backgroundColor: 'transparent' }}></View>}
                        </Pressable>

                    </View>
                    {loader ?
                        <ActivityIndicator size={30} color={'#80FFB9'} style={{ marginTop: 30 }} />
                        :
                        <FlatList
                            style={{ marginBottom: 80, marginTop: 10 }}
                            data={tabs == 'pending' ? influencerRequestdata : influencerApprovedata}
                            renderItem={item => <RenderMyRequest pillars={item} tabs={tabs} getBussinessRequests={getBussinessRequests} />}
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
    container: {
        flex: 1,
        padding: Constants.padding,
    },
    myPillarText: {
        fontFamily: Constants.fontFamily,
        fontSize: 14,
    }, emptyListStyle: {
        padding: 10,
        fontSize: 18,
        marginTop: 20,
        textAlign: 'center',
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

export default MyRequest