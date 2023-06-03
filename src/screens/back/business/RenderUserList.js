import React, { useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Pressable,
} from 'react-native'
import Constants from '../../../shared/Constants'
import Feather from 'react-native-vector-icons/Feather'

const RenderUserList = ({data,privilagesData})=>{
    const [active, setActive] = useState(data.item.is_active)
    // const gotoEditUser = ()=>{

    // }
    
    return (
        <View style={styles.userList}>
            {/* <Feather name='edit-2' style={styles.editIcon} size={22} 
            // onPress={gotoEditUser} 
            /> */}
            {/* {console.log("item.privilages_name",data.item)} */}
            <Text style={[styles.userName,{width:'30%'}]}>{data.item.name}</Text>
            <Text style={[styles.userName, {width:'50%'}]}>{data.item.PrivillageName}</Text>
            <Pressable style={[styles.codContainer, {width:'30%'}]} onPress={()=>setActive(!active)}>
                <View style={active?styles.inStockOuter:styles.outOfStockOuter}>
                    <View style={active?styles.inStockInner:styles.outOfStockInner}></View>
                </View>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    userList: {
        marginTop: Constants.margin,
        flexDirection: 'row',
        marginBottom: 12,
    },
    showInline: {
        flexDirection: 'row',
    },
    userName: {
        textTransform:'capitalize',
        fontFamily: Constants.fontFamily,
        fontWeight: '800',
    },
    editIcon: {
        marginRight: 18,
    },
    codContainer: {
        flexDirection: 'row',
    },
    inStockText: {
        fontFamily: Constants.fontFamily,
        fontSize: 16,
        fontWeight: '700',
        marginLeft: 12,
    },
    inStockOuter: {
        width: 42,
        height: 22,
        borderRadius: 20,
        backgroundColor: Constants.colors.primaryColor,
        marginTop: 2,
    },
    outOfStockOuter: {
        width: 42,
        height: 22,
        borderRadius: 20,
        marginTop: 2,
        backgroundColor: '#ABABAB',
    },
    inStockInner: {
        width: 18,
        height: 18,
        backgroundColor: Constants.colors.whiteColor,
        borderRadius: 18,
        position: 'absolute',
        top: 2,
        right: 2,
    },
    outOfStockInner: {
        width: 18,
        height: 18,
        backgroundColor: Constants.colors.whiteColor,
        borderWidth: 1,
        borderColor: Constants.colors.bodyBg,
        borderRadius: 18,
        position: 'absolute',
        top: 2,
        left: 2,
    },
    isStockCodContainer: {
        flexDirection: 'row',
        marginBottom: Constants.margin,
    },
})

export default RenderUserList