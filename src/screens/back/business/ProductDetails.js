import React from 'react'
import {
    View,
    Text,
    ImageBackground,
    Image,
    StyleSheet,
    StatusBar,
} from 'react-native'
import Images from '../../../assets/images/Images'
import CustomAppBar from '../../../components/business/CustomAppBar'
import Constants from '../../../shared/Constants'
import globatStyles from '../../../shared/globatStyles'
import LinearGradient from 'react-native-linear-gradient'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const ProductDetails=({navigation})=>{
    return (
        <View style={globatStyles.wrapper}>
            <StatusBar translucent={true} backgroundColor='transparent' />
            <ImageBackground source={Images.statueOfBoris} style={styles.productDetailsBg}>
                <CustomAppBar navigation={navigation} isMainscreen={false} isReel={true} title='Statue of Boris' />
                <View style={styles.overlay}></View>
                <View style={styles.container}>
                    <Text style={styles.category}>Lifestyle</Text>
                </View>
                <View style={styles.iconGroup}>
                    <Image source={Images.editIcon} style={styles.icon} />
                    <Image source={Images.deleteIcon} style={styles.icon} />
                    <Image source={Images.copyIcon} style={styles.icon} />
                </View>
                <LinearGradient colors={[ '#FFFFFF', '#A4A4B2']} start={{x:0, y:0}} end={{x: 1, y: 0}} style={styles.productDetailsContainer}>
                    <View style={styles.postedOnContainer}>
                        <View style={styles.postedOn}>
                            <Text style={styles.text}>Posted on: </Text>
                            <Text style={styles.boldText}>21/03/21, 2:34 pm</Text>
                        </View>
                        <View style={styles.inStockOuter}>
                            <View style={styles.inStockInner}></View>
                        </View>
                        <Text style={styles.inStockText}>In Stock</Text>
                    </View>
                    <View style={globatStyles.divider}></View>
                    <View style={styles.productInfo}>
                        <View>
                            <View style={styles.lavelAndValue}>
                                <Text style={styles.lavel}>Color: </Text>
                                <Text style={styles.value}>Grey</Text>
                            </View>
                            <View style={styles.lavelAndValue}>
                                <Text style={styles.lavel}>Unit Price: </Text>
                                <FontAwesome name='rupee' style={styles.rupeeIcon} /><Text style={styles.value}>1500</Text>
                            </View>
                            <View style={styles.lavelAndValue}>
                                <Text style={styles.lavel}>Qty: </Text>
                                <Text style={styles.value}>5</Text>
                            </View>
                        </View>
                        <View>
                            <View style={styles.lavelAndValue}>
                                <Text style={styles.lavel}>Size: </Text>
                                <Text style={styles.value}>23”x 23”x 23”</Text>
                            </View>
                            <View style={styles.lavelAndValue}>
                                <Text style={styles.lavel}>Selling Price: </Text>
                                <FontAwesome name='rupee' style={styles.rupeeIcon} /><Text style={styles.value}>1500</Text>
                            </View>
                            <View style={styles.lavelAndValue}>
                                <Text style={styles.lavel}>Available Qty: </Text>
                                <Text style={styles.value}>15</Text>
                            </View>
                        </View>
                    </View>
                    <View style={globatStyles.divider}></View>
                    <View>
                        <Text style={styles.description}>
                            The mythical twin heroes, Kastor (Κάστωρ, beaver; Latin, Castor) and Polydeukes (Πολυδεύκης, much sweet wine; 
                        </Text>
                        <Text style={styles.tagtitle}>Tags 4</Text>
                        <View style={styles.tagContainer}>
                            <Text style={styles.tags}>Tags One</Text>
                            <Text style={styles.tags}>Tags Two</Text>
                            <Text style={styles.tags}>Tags Three</Text>
                            <Text style={styles.tags}>Tags Four</Text>
                        </View>
                    </View>
                    <View style={styles.refundable}>
                        <View style={styles.refundContainer}>
                            <View style={styles.inStockOuter}>
                                <View style={styles.inStockInner}></View>
                            </View>
                            <Text style={styles.inStockText}> Refundable</Text>
                        </View>
                        <View style={styles.refundContainer}>
                            <View style={styles.inStockOuter}>
                                <View style={styles.inStockInner}></View>
                            </View>
                            <Text style={styles.inStockText}> COD</Text>
                        </View>
                    </View>
                    <View style={styles.discount}>
                        <View>
                            <View style={styles.lavelAndValue}>
                                <Text style={styles.lavel}>Discount: </Text>
                                <Text style={styles.value}>35%</Text>
                            </View>
                        </View>
                        <View>
                            <View style={styles.lavelAndValue}>
                                <Text style={styles.lavel}>Vat Tax: </Text>
                                <Text style={styles.value}>6%</Text>
                            </View>
                        </View>
                    </View>
                </LinearGradient>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    productDetailsBg: {
        height: '100%',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        zIndex: 1,
    },
    container: {
        padding: Constants.padding,
    },
    category: {
        position: 'absolute',
        left: 90,
        top: -15,
        backgroundColor: '#BBFFDA',
        color: '#04751F',
        borderRadius: Constants.borderRadius,
        padding: 8,
        fontFamily: Constants.fontFamily,
        fontWeight: '800',
        zIndex: 99,
    },
    iconGroup: {
        position: 'absolute',
        top: Constants.padding+80,
        right: Constants.padding+20,
        zIndex: 99,
    },
    icon: {
        marginTop: 35,
    },
    productDetailsContainer: {
        padding: Constants.padding,
        opacity: 0.9,
        position: 'absolute',
        width: '92%',
        bottom: 0,
        left: '4%',
        zIndex: 99,
        borderTopLeftRadius: Constants.borderRadius,
        borderTopRightRadius: Constants.borderRadius,
    },
    postedOn: {
        flexDirection: 'row',
    },
    text: {
        fontFamily: Constants.fontFamily,
    },
    postedOnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    boldText: {
        fontFamily: Constants.fontFamily,
        fontWeight: '700',
    },
    inStockText: {
        fontFamily: Constants.fontFamily,
        fontSize: 16,
        fontWeight: '700',
    },
    inStockOuter: {
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
    productInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    lavelAndValue: {
        flexDirection: 'row',
        marginTop: 8,
    },
    lavel: {
        fontFamily: Constants.fontFamily,
    },
    value: {
        fontFamily: Constants.fontFamily,
        fontWeight: '700',
    },
    description: {
        fontFamily: Constants.fontFamily,
        fontSize: 16,
    },
    tagtitle: {
        fontFamily: Constants.fontFamily,
        fontWeight: '700',
        marginTop: Constants.margin,
        marginBottom: 10,
    },
    tagContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    tags: {
        backgroundColor: '#BBFFDA',
        color: '#04751F',
        padding: 5,
        borderRadius: 10,
    },
    refundContainer: {
        flexDirection: 'row',
    },
    refundable: {
        marginTop: Constants.margin,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    discount: {
        marginTop: 12,
        marginBottom: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
})

export default ProductDetails