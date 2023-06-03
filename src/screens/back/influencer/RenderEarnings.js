import React from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
    Pressable,
} from 'react-native'
import Images from '../../../assets/images/Images'
import Constants from '../../../shared/Constants'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useNavigation } from '@react-navigation/native'

const RenderEarnings=(props)=>{
    const navigation = useNavigation()
    const gotoReturnDetails = ()=>{
        navigation.navigate('/earning-details')
    }
    return (
        <Pressable style={styles.container} onPress={gotoReturnDetails}>
            <Image source={Images.recentOrdersOne} />
            <View>
                <Text style={styles.title}>Statue of Boris</Text>
                <View style={styles.inline}>
                    <Text style={{fontFamily: Constants.fontFamily,color: '#424242', marginTop: 1,}}>Returns</Text>
                    <Text style={{fontFamily: Constants.fontFamily, fontSize: 18, fontWeight: '700',marginLeft: 12,}}>23</Text>
                    <Text style={{marginStart: 10, marginEnd: 10,}}>|</Text>
                    <Text style={styles.price}><FontAwesome size={18} name='rupee' />1200</Text>
                </View>
            </View>
            <Text style={{fontFamily: Constants.fontFamily,color: '#424242', marginTop: 1,}}>Rated 3.5 <AntDesign name='star' color='#E7CC3E' /></Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: Constants.padding,
        backgroundColor: Constants.colors.whiteColor,
        marginTop: Constants.margin,
        borderRadius: Constants.borderRadius,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        fontFamily: Constants.fontFamily,
        fontSize: 16,
        fontWeight: '700',
    },
    inline: {
        flexDirection: 'row',
    },
    price: {
        fontSize: 18,
        fontWeight: '700',
    },
})

export default RenderEarnings