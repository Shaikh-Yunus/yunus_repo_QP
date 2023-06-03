import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
} from 'react-native'
import CustomAppBar from '../../../components/influencer/CustomAppBar'
import Constants from '../../../shared/Constants'

const ForgotPassword =()=>{
    return (
        <View style={styles.container}>
            <CustomAppBar isMainscreen={false} title='Forgot Password' />
            <ScrollView>
                <Text style={styles.desc}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut .
                </Text>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    desc: {
        fontFamily: Constants.fontFamily,
    },
})

export default ForgotPassword