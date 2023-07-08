import { StyleSheet, Text, View,Image, Pressable, Touchable } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Images from '../../../assets/images/Images';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GuideScreen = () => {

  const navigation = useNavigation();
  const clickfn=async()=>{
    // await AsyncStorage.setItem("gesture","true")
    navigation.goBack()
  }
  return (
      
      <Pressable style={styles.container} onPress={clickfn} >
      <View style={{marginTop:180}}>
      <Text style={styles.text}>      Watching  stories </Text>
      <Text style={styles.textunder}>     You can use the gesture to {'\n'}                control play </Text>

        {/*  */}
        <View style={{marginTop:30, right:2,}}>
        <Image
        style={styles.icon}
        source={Images.holdpress}
        />
        <Text style={styles.press}> {'\n'}        See stories </Text>
        <Text style={styles.pressdesciption}>Long press to see stories </Text>
        </View>
        {/*  */}
 

        {/*  */}
        <View style={{marginTop:40, right:2,}}>
        <Image
        style={styles.icon}
        source={Images.swapdown}
        />
        <Text style={styles.press}> {'\n'}         Go back </Text>
        <Text style={styles.pressdesciption}> Swapdown to go Back </Text>
        </View>
        {/*  */}  

        {/*  */}
        <View style={{marginTop:40, right:2,}}>
        <Image
        style={styles.icon}
        source={Images.leftright_}
        />
        <Text style={styles.press}> {'\n'}Move between screen</Text>
        <Text style={styles.pressdesciption}>     click left  or right</Text>
        </View>
        {/*  */}  
    
    </View>
     <View style={{marginTop:100,}}><Text>Tap to Keep Watching</Text></View>
    </Pressable> 

  )
}



const styles = StyleSheet.create({
  container:{
    flex:1,
    position:"relative",
    backgroundColor:"grey",
    alignItems:"center",
    
  },

text:{
    left:10,
    color:"white",
    fontSize:24,
    marginBottom:8,    
 },
 textunder:{
  color:"white",
    fontSize:17,
    letterSpacing:1,
    opacity:0.5,
 },
 icon:{
  position:"absolute",
  height:60,
  width:60,
  resizeMode:'contain',
  left:15,
 },
 press:{
  marginTop:5,
  left:87,
 },
 pressdesciption:{
     
     left:92,
     fontSize:12,
 }

})





export default GuideScreen