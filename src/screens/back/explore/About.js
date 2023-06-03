import React from 'react'
import {
    View,
    Text,
    ImageBackground,
    Image,
    StyleSheet,
    StatusBar,
    Pressable,
} from 'react-native'
import Images from '../../../assets/images/Images'
import CustomAppBar from '../../../components/explore/CustomAppBar'
import Constants from '../../../shared/Constants'
import globatStyles from '../../../shared/globatStyles'
import Feather from 'react-native-vector-icons/Feather'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const About =({navigation})=>{
    
    return (
        <View style={globatStyles.wrapper}>
            <StatusBar translucent={true} backgroundColor='transparent' />
            
        </View>
    )
}

const styles = StyleSheet.create({
    
})

export default About 