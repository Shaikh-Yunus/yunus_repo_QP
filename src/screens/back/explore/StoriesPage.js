import {StyleSheet, View,Image, Dimensions,StatusBar, Animated,Pressable} from 'react-native';
import React, {useState,useEffect} from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

import AntDesign from 'react-native-vector-icons/AntDesign'
import Constants from '../../../shared/Constants';
import FastImage from 'react-native-fast-image';

const {width}= Dimensions.get("screen");
const height =  width * 100/60;


const StoriesPage = ({images,gotoStoriespage,}) => {
  
  const [index,setIndex]=useState(0);
  const [Images,setImages]=useState([])
  
 useEffect(()=>{
    if(images&&JSON.parse(images).length>0){
        JSON.parse(images).map((imag,ind)=>{
            Images.push({
                id:ind,
                images:`${Constants.BASE_IMAGE_URL}${imag}`,
               })
        })
    }
  
    setImages([...Images])
    // JSON.parse(images).map((im)=>{
    //     console.log(`${Constants.BASE_IMAGE_URL}${im}`);
    // })
    // console.log("image vaues=>",JSON.parse(images));
    let timer= setTimeout(()=>{
      if(index<(Images.length-1))
           setIndex(index + 1);
           else{
            gotoStoriespage()
           }
    },10000);

    Animated.timing(progress,{
   
      toValue:5,
      duration:10000,
      useNativeDriver:false,
     
    }).start();
    return () => clearTimeout(timer);

  },[index]);

 

  const [progress,setProgress]=useState(new Animated.Value(0));
 
  const progressAnimation= progress.interpolate({
      inputRange :[0,5],
      outputRange:["0%", "100%"],
   
 });
 const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80
  };
const onSwipeDown=(gestureState)=> {
    gotoStoriespage()
  }

 
return (
    <GestureRecognizer style={{flex:1}} onSwipeDown={(state) => onSwipeDown(state)} config={config} >
    <View style={styles.maincontainer}>
     <StatusBar backgroundColor="black" barStyle={"light-content"}/>
     
      <View style={{
        height:3,
        width:"95%",  
        borderWidth:1,
        zIndex:1 ,
        backgroundColor:'gray',
        top:10,
        position:"absolute",
         }}>
        <Animated.View style={{
          height:"100%",
          backgroundColor:"white",
          width: progressAnimation ,
        }}>
         </Animated.View>
      
      </View>
     
  

      <View>
       <AntDesign name='close' size={28} onPress={gotoStoriespage}
       style={{color:"white", zIndex:1  ,position:"absolute",left:150,marginTop:20,}} />
      </View>
    
     <View>
      
<ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        style={{ flexDirection:"row",}} 
        >
        {
         Images.map((item, ind) => (
            index===ind?<View style={styles.images}>{console.log(item)}
            <FastImage
            key={item}
              source={{ uri: item.images }} 
              style={{height, width,resizeMode:"cover", height:"98%"}}
           />
           </View>:null
            ))
        }
           
 </ScrollView>


   
      </View>

       {/* Right click to move image right side  */}
       <Pressable onPress={()=>{
          if(index<(Images.length-1))
           setIndex(index + 1);
           console.log("check index",index)
           
           }} style={styles.rightclick}>
       </Pressable>
       {/* <-- Right click to move image right side  -->*/}



       {/* left click to move image  left side */}
      <Pressable style={styles.leftclick} onPress={()=>{
           if(index>0) 
             setIndex(index -1); 
             else 
             setIndex(0)
             console.log("Check Left Click index  ",index)
             
        }}></Pressable>
      {/* <-- left click to move image  left side -->*/}


    </View></GestureRecognizer>
  );
};



const styles = StyleSheet.create({
  maincontainer:{
  backgroundColor:"black",
  position:"relative",
  height:"100%",
  justifyContent:"center",
  alignItems:"center",
  flex:1,
  },
  images:{
    height,
    width,  
    height:"90%",
    marginTop:80,
    resizeMode:"cover",
  },
  rightclick:{
    position:"absolute",
    height:"88%",
    width:"48%", 
    bottom:18, 
    right:0,
    
 },
 leftclick:{
  position:"absolute",
  height:"88%",
  width:"48%", 
  bottom:18, 
  left:0,
}
});


export default StoriesPage;