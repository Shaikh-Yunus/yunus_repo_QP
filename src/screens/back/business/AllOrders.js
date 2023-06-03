import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Pressable,
    ScrollView,
    ActivityIndicator,
} from 'react-native'
import Images from '../../../assets/images/Images'
import Constants from '../../../shared/Constants'
import RenderOrders from './RenderOrders'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { SafeAreaView } from 'react-native-safe-area-context'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import Loading from '../../../components/Loading'


const AllOrders = (props)=>{
    const [loader,setLoader]=useState(false)
    const [data,setData]=useState([])
    const goBack = ()=>{
        props.navigation.goBack()
    }
    const orders = [
        {
            id: 1,
            img: Images.myPillarIcon,
        },
        {
            id: 2,
            img: Images.myPillarIcon,
        },
        {
            id: 3,
            img: Images.myPillarIcon,
        },
        {
            id: 4,
            img: Images.myPillarIcon,
        },
        {
            id: 5,
            img: Images.myPillarIcon,
        },
        {
            id: 6,
            img: Images.myPillarIcon,
        },
    ]
    const getAllOrders=async()=>{
        setLoader(true)
        const userDetails=await AsyncStorage.getItem("userDetails");
        await axios.post(`${Constants.BASE_URL}business/get-products-oders`,{
            "user_id":JSON.parse(userDetails)?.id
        })
        .then((response)=>{
            setLoader(false)
            setData(response.data.data.productDetails)
            // console.log("repsonse data=>",response.data.data.productDetails[0]);
        })
        .catch((error)=>{
            console.log("error=>",error);
        })
    }
    useEffect(()=>{
        getAllOrders()
    },[])
    const EmptyListMessage = ({item}) => {
        return (
          // Flat List Item
          <Text
            style={styles.emptyListStyle}
            >
            No Orders Found
          </Text>
        );
      };
    return (
        <View style={StyleSheet.wrapper}>
            <SafeAreaView style={{paddingBottom:Constants.padding}}>
            <View style={styles.titleBar}>
                <Pressable onPress={goBack}><AntDesign name='left' size={24} style={props.isReel?styles.reelBackBtn:styles.backBtn} /></Pressable>
                <Text style={styles.title}>Orders ({loader?<ActivityIndicator/>:data?.length})</Text>
                <View style={styles.space}></View>
                {/* <AntDesign name='arrowup' size={20} color={Constants.colors.primaryColor} />
                <Text style={styles.orderNumber}>10</Text> */}
            </View>
            <ScrollView>
                <View style={styles.container}>
                    {/* <Text style={styles.normalText}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut .
                    </Text> */}
                   {loader?
                   <Loading/>
                   :
                    <FlatList
                        style={{marginBottom: 80,flex:1}}
                        data={data}
                        renderItem={item=><RenderOrders pillars={item} />}
                        ListEmptyComponent={EmptyListMessage}
                        keyExtractor={(item,index)=>index?.toString()}
                        // estimatedItemSize={200}
                        />}
                </View>
            </ScrollView>
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    container: {
        flex: 1,
        padding: Constants.padding,
    },
    titleBar: {
        marginTop: 16,
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: 99,
        // paddingBottom: 10,
        paddingStart: 15,
    },
    title: {
        fontFamily: Constants.fontFamily,
        fontSize: 26,
        fontWeight: '800',
        marginStart: 20,
    },
    normalText: {
        fontFamily: Constants.fontFamily,
    },
    space: {
        width: 10,
    },
    orderNumber: {
        fontFamily: Constants.fontFamily,
        fontSize: 20,
        color: Constants.colors.primaryColor,
        fontWeight: '700',
    },
    emptyListStyle: {
        padding: 10,
        fontSize: 18,
        marginTop:10,
        textAlign: 'center',
        fontWeight:"700"
      },
})

export default AllOrders