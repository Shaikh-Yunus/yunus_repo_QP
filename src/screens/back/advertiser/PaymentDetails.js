import React, { useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    Image,
    ScrollView,
    Pressable,
    TextInput,
} from 'react-native'
import CustomAppBar from '../../../components/explore/CustomAppBar'
import Constants from '../../../shared/Constants'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Fontisto from 'react-native-vector-icons/Fontisto'
import globatStyles from '../../../shared/globatStyles'
import Images from '../../../assets/images/Images'

const PaymentDetails = ({navigation})=>{
    const [paymentOption, setPaymentOption] = useState('')
    const [saveCardDetails, setSaveCardDetails] = useState(true)
    const [upi, setUpi] = useState('')
    const [isCod, setIsCod] = useState('')
    const gotoCoupon = ()=>{
        navigation.navigate('/all-coupons')
    }
    const gotoPaymentSuccess = ()=>{
        navigation.navigate('/payment-success')
    }
    return (
        <View style={styles.container}>
            <StatusBar translucent={true} backgroundColor='transparent' />
            <CustomAppBar navigation={navigation} isMainscreen={false} isReel={false} title='Payment' headerRight={false} />
            <ScrollView style={styles.wrapper}>
                <Text style={styles.description}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
                </Text>
                <View style={styles.boxContainer}>
                    <Text style={{fontFamily: Constants.fontFamily, fontSize: 22, marginBottom: 12,}}>Post Details</Text>
                    <View style={styles.imgContainer}>
                        <Image source={Images.nature} style={styles.img} />
                        <View style={{flex: 1,}}>
                            <Text style={{fontFamily: Constants.fontFamily, fontSize: 20, marginBottom: 4,}}>Sample Title</Text>
                            <Text style={{fontFamily: Constants.fontFamily,}}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut .
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={styles.boxContainer}>
                    <Text style={{fontFamily: Constants.fontFamily, fontSize: 22, marginBottom: 12,}}>Cost Summary</Text>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12,}}>
                        <Text style={{fontFamily: Constants.fontFamily, fontSize: 16,}}>Advertisement Cost (14days)</Text>
                        <Text style={{fontFamily: Constants.fontFamily, fontSize: 16,}}><FontAwesome name='rupee' size={16} /> 3000</Text>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12,}}>
                        <Text style={{fontFamily: Constants.fontFamily, fontSize: 16,}}>Discount</Text>
                        <Text style={{fontFamily: Constants.fontFamily, fontSize: 16,}}><FontAwesome name='rupee' size={16} /> 600</Text>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12,}}>
                        <Text style={{fontFamily: Constants.fontFamily, fontSize: 16,}}>Estimated Tax</Text>
                        <Text style={{fontFamily: Constants.fontFamily, fontSize: 16,}}><FontAwesome name='rupee' size={16} /> 100</Text>
                    </View>
                    <View style={styles.divider}></View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12,}}>
                        <Text style={{fontFamily: Constants.fontFamily, fontSize: 16,}}>Total Amount to be Paid</Text>
                        <Text style={{fontFamily: Constants.fontFamily, fontSize: 16,}}><FontAwesome name='rupee' size={16} /> 2400</Text>
                    </View>
                </View>
                <View style={styles.paymentOptions}>
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
                </View>
                <Pressable onPress={gotoPaymentSuccess} style={[globatStyles.button, {marginTop: 0,marginBottom: Constants.margin,}]}><Text style={globatStyles.btnText}>Pay ( <FontAwesome name='rupee' /> 2400 )</Text></Pressable>
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
    boxContainer: {
        marginTop: Constants.margin,
        padding: Constants.padding,
        backgroundColor: Constants.colors.whiteColor,
        borderRadius: Constants.borderRadius,
        marginBottom: Constants.margin,
    },
    imgContainer: {
        flexDirection: 'row',
    },
    img: {
        width: 120,
        height: 200,
        borderRadius: 10,
        marginRight: 12,
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