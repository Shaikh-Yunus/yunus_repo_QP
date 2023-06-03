import React from 'react'
import {
    Text,
    StyleSheet
 } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import CustomDrawerContentBusiness from './CustomDrawerContentBusiness'
import StackNavigationExplore from './StackNavigationExplore'
import Notification from '../screens/back/explore/Notification'
import MyOrders from '../screens/back/explore/MyOrders'
import Settings from '../screens/back/explore/Settings'
import HelpAndSupports from '../screens/back/explore/HelpAndSupports'
import SwitchViewAs from '../screens/back/explore/SwitchViewAs'
import About from '../screens/back/explore/About'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import Fontisto from 'react-native-vector-icons/Fontisto'
import Constants from '../shared/Constants'
import SavedCollection from '../screens/back/explore/SavedCollection'


const Drawer = createDrawerNavigator()

const DrawerNavigationExploer  = ()=>{
    
    return (
        <Drawer.Navigator initialRouteName="StackNavigationExplore" screenOptions={{
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
           
            <Drawer.Screen name="my-pillars" component={Notification} options={{
                drawerIcon: props=> <Feather style={styles.drawerIcon} name="bell"/>,
                drawerLabel: ()=><Text style={styles.drawerLabel}>Notifications</Text>,
            }} />
            <Drawer.Screen name="my-requests" component={MyOrders} options={{
                drawerIcon: props=> <Feather style={styles.drawerIcon} name="user-minus"/>,
                drawerLabel: ()=><Text style={styles.drawerLabel}>My Orders</Text>
            }}/>
            <Drawer.Screen name="switch-view-as" component={StackNavigationExplore} initialParams={{switchAccount: true}} options={{
                drawerIcon: props=> <Fontisto style={styles.drawerIcon} name="arrow-swap"/>,
                drawerLabel: ()=><Text style={styles.drawerLabel}>Switch View As</Text>,
            }}/>
            <Drawer.Screen name="Saved Post" component={SavedCollection} options={{
                drawerIcon: props=> <FontAwesome style={styles.drawerIcon} name="bookmark"/>,
                drawerLabel: ()=><Text style={styles.drawerLabel}>About</Text>
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
            <Drawer.Screen name="StackNavigationExplore" component={StackNavigationExplore} options={{
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

export default DrawerNavigationExploer