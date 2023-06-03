import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    FlatList,
    ScrollView,
    Pressable,
    ActivityIndicator,
    RefreshControl
} from 'react-native'
import CustomAppBar from '../../../components/explore/CustomAppBar'
import Constants from '../../../shared/Constants'
import RenderCart from './RenderCart'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import globatStyles from '../../../shared/globatStyles'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import { FlashList } from '@shopify/flash-list'
const Cart = (props) => {
    const navigation = useNavigation()
    const [price, setprice] = useState()
    const [totalPrice, setTotalPrice] = useState()
    const [loader, setLoader] = useState(false)
    const [discount, setdiscount] = useState()
    const [cartItems, setCartItems] = useState([])
    const [refresh, setrefresh] = useState(false)
    const gotoSelectAddress = () => {
        navigation.navigate('/goto-select-address', { price: price, cartItems: cartItems, userDetails: props?.route?.params?.userDetails, discount: discount, totalPrice: totalPrice })
    }
    const getCartData = (withoutLoader) => {
        if (!withoutLoader)
            setLoader(true)
        setprice(0)
        setdiscount(0)
        setTotalPrice(0)
        console.log("cart id==>", props?.route?.params?.userDetails?.id);
        axios.post(`${Constants.BASE_URL}auth/get-cart-item`, {
            user_id: props?.route?.params?.userDetails?.id
        }).then((response) => {
            setLoader(false)
            if (response.data.data.cart_item) {
                let tempcartItems = []
                let tempprice = 0
                let tempdiscount = 0
                let temptotalPrice = 0
                if (response.data.data.cart_item.length > 0)
                    response.data.data.cart_item.map((item, index) => {
                        tempcartItems.push({ id: index, data: item })
                        tempprice = tempprice + parseFloat(item.total_amount)
                        tempdiscount = tempdiscount + parseFloat(item.dis_amount)
                        temptotalPrice = temptotalPrice + parseFloat(item?.total_amount)
                        // setprice(parseFloat(price)+
                        //     parseFloat(parseFloat(item?.sales_price) - (parseFloat(item?.sales_price) * (parseFloat(item?.dicount)/100)))
                        // )

                    })
                setCartItems(tempcartItems)
                setprice(tempprice)
                setdiscount(tempdiscount)
                setTotalPrice(temptotalPrice)
            }
        })
            .catch((error) => {
                setLoader(false)
                console.log("error", error);
            })
    }
    useEffect(() => {
        getCartData()
    }, [])
    return (
        <View style={styles.container}>

            <StatusBar translucent={true} backgroundColor='transparent' />
            <CustomAppBar navigation={navigation} isMainscreen={false} isReel={false} title='Cart' headerRight={false} />
            <ScrollView style={styles.wrapper} refreshControl={<RefreshControl
                refreshing={refresh}
                onRefresh={() => getCartData()}
            />}>
                <Text style={styles.description}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut .
                </Text>
                {loader ?
                    <ActivityIndicator />
                    :
                    cartItems.length > 0 ?
                        <FlatList
                            data={cartItems}
                            style={{ marginBottom: 10, }}
                            showsVerticalScrollIndicator={false}
                            renderItem={item => <RenderCart item={item} getCartData={getCartData} price={price} setprice={setprice} />}
                            keyExtractor={item => item?.id?.toString()}
                            />
                        :
                        <View>
                            <Text style={[styles.description, { fontSize: 20, textAlign: 'center', marginTop: 20 }]}>
                                Cart is empty
                            </Text>
                        </View>
                }
            </ScrollView>
            {!loader && cartItems.length <= 0 ? null : <Pressable onPress={gotoSelectAddress} style={[globatStyles.button, { marginTop: 10, marginBottom: 10, marginLeft: 5, width: Constants.width - 10 }]}>
                {loader ?
                    <ActivityIndicator color={'white'} />
                    :
                    <Text style={globatStyles.btnText}>Proceed ( <FontAwesome name='rupee' /> {price.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} )</Text>}
            </Pressable>}

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    description: {
        fontFamily: Constants.fontFamily,
    },
    wrapper: {
        padding: Constants.padding,
    },
})

export default Cart