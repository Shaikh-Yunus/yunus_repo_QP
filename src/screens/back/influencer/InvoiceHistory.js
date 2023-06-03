import React, { useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    FlatList,
    Pressable,
    StatusBar,
} from 'react-native'
import CustomAppBar from '../../../components/influencer/CustomAppBar'
import Constants from '../../../shared/Constants'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AntDesign from 'react-native-vector-icons/AntDesign'
import RenderShareAndEarn from './RenderShareAndEarn'
import RenderShareAndEarnShared from './RenderShareAndEarnShared'

const InvoiceHistory = ({ navigation }) => {
    
    return (
        <View>
            <StatusBar translucent={true} backgroundColor='transparent' />
            <CustomAppBar navigation={navigation} isMainscreen={false} isReel={false} title='Invoice History' />
            <ScrollView style={styles.container}>
               
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 110,
        padding: Constants.padding,
    },
    
})

export default InvoiceHistory