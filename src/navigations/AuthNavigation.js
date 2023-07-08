import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StatusBar } from 'react-native'
import Discover from '../screens/front/Discover'
import BusinessSignup from '../screens/front/BusinessSignup'
import BusinessOtp from '../screens/front/BusinessOtp'
import Category from '../screens/front/Category'
import BusinessRegistration from '../screens/front/BusinessRegistration'
import AadhaarNo from '../screens/front/AddharNo'
import AdharVerification from '../screens/front/AadharVerification'
import ForgotPassword from '../screens/front/ForgotPassword'
import ResetPassword from '../screens/front/ResetPassword'
import ChangePassword from '../screens/front/ChangePassword'
import ExplorerSignup from '../screens/front/explore/ExploreSignup'
import ExploreOtp from '../screens/front/explore/ExploreOtp'
import SignupDetails from '../screens/front/explore/SignupDetails'
import Signin from '../screens/front/explore/Signin'
import Reels from '../screens/back/explore/Reels'
import InfluencerSignup from '../screens/front/influence/InfluencerSignup'
import InfluencerOtp from '../screens/front/influence/InfluencerOtp'
import InfluencerDob from '../screens/front/influence/InfluenerDob'
import InfluencerRegistration from '../screens/front/influence/InfluencerRegistration'
import StackNavigationInfluencer from '../navigations/StackNavigationInfluencer'
import AdvertiserSignin from '../screens/front/advertiser/AdvertiserSignin'
import AdvertiserOtp from '../screens/front/advertiser/AdvertiserOtp'
import AdvertiserCategory from '../screens/back/advertiser/AdvertiserCategory'
import AdvertiserSiginWithPass from '../screens/front/advertiser/AdvertiserSiginWithPass'
import ForgotPasswordAdvertiser from '../screens/front/advertiser/ForgotPasswordAdvertiser'
import UpdatePasswordAdvertiser from '../screens/front/advertiser/UpdatePasswordAdvertiser'
import AdvertiserRegistration from '../screens/front/advertiser/AdvertiserRegistration'
import OtherDetails from '../screens/front/advertiser/OtherDetails'
import StackNavigationAdvertiser from './StatckNavigationAdvertiser'
import AdminSignin from '../screens/front/admin/AdminSignin'
import ForgotPasswordAdmin from '../screens/front/admin/ForgotPasswordAdmin'
import SetPasswordAdmin from '../screens/front/admin/SetPasswordAdmin'
import ChangePasswordAdmin from '../screens/front/admin/ChangePassword'
import StackNavigationAdmin from '../navigations/StackNavigationAdmin'
import BankDetails from '../screens/front/BankDetails'
import BusinessSignIn from '../screens/front/business/BusinessSignIn'
import HomeScreen from '../screens/back/business/HomeScreen'
import ProductsScreen from '../screens/back/business/ProductsScreen'
import AddProduct from '../screens/back/business/AddProduct'
import ProductOverview from '../screens/back/business/ProductOverview'
import ProductPreview from '../screens/back/influencer/ProductPreview'
import EmailVerification from '../screens/front/email-verification'
import EmailOtp from '../screens/front/email-otp'
import ProfileScreen from '../screens/back/business/ProfileScreen'
import EditUser from '../screens/back/business/EditUser'
import UserManagement from '../screens/back/business/UserManagement'
import AllOrders from '../screens/back/business/AllOrders'
import MyRequest from '../screens/back/business/MyRequest'
import MyPillars from '../screens/back/business/MyPillars'
import InfluencerList from '../screens/back/advertiser/InfluencerList'
import BusinessRequest from '../screens/back/advertiser/BusinessRequest'
import ProductDetails from '../screens/back/explore/ProductDetails'
import Cart from '../screens/back/explore/Cart'
import SelectAddress from '../screens/back/explore/SelectAddress'
import AddAddress from '../screens/back/explore/AddAddress'
import ExpoerReview from '../screens/back/explore/ExpoerReview'
import PaymentDetails from '../screens/back/explore/PaymentDetails'
import Coupons from '../screens/back/explore/Coupons'
import PaymentSuccess from '../screens/back/explore/PaymentSuccess'
import MyOrders from '../screens/back/explore/MyOrders'
import ViewExploreProfile from '../screens/back/explore/ViewExporeProfile'
import ReelsComments from '../screens/back/explore/ReelsComments'
import GuideScreen from '../screens/back/explore/GuideScreen'
import BusinessProfileView from '../screens/back/business/BusinessProfileView'
import InfluencerProfileView from '../screens/back/business/influencerProfileView'
import NumberLogin from '../screens/front/Numberlogin'
import VisitProfile from '../screens/back/explore/VisitProfile'
import SalesDashboard from '../screens/back/business/SalesDashboard'
import ReturnsDashboard from '../screens/back/business/ReturnsDashboard'
import Settings from '../screens/back/advertiser/Settings'
import HelpAndSupports from '../screens/back/business/HelpAndSupports'
import About from '../screens/back/business/About'
import SavedCollection from '../screens/back/explore/SavedCollection'
import NumberOtp from '../screens/front/NumberOtp'
import SpecificPost from '../screens/back/explore/SpecificPost'
import SearchBar from '../components/explore/SearchBar'
import LikeProfileVisit from '../screens/back/explore/LikeProfileVisit'
import Businessproductpreview from '../screens/back/business/Businessproductpreview'
import Productedit from '../screens/back/business/Productedit'
import Notification from '../screens/back/explore/Notification'
import AddProductPreview from '../screens/back/business/AddProductPreview'
import NotificationScreen from '../screens/back/business/NotificationScreen'
import AdvertiserList from '../screens/back/business/AdvertiserList'
import AdvertiserPillar from '../screens/back/business/AdvertiserPillar'
import AddService from '../screens/back/business/AddService'
import EditService from '../screens/back/business/EditService'
import SetNewPassword from '../screens/common/SetNewPassword'
const Stack = createNativeStackNavigator()

const AuthNavigation = (props) => {

    return (
        <>
            <StatusBar backgroundColor="transparent" translucent={true} />
            <Stack.Navigator screenOptions={{
                headerShown: false,
            }}
                initialRouteName={props?.initialroute}
            >
                <Stack.Screen name="/" component={Discover} />
                <Stack.Screen name='/businessView' component={BusinessProfileView} />
                <Stack.Screen name='/influencerView' component={InfluencerProfileView} />
                <Stack.Screen name="/home" component={HomeScreen} initialParams={{ authentication: props.authentication }} />
                <Stack.Screen name='/my-requests' component={MyRequest} />
                <Stack.Screen name='/H3Ed' component={MyRequest} />
                <Stack.Screen name='/my-pillars' component={MyPillars} />
                <Stack.Screen name='/Advertiser-Pillar' component={AdvertiserPillar} />
                <Stack.Screen name='/influencer-list' component={InfluencerList} />
                <Stack.Screen name='/advertiserList-list' component={AdvertiserList} />
                <Stack.Screen name='/influencer-request' component={BusinessRequest} />
                <Stack.Screen name="/productScreen" component={ProductsScreen} />
                <Stack.Screen name="/all-orders" component={AllOrders} />
                <Stack.Screen name="/add-product" component={AddProduct} />
                <Stack.Screen name="/add-service" component={AddService} />
                <Stack.Screen name="/edit-service" component={EditService} />
                <Stack.Screen name="/product-overview" component={ProductOverview} />
                <Stack.Screen name="/product-preview" component={ProductPreview} />
                <Stack.Screen name="/email-verify" component={EmailVerification} />
                <Stack.Screen name="/number-verify" component={NumberLogin} />
                <Stack.Screen name="/business-signup" component={BusinessSignup} barStyle={{ backgroundColor: 'transparent', }} />
                <Stack.Screen name="/business-login" component={BusinessSignIn} barStyle={{ backgroundColor: 'transparent', }} />
                <Stack.Screen name="/email-otp" component={EmailOtp} barStyle={{ backgroundColor: 'transparent', }} />
                <Stack.Screen name="/Number-Otp" component={NumberOtp} barStyle={{ backgroundColor: 'transparent', }} />
                <Stack.Screen name="/business-otp" component={BusinessOtp} barStyle={{ backgroundColor: 'transparent', }} initialParams={{ authentication: props.authentication }} />
                <Stack.Screen name="/categories" component={Category} barStyle={{ backgroundColor: 'transparent', }} />
                <Stack.Screen name="/business-registration" component={BusinessRegistration} />
                <Stack.Screen name="/addhaar-no" component={AadhaarNo} />
                <Stack.Screen name="/aadhar-verification" component={AdharVerification} initialParams={{ authentication: props.authentication }} />
                <Stack.Screen name="/bank-details" component={BankDetails} initialParams={{ authentication: props.authentication }} />
                <Stack.Screen name="/forgot-password" component={ForgotPassword} />
                <Stack.Screen name='/reset-password' component={ResetPassword} />
                <Stack.Screen name='/change-password' component={ChangePassword} />
                <Stack.Screen name="/view-explore-profile" component={ViewExploreProfile} />
                <Stack.Screen name='/reels-comments' component={ReelsComments} />
                <Stack.Screen name='/exploer-registration' component={ExplorerSignup} />
                <Stack.Screen name='/explore-otp' component={ExploreOtp} />
                <Stack.Screen name='/signup-details' component={SignupDetails} initialParams={{ authentication: props.authentication }} />
                <Stack.Screen name='/goto-signin' component={Signin} initialParams={{ authentication: props.authentication }} />
                <Stack.Screen name='/reels' component={Reels} />
                <Stack.Screen name='/infliencer-signup' component={InfluencerSignup} />
                <Stack.Screen name='/influencer-otp' component={InfluencerOtp} />
                <Stack.Screen name='/dob' component={InfluencerDob} />
                <Stack.Screen name='/influencer-registration' component={InfluencerRegistration} />
                <Stack.Screen name='/influencer-stack-navigation' component={StackNavigationInfluencer} />
                <Stack.Screen name='/advertiser-signup' component={AdvertiserSignin} />
                <Stack.Screen name='/HelpAnd-Supports' component={HelpAndSupports} />
                <Stack.Screen name='/advertiser-otp' component={AdvertiserOtp} />
                <Stack.Screen name='/advertiser-categories' component={AdvertiserCategory} />
                <Stack.Screen name='/advertiser-signin-with-pass' component={AdvertiserSiginWithPass} />
                <Stack.Screen name='/forgot-password-advertiser' component={ForgotPasswordAdvertiser} />
                <Stack.Screen name='/update-password' component={UpdatePasswordAdvertiser} />
                <Stack.Screen name='/advertise-registration' component={AdvertiserRegistration} />
                <Stack.Screen name='/other-details' component={OtherDetails} />
                <Stack.Screen name='/advertiser-product' component={StackNavigationAdvertiser} />
                <Stack.Screen name='/profileScreen' component={ProfileScreen} />
                <Stack.Screen name='/edit-user-info' component={EditUser} />
                <Stack.Screen name='/user-management' component={UserManagement} />
                <Stack.Screen name='/settings' component={Settings} />
                <Stack.Screen name='/About' component={About} />
                <Stack.Screen name='/product-details' component={ProductDetails} />
                <Stack.Screen name='/cart' component={Cart} />
                <Stack.Screen name='/category' component={Category} />
                <Stack.Screen name='/goto-select-address' component={SelectAddress} />
                <Stack.Screen name='/add-address' component={AddAddress} />
                <Stack.Screen name='/explore-review' component={ExpoerReview} />
                <Stack.Screen name='/payment-details' component={PaymentDetails} />
                <Stack.Screen name='/all-coupons' component={Coupons} />
                <Stack.Screen name='/payment-success' component={PaymentSuccess} />
                <Stack.Screen name='/payment-error' component={PaymentSuccess} />
                <Stack.Screen name='/my-orders' component={MyOrders} />
                <Stack.Screen name='/visit-profile' component={VisitProfile} />
                <Stack.Screen name='/GuideScreen' component={GuideScreen} />
                <Stack.Screen name='/Sales-Dashboard' component={SalesDashboard} />
                <Stack.Screen name='/Returns-Dashboard' component={ReturnsDashboard} />
                <Stack.Screen name='/saved-collection' component={SavedCollection} />
                <Stack.Screen name="/specific-post" component={SpecificPost} />
                <Stack.Screen name="/Search-Bar" component={SearchBar} />
                <Stack.Screen name="/LikeProfile-Visit" component={LikeProfileVisit} />
                <Stack.Screen name="/Businessproduct-preview" component={Businessproductpreview} />
                <Stack.Screen name="/Product-edit" component={Productedit} />
                <Stack.Screen name="/add-product-preview" component={AddProductPreview} />
                <Stack.Screen name="/Notification" component={Notification} />
                <Stack.Screen name="/NotificationScreen" component={NotificationScreen} />
                <Stack.Screen name="/Set-New-Password" component={SetNewPassword} />

                {/* <Stack.Screen name='/admin-signin' component={AdminSignin} />
                <Stack.Screen name='/forgot-password-admin' component={ForgotPasswordAdmin} />
                <Stack.Screen name='/set-password-admin' component={SetPasswordAdmin} />
                <Stack.Screen name='/change-password-admin' component={ChangePasswordAdmin} />
                <Stack.Screen name='/admin-stack-navigation' component={StackNavigationAdmin} /> */}
            </Stack.Navigator>
        </>
    )
}

export default AuthNavigation