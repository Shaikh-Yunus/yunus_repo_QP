import React from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
    Pressable,
} from 'react-native'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import Fontisto from 'react-native-vector-icons/Fontisto'
import Constants from '../shared/Constants'
import Images from '../assets/images/Images'

const CustomDrawerContentBusiness=(props)=>{
    const logout = ()=> {
        
    }
    return (
        <View style={styles.wrapper}>
            <DrawerContentScrollView {...props} contentContainerStyle={{
                backgroundColor: Constants.colors.whiteColor,
            }}>
                <View style={styles.wrapper}>
                    <View style={styles.header}>
                        <AntDesign name='close' size={24} onPress={()=>props.navigation.closeDrawer()} style={{marginTop: -16,}} />
                        <View style={styles.profileDetails}>
                            <View style={styles.profileIcon}>
                                <Image source={Images.avatar} />
                            </View>
                            <View>
                                <Text style={styles.preofileName}>Tanveer Inamdar</Text>
                                <Text style={styles.founder}>Founder XYZ</Text>
                            </View>
                        </View>
                    </View>
                    <DrawerItemList {...props} />               
                </View>
            </DrawerContentScrollView>
            <Pressable onPress={logout} style={styles.logoutMenu}>
                <AntDesign name='logout' style={styles.drawerIcon} />
                <Text style={styles.drawerLabel} >Logout</Text>
            </Pressable>
        </View>
    )
}
const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    header: {
        padding: Constants.padding,
        height: 120,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    profileDetails: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#676767',
        paddingBottom: Constants.padding,
    },
    profileIcon: {
        borderRadius: Constants.borderRadius,
        borderWidth: 1,
        borderColor: '#000000',
        padding: 8,
        marginEnd: 10,
    },
    preofileName: {
        fontFamily: Constants.fontFamily,
        fontSize: 18,
        fontWeight: '600',
    },
    founder: {
        color: '#424242',
        opacity: 0.78,
        fontFamily: Constants.fontFamily,
    },
    logoutMenu: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        backgroundColor: `rgba(0, 169, 40, 0.1)`,
        marginBottom: 50,
    },
    drawerIcon: {
        fontSize: 28,
        marginEnd: 24,
    },
    drawerLabel: {
        fontFamily: Constants.fontFamily,
        fontSize: 17,
        fontWeight: '700',
    },
})
export default CustomDrawerContentBusiness