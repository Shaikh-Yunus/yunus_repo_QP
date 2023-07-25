import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Pressable,
    TextInput,
    Button,
} from 'react-native'
import CustomAppBar from '../../../components/business/CustomAppBar'
import Constants from '../../../shared/Constants'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'
import WebView from 'react-native-webview'
import { useEffect } from 'react'
import { useRef } from 'react'

const HelpAndSupports = (props) => {
    const navigation = useNavigation()

    const gotoTermsAndConditions = () => {

    }

    const webViewRef = useRef(null);

    useEffect(() => {
        if (webViewRef.current) {
            // Inject the Tawk.to script into the WebView
            webViewRef.current.injectJavaScript(`
      var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
      (function(){
      var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
      s1.async=true;
      s1.src='https://embed.tawk.to/64b933d694cf5d49dc64cca3/1h5pn5077';
      s1.charset='UTF-8';
      s1.setAttribute('crossorigin','*');
      s0.parentNode.insertBefore(s1,s0);
      })();
      `);
        }
    }, []);
    // Function to send a message with user details
    const sendMessageWithDetails = () => {
        if (webViewRef.current) {
            // Replace the following with your desired user details
            const userDetails = {
                name: 'John Doe',
                email: 'john.doe@example.com',
                // Add other user details you want to send
            };

            // Convert the user details object to a JSON string
            const userDetailsJson = JSON.stringify(userDetails);

            // Use injectedJavaScript to pass user details to the Tawk.to widget
            webViewRef.current.injectJavaScript(`
            if (typeof Tawk_API !== 'undefined' && Tawk_API.onChatMaximized) {
              Tawk_API.onChatMaximized();
              Tawk_API.sendMessage('Your message text', ${userDetailsJson});
            }
          `);
        }
    };

    return (
        <View style={styles.wrapper}>
            <CustomAppBar navigation={navigation} isMainscreen={false} isReel={false} title='Help/Support' headerRight={false} />
            {/* <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.helpSupportText}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut .
                    </Text>
                    <Pressable style={styles.termsAndConditions} onPress={gotoTermsAndConditions}>
                        <Text style={styles.btnText}>Terms & Conditions</Text>
                    </Pressable>
                    <Text style={styles.faqs}>FAQs</Text>
                    <View style={styles.faqsContainer}>
                        <Text style={styles.ques}>Q1. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut .</Text>
                        <View style={styles.divider}></View>
                        <Text style={styles.ques}>Q2. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut .</Text>
                    </View>
                </View>
            </ScrollView>
            <View style={styles.inputContainer}>
                <View style={styles.dateContainer}>
                    <Text style={styles.date}>24 October, Sunday</Text>
                </View>
                <View style={styles.hintsQ}>
                    <Text style={styles.hintsQText}>How may I help you?</Text>
                </View>
                <Text style={styles.hintsTime}>10:30 AM</Text>
                <View style={styles.msgContainer}>
                    <View style={{width: '82%'}}>
                        <AntDesign name='paperclip' style={styles.attachment} onPress={()=>alert(0)} />
                        <TextInput placeholder='Message...' style={styles.msgInput} />
                        <Feather name='mic' style={[styles.attachment, {left: '90%'}]} onPress={()=>alert(0)} />
                    </View>
                    <Pressable onPress={()=>{}} style={styles.sendBtn}>
                        <Ionicons name='send-sharp' size={20} color='#FFF' />
                    </Pressable>
                </View>
            </View> */}
            <WebView
                ref={webViewRef}
                source={{ uri: 'https://tawk.to/chat/64b933d694cf5d49dc64cca3/1h5pn5077' }} // Replace with your Tawk.to script URL
                style={styles.webview}
                injectedJavaScriptBeforeContentLoaded={`
          var Tawk_API = Tawk_API || {};
          Tawk_API.onChatMaximized = function () {
            console.log('Chat widget maximized');
          };
        `}
                onMessage={(event) => {
                    // Handle messages from the Tawk.to widget (if needed)
                    console.log('Received message from Tawk.to:', event.nativeEvent.data);
                }}
            />

            {/* <WebView source={{uri:'https://tawk.to/chat/64b933d694cf5d49dc64cca3/1h5pn5077'}} /> */}
        </View >
    )
}

const styles = StyleSheet.create({
    wrapper: {
        minHeight: '100%',
        backgroundColor: Constants.colors.bodyBg,
    },
    container: {
        flex: 1,
        padding: Constants.padding,
    },
    helpSupportText: {
        fontFamily: Constants.fontFamily,
    },
    termsAndConditions: {
        borderWidth: 1,
        padding: 5,
        borderColor: Constants.colors.primaryColor,
        alignItems: 'center',
        marginTop: Constants.margin,
        marginBottom: Constants.margin,
        borderRadius: Constants.borderRadius,
    },
    btnText: {
        fontFamily: Constants.fontFamily,
        color: Constants.colors.primaryColor,
        fontWeight: '700',
    },
    faqs: {
        fontFamily: Constants.fontFamily,
        fontSize: 26,
        fontWeight: '800',
        marginBottom: 15,
    },
    faqsContainer: {
        padding: Constants.padding,
        backgroundColor: Constants.colors.whiteColor,
        borderRadius: Constants.borderRadius,
    },
    ques: {
        fontFamily: Constants.fontFamily,
        marginBottom: Constants.margin,
        fontSize: 14,
    },
    divider: {
        width: '100%',
        height: 1,
        backgroundColor: Constants.colors.primaryColor,
        marginBottom: Constants.margin,
    },
    inputContainer: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        padding: Constants.padding,
        backgroundColor: Constants.colors.bodyBg,
    },
    dateContainer: {
        backgroundColor: '#D9D9D9',
        width: '70%',
        borderRadius: 30,
        alignSelf: 'center',
        marginBottom: 30,
    },
    date: {
        fontFamily: Constants.fontFamily,
        fontSize: 12,
        padding: 6,
        alignSelf: 'center',
    },
    hintsQ: {
        width: '92%',
        alignSelf: 'flex-start',
        backgroundColor: '#D9D9D9',
        padding: Constants.padding,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        borderBottomLeftRadius: 15,
    },
    hintsQText: {
        fontFamily: Constants.fontFamily,
        fontSize: 16,
    },
    hintsTime: {
        alignSelf: 'flex-start',
        fontFamily: Constants.fontFamily,
        fontSize: 11,
        marginTop: 8,
        marginBottom: 20,
    },
    msgContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    msgInput: {
        backgroundColor: '#D9D9D9',
        padding: 12,
        paddingStart: 40,
        paddingEnd: 30,
        borderRadius: Constants.borderRadius,
        width: '100%'
    },
    attachment: {
        color: '#9F9F9F',
        position: 'absolute',
        left: 12,
        top: 12,
        zIndex: 111,
        fontSize: 22,
    },
    sendBtn: {
        width: '16%',
        backgroundColor: Constants.colors.primaryColor,
        borderRadius: Constants.borderRadius,
        alignItems: 'center',
        justifyContent: 'center',
    },
    webview: {
        flex: 1,
    },
})

export default HelpAndSupports