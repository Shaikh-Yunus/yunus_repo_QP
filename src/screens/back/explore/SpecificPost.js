import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Pressable, View } from "react-native";
import Video from "react-native-video";
import AntDesign from 'react-native-vector-icons/AntDesign'
const SpecificPost=(props)=>{
    const navigation=useNavigation()
    return(
        <View style={{position:"relative"}}>
        <Pressable style={{position:"absolute",zIndex:99999,top:10}} onPress={()=>navigation.goBack()}><AntDesign name='left' size={30} color={"#fff"}
        // style={props.isReel ? styles.reelBackBtn : styles.backBtn} 
        /></Pressable>
        <Video
                        source={{uri:props?.route?.params?.video}}
                        // onLoad={(e)=>console.log("onload",e)}
                        // onBandwidthUpdate={()=>console.log("bandwidht")}
                        // onBuffer={()=>console.log("buffering...")}
                        // onReadyForDisplay={(e)=>console.log("ready display",e)}
                        autoplay
                        repeat={true}
                        fullscreen
                        loop
                        muted
                        disableSeek
                        // onVideoBuffer={(e)=>console.log("bueeee",e)}
                        resizeMode={'cover'}
                        style={{width:"100%",height:"100%",zIndex:1}}
                        />
                        </View>
    );
}

export default SpecificPost