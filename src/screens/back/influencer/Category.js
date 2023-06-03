import React from 'react'
import {
    View,
    Text,
    ImageBackground,
    StyleSheet,
    Pressable,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import VideoPlayer from 'react-native-video-player'
import globatStyles from '../../../shared/globatStyles'
import Constants from '../../../shared/Constants'
import Videos from '../../../assets/staticVideos/Videos'

const Category = (props) => {
    const navigation = useNavigation()
    const businessRegistration = (category) => {

        navigation.navigate('/open-camera', { 'category': category, userDetails: props?.route?.params?.userDetails, productData: props?.route?.params?.productData })

    }
    return (
        // <Swiper style={styles.wrapper} showsButtons={true} horizontal={true} loop={false} activeDotColor={Constants.colors.whiteColor} nextButton={<Icon name='right' style={styles.navigicationIcon} />} prevButton={<Icon name='left' style={styles.navigicationIcon} />}>
        <View style={styles.wrapper}>
            {console.log('props?.route?.params?.userDetails', props?.route?.params?.productData)}
            <Pressable onPress={() => businessRegistration('Travel')} style={styles.category}>
                <VideoPlayer
                    video={Videos.travel}
                    autoplay
                    loop
                    muted
                    repeat={true}
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
                <Text style={styles.categoryName}>Travel</Text>
            </Pressable>
            <Pressable onPress={() => businessRegistration('Fashion')} style={styles.category}>
                <VideoPlayer
                    video={Videos.fashion}
                    autoplay
                    loop
                    muted
                    repeat={true}
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
            <Pressable onPress={() => businessRegistration('LifeStyle')} style={styles.category}>
                <VideoPlayer
                    video={Videos.lifestyle}
                    autoplay
                    loop
                    repeat={true}
                    muted
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
            <Pressable onPress={() => businessRegistration('Food')} style={styles.category}>
                <VideoPlayer
                    video={Videos.food}
                    autoplay
                    loop
                    muted
                    disableSeek
                    repeat={true}
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