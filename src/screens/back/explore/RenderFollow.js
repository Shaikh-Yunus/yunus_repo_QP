import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    Pressable,
} from 'react-native'
import Images from '../../../assets/images/Images'
import Constants from '../../../shared/Constants'
import globalStyles from '../../../shared/globatStyles'

const RenderFollow = ()=>{
    return (
        <View style={styles.container}>
            <Image source={Images.avatar} />
            <View>
                <Text style={styles.name}>Robert Phan</Text>
                <Text style={styles.designation}>Designer</Text>
            </View>
            <Pressable style={[globalStyles.followBtn, {borderColor: '#000000'}]}><Text>Follow</Text></Pressable>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        padding: Constants.padding,
        backgroundColor: Constants.colors.whiteColor,
        borderRadius: 16,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    name: {
        fontFamily: Constants.fontFamily,
        fontSize: 18,
        fontWeight: '700',
    },
    designation: {
        fontFamily: Constants.fontFamily,
        color: '#A4A4B2',
    },
})
export default RenderFollow