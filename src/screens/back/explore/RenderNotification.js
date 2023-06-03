import React from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
} from 'react-native'
import Images from '../../../assets/images/Images'
import Constants from '../../../shared/Constants'

const RenderNotification = ({ notification }) => {
    return (
        <View style={styles.container}>
            {console.log('item=>>', notification)}
            {
                notification.item.img ? <Image source={notification.item.img} /> : null
            }

            <View style={styles.notifica}>
                <Text style={styles.notoficationHeading}>The company is pivoting to a new x </Text>
                <Text style={styles.notificationText}>More description goes here and it ca nbe very...</Text>
            </View>
            <View style={styles.textStatus}>
                <Text style={styles.status}>Unseen</Text>
                <Text style={styles.time}>4.4.2019; 13:44</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 12,
        backgroundColor: Constants.colors.whiteColor,
        padding: Constants.padding,
    },
    notoficationHeading: {
        fontFamily: Constants.fontFamily,
        fontSize: 16,
        fontWeight: '800',
        flexWrap: 'wrap',
    },
    notifica: {
        maxWidth: '55%',
        marginLeft: 12,
    },
    notificationText: {
        fontFamily: Constants.fontFamily,
    },
    textStatus: {
        alignItems: 'flex-end',
        alignContent: 'space-between',
    },
    status: {
        fontFamily: Constants.fontFamily,
        color: Constants.colors.primaryColor,
        fontSize: 16,
    },
    time: {
        fontFamily: Constants.fontFamily,
        marginTop: Constants.margin,
    },
})

export default RenderNotification