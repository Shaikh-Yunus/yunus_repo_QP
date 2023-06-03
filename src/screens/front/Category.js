import React from 'react'
import {
    View,
    Text,
    ImageBackground,
    StyleSheet,
    Pressable,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Swiper from 'react-native-swiper'
import VideoPlayer from 'react-native-video-player'
import Images from '../../assets/images/Images'
import Constants from '../../shared/Constants'
import globatStyles from '../../shared/globatStyles'
import Icon from 'react-native-vector-icons/AntDesign'

const Category = (props) => {
    const navigation = useNavigation()
    const businessRegistration = () => {

        navigation.navigate('/business-registration', { mobileNumber: props.route.params.mobileNumber })

    }
    return (
        // <Swiper style={styles.wrapper} showsButtons={true} horizontal={true} loop={false} activeDotColor={Constants.colors.whiteColor} nextButton={<Icon name='right' style={styles.navigicationIcon} />} prevButton={<Icon name='left' style={styles.navigicationIcon} />}>
        <View style={styles.wrapper}>
            <Pressable onPress={businessRegistration} style={styles.category}>
                <VideoPlayer
                    video={{ uri: 'http://qp.flymingotech.in/public/videos/videoTravel.mp4' }}
                    autoplay
                    loop
                    disableSeek
                    muted={true}
                    resizeMode={'cover'}
                    customStyles={{
                        wrapper: {
                            width: '100%',
                            height: '100%',
                            paddingBottom: Constants.padding,
                        },
                        video: {
                            width: '100%',
                            height: '103%',
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
                <Text style={styles.categoryName}>Travel</Text>
            </Pressable>
            <Pressable onPress={businessRegistration} style={styles.category}>
                <VideoPlayer
                    video={{ uri: 'http://qp.flymingotech.in/public/videos/food.mp4' }}
                    autoplay
                    loop
                    muted={true}
                    disableSeek
                    resizeMode={'cover'}
                    customStyles={{
                        wrapper: {
                            width: '100%',
                            height: '100%',
                            paddingBottom: Constants.padding,
                        },
                        video: {
                            width: '100%',
                            height: '103%',
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
                <Text style={styles.categoryName}>Fashion</Text>
            </Pressable>
            <Pressable onPress={businessRegistration} style={styles.category}>
                <VideoPlayer
                    video={{ uri: 'http://qp.flymingotech.in/public/videos/videoFashion.mp4' }}
                    autoplay
                    loop
                    muted={true}
                    disableSeek
                    resizeMode={'cover'}
                    customStyles={{
                        wrapper: {
                            width: '100%',
                            height: '100%',
                            paddingBottom: Constants.padding,
                        },
                        video: {
                            width: '100%',
                            height: '103%',
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
                <Text style={styles.categoryName}>LifeStyle</Text>
            </Pressable>
            <Pressable onPress={businessRegistration} style={styles.category}>
                <VideoPlayer
                    video={{ uri: 'http://qp.flymingotech.in/public/videos/lifesty.mp4' }}
                    autoplay
                    loop
                    muted={true}
                    disableSeek
                    resizeMode={'cover'}
                    customStyles={{
                        wrapper: {
                            width: '100%',
                            height: '100%',
                            paddingBottom: Constants.padding,
                        },
                        video: {
                            width: '100%',
                            height: '103%',
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
                <Text style={styles.categoryName}>Food</Text>
            </Pressable>
        </View>

    )
}
const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        flex: 1,
        height: Constants.height,
    },
    category: {
        width: '50%',
        height: '50%',
    },
    categoryName: {
        color: Constants.colors.whiteColor,
        fontFamily: Constants.fontFamily,
        fontSize: 30,
        fontWeight: '800',
        textTransform: 'uppercase',
        position: 'absolute',
        top: '44%',
        alignSelf: 'center',

    },
    navigicationIcon: {
        fontSize: 24,
        color: Constants.colors.whiteColor,
    },
})
export default Category