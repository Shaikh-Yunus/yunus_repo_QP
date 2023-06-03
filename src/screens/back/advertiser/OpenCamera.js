import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    Image,
    Pressable,
} from 'react-native'
import CustomAppBar from '../../../components/influencer/CustomAppBar'
import { useNavigation } from '@react-navigation/native'
import globatStyles from '../../../shared/globatStyles'
import Constants from '../../../shared/Constants'
import { launchCamera } from 'react-native-image-picker'
import PhotoEditor from 'react-native-photo-editor'

const  OpenCamera=(props)=>{
    const navigation = useNavigation()
    const [cameraImg, setCameraImg]= useState(null)
    useEffect(()=>{
        openCamera()
    },[])
    const openCamera = async ()=>{
        try{
			const result = await launchCamera()
			setCameraImg(result.assets[0].uri)
		}
        catch(err){
			console.log(err)
		}
    }
    const gotoAddPost = ()=>{
        navigation.navigate('/add-advertisment', {img: cameraImg, category: props.route.params.category})
    }
    const editImg = async ()=>{
        try {
            const result = await PhotoEditor.open({path: cameraImg})
            setCameraImg(result)
        }catch(err){
            console.log(err)
        }
    }
    return (
        <View style={[globatStyles.wrapper,{backgroundColor: '#000000'}]}>
            <StatusBar translucent={true} backgroundColor='transparent' />
            <CustomAppBar navigation={navigation} isMainscreen={false} isReel={true} headerRight={false} title={props.route.params.category} isCamera={true} />
            <View style={{flex: 1, alignItems: 'stretch'}}>
                <View style={styles.imgContainer}>
                    <Image source={{uri: cameraImg}} alt='Img' style={styles.cameraImg} />
                </View>
                <View style={styles.options}>
                    <Text style={styles.retake} onPress={()=>openCamera()}>Retake</Text>
                    <Text style={styles.retake} onPress={()=>editImg()}>Edit</Text>
                </View>
                <View style={{padding: Constants.padding}}>
                    <Pressable onPress={gotoAddPost} style={[globatStyles.button, {marginBottom: 20,}]}><Text style={globatStyles.btnText}>Continue</Text></Pressable>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cameraImg: {
        width: Constants.width,
        height: 350,
    },
    imgContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    options: {
        padding: Constants.padding,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    retake: {
        fontSize: 20,
        color: Constants.colors.whiteColor,
        fontFamily: Constants.fontFamily,
        marginTop: 20,
    },
})

export default OpenCamera