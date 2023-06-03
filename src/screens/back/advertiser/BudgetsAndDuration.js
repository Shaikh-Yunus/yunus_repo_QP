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
import Slider from 'react-native-slider'

const BudgetsAndDuration = (props) => {
    const [tabs, setTab] = useState('weekly')
    const [budgets, setBudgets] = useState(100)
    const [duration, setDuration] = useState(1)
    const navigation = useNavigation()

    const gotoAdPreview = () => {
        // console.log("resss=>",`${duration} ${tabs==='daily'?'days': tabs==="weekly"?"weeks":"months"}`);
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
                productData: props?.route?.params?.productData,
                budget: budgets,
                duration: `${duration} ${tabs === 'daily' ? 'days' : tabs}`,
                audienceName: props?.route?.params?.audienceName,
                advertise_audience_gender: props?.route?.params?.advertise_audience_gender,
                advertise_audience_age: props?.route?.params?.advertise_audience_age,
                selectGoal: props?.route?.params?.selectGoal,
                selectTargetAudience: props?.route?.params?.selectTargetAudience,
                userDetails: props?.route?.params?.userDetails,
                formdata: props?.route?.params?.formdata
            }
        )
    }
    return (
        <View style={globatStyles.wrapper}>
            {console.log('checking_product_in=>', props?.route?.params?.productData)}
            <StatusBar translucent={true} backgroundColor='transparent' />
            <CustomAppBar navigation={navigation} isMainscreen={false} isReel={false} headerRight={false} title='Budget & Duration' />
            <ScrollView>
                <Text style={{ fontFamily: Constants.fontFamily, padding: Constants.padding, }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut .
                </Text>
                <View style={[styles.boxContainer, { margin: Constants.margin }]}>
                    <View>
                        <Text style={{ fontFamily: Constants.fontFamily, fontSize: 20, }}>Estimated Audience Size</Text>
                        <Text style={{ fontWeight: '700', fontSize: 20, }}><FontAwesome name='rupee' size={20} /> 3,000 over 2 weeks</Text>
                    </View>
                    <FontAwesome name='rupee' style={styles.rupeeIcon} />
                </View>
                <View style={[styles.boxContainer, { margin: Constants.margin }]}>
                    <View>
                        <Text style={{ fontFamily: Constants.fontFamily, fontSize: 20, }}>Estimated Reach</Text>
                        <Text style={{ fontWeight: '700', fontSize: 20, }}><FontAwesome name='rupee' size={20} /> 20,000-44,000</Text>
                    </View>
                    <FontAwesome name='users' style={styles.userIcon} />
                </View>
                <View style={{ padding: Constants.padding, }}>
                    <Text style={{ fontFamily: Constants.fontFamily, fontSize: 22, }}>Budget</Text>
                    <Slider
                        value={budgets}
                        step={1}
                        onValueChange={value => setBudgets(value)}
                        minimumValue={100}
                        maximumValue={100000}
                        minimumTrackTintColor={Constants.colors.primaryColor}
                        maximumTrackTintColor='#D6D6D6'
                        thumbImage={require('../../../assets/images/icons/slider-thumb.png')}
                        thumbStyle={{ width: 20, height: 20, backgroundColor: 'transparent', }}
                    />
                    <Text style={{ fontFamily: Constants.fontFamily, alignSelf: 'center', fontSize: 22, }}><FontAwesome name='rupee' size={24} /> {budgets} {tabs}</Text>
                </View>
                <View style={{ padding: Constants.padding, }}>
                    <Text style={{ fontFamily: Constants.fontFamily, fontSize: 22, }}>Duration</Text>
                    <View style={styles.tabContainer}>
                        <Text style={[styles.tab, { backgroundColor: tabs === 'daily' ? Constants.colors.whiteColor : 'rgba(0, 169, 40, 0.15)', borderColor: tabs === 'daily' ? Constants.colors.primaryColor : 'transparent', color: tabs === 'daily' ? Constants.colors.primaryColor : '#000000' }]} onPress={() => setTab('daily')}>Daily</Text>
                        <Text style={[styles.tab, { backgroundColor: tabs === 'weekly' ? Constants.colors.whiteColor : 'rgba(0, 169, 40, 0.15)', borderColor: tabs === 'weekly' ? Constants.colors.primaryColor : 'transparent', color: tabs === 'weekly' ? Constants.colors.primaryColor : '#000000' }]} onPress={() => setTab('weekly')}>Weekly</Text>
                        <Text style={[styles.tab, { backgroundColor: tabs === 'monthly' ? Constants.colors.whiteColor : 'rgba(0, 169, 40, 0.15)', borderColor: tabs === 'monthly' ? Constants.colors.primaryColor : 'transparent', color: tabs === 'monthly' ? Constants.colors.primaryColor : '#000000' }]} onPress={() => setTab('monthly')}>Monthly</Text>
                    </View>
                    <Slider
                        value={duration}
                        step={1}
                        onValueChange={value => setDuration(value)}
                        minimumValue={1}
                        maximumValue={52}
                        minimumTrackTintColor={Constants.colors.primaryColor}
                        maximumTrackTintColor='#D6D6D6'
                        thumbImage={require('../../../assets/images/icons/slider-thumb.png')}
                        thumbStyle={{ width: 20, height: 20, backgroundColor: 'transparent', }}
                    />
                    <Text style={{ fontFamily: Constants.fontFamily, alignSelf: 'center', fontSize: 22, }}>{duration} {tabs === 'daily' ? 'days' : tabs === "weekly" ? "weeks" : "months"}</Text>
                </View>
                <View style={[styles.container, { paddingTop: 0, }]}>
                    <Pressable style={globatStyles.button} onPress={gotoAdPreview}><Text style={globatStyles.btnText}>Preview</Text></Pressable>
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
    rupeeIcon: {
        fontSize: 28,
        color: Constants.colors.whiteColor,
        padding: 12,
        paddingStart: 20,
        paddingEnd: 20,
        backgroundColor: '#70CF87',
        borderRadius: 50,
    },
    userIcon: {
        fontSize: 28,
        color: 'rgba(0, 169, 40, 0.56)',
    },
    tabContainer: {
        marginTop: 12,
        marginBottom: 12,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    tab: {
        fontFamily: Constants.fontFamily,
        fontSize: 18,
        marginRight: 12,
        color: '#676767',
        backgroundColor: 'rgba(0, 169, 40, 0.15)',
        padding: 6,
        paddingStart: 12,
        paddingEnd: 12,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'transparent',
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

export default BudgetsAndDuration