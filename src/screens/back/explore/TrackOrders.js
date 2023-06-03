import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    ScrollView,
    Image,
} from 'react-native'
import CustomAppBar from '../../../components/explore/CustomAppBar'
import Constants from '../../../shared/Constants'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import globatStyles from '../../../shared/globatStyles'
import Images from '../../../assets/images/Images'

const TrackOrders = ({navigation})=>{
    
    return (
        <View style={styles.container}>
            <StatusBar translucent={true} backgroundColor='transparent' />
            <CustomAppBar navigation={navigation} isMainscreen={false} isReel={false} title='Track Order' headerRight={false} />
            <ScrollView style={styles.wrapper}>
               <Text style={styles.description}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut .
               </Text>
               <View style={styles.trackorderheading}>
                    <Image source={Images.trackOrder} />
                    <Text style={styles.trackText}>Tracking ID: </Text>
                    <Text style={styles.orderId}>62517284638</Text>
               </View>
               <View style={styles.trackorderheading}>
                    <Text style={styles.time}>6:25pm</Text>
                    <View style={styles.divider}></View>
                    <View>
                        <Text style={{fontFamily: Constants.fontFamily,}}>Pick-up scheduled with courier</Text>
                        <Text style={{fontFamily: Constants.fontFamily, fontStyle: 'italic',}}>NEW DELHI, IN</Text>
                    </View>
               </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    description: {
        fontFamily: Constants.fontFamily,
        marginBottom: Constants.margin,
    },
    wrapper: {
        padding: Constants.padding,
    },
    trackorderheading: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 18,
    },
    trackText: {
        fontFamily: Constants.fontFamily,
        fontSize: 24,
        marginLeft: 12,
        marginRight: 12,
    },
    orderId: {
        fontFamily: Constants.fontFamily,
        fontWeight: '700',
        fontSize: 22,
    },
    time: {
        fontFamily: Constants.fontFamily,
        fontSize: 18,
    },
    divider: {
        width: 1,
        height: 35,
        backgroundColor: '#999999',
        marginLeft: 12,
        marginRight: 12,
    },
})

export default TrackOrders