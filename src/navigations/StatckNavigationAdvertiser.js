import React from 'react'
import { StatusBar } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
// import Product from '../screens/back/advertiser/Product'
import AdvertiserCategory from '../screens/back/advertiser/AdvertiserCategory'
import OpenCamera from '../screens/back/advertiser/OpenCamera'
import AddAdvertisement from '../screens/back/advertiser/AddAdvertisement'
import AdPreview from '../screens/back/advertiser/AdPreview'
import AdDetails from '../screens/back/advertiser/AdDetails'
import CreateAudience from '../screens/back/advertiser/CreateAudience'
import AgeAndGender from '../screens/back/advertiser/AgeAndGender'
import Locations from '../screens/back/advertiser/Locations'
import Interests from '../screens/back/advertiser/Interests'
import BudgetsAndDuration from '../screens/back/advertiser/BudgetsAndDuration'
import PreviewAd from '../screens/back/advertiser/PreviewAd'
import PaymentDetails from '../screens/back/advertiser/PaymentDetails'
import PaymentSuccess from '../screens/back/advertiser/PaymentSuccess'
import Notification from '../screens/back/advertiser/Notification'
import BusinessList from '../screens/back/advertiser/InfluencerList'
import BusinessRequest from '../screens/back/advertiser/BusinessRequest'
import Settings from '../screens/back/advertiser/Settings'
import Draft from '../screens/back/advertiser/Drafts'
import Product from '../screens/back/influencer/Product'
const Stack = createNativeStackNavigator()

const StackNavigationAdvertiser = (props) => {
    React.useEffect(() => {
        console.log("here", props);
    }, []);
    return (
        <>
            <StatusBar backgroundColor="transparent" translucent={true} />
            <Stack.Navigator initialRouteName='product' screenOptions={{
                headerShown: false,
            }}>
                <Stack.Screen name="/product" component={Product} initialParams={{ userDetails: props?.route?.params?.userDetails }} />
                <Stack.Screen name="/category" component={AdvertiserCategory} />
                <Stack.Screen name="/open-camera" component={OpenCamera} />
                <Stack.Screen name="/new-advertisment" component={OpenCamera} />
                <Stack.Screen name="/add-advertisment" component={AddAdvertisement} />
                <Stack.Screen name="/ad-preview" component={AdPreview} />
                <Stack.Screen name="/add-ad-details" component={AdDetails} />
                <Stack.Screen name="/create-audience" component={CreateAudience} />
                <Stack.Screen name="/location" component={Locations} />
                <Stack.Screen name="/age-and-gender" component={AgeAndGender} />
                <Stack.Screen name='/interests' component={Interests} />
                <Stack.Screen name='/budget-and-duration' component={BudgetsAndDuration} />
                <Stack.Screen name='/ad-details-preview' component={PreviewAd} />
                <Stack.Screen name='/payment-details' component={PaymentDetails} />
                <Stack.Screen name='/payment-success' component={PaymentSuccess} />
                <Stack.Screen name='/notification' component={Notification} />
                <Stack.Screen name='/business-list' component={BusinessList} />
                <Stack.Screen name='/business-request' component={BusinessRequest} />
                <Stack.Screen name='/settings' component={Settings} />
                <Stack.Screen name='/drafts' component={Draft} />
            </Stack.Navigator>
        </>

    )
}

export default StackNavigationAdvertiser