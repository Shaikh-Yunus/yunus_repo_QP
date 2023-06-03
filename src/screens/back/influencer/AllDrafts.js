import React, { useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Pressable,
    Image,
} from 'react-native'
import Images from '../../../assets/images/Images'
import CustomAppBar from '../../../components/influencer/CustomAppBar'
import Constants from '../../../shared/Constants'
import globatStyles from '../../../shared/globatStyles'

const AllDraft = ({ navigation }) => {
    return (
        <View>
            <CustomAppBar navigation={navigation} isMainscreen={false} isReel={false} title='Drafts (6)' />
            <ScrollView style={styles.container}>
                <Text style={{ padding: Constants.padding }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut .
                </Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', }}>
                    <View style={{ width: '50%', }}>
                        <Image source={Images.profileOne} style={{ width: '100%', height: 260, }} />
                        <View style={styles.draftInfo}>
                            <Text style={{ fontWeight: '700', fontSize: 20, color: Constants.colors.whiteColor, marginBottom: 8, }}>Rose Mark</Text>
                            <Text style={styles.category}>Food</Text>
                        </View>
                        <View style={styles.savedOn}>
                            <Text style={{fontFamily: Constants.fontFamily,alignSelf: 'center', color: Constants.colors.whiteColor,}}>Saved on: 21 Mar’21</Text>
                        </View>
                    </View>
                    <View style={{ width: '50%', }}>
                        <Image source={Images.profileFive} style={{ width: '100%', height: 260, }} />
                        <View style={styles.draftInfo}>
                            <Text style={{ fontWeight: '700', fontSize: 20, color: Constants.colors.whiteColor, marginBottom: 8, }}>Nature</Text>
                            <Text style={styles.category}>Travel</Text>
                        </View>
                        <View style={styles.savedOn}>
                            <Text style={{fontFamily: Constants.fontFamily,alignSelf: 'center', color: Constants.colors.whiteColor,}}>Saved on: 21 Mar’21</Text>
                        </View>
                    </View>
                    <View style={{ width: '50%', }}>
                        <Image source={Images.profileOne} style={{ width: '100%', height: 260, }} />
                        <View style={styles.draftInfo}>
                            <Text style={{ fontWeight: '700', fontSize: 20, color: Constants.colors.whiteColor, marginBottom: 8, }}>Rose Mark</Text>
                            <Text style={styles.category}>Food</Text>
                        </View>
                        <View style={styles.savedOn}>
                            <Text style={{fontFamily: Constants.fontFamily,alignSelf: 'center', color: Constants.colors.whiteColor,}}>Saved on: 21 Mar’21</Text>
                        </View>
                    </View>
                    <View style={{ width: '50%', }}>
                        <Image source={Images.profileFive} style={{ width: '100%', height: 260, }} />
                        <View style={styles.draftInfo}>
                            <Text style={{ fontWeight: '700', fontSize: 20, color: Constants.colors.whiteColor, marginBottom: 8, }}>Nature</Text>
                            <Text style={styles.category}>Travel</Text>
                        </View>
                        <View style={styles.savedOn}>
                            <Text style={{fontFamily: Constants.fontFamily,alignSelf: 'center', color: Constants.colors.whiteColor,}}>Saved on: 21 Mar’21</Text>
                        </View>
                    </View>
                    <View style={{ width: '50%', }}>
                        <Image source={Images.profileOne} style={{ width: '100%', height: 260, }} />
                        <View style={styles.draftInfo}>
                            <Text style={{ fontWeight: '700', fontSize: 20, color: Constants.colors.whiteColor, marginBottom: 8, }}>Rose Mark</Text>
                            <Text style={styles.category}>Food</Text>
                        </View>
                        <View style={styles.savedOn}>
                            <Text style={{fontFamily: Constants.fontFamily,alignSelf: 'center', color: Constants.colors.whiteColor,}}>Saved on: 21 Mar’21</Text>
                        </View>
                    </View>
                    <View style={{ width: '50%', }}>
                        <Image source={Images.profileFive} style={{ width: '100%', height: 260, }} />
                        <View style={styles.draftInfo}>
                            <Text style={{ fontWeight: '700', fontSize: 20, color: Constants.colors.whiteColor, marginBottom: 8, }}>Nature</Text>
                            <Text style={styles.category}>Travel</Text>
                        </View>
                        <View style={styles.savedOn}>
                            <Text style={{fontFamily: Constants.fontFamily,alignSelf: 'center', color: Constants.colors.whiteColor,}}>Saved on: 21 Mar’21</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 110,
    },
    draftInfo: {
        position: 'absolute',
        top: 20,
        left: 20,
    },
    category: {
        fontFamily: Constants.fontFamily,
        padding: 4,
        paddingStart: 12,
        paddingRight: 12,
        backgroundColor: '#BBFFDA',
        borderRadius: 5,
        color: '#04751F',
        fontWeight: '700',
        alignSelf: 'center',
    },
    savedOn: {
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        padding: 4,
        width: '100%',
        position: 'absolute',
        bottom: 20,
    },
})

export default AllDraft