import React from 'react'
import { StatusBar } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Product from '../screens/back/influencer/Product'
import Category from '../screens/back/influencer/Category'
import OpenCamera from '../screens/back/influencer/OpenCamera'
import AddPost from '../screens/back/influencer/AddPost'
import ProductPreview from '../screens/back/influencer/ProductPreview'
import ProductDetails from '../screens/back/influencer/ProductDetails'
import Cart from '../screens/back/influencer/Cart'
import Review from '../screens/back/influencer/Review'
import Draft from '../screens/back/influencer/Draft'
import BusinessList from '../screens/back/influencer/BusinessList'
import BusinessRequest from '../screens/back/influencer/BusinessRequest'
import Profile from '../screens/back/influencer/Profile'
import Dashboard from '../screens/back/influencer/Dashboard'
import BankDetails from '../screens/back/influencer/BankDetails'
import Earnings from '../screens/back/influencer/Earnings'
import EarningDetails from '../screens/back/influencer/EarningDetails'
import AllDraft from '../screens/back/influencer/AllDrafts'
import ShareAndEarn from '../screens/back/influencer/ShareAndEarn'
import ShareSuccessMsg from '../screens/back/influencer/ShareSuccessMsg'
import ShareAndEarnDetails from '../screens/back/influencer/ShareAndEarnDetails'
import InvoiceHistory from '../screens/back/influencer/InvoiceHistory'
import ForgotPassword from '../screens/back/influencer/ForgotPassword'
import UpdatePassword from '../screens/back/influencer/UpdatePassword'
import ChangePassword from '../screens/back/influencer/ChangePassword'
import AdDetails from '../screens/back/advertiser/AdDetails'
import CreateAudience from '../screens/back/advertiser/CreateAudience'
import Locations from '../screens/back/advertiser/Locations'
import AgeAndGender from '../screens/back/advertiser/AgeAndGender'
import Interests from '../screens/back/advertiser/Interests'
import BudgetsAndDuration from '../screens/back/advertiser/BudgetsAndDuration'
import PreviewAd from '../screens/back/advertiser/PreviewAd'

const Stack = createNativeStackNavigator()

const StackNavigationInfluencer = (props) => {
    return (
        <>
            {console.log('props?.route?.params?.userType==', props?.route?.params?.userType)}
            <StatusBar backgroundColor="transparent" translucent={true} />
            <Stack.Navigator initialRouteName='product' screenOptions={{
                headerShown: false,
            }}
            >
                <Stack.Screen name="/product" component={Product} initialParams={{ userDetails: props?.route?.params?.userDetails, userType: props?.route?.params?.userType?.toLowerCase() == "explorer" ? "explore" : props?.route?.params?.userType?.toLowerCase() }} />
                <Stack.Screen name="/Category" component={Category} />
                <Stack.Screen name="/open-camera" component={OpenCamera} initialParams={{ influencerData: props?.route?.params }} />
                <Stack.Screen name="/add-post" component={AddPost} />
                <Stack.Screen name="/ad-details" component={AdDetails} />
                <Stack.Screen name='/create-audience' component={CreateAudience} />
                <Stack.Screen name="/location" component={Locations} />
                <Stack.Screen name="/age-and-gender" component={AgeAndGender} />
                <Stack.Screen name='/interests' component={Interests} />
                <Stack.Screen name='/budget-and-duration' component={BudgetsAndDuration} />
                <Stack.Screen name='/ad-details-preview' component={PreviewAd} />
                <Stack.Screen name='/product-preview' component={ProductPreview} />
                <Stack.Screen name='/product-description' component={ProductDetails} />
                <Stack.Screen name='/influencer-stack-navigation' component={StackNavigationInfluencer} />
                {/* <Stack.Screen name='/cart' component={Cart} /> */}
                <Stack.Screen name='/draft' component={Draft} />
                <Stack.Screen name='/reviews' component={Review} />
                <Stack.Screen name='/business-list' component={BusinessList} />
                <Stack.Screen name='/business-request' component={BusinessRequest} />
                <Stack.Screen name='/profile' component={Profile} />
                <Stack.Screen name='/dashboard' component={Dashboard} />
                <Stack.Screen name='/bank-details' component={BankDetails} />
                <Stack.Screen name='/earnings' component={Earnings} />
                <Stack.Screen name='/earning-details' component={EarningDetails} />
                <Stack.Screen name='/all-drafts' component={AllDraft} />
                <Stack.Screen name='/share-and-earn' component={ShareAndEarn} />
                <Stack.Screen name='/share-success' component={ShareSuccessMsg} />
                <Stack.Screen name='/share-and-earn-details' component={ShareAndEarnDetails} />
                <Stack.Screen name='/invoice-history' component={InvoiceHistory} />
                <Stack.Screen name='/forgot-password' component={ForgotPassword} />
                <Stack.Screen name='/update-password' component={UpdatePassword} />
                <Stack.Screen name='/change-password' component={ChangePassword} />
            </Stack.Navigator>
        </>

    )
}

export default StackNavigationInfluencer