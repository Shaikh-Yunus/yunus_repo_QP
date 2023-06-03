import React, {useState} from 'react'
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    Pressable,
    TextInput,
    ActivityIndicator,
} from 'react-native'
import Constants from '../../../shared/Constants'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import globatStyles from '../../../shared/globatStyles'
import CustomAppBar from '../../../components/influencer/CustomAppBar'
import showToastmsg from '../../../shared/showToastmsg'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native'

const UpdatePasswordAdvertiser = (props)=>{
    const navigation=useNavigation()
    const [viewNewPass, setViewNewPass] = useState(false)
    const [viewConfirmPass, setViewConfirmPass] = useState(false)
    const [password,setpassword]=useState()
    const [cpassword,setCpassword]=useState()
    const [isLoading,setIsLoading]=useState(false)
    const gotoChangePassword = ()=>{
        if(password==''||password==null){
            showToastmsg('Please enter password')
        }
        else if(cpassword==''||cpassword==null){
            showToastmsg('Please enter password')
        }
        else if(password!=cpassword){
            showToastmsg('Password did not matched')
        }
        else {
            setIsLoading(true)
axios.post(`${Constants.BASE_URL}auth/change-password`,{
    "user_id":props?.route?.params?.changeId,
    "new_password":password
}).then((response)=>{
    setIsLoading(false)
    if(!response.data.error){
        showToastmsg('Password updated successfully')
        navigation.navigate("/business-login",{login_type:props?.route?.params?.userType})
    }
    else {
        showToastmsg('Password updation failed. Please try again')
    }
}).catch((error)=>{
    console.log("update failed",error);
    showToastmsg('Password updation failed. Please try again')
    setIsLoading(false)
})
        }
        
    }
    return (
        <View style={styles.container}>
            <StatusBar translucent={true} backgroundColor='transparent' />
            <CustomAppBar navigation={navigation} isMainscreen={false} isReel={false} headerRight={false} title='Forgot Password' />
            
            <View style={{padding: Constants.padding}}>
            <Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut .
                </Text>    
                <View style={{marginTop:30}}>
                    <TextInput style={globatStyles.inputText} placeholder='New Password' secureTextEntry={!viewNewPass} onChangeText={setpassword}/>
                    <FontAwesome name={viewNewPass?'eye-slash':'eye'} style={styles.eyeIcon} onPress={()=>setViewNewPass(!viewNewPass)}  />
                </View>
                <View>
                    <TextInput style={globatStyles.inputText} placeholder='New Password' secureTextEntry={!viewConfirmPass} onChangeText={setCpassword}/>
                    <FontAwesome name={viewConfirmPass?'eye-slash':'eye'} style={styles.eyeIcon} onPress={()=>setViewConfirmPass(!viewConfirmPass)} />
                </View>
                <Pressable onPress={isLoading?'':gotoChangePassword} disabled={isLoading} style={globatStyles.button}>{isLoading?
                    <ActivityIndicator size={20} color={Constants.colors.whiteColor} />:<Text style={globatStyles.btnText}>Set Password</Text>}</Pressable>
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

export default UpdatePasswordAdvertiser