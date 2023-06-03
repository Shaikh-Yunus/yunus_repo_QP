import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image
} from 'react-native'
import Images from '../../../assets/images/Images'
import Constants from '../../../shared/Constants'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import FastImage from 'react-native-fast-image'

const RenderOrders = ({item})=>{
    return (
        <View style={styles.container}>
            <FastImage source={JSON.parse(item.item.product_details.product_image)[0]?{uri:`${Constants.BASE_IMAGE_URL}${JSON.parse(item.item.product_details.product_image)[0]}`}:Images.orderImg} style={{flex: 1,
        resizeMode: 'cover'}}/>
            <View style={styles.productDetails}>
                <View style={styles.productFirstRow}>
                    <Text style={styles.producname}>{(item.item.product_details.product_name).length>15?(item.item.product_details.product_name).slice(0,15)+'...':(item.item.product_details.product_name)}</Text>
                    <Text style={{...styles.tabText, 
                        color:item?.item?.orders_status=="cancelled"?"red": 'black', 
                        fontWeight: '800', 
                        textDecorationColor: item?.item?.orders_status=="cancelled"?"red":'black',
                        textTransform:'capitalize'
                        }}>{item?.item?.orders_status}</Text>
                    </View>
                    <View style={[styles.productFirstRow,{justifyContent:'space-between',marginTop:10}]}>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={[styles.priceicon,{marginLeft:5}]}><FontAwesome name='rupee' /></Text>
                        <Text style={styles.oldPrice}>{(parseFloat(item.item.total_amount)+parseFloat(item.item.dis_amount))/parseInt(item.item.qty)}</Text>
                        <View style={styles.strikethrough}></View>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.priceicon}><FontAwesome name='rupee' /></Text>
                        <Text style={styles.price}>{parseFloat(item.item.total_amount)/parseInt(item.item.qty)}</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={[styles.priceicon, {color: Constants.colors.primaryColor}]}><FontAwesome name='rupee' /></Text>
                        <Text style={[styles.price, {color: Constants.colors.primaryColor}]}>{parseFloat(item.item.dis_amount)/parseInt(item.item.qty)} Off</Text>
                    </View>
                    </View>
                <View style={[styles.productSecondRow,{justifyContent:"space-between",marginTop:5}]}>
                    <View style={{flexDirection: 'row', alignItems: 'center',}}>
                        <Text style={{fontFamily: Constants.fontFamily, fontSize: 11,}}>Qty : </Text><Text>{item.item.qty}.</Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center',}}>
                        <Text style={{fontFamily: Constants.fontFamily, fontSize: 11}}>Size : </Text><Text style={{textTransform:"capitalize"}}>{item.item.size}.</Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center',}}>
                        <Text style={{fontFamily: Constants.fontFamily, fontSize: 11}}>Color : </Text><Text style={{textTransform:"capitalize",color:item.item.color?item.item.color:'black'}}>{item.item.color}.</Text>
                    </View>
                </View>
                <View style={[styles.productSecondRow,{justifyContent:"space-between"}]}>
                <View style={{flexDirection: 'row',marginTop:5,marginBottom:5}}>
                <Text style={[styles.price]}>Total Amount : </Text>
                        <Text style={[styles.priceicon]}><FontAwesome name='rupee' /></Text>
                        <Text style={[styles.price]}>{item.item.total_amount}</Text>
                    </View>
                </View>
                <View style={styles.productSecondRow}>
                    <View style={{flexDirection: 'row', marginRight: 12, alignItems: 'center',}}>
                        <Text style={{fontFamily: Constants.fontFamily, fontSize: 11,}}>Rate : </Text>
                        <FontAwesome name='star' style={styles.star} />
                        <FontAwesome name='star' style={styles.star} />
                        <FontAwesome name='star' style={styles.star} />
                        <FontAwesome name='star' style={styles.star} />
                        <FontAwesome name='star-o' style={styles.star} />
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 12,
        backgroundColor: Constants.colors.whiteColor,
        borderRadius: Constants.borderRadius,
        marginTop: 12,
        flexDirection: 'row',
    },
    productDetails: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginLeft: 12,
    },
    productFirstRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    producname: {
        fontFamily: Constants.fontFamily,
        fontSize: 14,
        fontWeight: '700',
    },
    priceicon: {
        marginLeft: 12,
        marginTop: 5,
        color: '#979797',
    },
    oldPrice: {
        color: '#979797',
    },
    strikethrough: {
        width: 40,
        height: 1,
        backgroundColor: '#979797',
        position: 'absolute',
        left: '25%',
        top: '48%',
    },
    productSecondRow: {
        flexDirection: 'row',
    },
    star: {
        fontSize: 15,
        color: '#999999',
        marginRight: 12,
    },
})

export default RenderOrders