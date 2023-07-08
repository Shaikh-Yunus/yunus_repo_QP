import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    ScrollView,
    Pressable,
} from 'react-native'
import CustomAppBar from '../../../components/explore/CustomAppBar'
import Constants from '../../../shared/Constants'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import globatStyles from '../../../shared/globatStyles'
import Clipboard from '@react-native-clipboard/clipboard'
import { useNavigation } from '@react-navigation/native'

const Coupons = (props) => {
    const navigation = useNavigation()
    const copyCode = (text, discount) => {
        navigation.navigate('/payment-details', {
            price: props?.route?.params?.price - discount,
            selectedAddress: props?.route?.params?.selectedAddress,
            discount: props?.route?.params?.discount,
            totalPrice: props?.route?.params?.totalPrice
            , couponCodeValue: discount, couponCode: text,
            cartItems: props?.route?.params?.cartItems,
            address_id: props?.route?.params?.address_id,
            userDetails: props?.route?.params?.userDetails
        })
    }
    return (
        <View style={styles.container}>
            <StatusBar translucent={true} backgroundColor='transparent' />
            <CustomAppBar navigation={navigation} isMainscreen={false} isReel={false} title='Coupon Code' headerRight={false} />
            <ScrollView style={styles.wrapper}>
                <Text style={styles.description}>
                    Redeem your coupon code, click Apply Now and avail exciting offers and discounts on your purchase!
                </Text>
                <View style={styles.couponConatiner}>
                    <View style={{ flexDirection: 'row', }}>
                        <Text style={styles.rupees}><FontAwesome name='rupee' size={25} /> 1000 off</Text>
                        <Text style={styles.divider}>|</Text>
                        <Text style={styles.code}>DIWALI</Text>
                    </View>
                    <Pressable onPress={() => props?.route?.params?.price >= 1200 && copyCode('1000 off', 1000)}><Text style={[styles.copy, { color: props?.route?.params?.price < 1200 ? '#e5e5e5' : Constants.colors.primaryColor }]}>Apply Code</Text></Pressable>
                </View>
                {props?.route?.params?.price < 1200 ?
                    <Text style={[styles.rupees, { fontSize: 15 }]}>Add items worth <FontAwesome name='rupee' size={12} /> {1200 - props?.route?.params?.price} more to unlock  </Text>
                    : null
                }
                <View style={[globatStyles.divider, { marginTop: 5, marginBottom: 5, }]}></View>
                <View style={styles.couponConatiner}>
                    <View style={{ flexDirection: 'row', }}>
                        <Text style={styles.rupees}><FontAwesome name='rupee' size={25} /> 600 off</Text>
                        <Text style={styles.divider}>|</Text>
                        <Text style={styles.code}>FESTIVENEW</Text>
                    </View>
                    <Pressable onPress={() => props?.route?.params?.price >= 700 && copyCode('600 off', 600)}><Text style={[styles.copy, { color: props?.route?.params?.price < 700 ? '#e5e5e5' : Constants.colors.primaryColor }]}>Apply Code</Text></Pressable>
                </View>
                {props?.route?.params?.price < 700 ?
                    <Text style={[styles.rupees, { fontSize: 15 }]}>Add items worth <FontAwesome name='rupee' size={12} /> {700 - props?.route?.params?.price} more to unlock  </Text>
                    : null
                }
                <View style={[globatStyles.divider, { marginTop: 5, marginBottom: 5, }]}></View>
                <View style={styles.couponConatiner}>
                    <View style={{ flexDirection: 'row', }}>
                        <Text style={styles.rupees}><FontAwesome name='rupee' size={25} /> 200 off</Text>
                        <Text style={styles.divider}>|</Text>
                        <Text style={styles.code}>NEWCOMER</Text>
                    </View>
                    <Pressable onPress={() => props?.route?.params?.price >= 200 && copyCode('200 off', 200)}><Text style={[styles.copy, { color: props?.route?.params?.price < 400 ? '#e5e5e5' : Constants.colors.primaryColor }]}>Apply Code</Text></Pressable>
                </View>
                {props?.route?.params?.price < 200 ?
                    <Text style={[styles.rupees, { fontSize: 15 }]}>Add items worth <FontAwesome name='rupee' size={12} /> {400 - props?.route?.params?.price} more to unlock  </Text>
                    : null
                }
                <View style={[globatStyles.divider, { marginTop: 5, marginBottom: 5, }]}></View>
            </ScrollView>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    description: {
        fontFamily: Constants.fontFamily,
        marginBottom: Constants.margin,
    },
    wrapper: {
        padding: Constants.padding,
    },
    heading: {
        fontFamily: Constants.fontFamily,
        fontSize: 22,
        marginTop: 12,
        marginBottom: 12,
    },
    addressDetails: {
        fontFamily: Constants.fontFamily,
    },
    couponConatiner: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
        marginTop: 20,
    },
    rupees: {
        fontFamily: Constants.fontFamily,
        fontSize: 24,
    },
    code: {
        fontFamily: Constants.fontFamily,
        fontSize: 22,
    },
    divider: {
        fontSize: 24,
        marginLeft: 10,
        marginRight: 10,
        color: '#A4A4A4'
    },
    copy: {
        fontFamily: Constants.fontFamily,
        fontStyle: 'italic',
        textDecorationStyle: 'solid',
        textDecorationLine: 'underline',
        color: Constants.colors.primaryColor,
    },
})

export default Coupons