import React, { useEffect, useState, useRef } from 'react'
import {
    View,
    Text,
    ScrollView,
    Image,
    StyleSheet,
    FlatList,
    Animated,
    StatusBar,
    Dimensions,
    Modal,
    ActivityIndicator,
    TouchableOpacity
} from 'react-native'
import SearchBar from '../../../components/business/SearchBar'
import LinearGradient from 'react-native-linear-gradient'
import { LineChart, ProgressChart } from 'react-native-chart-kit'
import CustomAppBar from '../../../components/business/CustomAppBar'
import Constants from '../../../shared/Constants'
import Images from '../../../assets/images/Images'
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable'
import globatStyles from '../../../shared/globatStyles'
import RenderRecentOrders from './RenderRecentOrders'
import { useNavigation } from '@react-navigation/native'
import CustomTabNavigationAdmin from '../../../navigations/CustomTabNavigationAdmin'
import Feather from 'react-native-vector-icons/Feather'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Entypo from 'react-native-vector-icons/Entypo'
import Octicons from 'react-native-vector-icons/Octicons'
import Toast from 'react-native-simple-toast'
import PieChart from 'react-native-pie-chart';
import axios from 'axios'
import DashBoardLoader from './DashBoardLoader'
import ReactDatamaps from "react-india-states-map";
import { inMill } from '@react-jvectormap/spain'
import FastImage from 'react-native-fast-image'
import AsyncStorage from '@react-native-async-storage/async-storage'


const HomeScreen = (props) => {
    const [tabs, setTabs] = useState('city')
    const [showSwitchAcountModal, setShowSwitchAcountModal] = useState(props.route.params ? props.route.params.switchAccount : false)
    const navigation = useNavigation()
    const [showDrawer, setShowDrawer] = useState(false)
    const [activeMenu, setActiveMenu] = useState('')
    const [loader, setLoader] = useState(false)
    const [dashBoardData, setdashBoardData] = useState()
    const [maleData, setmaleData] = useState([])
    const [femaleData, setfemaleData] = useState([])
    const [maleValue, setmaleValue] = useState(0)
    const [femaleValue, setfemaleValue] = useState(0)
    const [modalLoader, setmodalLoader] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)

    const offsetValue = useRef(new Animated.Value(0)).current
    const screenWidth = Dimensions.get("window").width;
    const scaleValue = useRef(new Animated.Value(1)).current
    const showToastmsg = (msg) => {
        Toast.show(msg, Toast.LONG)
    }
    const openDrawer = () => {
        setShowDrawer(!showDrawer)
        console.log("open drawer : ", showDrawer);

    }
    const closeDrawer = () => {
        setShowDrawer(!showDrawer)
    }
    const allSum = (dataval) => {
        let sum = 0;

        for (const key in dataval) {
            sum += dataval[key];
        }
        return sum
    }

    const switchAcBtn = async () => {
        // console.log("Switch Button Working Of Accounts")
        // console.log({
        //     user_id:props?.route?.params?.userDetails?.id,
        //     user_type:props?.route?.params?.userDetails?.role_id
        // })
        let fcmtoken = await AsyncStorage.getItem("fcmtoken");
        setmodalLoader(true)
        axios.post(`${Constants.BASE_URL}auth/switch-user`,
            //body start->
            {
                user_id: props?.route?.params?.userDetails?.id,
                user_type: props?.route?.params?.userDetails?.role_id
            })
            .then((response) => {
                setmodalLoader(false)

                // if (!response.data.error) {
                //     navigation.navigate('/business-login', { login_type: "Advertiser", userName: props?.route?.params?.userDetails?.name })
                //     showToastmsg("User Switch Sucessfully")
                //     console.log("reponse=>", response.data.error)
                // }
                // else {
                //     showToastmsg("Something went wrong. Please try again.")
                // }



                try {
                    if (!response.data.error) {
                        axios.post(`${Constants.BASE_URL}auth/device-token`, {
                            user_id: response?.data?.data?.user_details?.id,
                            device_token: fcmtoken
                        })
                        { console.log('response?.data?.user___.id', response?.data?.data?.user_details?.id) }
                        axios.post("https://testfcm.com/api/notify",
                            {
                                "postBody": {
                                    "notification": {
                                        "title": `Welcome ${response?.data?.data?.user_details?.name} !`,
                                        "body": `You have logged in as Advertiser successfully`,
                                        "click_action": null,
                                        "icon": null
                                    },
                                    "data": null,
                                    "to": fcmtoken
                                },
                                "serverKey": "AAAAdLYZPyI:APA91bFVhnrT3tUYJWS5aKMBM9ObqK4LBFIrhwS5CoHHKlnORXOIadVwpjE4QTXMKicbQTxifccSdphB2EF7Jw_jCkyjHciMHGlQ0zvufnNHtAifxqUgQ0Ww01XprMn8a2dVa4EKsNc8"
                            }
                        ).then((resp) => {
                            setIsLoading(false)

                        })
                            .catch((error) => {
                                setIsLoading(false)
                            })
                        showToastmsg("Login successfull")
                        AsyncStorage.setItem("userDetails", JSON.stringify(response?.data?.data?.user_details));
                        AsyncStorage.setItem("userType", JSON.stringify("Advertiser"));
                        { navigation.navigate('/influencer-stack-navigation', { userDetails: response?.data?.data?.user_details, userType: "Advertiser" }) }

                        // await AsyncStorage.setItem('users', JSON.stringify({ token: response.data.token, userRole: props?.route?.params?.login_type, userDetails: response.data.user }))
                    }
                    else {
                        setIsLoading(false)
                        showToastmsg('Login cred. or password is invalid')
                    }
                } catch (error) {
                    console.log(error)
                }
            })
            .catch((error) => {
                setmodalLoader(false)
                console.log("error=>", error);
                showToastmsg("Something went wrong. Please try again.")
            })
    }
    const chartConfig = {
        backgroundGradientFrom: "#FFFFFF",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#FFFFFF",
        backgroundGradientToOpacity: 0.5,
        decimalPlaces: 0,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 10,
        useShadowColorFromDataset: false // optional
    }

    const data = {
        labels: ["15-25", "26-35", "36-45", "46-55", "56-65", "65+"],
        datasets: [
            {
                data: maleData ? maleData : [],
                color: (opacity = 1) => `#04751F`, // optional
                strokeWidth: 2 // optional
            },
            {
                data: femaleData ? femaleData : [],
                color: (opacity = 1) => `#70CF87`, // optional
                strokeWidth: 2 // optional
            }
        ],
    }
    const orders = [
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
        {
            id: 3,
            img: Images.recentOrdersOne,
            name: 'Statue of Boris',
            quantity: 10,
            buyers: 55
        },
        {
            id: 4,
            img: Images.recentOrdersTwo,
            name: 'Statue of Boris',
            quantity: 16,
            buyers: 40
        },
    ]
    const gotoAllOrders = () => {
        navigation.navigate('/all-orders')
    }
    function isImage(url) {
        return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
    }
    const getDashBoardData = () => {
        setLoader(true)
        axios.post(`${Constants.BASE_URL}business/get-dashboard-details`, {
            user_id: props?.route?.params?.userDetails?.id
        })
            .then((response) => {

                let tempdata = response?.data?.Dashboard
                if (Array.isArray(response?.data?.dashboardDetails?.cities)) {
                    tempdata.cities = {}
                }
                if (Array.isArray(response?.data?.data?.dashboardDetails?.country)) {
                    tempdata.country = {}
                }
                console.log("rssss=>", tempdata);
                setdashBoardData(tempdata);
                setmaleData(Object.values(tempdata.AgeRange))
                setmaleValue(parseInt(tempdata?.Gender["male"]))
                setfemaleValue(parseInt(tempdata?.Gender["female"]))
                setfemaleData(Object.values(tempdata.agerange))


                setTimeout(() => {
                    setLoader(false)
                }, 1000);
            })
            .catch((error) => {
                setLoader(false)
                console.log("error->", error);
                // showToastmsg("Something went wrong for dashboard!")
            })
    }
    useEffect(() => {
        setActiveMenu('')
        console.log("user details", props?.route?.params?.userDetails?.role_id);
        console.log("user details", props?.route?.params?.userDetails?.id);
        getDashBoardData()
    }, [props])
    const EmptyListMessage = ({ item }) => {
        return (
            // Flat List Item
            <Text
                style={styles.emptyListStyle}
            >
                No Data Found
            </Text>
        );
    };
    return (
        <View style={globatStyles.wrapper}>
            {console.log("dashsboard_recent_order=>",props?.route?.params?.userDetails?.privilages)}

            {
                Animated?.timing(scaleValue, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: false,
                }).start()
            }
            {
                Animated?.timing(offsetValue, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: false,
                }).start()
            }
            {showDrawer && <View style={styles.menubg}>
                <StatusBar translucent={true} backgroundColor={'transparent'} />
                <View style={styles.header}>
                {console.log("privalage",props?.route?.params)}

                    <View style={styles.profileDetails}>
                        <Pressable onPress={openDrawer} style={{ zIndex: 999, paddingTop: 10 }}><AntDesign name='close' size={26} style={{ paddingRight: 10 }} /></Pressable>
                        <Pressable style={styles.profileIcon} onPress={() => props.navigation.navigate('/profileScreen', { userDetails: props?.route?.params?.userDetails })}>
                            {/* {console.log("props image=>", props?.route?.params?.userDetails?.business)} */}
                            <FastImage source={isImage(props?.route?.params?.userDetails?.business.business_profile_pic) ?
                                { uri: `${Constants.BASE_IMAGE_URL}${props?.route?.params?.userDetails?.business?.business_profile_pic}` }
                                :
                                Images.avatar} style={{ width: 60, height: '100%', borderRadius: Constants.borderRadius, }} />
                        </Pressable>
                        <View>
                            <Text style={styles.preofileName}>{props?.route?.params?.userDetails?.name.length > 20 ? props?.route?.params?.userDetails?.name.slice(0, 20) + '...' : props?.route?.params?.userDetails?.name}</Text>
                            <Text style={styles.founder}>{Object.keys(props.route.params.userDetails)[Object.keys(props.route.params.userDetails).length - 1]}</Text>
                        </View>
                    </View>
                </View>
                <ScrollView style={styles.drawerItemContainer}>
                    {
                        setMenuItem(setActiveMenu, activeMenu, 'ant', 'layout', 'Influencer Pillars', navigation, '/my-pillars', props)
                    }
                    {
                        setMenuItem(setActiveMenu, activeMenu, 'ant', 'layout', 'Advertiser Pillars', navigation, '/Advertiser-Pillar', props)
                    }
                    {
                        setMenuItem(setActiveMenu, activeMenu, 'fa5', 'confluence', 'Influencer list', navigation, '/influencer-list', props)
                    }
                    {
                        setMenuItem(setActiveMenu, activeMenu, 'fa5', 'confluence', 'Advertiser list', navigation, '/advertiserList-list', props)
                    }
                    {
                        setMenuItem(setActiveMenu, activeMenu, 'image', 'arrow-switch', 'Switch View As', navigation, '/about', props, setModalVisible, modalVisible, setShowDrawer)
                    }
                    {
                        setMenuItem(setActiveMenu, activeMenu, 'fa5', 'users', 'User Management', navigation, '/user-management', props)
                    }
                    {
                        setMenuItem(setActiveMenu, activeMenu, 'ant', 'setting', 'Settings', navigation, '/settings', props)
                    }
                    {
                        setMenuItem(setActiveMenu, activeMenu, 'feather', 'help-circle', 'Help/Support', navigation, '/HelpAnd-Supports', props)

                    }
                    {
                        setMenuItem(setActiveMenu, activeMenu, 'feather', 'alert-octagon', 'About', navigation, '/About', props)
                    }

                </ScrollView>
                <Pressable
                    onPress={() => navigation.navigate('/')}
                    style={{ flexDirection: 'row', margin: 12, marginLeft: 0, backgroundColor: 'rgba(0, 169, 40, 0.1)', padding: 16, paddingRight: 0 }}>
                    <AntDesign name='logout' size={22} color={'black'} style={{ marginLeft: 12 }} />
                    <Text style={{ color: 'black', fontFamily: Constants.fontFamily, fontWeight: '700', fontSize: 18, marginLeft: 12 }}>Logout</Text>
                </Pressable>
            </View>}
            <Animated.View style={{
                opacity: showDrawer ? 0.3 : 1, position: 'absolute', zIndex: 1, top: 0, right: 0, bottom: 0, left: 0, backgroundColor: '#E5E5E5', transform: [
                    { scale: scaleValue ? scaleValue : 0 },
                    { translateX: offsetValue ? offsetValue : 0 }
                ]
            }}>
                {/* <View> */}
                <CustomAppBar name={props?.route?.params?.userDetails?.name} navigation={props.navigation} isMainscreen={true} isReel={false} openDrawer={openDrawer} showDrawer={showDrawer} />
                <ScrollView style={styles.container}>
                    {/* <SearchBar /> */}
                    <View style={styles.totalRevenue}>

                        {loader ? <DashBoardLoader height={50} /> : <><View>
                            <Text style={styles.totalRTevinueText}>Total Revenue</Text>
                            <LinearGradient colors={['rgba(1, 170, 41, 0.09)', 'rgba(196, 196, 196, 0) 102.22%)']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.gradientBg}>
                                <Image source={Images.lineGraphIcon} />
                            </LinearGradient>
                        </View>

                            <View>
                                <Text style={styles.totalRevinue}><FontAwesome size={18} name='rupee' style={styles.rupeeIcon} /> {dashBoardData?.Revenue?.TotalRevenue ? parseFloat(parseFloat(dashBoardData?.Revenue?.TotalRevenue).toFixed(2)).toLocaleString() : "0.00"}</Text>
                                <View style={styles.percentage}>
                                    <AntDesign name='arrowup' size={22} color={Constants.colors.primaryColor} />
                                    <Text style={styles.numberInPercentage}>{dashBoardData?.revenue ? "5.86" : "0.00"}%</Text>
                                </View>
                            </View>
                        </>
                        }
                    </View>
                    <View style={styles.impression}>
                        {loader ?
                            <View style={styles.impressionBox}>
                                <DashBoardLoader height={100} />
                            </View>
                            :
                            <View style={styles.impressionBox}>
                                <Text style={styles.impressionText}>Impressions</Text>
                                <Text style={styles.impressionValue}>
                                    {/* <FontAwesome size={18} name='rupee' style={styles.rupeeIcon} />  */}
                                    {dashBoardData?.Impression?.TotalViews ? parseFloat(parseFloat(dashBoardData?.Impression?.TotalViews).toFixed(2)).toLocaleString() : "0.00"}</Text>
                                <View style={{ flexDirection: 'row', marginTop: 12, }}>
                                    <AntDesign name='arrowup' size={18} color={Constants.colors.primaryColor} />
                                    <Text style={styles.impressionInPercentage}>{dashBoardData?.impresion ? "8.6" : "0.00"}%</Text>
                                </View>
                            </View>}
                        {loader ?
                            <View style={styles.impressionBox}>
                                <DashBoardLoader height={100} />
                            </View>
                            : <View style={styles.impressionBox}>
                                <Text style={styles.impressionText}>Conversions</Text>
                                <Text style={styles.impressionValue}>{dashBoardData?.oders ? parseFloat(parseFloat(dashBoardData?.oders).toFixed(2)).toLocaleString() : "0.00"}</Text>
                                <View style={{ flexDirection: 'row', marginTop: 12, }}>
                                    <AntDesign name='arrowup' size={18} color={Constants.colors.primaryColor} />
                                    <Text style={styles.impressionInPercentage}>{dashBoardData?.oders ? "8.6" : "0.00"}%</Text>
                                </View>
                            </View>}
                    </View>
                    <View style={styles.impression}>
                        {loader ?
                            <View style={styles.impressionunderBox}>
                                <DashBoardLoader height={100} />
                            </View>
                            : <View style={styles.impressionunderBox}>

                                <Text style={styles.impressionunderText}>Orders</Text>
                                <Text style={styles.impressionValue}>{dashBoardData?.Order?.TotalOrders ? parseFloat(parseFloat(dashBoardData?.Order?.TotalOrders).toFixed(2)).toLocaleString() : "0.00"}</Text>
                                <View style={{ flexDirection: 'row', marginTop: 12, alignItems: 'center' }}>
                                    <AntDesign name='arrowup' size={18} color={Constants.colors.primaryColor} />
                                    <Text style={styles.impressionInPercentage}>{dashBoardData?.oders ? "8.6" : "0.00"}%</Text>
                                </View>
                            </View>}
                        {loader ?
                            <View style={styles.impressionunderBox}>
                                <DashBoardLoader height={100} />
                            </View>

                            :
                            <Pressable style={styles.impressionunderBox} onPress={() => navigation.navigate('/Sales-Dashboard', { userDetails: props?.route?.params?.userDetails })}>
                                <Text style={styles.impressionunderText}>Sales</Text>
                                <Text style={styles.impressionValue}>{dashBoardData?.Sale?.ThisMonthSale ? parseFloat(parseFloat(dashBoardData?.Sale?.ThisMonthSale).toFixed(2)).toLocaleString() : "0.00"}
                                </Text>
                                <View style={{ flexDirection: 'row', marginTop: 12, }}>
                                    <AntDesign name='arrowup' size={18} color={Constants.colors.primaryColor} />
                                    <Text style={styles.impressionInPercentage}>{dashBoardData?.oders ? "5.86" : "0.00"}%</Text>
                                </View>
                            </Pressable>

                        }
                        {console.log('checking_', props?.route?.params?.userDetails?.business?.business_id)}
                        {loader ?
                            <View style={styles.impressionunderBox}>
                                <DashBoardLoader height={100} />
                            </View>
                            : <Pressable style={styles.impressionunderBox} onPress={() => navigation.navigate('/Returns-Dashboard', { business_id: props?.route?.params?.userDetails?.business?.business_id })}>
                                <Text style={styles.impressionunderText}>Returns</Text>
                                {console.log("=====", dashBoardData?.Return?.TotalReturns)}
                                <Text style={styles.impressionValue}>{dashBoardData?.Return?.TotalReturns ? parseFloat(parseFloat(dashBoardData?.Return?.TotalReturns).toFixed(2)).toLocaleString() : "0.00"}
                                </Text>
                                <View style={{ flexDirection: 'row', marginTop: 12, }}>
                                    <AntDesign name='arrowup' size={18} color={Constants.colors.primaryColor} />
                                    <Text style={styles.impressionInPercentage}>{dashBoardData?.oders ? "5.86" : "0.00"}%</Text>
                                </View>
                            </Pressable>}
                    </View>

                    <View style={styles.countryWise}>
                        <View style={styles.tabContainer}>
                            <Pressable onPress={() => setTabs('city')} style={{ ...styles.tabs, backgroundColor: tabs === 'city' ? Constants.whiteColor : 'rgba(229, 235, 237, 0.38)', }}><Text style={{ ...styles.tabText, fontWeight: tabs === 'city' ? '800' : '400', }}>Cities</Text></Pressable>
                            <Pressable onPress={() => setTabs('country')} style={{ ...styles.tabs, backgroundColor: tabs === 'country' ? Constants.whiteColor : 'rgba(229, 235, 237, 0.38)', }}><Text style={{ ...styles.tabText, fontWeight: tabs === 'country' ? '800' : '400', }}>Countries</Text></Pressable>
                        </View>
                        {
                            loader ?
                                <DashBoardLoader height={250} />
                                :
                                tabs === 'city' ?
                                    dashBoardData?.cities &&
                                        Object.keys(dashBoardData?.cities)?.length != 0 ?
                                        (<View style={styles.tabContent}>
                                            {/* {console.log("aaaa+.",Object.keys(dashBoardData?.cities))} */}
                                            {
                                                Object.keys(dashBoardData?.cities)?.map((item) =>
                                                    <>
                                                        <Text style={styles.cityName}>{item ? item : "-"}</Text>
                                                        <View style={styles.progressBar}>
                                                            <View style={{ flex: 5 }}>
                                                                <View style={styles.progressBarBg}></View>
                                                                <View style={{
                                                                    ...styles.progressBarFront, width:
                                                                        `${((dashBoardData?.cities[item] * 100) /
                                                                            allSum((dashBoardData?.cities)))}%`
                                                                }}></View></View>
                                                            <Text style={{ flex: 1 }}>{dashBoardData?.cities[item] ? parseFloat((dashBoardData?.cities[item] * 100) /
                                                                allSum((dashBoardData?.cities))
                                                            ).toFixed(2) : "0.0"}%</Text>
                                                        </View>
                                                    </>

                                                )
                                            }



                                            {/* <VectorMap map={inMill}  /> */}
                                            {/* <Image source={Images.indiaMap} style={{alignSelf: 'center',}} /> */}
                                        </View>)
                                        :
                                        (<View style={styles.tabContent}>
                                            <View style={globatStyles.noData}>
                                                <AntDesign name='delete' size={36} color='#F1F1F1' />
                                                <Text>No Data Found</Text>
                                            </View>
                                        </View>)
                                    : (
                                        Object.keys(dashBoardData?.country)?.length != 0 ?
                                            (<View style={styles.tabContent}>
                                                {
                                                    Object.keys(dashBoardData?.country)?.map((item) =>
                                                        <>
                                                            <Text style={styles.cityName}>{item ? item : "-"}</Text>
                                                            <View style={styles.progressBar}>
                                                                <View style={styles.progressBarBg}></View>
                                                                <View style={{
                                                                    ...styles.progressBarFront, width:
                                                                        `${((dashBoardData?.country[item] * 100) /
                                                                            allSum((dashBoardData?.country)))}%`
                                                                }}></View>
                                                                <Text>{dashBoardData?.country[item] ? parseFloat((dashBoardData?.country[item] * 100) /
                                                                    allSum((dashBoardData?.country))
                                                                ).toFixed(2) : "0.0"}%</Text>
                                                            </View>
                                                        </>

                                                    )
                                                }
                                                {/* {console.log("aaaa+.",Object.keys(dashBoardData?.country))} */}
                                                {/* <Image source={Images.indiaMap} style={{alignSelf: 'center',}} /> */}
                                            </View>)
                                            :
                                            (<View style={styles.tabContent}>
                                                <View style={globatStyles.noData}>
                                                    <AntDesign name='delete' size={36} color='#F1F1F1' />
                                                    <Text>No Data Found</Text>
                                                </View>
                                            </View>)
                                    )
                        }
                    </View>

                    {loader ?
                        <View style={styles.ageAndGender}>
                            <Text style={styles.ageAndGenderHeading}>Age Range & Gender</Text>

                            <DashBoardLoader />
                        </View>
                        :

                        <View style={styles.ageAndGender}>
                            <Text style={styles.ageAndGenderHeading}>Age Range & Gender</Text>
                            {maleData.length > 0 || femaleData.length > 0 ? <LineChart
                                data={data}
                                width={Constants.width}
                                fromZero={true}
                                height={220}
                                chartConfig={chartConfig}
                                yAxisSuffix='%'
                                barPercentage='10'
                                withInnerLines={false}
                                withOuterLines={true}
                                withShadow={false}
                                style={{
                                    marginLeft: -26,
                                }}
                            /> :
                                <View style={styles.tabContent}>
                                    <View style={[globatStyles.noData,
                                        // {minHeight:50}
                                    ]}>
                                        <AntDesign name='delete' size={26} color='#F1F1F1' />
                                        <Text>No Data Found</Text>
                                    </View>
                                </View>
                            }
                            <View style={styles.circularChartContainer}>
                                <View>
                                    <View style={styles.circularBarLabel}>
                                        <View style={styles.graphColorMale}></View>
                                        <Text style={styles.label}>Men</Text>
                                        <Text styles={styles.value}>

                                            {isNaN(parseFloat((maleValue * 100) /
                                                allSum((dashBoardData?.Gender))).toFixed(2)) ? "0.0" : parseFloat((maleValue * 100) /
                                                    allSum((dashBoardData?.Gender))).toFixed(2)}%
                                        </Text>
                                    </View>
                                    <View style={styles.circularBarLabel}>
                                        <View style={styles.graphColorFemale}></View>
                                        <Text style={styles.label}>Women</Text>
                                        <Text styles={styles.value}>{isNaN(parseFloat((femaleValue * 100) /
                                            allSum((dashBoardData?.Gender))).toFixed(2)) ? "0.0" : parseFloat((femaleValue * 100) /
                                                allSum((dashBoardData?.Gender))).toFixed(2)}%</Text>
                                    </View>
                                </View>
                                {maleValue > 0 || femaleValue > 0 ?
                                    <PieChart
                                        widthAndHeight={100}
                                        series={[maleValue, femaleValue]}
                                        doughnut={true}
                                        sliceColor={["#04751F", "#70CF87"]}
                                        coverFill={'#FFF'}
                                    /> :
                                    <View style={styles.tabContent}>
                                        <View style={[globatStyles.noData, { minHeight: 50 }]}>
                                            <AntDesign name='delete' size={26} color='#F1F1F1' />
                                            <Text>No Data Found</Text>
                                        </View>
                                    </View>
                                }
                            </View>
                        </View>}

                    <View style={styles.recentOrderContainer}>
                        <View style={styles.orderHeading}>
                            <Text style={styles.heading}>Recent Orders</Text>
                            <Pressable onPress={gotoAllOrders}><Text style={styles.viewAll}>View All</Text></Pressable>
                        </View>
                        <View style={styles.tableContainer}>
                            <Text style={styles.orderTableHeading}>Image</Text>
                            <Text style={[styles.orderTableHeading, { flex: 4 }]}>Product Name</Text>
                            <Text style={styles.orderTableHeading}>Quantity</Text>
                            <Text style={styles.orderTableHeading}>Buyers</Text>
                        </View>
                        <View style={styles.divider}></View>
                        {loader ?
                            <DashBoardLoader />
                            : <FlatList
                                data={dashBoardData?.RecentOrder}
                                keyExtractor={item => item?.id?.toString()}
                                ListEmptyComponent={EmptyListMessage}
                                renderItem={(item) => <RenderRecentOrders order={item}
                                />}
                            />}
                    </View>

                </ScrollView>
                {
                    showSwitchAcountModal ? <View style={styles.switchContainer}>
                        <View style={globatStyles.overlay}></View>
                        <View style={styles.switchAccountContainer}>
                            <View style={styles.switchHeading}>
                                <Text style={styles.heading}>Switch View As</Text>
                                <AntDesign name='close' size={20} color='#000000' onPress={() => setShowSwitchAcountModal(false)} />
                            </View>
                            <Text style={styles.switchText}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut .
                            </Text>
                            <View style={styles.accountContainer}>
                                <View style={styles.account}>
                                    <Image source={Images.avatar} style={{ marginRight: 20, }} alt='Img' />
                                    <View>
                                        <Text style={styles.accountName}>Robert Phan</Text>
                                        <Text style={styles.accountType}>Account Type</Text>
                                    </View>
                                </View>
                                <View>
                                    <Image source={Images.switchAc} style={styles.switchAc} />
                                </View>
                                <View style={[styles.account, { backgroundColor: Constants.colors.inputBgColor, }]}>
                                    <Image source={Images.avatar} style={{ marginRight: 20, }} alt='Img' />
                                    <View>
                                        <Text style={styles.accountName}>Robert_Phan123</Text>
                                        <Text style={styles.accountType}>Advertiser Account</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View> : null
                }
                <CustomTabNavigationAdmin navigation={navigation} showDrawer={showDrawer} activeTab='home'
                    propValue={props?.route?.params?.userDetails}
                />

            </Animated.View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    //   Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                    setShowDrawer(true)
                }}
            >

                <View style={[styles.centeredView,
                    // {backgroundColor:"rgba(0, 38, 17, 0.64)"}
                ]}>
                    <View style={styles.modalView}>
                        <View style={styles.switchViewText}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', paddingRight: 80 }}>Switch View As</Text>
                        </View>
                        <View style={styles.modalconatiner}>
                            <View style={{ display: "flex", justifyContent: 'flex-end', flexDirection: 'row', width: '100%', paddingTop: 20 }}>
                                <AntDesign name='close' size={23} color='#000000' onPress={() => { setModalVisible(!modalVisible); setShowDrawer(true) }} />
                            </View>
                        </View>
                        <Text style={styles.switchText}>
                            Your account has been switched to an Advertiser Account giving you access to advertising features.
                        </Text>
                        <View style={styles.accountContainer}>

                            <View style={[styles.account, styles.modalCard1]}>
                                <Image source={Images.avatar} style={{ marginRight: 20, }} alt='Img' />
                                <View>
                                    <Text style={styles.accountName}>{props?.route?.params?.userDetails?.name}</Text>
                                    <Text style={styles.accountType}>Business Account</Text>
                                </View>
                            </View>

                            <Pressable onPress={switchAcBtn}>
                                {modalLoader ?
                                    <ActivityIndicator style={[styles.switchAc, styles.activityIndicator]} />
                                    :
                                    <>
                                        <View style={{
                                            marginTop: 20,
                                            marginBottom: 20,
                                        }}>
                                            <Image source={Images.switchAc} style={styles.switchAc} />
                                            <Text style={{ fontSize: 12, alignSelf: 'center', color: '#000000', }}> click here to switch </Text>
                                        </View>
                                    </>}
                            </Pressable>
                            <Pressable onPress={switchAcBtn}>

                                <View style={[styles.account, styles.modalCard2]}>
                                    <Image source={Images.avatar} style={{ marginRight: 20, }} alt='Img' />
                                    <View>
                                        <Text style={styles.accountName}>{props?.route?.params?.userDetails?.name}</Text>
                                        <Text style={styles.accountType}>Advertiser Account</Text>
                                    </View>
                                </View>

                            </Pressable>

                        </View>
                    </View>
                </View>
            </Modal>
            {/* </View> */}
        </View>
    )
}

const setMenuItem = (setActiveMenu, activeMenu, icon, iconName, title, navigation, url, props, setModalVisible, modalVisible, setShowDrawer) => {
    const modalFunction = () => {
        setModalVisible(!modalVisible)
        setShowDrawer(false)
    }
    return (
        <Pressable style={[styles.drawerItem, { backgroundColor: activeMenu === title ? 'rgba(0, 169, 40, 0.1);' : 'transparent', padding: 14 }]} onPress={() => {
            setActiveMenu(title)
            title === "Switch View As" ?
                modalFunction() :
                navigation.navigate(url, { userDetails: props.route.params.userDetails })
        }}>
            {
                icon === 'feather' ? <Feather name={iconName} size={26} color={'black'} /> : null
            }
            {
                icon === 'fa5' ? <FontAwesome5 name={iconName} size={26} color={'black'} /> : null
            }
            {
                icon === 'ant' ? <AntDesign name={iconName} size={26} color={'black'} /> : null
            }
            {
                icon === 'en' ? <Entypo name={iconName} size={26} color={'black'} /> : null
            }
            {
                icon === 'oct' ? <Octicons name={iconName} size={26} color={'black'} /> : null
            }
            {
                icon === 'fa' ? <FontAwesome name={iconName} size={26} color={'black'} /> : null
            }
            {
                icon === 'image' ? <Image source={Images.switchBlack} /> : null
            }
            <Text style={[styles.menuName]}>{title}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    menubg: {
        flex: 1,
        zIndex: 2,
        width: '80%',
        backgroundColor: '#fff',
    },
    menuName: {
        fontFamily: Constants.fontFamily,
        color: 'black',
        fontWeight: '700',
        fontSize: 18,
        marginLeft: 12,
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
        // width: '62%',
        paddingBottom: Constants.padding,
    },
    profileIcon: {
        borderRadius: Constants.borderRadius,
        // borderWidth: 1,
        // borderColor: '#000000',
        padding: 0,
        marginEnd: 6,
        marginTop: 10
    },
    preofileName: {
        fontFamily: Constants.fontFamily,
        fontSize: 20,
        fontWeight: '700',
        color: 'black',
        textTransform: "capitalize",
        flexWrap:'wrap',
        width:170,
        overflow: 'hidden'
    },
    founder: {
        color: 'black',
        opacity: 0.78,
        fontFamily: Constants.fontFamily,
        // color: Constants.colors.whiteColor,
        textTransform: "capitalize"
    },
    drawerItemContainer: {
        marginTop: 12,
        padding: 12,
        // paddingLeft: 0,
        flexGrow: 1,
    },
    drawerItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    container: {
        padding: Constants.padding,
        // paddingBottom: 100,
    },
    totalRevenue: {
        backgroundColor: Constants.colors.whiteColor,
        padding: Constants.padding,
        borderRadius: 20,
        // marginTop: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
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
    impressionunderBox: {
        padding: Constants.padding,
        backgroundColor: Constants.colors.whiteColor,
        width: '30%',
        borderRadius: 20,
        // justifyContent: 'center',
        alignItems: 'center',
        height: 140,

    },
    impressionText: {
        fontFamily: Constants.fontFamily,
        fontSize: 20,
        fontWeight: '400',
    },
    impressionunderText: {
        fontFamily: Constants.fontFamily,
        fontSize: 18,
        fontWeight: '300',
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
        marginTop: 20,
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
        backgroundColor: '#04751F',
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
        paddingBottom: 120,
        marginBottom: 200
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
        fontFamily: 'Aviner',
        color: '#01AA29',
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
        flex: 3
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

    },
    activityIndicator: {
        marginBottom: 20,
        marginTop: 20
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        // marginTop: 22,

    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        // borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    modalheading: {
        top: -150,
    },
    modalCard1: {
        backgroundColor: 'white',
        elevation: 5,
        borderRadius: 15,
    },
    modalCard2: {
        backgroundColor: '#F8F8F8',
        elevation: 5,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: '#c0c0c0'
    },

    switchViewText: {
        top: 7,
        fontWeight: 'bold',
        fontFamily: 'Avenir',
    },
    modalconatiner: {
        position: 'absolute',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    emptyListStyle: {
        padding: 10,
        fontSize: 15,
        marginTop: 10,
        textAlign: 'center',
        fontWeight: '700'
    },
})
export default HomeScreen