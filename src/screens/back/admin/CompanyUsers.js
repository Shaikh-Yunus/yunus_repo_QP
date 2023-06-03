import React from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
} from 'react-native'
import Constants from '../../../shared/Constants'
import Images from '../../../assets/images/Images'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const CompanyUsers=({item})=>{
    return (
        <View style={styles.container}>
            <Text>Company</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Constants.colors.whiteColor,
        padding: Constants.padding,
        marginBottom: 12,
        borderRadius: Constants.borderRadius,
    },
})

export default CompanyUsers