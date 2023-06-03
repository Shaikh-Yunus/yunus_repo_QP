import React, { useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    ScrollView,
    FlatList,
} from 'react-native'
import CustomAppBar from '../../../components/influencer/CustomAppBar'
import { useNavigation } from '@react-navigation/native'
import globatStyles from '../../../shared/globatStyles'
import Constants from '../../../shared/Constants'
import SearchBar from '../../../components/explore/SearchBar'
import RenderBusinessRequest from './RenderBusinessRequest'


const BusinessRequest = (props) => {
    const navigation = useNavigation()
    const [tabs, setTab] = useState('ongoing')
    const ongoing = [
        { id: 1, },
        { id: 2, },
        { id: 3, },
        { id: 4, },
        { id: 5, },
    ]
    const pending = [
        { id: 1, },
        { id: 2, },
        { id: 3, },
        { id: 4, },
        { id: 5, },
    ]
    return (
        <View style={globatStyles.wrapper}>
            <StatusBar translucent={true} backgroundColor='transparent' />
            <CustomAppBar navigation={navigation} isMainscreen={false} isReel={false} headerRight={false} title='Request Business' isCamera={true} />
            <ScrollView style={styles.container}>
                <Text style={styles.desc}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut .
                </Text>
                <SearchBar />
                {/* <View style={styles.tabContainer}>
                    <Text style={[styles.tab, {color: tabs==='ongoing'?Constants.colors.primaryColor:'#676767', textDecorationLine: tabs==='ongoing'?'underline':'none',}]} onPress={()=>setTab('ongoing')}>Ongoing</Text>
                    <Text style={[styles.tab, {color: tabs==='pending'?Constants.colors.primaryColor:'#676767', textDecorationLine: tabs==='pending'?'underline':'none',}]} onPress={()=>setTab('pending')}>Pending</Text>
                </View> */}
                <FlatList
                    data={tabs === 'ongoing' ? ongoing : pending}
                    renderItem={item => <RenderBusinessRequest item={item}
                        keyExtractor={item => item?.id?.tostring()}
                    />} />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: Constants.padding,
    },
    desc: {
        fontFamily: Constants.fontFamily,
        marginBottom: 12,
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
})

export default BusinessRequest