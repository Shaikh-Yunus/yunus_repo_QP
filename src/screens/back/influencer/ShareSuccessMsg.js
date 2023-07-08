import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    Pressable,
} from 'react-native'
import Constants from '../../../shared/Constants'
import AntDesign from 'react-native-vector-icons/AntDesign'
import globatStyles from '../../../shared/globatStyles'

const ShareSuccessMsg = ({ navigation }) => {
    const gotoShareAndEarn = () => {
        navigation.navigate('/share-and-earn')
    }
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={Constants.colors.primaryColor} />
            <View style={styles.middleContant}>
                <View style={styles.circle}>
                    <AntDesign name='sharealt' size={35} color={Constants.colors.whiteColor} />
                </View>
                <Text style={styles.successHeading}>Shared successful </Text>
                <Text style={styles.successText}>
                    Your article has been shared successfully. You can view your progress anytime at the 'Share & Earn' section.
                </Text>
                <Pressable onPress={gotoShareAndEarn} style={[globatStyles.button, { backgroundColor: Constants.colors.whiteColor, marginTop: 40, }]}>
                    <Text style={[globatStyles.btnText, { color: Constants.colors.primaryColor }]}>Continue</Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Constants.colors.primaryColor,
    },
    middleContant: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: Constants.padding,
    },
    circle: {
        padding: 35,
        backgroundColor: 'rgba(255,255,255,0.6)',
        borderRadius: 100,
    },
    successHeading: {
        fontFamily: Constants.fontFamily,
        fontSize: 22,
        color: Constants.colors.whiteColor,
        marginTop: Constants.margin,
        marginBottom: Constants.margin,
    },
    successText: {
        fontFamily: Constants.fontFamily,
        color: Constants.colors.whiteColor,
        textAlign:'center'
    },
})

export default ShareSuccessMsg