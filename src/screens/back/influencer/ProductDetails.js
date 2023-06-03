import React, { useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    ImageBackground,
} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable'
import Images from '../../../assets/images/Images'
import CustomAppBar from '../../../components/explore/CustomAppBar'
import Constants from '../../../shared/Constants'
import globatStyles from '../../../shared/globatStyles'
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions'

const ProductDetails= ({navigation})=>{
    const [qty, setQty] = useState(1)
    const [color, setColor] = useState('')
    const [size, setSize] = useState('')
    const [like, setLike] = useState(false)
    const decreaseQty = ()=>{
        if(qty>1){
            setQty(qty-1)
        }
    }
    const increaseQty = ()=>{
        setQty(qty+1)
    }
    const getColor = (color)=>{
        setColor(color)
    }
    const getSize = (size)=>{
        setSize(size)
    }
    const gotoReview = ()=>{
        navigation.navigate('/reviews')
    }
    return (
        <View style={styles.container}>
            <View style={{height:responsiveHeight(50)}}>
            <ImageBackground
                source={Images.reelProduct} 
                style={styles.bgImg}>
                <CustomAppBar navigation={navigation} isMainscreen={false} isReel={true} title='Activated Charcoal' headerRight={false} />
                <View style={styles.iconGroup}>
                    <AntDesign name={like?'heart':'hearto'} style={[styles.icon, {color: like?'#f54295':'#FFF'}]} onPress={()=>setLike(!like)} />
                    <Text style={styles.iconText}>nnk</Text>
                    <AntDesign name='message1' style={styles.icon} onPress={()=>SheetManager.show('')} />
                    <Text style={styles.iconText}>00n</Text>
                    <Feather name='send' style={styles.icon} />
                    <Text style={styles.iconText}>00n</Text>
                    <Feather name='bookmark' style={styles.icon} />
                </View>
            </ImageBackground>
            </View>
            <ScrollView style={styles.bottomContainer}>
                <View style={styles.header}>
                    <View style={styles.headerTop}>
                        <Text style={styles.productname}>ERBOLOGY</Text>
                        <View style={{flexDirection: 'row'}}>
                            <View style={{flexDirection: 'row'}}>
                                <FontAwesome name='rupee' size={16} style={styles.icons} /><Text style={{color: '#979797', fontWeight: '700', fontFamily: Constants.fontFamily}}> 1500  </Text>
                                <View style={styles.strikethrough}></View>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <FontAwesome name='rupee' size={16} style={[styles.icons, {color: '#000000'}]} /><Text style={{fontWeight: '700', fontFamily: Constants.fontFamily}}> 1200  </Text>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <FontAwesome name='rupee' size={16} style={[styles.icons, {color: Constants.colors.primaryColor}]} /><Text style={{ fontFamily: Constants.fontFamily,color: Constants.colors.primaryColor}}> 1200 off</Text>
                            </View>
                        </View>
                    </View>
                    <View style={[styles.headerTop, {marginBottom: 0,}]}>
                        <Text style={{fontFamily: Constants.fontFamily, fontSize: 18,}}>Units 3</Text>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={{fontFamily: Constants.fontFamily, fontSize: 18,}}>Availability: </Text>
                            <Text style={{fontFamily: Constants.fontFamily, fontSize: 18, color: Constants.colors.primaryColor}}>In Stock</Text>
                        </View>
                    </View>
                </View>
                <View style={globatStyles.divider}></View>
                <View style={styles.review}>
                    <FontAwesome name='star' style={styles.rattingStar} />
                    <FontAwesome name='star' style={styles.rattingStar} />
                    <FontAwesome name='star' style={styles.rattingStar} />
                    <FontAwesome name='star' style={styles.rattingStar} />
                    <FontAwesome name='star-o' style={[styles.rattingStar, {color: '#999999'}]} />
                    <Text style={styles.reviewText} onPress={gotoReview}>Reviews</Text>
                </View>
                <View style={styles.buynow}>
                    <View style={[styles.buynowBtn, {marginTop: -16}]}>
                        <Pressable style={[globatStyles.button, {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'},]}><Text style={globatStyles.btnText}>Buy</Text><FontAwesome name='angle-right' size={16} color={Constants.colors.whiteColor} /></Pressable>
                    </View>
                    <View style={styles.increaseDecreasebtn}>
                        <Pressable style={styles.increDecreBtn} onPress={decreaseQty}><Text style={{fontSize: 20, color: Constants.colors.whiteColor}}>-</Text></Pressable>
                        <Text style={styles.qty}>{qty}</Text>
                        <Pressable style={styles.increDecreBtn} onPress={increaseQty}><Text style={{fontSize: 20, color: Constants.colors.whiteColor}}>+</Text></Pressable>
                    </View>
                </View>
                <View style={{marginTop: 14}}>
                    <Text style={{fontFamily: Constants.fontFamily, fontSize: 18,}}>Colors</Text>
                    <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                        <Pressable onPress={()=>getColor('red')} style={[styles.variable, {backgroundColor: color==='red'?'#D1D1D1':'#FFF'}]}><Text style={styles.variableValue}>Red</Text></Pressable>
                        <Pressable onPress={()=>getColor('green')} style={[styles.variable, {backgroundColor: color==='green'?'#D1D1D1':'#FFF'}]}><Text style={styles.variableValue}>Green</Text></Pressable>
                        <Pressable onPress={()=>getColor('blue')} style={[styles.variable, {backgroundColor: color==='blue'?'#D1D1D1':'#FFF'}]}><Text style={styles.variableValue}>Blue</Text></Pressable>
                        <Pressable onPress={()=>getColor('black')} style={[styles.variable, {backgroundColor: color==='black'?'#D1D1D1':'#FFF'}]}><Text style={styles.variableValue}>Black</Text></Pressable>
                    </View>
                </View>
                <View style={{marginTop: 14}}>
                    <Text style={{fontFamily: Constants.fontFamily, fontSize: 18,}}>Size</Text>
                    <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                        <Pressable onPress={()=>getSize('s')} style={[styles.variable, {backgroundColor: size==='s'?'#D1D1D1':'#FFF'}]}><Text style={styles.variableValue}>S</Text></Pressable>
                        <Pressable onPress={()=>getSize('m')} style={[styles.variable, {backgroundColor: size==='m'?'#D1D1D1':'#FFF'}]}><Text style={styles.variableValue}>M</Text></Pressable>
                        <Pressable onPress={()=>getSize('l')} style={[styles.variable, {backgroundColor: size==='l'?'#D1D1D1':'#FFF'}]}><Text style={styles.variableValue}>L</Text></Pressable>
                        <Pressable onPress={()=>getSize('xl')} style={[styles.variable, {backgroundColor: size==='xl'?'#D1D1D1':'#FFF'}]}><Text style={styles.variableValue}>XL</Text></Pressable>
                        <Pressable onPress={()=>getSize('2xl')} style={[styles.variable, {backgroundColor: size==='2xl'?'#D1D1D1':'#FFF'}]}><Text style={styles.variableValue}>2XL</Text></Pressable>
                    </View>
                </View>
                <View style={{marginTop: 14}}>
                    <Text style={{fontFamily: Constants.fontFamily, fontSize: 18,}}>Description</Text>
                    <Text style={styles.productdescription}>
                        Lolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt Lolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt Lolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                    </Text>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 2,
    },
    bgImg: {
        flex: 1,
        resizeMode: 'cover'
    },
    bottomContainer: {
        flex: 1,
        padding: Constants.padding,
    },
    headerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 18,
    },
    productname: {
        fontFamily: Constants.fontFamily,
        fontWeight: '700',
        fontSize: 20,
    },
    icons: {
        marginTop: 2,
        color: '#979797',
    },
    strikethrough: {
        width: 44,
        height: 2,
        backgroundColor: '#979797',
        position: 'absolute',
        left: 0,
        top: '35%'
    },
    review: {
        flexDirection: 'row',
    },
    rattingStar: {
        fontSize: 16,
        color: '#E7CC3E',
        marginRight: 6,
    },
    reviewText: {
        fontFamily: Constants.fontFamily,
        fontSize: 16,
        textDecorationLine: 'underline',
        marginTop: -5,
        fontWeight: '500',
    },
    buynow: {
        flex: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buynowBtn: {
        flex: 3,
    },
    increaseDecreasebtn: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1.6,
        marginLeft: 14,
        marginTop: 18,
    },
    increDecreBtn:{
        width: 40,
        height: 40,
        backgroundColor: '#999999',
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    qty: {
        fontFamily: Constants.fontFamily,
        fontSize: 20,
        marginTop: 5,
    },
    variable: {
        padding: 5,
        paddingLeft: Constants.padding,
        paddingRight: Constants.padding,
        borderWidth: 1,
        borderColor: '#999999',
        borderRadius: 4,
    },
    variableValue: {
        fontFamily: Constants.fontFamily,
        fontWeight: '700',
    },
    productdescription: {
        fontFamily: Constants.fontFamily,
        paddingBottom: Constants.padding,
    },
    iconGroup: {
        position: 'absolute',
        bottom: 25,
        right: Constants.padding+15,
        zIndex: 99,
    },
    icon: {
        marginTop: 15,
        fontSize: responsiveFontSize(3.2),
        color: Constants.colors.whiteColor,
    },
    iconText: {
        fontFamily: Constants.fontFamily,
        color: Constants.colors.whiteColor,
        fontSize: 12,
        marginTop: 6,
    },
})


export default ProductDetails