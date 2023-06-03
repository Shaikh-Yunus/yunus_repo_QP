import React, { useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    FlatList,
    Pressable,
} from 'react-native'
import CustomAppBar from '../../../components/influencer/CustomAppBar'
import Constants from '../../../shared/Constants'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AntDesign from 'react-native-vector-icons/AntDesign'
import globatStyles from '../../../shared/globatStyles'

const ShareAndEarnDetails = ({ navigation }) => {
   const gotoInvoiceHistory = ()=>{
        navigation.navigate('/invoice-history')
   }
    return (
        <View>
            <CustomAppBar navigation={navigation} isMainscreen={false} isReel={false} title='Share & Earn' />
            <ScrollView style={styles.container}>
                <Text style={{fontFamily: Constants.fontFamily, marginBottom: 20,}}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut .
                </Text>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',}}>
                    <Text style={{fontFamily: Constants.fontFamily, fontSize: 24}}>Earnings</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center',}}>
                        <FontAwesome name='rupee' size={24} />
                        <Text style={{fontFamily: Constants.fontFamily, fontWeight: '700', fontSize: 18,}}> 23,12,001</Text>
                        <AntDesign name='arrowup' color={Constants.colors.primaryColor} size={18} />
                        <Text style={{fontFamily: Constants.fontFamily, color: Constants.colors.primaryColor,}}>5.86%</Text>
                    </View>
                </View>
                <View style={[globatStyles.divider,{backgroundColor: Constants.colors.primaryColor,}]}></View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between',}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <AntDesign name='sharealt' size={18} />
                        <Text style={{marginLeft: 12, fontFamily: Constants.fontFamily, fontSize: 18,}}>Shared Campaign</Text>
                    </View>
                    <View style={{marginStart: 18}}>
                        <Text style={{marginTop: 6, fontSize: 18, marginRight: 30,}}>45,677</Text>
                    </View>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 12,}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <FontAwesome name='eye' size={18} />
                        <Text style={{marginLeft: 12, fontFamily: Constants.fontFamily, fontSize: 18,}}>Total Views</Text>
                    </View>
                    <View style={{marginStart: 18}}>
                        <Text style={{fontSize: 18, marginRight: 30,}}>45,677</Text>
                    </View>
                </View>
                <View style={[globatStyles.divider,{backgroundColor: Constants.colors.primaryColor,}]}></View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between',}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={{marginLeft: 12, fontFamily: Constants.fontFamily, fontSize: 18, marginStart: 32,}}>Invoice Raised</Text>
                    </View>
                    <View style={{marginStart: 18}}>
                        <Text style={{marginTop: 6, fontSize: 18, marginRight: 30,}}><FontAwesome name='rupee' size={18} /> 12,001</Text>
                    </View>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between',}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={{marginLeft: 12, fontFamily: Constants.fontFamily, fontSize: 18, marginStart: 32,}}>Due Amount</Text>
                    </View>
                    <View style={{marginStart: 18}}>
                        <Text style={{marginTop: 6, fontSize: 18, marginRight: 30,}}><FontAwesome name='rupee' size={18} /> 13,22,001</Text>
                    </View>
                </View>
                <Pressable style={styles.invoiceHistory} onPress={gotoInvoiceHistory}>
                    <Text style={{fontFamily: Constants.fontFamily, fontSize: 24}}>Invoice History</Text>
                    <FontAwesome name='angle-right' size={26} />
                </Pressable>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 110,
        padding: Constants.padding,
    },
    invoiceHistory: {
        marginTop: 60,
        padding: Constants.padding,
        backgroundColor: Constants.colors.whiteColor,
        borderRadius: Constants.borderRadius,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
})

export default ShareAndEarnDetails