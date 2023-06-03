import React, { useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    ScrollView,
    Pressable,
    TextInput,
} from 'react-native'
import CustomAppBar from '../../../components/advertiser/CustomAppBar'
import { useNavigation } from '@react-navigation/native'
import globatStyles from '../../../shared/globatStyles'
import Constants from '../../../shared/Constants'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import showToastmsg from '../../../shared/showToastmsg'

const CreateAudience = (props) => {
    const [audienceName, setAudienceName] = useState()
    const navigation = useNavigation()
    const gotoLocation = () => {
        navigation.navigate('/location',
            {
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
                advertise_audience_gender: props?.route?.params?.advertise_audience_gender,
                advertise_audience_age: props?.route?.params?.advertise_audience_age,
                selectGoal: props?.route?.params?.selectGoal,
                selectTargetAudience: props?.route?.params?.selectTargetAudience,
                userDetails: props?.route?.params?.userDetails,
                formdata: props?.route?.params?.formdata
            }
        )
    }
    const gotoInterests = () => {
        navigation.navigate('/interests', {
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
            advertise_audience_gender: props?.route?.params?.advertise_audience_gender,
            advertise_audience_age: props?.route?.params?.advertise_audience_age,
            selectGoal: props?.route?.params?.selectGoal,
            selectTargetAudience: props?.route?.params?.selectTargetAudience,
            userDetails: props?.route?.params?.userDetails,
            formdata: props?.route?.params?.formdata
        })
    }
    const gotoAgeAndGender = () => {
        navigation.navigate('/age-and-gender', {
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
            advertise_audience_gender: props?.route?.params?.advertise_audience_gender,
            advertise_audience_age: props?.route?.params?.advertise_audience_age,
            selectGoal: props?.route?.params?.selectGoal,
            selectTargetAudience: props?.route?.params?.selectTargetAudience,
            userDetails: props?.route?.params?.userDetails,
            formdata: props?.route?.params?.formdata
        })
    }
    const gotoBudget = () => {
        if (!audienceName || audienceName == "") {
            showToastmsg("Please add audience name")
        }
        else {
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
                audienceName: audienceName,
                advertise_audience_gender: props?.route?.params?.advertise_audience_gender ? props?.route?.params?.advertise_audience_gender : "All",
                advertise_audience_age: props?.route?.params?.advertise_audience_age ? props?.route?.params?.advertise_audience_age : "10-80",
                selectGoal: props?.route?.params?.selectGoal,
                selectTargetAudience: props?.route?.params?.selectTargetAudience,
                userDetails: props?.route?.params?.userDetails,
                formdata: props?.route?.params?.formdata
            })
        }
    }
    return (
        <View style={globatStyles.wrapper}>
            {console.log('props_create->', props?.route?.params?.productData)}
            <StatusBar translucent={true} backgroundColor='transparent' />
            <CustomAppBar navigation={navigation} isMainscreen={false} isReel={false} headerRight={false} title='Create Audience' />
            <ScrollView style={styles.container}>
                <Text style={{ fontFamily: Constants.fontFamily, }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut .
                </Text>
                <View style={styles.boxContainer}>
                    <View>
                        <Text style={{ fontFamily: Constants.fontFamily, fontSize: 20, }}>Estimated Audience Size</Text>
                        <Text style={{ fontWeight: '700', fontSize: 20, }}>23,566</Text>
                    </View>
                    <FontAwesome name='users' style={styles.userIcon} />
                </View>
                <TextInput style={globatStyles.inputText}
                    onChangeText={setAudienceName}
                    placeholder='Audience Name' />
                <Pressable style={styles.boxContainer} onPress={gotoLocation}>
                    <Text style={{ fontFamily: Constants.fontFamily, fontSize: 24, }}>Locations</Text>
                    <FontAwesome name='angle-right' style={styles.userIcon} />
                </Pressable>
                <Pressable style={styles.boxContainer} onPress={gotoInterests}>
                    <Text style={{ fontFamily: Constants.fontFamily, fontSize: 24, }}>Interests</Text>
                    <FontAwesome name='angle-right' style={styles.userIcon} />
                </Pressable>
                <Pressable style={styles.boxContainer} onPress={gotoAgeAndGender}>
                    <View>
                        <Text style={{ fontFamily: Constants.fontFamily, fontSize: 20, }}>Age & Gender</Text>
                        <Text style={{ fontWeight: '700', fontSize: 20, textTransform: 'capitalize' }}>{
                            props?.route?.params?.advertise_audience_gender ? props?.route?.params?.advertise_audience_gender : "All"
                        } | {props?.route?.params?.advertise_audience_age ? props?.route?.params?.advertise_audience_age : "10-80"} yr</Text>
                    </View>
                    <FontAwesome name='angle-right' style={styles.userIcon} />
                </Pressable>
                <Pressable style={globatStyles.button} onPress={gotoBudget}><Text style={globatStyles.btnText}>Budget & Duration</Text></Pressable>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: Constants.padding,
    },
    boxContainer: {
        marginTop: Constants.margin,
        padding: Constants.padding,
        backgroundColor: Constants.colors.whiteColor,
        borderRadius: Constants.borderRadius,
        marginBottom: Constants.margin,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    userIcon: {
        fontSize: 28,
        color: Constants.colors.primaryColor,
    },
})

export default CreateAudience