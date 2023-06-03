import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import TabNavigationAdmin from './TabNavigationAdmin'
import AllCompaints from '../screens/back/admin/AllComplaints'
import HomeScreen from '../screens/back/admin/HomeScreen'
import SupportScreen from '../screens/back/admin/SupportScreen'
import Settings from '../screens/back/admin/Settings'
import Profile from '../screens/back/admin/Profile'
import EmailSupports from '../screens/back/admin/EmailSupport'
import AppRattings from '../screens/back/admin/AppRattings'
import UserManagement from '../screens/back/admin/UserManagement'
import AddModerator from '../screens/back/admin/AddModerator'
import AddCustomUser from '../screens/back/admin/AddCustomUser'
import Users from '../screens/back/admin/Users'
import NotificationScreen from '../screens/back/business/NotificationScreen'

const Stack = createNativeStackNavigator()

const StackNavigationAdmin=(props)=>{
    return (
            <Stack.Navigator initialRouteName='/home' screenOptions={{
                headerShown: false,
            }}>
                <Stack.Screen name="/home" component={HomeScreen} initialParams={props.route.params} />
                <Stack.Screen name="/support" component={SupportScreen} />
                <Stack.Screen name="/setting" component={Settings} />
                <Stack.Screen name="/profile" component={Profile} />
                <Stack.Screen name='/all-complaints' component={AllCompaints} />
                <Stack.Screen name='/email-support' component={EmailSupports} />
                <Stack.Screen name='/app-ratting' component={AppRattings} />
                <Stack.Screen name='/user-managemnt' component={UserManagement} />
                <Stack.Screen name='/add-moderator' component={AddModerator} />
                <Stack.Screen name='/add-custom-user' component={AddCustomUser} />
                <Stack.Screen name='/users' component={Users} />
                <Stack.Screen name="/NotificationScreen" component={NotificationScreen} />
            </Stack.Navigator>
    )
}

export default StackNavigationAdmin