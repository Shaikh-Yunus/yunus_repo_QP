import React, { useState } from 'react'
import {
    View,
    StyleSheet,
    Text,
    Image,
    ScrollView,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Constants from '../../../shared/Constants'
import CustomAppBar from '../../../components/admin/CustomAppBar'

const EmailSupports = (props) => {
    const navigation = useNavigation()

    return (
        <View style={styles.container}>
            <CustomAppBar navigation={props.navigation} isMainscreen={false} isReel={false} title='Support Emails' />
            <ScrollView style={styles.wrapper}>
                <Text style={{fontFamily: Constants.fontFamily}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut .</Text>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 3,
        backgroundColor: Constants.colors.whiteColor,
        flex: 1,
    },
    wrapper: {
        padding: Constants.padding,

    },
})

export default EmailSupports