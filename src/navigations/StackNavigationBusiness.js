import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Dashboard from '../screens/back/business/Dashboard'
import TabNavigationBusiness from './TabNavigationBusiness'
import ProductDetails from '../screens/back/business/ProductDetails'
import AddProduct from '../screens/back/business/AddProduct'
import EditUser from '../screens/back/business/EditUser'
import UserManagement from '../screens/back/business/UserManagement'
import AllOrders from '../screens/back/business/AllOrders'
import SalesReturnDetails from '../screens/back/business/SalesReturnDetails'
import ProductOverview from '../screens/back/business/ProductOverview'


const Stack = createNativeStackNavigator()

const StackNavigationBusiness=(props)=>{
    return (
            <Stack.Navigator initialRouteName='business-tabs' screenOptions={{
                headerShown: false,
            }}>
                <Stack.Screen name="/business-tabs" component={TabNavigationBusiness} initialParams={props.route.params} />
                <Stack.Screen name="/business-dashboard" component={Dashboard} />
                <Stack.Screen name='/product-details' component={ProductDetails} />
                <Stack.Screen name='/add-product' component={AddProduct} />
                <Stack.Screen name='/product-overview' component={ProductOverview} />
                <Stack.Screen name='/edit-user-info' component={EditUser} />
                <Stack.Screen name='/user-management' component={UserManagement} />
                
                <Stack.Screen name='/all-orders' component={AllOrders} />
                <Stack.Screen name='/sales-return-details' component={SalesReturnDetails} />
                
            </Stack.Navigator>
    )
}

export default StackNavigationBusiness