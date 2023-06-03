import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    FlatList,
    Pressable,
    TextInput,
    ActivityIndicator,
} from 'react-native'
import SelectDropdown from 'react-native-select-dropdown'
import CustomAppBar from '../../../components/business/CustomAppBar'
import Constants from '../../../shared/Constants'
import globatStyles from '../../../shared/globatStyles'
import RenderUserList from './RenderUserList'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import showToastmsg from '../../../shared/showToastmsg'
import { FlashList } from '@shopify/flash-list'

const UserManagement=(props)=>{
    const navigation=useNavigation()
    const [addUser, setAddUser] = useState(false)
    const [loader,setLoader]=useState(false)
    const [users,setUsers]=useState([])
    const [privilages,setPrivilages]=useState([])
    const [privilage,setPrivilage]=useState()
    const [username,setUsername]=useState()
    const [buttonLoader,setbuttonLoader]=useState(false)
    const [email,setEmail]=useState()
    const [phone,setPhone]=useState()
    const [privilagesData,setPrivilagesData]=useState([])
    const getUsers=()=>{
        setLoader(true)
        axios.post(`${Constants.BASE_URL}auth/get-sub-user`,{
            "owner_id":props?.route?.params?.userDetails?.id,
            "role_id":props?.route?.params?.userDetails?.role_id
        })
        .then((response)=>{
            axios.get(`${Constants.BASE_URL}auth/get-privilages/${props?.route?.params?.userDetails?.role_id}`)
            .then((res)=>{
                setLoader(false)
                setAddUser(false)
                const temprivi=[]
                if(res.data.data.Privilages&&res.data.data.Privilages.length>0){
                    for(let i=0;i<res.data.data.Privilages.length;i++){
                        temprivi.push(
                            (res.data.data.Privilages[i].privilages_name).toUpperCase()
                        )
                    }
                }
                setPrivilagesData(res.data.data.Privilages)
                setPrivilages(temprivi)
                
            })
            .catch((error)=>{
                setLoader(false)
                console.log("error=>",error.response);
            })
            // setLoader(false)
            setUsers(response.data.data.auth_sub_user)
            
        })
        .catch((error)=>{
            setLoader(false)
            console.log("error=>",error.response);
        })
    }
    const addUserFunction=()=>{
        if(!username||username==''){
            showToastmsg('Please add username')
        }
        else if(!email||email==''){
            showToastmsg('Please add email')
        }
        else if(!phone||phone==''){
            showToastmsg('Please add phone number')
        }
        else if(!privilage||privilage==''){
            showToastmsg('Please select privilage')
        }
        else{setbuttonLoader(true)
        var responseObj={}
        if(props?.route?.params?.userDetails?.role_id==1){
            responseObj= {    
                "business_id":props?.route?.params?.userDetails?.id,
                "role_id":props?.route?.params?.userDetails?.role_id,
                "username":username,
                "email":email,
                "mobile_number":phone,
                "privilages_id":privilagesData.filter((i)=>(i.privilages_name).toLowerCase()==privilage.toLowerCase()).map((item)=>item.privilages_id),
                "is_active":true,
                "is_sub_user":true
            }
        }
        else  if(props?.route?.params?.userDetails?.role_id==2){
            responseObj= {    
                "business_id":props?.route?.params?.userDetails?.id,
                "role_id":props?.route?.params?.userDetails?.role_id,
                "username":username,
                "email":email,
                "mobile_number":phone,
                "privilages_id":privilagesData.filter((i)=>(i.privilages_name).toLowerCase()==privilage.toLowerCase()).map((item)=>item.privilages_id),
                "is_active":true,
                "is_sub_user":true
            }
        }
        else  if(props?.route?.params?.userDetails?.role_id==3){
            responseObj= {    
                "business_id":props?.route?.params?.userDetails?.id,
                "role_id":props?.route?.params?.userDetails?.role_id,
                "username":username,
                "email":email,
                "mobile_number":phone,
                "privilages_id":privilagesData.filter((i)=>(i.privilages_name).toLowerCase()==privilage.toLowerCase()).map((item)=>item.privilages_id),
                "is_active":true,
                "is_sub_user":true
            }
        }
        else{
            responseObj= {    
                "business_id":props?.route?.params?.userDetails?.id,
                "role_id":props?.route?.params?.userDetails?.role_id,
                "username":username,
                "email":email,
                "mobile_number":phone,
                "privilages_id":privilagesData.filter((i)=>(i.privilages_name).toLowerCase()==privilage.toLowerCase()).map((item)=>item.privilages_id),
                "is_active":true,
                "is_sub_user":true
            }
        } 
        axios.post(`${Constants.BASE_URL}auth/add-sub-user`,responseObj)
        .then((response)=>{
            console.log("check_sub_user",responseObj)
            setbuttonLoader(false)
            showToastmsg("Added successfully")
            getUsers()
        })
        .catch((error)=>{
            setbuttonLoader(false)
            showToastmsg("Already Existe ")
            console.log("error==>",error.response?._response?.Error);
        })}
    }
    useEffect(()=>{
        
        getUsers()
    },[props?.route?.params])
    return (
        <View style={styles.wrapper}>
            <CustomAppBar navigation={navigation} isMainscreen={false} isReel={false} title='User Management'  />
            {loader?
            <ActivityIndicator color={Constants.colors.primaryColor} size={40} style={{marginTop:20}}/>
                :<ScrollView style={styles.container}>
                <Text style={styles.infoText}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut .
                </Text>
                {users.length>0?
                    <>
                <View style={styles.header}>
                    <Text style={[styles.headingText]}></Text>
                    <Text style={[styles.headingText,{width:"30%"}]}>User</Text>
                    <Text style={[styles.headingText, {width:'50%',textAlign:'left'}]}>Role</Text>
                    <Text style={[styles.headingText, {width:'30%'}]}>Status</Text>
                </View>
                <FlatList
                    data={users}
                    renderItem={item=><RenderUserList data={item} privilagesData={privilagesData}/>}
                    keyExtractor={item=>item?.id?.toString()}
                    />
                    </>
                :
                <View style={{width:'100%',paddingTop:20,paddingBottom:10}}>
                    <Text style={[styles.headingText,{fontSize:20,textAlign:'center'}]}>
                        No sub-users found
                    </Text>
                </View>    
                }
                    {
                        !addUser?<Pressable style={[styles.addUserBtn,{width:'100%'}]} onPress={()=>setAddUser(true)}><Text style={styles.btnText}>Add User</Text></Pressable>:(
                            <View style={{marginTop: Constants.margin,}}>
                                <Text style={styles.headingAddUser}>Add User</Text>
                                <TextInput style={globatStyles.inputText} placeholder='User Name' onChangeText={setUsername} />
                                <TextInput style={globatStyles.inputText} placeholder='Email id' onChangeText={setEmail} />
                                <TextInput style={globatStyles.inputText} placeholder='Phone number' onChangeText={setPhone} />
                                <SelectDropdown
                                    data={privilages}
                                    defaultButtonText='Assign the Role'
                                    buttonStyle={globatStyles.dropDownBox}
                                    buttonTextStyle={globatStyles.dropdownTextStyle}
                                    rowTextStyle={globatStyles.dropDownListStyle}
                                    renderDropdownIcon={()=><AntDesign name='down' />}
                                    onSelect={setPrivilage} />
                                <Pressable
                                onPress={addUserFunction}
                                style={globatStyles.button}>
                                    {buttonLoader?
                                        <ActivityIndicator color={'#fff'}/>
                                        :<Text style={globatStyles.btnText}>Add</Text>
                                    }
                                    </Pressable>
                            </View>
                        )
                    }
            </ScrollView>}
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    container: {
        padding: Constants.padding,
    },
    infoText: {
        fontFamily: Constants.fontFamily,
    },
    header: {
        marginTop: Constants.margin,
        flexDirection: 'row',
    },
    headingText: {
        fontFamily: Constants.fontFamily,
        // marginLeft: Constants.margin+2,
    },
    userList: {
        marginTop: Constants.margin,
        flexDirection: 'row',
        marginBottom: Constants.margin,
    },
    showInline: {
        flexDirection: 'row',
    },
    userName: {
        fontFamily: Constants.fontFamily,
        fontWeight: '800',
    },
    editIcon: {
        marginRight: 18,
    },
    codContainer: {
        flexDirection: 'row',
    },
    addUserBtn: {
        borderWidth: 1,
        borderColor: Constants.colors.primaryColor,
        padding: 10,
        borderRadius: Constants.borderRadius,
        width: '50%',
        marginTop: 12,
    },
    btnText: {
        color: Constants.colors.primaryColor,
        fontFamily: Constants.fontFamily,
        fontWeight: '800',
        alignSelf: 'center',
    },
    headingAddUser: {
        fontFamily: Constants.fontFamily,
        fontWeight: '800',
        fontSize: 26,
        margin: 12,
    },
})

export default UserManagement