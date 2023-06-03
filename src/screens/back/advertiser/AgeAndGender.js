import React, { useState, useCallback } from 'react'
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    StatusBar,
    Pressable,
} from 'react-native'
import CustomAppBar from '../../../components/advertiser/CustomAppBar'
import Constants from '../../../shared/Constants'
import globatStyles from '../../../shared/globatStyles'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import RangeSlider from 'rn-range-slider'
import Fontisto from 'react-native-vector-icons/Fontisto'
import showToastmsg from '../../../shared/showToastmsg'

const AgeAndGender = (props) => {
    const [allGender, setAllGender] = useState(true)
    const [male, setMale] = useState(false)
    const [female, setFemale] = useState(false)
    const [others, setOthers] = useState(false)
    const [low, setLow] = useState(18)
    const [high, setHigh] = useState(80)
    const gotoCreateAudience = () => {
        if(allGender==false&&male==false&&female==false&&others==false){
            showToastmsg("Please select atleast one gender")
        }
        else {
            const tempgender=[]
            if(allGender && !tempgender.includes("all")){
                tempgender.push("all")
            }
            else {
                if(male && !tempgender.includes("male")){
                    tempgender.push("male")
                }
                if(female && !tempgender.includes("female")){
                    tempgender.push("female")
                }
                if(others && !tempgender.includes("others")){
                    tempgender.push("others")
                }
            }
            props.navigation.navigate('/create-audience',{category: props.route.params.category,
                postDetails:{
                    title:props?.route?.params?.postDetails?.title,
                    postVideo:props?.route?.params?.postDetails?.postVideo,
                    tags:props?.route?.params?.postDetails?.tags,
                    type:props?.route?.params?.postDetails?.type,
                    description:props?.route?.params?.postDetails?.description,
                    location:props?.route?.params?.postDetails?.location,
                    productName:props?.route?.params?.postDetails?.productName
                },
                advertise_audience_gender:tempgender,
                advertise_audience_age:`${low}-${high}`,
                selectGoal:props?.route?.params?.selectGoal,
                selectTargetAudience:props?.route?.params?.selectTargetAudience,
                userDetails:props?.route?.params?.userDetails,
                formdata:props?.route?.params?.formdata
                })
        }
        
    }
    const renderThumb = useCallback(() => <View>
        <Fontisto name='radio-btn-active' size={26} color={Constants.colors.primaryColor} />
    </View>, [])
    const renderRail = useCallback(() => <View style={{
        height: 8,
        width: Constants.width-Constants.padding*2-16,
        backgroundColor: '#D6D6D6',
        borderRadius: 5,
    }}></View>, [])
    const renderRailSelected = useCallback(() => <View style={{backgroundColor: Constants.colors.primaryColor,height: 8,}}>
        <Text></Text>
    </View>, []);
    const renderLabel = useCallback(value => <Text>{value} Yrs</Text>, []);
    const renderNotch = useCallback((value) => <></>, []);
    const handleValueChange = useCallback((low, high) => {
        setLow(low);
        setHigh(high);
    }, []);
    return (
        <View style={globatStyles.wrapper}>
            <StatusBar translucent={true} backgroundColor='transparent' />
            <CustomAppBar navigation={props.navigation} isMainscreen={false} isReel={false} headerRight={false} title='Gender & Age' />
            <ScrollView style={styles.container}>
                <Text style={{ fontFamily: Constants.fontFamily, }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut .</Text>
                <View style={styles.boxContainer}>
                    <View>
                        <Text style={{ fontFamily: Constants.fontFamily, fontSize: 20, }}>Estimated Audience Size</Text>
                        <Text style={{ fontWeight: '700', fontSize: 20, }}>23,566</Text>
                    </View>
                    <FontAwesome name='users' style={styles.userIcon} />
                </View>
                <Text style={{ fontFamily: Constants.fontFamily, fontSize: 22 }}>Select Gender</Text>
                <View style={styles.checkboxContainer}>
                    {
                        allGender ? <MaterialCommunityIcons name='checkbox-marked' style={styles.checkboxIcon} onPress={() => {setAllGender(false),setMale(false),setFemale(false),setOthers(false)}} /> : <MaterialCommunityIcons onPress={() => {setAllGender(true),setMale(true),setFemale(true),setOthers(true)}} name='checkbox-blank-outline' style={styles.checkboxIcon} />
                    }
                    <Text style={styles.checkboxLabel}>All</Text>
                </View>
                <View style={styles.checkboxContainer}>
                    {
                        male ? <MaterialCommunityIcons name='checkbox-marked' style={styles.checkboxIcon} onPress={() => {setMale(false),setAllGender(false)}} /> : <MaterialCommunityIcons onPress={() => setMale(true)} name='checkbox-blank-outline' style={styles.checkboxIcon} />
                    }
                    <Text style={styles.checkboxLabel}>Male</Text>
                </View>
                <View style={styles.checkboxContainer}>
                    {
                        female ? <MaterialCommunityIcons name='checkbox-marked' style={styles.checkboxIcon} onPress={() => {setFemale(false),setAllGender(false)}} /> : <MaterialCommunityIcons onPress={() => setFemale(true)} name='checkbox-blank-outline' style={styles.checkboxIcon} />
                    }
                    <Text style={styles.checkboxLabel}>Female</Text>
                </View>
                <View style={styles.checkboxContainer}>
                    {
                        others ? <MaterialCommunityIcons name='checkbox-marked' style={styles.checkboxIcon} onPress={() => {setOthers(false),setAllGender(false)}} /> : <MaterialCommunityIcons onPress={() => setOthers(true)} name='checkbox-blank-outline' style={styles.checkboxIcon} />
                    }
                    <Text style={styles.checkboxLabel}>Others</Text>
                </View>
                <Text style={{ fontFamily: Constants.fontFamily, fontSize: 22, marginTop: 12, }}>Select Age Range</Text>
                <RangeSlider 
                    style={styles.slider}
                    min={10}
                    max={80}
                    step={1}
                    
                    floatingLabel={false}
                    renderThumb={renderThumb}
                    renderRail={renderRail}
                    renderRailSelected={renderRailSelected}
                    renderLabel={renderLabel}
                    renderNotch={renderNotch}
                    onValueChanged={handleValueChange}
                />
                <Pressable style={globatStyles.button} onPress={gotoCreateAudience}><Text style={globatStyles.btnText}>Done</Text></Pressable>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 12,
    },
    checkboxIcon: {
        fontSize: 28,
    },
    checkboxLabel: {
        fontFamily: Constants.fontFamily,
        fontSize: 18,
        marginLeft: 12,
    },
    slider: {
        marginTop: 12,
    },
})

export default AgeAndGender