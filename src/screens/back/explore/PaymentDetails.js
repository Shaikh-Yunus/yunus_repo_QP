import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    Image,
    ScrollView,
    Pressable,
    TextInput,
    ActivityIndicator,
} from 'react-native'
import CustomAppBar from '../../../components/explore/CustomAppBar'
import Constants from '../../../shared/Constants'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Fontisto from 'react-native-vector-icons/Fontisto'
import globatStyles from '../../../shared/globatStyles'
import Images from '../../../assets/images/Images'
import { useNavigation } from '@react-navigation/native'
import { Platform, Button, NativeModules, NativeEventEmitter } from 'react-native';
import EasebuzzCheckout from 'react-native-easebuzz-kit';
import axios from 'axios'
import showToastmsg from '../../../shared/showToastmsg'
import { EventRegister } from 'react-native-event-listeners'
import { emitConfig } from './RenderReeels'
const PaymentDetails = (props) => {
    const navigation = useNavigation()
    const [paymentOption, setPaymentOption] = useState('online')
    const [saveCardDetails, setSaveCardDetails] = useState(true)
    const [upi, setUpi] = useState('')
    const [isCod, setIsCod] = useState('')
    const [price, setprice] = useState()
    const [couponCode, setcouponCode] = useState()
    const [discount, setdiscount] = useState()
    const [totalPrice, setTotalPrice] = useState()
    const [couponCodeValue, setcouponCodeValue] = useState()
    const [selectedAddress, setselectedAddress] = useState('')
    const [cartItems, setCartItems] = useState([])
    const [loader, setLoader] = useState(false)
    const gotoCoupon = () => {

        navigation.navigate('/all-coupons', {
            cartItems: props?.route?.params?.cartItems,
            price: price, selectedAddress: props?.route?.params?.selectedAddress, discount: discount, totalPrice: totalPrice,
            userDetails: props?.route?.params?.userDetails,
            address_id: props?.route?.params?.address_id
        })

    }

    const callPaymentGateway = (accessKey) => {
        var options = {
            access_key: accessKey,
            pay_mode: "test"
        }
        EasebuzzCheckout.open(options).then((data) => {

            //handle the payment success & failed response here
            console.log("Payment Response:")
            if (data.result.includes("payment_successfull")) {
                console.log("object response", {
                    "user_id": props?.route?.params?.userDetails?.id,
                    "cart_ids": cartItems.map((item) => item.data.cart_id),
                    "dis_amount": discount,
                    "total_amount": totalPrice,
                    "address_id": props?.route?.params?.address_id,
                    "transaction_type": data.payment_response.card_type,
                    "result": data.result
                });
                axios.post(`${Constants.BASE_URL}auth/user-oder-genrate`, {
                    "user_id": props?.route?.params?.userDetails?.id,
                    "cart_ids": cartItems.map((item) => item.data.cart_id),
                    "dis_amount": discount,
                    "total_amount": totalPrice,
                    "address_id": props?.route?.params?.address_id,
                    "transaction_type": data.payment_response.card_type,
                    "result": data.result,
                    "influencer_id":props?.route?.params?.userDetails?.influencer?.influencer_id
                })
                    .then((response) => {
                        for (let i = 0; i < cartItems.length; i++) {
                            axios.post(`${Constants.BASE_URL}auth/remove-item-from-cart`, {
                                "cart_id": cartItems[i].data.cart_id
                            }).then((response) => {
                                setLoader(false)
                                navigation.navigate('/payment-success', { amount: totalPrice })
                            })
                                .catch((error) => {
                                    setLoader(false)
                                    console.log("error==>", error.response);
                                    showToastmsg('Payment failed, please try again')
                                })
                        }
                    })
                    .catch((error) => {
                        navigation.navigate('/payment-error', {
                            price: price,
                            couponCode: couponCode,
                            couponCodeValue: couponCodeValue,
                            selectedAddress: props?.route?.params?.selectedAddress,
                            discount: discount,
                            totalPrice: totalPrice,
                            cartItems: props?.route?.params?.cartItems,
                            userDetails: props?.route?.params?.userDetails,
                            error: true,
                            address_id: props?.route?.params?.address_id
                        })
                        setLoader(false)
                        console.log("cod error=>", error);
                    })

            }
            else {
                axios.post(`${Constants.BASE_URL}auth/user-oder-genrate`, {
                    "user_id": props?.route?.params?.userDetails?.id,
                    "cart_ids": cartItems.map((item) => item.data.cart_id),
                    "dis_amount": discount,
                    "total_amount": totalPrice,
                    "address_id": props?.route?.params?.address_id,
                    "transaction_type": data.payment_response.card_type,
                    "result": data.result,
                    "influencer_id":props?.route?.params?.userDetails?.influencer?.influencer_id
                }).then((response) => {
                    navigation.navigate('/payment-error', {
                        price: price,
                        couponCode: couponCode,
                        couponCodeValue: couponCodeValue,
                        selectedAddress: props?.route?.params?.selectedAddress,
                        discount: discount,
                        totalPrice: totalPrice,
                        cartItems: props?.route?.params?.cartItems,
                        userDetails: props?.route?.params?.userDetails,
                        error: true,
                        address_id: props?.route?.params?.address_id
                    })
                    setLoader(false)
                })
                console.log("payment response", data);

            }
            console.log(data);
        }).catch((error) => {
            //handle sdk failure issue here
            console.log("SDK Error:")
            setLoader(false)
            console.log(error);
        });
    }
    const gotoPaymentSuccess = () => {
        setLoader(true)
        console.log("response body==>", {
            "user_id": props?.route?.params?.userDetails?.id,
            "user_type": props?.route?.params?.userDetails?.role_id,
            "amount": parseFloat(price).toFixed(2),
            "address_id": props?.route?.params?.address_id
        });
        if (paymentOption === "online") {
            axios.post(`${Constants.BASE_URL}auth/easeBuzz-payment-access-token`, {
                "user_id": props?.route?.params?.userDetails?.id,
                "user_type": props?.route?.params?.userDetails?.role_id,
                // user_type:1,
                "amount": parseFloat(price).toFixed(2),
                "address_id": props?.route?.params?.address_id
            }).then((response) => {
                setLoader(false)
                if (response.data.error) {
                    setLoader(false)
                    showToastmsg(response.data.msg)
                }
                else {
                    // if(response.data.response==200){
                    if (JSON.parse(response.data.data.payment).access_key) {
                        callPaymentGateway(JSON.parse(response.data.data.payment).access_key)
                        console.log("response==>", JSON.parse(response.data.data.payment).access_key);
                    }
                }
                // }
                console.log("response==>", response.data);
                // if(response.data.response==200){
                //     if(JSON.parse(response.data.data.payment).access_key)
                //     callPaymentGateway(JSON.parse(response.data.data.payment).access_key)
                //     console.log("response==>",JSON.parse(response.data.data.payment).access_key);
                // }
            }).catch((error) => {
                showToastmsg('Something went wrong. Please try again')
                console.log("error message=>", error.message);
                setLoader(false)
            })
        }
        else {
            axios.post(`${Constants.BASE_URL}auth/user-oder-genrate`, {
                "user_id": props?.route?.params?.userDetails?.id,
                "cart_ids": cartItems.map((item) => item.data.cart_id),
                "dis_amount": discount,
                "total_amount": totalPrice,
                "address_id": props?.route?.params?.address_id,
                "transaction_type": "cod",
                "result": "pending"
            })
                .then((response) => {
                    for (let i = 0; i < cartItems.length; i++) {
                        axios.post(`${Constants.BASE_URL}auth/remove-item-from-cart`, {
                            "cart_id": cartItems[i].data.cart_id
                        }).then((response) => {
                            setLoader(false)
                            EventRegister.emitEvent(emitConfig.PRODUCT_REMOVED);
                            navigation.navigate('/payment-success', { amount: totalPrice })
                        })
                            .catch((error) => {
                                setLoader(false)
                                console.log("error==>", error.response);
                                showToastmsg('Payment failed, please try again')
                            })
                    }
                })
                .catch((error) => {
                    navigation.navigate('/payment-error', {
                        price: price,
                        couponCode: couponCode,
                        couponCodeValue: couponCodeValue,
                        selectedAddress: props?.route?.params?.selectedAddress,
                        discount: discount,
                        totalPrice: totalPrice,
                        cartItems: props?.route?.params?.cartItems,
                        userDetails: props?.route?.params?.userDetails,
                        error: true,
                        address_id: props?.route?.params?.address_id
                    })
                    setLoader(false)
                    console.log("cod error=>", error);
                })
        }
        // navigation.navigate('/payment-success')
    }

    useEffect(() => {
        setprice(props?.route?.params?.price ? props?.route?.params?.price : 0)
        setcouponCode(props?.route?.params?.couponCode ? props?.route?.params?.couponCode : '')
        setcouponCodeValue(props?.route?.params?.couponCodeValue ? props?.route?.params?.couponCodeValue : 0)
        setdiscount(props?.route?.params?.discount ? props?.route?.params?.discount : 0)
        setTotalPrice(props?.route?.params?.totalPrice ? props?.route?.params?.totalPrice : 0)
        setselectedAddress(props?.route?.params?.selectedAddress ? props?.route?.params?.selectedAddress : '')
        setCartItems(props?.route?.params?.cartItems)
        console.log("cart items", props?.route?.params?.cartItems);
    }, [props?.route?.params])
    return (
        <View style={styles.container}>
           
            <StatusBar translucent={true} backgroundColor='transparent' />
            <CustomAppBar navigation={navigation} isMainscreen={false} isReel={false} title='Payment' headerRight={false} />
            <ScrollView style={styles.wrapper}>
                <Text style={styles.description}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut .
                </Text>
                <View style={styles.addressContainer} >
                    <Text style={styles.addressHeading}>Selected Address</Text>
                    <Text style={styles.address}>
                        {selectedAddress}
                    </Text>
                </View>
                
                <View style={styles.priceDetails}>
                    <Text style={styles.addressHeading}>Price Details</Text>
                    <View style={[globatStyles.divider, { backgroundColor: Constants.colors.primaryColor }]}></View>
                    {cartItems.length > 0 ?
                        cartItems.map(item => (<View style={styles.row}>
                            <Text style={{ fontFamily: Constants.fontFamily, fontSize: 16, textTransform: 'capitalize' }}>
                                {item?.data?.product_details?.product_name}  <Text style={{ textTransform: 'lowercase' }}>x</Text>{item?.data?.qty}
                            </Text>
                            <Text style={{ fontFamily: Constants.fontFamily, fontSize: 16, }}><FontAwesome name='rupee' /> {item?.data?.total_amount}</Text>
                        </View>))
                        :
                        null
                    }
                    <View style={[globatStyles.divider, { backgroundColor: Constants.colors.primaryColor }]}></View>
                    <View style={styles.row}>
                        <Text style={{ fontFamily: Constants.fontFamily, fontSize: 16, }}>Total MRP</Text>
                        <Text style={{ fontFamily: Constants.fontFamily, fontSize: 16, }}><FontAwesome name='rupee' /> {totalPrice + discount}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={{ fontFamily: Constants.fontFamily, fontSize: 16, }}>Discount</Text>
                        <Text style={{ fontFamily: Constants.fontFamily, fontSize: 16, color: Constants.colors.primaryColor, }}>{discount > 0 ? '- ' : ''}<FontAwesome name='rupee' /> {discount}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={{ fontFamily: Constants.fontFamily, fontSize: 16, }}>Delivery Charges</Text>
                        <Text style={{ fontFamily: Constants.fontFamily, fontSize: 16, color: Constants.colors.primaryColor, }}><FontAwesome name='rupee' /> 0</Text>
                    </View>
                    {couponCode ? <View style={styles.row}>
                        <Text style={{ fontFamily: Constants.fontFamily, fontSize: 16, }}>Coupon Discount</Text>
                        <Text style={{ fontFamily: Constants.fontFamily, fontSize: 16, color: Constants.colors.primaryColor, }}> - <FontAwesome name='rupee' /> {couponCodeValue}</Text>
                    </View> : null}
                    <View style={[globatStyles.divider, { backgroundColor: Constants.colors.primaryColor }]}></View>
                    <View style={[styles.row, { marginTop: 0, }]}>
                        <Text style={{ fontFamily: Constants.fontFamily, fontSize: 16, }}>Total Amount to be Paid</Text>
                        <Text style={{ fontFamily: Constants.fontFamily, fontSize: 16, color: Constants.colors.primaryColor, }}><FontAwesome name='rupee' /> {price}</Text>
                    </View>
                </View>
                <Pressable style={[globatStyles.btnAddAddress, { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]} onPress={gotoCoupon}>
                    <Text style={globatStyles.btnTextAddress}>{!couponCode && <FontAwesome name='plus' />} {couponCode ? `${couponCode} Applied` : 'Coupon Code'}</Text>
                    {couponCode ? <Pressable onPress={() => { setcouponCode(), setcouponCodeValue(0), setprice(price + couponCodeValue) }}><Text style={globatStyles.btnTextAddress}>x</Text></Pressable> : null}
                </Pressable>
                <View style={styles.paymentOptions}>
                    <Text style={styles.addressHeading}>Payment Options</Text>
                    <Pressable style={styles.option} onPress={() => setPaymentOption('cod')}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                            <Image source={Images.creditCard} />
                            <Text style={{ marginLeft: 12, fontFamily: Constants.fontFamily }}>Cod</Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 6, }}>
                            {
                                paymentOption === "cod" ?
                                    <Ionicons name='checkbox-sharp' onPress={() => setPaymentOption('online')} size={16} color={Constants.colors.primaryColor} /> :
                                    <Fontisto name='checkbox-passive' style={{ marginLeft: -15 }} onPress={() => setPaymentOption('cod')} size={12} color={Constants.colors.primaryColor} />
                            }
                        </View>
                    </Pressable>
                    <Pressable style={styles.option} onPress={() => setPaymentOption('online')}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                            <Image source={Images.bankIcon} />
                            <Text style={{ marginLeft: 12, fontFamily: Constants.fontFamily }}>Online payment</Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 6, }}>
                            {
                                paymentOption === "online" ?
                                    <Ionicons name='checkbox-sharp' onPress={() => setPaymentOption('cod')} size={16} color={Constants.colors.primaryColor} /> :
                                    <Fontisto name='checkbox-passive' style={{ marginLeft: -15 }} onPress={() => setPaymentOption('online')} size={12} color={Constants.colors.primaryColor} />
                            }
                        </View>
                    </Pressable>
                </View>
                {/* <View style={styles.paymentOptions}>
                    <Text style={styles.addressHeading}>Payment Options</Text>
                    <Pressable style={styles.option} onPress={()=>setPaymentOption('card')}>
                        <View style={{flexDirection: 'row', alignItems: 'center',}}>
                            <Image source={Images.creditCard} />
                            <Text style={{marginLeft: 12, fontFamily: Constants.fontFamily}}>Credit/Debit Card</Text>
                        </View>
                        <AntDesign name='right' size={16} />
                    </Pressable>
                    {
                        paymentOption==='card'?(
                            <View style={{marginLeft: Constants.margin}}>
                                <TextInput placeholder='Card Number' style={styles.inputs} />
                                <FontAwesome name='id-card-o' style={styles.cardIcon} />
                                <TextInput placeholder='Name on Card' style={styles.inputs} />
                                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <TextInput placeholder='Valid Thru (MM/YY)' style={[styles.inputs, {flex: 0.48}]} />
                                    <TextInput placeholder='CVV' style={[styles.inputs, {flex: 0.48}]} />
                                </View>
                                <View style={{flexDirection: 'row',marginTop: 6,}}>
                                    {
                                        saveCardDetails?<Ionicons name='checkbox-sharp' onPress={()=>setSaveCardDetails(false)} size={16} color={Constants.colors.primaryColor} />:<Fontisto name='checkbox-passive' onPress={()=>setSaveCardDetails(true)} size={12} color={Constants.colors.primaryColor} />
                                    }
                                    <Text style={{fontFamily: Constants.fontFamily, fontSize: 11}}> Save this card for future payments</Text>
                                </View>
                            </View>
                        ):null
                    }
                    <Pressable style={styles.option} onPress={()=>setPaymentOption('upi')}>
                        <View style={{flexDirection: 'row', alignItems: 'center',}}>
                            <Image source={Images.upi} />
                            <Text style={{marginLeft: 12, fontFamily: Constants.fontFamily}}>PhonePe/Google Pay/BHIM UPI</Text>
                        </View>
                        <AntDesign name='right' size={16} />
                    </Pressable>
                    {
                        paymentOption==='upi'?(
                            <View style={{marginLeft: Constants.margin, marginTop: 10,}}>
                                <View style={styles.upidetails}>
                                    {
                                        upi==='phonepe'?<Fontisto name='radio-btn-active' size={16} onPress={()=>setUpi('phonepe')} />:<Fontisto name='radio-btn-passive' size={16} onPress={()=>setUpi('phonepe')} />
                                    }
                                    <Image source={Images.phonePe} style={styles.upiIcons} />
                                    <Text>PhonePe</Text>
                                </View>
                                <View style={styles.upidetails}>
                                    {
                                        upi==='googlepay'?<Fontisto name='radio-btn-active' size={16} onPress={()=>setUpi('googlepay')} />:<Fontisto name='radio-btn-passive' size={16} onPress={()=>setUpi('googlepay')} />
                                    }
                                    <Image source={Images.googlePay} style={styles.upiIcons} />
                                    <Text>GooglePay</Text>
                                </View>
                                <View style={styles.upidetails}>
                                    {
                                        upi==='upi'?<Fontisto name='radio-btn-active' size={16} onPress={()=>setUpi('upi')} />:<Fontisto name='radio-btn-passive' size={16} onPress={()=>setUpi('upi')} />
                                    }
                                    <Image source={Images.upi} style={styles.upiIcons} />
                                    <Text>Enter UPI ID</Text>
                                </View>
                                {
                                    upi==='upi'?<TextInput style={styles.inputs} placeholder='Enter UPI ID here' />:null
                                }
                            </View>
                        ):null
                    }
                    <Pressable style={styles.option} onPress={()=>setPaymentOption('wallet')}>
                        <View style={{flexDirection: 'row', alignItems: 'center',}}>
                            <Image source={Images.wallet} />
                            <Text style={{marginLeft: 12, fontFamily: Constants.fontFamily}}>Wallet</Text>
                        </View>
                        <AntDesign name='right' size={16} />
                    </Pressable>
                    {
                        paymentOption==='wallet'?(
                            <View style={{marginLeft: Constants.margin}}>
                                <TextInput placeholder='Wallet ID' style={styles.inputs} />
                                <TextInput placeholder='Wallet Number' style={styles.inputs} />
                            </View>
                        ):null
                    }
                    <Pressable style={styles.option} onPress={()=>setPaymentOption('net')}>
                        <View style={{flexDirection: 'row', alignItems: 'center',}}>
                            <Image source={Images.bankIcon} />
                            <Text style={{marginLeft: 12, fontFamily: Constants.fontFamily}}>Net Banking</Text>
                        </View>
                        <AntDesign name='right' size={16} />
                    </Pressable>
                    {
                        paymentOption==='net'?(
                            <View style={{marginLeft: Constants.margin}}>
                            <TextInput placeholder='Card Number' style={styles.inputs} />
                            <FontAwesome name='id-card-o' style={styles.cardIcon} />
                            <TextInput placeholder='Name on Card' style={styles.inputs} />
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <TextInput placeholder='Valid Thru (MM/YY)' style={[styles.inputs, {flex: 0.48}]} />
                                <TextInput placeholder='CVV' style={[styles.inputs, {flex: 0.48}]} />
                            </View>
                            <View style={{flexDirection: 'row',marginTop: 6,}}>
                                {
                                    saveCardDetails?<Ionicons name='checkbox-sharp' onPress={()=>setSaveCardDetails(false)} size={16} color={Constants.colors.primaryColor} />:<Fontisto name='checkbox-passive' onPress={()=>setSaveCardDetails(true)} size={12} color={Constants.colors.primaryColor} />
                                }
                                <Text style={{fontFamily: Constants.fontFamily, fontSize: 11}}> Save this card for future payments</Text>
                            </View>
                        </View>
                        ):null
                    }
                    <Pressable style={styles.option} onPress={()=>setPaymentOption('cod')}>
                        <View style={{flexDirection: 'row', alignItems: 'center',}}>
                            <Image source={Images.bankIcon} />
                            <Text style={{marginLeft: 12, fontFamily: Constants.fontFamily}}>Cash On Delivery</Text>
                        </View>
                        <AntDesign name='right' size={16} />
                    </Pressable>
                    {
                        paymentOption==='cod'?(
                            <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 16, marginTop: 12,}}>
                                {
                                    isCod==='cod'?<Fontisto name='radio-btn-active' size={16} onPress={()=>setIsCod('cod')} />:<Fontisto name='radio-btn-passive' size={16} onPress={()=>setIsCod('cod')} />
                                }
                                <Text style={{marginLeft: 12,}}>COD</Text>
                            </View>
                        ):null
                    }
                </View> */}
                <Pressable onPress={gotoPaymentSuccess} style={[globatStyles.button, { marginTop: 0, marginBottom: Constants.margin + 10, }]}>
                    {loader ?
                        <ActivityIndicator color={'#fff'} />
                        :
                        <Text style={globatStyles.btnText}>Pay ( <FontAwesome name='rupee' /> {price} )</Text>}
                </Pressable>
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
    },
    wrapper: {
        padding: Constants.padding,
    },
    addressContainer: {
        backgroundColor: Constants.colors.whiteColor,
        padding: Constants.padding,
        marginTop: Constants.margin,
        marginBottom: Constants.margin,
        borderRadius: Constants.borderRadius,
    },
    addressHeading: {
        fontFamily: Constants.fontFamily,
        fontSize: 20,
    },
    address: {
        fontFamily: Constants.fontFamily,
        fontSize: 15,
    },
    priceDetails: {
        backgroundColor: Constants.colors.whiteColor,
        padding: Constants.padding,
        marginTop: Constants.margin,
        marginBottom: Constants.margin,
        borderRadius: Constants.borderRadius,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: Constants.margin,
        marginBottom: 4,
    },
    paymentOptions: {
        backgroundColor: Constants.colors.whiteColor,
        padding: Constants.padding,
        marginTop: Constants.margin,
        marginBottom: Constants.margin,
        borderRadius: Constants.borderRadius,
    },
    option: {
        marginLeft: Constants.margin,
        marginRight: Constants.margin,
        marginTop: 16,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    inputs: {
        flex: 1,
        borderWidth: 1,
        padding: 3,
        paddingLeft: 12,
        borderColor: '#D1D1D1',
        borderRadius: 4,
        marginTop: 5,
    },
    cardIcon: {
        position: 'absolute',
        top: 12,
        right: 6,
        fontSize: 22,
        color: Constants.colors.primaryColor,
    },
    upidetails: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    upiIcons: {
        width: 22,
        height: 22,
        marginLeft: Constants.margin,
        marginRight: Constants.margin,
    },
})

export default PaymentDetails