import React, { useState } from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
    Pressable,
} from 'react-native'
import VideoPlayer from 'react-native-video-player'
import { useNavigation } from '@react-navigation/native'
import Constants from '../../../shared/Constants'
import globatStyles from '../../../shared/globatStyles'
import Images from '../../../assets/images/Images'
import DatePicker from 'react-native-date-picker'
import AntDesign from 'react-native-vector-icons/AntDesign'

const InfluencerDob = () => {
    const navigation = useNavigation()
    const [open, setOpen] = useState(false)
    const [date, setDate] = useState(new Date())
    const gotoDob = () => {
        navigation.navigate('/influencer-registration')
    }
    return (
        <View style={styles.background}>
            <VideoPlayer
                video={{ uri: 'http://qp.flymingotech.in/public/videos/pexels-artem-podrez-6780089.mp4' }}
                autoplay
                loop
                disableSeek
                resizeMode={'cover'}
                customStyles={{
                    wrapper: {
                        width: Constants.width,
                        height: Constants.height,
                        paddingBottom: Constants.padding,
                    },
                    video: {
                        width: Constants.width,
                        height: Constants.height + 25,
                    },
                    controls: {
                        display: 'none',
                    },
                    seekBarBackground: {
                        backgroundColor: 'transparent',
                    },
                    seekBarProgress: {
                        backgroundColor: 'transparent',
                    },
                }} />
            <View style={globatStyles.overlay}></View>
            <View style={styles.container}>
                <Image source={Images.logo} />
                <Text style={styles.textBelowLogo}>Welcome to Quarterpillar</Text>
                <View style={styles.business}>
                    <Text style={styles.businessText}>Influencer</Text>
                    <Image source={Images.influencerIcon} />
                </View>
                <Text style={styles.textBelowBusiness}>To continue, Please fill in the details</Text>
                <View style={{width: '100%'}}>
                    <Text style={[globatStyles.inputLabel, {position: 'absolute', left: 10, top: 15, zIndex: 999, color: '#999999',}]}>DOB</Text>
                    <AntDesign name='calendar' style={styles.calenderIcon} size={32} color='#999999' />
                    <Pressable style={[globatStyles.inputText,{height: 50,}]} onPress={()=>setOpen(true)}><Text></Text></Pressable>
                    <DatePicker
                        modal
                        mode='date'
                        textColor={'black'}
                        open={open}
                        date={date}
                        onDateChange={setDate}
                        onConfirm={(date) => {
                            setOpen(false)
                            setDate(date)
                        }}
                        onCancel={() => {
                            setOpen(false)
                        }}
                    />
                </View>
                <Pressable style={[globatStyles.button]} onPress={gotoDob}><Text style={globatStyles.btnText}>Continue</Text></Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        height: Constants.width,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        padding: Constants.padding,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
    },
    textBelowLogo: {
        fontFamily: Constants.fontFamily,
        fontSize: 26,
        fontWeight: '700',
        color: Constants.colors.whiteColor,
        maxWidth: '60%',
        textAlign: 'center',
        marginTop: 12,
    },
    business: {
        flexDirection: 'row',
        marginTop: 12,
        alignItems: 'center',
        marginTop: 40,
        marginBottom: 40,
        backgroundColor: 'rgba(51, 51, 51, 0.2)',
        padding: 8,
        paddingStart: 16,
        paddingEnd: 16,
        borderRadius: 5,
    },
    businessText: {
        fontFamily: Constants.fontFamily,
        fontSize: 24,
        color: Constants.colors.whiteColor,
        fontWeight: '700',
        marginRight: Constants.margin,
        borderRadius: 5,
    },
    textBelowBusiness: {
        fontFamily: Constants.fontFamily,
        color: Constants.colors.whiteColor,
        fontSize: 16,
        fontWeight: '400',
        marginBottom: 20,
    },
    phoneNumberContainer: {
        flexDirection: 'row',
    },
    countryDropdown: {
        borderWidth: 0,
        backgroundColor: 'transparent',
        width: 75,
        position: 'absolute',
        left: 14,
        top: 0,
    },
    countryCode: {
        flexDirection: 'row',
        backgroundColor: Constants.colors.whiteColor,
        width: 90,
        borderRadius: Constants.borderRadius,
        height: 50,
    },
    countryFlag: {
        position: 'absolute',
        left: 5,
        top: 12,
    },
    textInput: {
        backgroundColor: Constants.colors.whiteColor,
        width: '60%',
        borderRadius: Constants.borderRadius,
        marginLeft: 20,
        paddingLeft: 12,
    },
    dropdownIcon: {
        position: 'absolute',
        right: 6,
        top: 23,
    },
    belowOtp: {
        fontSize: 14,
        color: Constants.colors.whiteColor,
        marginTop: 12,
        fontFamily: Constants.fontFamily,
        alignSelf: 'flex-end',
        marginEnd: '19%',
    },
    otpField: {
        borderBottomWidth: 0,
        backgroundColor: Constants.colors.whiteColor,
        borderRadius: Constants.borderRadius,
    },
    countdown: {
        color: Constants.colors.primaryColor,
    },
    calenderIcon: {
        position: 'absolute',
        top: 8,
        right: 10,
        zIndex: 999,
    },
})

export default InfluencerDob