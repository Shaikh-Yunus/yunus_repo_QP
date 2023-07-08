import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    ScrollView,
    Pressable,
    ActivityIndicator, Image, RefreshControl
} from 'react-native'
import CustomAppBar from '../../../components/explore/CustomAppBar'
import Constants from '../../../shared/Constants'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import globatStyles from '../../../shared/globatStyles'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import Images from '../../../assets/images/Images'
import showToastmsg from '../../../shared/showToastmsg'

const SelectAddress = (props) => {
    const [selectedAddr, setselectedAddr] = useState(0)
    const [loader, setLoader] = useState(false)
    const [deleteLoader, setdeleteLoader] = useState(false)
    const [address, setAddress] = useState([])
    const [refresh, setrefresh] = useState(false)
    const navigation = useNavigation()
    const addAddress = (data) => {
        if (data) {
            navigation.navigate('/add-address', {
                explore_address_id: data.id,
                totalPrice: props?.route?.params?.totalPrice,
                // address_type:type
                price: props?.route?.params?.price,
                cartItems: props?.route?.params?.cartItems,
                userDetails: props?.route?.params?.userDetails,
                editable: true,
                locationName: data.address_name,
                addressLine: data.address,
                pinCode: data.zip_code,
                city: data.city,
                state: data.state,
                landmark: data.landmark,
                discount: props?.route?.params?.discount,
                userDetails: props?.route?.params?.userDetails
            })
        }
        else
            navigation.navigate('/add-address', {
                discount: props?.route?.params?.discount,
                totalPrice: props?.route?.params?.totalPrice,
                // address_type:type,
                price: props?.route?.params?.price, cartItems: props?.route?.params?.cartItems, userDetails: props?.route?.params?.userDetails
            })
    }
    const gotoPayment = () => {
        // let selectAddress={}
        // if(selectedAddr==0){
        //     selectAddress=address.filter((i)=>i.address_type=='Home')
        // }
        // else if(selectedAddr==1){
        //     selectAddress=address.filter((i)=>i.address_type=='Office')
        // }
        // else {
        //         selectAddress=address.filter((i)=>i.address_type=='Others')
        // }
        navigation.navigate('/payment-details', {
            price: props?.route?.params?.price,
            selectedAddress: `${address[selectedAddr].address}, ${address[selectedAddr].city} - ${address[selectedAddr].zip_code}. ${address[selectedAddr].state}. ${address[selectedAddr].landmark}.`,
            discount: props?.route?.params?.discount,
            totalPrice: props?.route?.params?.totalPrice,
            cartItems: props?.route?.params?.cartItems,
            userDetails: props?.route?.params?.userDetails,
            address_id: address[selectedAddr].id
        })
    }
    const getAddress = () => {
        setLoader(true)
        axios.post(`${Constants.BASE_URL}auth/get-user-address`, {
            user_id: props?.route?.params?.userDetails?.id
        }).then((response) => {
            setLoader(false)
            console.log("address data=>", response.data);
            if (response.data.data.explore_address) {
                setAddress(response.data.data.explore_address)
                setselectedAddr(0)
            }
        })
            .catch((error) => {
                console.log("error", error);
            })
    }
    const deleteAddress = (id) => {
        setdeleteLoader(id)
        axios.post(`${Constants.BASE_URL}auth/delete-user-address`, {
            user_address_id: id
        })
            .then((response) => {
                setdeleteLoader(false)
                getAddress()
            })
            .catch((error) => {
                showToastmsg("Cannot delete address. Try again.")
                setdeleteLoader(false)
            })
    }
    useEffect(() => {
        getAddress()
    }, [props?.route?.params])
    return (
        <View style={styles.container}>
            <StatusBar translucent={true} backgroundColor='transparent' />
            <CustomAppBar navigation={navigation} isMainscreen={false} isReel={false} title='Select Address' headerRight={false} />
            <ScrollView style={styles.wrapper} refreshControl={<RefreshControl
                refreshing={refresh}
                onRefresh={() => getAddress()}
            />}>
                <Text style={styles.description}>
                    Choose from your saved addresses and proceed to confirm your order.
                </Text>
                <Pressable onPress={() => addAddress()} style={globatStyles.btnAddAddress}><Text style={[globatStyles.btnTextAddress, { paddingLeft: 15 }]}><Image source={Images.PlusIcon} />   Add Address</Text></Pressable>

                <Text style={styles.heading}>Saved Address</Text>
                <View style={globatStyles.divider}></View>
                {loader ?
                    <ActivityIndicator /> :
                    address.length > 0 ?
                        address.map((item, index) => <>
                            <Pressable style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} onPress={() => setselectedAddr(index)}>

                                <View style={{ width: '20%', display: 'flex', alignItems: 'center' }}><FontAwesome name='map-pin' size={22} /></View>
                                <View style={{ width: '80%' }}>
                                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text style={[styles.addressDetails, { fontWeight: selectedAddr === index ? '800' : 'normal' }]}>{item.address_name}</Text>
                                        <View style={{ flexDirection: "row" }}>
                                            <Pressable onPress={() => addAddress(item)}>
                                                <FontAwesome name='pencil' size={15} style={{ marginRight: 10 }} />
                                            </Pressable>
                                            {address.length > 1 ? <Pressable
                                                onPress={() => deleteAddress(item?.id)}
                                            >
                                                {deleteLoader === item.id ?
                                                    <ActivityIndicator />
                                                    : <FontAwesome name='trash' size={18} style={[styles.icons, { color: 'red' }]} />}
                                            </Pressable> : null}
                                        </View>
                                    </View>
                                    {/* <Text style={[styles.addressDetails,{fontWeight:selectedAddr===0?'800':'normal'}]}>{item.address_name}</Text> */}
                                    <Text style={[styles.addressDetails, { fontWeight: selectedAddr === index ? '800' : 'normal' }]}>{item.address}, {item.landmark}, {item.city} - {item.zip_code}, {item.state}</Text>
                                </View>
                            </Pressable>
                            <View style={globatStyles.divider}></View>
                        </>)
                        :
                        null
                }

            </ScrollView>
            {!loader && address.length <= 0 ? null :
                <Pressable onPress={gotoPayment} style={[globatStyles.button, { marginTop: 10, marginBottom: 10, marginLeft: 5, width: Constants.width - 10 }]}>
                    {loader ?
                        <View style={{ textAlign: 'center' }}><ActivityIndicator color={'white'} />
                        </View>
                        : <Text style={globatStyles.btnText}>Place Order ( <FontAwesome name='rupee' /> {props?.route?.params?.price} )</Text>}
                </Pressable>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    description: {
        fontFamily: Constants.fontFamily,
    },
    wrapper: {
        padding: Constants.padding,
    },
    heading: {
        fontFamily: Constants.fontFamily,
        fontSize: 22,
        marginTop: 12,
        marginBottom: 12,
    },
    addressDetails: {
        fontFamily: Constants.fontFamily,
    },
})

export default SelectAddress