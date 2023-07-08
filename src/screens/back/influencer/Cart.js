import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    FlatList,
    ScrollView,
    Pressable,
} from 'react-native'
import CustomAppBar from '../../../components/explore/CustomAppBar'
import Constants from '../../../shared/Constants'
import RenderCart from './RenderCart'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import globatStyles from '../../../shared/globatStyles'
import { FlashList } from '@shopify/flash-list'

const Cart = ({ navigation }) => {
    const cartItems = [
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 4 },
        { id: 5 },
    ]
    const gotoSelectAddress = () => {
        navigation.navigate('/goto-select-address')
    }
    return (
        <View style={styles.container}>
            <StatusBar translucent={true} backgroundColor='transparent' />
            <CustomAppBar navigation={navigation} isMainscreen={false} isReel={false} title='Cart' headerRight={false} />
            <ScrollView style={styles.wrapper}>
                <Text style={styles.description}>
                    Confirm your cart items and proceed to 'Checkout' to complete your purchase.                </Text>
                <FlashList
                    data={cartItems}
                    style={{ marginBottom: 10, }}
                    showsVerticalScrollIndicator={false}
                    renderItem={item => <RenderCart item={item} />}
                    keyExtractor={item => item?.id?.toString()}
                    estimatedItemSize={200} />
            </ScrollView>
            <Pressable onPress={gotoSelectAddress} style={[globatStyles.button, { marginTop: 10 }]}><Text style={globatStyles.btnText}>Proceeds ( <FontAwesome name='rupee' /> 1250 )</Text></Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    description: {
        fontFamily: Constants.fontFamily,
    },
    wrapper: {
        padding: Constants.padding,
    },
})

export default Cart