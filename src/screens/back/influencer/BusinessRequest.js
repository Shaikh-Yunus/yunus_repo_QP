import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    ScrollView,
    FlatList,
    TextInput
} from 'react-native'
import CustomAppBar from '../../../components/influencer/CustomAppBar'
import { useNavigation } from '@react-navigation/native'
import globatStyles from '../../../shared/globatStyles'
import Constants from '../../../shared/Constants'
import SearchBar from '../../../components/explore/SearchBar'
import RenderBusinessRequest from './RenderBusinessRequest'
import { FlashList } from '@shopify/flash-list'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import axios from 'axios'
const BusinessRequest = (props) => {
    const navigation = useNavigation()
    const [tabs, setTab] = useState('ongoing')
    const [Loading, setLoading] = useState(false)
    const [data, setData] = useState([])


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
    const getBusinessList = () => {
        setLoading(true)
        axios.get(`${Constants.BASE_URL}Get/Business`).then((response) => {
            setLoading(false)
            if (response.status == 200) {
                setData(response.data.Data)
                console.log('response.data', response.data.Data)
            }
        }).catch((error) => {
            setLoading(false)
            console.log("list error", error.response);
        })
    }
    useEffect(() => {
        getBusinessList()
    }, [])
    return (
        <View style={globatStyles.wrapper}>
            {console.log('props', props)}
            {console.log('userdetails_check', props?.route?.params?.userdetails)}
            <StatusBar translucent={true} backgroundColor='transparent' />
            <CustomAppBar navigation={navigation} isMainscreen={false} isReel={false} headerRight={false} title='Request Business' isCamera={true} />
            <ScrollView style={styles.container}>
                <Text style={styles.desc}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut .
                </Text>
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
                {/* <SearchBar /> */}
                {/* <View style={styles.tabContainer}>
                    <Text style={[styles.tab, {color: tabs==='ongoing'?Constants.colors.primaryColor:'#676767', textDecorationLine: tabs==='ongoing'?'underline':'none',}]} onPress={()=>setTab('ongoing')}>Ongoing</Text>
                    <Text style={[styles.tab, {color: tabs==='pending'?Constants.colors.primaryColor:'#676767', textDecorationLine: tabs==='pending'?'underline':'none',}]} onPress={()=>setTab('pending')}>Pending</Text>
                </View> */}
                <FlatList
                    data={data}
                    renderItem={item => <RenderBusinessRequest item={item} userDetails={props?.route?.params?.userdetails}
                        keyExtractor={item => item?.id?.tostring()}
                        estimatedItemSize={200} />} />
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

export default BusinessRequest