import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    FlatList,
    Pressable,
} from 'react-native'
import CustomAppBar from '../../../components/influencer/CustomAppBar'
import Constants from '../../../shared/Constants'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AntDesign from 'react-native-vector-icons/AntDesign'
import RenderShareAndEarn from './RenderShareAndEarn'
import RenderShareAndEarnShared from './RenderShareAndEarnShared'
import { FlashList } from '@shopify/flash-list'
import showToastmsg from '../../../shared/showToastmsg'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native'


const ShareAndEarn = (props) => {
    const navigation = useNavigation()
    const [tabs, setTabs] = useState('latest')
    const [loader, setLoader] = useState(false) 
    const[data , setdata] = useState([])
    const latest = [
        { id: 1 },
        { id: 2 },
        { id: 3 },
    ]
    const shared = [
        { id: 1 },
        { id: 2 },
        { id: 3 },
    ]
    const successMsg = ()=>{
        navigation.navigate('/share-success')
    }
    const getData = () => {
        setLoader(true)
        axios.get(`${Constants.BASE_URL}influencer/GetShareAndEarn/${props?.route?.params?.userDetails?.id}`, {
            user_id: props?.route?.params?.userDetails?.id
        })
            .then((response) => {
                
                setLoader(false)
                if (response.data) {
                    setdata(response.data)
                }
            })
            .catch((error) => {
                setLoader(false)
                showToastmsg("Something went wrong")
                console.log("error=>", error);
            })
    }
    useEffect(() => {
        getData()
    }, [])
    return (
        <View>
            <CustomAppBar navigation={navigation} isMainscreen={false} isReel={false} title='Share & Earn' />
            <ScrollView style={styles.container}>
                {console.log('zsd',data?.data?.Earn?.toFixed(2))}
                <Text style={{ fontFamily: Constants.fontFamily, }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut .</Text>
                <View style={styles.earningDetails}>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ fontFamily: Constants.fontFamily, fontSize: 22, }}>Earnings</Text>
                        <Text style={{ fontFamily: Constants.fontFamily, fontSize: 24, fontWeight: '700', marginTop: 10, marginBottom: 10, }}><FontAwesome name='rupee' size={22} />{data?.data?.Earn?.toFixed(2) ? data?.data?.Earn?.toFixed(2):'0.00'}</Text>
                        <Text style={{ fontFamily: Constants.fontFamily, fontSize: 16, fontWeight: '700', color: Constants.colors.primaryColor }}><AntDesign name='arrowup' size={18} /> 5.86 %</Text>
                    </View>
                    <View style={styles.divider}></View>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ fontFamily: Constants.fontFamily, fontSize: 22, }}>Views</Text>
                        <Text style={{ fontFamily: Constants.fontFamily, fontSize: 24, fontWeight: '700', marginTop: 10, marginBottom: 10, }}> {data?.data?.Views}.00</Text>
                        <Text style={{ fontFamily: Constants.fontFamily, fontSize: 16, fontWeight: '700', color: Constants.colors.primaryColor }}><AntDesign name='arrowup' size={18} /> 5.86 %</Text>
                    </View>
                </View>
                <Text style={{fontFamily:'Avenir', fontSize: 18, marginTop: 15, marginLeft:16, fontWeight:"500", lineHeight:25 , Color:'#000000' }}>Campaign List</Text>
                <View style={[styles.tabs, {justifyContent: 'flex-start'}]}>
                    <Pressable onPress={()=>setTabs('latest')}><Text style={[styles.tabTextProduct, {color: tabs==='latest'?Constants.colors.primaryColor:'#000000', textDecorationLine: tabs==='latest'?'underline':'none'}]}>Latest</Text></Pressable>
                    <Pressable onPress={()=>setTabs('shared')}><Text style={[styles.tabTextProduct, {color: tabs==='shared'?Constants.colors.primaryColor:'#000000', textDecorationLine: tabs==='shared'?'underline':'none'}]}>Shared</Text></Pressable>
                </View>
                <FlashList
                    data={tabs==='latest'?latest:shared}
                    renderItem={item =>tabs==='latest'?<RenderShareAndEarn item={item} successMsg={successMsg} />:<RenderShareAndEarnShared item={item} />}
                    keyExtractor={item => item?.id?.toString()}
                    estimatedItemSize={200} />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 110,
        padding: Constants.padding,
    },
    earningDetails: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: Constants.padding,
        backgroundColor: Constants.colors.whiteColor,
        borderRadius: Constants.borderRadius,
    },
    divider: {
        width: 1,
        height: '100%',
        backgroundColor: '#00A92866',
    },
    tabs: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: Constants.margin,
    },
    tabTextProduct: {
        fontFamily: Constants.fontFamily,
        paddingStart: Constants.padding,
        colors: 'rgba(0, 169, 40, 0.15)',
        marginRight: 0,
        fontWeight: '700',
        fontSize: 16,
    },
})

export default ShareAndEarn