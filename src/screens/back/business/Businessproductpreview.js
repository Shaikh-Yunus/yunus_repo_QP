import React, { useEffect } from 'react'
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    ImageBackground,
    StatusBar,
    Pressable,
    Alert, Modal, TouchableOpacity,
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import Feather from 'react-native-vector-icons/Feather'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Images from '../../../assets/images/Images'
import CustomAppBar from '../../../components/advertiser/CustomAppBar'
import Constants from '../../../shared/Constants'
import globatStyles from '../../../shared/globatStyles'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native'
import showToastmsg from '../../../shared/showToastmsg'
import { useState } from 'react'
import FastImage from 'react-native-fast-image'

const Businessproductpreview = (props) => {
    const [modalVisible, setModalVisible] = useState(false);
    var imageUrl = `${Constants.BASE_IMAGE_URL}${JSON.parse(props?.route?.params?.products?.item?.product_image)[0]}`
    const navigation = useNavigation()

    const handleDelete = () => {
        // Perform delete action
        setModalVisible(false); // Close the modal after delete action is performed
    }
    const Deleteproduct = () => {
        axios.post(`${Constants.BASE_URL}business/Delete/Product`, {
            product_id: props?.route?.params?.products?.item?.id

        }).then((response) => {
            if (response.status == 200) {
                console.log("resopnse of delete product=>", response.data.msg)
                navigation.navigate("/productScreen")
                showToastmsg("Product Deleted Succesfully")
            } else {
                showToastmsg("Something went wrong.Please try again")
            }
        })
            .catch((error) => {
                showToastmsg("Something went wrong.Please try again")
            })

    }

    const Editproduct = () => {
        navigation.navigate('/Product-edit', { getProductEdit: props?.route?.params?.products, userDetails: props?.route?.params?.userDetails })

    }
    // const productDataSend =
    // console.log("this is productdata send =>", productDataSend);

    // set cod and set refundable
    const [isRefundable, setIsrefundalbe] = useState(props?.route?.params?.products?.item?.is_refundable)
    console.log("checking isRefundable=>", isRefundable);
    const [cod, setCod] = useState(props?.route?.params?.products?.item?.is_cod)
    console.log("checking cod=>", cod);
    return (
        <View style={globatStyles.wrapper}>

            <FastImage source={{ uri: imageUrl }} style={styles.nature}>
                <StatusBar translucent={true} backgroundColor='transparent' />
                <CustomAppBar navigation={props.navigation} isMainscreen={false} isReel={true} headerRight={false} title={props?.route?.params?.products?.item?.product_name} />
                <View style={globatStyles.overlay}></View>
                <View style={{ alignItems: 'flex-end', marginRight: '4%' }}>
                    <Feather name='edit-2' size={26} color={'white'} style={{ marginTop: "5%" }} onPress={Editproduct} />
                    <MaterialIcons name='delete-outline' size={26} color={'white'} style={{ marginTop: "5%" }} onPress={() => setModalVisible(true)} />
                    <MaterialCommunityIcons name='file-multiple-outline' size={26} color={'white'} style={{ marginTop: "5%" }} />
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.productDetailsContainer}>

                        <LinearGradient style={styles.productInfoContainer} colors={['#FFFFFF', '#A4A4B2']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={styles.productName}>{props?.route?.params?.products?.item?.product_name}</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ flexDirection: 'row', }}>
                                        <View style={parseInt(props?.route?.params?.products?.item?.qty) >= parseInt(props?.route?.params?.products?.item?.warning_qty) ? styles.inStockOuter : styles.outOfStockOuter}>
                                            <View style={parseInt(props?.route?.params?.products?.item?.qty) >= parseInt(props?.route?.params?.products?.item?.warning_qty) ? styles.inStockInner : styles.outOfStockInner}></View>
                                        </View>
                                        <Text style={styles.productName}>{parseInt(props?.route?.params?.products?.item?.qty) >= parseInt(props?.route?.params?.products?.item?.warning_qty) ? `In` : `Out of`} Stock</Text>
                                    </View>
                                </View>
                            </View>

                            <View style={styles.divider}></View>
                            <View style={styles.flexDirectionView}>
                                <View style={styles.lavelAndValue}>
                                    <Text style={styles.lavel}>Color: </Text>
                                    <Text style={styles.value}>{props?.route?.params?.products?.item.color_id}</Text>
                                </View>
                                <View style={styles.Size}>
                                    <Text style={styles.lavel}>Size: </Text>
                                    <Text style={styles.value}>{props?.route?.params?.products?.item.size_id}</Text>
                                </View>
                            </View>
                            <View style={styles.flexDirectionView}>
                                <View style={styles.lavelAndValue}>
                                    <Text style={styles.lavel}>Unit Price: </Text>
                                    <Text style={styles.value}>₹{props?.route?.params?.products?.item?.unit_price}</Text>
                                </View>
                                <View style={styles.lavelAndValue}>
                                    <Text style={styles.lavel}>Selling Price: </Text>
                                    <Text style={styles.value}>₹{props?.route?.params?.products?.item?.sales_price}</Text>
                                </View>
                            </View>
                            <View style={styles.flexDirectionView}>
                                <View style={styles.lavelAndValue}>
                                    <Text style={styles.lavel}>Qty: </Text>
                                    <Text style={styles.value}>{props?.route?.params?.products?.item.qty}</Text>
                                </View>
                                <View style={styles.AvailableQty}>
                                    <Text style={styles.lavel}>Available Qty: </Text>
                                    <Text style={styles.value}>{props?.route?.params?.products?.item?.minimum_qty}</Text>
                                </View>
                            </View>

                            <View style={styles.divider}></View>
                            <View>
                                <Text style={{ fontFamily: Constants.fontFamily, fontSize: 16, }}>
                                    {props?.route?.params?.products?.item?.product_description}
                                </Text>
                                <View style={{ flexDirection: 'row', marginTop: '2%' }}>
                                    <Text>Tags: </Text>
                                    <Text>#{props?.route?.params?.products?.item?.product_tags}</Text>
                                </View>

                                <View style={{ flexDirection: 'row', marginLeft: 2, marginTop: 5 }}>
                                    <View style={styles.categoryButton} >
                                        <Text style={{ color: '#04751F', fontWeight: '700' }}>{props?.route?.params?.products?.item?.product_category}</Text>
                                    </View>
                                </View>

                                {/* refundable and cod button */}
                                <View style={styles.isStockCodContainer}>
                                    <Pressable style={styles.codContainer} >
                                        <View style={isRefundable ? styles.inStockOut : styles.outOfStockOuter}>
                                            <View style={isRefundable ? styles.inStockInner : styles.outOfStockInner}></View>
                                        </View>
                                        <Text style={styles.inStockText}>Refundable</Text>
                                    </Pressable>
                                    <Pressable style={[styles.codContainer, { marginStart: Constants.margin + 16 }]} >
                                        <View style={cod ? styles.inStockOut : styles.outOfStockOuter}>
                                            <View style={cod ? styles.inStockInner : styles.outOfStockInner}></View>
                                        </View>
                                        <Text style={styles.inStockText}>COD</Text>
                                    </Pressable>
                                </View>
                                {/* Discont and Vat Tax */}
                                <View style={styles.flexDirectionView}>
                                    <View style={styles.labelAndValue}>
                                        <Text style={styles.label}>Discount: </Text>
                                        <Text style={styles.value}>{props?.route?.params?.products?.item?.dicount}%</Text>
                                    </View>
                                    <View style={styles.VatView}>
                                        <Text style={styles.label}>VAT Tax: </Text>
                                        <Text style={styles.value}>{props?.route?.params?.products?.item?.product_tax}%</Text>
                                    </View>
                                </View>

                            </View>

                        </LinearGradient>
                    </View>
                </ScrollView>
            </FastImage>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false);
                }}
            >
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Are you sure you want to delete This Product?</Text>
                        <View style={{ flexDirection: 'row', }}>
                            <TouchableOpacity style={styles.modalButton} onPress={() => Deleteproduct()}>
                                <Text style={styles.buttonText}>Delete</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
                                <Text style={styles.buttonText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    nature: {
        flex: 1
    },
    productDetailsContainer: {
        // position: 'absolute',
        marginTop: 300,
        left: 0,
        right: 0,
        padding: Constants.padding,
        // bottom: 20,
    },
    productInfoContainer: {
        padding: Constants.padding,
        borderRadius: 8,
        opacity: 0.7,
        backgroundColor: '#BBFFDA'
    },
    categoryButton: {
        padding: 10,
        borderRadius: 8,
        opacity: 0.7,
        backgroundColor: '#BBFFDA'
    },
    tags: {
        fontFamily: Constants.fontFamily,
        marginRight: 12,
        fontWeight: '700',
    },
    productName: {
        fontFamily: Constants.fontFamily,
        fontWeight: '700',
        fontSize: 16,
        textTransform: 'capitalize',
        lineHeight: 37,
    },
    flexDirectionView: {
        flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap'
    },
    lavelAndValue: {
        flexDirection: 'row',
        marginTop: 5,
    },
    Size: {
        marginRight: 95,
        flexDirection: 'row',
        marginTop: 5,
    },
    AvailableQty: {
        marginRight: 38,
        flexDirection: 'row',
        marginTop: 5,
    },
    lavel: {
        fontFamily: Constants.fontFamily,
    },
    value: {
        // fontFamily: Constants.fontFamily,
        fontWeight: 'bold',
        // fontSize:1,
        textTransform: 'capitalize'
    },
    divider: {
        height: 2,
        width: "100%",
        backgroundColor: '#979797',
        marginRight: 2,
        marginBottom: 3,
        marginTop: 5,
    },
    inStockOuter: {
        width: 42,
        height: 22,
        borderRadius: 20,
        backgroundColor: Constants.colors.primaryColor,
        marginTop: 10,
        marginRight: 6,
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
    outOfStockOuter: {
        width: 42,
        height: 22,
        borderRadius: 20,
        marginTop: 2,
        backgroundColor: Constants.colors.inputBgColor,
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
    inStockText: {
        fontFamily: Constants.fontFamily,
        fontSize: 16,
        fontWeight: '700',
        marginLeft: 12,
    },
    inStockOut: {
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
        backgroundColor: Constants.colors.inputBgColor,
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
        marginLeft: 2,
        marginTop: 10
    },
    codContainer: {
        flexDirection: 'row',
    },
    // discount and vat tax
    labelAndValue: {
        flexDirection: 'row',
        // alignItems: 'center',
        marginVertical: 4,
    },
    VatView: {
        marginRight: 25,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 4,
    },
    // 
    modalView: {
        
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        justifyContent: 'center',
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        justifyContent: 'center',
        alignItems: 'center' ,
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    modalButton: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginVertical: 5,

    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",

    }
})

export default Businessproductpreview