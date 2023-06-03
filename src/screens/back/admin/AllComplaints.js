import React, { useState } from 'react'
import {
    View,
    StyleSheet,
    StatusBar,
    ScrollView,
    FlatList,
} from 'react-native'
import CustomAppBar from '../../../components/admin/CustomAppBar'
import { useNavigation } from '@react-navigation/native'
import globatStyles from '../../../shared/globatStyles'
import Constants from '../../../shared/Constants'
import RenderComplaints from './RenderComplaints'


const AllCompaints = (props) => {
    const navigation = useNavigation()
    const complaints = [
        {
            id: 1,
        },
        {
            id: 2,
        },
        {
            id: 3,
        },
        {
            id: 4,
        },
        {
            id: 5,
        },
        {
            id: 6,
        },
        {
            id: 7,
        },
    ]
    return (
        <View style={globatStyles.wrapper}>
            <StatusBar translucent={true} backgroundColor='transparent' />
            <CustomAppBar navigation={navigation} isMainscreen={false} isReel={false} headerRight={false} title='All Compaints' />
            <ScrollView>
                <FlatList
                    data={complaints}
                    renderItem={item=><RenderComplaints item={item} />}
                    keyExtractor={item=>item?.id?.toString()} 
                   />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: Constants.padding,
    },

})

export default AllCompaints