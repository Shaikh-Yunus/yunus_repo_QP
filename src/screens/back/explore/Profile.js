import React, { useState } from 'react'
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    Image,
    Pressable,
} from 'react-native'
import Images from '../../../assets/images/Images'
import CustomAppBar from '../../../components/business/CustomAppBar'
import Constants from '../../../shared/Constants'
import Feather from 'react-native-vector-icons/Feather'
import globatStyles from '../../../shared/globatStyles'

const Profile = (props) => {
    const [cameraImg, setCameraImg] = useState(null)
    const gotoEditUser = () => {
        props.navigation.navigate('/edit-profile')
    }
    const openCamera = async () => {
        try {
            const result = await launchCamera()
            setCameraImg(result.assets[0].uri)
        } catch (err) {
            console.log(err)
        }
    }
    const removeImg = () => {
        setCameraImg(null)
    }
    return (
        <View style={styles.wrapper}>
            <CustomAppBar navigation={props.navigation} isMainscreen={false} isReel={false} title='Profile' />
            <Feather name='edit-2' style={styles.editIcon} size={22} onPress={gotoEditUser} />
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.myPillarText}>
                    </Text>
                    {
                        cameraImg ? (
                            <View style={styles.cameraContainer}>
                                <Image source={{ uri: cameraImg }} alt='Img' style={styles.logo} />
                                <Pressable onPress={removeImg} style={styles.removeImg}><Text style={styles.removeIcon}>X</Text></Pressable>
                            </View>
                        ) : (
                            <Pressable style={styles.cameraContainer} onPress={openCamera}>
                                <Image source={Images.userInfoLogo} style={styles.logo} />
                                <Image source={Images.cameraIcontTwo} style={styles.cameraIcon} />
                            </Pressable>
                        )
                    }
                    <View style={styles.userDetailContainer}>
                        <Text style={styles.label}>Name</Text>
                        <Text style={styles.value}>Tanveer Inamdar</Text>
                    </View>
                    <View style={styles.userDetailContainer}>
                        <Text style={styles.label}>Email</Text>
                        <Text style={styles.value}>tanveerinamdar@gmail.com</Text>
                    </View>
                    <View style={styles.userDetailContainer}>
                        <Text style={styles.label}>Phone Number</Text>
                        <Text style={styles.value}>+91 9827336473</Text>
                    </View>
                    <View style={styles.userDetailContainer}>
                        <Text style={styles.label}>Gender</Text>
                        <Text style={styles.value}>Male</Text>
                    </View>
                    <View style={styles.userDetailContainer}>
                        <Text style={styles.label}>Age</Text>
                        <Text style={styles.value}>35 yrs</Text>
                    </View>
                    <View style={globatStyles.divider}></View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <View style={styles.summary}>
                            <Text style={styles.summaryText}>Orders 56</Text>
                        </View>
                        <View style={styles.summary}>
                            <Text style={styles.summaryText}>Following 5746</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    container: {
        flex: 1,
        padding: Constants.padding,
    },
    myPillarText: {
        fontFamily: Constants.fontFamily,
        fontSize: 14,
    },
    logo: {
        alignSelf: 'center',
        marginTop: Constants.margin,
        marginBottom: Constants.margin + 30,
        borderWidth: 2,
    },
    cameraIcon: {
        position: 'absolute',
        top: '75%',
        left: '45%',
        width: 42,
        height: 32,
    },
    cameraImgContainer: {
        marginTop: Constants.margin,
        marginBottom: 12,
        width: 90,
        height: 90,
        backgroundColor: Constants.colors.inputBgColor,
        borderWidth: 0.7,
        borderColor: '#D2D2D2',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Constants.borderRadius,
    },
    removeImg: {
        position: 'absolute',
        right: 85,
        top: 10,
        width: 25,
        height: 25,
        borderRadius: 25,
        backgroundColor: Constants.colors.primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: Constants.colors.whiteColor,
    },
    userDetailContainer: {
        flexDirection: 'row',
        marginBottom: Constants.margin - 8,
    },
    label: {
        width: '40%',
        color: '#484848',
        fontFamily: Constants.fontFamily,
        fontSize: 18,
    },
    value: {
        fontFamily: Constants.fontFamily,
        fontWeight: '700',
        fontSize: 15,
        color: '#484848',
    },
    editIcon: {
        position: 'absolute',
        right: Constants.padding + 10,
        top: 30,
    },
    summary: {
        backgroundColor: 'rgba(0, 169, 40, 0.14)',
        padding: Constants.padding,
        paddingLeft: Constants.padding,
        paddingRight: Constants.padding,
        marginRight: 16,
        borderRadius: Constants.borderRadius,
    },
    summaryText: {
        fontFamily: Constants.fontFamily,
        color: Constants.colors.primaryColor,
        fontSize: 16,
    },
})

export default Profile