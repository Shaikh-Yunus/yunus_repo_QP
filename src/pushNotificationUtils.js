import messaging from "@react-native-firebase/messaging"
import AsyncStorage from "@react-native-async-storage/async-storage"
import PushNotification from "react-native-push-notification";
export async function requestUserPermission(){
    const authStatus=await messaging().requestPermission();
    const enabled=
    authStatus===messaging.AuthorizationStatus.AUTHORIZED||
    authStatus===messaging.AuthorizationStatus.PROVISIONAL;
    if(enabled){
        console.log("Auth status=>",authStatus);
    }
}

async function GetFCMToken(){
let fcmtoken=await AsyncStorage.getItem("fcmtoken");
console.log("fcm token old",fcmtoken);
if(!fcmtoken){
    try {
        const fcmtoken= await messaging().getToken();
        if(fcmtoken){
            console.log("fcm token new",JSON.stringify(fcmtoken));
            await AsyncStorage.setItem("fcmtoken",fcmtoken);
        }
    } catch (error) {
        console.log("error in generating fcmtoken=>",error);
    }
}
}
export async function DisplayNotification(remoteMessage){
    const channelId= await notifee
}
export const NotificationListener=()=>{
    GetFCMToken()
    messaging().onNotificationOpenedApp(remoteMessage=>{
        console.log("Notification caused app to open from background:",remoteMessage.notification);
        
    });
    messaging().getInitialNotification().then(remoteMessage=>{
        if(remoteMessage){
            console.log("Notiifcation caused the app to open from quit state:",remoteMessage.notification);
            
        }
        
    })
    
    messaging().onMessage(async remoteMessage=>{
        console.log("notification on foreground state:",remoteMessage);
        PushNotification.createChannel(
            {
              channelId: "specialid", // (required)
              channelName: "Special messasge", // (required)
              channelDescription: "Notification for special message", // (optional) default: undefined.
              importance: 4, // (optional) default: 4. Int value of the Android notification importance
              vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
            },
            (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
          );
        PushNotification.localNotification({
            channelId:"specialid",
            channelName:"Special message",
            title:remoteMessage.notification.title,
            message:remoteMessage.notification.body
        })
    })
}