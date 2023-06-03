import React from 'react'
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    Image,
} from 'react-native'
import Images from '../../../assets/images/Images'
import CustomAppBar from '../../../components/business/CustomAppBar'
import Constants from '../../../shared/Constants'
import Feather from 'react-native-vector-icons/Feather'

const Settings = (props)=>{
    const gotoEditUser = ()=>{
        props.navigation.navigate('/edit-user-info')
    }
    return (
        <View style={styles.wrapper}>
            <CustomAppBar navigation={props.navigation} isMainscreen={true} isReel={false} title='User Info' />
            <Feather name='edit-2' style={styles.editIcon} size={22} onPress={gotoEditUser} />
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.myPillarText}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut .
                    </Text>
                    <Image source={Images.userInfoLogo} style={styles.logo}/>
                    <View style={styles.userDetailContainer}>
                        <Text style={styles.label}>Name</Text>
                        <Text style={styles.value}>Tanveer Inamdar</Text>
                    </View>
                    <View style={styles.userDetailContainer}>
                        <Text style={styles.label}>Email</Text>
                        <Text style={styles.value}>tanveerinamdar@gmail.com</Text>
                    </View>
                    <View style={styles.userDetailContainer}>
                        <Text style={styles.label}>Phone Number</Text>
                        <Text style={styles.value}>+91 9827336473</Text>
                    </View>
                    <View style={styles.userDetailContainer}>
                        <Text style={styles.label}>Gender</Text>
                        <Text style={styles.value}>Male</Text>
                    </View>
                    <View style={styles.userDetailContainer}>
                        <Text style={styles.label}>Age</Text>
                        <Text style={styles.value}>35 yrs</Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    container: {
        flex: 1,
        padding: Constants.padding,
    },
    myPillarText: {
        fontFamily: Constants.fontFamily,
        fontSize: 14,
    },
    logo: {
        alignSelf: 'center',
        marginTop: Constants.margin,
        marginBottom: Constants.margin+30,
        borderWidth: 2,
    },
    userDetailContainer: {
        flexDirection: 'row',
        marginBottom: Constants.margin-8,
    },
    label: {
        width: '40%',
        color: '#484848',
        fontFamily: Constants.fontFamily,
        fontSize: 18,
    },
    value: {
        fontFamily: Constants.fontFamily,
        fontWeight: '700',
        fontSize: 15,
        color: '#484848',
    },
    editIcon: {
        position: 'absolute',
        right: Constants.padding+10,
        top: 26,
    },
})

export default Settings