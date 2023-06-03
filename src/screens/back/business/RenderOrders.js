import React from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Images from '../../../assets/images/Images'
import Constants from '../../../shared/Constants'
import AntDesign from 'react-native-vector-icons/AntDesign'

const RenderOrders = ({pillars})=>{
    return (
        <View style={styles.container}>
            <Image source={{uri:`${Constants.BASE_IMAGE_URL+JSON.parse(pillars?.item?.product_details[0]?.product_image)[0]}`}}
            style={{flex:1,borderRadius:5}}
            />
            <View style={[styles.orderDescription,{flex:3}]}>
            <View style={[styles.inline,{justifyContent:"flex-end"}]}>
            <Text style={[styles.textBold,{textTransform:'capitalize',fontSize:12,color:pillars?.item?.orders_status=="cancelled"||pillars?.item?.orders_status=="return"?"red":
            pillars?.item?.orders_status=="sucess"?"green":
            pillars?.item?.orders_status=="pending"?"#E7CC3E":
            "black"}]}>{pillars?.item?.orders_status}</Text>
                </View>
                <View style={styles.inline}>
                    <Text style={[styles.textBold,{flex:2}]}>{pillars?.item?.product_details[0]?.product_name?pillars?.item?.product_details[0]?.product_name:"-"}</Text>
                    <Text style={[styles.oldPriceContainer,{flex:1,textDecorationLine:"line-through"}]}>
                        <FontAwesome name='rupee' style={styles.rupeeIcon} />
                        <Text style={styles.beforeOfferPrice}>{
                            parseFloat(pillars?.item?.total_amount)+
                            parseFloat(pillars?.item?.dis_amount)
}</Text>
                        <View style={styles.strikeThrough}></View>
                    </Text>
                   <Text style={{flex:1}}> 
                   <FontAwesome name='rupee' style={[styles.rupeeIcon, {color: '#000000'}]} />
                    <Text style={[styles.beforeOfferPrice, {color: '#000000'}]}>{
                            parseFloat(pillars?.item?.total_amount)}</Text>
                    </Text>
                    <Text style={{flex:1}}>
                    <FontAwesome name='rupee' style={[styles.rupeeIcon, {color: Constants.colors.primaryColor, fontSize: 12, marginLeft: 6,}]} />
                    <Text style={[styles.beforeOfferPrice, {color: Constants.colors.primaryColor, fontSize: 12}]}>{
                            parseFloat(pillars?.item?.dis_amount)
} off</Text>
                    </Text>
                </View>
                <View style={styles.inline}>
                    <View style={{flex:2,display:"flex",flexDirection:"row",justifyContent:"space-evenly"}}>
                    <Text style={styles.font}>Qty</Text>
                    <Text style={[styles.textBold, ]}>{pillars?.item?.qty}</Text>
                    </View>
                    <View style={{flex:3,flexDirection:"row",justifyContent:"space-evenly"}}>
                    <Text style={[styles.font,]}>Color</Text>
                    <Text style={[styles.textBold,{textTransform:'capitalize',color:pillars?.item?.color}]}>{pillars?.item?.color}</Text>
                    </View>
                    {/* <View style={{flex:3,flexDirection:"row",justifyContent:"space-evenly"}}>
                    <Text style={[styles.font,]}>Buyers</Text>
                    <Text style={[styles.textBold,{textTransform:'capitalize',color:pillars?.item?.color}]}>{pillars?.item?.color}</Text>
                    </View> */}
                    <View style={{flex:2,flexDirection:"row",justifyContent:"flex-end"}}>
                    <AntDesign name='arrowup' size={18} color={Constants.colors.primaryColor} />
                    <Text style={{color: Constants.colors.primaryColor, fontSize: 12}}>5.65%</Text>
                    </View>
                </View>
                <View style={styles.inline}>
                    <Text style={styles.font}>Rated</Text>
                    <Text style={[styles.textBold, {marginLeft: 12,}]}>3.5</Text>
                    <AntDesign name='star' size={18} color='#E7CC3E' style={{marginLeft: 16,}} />
                </View>
            </View>
        </View>
    )
}

const styles= StyleSheet.create({
    container: {
        padding: Constants.padding,
        backgroundColor: Constants.colors.whiteColor,
        marginTop: 20,
        flex:1,
        borderRadius: Constants.borderRadius,
        flexDirection: 'row',
    },
    orderDescription: {
        marginStart: 14,
    },
    inline: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
    },
    font: {
        fontFamily: Constants.fontFamily,
    },
    textBold: {
        fontFamily: Constants.fontFamily,
        fontSize: 15,
        fontWeight: '700',
    },
    rupeeIcon: {
        color: '#D9D9D9',
        fontSize: 14,
        marginTop: 3,
        marginLeft: 10,
    },
    beforeOfferPrice: {
        color: '#D9D9D9',
        fontSize: 14,
    },
    oldPriceContainer: {
        flexDirection: 'row',
    },
    strikeThrough: {
        position: 'absolute',
        left: 8,
        top: 10,
        height: 2,
        width: '90%',
        backgroundColor: '#D9D9D9',
    },
})

export default RenderOrders