import React, { useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    ScrollView,
    TextInput,
    Pressable,
} from 'react-native'
import CustomAppBar from '../../../components/admin/CustomAppBar'
import { useNavigation } from '@react-navigation/native'
import globatStyles from '../../../shared/globatStyles'
import Constants from '../../../shared/Constants'

const AddCustomUser = (props) => {
    const navigation = useNavigation()

    return (
        <View style={globatStyles.wrapper}>
            <StatusBar translucent={true} backgroundColor='transparent' />
            <CustomAppBar navigation={navigation} isMainscreen={false} isReel={false} headerRight={false} title='Add Custom' />
            <ScrollView style={styles.container}>
                <Text style={{fontFamily: Constants.fontFamily,}}>can View Only.</Text>
                <Text style={{fontFamily: Constants.fontFamily, marginBottom: 12,}}>iscing elit, sed do eiusmod tempor incididunt ut .</Text>
                <TextInput style={globatStyles.inputText} placeholder='Name' />
                <TextInput style={globatStyles.inputText} placeholder='Email ID' />
                <TextInput style={globatStyles.inputText} placeholder='Phone Number' />
                <Pressable style={globatStyles.button}><Text style={globatStyles.btnText}>Add</Text></Pressable>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: Constants.padding,
    },

})

export default AddCustomUser