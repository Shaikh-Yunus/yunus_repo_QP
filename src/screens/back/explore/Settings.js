import React, { useState } from 'react'
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

const Settings = ({navigation})=>{
    const [notification, setNotification] = useState(true)
    const [imageOptimisaztion, setImageOptimisaztion] = useState(true)
    const [checkoutFlow, setCheckoutFlow] = useState(true)
    return (
        <View style={styles.container}>
            <StatusBar translucent={true} backgroundColor='transparent' />
            <CustomAppBar navigation={navigation} isMainscreen={false} isReel={false} title='Settings' headerRight={false} />
            <View style={styles.wrapper}>
                <Text style={styles.description}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut .
                </Text>
                <ScrollView>
                    <View style={styles.notification}>
                        <Text style={styles.label}>Notifications</Text>
                        {
                            notification?<Fontisto onPress={()=>setNotification(false)} name='checkbox-active' size={26} color={Constants.colors.primaryColor} />:
                                         <Fontisto name='checkbox-passive' onPress={()=>setNotification(true)} size={26} color={Constants.colors.primaryColor} />
                        }
                    </View>
                    <View style={styles.divider}></View>
                    <View style={{marginLeft: 20,}}>
                        <Text style={styles.optimize}>Optimized Experience</Text>
                        <Text style={{fontFamily: Constants.fontFamily,}}>For internet connection quality</Text>
                        <View style={[styles.notification, {marginLeft: Constants.margin}]}>
                            <Text style={styles.label}>Optimized Image Quality</Text>
                            {
                                imageOptimisaztion?<Fontisto onPress={()=>setImageOptimisaztion(false)} name='checkbox-active' size={26} color={Constants.colors.primaryColor} />:
                                            <Fontisto name='checkbox-passive' onPress={()=>setImageOptimisaztion(true)} size={26} color={Constants.colors.primaryColor} />
                            }
                            
                        </View>
                        <View style={[styles.notification, {marginLeft: Constants.margin}]}>
                            <Text style={styles.label}>Optimized Checkout Flow</Text>
                            {
                                checkoutFlow?<Fontisto onPress={()=>setCheckoutFlow(false)} name='checkbox-active' size={26} color={Constants.colors.primaryColor} />:
                                            <Fontisto name='checkbox-passive' onPress={()=>setCheckoutFlow(true)} size={26} color={Constants.colors.primaryColor} />
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