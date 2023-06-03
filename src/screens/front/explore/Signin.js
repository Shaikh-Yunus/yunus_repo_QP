import React, { useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Pressable,
    TextInput,
} from 'react-native'
import DatePicker from 'react-native-date-picker'
import Constants from '../../../shared/Constants'
import Fontisto from 'react-native-vector-icons/Fontisto'
import AntDesign from 'react-native-vector-icons/AntDesign'
import globatStyles from '../../../shared/globatStyles'
import { useNavigation } from '@react-navigation/native'

const Signin = (props)=>{
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const [gender,setGender] = useState('m')
    const navigation = useNavigation()
    const gotoProduct = ()=>{
        props.route.params.authentication('explore')
    }
    const gotoSignup = ()=>{
        navigation.navigate('/signup-details')
    }
    return (
        <View style={styles.wrapper}>
            <Text style={styles.header}>Sign In</Text>
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.editText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut .</Text>
                </View>
                <View style={styles.container}>
                    <View>
                        <TextInput style={globatStyles.inputText} placeholder='Email ID' />
                    </View>
                    <View>
                        <TextInput style={globatStyles.inputText} placeholder='Password' secureTextEntry={true} />
                    </View>
                    <Pressable onPress={gotoProduct} style={globatStyles.button}><Text style={globatStyles.btnText}>Sign In</Text></Pressable>
                    <View style={styles.signinContainer}>
                        <Text>Don't have an account?</Text>
                        <Pressable onPress={gotoSignup}><Text style={styles.signinBtn}> SignUp</Text></Pressable>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

const styles= StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    container: {
        flex: 1,
        padding: Constants.padding,
    },
    header: {
        fontSize: 26,
        fontFamily: Constants.fontFamily,
        fontWeight: '800',
        marginBottom: Constants.margin,
        marginTop: Constants.margin+10,
        marginLeft: Constants.margin,
    },
    editText: {
        fontFamily: Constants.fontFamily,
    },
    logo: {
        alignSelf: 'center',
        marginTop: Constants.margin,
        marginBottom: Constants.margin+30,
        borderWidth: 2,
        width: 175,
        height: 175,
    },
    signinContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        justifyContent: 'center',
    },
    signinBtn: {
        color: Constants.colors.primaryColor,
    },
})

export default Signin