import React from 'react'
import { StatusBar } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Reels from '../screens/back/explore/Reels'
import Follow from '../screens/back/explore/Follow'
import ProductDetails from '../screens/back/explore/ProductDetails'
import ProductDescription from '../screens/back/explore/ProductDescription'
import ExpoerReview from '../screens/back/explore/ExpoerReview'
import EditProfile from '../screens/back/explore/EditProfile'
import Cart from '../screens/back/explore/Cart'
import SelectAddress from '../screens/back/explore/SelectAddress'
import AddAddress from '../screens/back/explore/AddAddress'
import PaymentDetails from '../screens/back/explore/PaymentDetails'
import Coupons from '../screens/back/explore/Coupons'
import PaymentSuccess from '../screens/back/explore/PaymentSuccess'
import TrackOrders from '../screens/back/explore/TrackOrders'
import ReelsComments from '../screens/back/explore/ReelsComments'


const Stack = createNativeStackNavigator()

const StackNavigationExplore=(props)=>{
    return (
        <>
            <StatusBar backgroundColor="transparent" translucent={true} />
            <Stack.Navigator initialRouteName='product' screenOptions={{
                headerShown: false,
            }}>
                <Stack.Screen name="/product" component={Reels} />
                <Stack.Screen name="/follow" component={Follow} />
                <Stack.Screen name="/product-details" component={ProductDetails} />
                <Stack.Screen name='/product-description' component={ProductDescription} />
                <Stack.Screen name='/explore-review' component={ExpoerReview} />
                <Stack.Screen name='/edit-profile' component={EditProfile} />
                <Stack.Screen name='/cart' component={Cart} />
                <Stack.Screen name='/goto-select-address' component={SelectAddress} />
                <Stack.Screen name='/add-address' component={AddAddress} />
                <Stack.Screen name='/payment-details' component={PaymentDetails} />
                <Stack.Screen name='/all-coupons' component={Coupons} />
                <Stack.Screen name='/payment-success' component={PaymentSuccess} />
                <Stack.Screen name='/reels-comments' component={ReelsComments} />
            </Stack.Navigator>
        </>
        
    )
}

export default StackNavigationExplore