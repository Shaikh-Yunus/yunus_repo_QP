import React from 'react'
import {
    Text,
    StyleSheet
 } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import CustomDrawerContentBusiness from './CustomDrawerContentBusiness'
import StackNavigationBusiness from './StackNavigationBusiness'
import Images from '../assets/images/Images'
import MyPillars from '../screens/back/business/MyPillars'
import MyRequest from '../screens/back/business/MyRequest'
import SwitchViewAs from '../screens/back/business/SwitchViewAs'
import Settings from '../screens/back/business/Settings'
import HelpAndSupports from '../screens/back/business/HelpAndSupports'
import About from '../screens/back/business/About'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import Fontisto from 'react-native-vector-icons/Fontisto'
import Constants from '../shared/Constants'
import Chat from '../screens/back/business/Chat'
import Sales from '../screens/back/business/Sales'
import SalesReturn from '../screens/back/business/SalesReturn'

const Drawer = createDrawerNavigator()

const DrawerNavigationBusiness  = ()=>{
    
    return (
        <Drawer.Navigator initialRouteName="StackNavigationBusiness" screenOptions={{
            headerShown: false,
            drawerActiveBackgroundColor: `rgba(0, 169, 40, 0.1)`,
            drawerActiveTintColor: Constants.colors.primaryColor,
            overlayColor: 'rgba(0, 38, 17, 0.64)',
            drawerItemStyle: {
                marginLeft: 0,
                marginRight: 0,
                paddingLeft: 16,
                marginRight: 0,
            },
        }} drawerContent={props=><CustomDrawerContentBusiness {...props} />}>
           
            <Drawer.Screen name="my-pillars" component={MyPillars} options={{
                drawerIcon: props=> <AntDesign style={styles.drawerIcon} name="menufold"/>,
                drawerLabel: ()=><Text style={styles.drawerLabel}>My Pillars</Text>,
            }}/>
            <Drawer.Screen name="my-requests" component={MyRequest} options={{
                drawerIcon: props=> <Feather style={styles.drawerIcon} name="user-minus"/>,
                drawerLabel: ()=><Text style={styles.drawerLabel}>My Requests</Text>
            }}/>
            <Drawer.Screen name="switch-view-as" component={StackNavigationBusiness} initialParams={{switchAccount: true}} options={{
                drawerIcon: props=> <Fontisto style={styles.drawerIcon} name="arrow-swap"/>,
                drawerLabel: ()=><Text style={styles.drawerLabel}>Switch View As</Text>,
            }}/>
            <Drawer.Screen name="settings" component={Settings} options={{
                drawerIcon: props=> <AntDesign style={styles.drawerIcon} name="setting"/>,
                drawerLabel: ()=><Text style={styles.drawerLabel}>Settings</Text>
            }}/>
            <Drawer.Screen name="help-support" component={HelpAndSupports} options={{
                drawerIcon: props=> <Feather style={styles.drawerIcon} name="help-circle"/>,
                drawerLabel: ()=><Text style={styles.drawerLabel}>Help/Support</Text>
            }}/>
            <Drawer.Screen name="about" component={About} options={{
                drawerIcon: props=> <Feather style={styles.drawerIcon} name="info"/>,
                drawerLabel: ()=><Text style={styles.drawerLabel}>About</Text>
            }}/>
            <Drawer.Screen name="chat" component={Chat} options={{
                drawerIcon: props=> <Fontisto style={styles.drawerIcon} name="hipchat"/>,
                drawerLabel: ()=><Text style={styles.drawerLabel}>Chat</Text>
            }}/>
            <Drawer.Screen name="sales" component={Sales} options={{
                drawerIcon: props=> <Fontisto style={styles.drawerIcon} name="shopping-sale"/>,
                drawerLabel: ()=><Text style={styles.drawerLabel}>Sales</Text>
            }}/>
            <Drawer.Screen name="sales-return" component={SalesReturn} options={{
                drawerIcon: props=> <Fontisto style={styles.drawerIcon} name="arrow-return-left"/>,
                drawerLabel: ()=><Text style={styles.drawerLabel}>Sales Return</Text>
            }}/>
            <Drawer.Screen name="StackNavigationBusiness" component={StackNavigationBusiness} options={{
                drawerLabel: ()=>null,
                drawerActiveBackgroundColor: 'transparent'
            }} />
        </Drawer.Navigator>
    )
}

const styles = StyleSheet.create({
    drawerIcon: {
        fontSize: 28,
    },
    drawerLabel: {
        fontFamily: Constants.fontFamily,
        fontSize: 17,
        fontWeight: '700',
        marginStart: -10,
    },
})

export default DrawerNavigationBusiness