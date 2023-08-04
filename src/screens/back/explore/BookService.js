import { ActivityIndicator, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { constants } from 'pako'
import Constants from '../../../shared/Constants'
import CustomAppBar from '../../../components/explore/CustomAppBar'
import { useNavigation } from '@react-navigation/native'
import Swiper from 'react-native-swiper'
import { ScrollView } from 'react-native-gesture-handler'
import globatStyles from '../../../shared/globatStyles'
import Images from '../../../assets/images/Images'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Fontisto from 'react-native-vector-icons/Fontisto'
import axios from 'axios'
import showToastmsg from '../../../shared/showToastmsg'
import EasebuzzCheckout from 'react-native-easebuzz-kit';


const BookService = (props) => {
    const navigation = useNavigation()
    const [servicedata, setServicedata] = useState()
    const [loader, setLoader] = useState(false)
    const [paymentOption, setPaymentOption] = useState('online')
    const [price, setprice] = useState()


    const productImage = props?.route?.params?.productDetails?.image;

    // const getservicedata = () => {
    //     setLoader(true)
    //     axios.post(`${Constants.BASE_URL}GetServiceFormDataByUserServiceID`, {
    //         user_id: props?.route?.params?.userDetails?.id,
    //         service_id: props?.route?.params?.productDetails?.service_id,
    //     })
    //         .then((response) => {
    //             setLoader(false)
    //             { console.log("response=====", response?.data) }

    //             if (response.data.Status == 200) {
    //                 setServicedata(response?.data.Data)
    //             }
    //         })
    //         .catch((error) => {
    //             setLoader(false)
    //             console.log("error", error);
    //             showToastmsg('Error! Please try again')
    //         })
    // }

    const callPaymentGateway = (accessKey) => {
        var options = {
            access_key: accessKey,
            pay_mode: "test"
        }
        EasebuzzCheckout.open(options).then((data) =>{
            if (data.result.includes("payment_successfull")){
                navigation.navigate('/payment-success', { amount: totalPrice })
            }
        })

    }

    const gotoPaymentSuccess = () => {
        setLoader(true)
        console.log("response body==>", {
            "user_id": props?.route?.params?.userDetails?.id,
            "user_type": props?.route?.params?.userDetails?.role_id,
            "amount": parseFloat(price).toFixed(2),

        });
        if (paymentOption === "online") {
            axios.post(`${Constants.BASE_URL}auth/ServiceeaseBuzz-payment-access-token`, {
                "user_id": props?.route?.params?.userDetails?.id,
                "user_type": props?.route?.params?.userDetails?.role_id,
                // user_type:1,
                "amount": parseFloat(price).toFixed(2),

            }).then((response) => {
                { console.log("response=to=payment", response) }
                setLoader(false)
                if (response.data.error) {
                    setLoader(false)
                    showToastmsg(response.data.msg)
                }
                else {
                    // if(response.data.response==200){
                    if (JSON.parse(response.data.data.payment).access_key) {
                        callPaymentGateway(JSON.parse(response.data.data.payment).access_key)
                        console.log("response==->", JSON.parse(response.data.data.payment).access_key);
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
            navigation.navigate('/payment-success', { amount: parseFloat(price).toFixed(2) })

        }
        // navigation.navigate('/payment-success')
    }

    useEffect(() => {
        setprice(props?.route?.params?.price ? props?.route?.params?.price : 0);
        // getservicedata()
    }, [])
    const serviceform = props.route.params.formFields;


    return (

        <View style={styles.container}>
            {console.log("userDetails", props?.route?.params?.userDetails?.id)}
            {console.log("type", props?.route?.params?.userDetails?.role_id)}

            {console.log("this is form fields", props.route.params.formFields)}

            <View>
                <View style={{ alignSelf: 'flex-start', position: 'relative', right: 20 }}>
                    <CustomAppBar navigation={navigation} isMainscreen={false} isReel={false} title='Service' headerRight={false} />
                </View>
                <ScrollView showsVerticalScrollIndicator={false} style={{ marginBottom: 150 }}>
                    <View>
                        <Text style={{
                            flexWrap: 'wrap', // Enable text wrapping
                            backgroundColor: '#f0f0f0',
                            padding: 10,
                            color: '#333',
                        }}>
                            Discover our comprehensive range of premium grooming services tailored to elevate your style and leave you feeling confident and refreshed
                        </Text>
                    </View>

                    <View style={styles.cardcontainer}>

                        <Swiper style={styles.wrapper} >

                            <View style={styles.slide}>

                                <Image style={styles.slideimage} source={{ uri: `${Constants.BASE_IMAGE_URL}${JSON.parse(productImage)[0]}` }} />

                            </View>
                            {/* <View style={styles.slide}>
                                <Image style={styles.slideimage} source={{ uri: "https://images.unsplash.com/photo-1532710093739-9470acff878f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGJhcmJlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60" }} />
                            </View>
                            <View style={styles.slide}>
                                <Image style={styles.slideimage} source={{ uri: "https://images.unsplash.com/photo-1605497787865-e6d4762b386f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJhcmJlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60" }} />
                            </View> */}
                        </Swiper>
                    </View>
                    <View>
                        <Text style={styles.subheading}>
                            {props?.route?.params?.title}
                        </Text>
                        <Text style={{
                            color: '#999999', fontSize: 15, fontWeight: '600', marginTop: 4, backgroundColor: '#f0f0f0',
                        }}>
                            Price : ₹ {props?.route?.params?.price}
                        </Text>
                    </View>
                    <View>
                        <Text style={styles.subheading}>
                            Description :
                        </Text>
                        <Text style={{
                            flexWrap: 'wrap', // Enable text wrapping
                            backgroundColor: '#f0f0f0',
                            padding: 0,
                            color: '#999999',
                        }}>
                            {props?.route?.params?.description}

                        </Text>
                    </View>

                    <View>
                        <Text style={styles.subheading}>
                            My Selected Service
                        </Text>
                        <Text style={{
                            flexWrap: 'wrap', // Enable text wrapping
                            backgroundColor: '#f0f0f0',
                            padding: 0,
                            color: '#999999',
                        }}>

                        </Text>
                        <View>
                            {serviceform.map((field, index) => (
                                <View key={index}>
                                    <Text>{field.label}</Text>

                                    {field.type === '1' && (
                                        <View>
                                            {/* Render type 1 specific data */}
                                        </View>
                                    )}

                                    {field.type === '2' && (
                                        <View>
                                            <Text>Selected Option: {field.selectedOption}</Text>
                                        </View>
                                    )}

                                    {field.type === '3' && (
                                        <View>
                                            <Text>Time Data: {field.timeData}</Text>
                                        </View>
                                    )}

                                    {field.type === '4' && (
                                        <View>
                                            <Text>Time Data: {field.timeData}</Text>
                                        </View>
                                    )}
                                </View>
                            ))}
                        </View>
                    </View>
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
                </ScrollView>
                <View style={{
                    position: 'absolute',
                    bottom: 0,
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 80,

                }}>
                    <Pressable onPress={gotoPaymentSuccess} style={[globatStyles.button, { alignSelf: 'center' }]}>
                        <Text style={globatStyles.btnText}>Pay for a Service</Text>
                    </Pressable>
                </View>

            </View >

        </View >
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: Constants.padding
    },
    cardcontainer: {
        height: 250,
        width: "100%",
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 10
    },
    wrapper: {
        resizeMode: 'contain'
    },
    // slide: {
    //     flex: 1,
    //     borderRadius: 10,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     backgroundColor: '#9DD6EB'
    // },
    slideimage: {
        height: "100%",
        width: '100%',
        borderRadius: 10,
    },
    subheading: {
        color: '#000000',
        fontSize: 20,
        fontWeight: '600',
        marginTop: 20
    },
    paymentOptions: {
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
    option: {
        marginLeft: Constants.margin,
        marginRight: Constants.margin,
        marginTop: 16,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },



})

export default BookService
