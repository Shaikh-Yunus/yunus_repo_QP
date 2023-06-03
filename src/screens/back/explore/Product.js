import React from 'react'
import {
    View,
    Text,
    ImageBackground,
    Image,
    StyleSheet,
    StatusBar,
    Pressable,
} from 'react-native'
import Images from '../../../assets/images/Images'
import CustomAppBar from '../../../components/explore/CustomAppBar'
import Constants from '../../../shared/Constants'
import globatStyles from '../../../shared/globatStyles'
import Feather from 'react-native-vector-icons/Feather'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const Product =({navigation})=>{

    const gotoMore = ()=>{

    }
    const follow = () =>{
        
    }
    return (
        <View style={globatStyles.wrapper}>
            <StatusBar translucent={true} backgroundColor='transparent' />
            <ImageBackground source={Images.productExploer} style={styles.productDetailsBg}>
                <CustomAppBar navigation={navigation} isMainscreen={true} isReel={true} title='' headerRight={true} />
                <View style={styles.overlay}></View>
                <View style={styles.iconGroup}>
                    <AntDesign name='hearto' style={styles.icon} />
                    <Text style={styles.iconText}>nnk</Text>
                    <AntDesign name='message1' style={styles.icon} />
                    <Text style={styles.iconText}>00n</Text>
                    <Feather name='send' style={styles.icon} />
                    <Text style={styles.iconText}>00n</Text>
                    <Feather name='bookmark' style={styles.icon} />
                </View>
                <View style={styles.productDetailsContainer}>
                    <View style={styles.imgContainer}>
                        <Image source={Images.avatar} style={{marginRight: 20,}} />
                        <Text style={styles.titlename}>Robert Phan</Text>
                        <Pressable onPress={follow} style={globatStyles.followBtn}><Text style={globatStyles.followBtnText}>Follow</Text></Pressable>
                    </View>
                    <Text style={styles.desc}>
                        Lolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt Lolor...<Pressable onPress={gotoMore}><Text style={styles.moreBtn}>more</Text></Pressable>
                    </Text>
                    <Text style={styles.minsAgo}>10 minutes ago</Text>
                    <Pressable style={[globatStyles.button,{marginTop: 8, flexDirection: 'row', justifyContent: 'space-between',}]}><Text style={globatStyles.btnText}>Buy</Text><FontAwesome name='angle-right' size={20} color={Constants.colors.whiteColor} /></Pressable>
                </View>
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
        bottom: Constants.padding+200,
        right: Constants.padding+20,
        zIndex: 99,
    },
    icon: {
        marginTop: 25,
        fontSize: 25,
        color: Constants.colors.whiteColor,
    },
    iconText: {
        fontFamily: Constants.fontFamily,
        color: Constants.colors.whiteColor,
        fontSize: 12,
        marginTop: 6,
    },
    productDetailsContainer: {
        padding: Constants.padding,
        opacity: 0.9,
        position: 'absolute',
        width: '94%',
        bottom: 0,
        left: '3%',
        zIndex: 99,
        borderTopLeftRadius: Constants.borderRadius,
        borderTopRightRadius: Constants.borderRadius,
    },
    imgContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    titlename: {
        fontFamily: Constants.fontFamily,
        fontWeight: '800',
        color: Constants.colors.whiteColor,
        fontSize: 25,
        marginRight: 12,
    },
    desc: {
        fontFamily: Constants.fontFamily,
        color: Constants.colors.whiteColor,
        marginTop: 14,
    },
    moreBtn: {
        color: '#F1F1F1',
        fontFamily: Constants.fontFamily,
    },
    minsAgo: {
        fontSize: 13,
        fontFamily: Constants.fontFamily,
        color: Constants.colors.whiteColor,
    },
})

export default Product 