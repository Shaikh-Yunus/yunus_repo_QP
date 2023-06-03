import React, {useState} from 'react'
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    Pressable,
    TextInput,
} from 'react-native'
import Constants from '../../../shared/Constants'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import globatStyles from '../../../shared/globatStyles'
import CustomAppBar from '../../../components/influencer/CustomAppBar'

const SetPasswordAdmin = ({navigation})=>{
    const [viewNewPass, setViewNewPass] = useState(false)
    const [viewConfirmPass, setViewConfirmPass] = useState(false)
    const gotoChangePassword = ()=>{
        navigation.navigate('/change-password-admin')
    }
    return (
        <View style={styles.container}>
            <StatusBar translucent={true} backgroundColor='transparent' />
            <CustomAppBar navigation={navigation} isMainscreen={false} isReel={false} headerRight={false} title='Set Password' />
            <View style={{padding: Constants.padding}}>
                <View>
                    <TextInput style={globatStyles.inputText} placeholder='New Password' secureTextEntry={!viewNewPass} />
                    <FontAwesome name={viewNewPass?'eye-slash':'eye'} style={styles.eyeIcon} onPress={()=>setViewNewPass(!viewNewPass)}  />
                </View>
                <View>
                    <TextInput style={globatStyles.inputText} placeholder='Confirm Password' secureTextEntry={!viewConfirmPass} />
                    <FontAwesome name={viewConfirmPass?'eye-slash':'eye'} style={styles.eyeIcon} onPress={()=>setViewConfirmPass(!viewConfirmPass)} />
                </View>
                <Pressable onPress={gotoChangePassword} style={globatStyles.button}><Text style={globatStyles.btnText}>Set Password</Text></Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    eyeIcon: {
        position: 'absolute',
        right: 10,
        top: 14,
        fontSize: 20,
        color: '#D0C9D6',
    },
})

export default SetPasswordAdmin