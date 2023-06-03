import React from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
} from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Constants from '../../../shared/Constants'
import FastImage from 'react-native-fast-image'

const RenderRecentOrders = ({order})=>{
    // console.log("oders=>",`${Constants.BASE_IMAGE_URL}${JSON.parse(order.item.products?.product_image)[0]}`);
    return (
        <View style={styles.wrapper}>
            
            <FastImage source={{
                uri:`${Constants.BASE_IMAGE_URL}${JSON.parse(order.item.products?.product_image)[0]}`
            }} 
            style={{height:"100%",borderRadius:5,flex:2}}
            />
            <View
            style={{flex:1}}
            />
            <Text style={styles.productName}>{order?.item?.products?.product_name}</Text>
            <Text style={styles.quantity}>{order.item.qty}</Text>
            <View style={styles.growing}>
                <Text style={styles.buyers}>{order.item.products?.buyers}</Text>
                <AntDesign name='arrowup' color={Constants.colors.primaryColor}/>
                <Text style={styles.growinText}>5.6%</Text>
            </View>
        </View>
    )
}
const styles= StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'center',
        marginBottom: 20,
        height:50
    },
    productName: {
        flex:4,
        fontFamily:'Avenir',
        fontSize:13,
        fontWeight: '700',
        opacity:0.9,
    },
    quantity: {flex:3,
        fontFamily:'Avenir',
        fontSize:13,
        fontWeight: '700',
        opacity:0.9,
    },
    buyers: {
        // flex:3,
        marginEnd: 4,
        fontFamily:'Avenir',
        fontSize:13,
        fontWeight: '700',
        opacity:0.9,
    },
    growing: {
        flex:3,
        flexDirection: 'row',
        alignItems: 'center',
    },
    growinText: {
        fontFamily: Constants.fontFamily,
        color: Constants.colors.primaryColor,
    },
})

export default RenderRecentOrders