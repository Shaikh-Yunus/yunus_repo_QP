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

const SignupDetails = (props) => {
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const [gender, setGender] = useState('m')
    const navigation = useNavigation()

    const gotoUserManagement = () => {
        props.route.params.authentication('explore')
    }
    const gotoSignin = () => {
        navigation.navigate('/goto-signin')
    }
    return (
        <View style={styles.wrapper}>
            <Text style={styles.header}>Signup</Text>
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.editText}>
                        Fill in your details and create a profile for others to explore m
                    </Text>
                </View>
                <View style={styles.container}>
                    <View>
                        <TextInput style={globatStyles.inputText} placeholder='Full name' />
                    </View>
                    <View>
                        <TextInput style={globatStyles.inputText} placeholder='Email ID' />
                    </View>
                    <View>
                        <Pressable style={[globatStyles.inputText, { height: 50, }]} onPress={() => setOpen(true)}>
                            <Text>Date Of Birth</Text>
                            <AntDesign name='calendar' style={styles.calederIcon} />
                        </Pressable>
                        <DatePicker
                            modal
                            open={open}
                            date={date}
                            mode='date'
                            textColor={'black'}
                            onDateChange={setDate}
                            onConfirm={(date) => {
                                setOpen(false)
                                setDate(date)
                            }}
                            onCancel={() => {
                                setOpen(false)
                            }}
                        />
                    </View>
                    <View>
                        <TextInput style={globatStyles.inputText} placeholder='Date Of Birth' />
                    </View>
                    <View>
                        <Text style={globatStyles.inputLabel}>Gender</Text>
                        <View style={styles.gender}>
                            {
                                gender === 'm' ? <Fontisto name='radio-btn-active' onPress={() => setGender('m')} style={styles.genderIcon} /> : <Fontisto style={styles.genderIcon} name='radio-btn-passive' onPress={() => setGender('m')} />
                            }<Text style={styles.genderLabel}> Male</Text>
                            {
                                gender === 'f' ? <Fontisto name='radio-btn-active' onPress={() => setGender('f')} style={styles.genderIcon} /> : <Fontisto style={styles.genderIcon} name='radio-btn-passive' onPress={() => setGender('f')} />
                            }<Text style={styles.genderLabel}> Female</Text>
                            {
                                gender === 'o' ? <Fontisto name='radio-btn-active' onPress={() => setGender('o')} style={styles.genderIcon} /> : <Fontisto style={styles.genderIcon} name='radio-btn-passive' onPress={() => setGender('o')} />
                            }<Text style={styles.genderLabel}> Others</Text>
                        </View>
                        <View>
                            <TextInput style={globatStyles.inputText} secureTextEntry={true} placeholder='Create Password' />
                        </View>
                        <View>
                            <TextInput style={globatStyles.inputText} secureTextEntry={true} placeholder='Confirm Password' />
                        </View>
                        <Pressable onPress={gotoUserManagement} style={globatStyles.button}><Text style={globatStyles.btnText}>Sign Up</Text></Pressable>
                        <View style={styles.signinContainer}>
                            <Text>Already have an account?</Text>
                            <Pressable onPress={gotoSignin}><Text style={styles.signinBtn}> Sign In</Text></Pressable>
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
    header: {
        fontSize: 26,
        fontFamily: Constants.fontFamily,
        fontWeight: '800',
        marginBottom: Constants.margin,
        marginTop: Constants.margin + 10,
        marginLeft: Constants.margin,
    },
    editText: {
        fontFamily: Constants.fontFamily,
    },
    logo: {
        alignSelf: 'center',
        marginTop: Constants.margin,
        marginBottom: Constants.margin + 30,
        borderWidth: 2,
        width: 175,
        height: 175,
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
    gender: {
        flexDirection: 'row',
        marginBottom: Constants.margin,
    },
    genderIcon: {
        fontSize: 24,
        marginTop: 10,
    },
    genderLabel: {
        marginLeft: 8,
        marginRight: Constants.margin + 12,
        marginTop: 10,
    },
    calederIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
        fontSize: 26,
        color: '#03053D',
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

export default SignupDetails