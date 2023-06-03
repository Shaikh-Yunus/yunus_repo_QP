import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    Pressable,
    FlatList,
} from 'react-native'
import Images from '../../../assets/images/Images'
import CustomAppBar from '../../../components/advertiser/CustomAppBar'
import SearchBar from '../../../components/advertiser/SearchBar'
import Constants from '../../../shared/Constants'
import RenderNotification from './RenderNotification'

const Notification = (props) => {
    const [tabs, setTabs] = useState('all')
    const navigation = useNavigation()
    const all = [
        {
            id: 1,
            img: Images.notification
        },
        {
            id: 2,
            img: ''
        },
        {
            id: 3,
            img: Images.notification
        },
        {
            id: 4,
            img: Images.notification
        },
        {
            id: 5,
            img: ''
        },
    ]
    const seen = [
        {
            id: 1,
            img: Images.notification
        },
        {
            id: 2,
            img: Images.notification
        },
        {
            id: 3,
            img: ''
        },
        {
            id: 4,
            img: ''
        },
        {
            id: 5,
            img: Images.notification
        },
    ]
    const unseen = [
        {
            id: 1,
            img: ''
        },
        {
            id: 2,
            img: Images.notification
        },
        {
            id: 3,
            img: Images.notification
        },
        {
            id: 4,
            img: Images.notification
        },
        {
            id: 5,
            img: ''
        },
    ]
    return (
        <View>
            <CustomAppBar navigation={navigation} isMainscreen={false} isReel={false} title='Notifictions' />
            <ScrollView style={styles.warapper}>
                <View style={styles.container}>
                    <SearchBar />
                </View>
                <View style={styles.tabs}>
                    <Pressable onPress={() => setTabs('all')}>
                        <Text style={{ ...styles.tabText, color: tabs === 'all' ? Constants.colors.primaryColor : null, fontWeight: tabs === 'all' ? '800' : '400', textDecorationColor: tabs === 'all' ? Constants.colors.primaryColor : 'transparent' }}>All</Text>
                        {tabs === 'all' ? <View style={styles.activeTab}></View> : <View style={{ ...styles.activeTab, backgroundColor: 'transparent' }}></View>}
                    </Pressable>
                    <Pressable onPress={() => setTabs('unseen')}>
                        <Text style={{ ...styles.tabText, color: tabs === 'unseen' ? Constants.colors.primaryColor : null, fontWeight: tabs === 'unseen' ? '800' : '400', textDecorationColor: tabs === 'unseen' ? Constants.colors.primaryColor : 'transparent' }}>Unseen</Text>
                        {tabs === 'unseen' ? <View style={styles.activeTab}></View> : <View style={{ ...styles.activeTab, backgroundColor: 'transparent' }}></View>}
                    </Pressable>
                    <Pressable onPress={() => setTabs('seen')}>
                        <Text style={{ ...styles.tabText, color: tabs === 'seen' ? Constants.colors.primaryColor : null, fontWeight: tabs === 'seen' ? '800' : '400', textDecorationColor: tabs === 'seen' ? Constants.colors.primaryColor : 'transparent' }}>Seen</Text>
                        {tabs === 'seen' ? <View style={styles.activeTab}></View> : <View style={{ ...styles.activeTab, backgroundColor: 'transparent' }}></View>}
                    </Pressable>
                </View>
                <FlatList
                    data={tabs === 'all' ? all : tabs === 'seen' ? seen : unseen}
                    renderItem={item => <RenderNotification notification={item} />}
                    keyExtractor={item => item?.id?.toString()}
                    showsVerticalScrollIndicator={false}
                />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    warapper: {
        marginBottom: 110,
    },
    container: {
        padding: Constants.padding,
    },
    tabs: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: Constants.padding,
    },
    tabText: {
        fontFamily: Constants.fontFamily,
        fontSize: 16,
        marginRight: Constants.margin + 12,
    },
    activeTab: {
        height: 3,
        width: '60%',
        backgroundColor: Constants.colors.primaryColor,
        marginTop: 6,
    },
})

export default Notification