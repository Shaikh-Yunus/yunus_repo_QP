import React from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
    Pressable,
    TextInput,
    SafeAreaView,
    Dimensions,
} from 'react-native'
import Images from '../../assets/images/Images'
import Constants from '../../shared/Constants'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import { useNavigation } from '@react-navigation/native'

const {height ,width}=Dimensions.get('window')
const CustomAppBar = (props) => {
    const navigation = useNavigation()
    const goBack = () => {
        navigation.goBack()
    }
    const gotoCart = () => {
        props.navigation.navigate('/cart')
    }
    return (
        <SafeAreaView>
        <View style={styles.wrapper}>
            {
                props.isMainscreen ? (
                    <View style={[styles.logoContainer, props.title ? ({ alignItems: 'center' }) : null]}>
                        <Pressable onPress={() => props.navigation.openDrawer()} style={{ zIndex: 999 }}>
                            <Image source={Images.hamburgerMenuIcon} />
                        </Pressable>
                        {
                            props.title ? <Text style={[styles.title, { color: props.isReel ? '#FFF' : '#000' }]}>{props.title}</Text> : (
                                <View style={{ marginStart: 20, marginTop: -12 }}>

                                </View>
                            )
                        }
                    </View>
                ) : (
                    <View style={styles.titleBar}>
                        <Pressable onPress={goBack}><AntDesign name='left' size={24} style={props.isReel ? styles.reelBackBtn : styles.backBtn} /></Pressable>
                        <Text style={{ ...styles.title, color: props.isReel ? Constants.colors.whiteColor : 'rgba(0, 0, 0, 1)' }}>{props.title}</Text>
                    </View>
                )
            }
            {
                props.headerRight ? (
                    <View style={{ flexDirection: 'row', }}>
                        <Feather name='search' style={styles.leftIocn} />
                        <Feather name='shopping-cart' style={styles.leftIocn} onPress={gotoCart} />
                    </View>
                ) : null
            }
            {
                props.searchbar ? (
                    <View style={{ width: '100%', }}>
                        <TextInput style={styles.searchbar} placeholder='Search' />
                        <AntDesign name='search1' style={styles.searchIcon} />
                    </View>
                ) : null
            }
        </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    wrapper: {
        padding: Constants.padding,
        marginTop: height*0.03,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position:'relative'

    },
    logoContainer: {
        flexDirection: 'row',
        zIndex: 99
    },
    title: {
        fontFamily: Constants.fontFamily,
        fontSize: 30,
        fontWeight: '800',
    },
    welcome: {
        fontFamily: Constants.fontFamily,
        fontSize: 32,
        fontWeight: '800',
    },
    companyName: {
        fontFamily: Constants.fontFamily,
        fontSize: 24,
        fontWeight: '500',
    },
    reelBackBtn: {
        color: Constants.colors.whiteColor,
        backgroundColor: Constants.colors.whiteColor,
        opacity: 0.4,
        padding: 12,
        borderRadius: Constants.borderRadius,
    },
    backBtn: {

    },
    titleBar: {
        // marginTop: 16,
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: 99,
    },
    title: {
        fontFamily: Constants.fontFamily,
        fontSize: 26,
        fontWeight: '800',
        marginStart: 20,
    },
    leftIocn: {
        color: Constants.colors.whiteColor,
        fontSize: 28,
        marginLeft: 20,
        zIndex: 99,
    },
    searchbar: {
        padding: 12,
        width: '90%',
        backgroundColor: '#E5EBED',
        borderRadius: Constants.borderRadius,
    },
    searchIcon: {
        position: 'absolute',
        right: 50,
        top: 10,
        fontSize: 24,
    },
})
export default CustomAppBar