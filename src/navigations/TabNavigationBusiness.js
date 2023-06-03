import React from 'react'
import {
    View,
    StyleSheet,
    StatusBar
} from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../screens/back/business/HomeScreen'
import ProductsScreen from '../screens/back/business/ProductsScreen'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import Constants from '../shared/Constants'
import NotificationScreen from '../screens/back/business/NotificationScreen'
import ProfileScreen from '../screens/back/business/ProfileScreen'

const Tab = createBottomTabNavigator()

const TabNavigationBusiness = (props) => {
    return (
        <>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === 'Home') {
                            iconName = focused
                                ? 'home'
                                : 'home';
                        } else if (route.name === 'Products') {
                            iconName = focused ? 'archive' : 'archive';
                        }
                        else if (route.name === 'Notification') {
                            iconName = focused ? 'notifications-outline' : 'notifications-outline';
                        }
                        else if (route.name === 'Profile') {
                            iconName = focused ? 'user' : 'user';
                        }

                        return <>

                            {
                                route.name === 'Home' ? <AntDesign name={iconName} size={28} color={color} /> :
                                    route.name === 'Products' ? <Feather name={iconName} size={28} color={color} /> :
                                        route.name === 'Notification' ? <View><View style={styles.notificationIndicator}></View><Ionicons name={iconName} size={28} color={color} /></View> :
                                            <Feather name={iconName} size={28} color={color} />
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
                        overflow: 'hidden',
                        left: 0,
                        bottom: 0,
                        right: 0,
                    },
                    tabBarLabelStyle: {
                        fontSize: 16,
                        fontFamily: Constants.fontFamily,
                        marginBottom: 8,
                    },
                })}
            >
                <Tab.Screen name="Home" component={HomeScreen}
                // initialParams={props.route.params}
                />
                <Tab.Screen name="Products" component={ProductsScreen} />
                <Tab.Screen name="Notification" component={NotificationScreen} />
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

export default TabNavigationBusiness