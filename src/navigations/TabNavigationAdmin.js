import React from 'react'
import {
    View,
    StyleSheet,
    StatusBar
} from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../screens/back/admin/HomeScreen'
import SupportScreen from '../screens/back/admin/SupportScreen'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import Constants from '../shared/Constants'
import ProfileScreen from '../screens/back/admin/ProfileScreen'
import Settings from '../screens/back/admin/Settings'

const Tab = createBottomTabNavigator()

const TabNavigationAdmin=(props)=>{
    return (
        <>
            <Tab.Navigator
                initialRouteName='Home'
                screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                    iconName = focused
                        ? 'home'
                        : 'home';
                    } else if (route.name === 'Support') {
                    iconName = focused ? 'help-circle' : 'help-circle';
                    }
                    else if (route.name === 'Settings') {
                        iconName = focused ? 'setting' : 'setting';
                    }
                    else if (route.name === 'Profile') {
                        iconName = focused ? 'user' : 'user';
                    }

                    return  <>
                                
                        {
                            route.name === 'Home'?<AntDesign name={iconName} size={28} color={color} />:
                            route.name === 'Support'?<Feather name={iconName} size={28} color={color} />:
                            route.name === 'Settings'?<View><AntDesign name={iconName} size={28} color={color} /></View>:
                            <Feather name={iconName}  size={28} color={color} />
                        }
                    </>;
                },
                
                tabBarActiveTintColor: Constants.colors.primaryColor,
                tabBarInactiveTintColor: '#BBBBBB',
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: Constants.colors.whiteColor,
                    height: 80,
                    borderTopLeftRadius: 50,
                    borderTopRightRadius: 50,
                    position: 'absolute',
                    overflow:'hidden',
                    left: 0,
                    bottom: 0,
                    right: 0,
                    transform: [
                        // {translateX: 235,},
                        // {scale: 0.88},
                        // {translateY: -51,}
                    ],
                },
                tabBarLabelStyle: {
                    fontSize: 16,
                    fontFamily: Constants.fontFamily,
                    marginBottom: 8,
                },
                })}
            >
                <Tab.Screen name="Home" component={HomeScreen} initialParams={props.route.params}/>
                <Tab.Screen name="Support" component={SupportScreen} />
                <Tab.Screen name="Settings" component={Settings} />
                <Tab.Screen name="Profile" component={ProfileScreen} />
            </Tab.Navigator>
        </>
    )
}

const styles = StyleSheet.create({
    notificationIndicator: {
        width: 10,
        height: 10,
        borderRadius: 10,
        backgroundColor: '#FF7E7E',
        position: 'absolute',
        right: 5,
        top: 5,
        borderWidth: 2,
        borderColor: Constants.colors.whiteColor,
        zIndex: 222,
    }
})

export default TabNavigationAdmin