import React, { useState } from 'react'
import {
    View,
    StyleSheet,
    Text,
    FlatList,
    ScrollView,
    Pressable,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Constants from '../../../shared/Constants'
import globatStyles from '../../../shared/globatStyles'
import CustomAppBar from '../../../components/admin/CustomAppBar'
import RenderUsers from './RenderUsers'
import CompanyUsers from './CompanyUsers'


const UserManagement = (props) => {
    const [tabs, setTab] = useState('company')
    const [showAddUser, setShowAddUser] = useState(false)
    const navigation = useNavigation()
    const users = [
        {id: 1,},
        {id: 2,},
        {id: 3,},
        {id: 4,},
        {id: 5,},
        {id: 6,},
        {id: 7,},
        {id: 8,},
    ]
    const gotoModerator = ()=>{
        navigation.navigate('/add-moderator')
    }
    const gotoCustom = ()=>{
        navigation.navigate('/add-custom-user')
    }
    return (
        <View style={styles.container}>
            <CustomAppBar navigation={props.navigation} isMainscreen={false} isReel={false} title='User Management' />
            <ScrollView style={styles.wrapper}>
                <Text style={{fontFamily: Constants.fontFamily}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut .</Text>
                <View style={[styles.tabContainer, { paddingBottom: 0, }]}>
                    <Text style={[styles.tab, { color: tabs === 'company' ? Constants.colors.primaryColor : '#676767', textDecorationLine: tabs === 'company' ? 'underline' : 'none', }]} onPress={() => setTab('company')}>Company</Text>
                    <Text style={[styles.tab, { color: tabs === 'appusers' ? Constants.colors.primaryColor : '#676767', textDecorationLine: tabs === 'appusers' ? 'underline' : 'none', }]} onPress={() => setTab('appusers')}>App Users</Text>
                </View>
                <FlatList
                    data={users}
                    showsVerticalScrollIndicator={false}
                    renderItem={item=>tabs === 'company'?<RenderUsers item={item} />:<CompanyUsers item />}
                    keyExtractor={item=>item?.id?.toString()}
                    />
            </ScrollView>
            <Pressable style={styles.flotingBtn} onPress={()=>setShowAddUser(!showAddUser)}>
                <View style={styles.flotingBtnInner}>
                    <Text style={styles.floatingIcon}>+</Text>
                </View>
            </Pressable>
            {
                showAddUser?(
                    <View style={styles.addUserMenu}>
                        <Text style={{fontSize: 20, fontFamily: Constants.fontFamily,}}>Add User</Text>
                        <View style={globatStyles.divider}></View>
                        <Pressable onPress={gotoModerator}><Text style={{fontFamily: Constants.fontFamily, fontSize:16,marginBottom: 20,fontWeight: '700',}}>Moderator</Text></Pressable>
                        <Pressable onPress={gotoCustom}><Text style={{fontFamily: Constants.fontFamily, fontSize:16,fontWeight: '700',}}>Custom</Text></Pressable>
                    </View>
                ):null
            }
            {
                showAddUser?<View style={globatStyles.overlay}></View>:null
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 3,
        flex: 1,
    },
    wrapper: {
        padding: Constants.padding,
    },
    tabContainer: {
        marginTop: Constants.margin,
        marginBottom: 12,
        flexDirection: 'row',
    },
    tab: {
        fontFamily: Constants.fontFamily,
        fontSize: 18,
        fontWeight: '700',
        marginRight: 12,
        color: '#676767',
    },
    flotingBtn: {
        position: 'absolute',
        right: 20,
        bottom: 20,
        width: 60,
        height: 60,
        borderRadius: 50,
        backgroundColor: Constants.colors.primaryColor,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 6,
        zIndex: 999,
    },
    flotingBtnInner: {
        width: 30,
        height: 30,
        borderRadius: 30,
        backgroundColor: Constants.colors.whiteColor,
        justifyContent: 'center',
        alignItems: 'center',
    },
    floatingIcon: {
        fontSize: 20,
        color: Constants.colors.primaryColor,
    },
    addUserMenu: {
        position: 'absolute',
        bottom: 50,
        right: 90,
        padding: Constants.padding+10,
        backgroundColor: Constants.colors.whiteColor,
        zIndex: 999,
        borderRadius: Constants.borderRadius,
        borderBottomRightRadius: 0,
    },
})

export default UserManagement