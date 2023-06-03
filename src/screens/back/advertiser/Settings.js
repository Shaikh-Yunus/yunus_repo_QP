import React, { useEffect, useState } from 'react'
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
import Fontisto from 'react-native-vector-icons/Fontisto'
import globatStyles from '../../../shared/globatStyles'
import Clipboard from '@react-native-clipboard/clipboard'
import axios from 'axios'
import showToastmsg from '../../../shared/showToastmsg'



const Settings = (props, { navigation }) => {
    const [notification, setNotification] = useState(true)
    const [imageOptimisaztion, setImageOptimisaztion] = useState(true)
    const [checkoutFlow, setCheckoutFlow] = useState(true)
    const [notificationstatus, setnotificationstatus] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [userdata, setuserData] = useState()

    const storeData = () => {
        if (props?.route?.params?.userDetails?.business) {
            setuserData(props?.route?.params?.userDetails?.business?.business_id)
        } else if (props?.route?.params?.userDetails?.influencer) {
            setuserData(props?.route?.params?.userDetails?.influencer?.influencer_id)
        } else if (props?.route?.params?.userDetails?.explore) {
            setuserData(props?.route?.params?.userDetails?.explore?.explore_id)
        } else {
            setuserData(props?.route?.params?.userDetails?.advertiser?.advertiser_id)
        }
    }
    useEffect(() => {
        storeData()
    }, [])




    const notificationupdate = () => {
        axios.post(`${Constants.BASE_URL}auth/Notification-on-off`, {
            "user_id": userdata,
            "status": notificationstatus
        }).then((response) => {
            setIsLoading(false)
            if (response.status == 200) {
                showToastmsg("Notification status updated")
            }

        }).catch((error) => {
            console.log("email otp error", error);
            showToastmsg("Faled to update")
            setIsLoading(false)
        })
    }
    return (
        <View style={styles.container}>
            {console.log('props?.route?.params?.userDetails', props?.route?.params?.userDetails)}
            {console.log('userdata', userdata)}
            <StatusBar translucent={true} backgroundColor='transparent' />
            <CustomAppBar navigation={navigation} isMainscreen={false} isReel={false} title='Settings' headerRight={false} />
            <View style={styles.wrapper}>
                <Text style={styles.description}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod  incididunt ut check .
                </Text>
                <ScrollView>
                    {console.log('notificationstatus', notificationstatus)}
                    <View style={styles.notification}>
                        <Text style={styles.label}>Notifications</Text>
                        {
                            notification ? <Fontisto onPress={() => { setNotification(false), setnotificationstatus(1), notificationupdate() }} name='checkbox-active' size={26} color={Constants.colors.primaryColor} /> :
                                <Fontisto name='checkbox-passive' onPress={() => { setNotification(true), setnotificationstatus(0), notificationupdate() }} size={26} color={Constants.colors.primaryColor} />
                        }
                    </View>
                    <View style={styles.divider}></View>
                    <View style={{ marginLeft: 20, }}>
                        <Text style={styles.optimize}>Optimized Experience</Text>
                        <Text style={{ fontFamily: Constants.fontFamily, }}>For internet connection quality</Text>
                        <View style={[styles.notification, { marginLeft: Constants.margin }]}>
                            <Text style={styles.label}>Optimized Image Quality</Text>
                            {
                                imageOptimisaztion ? <Fontisto onPress={() => setImageOptimisaztion(false)} name='checkbox-active' size={26} color={Constants.colors.primaryColor} /> :
                                    <Fontisto name='checkbox-passive' onPress={() => setImageOptimisaztion(true)} size={26} color={Constants.colors.primaryColor} />
                            }

                        </View>
                        <View style={[styles.notification, { marginLeft: Constants.margin }]}>
                            <Text style={styles.label}>Optimized Checkout Flow</Text>
                            {
                                checkoutFlow ? <Fontisto onPress={() => setCheckoutFlow(false)} name='checkbox-active' size={26} color={Constants.colors.primaryColor} /> :
                                    <Fontisto name='checkbox-passive' onPress={() => setCheckoutFlow(true)} size={26} color={Constants.colors.primaryColor} />
                            }

                        </View>
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 30
    },
    description: {
        fontFamily: Constants.fontFamily,
        marginBottom: Constants.margin,
    },
    wrapper: {
        padding: Constants.padding,
    },
    notification: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    label: {
        fontFamily: Constants.fontFamily,
        fontSize: 18,
        marginTop: 18,
    },
    divider: {
        flex: 1,
        height: 7,
        backgroundColor: 'rgba(1, 170, 41, 0.08)',
        marginTop: 16,
        marginBottom: 16,
    },
    optimize: {
        fontFamily: Constants.fontFamily,
        fontSize: 22,
    },
})

export default Settings