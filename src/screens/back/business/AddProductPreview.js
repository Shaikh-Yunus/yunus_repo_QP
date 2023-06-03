import React, { useEffect } from 'react'
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    ImageBackground,
    StatusBar,
    Pressable,
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

const AddProductPreview = ({ route}, props, ) => {
    const navigation = useNavigation()

    const {
        cameraImg,
        isRefundable,
        cod,
        productVideoUrl,
        productName,
        productBrand,
        productUnit,
        minimumQuantity,
        productTags,
        productDescription,
        productUnitPrice,
        productSellingPrice,
        productDiscount,
        productType,
        productSize,
        productVUnits,
        productQuantity,
        productLowStock,
        productTax,
        productTaxType,
        productCompany,
        productPincode,
        colorsString
    } = route.params;
    // console.log("this is cameraimage=>", cameraImg);
    const imageUri = cameraImg[0]?.uri
    // console.log("this is image uri");
    return (
        <View style={globatStyles.wrapper}>

            <ImageBackground source={{ uri: imageUri }} style={styles.nature}>
                <StatusBar translucent={true} backgroundColor='transparent' />
                <CustomAppBar navigation={navigation} isMainscreen={false} isReel={true} headerRight={false} title={productName} />
                <View style={globatStyles.overlay}></View>
                <View style={{ alignItems: 'flex-end', marginRight: '4%' }}>
                    {/* <Feather name='edit-2' size={26} color={'white'} style={{ marginTop: "5%" }} onPress={Editproduct} /> */}
                    {/* <MaterialIcons name='delete-outline' size={26} color={'white'} style={{ marginTop: "5%" }} onPress={() => Deleteproduct()} /> */}
                    {/* <MaterialCommunityIcons name='file-multiple-outline' size={26} color={'white'} style={{ marginTop: "5%" }} /> */}
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.productDetailsContainer}>

                        <LinearGradient style={styles.productInfoContainer} colors={['#FFFFFF', '#A4A4B2']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={styles.productName}>{productName}</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ flexDirection: 'row', }}>
                                        <View style={parseInt(minimumQuantity) >= parseInt(productLowStock) ? styles.inStockOuter : styles.outOfStockOuter}>
                                            <View style={parseInt(minimumQuantity) >= parseInt(productLowStock) ? styles.inStockInner : styles.outOfStockInner}></View>
                                        </View>
                                        <Text style={styles.productName}>{parseInt(minimumQuantity) >= parseInt(productLowStock) ? `In` : `Out of`} Stock</Text>
                                    </View>
                                </View>
                            </View>

                            <View style={styles.divider}></View>
                            <View style={styles.flexDirectionView}>
                                <View style={styles.lavelAndValue}>
                                    <Text style={styles.lavel}>Color: </Text>
                                    <Text style={styles.value}>{colorsString}</Text>
                                </View>
                                <View style={styles.Size}>
                                    <Text style={styles.lavel}>Size: </Text>
                                    <Text style={styles.value}>{productSize}</Text>
                                </View>
                            </View>
                            <View style={styles.flexDirectionView}>
                                <View style={styles.lavelAndValue}>
                                    <Text style={styles.lavel}>Unit Price: </Text>
                                    <Text style={styles.value}>₹{productUnitPrice}</Text>
                                </View>
                                <View style={styles.lavelAndValue}>
                                    <Text style={styles.lavel}>Selling Price: </Text>
                                    <Text style={styles.value}>₹{productSellingPrice}</Text>
                                </View>
                            </View>
                            <View style={styles.flexDirectionView}>
                                <View style={styles.lavelAndValue}>
                                    <Text style={styles.lavel}>Qty: </Text>
                                    <Text style={styles.value}>{productQuantity}</Text>
                                </View>
                                <View style={styles.AvailableQty}>
                                    <Text style={styles.lavel}>Available Qty: </Text>
                                    <Text style={styles.value}>{minimumQuantity}</Text>
                                </View>
                            </View>

                            <View style={styles.divider}></View>
                            <View>
                                <Text style={{ fontFamily: Constants.fontFamily, fontSize: 16, }}>
                                    {productDescription}
                                </Text>
                                <View style={{ flexDirection: 'row', marginTop: '2%' }}>
                                    <Text>Tags: </Text>
                                    <Text>#{productTags}</Text>
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
                                        <Text style={styles.value}>10%</Text>
                                    </View>
                                    <View style={styles.VatView}>
                                        <Text style={styles.label}>VAT Tax: </Text>
                                        <Text style={styles.value}>5%</Text>
                                    </View>
                                </View>

                            </View>

                        </LinearGradient>
                    </View>
                </ScrollView>
            </ImageBackground>
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
        marginTop: 9,
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
        top: 1,
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
})

export default AddProductPreview