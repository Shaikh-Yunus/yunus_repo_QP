import React, { useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    Image,
    Pressable,
    ScrollView,
    TextInput,
    Platform,
    PermissionsAndroid
} from 'react-native'
import CustomAppBar from '../../../components/influencer/CustomAppBar'
import { useNavigation } from '@react-navigation/native'
import globatStyles from '../../../shared/globatStyles'
import Constants from '../../../shared/Constants'
import { launchCamera } from 'react-native-image-picker'
import Images from '../../../assets/images/Images'
import Fontisto from 'react-native-vector-icons/Fontisto'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const AddAdvertisement = (props) => {
    const navigation = useNavigation()
    const [postImg, setPostImg] = useState([props.route.params.img])
    const [products, setProducts] = useState('products')
    const [services, setServicess] = useState('')
    const requestCameraPermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                    {
                        title: 'Camera Permission',
                        message: 'App needs camera permission',
                    },
                );
                // If CAMERA Permission is granted
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } catch (err) {
                console.warn(err);
                return false;
            }
        } else return true;
    };

    const requestExternalWritePermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: 'External Storage Write Permission',
                        message: 'App needs write permission',
                    },
                );
                // If WRITE_EXTERNAL_STORAGE Permission is granted
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } catch (err) {
                console.warn(err);
                console.log('Write permission err', err);
            }
            return false;
        } else return true;
    };
    const openCamera = async () => {
        try {
            let isCameraPermitted = await requestCameraPermission();
            let isStoragePermitted = await requestExternalWritePermission();
            if (isCameraPermitted && isStoragePermitted) {
                const result = await launchCamera()
                setPostImg([...postImg, result.assets[0].uri])
            }
        }
        catch (err) {
            console.log(err)
        }
    }
    const removeImg = (i) => {
        const img = [...postImg]
        img.splice(i, 1)
        setPostImg(img)
    }
    const gotoProductPreview = () => {
        navigation.navigate('/ad-preview', { category: props.route.params.category })
    }
    return (
        <View style={globatStyles.wrapper}>
            <StatusBar translucent={true} backgroundColor='transparent' />
            <CustomAppBar navigation={navigation} isMainscreen={false} isReel={false} headerRight={false} title='Post' subtitle={props.route.params.category} isCamera={true} />
            <ScrollView style={styles.container}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, flexWrap: 'wrap' }}>
                    {
                        postImg ? postImg.map((img, i) => (
                            <View style={styles.imgContainer} key={i + 1}>
                                <Image source={{ uri: img }} alt='Img' style={styles.cameraImg} />
                                <Pressable onPress={() => removeImg(i)} style={styles.removeImg}><Text>X</Text></Pressable>
                            </View>
                        )
                        ) : null
                    }
                    <Pressable style={styles.addMore} onPress={openCamera}>
                        <Image source={Images.cameraIcon} />
                        <Text style={styles.btnText}>Add More</Text>
                    </Pressable>
                </View>
                <TextInput style={globatStyles.inputText} placeholder='Add Title' />
                <TextInput style={[globatStyles.inputText, { marginBottom: 2, }]} placeholder='Tag Business' />
                <View style={{ marginTop: 12, marginBottom: 12, flexDirection: 'row' }}>
                    {
                        products === 'products' ? <Fontisto name='radio-btn-active' onPress={() => {
                            setProducts('products')
                            setServicess('')
                        }} size={22} /> : <Fontisto name='radio-btn-passive' onPress={() => {
                            setProducts('products')
                            setServicess('')
                        }} size={22} />
                    }
                    <Text> &nbsp; &nbsp; </Text><Text style={styles.label}>Products</Text><Text> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </Text>
                    {
                        services === 'services' ? <Fontisto name='radio-btn-active' onPress={() => {
                            setProducts('')
                            setServicess('services')
                        }} size={22} /> : <Fontisto name='radio-btn-passive' onPress={() => {
                            setServicess('services')
                            setProducts('')
                        }} size={22} />
                    }
                    <Text> &nbsp; &nbsp; </Text><Text style={styles.label}>Products</Text>
                </View>
                <TextInput style={globatStyles.inputText} placeholder='Product Name' />
                <View>
                    <TextInput style={globatStyles.inputText} placeholder='Location' />
                    <FontAwesome name='map-marker' size={26} style={styles.mapIcon} />
                </View>
                <TextInput style={[globatStyles.inputText, { marginBottom: 0, }]} placeholder='Description' multiline={true} height={160} />
                <Text style={styles.hints}>*maximum words 250</Text>
                <View style={{ flexDirection: 'row', paddingBottom: 20, }}>
                    <Pressable style={[globatStyles.btnOutline, { width: '46%' }]}><Text style={globatStyles.btnOutlineText}>Save as draft</Text></Pressable>
                    <Pressable style={[globatStyles.button, { width: '46%', marginLeft: '4%' }]} onPress={gotoProductPreview}><Text style={globatStyles.btnText}>PREVIEW</Text></Pressable>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: Constants.padding,
    },
    imgContainer: {
        width: '45%',
        marginRight: '4%',
        marginTop: 12,
    },
    cameraImg: {
        width: '100%',
        height: 240,
        borderRadius: 20,
    },
    removeImg: {
        position: 'absolute',
        left: '90%',
        top: -10,
        width: 30,
        height: 30,
        borderRadius: 30,
        borderWidth: 3,
        borderColor: Constants.colors.primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 999,
    },
    addMore: {
        width: '45%',
        alignItems: 'center',
        justifyContent: 'center',
        height: 130,
        backgroundColor: '#F5FFFA',
        borderStyle: 'dashed',
        borderWidth: 1,
        borderColor: '#D9D9D9',
        borderRadius: 5,
        marginBottom: 16,
    },
    btnText: {
        color: Constants.colors.primaryColor,
        marginTop: 12,
        fontFamily: Constants.fontFamily,
        fontWeight: '700',
    },
    hints: {
        fontFamily: Constants.fontFamily,
        fontSize: 12,
        color: 'rgba(0,0,0,0.3)',
        marginBottom: 12,
    },
    label: {
        fontFamily: Constants.fontFamily,
        fontWeight: '700',
    },
    mapIcon: {
        position: 'absolute',
        right: 10,
        top: 10,
    },
})

export default AddAdvertisement