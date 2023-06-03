import React from 'react'
import { 
    View,
    Text,
    Image,
    StyleSheet,
    Pressable,
    SafeAreaView,
    StatusBar,Share
} from 'react-native'
import Images from '../../assets/images/Images'
import Constants from '../../shared/Constants'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import axios from 'axios'
import dynamicLinks from '@react-native-firebase/dynamic-links';

const CustomAppBar=(props)=>{
    const goBack = ()=>{
        if(props?.backRoute){
            props?.navigation.navigate(props?.backRoute,{comeBack:true})
        }
        else
        props.navigation.goBack() 
    }
    const dynamicLinkGenerator=async()=>{
        const link = await dynamicLinks().buildLink({
            link: `https://quarterpillars.com/business/${props?.userDetails?.id}`,
            // ios: {
            //   bundleId: <bundle_id>,
            //   appStoreId: <appstore_id>,
            // },
            android: {
              packageName: "com.quarterpillars",
            },
            domainUriPrefix: 'https://quarterpillars123.page.link',
          });
          console.log("link->",link);
             await Share.share({
                message:
                  "Hi, please check my profile:- "+link
                //   +", "+JSON.parse(item?.item?.image).map((imageData,index)=>`${Constants.BASE_IMAGE_URL}${imageData}`+index==JSON.parse(item?.item?.image).length-1?"":", "),
                //   ,url:"http://google.com",
                  ,title:"Profile share"
              });
            
               
      }
    return (
        <SafeAreaView>
        <View style={styles.wrapper}>
            { 
                props.isMainscreen?(
                    <View style={[styles.logoContainer, props.title?({alignItems: 'center'}):null]}>
                      <Pressable onPress={()=>props.openDrawer()} style={{zIndex: 999}}>
                            {
                                !props.showDrawer?<Image source={Images.hamburgerMenuIcon} />:<AntDesign name='close' size={26} />
                            }
                            
                        </Pressable> 
                        {
                            props.title?<Text style={styles.title}>{props.title}</Text>:(
                                <View style={{marginStart: 20,marginTop: -12}}>
                                    <View style={{width:Constants.width,display:'flex',alignItems:'center',flexDirection:'row'}}>
                                    <Text style={styles.welcome}>Hello!</Text>
                                    {/* <FontAwesome5Icon name="pen" size={20} style={{paddingLeft:100}}/> */}
                                    </View>
                                    <Text style={styles.companyName}>{props.name}</Text>
                                </View>
                            )
                        }
                    </View>
                    
                ):(
                    <View style={{display:'flex',flexDirection:'column'}}>
                    <View style={[styles.logoContainer,{display:'flex',width:'100%'}]}><View style={styles.titleBar}>
                        <View style={{display:'flex',alignItems:'center',flexDirection:'row'}}>
                        <Pressable onPress={goBack}><AntDesign name='left' size={24} style={props.isReel?styles.reelBackBtn:styles.backBtn} /></Pressable>
                        <Text style={{...styles.title, color: props.isReel?Constants.colors.whiteColor: 'rgba(0, 0, 0, 1)',}}>{props.isInfluencer?props.name:props.title}</Text>
                        {
                            props.subtitle?<Text style={styles.subtitle}>{props.subtitle}</Text>:null
                        }
                        
                        {
                            props.isDraft?<Text style={styles.draft}>Draft</Text>:null
                        }
                        </View>
                        <View style={{flexDirection:"row"}}>
                        {props.editable?
                            
                            <Pressable onPress={()=>props.navigation.navigate('/edit-user-info',{userDetails:props?.userDetails,type:props?.type})}>
                            <FontAwesome5Icon name='pen' size={24} style={props.isReel?styles.reelBackBtn:styles.backBtn} /></Pressable>:null}
                            {props?.shareble?<Pressable 
                            style={{paddingLeft:10}}
                            onPress={dynamicLinkGenerator}>
                            <FontAwesome5Icon name='share' size={24} style={props.isReel?styles.reelBackBtn:styles.backBtn} /></Pressable>:null}
                            </View>
                            
                    </View>
                    
                    </View>
                    {props.subName?<Text style={[styles.companyName,{paddingLeft:'12%'}]}>{props.subName}</Text>:null}
                    </View>
                )
            }
        </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    wrapper: {
        padding: Constants.padding,
        paddingTop:StatusBar.currentHeight,
        flexDirection: 'row',
    },
    logoContainer: {
        flexDirection: 'row',
    },
    title: {
        fontFamily: Constants.fontFamily,
        fontSize: 30,
        fontWeight: '800',
    },
    welcome: {
        fontFamily: Constants.fontFamily,
        fontSize: 32,
        fontWeight: '800',
    },
    companyName: {
        fontFamily: Constants.fontFamily,
        fontSize: 24,
        fontWeight: '500',
        textTransform:'capitalize'
    },
    reelBackBtn: {
        color: Constants.colors.whiteColor,
        backgroundColor: Constants.colors.whiteColor,
        opacity: 0.4,
        padding: 12,
        borderRadius: Constants.borderRadius,
    },
    backBtn: {

    },
    titleBar: {
        marginTop: 16,
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: 99,
        justifyContent:'space-between',
        width:'100%'
    },
    title: {
        fontFamily: Constants.fontFamily,
        fontSize: 26,
        fontWeight: '800',
        marginStart: 20,
    },
})
export default CustomAppBar