import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    ScrollView,
    Pressable,
    TextInput,
    ActivityIndicator,
} from 'react-native'
import CustomAppBar from '../../../components/explore/CustomAppBar'
import Constants from '../../../shared/Constants'
import FontAwesome from 'react-native-vector-icons/FontAwesome5'
import AntDesign from 'react-native-vector-icons/AntDesign'
import globatStyles from '../../../shared/globatStyles'
import SelectDropdown from 'react-native-select-dropdown'
import showToastmsg from '../../../shared/showToastmsg'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native'
const AddAddress = (props)=>{
    const navigation=useNavigation()
    const [cities,setcities] = useState(['Kolkata', 'Delhi', 'Mumbai', 'Bengaluru'])
    const [states,setstates] = useState(['Uttar Pradesh', 'Maddhya Pradesh', 'Keral', 'West Bengal'])
    // const [locationType,setLocationType]=useState()
    const [locationName,setlocationName]=useState()
    const [addressLine,setAddressLine]=useState()
    const [pinCode,setPinCode]=useState()
    const [city,setCity]=useState()
    const [state,setState]=useState()
    const [Landmark,setLandMark]=useState()
    const [zipcodeLoader,setzipcodeLoader]=useState(false)
    // const locationTypes = ['Home','Office','Others']
    const [loader,setLoader]=useState(false)
    const validateZipCode=(code)=>{
        if(code&&code.length==6){setzipcodeLoader(true)
        axios.get(`https://api.postalpincode.in/pincode/${code}`)
        .then((response)=>{
            if(response.data[0].Status=="Success"){
                const tempcities=cities
                const tempstates=states
                setzipcodeLoader(false)
                console.log("response",response.data[0].PostOffice);
                if(!states.includes(response.data[0].PostOffice[0].State)){
                    tempstates.push(response.data[0].PostOffice[0].State)
                }
                if(!cities.includes(response.data[0].PostOffice[0].District)){
                    tempcities.push(response.data[0].PostOffice[0].District)
                }
                setstates(tempstates)
                setcities(tempcities)
                setState(response.data[0].PostOffice[0].State)
                setCity(response.data[0].PostOffice[0].District)
            }
        })
        .catch((error)=>{
            console.log("error",error);
        })}
        else {
            setzipcodeLoader(false)
            setCity('')
            setState('')
        }
    }
    const gotoAddress = ()=>{
        if(!locationName||locationName==''){
        showToastmsg('Please add location name')    
        }
        // else if(!locationType||locationType==''){
        //     showToastmsg('Please select location type')    
        //     }
        else if(!pinCode||pinCode==''){
                showToastmsg('Please add pincode')    
            }
        else if(!state||state==''){
            showToastmsg('Please select state')    
            }
        else if(!city||city==''){
            showToastmsg('Please select city')    
            }
        else if(!addressLine||addressLine==''){
                showToastmsg('Please add full address')    
            }
        else if(!Landmark||Landmark==''){
            showToastmsg('Please add landmark')    
            }
        else {
            setLoader(true)
            console.log("address datra=>", {
                "user_id": props?.route?.params?.userDetails?.id,
                "address_name": locationName,
                "address_type": "others",
                "zip_code": pinCode,
                "city": city,
                "state": state,
                "address": addressLine,
                "landmark": Landmark
            });
            if(props?.route?.params?.editable){
                axios.post(`${Constants.BASE_URL}auth/update-user-address`,
                {
                    "user_address_id": props?.route?.params?.explore_address_id,
                    "address_name": locationName,
                    "address_type": "others",
                    "zip_code": pinCode,
                    "city": city,
                    "state": state,
                    "address": addressLine,
                    "landmark": Landmark
                }).then((response)=>{
                    if(response.data.response==200){
                        setLoader(false)
                        navigation.navigate('/goto-select-address',{
                            discount:props?.route?.params?.discount,
                            totalPrice:props?.route?.params?.totalPrice,
                            price:props?.route?.params?.price,cartItems:props?.route?.params?.cartItems,userDetails:props?.route?.params?.userDetails})
                    }
                    else {
                        setLoader(false)
                        showToastmsg("Error! Please try again")
                    }
                })
                .catch((error)=>{
                    setLoader(false)
                        showToastmsg("Error! Please try again")
                        console.log("error",error);
                })
            }
            else{axios.post(`${Constants.BASE_URL}auth/add-user-address`,
            {
                "user_id": props?.route?.params?.userDetails?.id,
                "address_name": locationName,
                "address_type": "others",
                "zip_code": pinCode,
                "city": city,
                "state": state,
                "address": addressLine,
                "landmark": Landmark,
                "countrie":"india"
            }).then((response)=>{
                if(response.data.response==200){
                    setLoader(false)
                    navigation.navigate('/goto-select-address',{
                        discount:props?.route?.params?.discount,
                        totalPrice:props?.route?.params?.totalPrice,price:props?.route?.params?.price,cartItems:props?.route?.params?.cartItems,userDetails:props?.route?.params?.userDetails})
                }
                else {
                    setLoader(false)
                    showToastmsg("Error! Please try again")
                }
            })
            .catch((error)=>{
                setLoader(false)
                    showToastmsg("Error! Please try again")
                    console.log("error",error);
            })}
        }
        // navigation.navigate('/add-address')
    }
    useEffect(()=>{
        // setLocationType(props?.route?.params?.address_type)
        if(props?.route?.params?.editable){
            setlocationName(props?.route?.params?.locationName)
            setAddressLine(props?.route?.params?.addressLine)
            setPinCode(props?.route?.params?.pinCode)
            const tempstates=states
            const tempcities=cities
            if(!states.includes(props?.route?.params?.state)){
                tempstates.push(props?.route?.params?.state)
            }
            if(!cities.includes(props?.route?.params?.city)){
                tempcities.push(props?.route?.params?.city)
            }
            setcities(tempcities)
            setstates(tempstates)
            setCity(props?.route?.params?.city)
            setState(props?.route?.params?.state)
            setLandMark(props?.route?.params?.landmark)
        }
    },[])
    return (
        <View style={styles.container}>
            <StatusBar translucent={true} backgroundColor='transparent' />
            <CustomAppBar navigation={navigation} isMainscreen={false} isReel={false} title='Add Address' headerRight={false} />
            <ScrollView style={styles.wrapper}>
                <Text style={styles.description}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut .
                </Text>
                <View style={{marginTop: 12, paddingBottom: 30,}}>
                    <TextInput style={globatStyles.inputText} placeholder='Address Label' value={locationName} onChangeText={setlocationName} />
                    <TextInput style={globatStyles.inputText} placeholder='Address Line' value={addressLine} onChangeText={setAddressLine}/>
                    {/* <SelectDropdown
                        data={locationTypes}
                        defaultButtonText='Select Location Type'
                        buttonStyle={globatStyles.dropDownBox}
                        buttonTextStyle={globatStyles.dropdownTextStyle}
                        rowTextStyle={globatStyles.dropDownListStyle}
                        renderDropdownIcon={()=><AntDesign name='down' />}
                        disabled
                        defaultValue={locationType} />
                    
                     */}
                   <View style={{flex: 1, width: '100%', justifyContent: 'center',position:"relative"}}>
                   <TextInput style={globatStyles.inputText} keyboardType='numeric' placeholder='PIN Code' 
                   value={pinCode}
                    // onBlur={validateZipCode}
                    onChangeText={(e)=>{setPinCode(e)
                    e.length==6&&validateZipCode(e)
                    }}/>
                        {zipcodeLoader&&<ActivityIndicator style={styles.eyeIcon} />}
                    </View>  
                    <SelectDropdown
                        data={states}
                        defaultButtonText='Select State'
                        buttonStyle={globatStyles.dropDownBox}
                        buttonTextStyle={globatStyles.dropdownTextStyle}
                        rowTextStyle={globatStyles.dropDownListStyle}
                        renderDropdownIcon={()=><AntDesign name='down' />}
                        onSelect={setState}
                        defaultValue={state}
                        />
                     <SelectDropdown
                        data={cities}
                        defaultButtonText='Select City'
                        buttonStyle={globatStyles.dropDownBox}
                        buttonTextStyle={globatStyles.dropdownTextStyle}
                        rowTextStyle={globatStyles.dropDownListStyle}
                        renderDropdownIcon={()=><AntDesign name='down' />}
                        onSelect={setCity} 
                        defaultValue={city}
                        />
                        
                    <TextInput style={globatStyles.inputText} value={Landmark}  placeholder='Landmark' onChangeText={setLandMark} />
                    <Pressable onPress={gotoAddress} style={globatStyles.button}>
                        {loader?
                        <ActivityIndicator color={'white'}/>
                        :<Text style={globatStyles.btnText}>Add</Text>}
                        </Pressable>
                </View>
            </ScrollView> 
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    description: {
        fontFamily: Constants.fontFamily,
    },
    wrapper: {
        padding: Constants.padding,
    },
    mapIocn: {
        position: 'absolute',
        top: 12,
        right: 14,
    },
    eyeIcon: {
        position: 'absolute',
        top: 15,
        right: 25,
        color: '#999999',
        fontSize: 24,
    },
})

export default AddAddress