import { useNavigation } from '@react-navigation/native'
import { FlashList } from '@shopify/flash-list'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    Pressable,
    ScrollView,
    FlatList,
    ActivityIndicator,
    RefreshControl,
} from 'react-native'
import Images from '../../../assets/images/Images'
import CustomAppBar from '../../../components/explore/CustomAppBar'
import Constants from '../../../shared/Constants'
import globatStyles from '../../../shared/globatStyles'
import showToastmsg from '../../../shared/showToastmsg'
import RenderOrders from './RenderOrders'

const MyOrders = (props) => {
    const navigation = useNavigation()
    const [tabs, setTabs] = useState('products')
    const [loader, setLoader] = useState(false) 
    const [orderData, setOrderData] = useState([])
    const [refresh, setRefresh] = useState(false) 
    let img = `${Constants.BASE_IMAGE_URL}image/153/6749701.png`
    const products = [
        { id: 1, name: 'Iphone Watch', actualPrice: 2400, price: 2400, discount: 1000, qty: 2, size: 'XL', img: img },
        { id: 2, name: 'Statue of Boris', actualPrice: 1500, price: 1200, discount: 300, qty: 1, size: 'M' },
    ]
    // const services = [
    //     {id: 1, name: 'Statue of Liberty'},
    //     {id: 1, name: 'Statue of Liberty'},
    //     {id: 1, name: 'Statue of Liberty'},
    //     {id: 1, name: 'Statue of Liberty'},
    //     {id: 1, name: 'Statue of Liberty'},
    //     {id: 1, name: 'Statue of Liberty'},
    // ]
    const getOrderData = () => {
        setLoader(true)
        axios.post(`${Constants.BASE_URL}auth/user-oder-history`, {
            user_id: props?.route?.params?.userDetails?.id
        })
            .then((response) => {
                setLoader(false)
                if (response.data) {
                    setOrderData(response.data)
                }
            })
            .catch((error) => {
                setLoader(false)
                showToastmsg("Something went wrong")
                console.log("error=>", error);
            })
    }
    useEffect(() => {
        getOrderData()
    }, [])

    useEffect(() => {
        if (orderData.length > 0) {
            orderData.map(item =>
                console.log("order data=>", item)
            )
        }
    }, [orderData])
    return (
        <View style={globatStyles.container}>
            <StatusBar translucent={true} backgroundColor='transparent' />
            <CustomAppBar navigation={navigation} isMainscreen={false} isReel={false} title='My Orders' headerRight={false} />
            <ScrollView style={styles.wrapper} refreshControl={<RefreshControl
                refreshing={refresh}
                onRefresh={() => getOrderData()}
            />} >
                <Text style={{ marginBottom: 10 }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut .</Text>
                {/* <View style={styles.tabContainer}>
                    <Pressable onPress={()=>setTabs('products')}><Text style={[styles.tabs, tabs==='products'?styles.activeTabs:null]}>Products</Text></Pressable>
                    <Pressable onPress={()=>setTabs('services')}><Text style={[styles.tabs, tabs==='services'?styles.activeTabs:null]}>Services</Text></Pressable>
                </View> */}
                {loader ?
                    <ActivityIndicator size={'large'} />
                    :
                    orderData.length > 0 ?
                        <FlatList
                            data={orderData}
                            renderItem={item => <RenderOrders item={item} />}
                            style={{ paddingBottom: 130, }}
                            keyExtractor={item => item?.id?.toString()}
                            />
                        :
                        <View style={{ width: '100%', paddingTop: 20, paddingBottom: 10 }}>
                            <Text style={[styles.headingText, { fontSize: 20, textAlign: 'center' }]}>
                                No orders found
                            </Text>
                        </View>
                }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    wrapper: {
        padding: Constants.padding,
    },
    tabContainer: {
        flexDirection: 'row',
        marginTop: Constants.margin,
        marginBottom: Constants.marginBottom,
    },
    tabs: {
        fontFamily: Constants.fontFamily,
        fontWeight: '700',
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
        marginRight: Constants.margin,
        fontSize: 16,
    },
    activeTabs: {
        color: Constants.colors.primaryColor,
        borderBottomColor: Constants.colors.primaryColor,
    },
})

export default MyOrders 