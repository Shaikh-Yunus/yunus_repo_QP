import React, { useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    ScrollView,
    Pressable,
    Image,
} from 'react-native'
import CustomAppBar from '../../../components/advertiser/CustomAppBar'
import { useNavigation } from '@react-navigation/native'
import globatStyles from '../../../shared/globatStyles'
import Constants from '../../../shared/Constants'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import SearchBar from '../../../components/advertiser/SearchBar'
import Images from '../../../assets/images/Images'
import Slider from 'react-native-slider'

const Interests = (props) => {
    const [tabs, setTab] = useState('regional')
    const [radius, setRadius] = useState(5)
    const [currentLocation, setCurrentLocation] = useState(true)
    const navigation = useNavigation()

    const gotoCreateAudience = () => {
        navigation.navigate('/create-audience',{category: props.route.params.category,
            postDetails:{
                title:props?.route?.params?.postDetails?.title,
                postVideo:props?.route?.params?.postDetails?.postVideo,
                tags:props?.route?.params?.postDetails?.tags,
                type:props?.route?.params?.postDetails?.type,
                description:props?.route?.params?.postDetails?.description,
                location:props?.route?.params?.postDetails?.location,
                productName:props?.route?.params?.postDetails?.productName
            },
            selectGoal:props?.route?.params?.selectGoal,
            selectTargetAudience:props?.route?.params?.selectTargetAudience,
            userDetails:props?.route?.params?.userDetails,
            formdata:props?.route?.params?.formdata
            })
    }
    return (
        <View style={globatStyles.wrapper}>
            <StatusBar translucent={true} backgroundColor='transparent' />
            <CustomAppBar navigation={navigation} isMainscreen={false} isReel={false} headerRight={false} title='Interests' />
            <ScrollView>
                <Text style={{ fontFamily: Constants.fontFamily, padding: Constants.padding, }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut .
                </Text>
                <View style={[styles.boxContainer, { margin: Constants.margin }]}>
                    <View>
                        <Text style={{ fontFamily: Constants.fontFamily, fontSize: 20, }}>Estimated Audience Size</Text>
                        <Text style={{ fontWeight: '700', fontSize: 20, }}>194.5K - 228K</Text>
                    </View>
                    <FontAwesome name='users' style={styles.userIcon} />
                </View>
                <View style={{padding: Constants.padding,}}>
                    <SearchBar />
                    <Text style={{fontFamily: Constants.fontFamily,}}>Search and keep adding to cover large audience.</Text>
                </View>
                <View style={[styles.container, {paddingTop:0,}]}>
                    <Pressable style={globatStyles.button} onPress={gotoCreateAudience}><Text style={globatStyles.btnText}>Done</Text></Pressable>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: Constants.padding,
    },
    boxContainer: {
        marginTop: Constants.margin,
        padding: Constants.padding,
        backgroundColor: Constants.colors.whiteColor,
        borderRadius: Constants.borderRadius,
        marginBottom: Constants.margin,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    userIcon: {
        fontSize: 28,
        color: Constants.colors.primaryColor,
    },
    tabContainer: {
        marginTop: 12,
        marginBottom: 12,
        flexDirection: 'row',
    },
    tab: {
        fontFamily: Constants.fontFamily,
        fontSize: 18,
        fontWeight: '700',
        marginRight: 12,
        color: '#676767',
    },
    inStockText: {
        fontFamily: Constants.fontFamily,
        fontSize: 18,
        marginLeft: 12,
    },
    inStockOuter: {
        width: 42,
        height: 22,
        borderRadius: 20,
        backgroundColor: Constants.colors.primaryColor,
        marginTop: 2,
    },
    outOfStockOuter: {
        width: 42,
        height: 22,
        borderRadius: 20,
        marginTop: 2,
        backgroundColor: Constants.colors.inputBgColor,
    },
    inStockInner: {
        width: 18,
        height: 18,
        backgroundColor: Constants.colors.whiteColor,
        borderRadius: 18,
        position: 'absolute',
        top: 2,
        right: 2,
    },
    outOfStockInner: {
        width: 18,
        height: 18,
        backgroundColor: Constants.colors.whiteColor,
        borderWidth: 1,
        borderColor: Constants.colors.bodyBg,
        borderRadius: 18,
        position: 'absolute',
        top: 2,
        left: 2,
    },
    isStockCodContainer: {
        flexDirection: 'row',
        marginBottom: Constants.margin,
        marginTop: Constants.margin,
    },
    codContainer: {
        flexDirection: 'row',
    },
})

export default Interests