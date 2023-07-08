import React, { useEffect } from 'react'
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    Pressable,
} from 'react-native'
import Constants from '../../../shared/Constants'
import Feather from 'react-native-vector-icons/Feather'
import globatStyles from '../../../shared/globatStyles'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

const PaymentSuccess = (props) => {
    const navigation = useNavigation()
    const gotoProduct = () => {
        if (props?.route?.params?.userDetails?.role_id == 3) {
            navigation.navigate('/advertiser-product')
        }
        else {
            navigation.navigate('/product')
        }
    }
    const retryPayment = () => {
        if (props?.route?.params?.userDetails?.role_id == 3) {
            navigation.navigate('/ad-details-preview',
                {
                    category: props.route.params.category,
                    postDetails: {
                        title: props?.route?.params?.postDetails?.title,
                        postVideo: props?.route?.params?.postDetails?.postVideo,
                        tags: props?.route?.params?.postDetails?.tags,
                        type: props?.route?.params?.postDetails?.type,
                        description: props?.route?.params?.postDetails?.description,
                        location: props?.route?.params?.postDetails?.location,
                        productName: props?.route?.params?.postDetails?.productName
                    },
                    budget: props?.route?.params?.budget,
                    duration: props?.route?.params?.duration,
                    audienceName: props?.route?.params?.audienceName,
                    advertise_audience_gender: props?.route?.params?.advertise_audience_gender,
                    advertise_audience_age: props?.route?.params?.advertise_audience_age,
                    selectGoal: props?.route?.params?.selectGoal,
                    selectTargetAudience: props?.route?.params?.selectTargetAudience,
                    userDetails: props?.route?.params?.userDetails,
                    formdata: props?.route?.params?.formdata,
                    error: true
                })
        }

        else {
            navigation.navigate('/payment-details', {
                price: props?.route?.params?.price,
                couponCode: props?.route?.params?.couponCode,
                couponCodeValue: props?.route?.params?.couponCodeValue,
                selectedAddress: props?.route?.params?.selectedAddress,
                discount: props?.route?.params?.discount,
                totalPrice: props?.route?.params?.totalPrice,
                cartItems: props?.route?.params?.cartItems,
                userDetails: props?.route?.params?.userDetails,
                address_id: props?.route?.params?.address_id,
                error: true
            })
        }
    }

    const sendMessage = async () => {
        let fcmtoken = await AsyncStorage.getItem("fcmtoken");
        await axios.post("https://testfcm.com/api/notify",
            {
                "postBody": {
                    "notification": {
                        "title": `Order placed successful`,
                        "body": `Your order for amount ${props?.route?.params?.amount} has been placed successfully`,
                        "click_action": null,
                        "icon": null
                    },
                    "data": null,
                    "to": fcmtoken
                },
                "serverKey": "AAAAdLYZPyI:APA91bFVhnrT3tUYJWS5aKMBM9ObqK4LBFIrhwS5CoHHKlnORXOIadVwpjE4QTXMKicbQTxifccSdphB2EF7Jw_jCkyjHciMHGlQ0zvufnNHtAifxqUgQ0Ww01XprMn8a2dVa4EKsNc8"
            }
        ).then((resp) => {
            // setIsLoading(false)
        })
            .catch((error) => {
                // setIsLoading(false)
            })
    }
    useEffect(() => {
        console.log("props amiunt", props?.route?.params);
        if (props?.route?.params?.amount) {
            sendMessage()
        }
    }, [props.route.params])

    return (
        <View style={[styles.container, { backgroundColor: props?.route?.params?.error ? 'red' : Constants.colors.primaryColor }]}>
            <StatusBar backgroundColor={props?.route?.params?.error ? 'red' : Constants.colors.primaryColor} />
            <View style={styles.middleContant}>
                <View style={[styles.circle, {
                    color: props?.route?.params?.error ? 'rgba(255,0,0,0.6)' : 'rgba(255,255,255,0.6)'
                }]}>
                    <Feather name={props?.route?.params?.error ?
                        'x'
                        : 'check'} size={60} color={Constants.colors.whiteColor} />
                </View>
                <Text style={styles.successHeading}>Payment {props?.route?.params?.error ? 'failed' : 'successful'}</Text>
                <Text style={styles.successText}>
                    We have successfully processed your transaction and a confirmation mail has been sent to your registered email address. Thank you for choosing our services and placing your trust in us!
                </Text>
                <Pressable onPress={
                    props?.route?.params?.error ? retryPayment :
                        gotoProduct} style={[globatStyles.button, { backgroundColor: Constants.colors.whiteColor, marginTop: 40, }]}>
                    <Text style={[globatStyles.btnText, { color: props?.route?.params?.error ? 'red' : Constants.colors.primaryColor }]}>{props?.route?.params?.error ?
                        'Retry payment'
                        : 'Explore More'}</Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Constants.colors.primaryColor,
    },
    middleContant: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: Constants.padding,
    },
    circle: {
        padding: 20,
        backgroundColor: 'rgba(255,255,255,0.6)',
        borderRadius: 100,
    },
    successHeading: {
        fontFamily: Constants.fontFamily,
        fontSize: 22,
        color: Constants.colors.whiteColor,
        marginTop: Constants.margin,
        marginBottom: Constants.margin,
    },
    successText: {
        fontFamily: Constants.fontFamily,
        color: Constants.colors.whiteColor,
    },
})

export default PaymentSuccess