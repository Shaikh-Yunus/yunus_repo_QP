import React from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
    Pressable,
    ScrollView,
} from 'react-native'
import Images from '../../../assets/images/Images'
import Constants from '../../../shared/Constants'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AntDesign from 'react-native-vector-icons/AntDesign'

const SalesReturnDetails =(props)=>{
    const goBack = ()=>{
        props.navigation.goBack()
    }
    return (
        <View style={StyleSheet.wrapper}>
            <View style={styles.titleBar}>
                <Pressable onPress={goBack}><AntDesign name='left' size={24} style={props.isReel?styles.reelBackBtn:styles.backBtn} /></Pressable>
                <Text style={styles.titleAppBar}>Return </Text>
                <Text style={styles.amount}>(<FontAwesome name='rupee' size={22} />12,000)</Text>
                <View style={styles.space}></View>
                <AntDesign name='arrowup' size={20} color={Constants.colors.primaryColor} />
                <Text style={styles.orderNumber}>5.43%</Text>
            </View>
            <ScrollView style={{marginBottom: 70,}}>
                <View style={styles.container}>
                    <Image source={Images.recentOrdersOne} />
                    <View>
                        <Text style={styles.title}>Statue of Boris</Text>
                        <View style={styles.inline}>
                            <Text style={{fontFamily: Constants.fontFamily,color: '#424242', marginTop: 1,}}>Returns</Text>
                            <Text style={{fontFamily: Constants.fontFamily, fontSize: 18, fontWeight: '700',marginLeft: 12,}}>23</Text>
                            <Text style={{marginStart: 10, marginEnd: 10,}}>|</Text>
                            <Text style={styles.price}><FontAwesome size={18} name='rupee' />1200</Text>
                        </View>
                    </View>
                    <Text style={{fontFamily: Constants.fontFamily,color: '#424242', marginTop: 1,}}>Rated 3.5 <AntDesign name='star' color='#E7CC3E' /></Text>
                </View>
                <Text style={styles.heading}>Customers</Text>
                <View style={styles.returnContainer}>
                    <View style={styles.profileDetails}>
                        <Image source={Images.avatar} />
                        <View style={{marginLeft: 15,}}>
                            <Text style={styles.customername}>Robert Phan</Text>
                            <Text style={styles.position}>Designer</Text>
                        </View>
                    </View>
                    <View style={styles.divider}></View>
                    <View style={styles.container}>
                        <Image source={Images.recentOrdersOne} />
                        <View>
                            <Text style={styles.title}>Statue of Boris</Text>
                            <View style={styles.inline}>
                                <Text style={{fontFamily: Constants.fontFamily,color: '#424242', marginTop: 1,}}>Returns</Text>
                                <Text style={{fontFamily: Constants.fontFamily, fontSize: 18, fontWeight: '700',marginLeft: 12,}}>23</Text>
                                <Text style={{marginStart: 10, marginEnd: 10,}}>|</Text>
                                <Text style={styles.price}><FontAwesome size={18} name='rupee' />1200</Text>
                            </View>
                        </View>
                        <Text style={{fontFamily: Constants.fontFamily,color: '#424242', marginTop: 1,}}>Rated 3.5 <AntDesign name='star' color='#E7CC3E' /></Text>
                    </View>
                    <View style={{flexDirection: 'row',}}>
                        <Text style={{fontSize: 13, fontFamily: Constants.fontFamily, color: '#424242', marginRight: 10,}}>Return reason</Text>
                        <Text style={{fontFamily: Constants.fontFamily,}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod </Text>
                    </View>
                    <View style={styles.greenContainer}>
                        <Image source={Images.deliveryIcon} />
                        <Text style={styles.deliveryText}>Pickup Initiated</Text>
                    </View>
                </View>
                <View style={styles.returnContainer}>
                    <View style={styles.profileDetails}>
                        <Image source={Images.avatar} />
                        <View style={{marginLeft: 15,}}>
                            <Text style={styles.customername}>Robert Phan</Text>
                            <Text style={styles.position}>Designer</Text>
                        </View>
                    </View>
                    <View style={styles.divider}></View>
                    <View style={styles.container}>
                        <Image source={Images.recentOrdersOne} />
                        <View>
                            <Text style={styles.title}>Statue of Boris</Text>
                            <View style={styles.inline}>
                                <Text style={{fontFamily: Constants.fontFamily,color: '#424242', marginTop: 1,}}>Returns</Text>
                                <Text style={{fontFamily: Constants.fontFamily, fontSize: 18, fontWeight: '700',marginLeft: 12,}}>23</Text>
                                <Text style={{marginStart: 10, marginEnd: 10,}}>|</Text>
                                <Text style={styles.price}><FontAwesome size={18} name='rupee' />1200</Text>
                            </View>
                        </View>
                        <Text style={{fontFamily: Constants.fontFamily,color: '#424242', marginTop: 1,}}>Rated 3.5 <AntDesign name='star' color='#E7CC3E' /></Text>
                    </View>
                    <View style={{flexDirection: 'row',}}>
                        <Text style={{fontSize: 13, fontFamily: Constants.fontFamily, color: '#424242', marginRight: 10,}}>Return reason</Text>
                        <Text style={{fontFamily: Constants.fontFamily,}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod </Text>
                    </View>
                    <View style={styles.greenContainer}>
                        <Image source={Images.refundIcon} />
                        <Text style={styles.deliveryText}>Refunded</Text>
                    </View>
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
    titleBar: {
        marginTop: 16,
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: 99,
        paddingBottom: 14,
        paddingStart: 15,
    },
    titleAppBar: {
        fontFamily: Constants.fontFamily,
        fontSize: 26,
        fontWeight: '800',
        marginStart: 20,
    },
    normalText: {
        fontFamily: Constants.fontFamily,
    },
    space: {
        width: 10,
    },
    orderNumber: {
        fontFamily: Constants.fontFamily,
        fontSize: 20,
        color: Constants.colors.primaryColor,
        fontWeight: '700',
    },
    amount: {
        fontFamily: Constants.fontFamily,
        fontSize: 24,
        fontWeight: '700'
    },
    container: {
        padding: Constants.padding,
        marginTop: Constants.margin,
        borderRadius: Constants.borderRadius,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        fontFamily: Constants.fontFamily,
        fontSize: 16,
        fontWeight: '700',
    },
    inline: {
        flexDirection: 'row',
    },
    price: {
        fontSize: 18,
        fontWeight: '700',
    },
    heading: {
        margin: Constants.margin,
        marginBottom: 0,
        fontFamily: Constants.fontFamily,
        fontSize: 20,
    },
    returnContainer: {
        padding: 8,
        margin: Constants.margin,
        marginTop: 6,
        borderRadius: 12,
        backgroundColor: Constants.colors.whiteColor,
    },
    profileDetails: {
        flexDirection: 'row',
    },
    customername: {
        fontFamily: Constants.fontFamily,
        fontSize: 20,
        fontWeight: '800',
    },
    position: {
        fontFamily: Constants.fontFamily,
        fontWeight: '500',
        color: '#A4A4B2',
        fontSize: 18,
    },
    divider: {
        height: 1,
        width: '100%',
        backgroundColor: '#ABABAB',
        marginTop: Constants.margin,
        marginBottom: Constants.marginBottom,
    },
    greenContainer: {
        flexDirection: 'row',
        backgroundColor: 'rgba(0, 169, 40, 0.1)',
        padding: 10,
        width: '50%',
        marginTop: 12,
        marginBottom: 12,
        borderRadius: Constants.borderRadius,
    },
    deliveryText: {
        fontFamily: Constants.fontFamily,
        color: Constants.colors.primaryColor,
        fontWeight: '700',
        marginLeft: 20,
    },
})

export default SalesReturnDetails