import React from 'react'
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
import Images from '../../../assets/images/Images'
import CustomAppBar from '../../../components/advertiser/CustomAppBar'
import Constants from '../../../shared/Constants'
import globatStyles from '../../../shared/globatStyles'

const AdPreview = (props) => {
    const gotoAddDetails = () => {
        props.navigation.navigate('/add-ad-details')
    }
    return (
        <View style={globatStyles.wrapper}>
            <ImageBackground source={Images.nature} style={styles.nature}>
                <StatusBar translucent={true} backgroundColor='transparent' />
                <CustomAppBar navigation={props.navigation} isMainscreen={false} isReel={true} headerRight={false} title='Nature' subtitle={props.route.params.category} />
                <View style={globatStyles.overlay}></View>
                <View style={styles.productDetailsContainer}>
                    <LinearGradient style={styles.productInfoContainer} colors={['#FFFFFF', '#A4A4B2']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                        <ScrollView>
                            <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                                <Text style={styles.tags}>Tags Business</Text>
                                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                                    <Text style={styles.tags}>Makemytrip,</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                                <Text style={styles.tags}>Type</Text>
                                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                                    <Text style={styles.tags}>Service</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                                <Text style={styles.tags}>Service name</Text>
                                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                                    <Text style={styles.tags}>Varanasi 3D & 2D,</Text>
                                </View>
                            </View>
                            <Text style={{ fontFamily: Constants.fontFamily, fontSize: 16, }}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut . Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut .
                            </Text>
                        </ScrollView>
                    </LinearGradient>
                    <View style={{ flexDirection: 'row', }}>
                        <Pressable style={[globatStyles.btnOutline, { width: '46%' }]}><Text style={globatStyles.btnOutlineText}>Save as draft</Text></Pressable>
                        <Pressable style={[globatStyles.button, { width: '46%', marginLeft: '8%', }]} onPress={gotoAddDetails}><Text style={globatStyles.btnText}>Proceed</Text></Pressable>
                    </View>
                </View>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    nature: {
        flex: 1
    },
    productDetailsContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        padding: Constants.padding,
        bottom: 20,
    },
    productInfoContainer: {
        padding: Constants.padding,
        borderRadius: 8,
        opacity: 0.7,
    },
    tags: {
        fontFamily: Constants.fontFamily,
        marginRight: 12,
        fontWeight: '700',
    },
})

export default AdPreview