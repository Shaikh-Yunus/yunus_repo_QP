import 'react-native-gesture-handler'
import React, { useEffect, useState } from 'react'
import {
  Platform,
  StyleSheet,
  PermissionsAndroid,
  Alert
} from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import SplashScreen from 'react-native-splash-screen'
import AuthNavigation from './src/navigations/AuthNavigation'
import DrawerNavigationBusiness from './src/navigations/DrawerNavigationBusiness'
import DrawerNavigationExplore from './src/navigations/DrawerNavigationExploer'
import Constants from './src/shared/Constants'
import { Provider } from 'react-redux'
import store from './src/shared/store'
import messaging from "@react-native-firebase/messaging"
import { requestUserPermission, NotificationListener } from "./src/pushNotificationUtils"
import { InAppNotificationProvider } from 'react-native-in-app-notification';
import PushNotification from 'react-native-push-notification'
import AsyncStorage from '@react-native-async-storage/async-storage'
import pako from 'pako';
import BankDetails from './src/screens/front/BankDetails'


const App = (props) => {
  // console.disableYellowBox = true;
  const [auth, setAuth] = useState('')
  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          },
        );
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  };

  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          },
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        console.log('Write permission err', err);
      }
      return false;
    } else return true;
  };
  const PermissionFunction = async () => {
    await requestCameraPermission()
    await requestExternalWritePermission()
  }
  const getUserDetails = async () => {
    let fcmtoken = AsyncStorage.getItem("userDetails");
    // const userdetails=await AsyncStorage.getItem("userDetails")  
    return fcmtoken
  }
  const renderFunction = () => {
    PermissionFunction()
    requestUserPermission()
    NotificationListener()
    //const unsubscribe = messaging().onMessage(async remoteMessage => {
    //   PushNotification.createChannel(
    //     {
    //       channelId: "specialid", // (required)
    //       channelName: "Special messasge", // (required)
    //       channelDescription: "Notification for special message", // (optional) default: undefined.
    //       importance: 4, // (optional) default: 4. Int value of the Android notification importance
    //       vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
    //     },
    //     (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
    //   );
    // PushNotification.localNotification({
    //     channelId:"specialid",
    //     channelName:"Special messasge",
    //     title:remoteMessage.notification.title,
    //     message:remoteMessage.notification.body
    // })
    //   console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
    // });


    // return unsubscribe;
    SplashScreen.hide()

  }
  useEffect(() => {
    renderFunction()
  }, [])

  const authentication = (type) => {

    setAuth(type)

  }

  const blobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  useEffect(() => {
    // getVideo()
    // downloadAndStoreVideo("http://qp.flymingotech.in/quarterpillars_backend/public/video/262/ff5ab57.mp4")
  }, [])
  return (
    <Provider store={store}>
      <InAppNotificationProvider>
        <NavigationContainer style={styles.container}>
          {/* <BankDetails /> */}

          {auth === 'business' ? <DrawerNavigationBusiness /> :
            auth === 'explore' ? <DrawerNavigationExplore /> :
              <AuthNavigation authentication={(type) => authentication(type)}
              />}
        </NavigationContainer>
      </InAppNotificationProvider>
    </Provider>

  )

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constants.colors.primary
  }
})
export default App