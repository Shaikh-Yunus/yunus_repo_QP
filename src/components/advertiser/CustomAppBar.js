import React from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
    Pressable,
    TextInput,
} from 'react-native'
import Images from '../../assets/images/Images'
import Constants from '../../shared/Constants'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';

const CustomAppBar = (props) => {
    const goBack = () => {
        props.navigation.goBack()
    }
    const gotoCart = () => {
        props.navigation.navigate('/cart')
    }
    const gotoCategory = () => {
        props.navigation.navigate('/category')
    }
    const gotoDraft = () => {
        props.navigation.navigate('/drafts')
    }
    const config = {
        velocityThreshold: 0.3,
        directionalOffsetThreshold: 80
    };
    const onSwipeDown = (gestureState) => {
        goBack()
    }
    return (
        <View style={styles.wrapper}>
            {
                props.isMainscreen ? (
                    <View style={[styles.logoContainer, props.title ? ({ alignItems: 'center' }) : null]}>
                        <Pressable onPress={() => props.openDrawer()} style={{ zIndex: 999 }}>
                            {
                                !props.showDrawer ? <Image source={Images.hamburgerMenuIcon} /> : <AntDesign name='close' size={26} />
                            }

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
                        <Text style={{ ...styles.title, color: props.isReel ? Constants.colors.whiteColor : 'rgba(0, 0, 0, 1)', }}>{props.title}</Text>
                        {
                            props.subtitle ? <Text style={styles.subtitle}>{props.subtitle}</Text> : null
                        }
                        {
                            props.isDraft ? <Text style={styles.draft}>Draft</Text> : null
                        }
                    </View>
                )
            }
            {
                props.headerRight ? (
                    <View style={{ flexDirection: 'row', }}>
                        <Feather name='search' style={styles.leftIocn} />
                        <Feather name='shopping-cart' style={styles.leftIocn} onPress={gotoCart} />
                        <Feather name='plus-circle' style={[styles.leftIocn, { zIndex: props.newPost ? 9999 : 9 }]} onPress={() => props.openPopup()} />
                        <GestureRecognizer style={{ flex: 1 }} onSwipeDown={(state) => onSwipeDown(state)} config={config} >
                            {
                                props.newPost ? <View style={styles.addnewPost}>
                                    <Text style={styles.item} onPress={gotoCategory}>New Advertisement</Text>
                                    <View style={styles.divider}></View>
                                    <Text style={styles.item} onPress={gotoDraft}>Draft</Text>
                                </View> : null
                            }</GestureRecognizer>
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
    )
}
const styles = StyleSheet.create({
    wrapper: {
        padding: Constants.padding,
        paddingTop: Constants.padding + 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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
        marginTop: 16,
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
    addnewPost: {
        position: 'absolute',
        backgroundColor: Constants.colors.whiteColor,
        right: 20,
        top: 40,
        width: 220,
        zIndex: 9999,
        borderTopLeftRadius: 12,
        borderBottomRightRadius: 12,
        borderBottomLeftRadius: 12,
    },
    item: {
        padding: 13,
    },
    divider: {
        width: '100%',
        height: 1,
        backgroundColor: '#D1D1D1'
    },
    subtitle: {
        backgroundColor: '#BBFFDA',
        padding: 6,
        paddingLeft: 12,
        paddingRight: 12,
        marginLeft: 12,
        fontWeight: '700',
        color: '#04751F',
        fontFamily: Constants.fontFamily,
        borderRadius: 5,
    },
    draft: {
        backgroundColor: 'rgba(231, 204, 62, 0.22)',
        padding: 6,
        paddingLeft: 12,
        paddingRight: 12,
        marginLeft: 12,
        fontWeight: '700',
        color: '#BC9E00',
        fontFamily: Constants.fontFamily,
        borderRadius: 5,
    },
})
export default CustomAppBar