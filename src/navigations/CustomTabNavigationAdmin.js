import React, { useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Pressable,
} from 'react-native'
import Constants from '../shared/Constants'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import { useNavigation } from '@react-navigation/native'

const CustomTabNavigationAdmin=(props)=>{
    const [currentTab, setCurrentTab] = useState('home')
    const navigation = useNavigation()
    const gotToPage = (page)=>{
        setCurrentTab(page)
        navigation.navigate(`/${page}`,{userDetails:props.propValue})
    }
    return (
        <View style={[styles.container, {borderBottomLeftRadius: props.showDrawer?30:0}]}>
            <Pressable onPress={()=>gotToPage('home')} style={[styles.tabItem]}>
                <AntDesign name='home' style={[styles.tabIcon, {color: props.activeTab==='home'?Constants.colors.primaryColor:'#BBBBBB',}]} />
                <Text style={[styles.tabLabel, {color: props.activeTab==='home'?Constants.colors.primaryColor:'#BBBBBB', }]}>Home</Text>
            </Pressable>
            <Pressable onPress={()=>gotToPage('productScreen')} style={styles.tabItem}>
                <Feather name='archive' style={[styles.tabIcon, {color: props.activeTab==='productScreen'?Constants.colors.primaryColor:'#BBBBBB', }]} />
                <Text style={[styles.tabLabel, {color: props.activeTab==='productScreen'?Constants.colors.primaryColor:'#BBBBBB', }]}>Products</Text>
            </Pressable>
            <Pressable onPress={()=>gotToPage('NotificationScreen')} style={styles.tabItem}>
                <Feather name='bell' style={[styles.tabIcon, {color: props.activeTab==='notification'?Constants.colors.primaryColor:'#BBBBBB', }]} />
                <Text style={[styles.tabLabel, , {color: props.activeTab==='notification'?Constants.colors.primaryColor:'#BBBBBB', }]}>Notification</Text>
            </Pressable>
            <Pressable onPress={()=>gotToPage('profileScreen')} style={styles.tabItem}>
                <Feather name='user' style={[styles.tabIcon, {color: props.activeTab==='profile'?Constants.colors.primaryColor:'#BBBBBB', }]} />
                <Text style={[styles.tabLabel, {color: props.activeTab==='profile'?Constants.colors.primaryColor:'#BBBBBB', }]}>Profile</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Constants.colors.whiteColor,
        padding: Constants.padding,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        justifyContent: 'space-between',
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    tabItem: {
        alignItems: 'center',
    },
    tabIcon: {
        fontSize: 28,
        color: '#BBBBBB',
    },
    tabLabel: {
        fontFamily: Constants.fontFamily,
        fontSize: 16,
        color: '#BBBBBB',
        marginTop: 4,
    },
})

export default CustomTabNavigationAdmin