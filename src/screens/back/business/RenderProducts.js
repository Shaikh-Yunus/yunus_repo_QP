import React from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
    Pressable,
    ScrollView,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Constants from '../../../shared/Constants'
import FastImage from 'react-native-fast-image'

const RenderProducts = ({ products, userDetails }) => {
    var imageUrl = `${Constants.BASE_IMAGE_URL}${JSON.parse(products.item.product_image)[0]}`
    const navigation = useNavigation()
    const gotoProductDetails = () => {
        navigation.navigate('/product-details', { productDetails: products })
    }
    // console.log("userddd",userDetails);
    // by mujtaba
    // const colorChecker = products.item.color_id
    // var colorCheckerArray = JSON.parse(colorChecker);
    // console.log("this is colorchecker array", colorCheckerArray);

    return (
        <Pressable onPress={() => navigation.navigate('/Businessproduct-preview', { products: products, userDetails: userDetails })}>
            {/* <View style={styles.wrapper}
            >

                <Image source={{ uri: imageUrl }} style={{ width: '25%', height: '90%', borderRadius: 10 }} />
                <View style={{ marginLeft: 4 }} >
                    <Text style={styles.productName}>{products.item.product_name}</Text>
                    <View style={styles.lavelAndValue}>
                        <Text style={styles.lavel}>Color: </Text>
                        <Text style={styles.value}>{products.item.color_id}</Text>
                    </View>
                    <View style={styles.lavelAndValue}>
                        <Text style={styles.lavel}>Unit Price: </Text>
                        <Text style={styles.value}>₹{products.item.unit_price}</Text>
                    </View>
                    <View style={styles.lavelAndValue}>
                        <Text style={styles.lavel}>Qty: </Text>
                        <Text style={styles.value}>{products.item.qty}</Text>
                    </View>
                    <View style={styles.lavelAndValue}>
                        <View style={parseInt(products.item.qty) >= parseInt(products.item.warning_qty) ? styles.inStockOuter : styles.outOfStockOuter}>
                            <View style={parseInt(products.item.qty) >= parseInt(products.item.warning_qty) ? styles.inStockInner : styles.outOfStockInner}></View>
                        </View>
                        <Text style={styles.inStockText}>{parseInt(products.item.qty) >= parseInt(products.item.warning_qty) ? `In` : `Out of`} Stock</Text>
                    </View>

                </View>
                <View style={styles.divider}></View>
                <View>
                    <View style={styles.lavelAndValue}>
                        <Text style={styles.lavel}>Size: </Text>
                        <Text style={styles.value}>
                            {products.item.size_id}
                        </Text>
                    </View>
                    <View style={styles.lavelAndValue}>
                        <Text style={styles.lavel}>Selling Price: </Text>

                        <Text style={styles.value}>₹{products.item.sales_price}</Text>
                    </View>
                    <View style={styles.lavelAndValue}>
                        <Text style={styles.lavel}>Available Qty: </Text>
                        <Text style={styles.value}>{products.item.minimum_qty}</Text>
                    </View>
                </View>

            </View> */}
            <ScrollView style={{ backgroundColor: "#fff", borderRadius: 10, marginTop:"1%" , marginBottom:"8%" }}>
                <View style={{ padding: 5, display: "flex", flexDirection: "row", }}>
                    <View>
                        <FastImage style={{ width: 100, height: 150, borderRadius: 10 }} source={{ uri: imageUrl }} />
                    </View>
                    <View style={{ padding: 5 }}>
                        <Text style={{ fontWeight: "700", color: "gray" }}>{products.item.product_name}</Text>
                        <View style={{ flexDirection: "row", gap: 10 }}>
                            <View style={{ marginTop: 0, width:'43%' }}>
                                <Text style={{ color: "#000", fontSize: 10.5, paddingTop: 14 }}><Text style={{ fontWeight: "700", color: "#000" }}>
                                    {products.item.color_id}
                                    {/* red,blue,green,orange,yellow */}
                                </Text></Text>
                                <Text style={{ color: "#000", fontSize: 10.5, paddingTop: 14 }}>Unit Price:<Text style={{ fontWeight: "700", color: "#000" }}>₹{products.item.unit_price}</Text></Text>
                                <Text style={{ color: "#000", fontSize: 10.5, paddingTop: 14 }}>Qty:<Text style={{ fontWeight: "700", color: "#000" }}>{products.item.qty}</Text></Text>
                            </View>
                            <View style={{ borderRightWidth: 0.2, borderColor: "gray", marginTop: 15, marginLeft: 5 }} />
                            <View style={{ marginTop: 0, marginLeft: 8 ,width:'35%'}}>
                                <Text style={{ color: "#000", fontSize: 10.5, paddingTop: 14 }}>Size:<Text style={{ fontWeight: "700", color: "#000" }}>{products.item.size_id}</Text></Text>
                                <Text style={{ color: "#000", fontSize: 10.5, paddingTop: 14 }}>Sell Price:<Text style={{ fontWeight: "700", color: "#000" }}>
                                    ₹{products.item.sales_price}</Text></Text>
                                <Text style={{ color: "#000", fontSize: 10.5, paddingTop: 14 }}>Available Qty:<Text style={{ fontWeight: "700", color: "#000" }}>
                                    {products.item.minimum_qty}</Text></Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: "row", gap: 10, marginTop: 8, alignItems: "center" }}>
                            <View style={parseInt(products.item.qty) >= parseInt(products.item.warning_qty) ? styles.inStockOuter : styles.outOfStockOuter}>
                                <View style={parseInt(products.item.qty) >= parseInt(products.item.warning_qty) ? styles.inStockInner : styles.outOfStockInner}></View>
                            </View>
                            <View>
                                <Text style={{ fontSize: 12, fontWeight: "700", color: "gray" }}>{parseInt(products.item.qty) >= parseInt(products.item.warning_qty) ? `In` : `Out of`} Stock</Text>
                            </View>
                        </View>
                    </View>

                </View>
            </ScrollView>
        </Pressable>
    )
}
const styles = StyleSheet.create({
    labelAndValue: {
        flexDirection: 'row',
        marginTop: 5,
        flexWrap: 'wrap',
        maxWidth: '50%',
    },
    label: {
        fontFamily: Constants.fontFamily,
    },
    value: {
        // fontFamily: Constants.fontFamily,
        // fontStyle: Constants.fontFamily,
        fontWeight: 'bold',
        textTransform: 'capitalize'
    },
    inStockText: {
        fontFamily: Constants.fontFamily,
        fontSize: 12,

    },
    inStockOuter: {
        width: 42,
        height: 22,
        borderRadius: 20,
        backgroundColor: Constants.colors.primaryColor,
        marginTop: 2,
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
    rupeeIcon: {
        marginTop: 5,
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
    flexDirectionView: {
        flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap'
    },
    wrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        backgroundColor: Constants.colors.whiteColor,
        padding: 12,
        borderRadius: 20,
    },
    productName: {
        // fontFamily: Constants.fontFamily,
        fontWeight: 'bold',
        fontSize: 16,
        textTransform: 'capitalize',
        lineHeight: 37,
    },
    divider: {
        height: 70,
        width: 1,
        backgroundColor: '#9F9F9F',
        marginRight: 2,
    },
    lavelAndValue: {
        flexDirection: 'row',
        marginTop: 5,
        // flexWrap: 'wrap',
    },
    lavel: {
        fontFamily: Constants.fontFamily,
    },
    value: {
        // fontFamily: Constants.fontFamily,
        // fontStyle: Constants.fontFamily,
        fontWeight: 'bold',
        textTransform: 'capitalize'
    },
    inStockText: {
        fontFamily: Constants.fontFamily,
        fontSize: 18,

    },
    inStockOuter: {
        width: 42,
        height: 22,
        borderRadius: 20,
        backgroundColor: Constants.colors.primaryColor,
        marginTop: 2,
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
    rupeeIcon: {
        marginTop: 5,
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
})

export default RenderProducts