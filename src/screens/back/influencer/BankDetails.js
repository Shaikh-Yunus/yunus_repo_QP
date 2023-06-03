import React, { useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Pressable,
    TextInput,
} from 'react-native'
import CustomAppBar from '../../../components/influencer/CustomAppBar'
import Constants from '../../../shared/Constants'
import globatStyles from '../../../shared/globatStyles'

const BankDetails=({navigation})=>{
    return (
        <View>
            <CustomAppBar navigation={navigation} isMainscreen={false} isReel={false} title='Bank Details' />
            <ScrollView style={styles.container}>
               <TextInput style={globatStyles.inputText} placeholder='Name of the Bank' />
               <TextInput style={globatStyles.inputText} placeholder='Aadhar Card Number' />
               <TextInput style={globatStyles.inputText} placeholder='Pancard Number' />
               <TextInput style={globatStyles.inputText} placeholder='GST Number' />
               <TextInput style={globatStyles.inputText} placeholder='Account Number' />
               <TextInput style={globatStyles.inputText} placeholder='Branch IFSC Code' />
               <Pressable style={globatStyles.button}><Text style={globatStyles.btnText}>Add</Text></Pressable>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 110,
        padding: Constants.padding,
    },
    companyDetails: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    companyLogo: {
        padding: Constants.padding+12,
        backgroundColor: Constants.colors.whiteColor,
        borderRadius: 20,
    },
    companyInfo: {
        marginLeft: Constants.margin,
    },
    email: {
        fontFamily: Constants.fontFamily,
        fontWeight: '700',
        fontSize: 20,
    },
    phone: {
        fontFamily: Constants.fontFamily,
        marginTop: 8,
        color: '#A4A4B2',
    },
    moreInfo: {
        fontFamily: Constants.fontFamily,
        color: Constants.colors.primaryColor,
        marginTop: 8,
        fontWeight: '800',
        textDecorationColor: Constants.colors.primaryColor,
        textDecorationStyle: 'solid',
        textDecorationLine: 'underline',

    },
    socialDetails: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    socialContainer:{
        padding: Constants.padding,
        paddingTop: 0,
        paddingBottom: 12,
        borderRightWidth: 2,
        borderRightColor: '#D9D9D9',
        marginTop: Constants.margin,
        alignItems: 'center',
    },
    socialValue: {
        color: '#007635',
        fontFamily: Constants.fontFamily,
        fontWeight: '700',
        fontSize: 22,
    },
    socialActivity: {
        fontFamily: Constants.fontFamily,
        fontWeight: '700',
        marginTop: 12,
    },
    divider: {
        height: 2,
        width: '65%',
        backgroundColor: '#D9D9D9',
        alignSelf: 'center',
        marginTop: Constants.margin,
        marginBottom: Constants.margin,
    },
    profileSection: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    profileBgImg: {
        width: '50%',
        height: 252,
        resizeMode: 'cover',
    },
    comments: {
        flexDirection: 'row',
        position: 'absolute',
        top: 20,
        left: 30,
    },
})

export default BankDetails