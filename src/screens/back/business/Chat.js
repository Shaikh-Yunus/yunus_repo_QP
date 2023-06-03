import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Pressable,
    TextInput,
    Image,
} from 'react-native'
import CustomAppBar from '../../../components/business/CustomAppBar'
import Constants from '../../../shared/Constants'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Images from '../../../assets/images/Images'

const Chat = (props)=>{
    const gotoTermsAndConditions = ()=>{

    }
    return (
        <View style={styles.wrapper}>
            <CustomAppBar navigation={props.navigation} isMainscreen={true} isReel={false} title='Help/Support' />
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.helpSupportText}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut .
                    </Text>
                </View>
                <View style={styles.container}>
                    <View style={styles.dateContainer}>
                        <Text style={styles.date}>24 October, Sunday</Text>
                    </View>
                    <View style={styles.clinet}>
                        <Text style={styles.hintsQText}>This is a sample big message with alonger text paragraph</Text>
                    </View>
                    <Text style={styles.clientDate}>10:30 AM</Text>
                    <View style={styles.host}>
                        <Text style={styles.hintsQText}>This is a sample big message with alonger text paragraph</Text>
                    </View>
                    <Text style={[styles.clientDate, {alignSelf: 'flex-end',}]}>10:30 AM</Text>
                    <View style={styles.clinet}>
                        <Image source={Images.chatAudioClient} />
                    </View>
                    <Text style={styles.clientDate}>10:30 AM</Text>
                    <View style={styles.host}>
                        <Image source={Images.chatAudioHost} />
                    </View>
                    <Text style={styles.clientDate}>10:30 AM</Text>
                    <View style={styles.clinet}>
                        <Image source={Images.chatAudioClient} />
                    </View>
                    <Text style={styles.clientDate}>10:30 AM</Text>
                    <View style={styles.host}>
                        <Image source={Images.chatAudioHost} />
                    </View>
                    <Text style={styles.clientDate}>10:30 AM</Text>
                </View>
            </ScrollView>
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
        </View>
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
        paddingBottom: 120,
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
    clinet: {
        width: '90%',
        alignSelf: 'flex-start',
        backgroundColor: '#D9D9D9',
        padding: Constants.padding,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,
        marginBottom: Constants.margin,
    },
    host: {
        width: '90%',
        alignSelf: 'flex-end',
        backgroundColor: '#BFDEC6',
        padding: Constants.padding,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        borderBottomLeftRadius: 15,
        marginBottom: Constants.margin,
    },
    hintsQText: {
        fontFamily: Constants.fontFamily,
        fontSize: 16,
    },
    clientDate: {
        alignSelf: 'flex-start',
        fontFamily: Constants.fontFamily,
        fontSize: 11,
        marginBottom: 20,
    },
    msgContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: Constants.padding,
        paddingLeft: Constants.padding,
        position: 'absolute',
        bottom: '8.38%',
        backgroundColor: Constants.colors.bodyBg,
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
})

export default Chat