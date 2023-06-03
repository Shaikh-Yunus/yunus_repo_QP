import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    Pressable,
    ImageBackground,
    StatusBar,
} from 'react-native'
import VideoPlayer from 'react-native-video-player'
import CustomAppBar from '../../../components/explore/CustomAppBar'
import globatStyles from '../../../shared/globatStyles'
import Constants from '../../../shared/Constants'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import Images from '../../../assets/images/Images'

const ProductDescription = ({navigation})=>{
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
                        <Pressable style={globatStyles.followBtn}><Text style={globatStyles.followBtnText}>Follow</Text></Pressable>
                    </View>
                    <Text style={styles.desc}>
                        Lolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt Lolor...<Pressable><Text style={styles.moreBtn}>more</Text></Pressable>
                    </Text>
                    <Text style={styles.minsAgo}>10 minutes ago</Text>
                    <Pressable style={[globatStyles.button,{marginTop: 8, flexDirection: 'row', justifyContent: 'space-between',}]}><Text style={globatStyles.btnText}>Add To Cart</Text><FontAwesome name='angle-right' size={20} color={Constants.colors.whiteColor} /></Pressable>
                </View>
                <View style={styles.overlayCotent}>
                    <Text style={styles.contentheading}>Activated Charcoal</Text>
                    <Text style={styles.name}>ERBOLOGY</Text>
                    <Text style={styles.description}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut . Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut .
                    </Text>
                    <Text style={styles.description}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut . Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut .
                    </Text>
                    <Text style={styles.description}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut . Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut .
                    </Text>
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
    overlayCotent: {
        position: 'absolute',
        left: Constants.padding+12,
        right: Constants.padding+12,
        bottom: Constants.padding+60,
        padding: Constants.padding,
        backgroundColor: 'rgba(255,255,255, 0.8)',
        borderRadius: Constants.borderRadius,
        zIndex: 99,
    },
    contentheading: {
        fontFamily: Constants.fontFamily,
        fontWeight: '700',
        fontSize: 16,
    },
    name: {
        fontFamily: Constants.fontFamily,
        textTransform: 'uppercase',
        marginTop: 12,
        marginBottom: 12,
        fontSize: 18,
    },
    description: {
        fontFamily: Constants.fontFamily,
        marginBottom: 12,
    },
})

export default ProductDescription