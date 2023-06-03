import { FlashList } from '@shopify/flash-list'
import React, { useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    StatusBar,
    Pressable,
} from 'react-native'
import CustomAppBar from '../../../components/explore/CustomAppBar'
import Constants from '../../../shared/Constants'
import RenderFollow from './RenderFollow'

const Follow = ({navigation})=>{
    const [tabs, setTabs] = useState('users')
    const follow = [
        {id: 1},
        {id: 2},
        {id: 3},
        {id: 4},
    ]
    const posts = [
        
    ]
    return (
        <View>
            <StatusBar translucent={true} backgroundColor='transparent' />
            <CustomAppBar navigation={navigation} isMainscreen={true} isReel={false} title='' headerRight={false} searchbar={true} />
            <View style={styles.container}>
                <View style={styles.stabContainer}>
                    <Pressable onPress={()=>setTabs('users')}><Text style={[styles.tabs,tabs==='users'?styles.activeTab:null]}>Users</Text></Pressable>
                    <Pressable onPress={()=>setTabs('posts')}><Text style={[styles.tabs,tabs==='posts'?styles.activeTab:null]}>Posts</Text></Pressable>
                </View>
                <FlashList
                    data={tabs==='users'?follow:posts}
                    showsVerticalScrollIndicator={false}
                    renderItem={item=><RenderFollow item={item} />}
                    keyExtractor={item=>item?.id?.toString()} 
                    estimatedItemSize={200}/>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        padding: Constants.padding,
        paddingTop: 0,
        paddingBottom: 220,
    },
    stabContainer: {
        flexDirection: 'row',
        marginBottom: 12,
    },
    tabs: {
        fontFamily: Constants.fontFamily,
        fontWeight: '700',
        marginRight: 10,
        borderBottomWidth: 2,
        borderBottomColor: 'transparent'
    },
    activeTab: {
        color: Constants.colors.primaryColor,
        borderBottomColor: Constants.colors.primaryColor
    },
})

export default Follow