import React, { useRef, useState } from 'react'
import {
    View,
    Text,
    ScrollView,
    Image,
    StyleSheet,
    StatusBar,
    Pressable,
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import CustomAppBar from '../../../components/admin/CustomAppBar'
import Constants from '../../../shared/Constants'
import Images from '../../../assets/images/Images'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useNavigation } from '@react-navigation/native'
import { LineChart } from 'react-native-chart-kit'
import { DonutChart } from 'react-native-circular-chart'
import globatStyles from '../../../shared/globatStyles'

const HomeScreen = (props) => {
    const navigation = useNavigation()
    const [tabs, setTabs] = useState('city')
    const [userTab, setUserTab] = useState('explorer')
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
                data: [20, 45, 28, 80, 99, 43],
                color: (opacity = 1) => `#00A928`, // optional
                strokeWidth: 2 // optional
            },
            {
                data: [10, 25, 35, 26, 34, 15],
                color: (opacity = 1) => `#70CF87`, // optional
                strokeWidth: 2 // optional
            }
        ],
    }
    return (
        <View style={{ flex: 1, }}>
            <StatusBar translucent={true} backgroundColor='transparent' />
            <CustomAppBar navigation={props.navigation} isMainscreen={false} isReel={false} title='Users' />
            <ScrollView>
                <Text style={{ fontFamily: Constants.fontFamily, margin: Constants.margin, }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut .</Text>
                <View style={styles.userTabContainer}>
                    <Pressable onPress={() => setUserTab('explorer')}><Text style={[styles.userTab, { color: userTab === 'explorer' ? Constants.colors.primaryColor : '#000000', textDecorationLine: userTab === 'explorer' ? 'underline' : 'none' }]}>Explore</Text></Pressable>
                    <Pressable onPress={() => setUserTab('influencer')}><Text style={[styles.userTab, { color: userTab === 'influencer' ? Constants.colors.primaryColor : '#000000', textDecorationLine: userTab === 'influencer' ? 'underline' : 'none' }]}>Influencer</Text></Pressable>
                    <Pressable onPress={() => setUserTab('advertiser')}><Text style={[styles.userTab, { color: userTab === 'advertiser' ? Constants.colors.primaryColor : '#000000', textDecorationLine: userTab === 'advertiser' ? 'underline' : 'none' }]}>Advertiser</Text></Pressable>
                    <Pressable onPress={() => setUserTab('business')}><Text style={[styles.userTab, { color: userTab === 'business' ? Constants.colors.primaryColor : '#000000', textDecorationLine: userTab === 'business' ? 'underline' : 'none' }]}>Business</Text></Pressable>
                </View>
                {
                    userTab === 'explorer' ? (
                        <View style={[styles.totalRevenue]}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
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
                            <View style={{ marginTop: 12, }}>
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
                    ) : userTab === 'influencer' ? (
                        <View style={[styles.totalRevenue]}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
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
                            <View style={{ marginTop: 12, }}>
                                <Text style={styles.cityName}>Explore</Text>
                                <View style={styles.progressBar}>
                                    <View style={styles.progressBarBg}></View>
                                    <View style={{ ...styles.progressBarFront, width: '80%' }}></View>
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
                                    <View style={{ ...styles.progressBarFront, width: '40%' }}></View>
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
                    ) :userTab==='advertiser'?(
                        <View style={[styles.totalRevenue]}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
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
                            <View style={{ marginTop: 12, }}>
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
                    ):(
                        <View style={[styles.totalRevenue]}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
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
                            <View style={{ marginTop: 12, }}>
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
                    )
                }

                <View style={styles.countryWise}>
                    <View style={styles.tabContainer}>
                        <Pressable onPress={() => setTabs('city')} style={{ ...styles.tabs, backgroundColor: tabs === 'city' ? Constants.whiteColor : 'rgba(229, 235, 237, 0.38)', }}><Text style={{ ...styles.tabText, fontWeight: tabs === 'city' ? '800' : '400', }}>Cities</Text></Pressable>
                        <Pressable onPress={() => setTabs('country')} style={{ ...styles.tabs, backgroundColor: tabs === 'country' ? Constants.whiteColor : 'rgba(229, 235, 237, 0.38)', }}><Text style={{ ...styles.tabText, fontWeight: tabs === 'country' ? '800' : '400', }}>Countries</Text></Pressable>
                    </View>
                    {
                        tabs === 'city' ? (
                            <View style={styles.tabContent}>
                                <Text style={styles.cityName}>Pune</Text>
                                <View style={styles.progressBar}>
                                    <View style={styles.progressBarBg}></View>
                                    <View style={{ ...styles.progressBarFront, width: '90%' }}></View>
                                    <Text>5.86%</Text>
                                </View>
                                <Text style={styles.cityName}>Mubmai</Text>
                                <View style={styles.progressBar}>
                                    <View style={styles.progressBarBg}></View>
                                    <View style={{ ...styles.progressBarFront, width: '80%' }}></View>
                                    <Text>4.32%</Text>
                                </View>
                                <Text style={styles.cityName}>Delhi</Text>
                                <View style={styles.progressBar}>
                                    <View style={styles.progressBarBg}></View>
                                    <View style={{ ...styles.progressBarFront, width: '60%' }}></View>
                                    <Text>4.32%</Text>
                                </View>
                                <Text style={styles.cityName}>Banglore</Text>
                                <View style={styles.progressBar}>
                                    <View style={styles.progressBarBg}></View>
                                    <View style={{ ...styles.progressBarFront, width: '70%' }}></View>
                                    <Text>4.32%</Text>
                                </View>
                                <Image source={Images.indiaMap} style={{ alignSelf: 'center', }} />
                            </View>
                        ) : (
                            <View style={styles.tabContent}>
                                <View style={globatStyles.noData}>
                                    <AntDesign name='delete' size={36} color='#F1F1F1' />
                                    <Text>No Data Found</Text>
                                </View>
                            </View>
                        )
                    }
                </View>
                <View style={styles.ageAndGender}>
                    <Text style={styles.ageAndGenderHeading}>Age Range & Gender</Text>
                    <LineChart
                        data={data}
                        width={Constants.width}
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
                    />
                    <View style={styles.circularChartContainer}>
                        <View>
                            <View style={styles.circularBarLabel}>
                                <View style={styles.graphColorMale}></View>
                                <Text style={styles.label}>Men</Text>
                                <Text styles={styles.value}>68%</Text>
                            </View>
                            <View style={styles.circularBarLabel}>
                                <View style={styles.graphColorFemale}></View>
                                <Text style={styles.label}>Women</Text>
                                <Text styles={styles.value}>32%</Text>
                            </View>
                        </View>
                        <DonutChart
                            data={[{ name: 'Male', value: 68, color: '#00A928' }, { name: 'Female', value: 32, color: '#70CF87' }]}
                            strokeWidth={10}
                            radius={28}
                            containerWidth={120}
                            containerHeight={90}
                            type="butt"
                            startAngle={0}
                            endAngle={360}
                            labelWrapperStyle={{ width: 200 }}
                            labelTitleStyle={{
                                display: 'none',
                            }}
                            labelValueStyle={{
                                display: 'none'
                            }}
                            animationType="slide" />
                    </View>
                </View>
            </ScrollView>
        </View>
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
    userTabContainer: {
        padding: Constants.padding,
        flexDirection: 'row',
    },
    userTab: {
        fontFamily: Constants.fontFamily,
        fontWeight: '700',
        fontSize: 16,
        marginRight: 12,
    },
})
export default HomeScreen