import React, { useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Pressable,
    ScrollView,
} from 'react-native'
import { LineChart } from 'react-native-chart-kit'
import Constants from '../../../shared/Constants'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import RenderEarnings from './RenderEarnings'
import CustomAppBar from '../../../components/influencer/CustomAppBar'
import { FlashList } from '@shopify/flash-list'

const Earnings = (props)=>{
    const [tabs,setTabs] = useState('w')
    const [returnTab, setReturnTab] = useState('p')
    const goBack = ()=>{
        props.navigation.goBack()
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
    const daileyData = {
        labels: ["1", "2", "3", "4", "5", "6","7","8","9","10", "11", "12"],
        datasets: [
            {
                data: [120, 700, 200, 800, 250, 620, 230, 700, 550, 1200, 100, 1100],
                color: (opacity = 1) => `#00A928`, // optional
                strokeWidth: 2 // optional
            },
        ],
    }
    const monthlyData = {
        labels: ["Jan", "Feb", "Mar", "April", "May", "Jun", "Jly", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
            {
                data: [1200, 1900, 3000, 8000, 9000, 4000, 2500, 5000, 6000, 7500, 3500, 4500],
                color: (opacity = 1) => `#00A928`, // optional
                strokeWidth: 2 // optional
            },
        ],
    }
    const weeklyData = {
        labels: ["Mon", "Tue", "Thrus", "Wed", "Fri", "Sat", "Sun"],
        datasets: [
            {
                data: [1200, 1600, 1100, 1700, 2200, 1400, 1550],
                color: (opacity = 1) => `#00A928`, // optional
                strokeWidth: 2 // optional
            },
        ],
    }
    const products = [
        {id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5,}
    ]
    const services = [
        {id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5,}
    ]
    return (
        <View style={StyleSheet.wrapper}>
            <CustomAppBar navigation={props.navigation} isMainscreen={false} isReel={false} headerRight={false} title='Earnings' />
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.normalText}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut .
                    </Text>
                    <View style={styles.tabs}>
                        <Pressable onPress={()=>setTabs('d')}><Text style={[styles.tabText, {backgroundColor: tabs==='d'?Constants.colors.whiteColor:'rgba(0, 169, 40, 0.15)', borderColor: tabs==='d'?Constants.colors.primaryColor: 'transparent', color: tabs==='d'?Constants.colors.primaryColor:'#000000',}]}>Daily</Text></Pressable>
                        <Pressable onPress={()=>setTabs('w')}><Text style={[styles.tabText, {backgroundColor: tabs==='w'?Constants.colors.whiteColor:'rgba(0, 169, 40, 0.15)', borderColor: tabs==='w'?Constants.colors.primaryColor: 'transparent', color: tabs==='w'?Constants.colors.primaryColor:'#000000',}]}>Weekly</Text></Pressable>
                        <Pressable onPress={()=>setTabs('m')}><Text style={[styles.tabText, {backgroundColor: tabs==='m'?Constants.colors.whiteColor:'rgba(0, 169, 40, 0.15)', borderColor: tabs==='m'?Constants.colors.primaryColor: 'transparent', color: tabs==='m'?Constants.colors.primaryColor:'#000000',}]}>Monthly</Text></Pressable>
                    </View>
                    {
                        tabs==='d'?(
                            <View>
                                <View style={styles.graphHeading}>
                                    <Text style={styles.headingText}>Daily Sales</Text>
                                    <Text style={styles.headingValue}><FontAwesome name='rupee' size={18} /> 2345.17</Text>
                                </View>
                                <LineChart
                                    data={daileyData}
                                    width={Constants.width}
                                    height={220}
                                    chartConfig={chartConfig}
                                    yAxisSuffix=''
                                    barPercentage='10'
                                    withInnerLines={false}
                                    withOuterLines={true}
                                    withShadow={false}
                                    style={{
                                        marginLeft: -26,
                                    }}
                                    bezier
                                />
                            </View>
                        ):tabs==='w'?(
                            <View>
                                <View style={styles.graphHeading}>
                                    <Text style={styles.headingText}>Weekly Sales</Text>
                                    <Text style={styles.headingValue}><FontAwesome name='rupee' size={18} /> 4345.17</Text>
                                </View>
                                <LineChart
                                    data={weeklyData}
                                    width={Constants.width}
                                    height={220}
                                    chartConfig={chartConfig}
                                    yAxisSuffix=''
                                    barPercentage='10'
                                    withInnerLines={false}
                                    withOuterLines={true}
                                    withShadow={false}
                                    style={{
                                        marginLeft: -26,
                                    }}
                                    bezier
                                />
                            </View>
                        ):(
                            <View>
                                <View style={styles.graphHeading}>
                                    <Text style={styles.headingText}>Monthly Sales</Text>
                                    <Text style={styles.headingValue}><FontAwesome name='rupee' size={18} /> 50345.17</Text>
                                </View>
                                <LineChart
                                    data={monthlyData}
                                    width={Constants.width}
                                    height={220}
                                    chartConfig={chartConfig}
                                    yAxisSuffix=''
                                    barPercentage='10'
                                    withInnerLines={false}
                                    withOuterLines={true}
                                    withShadow={false}
                                    style={{
                                        marginLeft: -26,
                                    }}
                                    bezier
                                />
                            </View>
                        )
                    }
                    <View style={[styles.tabs, {justifyContent: 'flex-start'}]}>
                        <Pressable onPress={()=>setReturnTab('p')}><Text style={[styles.tabTextProduct, {color: returnTab==='p'?Constants.colors.primaryColor:'#000000', textDecorationLine: returnTab==='p'?'underline':'none'}]}>Products</Text></Pressable>
                        <Pressable onPress={()=>setReturnTab('s')}><Text style={[styles.tabTextProduct, {color: returnTab==='s'?Constants.colors.primaryColor:'#000000', textDecorationLine: returnTab==='s'?'underline':'none'}]}>Services</Text></Pressable>
                    </View>
                    <View style={{marginBottom: 80}}>
                        <FlashList
                            data={returnTab==='p'?products:services}
                            renderItem={item=><RenderEarnings producys={item} />}
                            keyExtractor={item=>item?.id?.toString()} 
                            estimatedItemSize={200}/>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    container: {
        flex: 1,
        padding: Constants.padding,
    },
    titleBar: {
        marginTop: 16,
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: 99,
        paddingBottom: 14,
        paddingStart: 15,
    },
    title: {
        fontFamily: Constants.fontFamily,
        fontSize: 26,
        fontWeight: '800',
        marginStart: 20,
    },
    normalText: {
        fontFamily: Constants.fontFamily,
    },
    space: {
        width: 10,
    },
    orderNumber: {
        fontFamily: Constants.fontFamily,
        fontSize: 20,
        color: Constants.colors.primaryColor,
        fontWeight: '700',
    },
    amount: {
        fontFamily: Constants.fontFamily,
        fontSize: 24,
        fontWeight: '700'
    },
    tabs: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: Constants.margin,
    },
    tabText: {
        fontFamily: Constants.fontFamily,
        padding: 8,
        paddingStart: Constants.padding,
        paddingEnd: Constants.padding,
        backgroundColor: 'rgba(0, 169, 40, 0.15)',
        marginRight: 12,
        borderRadius: Constants.borderRadius,
        borderWidth: 1,
        borderColor: 'transparent',
    },
    graphHeading: {
        alignSelf: 'center',
        marginTop: Constants.margin,
        marginBottom: Constants.margin,
        justifyContent: 'center',
    },
    headingText: {
        textTransform: 'uppercase',
        color: '#6F6F6F',
        fontSize: 18,
    },
    headingValue: {
        alignSelf: 'center',
        color: Constants.colors.primaryColor,
        fontSize: 20,
    },
    tabTextProduct: {
        marginRight: 12,
        fontSize: 18,
        fontFamily: Constants.fontFamily,
        fontWeight: '700'
    },
})

export default Earnings