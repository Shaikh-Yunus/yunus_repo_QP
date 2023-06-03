import React from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
} from 'react-native'
import Constants from '../../../shared/Constants'
import Images from '../../../assets/images/Images'

const RenderUsers=({item})=>{
    return (
        <View style={styles.container}>
            <View style={styles.imgContainer}>
                <Image source={Images.avatar} />
                <View style={{marginLeft: 12,}}>
                    <Text style={{fontWeight: '700', fontFamily: Constants.fontFamily,}}>Mark Soel</Text>
                    <Text style={{fontFamily: Constants.fontFamily,}}>mark.soel34@gmail.com</Text>
                </View>
            </View>
            <Text style={styles.userType}>Moderator</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Constants.colors.whiteColor,
        padding: Constants.padding,
        marginTop: 12,
        borderRadius: Constants.borderRadius,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    imgContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    userType: {
        fontFamily: Constants.fontFamily,
        padding: 4,
        paddingLeft: 12,
        paddingEnd: 12,
        backgroundColor: 'rgba(0, 169, 40, 0.14)',
        borderRadius: 8,
        alignSelf: 'center',
        marginTop: -22,
    },
})

export default RenderUsers