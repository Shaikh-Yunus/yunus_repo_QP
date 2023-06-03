import React, { useRef, useState } from 'react'
import {
    View,
    Text,
    ScrollView,
    Image,
    StyleSheet,
    FlatList,
    StatusBar,
    Pressable,
    Animated,
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import CustomAppBar from '../../../components/admin/CustomAppBar'
import Constants from '../../../shared/Constants'
import Images from '../../../assets/images/Images'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useNavigation } from '@react-navigation/native'
import RenderComplaints from './RenderComplaints'
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import CustomTabNavigationAdmin from '../../../navigations/CustomTabNavigationAdmin'


const HomeScreen = (props) => {
    const navigation = useNavigation()
    const [activeMenu, setActiveMenu] = useState('')
    const [showDrawer, setShowDrawer] = useState(false)
    const offsetValue = useRef(new Animated.Value(0)).current
    const scaleValue = useRef(new Animated.Value(1)).current
    const openDrawer = ()=>{
        setShowDrawer(!showDrawer)
    }
    const complaints = [
        {
            id: 1,
            img: Images.recentOrdersOne,
            name: 'Statue of Boris',
            quantity: 23,
            buyers: 45
        },
        {
            id: 2,
            img: Images.recentOrdersTwo,
            name: 'Statue of Boris',
            quantity: 12,
            buyers: 25
        },
    ]
    const gotoAllComplaints = () => {
        navigation.navigate('/all-complaints')
    }
    return (
        <View style={{flex: 1,paddingTop: 25,}}>
            {
                Animated.timing(scaleValue, {
                    toValue: showDrawer?0.88:1,
                    duration: 300,
                    useNativeDriver: false,
                }).start()
            }
            {
                Animated.timing(offsetValue, {
                    toValue: showDrawer?245:0,
                    duration: 300,
                    useNativeDriver: false,
                }).start()
            }
            <View style={styles.menubg}>
                <StatusBar translucent={true} backgroundColor={showDrawer?'rgba(4,56,16,1)':'#FFFFFF'} />
                <View style={{width: '100%', height: 2, backgroundColor: 'rgba(4,56,16,1)', position: 'absolute', top: -1,}}></View>
                <View style={styles.header}>
                    <View style={styles.profileDetails}>
                        <View style={styles.profileIcon}>
                            <Image source={Images.avatar} />
                        </View>
                        <View>
                            <Text style={styles.preofileName}>Tanveer Inamdar</Text>
                            <Text style={styles.founder}>Fashion Blogger</Text>
                        </View>
                    </View>
                </View>
                <ScrollView style={styles.drawerItemContainer}>
                    {
                        setMenuItem(setActiveMenu, activeMenu, 'fa', 'users', 'Users', navigation, '/users')
                    }
                    {
                        setMenuItem(setActiveMenu, activeMenu, 'feather', 'bell', 'Support Emails', navigation, '/email-support')
                    }
                    {
                        setMenuItem(setActiveMenu, activeMenu, 'feather', 'users', 'User Management', navigation, '/user-managemnt')
                    }
                    {
                        setMenuItem(setActiveMenu, activeMenu,'ant', 'book', 'Bulk Promotions', navigation, '/bulk-promotion')
                    }
                    {
                        setMenuItem(setActiveMenu, activeMenu,'ant', 'book', 'App Rattings', navigation, '/app-ratting')
                    }
                    {
                        setMenuItem(setActiveMenu, activeMenu, 'ant', 'shoppingcart', 'eCommerce', navigation, '/ecommerce')
                    }
                    {
                        setMenuItem(setActiveMenu, activeMenu, 'ant', 'infocirlceo', 'About', navigation, '/about')
                    }
                </ScrollView>
                <Pressable style={{flexDirection: 'row', margin: 12, marginLeft: 0, marginBottom: 52, backgroundColor: 'rgba(60, 255, 106, 0.47)', padding: 16, width: '65%',}}>
                    <AntDesign name='logout' size={22} color={Constants.colors.whiteColor} />
                    <Text style={{color: Constants.colors.whiteColor, fontFamily: Constants.fontFamily, fontWeight: '700', fontSize: 18, marginLeft: 12,}}>Logout</Text>
                </Pressable>
            </View>
            <Animated.View style={{position: 'absolute', backgroundColor: '#F1F1F1', top: 0, right: 0, bottom: 0, left: 0, borderRadius: showDrawer?30:0, transform: [
                {scale: scaleValue},
                {translateX: offsetValue}
            ]}}>
                <CustomAppBar navigation={props.navigation} isMainscreen={true} isReel={false} openDrawer={openDrawer} showDrawer={showDrawer} />
                <ScrollView style={{marginBottom: 95,}}>
                    <View style={[styles.totalRevenue]}>
                        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',}}>
                            <View>
                                <Text style={styles.totalRTevinueText}>Total Users</Text>
                                <LinearGradient colors={['rgba(1, 170, 41, 0.09)', 'rgba(196, 196, 196, 0) 102.22%)']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.gradientBg}>
                                    <Image source={Images.lineGraphIcon} />
                                </LinearGradient>
                            </View>
                            <View style={{ alignItems: 'flex-end' }}>
                                <Text style={styles.totalRevinue}> 11,12,001</Text>
                                <View style={styles.percentage}>
                                    <AntDesign name='arrowup' size={22} color={Constants.colors.primaryColor} />
                                    <Text style={styles.numberInPercentage}>5.86%</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{marginTop: 12,}}>
                            <Text style={styles.cityName}>Explore</Text>
                            <View style={styles.progressBar}>
                                <View style={styles.progressBarBg}></View>
                                <View style={{ ...styles.progressBarFront, width: '65%' }}></View>
                                <Text>12,344</Text>
                            </View>
                            <Text style={styles.cityName}>Influencer</Text>
                            <View style={styles.progressBar}>
                                <View style={styles.progressBarBg}></View>
                                <View style={{ ...styles.progressBarFront, width: '60%' }}></View>
                                <Text>9,434</Text>
                            </View>
                            <Text style={styles.cityName}>Advertiser</Text>
                            <View style={styles.progressBar}>
                                <View style={styles.progressBarBg}></View>
                                <View style={{ ...styles.progressBarFront, width: '75%' }}></View>
                                <Text>23,456</Text>
                            </View>
                            <Text style={styles.cityName}>Business</Text>
                            <View style={styles.progressBar}>
                                <View style={styles.progressBarBg}></View>
                                <View style={{ ...styles.progressBarFront, width: '50%' }}></View>
                                <Text>15,343</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: Constants.padding,}}>
                        <Text style={{fontFamily: Constants.fontFamily, fontSize: 18,}}>New Complaints (42)</Text>
                        <Text onPress={gotoAllComplaints} styles={{fontFamily: Constants.fontFamily, color: Constants.colors.primaryColor,textDecorationLine: 'underline'}}>View All</Text>
                    </View>
                    <FlatList
                        data={complaints}
                        renderItem={item=><RenderComplaints item={item} />}
                        keyExtractor={item=>item?.id?.toString()} 
                        />
                </ScrollView>
                <CustomTabNavigationAdmin navigation={navigation} showDrawer={showDrawer}  activeTab='home' />
            </Animated.View>
        </View>
    )
}

const setMenuItem=(setActiveMenu, activeMenu, icon, iconName, title, navigation, url)=>{
    return(
        <Pressable style={[styles.drawerItem, {backgroundColor: activeMenu===title?'rgba(60, 255, 106, 0.47)':'transparent', padding: 14,}]} onPress={()=>{
            setActiveMenu(title)
            navigation.navigate(url)
        }}>
            {
                icon==='feather'?<Feather name={iconName} size={26} color={Constants.colors.whiteColor} />:null
            }
            {
                icon==='fa5'?<FontAwesome5 name={iconName} size={26} color={Constants.colors.whiteColor} />:null
            }
            {
                icon==='ant'?<AntDesign name={iconName} size={26} color={Constants.colors.whiteColor} />:null
            }
            {
                icon==='en'?<Entypo name={iconName} size={26} color={Constants.colors.whiteColor} />:null
            }
            {
                icon==='oct'?<Octicons name={iconName} size={26} color={Constants.colors.whiteColor} />:null
            }
            {
                icon==='fa'?<FontAwesome name={iconName} size={26} color={Constants.colors.whiteColor} />:null
            }
            <Text style={[styles.menuName]}>{title}</Text>
        </Pressable>
    )
}
const styles = StyleSheet.create({
    container: {
        padding: Constants.padding,
        paddingBottom: 100,
    },
    totalRevenue: {
        margin: Constants.margin,
        backgroundColor: Constants.colors.whiteColor,
        padding: Constants.padding,
        borderRadius: 20,
    },
    totalRTevinueText: {
        fontFamily: Constants.fontFamily,
        fontSize: 24,
        fontWeight: '400',
    },
    gradientBg: {
        padding: 10,
    },
    totalRevinue: {
        fontSize: 22,
        fontFamily: Constants.fontFamily,
        fontWeight: '800',
        marginBottom: 12,
    },
    percentage: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    numberInPercentage: {
        fontFamily: Constants.fontFamily,
        fontSize: 20,
        color: Constants.colors.primaryColor,
        fontWeight: '400',
    },
    impression: {
        marginTop: Constants.margin,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    impressionBox: {
        padding: Constants.padding,
        backgroundColor: Constants.colors.whiteColor,
        width: '48%',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    impressionText: {
        fontFamily: Constants.fontFamily,
        fontSize: 20,
        fontWeight: '400',
    },
    impressionValue: {
        fontWeight: '800',
        fontSize: 22,
        fontFamily: Constants.fontFamily,
    },
    impressionInPercentage: {
        fontFamily: Constants.fontFamily,
        color: Constants.colors.primaryColor,
    },
    orderSalesReturn: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: Constants.margin,
    },
    orderSlaseBox: {
        padding: 16,
        width: '31%',
        backgroundColor: Constants.colors.whiteColor,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    salesValue: {
        fontFamily: Constants.fontFamily,
        fontWeight: '800',
        fontSize: 18,
    },
    countryWise: {
        marginTop: 50,
        backgroundColor: Constants.colors.whiteColor,
        borderRadius: 20,
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    tabs: {
        padding: Constants.padding,
        fontFamily: Constants.fontFamily,
        fontSize: 20,
        width: '50%',
        backgroundColor: 'rgba(229, 235, 237, 0.38)'
    },
    tabText: {
        fontFamily: Constants.fontFamily,
        fontSize: 19,
    },
    tabContent: {
        padding: Constants.padding,
    },
    cityName: {
        fontFamily: Constants.fontFamily,
        fontSize: 18,
    },
    progressBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    progressBarBg: {
        width: '82%',
        height: 8,
        backgroundColor: '#E1E1E1',
        borderRadius: Constants.borderRadius,
    },
    progressBarFront: {
        backgroundColor: Constants.colors.primaryColor,
        borderRadius: Constants.borderRadius,
        height: 8,
        position: 'absolute',
    },
    ageAndGender: {
        marginTop: 50,
        backgroundColor: Constants.colors.whiteColor,
        borderRadius: 20,
        padding: Constants.padding,
    },
    ageAndGenderHeading: {
        fontFamily: Constants.fontFamily,
        fontSize: 18,
        fontWeight: '700',
        marginBottom: Constants.margin,
    },
    circularChartContainer: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    circularBarLabel: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    graphColorMale: {
        width: 10,
        height: 10,
        backgroundColor: '#00A928',
        borderRadius: 10,
    },
    label: {
        fontFamily: Constants.fontFamily,
        marginStart: Constants.margin | +20,
        marginEnd: Constants.margin,
        fontSize: 16,
    },
    value: {
        fontFamily: Constants.fontFamily,
        marginStart: Constants.margin,
        fontWeight: '800',
        fontSize: 16,
    },
    graphColorFemale: {
        width: 10,
        height: 10,
        backgroundColor: '#70CF87',
        borderRadius: 10,
    },
    recentOrderContainer: {
        marginTop: 50,
        paddingBottom: 220,
    },
    orderHeading: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    heading: {
        fontFamily: Constants.fontFamily,
        fontSize: 20,
        fontWeight: '800',
    },
    viewAll: {
        fontFamily: Constants.fontFamily,
        color: Constants.colors.primaryColor,
        fontSize: 16,
        textDecorationColor: Constants.colors.primaryColor,
        textDecorationStyle: 'solid',
        textDecorationLine: 'underline',
    },
    tableContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 25,
    },
    orderTableHeading: {
        fontFamily: Constants.fontFamily,
    },
    divider: {
        width: '100%',
        height: 1,
        backgroundColor: '#9F9F9F',
        marginTop: 16,
        marginBottom: 16,
    },
    switchContainer: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        right: 0,
        zIndex: 999,
        alignItems: 'center',
        justifyContent: 'center',
    },
    switchAccountContainer: {
        backgroundColor: Constants.colors.whiteColor,
        padding: Constants.padding,
        width: '85%',
        left: '0%',
        right: '10%',
        backgroundColor: Constants.colors.bodyBg,
    },
    switchHeading: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    heading: {
        fontSize: 22,
        fontFamily: Constants.fontFamily,
        fontWeight: '800',
    },
    switchText: {
        fontFamily: Constants.fontFamily,
        marginTop: Constants.margin,
        marginBottom: Constants.margin,
    },
    account: {
        backgroundColor: Constants.colors.whiteColor,
        padding: 10,
        borderRadius: Constants.borderRadius,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    accountName: {
        fontFamily: Constants.fontFamily,
        fontSize: 20,
        fontWeight: '800',
    },
    accountType: {
        fontFamily: Constants.fontFamily,
        color: '#A4A4B2',
        fontSize: 18,
    },
    switchAc: {
        alignSelf: 'center',
        width: 20,
        height: 20,
        marginTop: 20,
        marginBottom: 20,
    },
    menubg: {
        flex: 1,
        backgroundColor: 'rgba(4,56,16,1)',
    },
    mainArea: {
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
    },
    drawerItemContainer: {
        marginTop: 12,
        padding: 12,
        paddingLeft: 0,
        flexGrow: 1,
    },
    drawerItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    menuName: {
        fontFamily: Constants.fontFamily,
        color: Constants.colors.whiteColor,
        fontWeight: '700',
        fontSize: 18,
        marginLeft: 12,
    },
    productDetailsBg: {
        height: '100%',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        zIndex: 1,
    },
    header: {
        padding: Constants.padding,
        paddingStart: 12,
        height: 120,
        marginTop: 20,
    },
    profileDetails: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#676767',
        width: '62%',
        paddingBottom: Constants.padding,
    },
    profileIcon: {
        borderRadius: Constants.borderRadius,
        borderWidth: 1,
        borderColor: '#000000',
        padding: 8,
        marginEnd: 6,
    },
    preofileName: {
        fontFamily: Constants.fontFamily,
        fontSize: 20,
        fontWeight: '700',
        color: Constants.colors.whiteColor,
    },
    founder: {
        color: '#424242',
        opacity: 0.78,
        fontFamily: Constants.fontFamily,
        color: Constants.colors.whiteColor,
    },
})
export default HomeScreen