import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    ScrollView,
    FlatList,
    Pressable,
    TextInput,
} from 'react-native'
import CustomAppBar from '../../../components/influencer/CustomAppBar'
import { useNavigation } from '@react-navigation/native'
import globatStyles from '../../../shared/globatStyles'
import Constants from '../../../shared/Constants'
import SearchBar from '../../../components/explore/SearchBar'
import RenderBusinessList from './RenderBusinessList'
import { FlashList } from '@shopify/flash-list'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import axios from 'axios'


const BusinessList = (props) => {
    const [data, setdata] = useState({})
    const [loader, setloader] = useState(false)
    const [ongoing, setOngoing] = useState([]);
    const [pending, setPending] = useState([]);

    const navigation = useNavigation()
    const [tabs, setTab] = useState('ongoing')
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
    const sendBusinessRequest = () => {
        props.navigation.navigate('/business-request', { userdetails: props?.route?.params?.userDetails })
    }
    useEffect(() => {
        setloader(true)
        axios.post(`${Constants.BASE_URL}Get/BusinessList`, {
            advertiser_id: 15
        })
            .then((response) => {
                setloader(false)
                setdata(response.data);
                setOngoing(response?.data?.Data?.Ongoing.concat(response?.data?.Data?.UserData));
                setPending(response?.data?.Data?.Pending);
                console.log('"advertiser', response?.data?.Data?.Pending)
            })
            .catch((error) => {
                setloader(false)
                showToastmsg("Something went wrong")
                console.log("error=>", error);
            })

    }, [])
    return (
        <View style={globatStyles.wrapper}>
            {console.log('data_=', data)}
            {console.log('props=', props?.route?.params?.userDetails)}
            <StatusBar translucent={true} backgroundColor='transparent' />
            <CustomAppBar navigation={navigation} isMainscreen={false} isReel={false} headerRight={false} title='Business List (10)' isCamera={true} />
            <ScrollView style={styles.container}>
                <Text style={styles.desc}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut .
                </Text>
                {/* <SearchBar /> */}
                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search"
                    />
                    <FontAwesome
                        name='search'
                        size={24}
                        color="black"
                        style={styles.searchIcon}
                    />
                </View>
                <View style={styles.tabContainer}>
                    <Text style={[styles.tab, { color: tabs === 'ongoing' ? Constants.colors.primaryColor : '#676767', textDecorationLine: tabs === 'ongoing' ? 'underline' : 'none', }]} onPress={() => setTab('ongoing')}>Ongoing</Text>
                    <Text style={[styles.tab, { color: tabs === 'pending' ? Constants.colors.primaryColor : '#676767', textDecorationLine: tabs === 'pending' ? 'underline' : 'none', }]} onPress={() => setTab('pending')}>Pending</Text>
                </View>
                <FlatList
                    data={tabs === 'ongoing' ? ongoing : pending}
                    renderItem={item => <RenderBusinessList item={item} userdetails={props?.route?.params?.userDetails} tabs={tabs}
                        keyExtractor={item => item?.id?.tostring()}
                    />} />
                <Pressable onPress={sendBusinessRequest} style={[globatStyles.button, { marginBottom: 30, }]}>
                    {data?.Data?.Pending.length === 0 ? <Text style={globatStyles.btnText}>See Business List</Text> : <Text style={globatStyles.btnText}>Send Request</Text>}
                </Pressable>

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
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        width: '95%',
        paddingHorizontal: 10,
        marginVertical: 10,
    },
    searchInput: {
        flex: 1,
        paddingVertical: 10,
    },
    searchIcon: {
        marginLeft: 10,
    },

})

export default BusinessList