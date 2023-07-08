import React, { useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    ScrollView,
    Pressable,

} from 'react-native'
import CustomAppBar from '../../../components/influencer/CustomAppBar'
import { useNavigation } from '@react-navigation/native'
import globatStyles from '../../../shared/globatStyles'
import Constants from '../../../shared/Constants'
import Fontisto from 'react-native-vector-icons/Fontisto'

const AdDetails = (props) => {
    const [profileVisit, setProfileVisit] = useState(true)
    const [websiteVisit, setWebsiteVisit] = useState(false)
    const [moreMessage, setMoreaMessage] = useState(false)
    const [automatic, setAutomatic] = useState(true)
    const [createOwn, setCreateOwn] = useState(false)
    const navigation = useNavigation()

    const gotoCreateAudience = () => {
        if (automatic) {
            navigation.navigate('/budget-and-duration', {
                category: props.route.params.category,
                postDetails: {
                    title: props?.route?.params?.postDetails?.title,
                    postVideo: props?.route?.params?.postDetails?.postVideo,
                    tags: props?.route?.params?.postDetails?.tags,
                    type: props?.route?.params?.postDetails?.type,
                    description: props?.route?.params?.postDetails?.description,
                    location: props?.route?.params?.postDetails?.location,
                    productName: props?.route?.params?.postDetails?.productName
                },
                productData: props?.route?.params?.productData,
                selectGoal: profileVisit ? "More profile visits" : websiteVisit ? "More website visits" : "More messages",
                selectTargetAudience: automatic ? "Automatic selection" : "Create your own",
                userDetails: props?.route?.params?.userDetails,
                formdata: props?.route?.params?.formdata
            })
        }
        else {
            navigation.navigate('/create-audience', {
                category: props.route.params.category,
                postDetails: {
                    title: props?.route?.params?.postDetails?.title,
                    postVideo: props?.route?.params?.postDetails?.postVideo,
                    tags: props?.route?.params?.postDetails?.tags,
                    type: props?.route?.params?.postDetails?.type,
                    description: props?.route?.params?.postDetails?.description,
                    location: props?.route?.params?.postDetails?.location,
                    productName: props?.route?.params?.postDetails?.productName
                },
                productData: props?.route?.params?.productData,
                selectGoal: profileVisit ? "More profile visits" : websiteVisit ? "More website visits" : "More messages",
                selectTargetAudience: automatic ? "Automatic selection" : "Create your own",
                userDetails: props?.route?.params?.userDetails,
                formdata: props?.route?.params?.formdata
            })
        }
    }
    return (
        <View style={globatStyles.wrapper}>
            {console.log('props_check_for_prodoct_id', props?.route?.params?.productData)}
            <StatusBar translucent={true} backgroundColor='transparent' />
            <CustomAppBar navigation={navigation} isMainscreen={false} isReel={false} headerRight={false} title='Ad Details' />
            <ScrollView style={styles.container}>
                <Text style={{ fontFamily: Constants.fontFamily, }}>Please select your goal and audience type for your ads.</Text>
                <Text style={{ fontFamily: Constants.fontFamily, fontSize: 22, marginTop: 20, marginBottom: 5, }}>Select A Goal</Text>
                <View style={styles.boxContainer}>
                    <Pressable onPress={() => {
                        setProfileVisit(true),
                            setWebsiteVisit(false),
                            setMoreaMessage(false)
                    }} style={styles.radioGroup}>
                        {
                            profileVisit ? <Fontisto style={styles.radioBtn} name='radio-btn-active' onPress={() => {
                                setProfileVisit(true),
                                    setWebsiteVisit(false),
                                    setMoreaMessage(false)
                            }} /> : <Fontisto style={styles.radioBtn} name='radio-btn-passive' onPress={() => {
                                setProfileVisit(true),
                                    setWebsiteVisit(false),
                                    setMoreaMessage(false)
                            }} />
                        }
                        <Text style={{ fontFamily: Constants.fontFamily, fontSize: 16, }}>More profile visits</Text>
                    </Pressable>
                    <Pressable onPress={() => {
                        setProfileVisit(false),
                            setWebsiteVisit(true),
                            setMoreaMessage(false)
                    }} style={styles.radioGroup}>
                        {
                            websiteVisit ? <Fontisto style={styles.radioBtn} name='radio-btn-active' onPress={() => {
                                setProfileVisit(false),
                                    setWebsiteVisit(true),
                                    setMoreaMessage(false)
                            }} /> : <Fontisto style={styles.radioBtn} name='radio-btn-passive' onPress={() => {
                                setProfileVisit(false),
                                    setWebsiteVisit(true),
                                    setMoreaMessage(false)
                            }} />
                        }
                        <Text style={{ fontFamily: Constants.fontFamily, fontSize: 16, }}>More website visits</Text>
                    </Pressable>
                    <Pressable onPress={() => {
                        setProfileVisit(false),
                            setWebsiteVisit(false),
                            setMoreaMessage(true)
                    }} style={styles.radioGroup}>
                        {
                            moreMessage ? <Fontisto style={styles.radioBtn} name='radio-btn-active' onPress={() => {
                                setProfileVisit(false),
                                    setWebsiteVisit(false),
                                    setMoreaMessage(true)
                            }} /> : <Fontisto style={styles.radioBtn} name='radio-btn-passive' onPress={() => {
                                setProfileVisit(false),
                                    setWebsiteVisit(false),
                                    setMoreaMessage(true)
                            }} />
                        }
                        <Text style={{ fontFamily: Constants.fontFamily, fontSize: 16, }}>More messages</Text>
                    </Pressable>
                </View>
                <Text style={{ marginTop: 20, marginBottom: 12, fontFamily: Constants.fontFamily, fontSize: 22, }}>Select Target Audience</Text>
                <View style={styles.boxContainer}>
                    <Pressable onPress={() => {
                        setAutomatic(true),
                            setCreateOwn(false)
                    }} style={styles.radioGroup}>
                        {
                            automatic ? <Fontisto style={styles.radioBtn} name='radio-btn-active' onPress={() => {
                                setAutomatic(true),
                                    setCreateOwn(false)
                            }} /> : <Fontisto style={styles.radioBtn} name='radio-btn-passive' onPress={() => {
                                setAutomatic(true),
                                    setCreateOwn(false)
                            }} />
                        }
                        <Text style={{ fontFamily: Constants.fontFamily, fontSize: 16, }}>Automatic Selection</Text>
                    </Pressable>
                    <Text style={{ fontFamily: Constants.fontFamily, fontSize: 12, marginLeft: 35, }}>Targets people like your followers</Text>
                    <Pressable onPress={() => {
                        setAutomatic(false),
                            setCreateOwn(true)
                    }} style={styles.radioGroup}>
                        {
                            createOwn ? <Fontisto style={styles.radioBtn} name='radio-btn-active' onPress={() => {
                                setAutomatic(false),
                                    setCreateOwn(true)
                            }} /> : <Fontisto style={styles.radioBtn} name='radio-btn-passive' onPress={() => {
                                setAutomatic(false),
                                    setCreateOwn(true)
                            }} />
                        }
                        <Text style={{ fontFamily: Constants.fontFamily, fontSize: 16, }}>Create Your Own</Text>
                    </Pressable>
                    <Text style={{ fontFamily: Constants.fontFamily, fontSize: 12, marginLeft: 35, }}>Manually enter your targeting options</Text>
                </View>
                <Pressable style={globatStyles.button} onPress={gotoCreateAudience}><Text style={globatStyles.btnText}>Next</Text></Pressable>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: Constants.padding,
    },
    boxContainer: {
        padding: Constants.padding,
        backgroundColor: Constants.colors.whiteColor,
        borderRadius: Constants.borderRadius,
        marginBottom: Constants.margin,
    },
    radioGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 9,
        marginTop: 9,
    },
    radioBtn: {
        fontSize: 22,
        marginRight: 12,
    },
})

export default AdDetails