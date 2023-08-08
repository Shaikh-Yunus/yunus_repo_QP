import React from 'react'
import { 
    View,
    Text,
    Image,
    StyleSheet,
    Pressable,
} from 'react-native'
import Images from '../../assets/images/Images'
import Constants from '../../shared/Constants'
import AntDesign from 'react-native-vector-icons/AntDesign'

const CustomAppBar=(props)=>{
    const goBack = ()=>{
        props.navigation.goBack()
    }
    const openDrawer = ()=>{
        props.openDrawer()
    }
    return (
        <View style={styles.wrapper}>
            {
                props.isMainscreen?(
                    <View style={[styles.logoContainer, props.title?({alignItems: 'center'}):null]}>
                        <Pressable onPress={openDrawer}>
                            {
                                props.showDrawer?<AntDesign name='close' size={26} />:<Image source={Images.hamburgerMenuIcon} />
                            }
                        </Pressable>
                        {
                            props.title?<Text style={styles.title}>{props.title}</Text>:(
                                <View style={{marginStart: 20,marginTop: -12}}>
                                    <Text style={styles.welcome}>Hello!</Text>
                                    <Text style={styles.companyName}>XYZ Company</Text>
                                </View>
                            )
                        }
                    </View>
                    ):(
                    <View style={styles.titleBar}>
                        <Pressable onPress={goBack}><AntDesign name='left' size={24} style={props.isReel?styles.reelBackBtn:styles.backBtn} />
                        </Pressable>
                        <Text style={{...styles.title, color: props.isReel?Constants.colors.whiteColor: 'rgba(0,0,0,1)'}}>{props.title}</Text>
                    </View>
                )
            }
        </View>
    )
}
const styles = StyleSheet.create({
    wrapper: {
        padding: Constants.padding,
        paddingTop: 45,
        flexDirection: 'row',
    },
    logoContainer: {
        flexDirection: 'row',
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
})
export default CustomAppBar