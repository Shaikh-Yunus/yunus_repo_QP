import { Button, ImageBackground, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import Constants from '../../../shared/Constants'
import { FlatList } from 'react-native-gesture-handler'
import showToastmsg from '../../../shared/showToastmsg'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FastImage from 'react-native-fast-image'

const RenderRecentServices = ({ item }) => {
    const [serviceData, setserviceData] = useState()
    const [modalVisible, setModalVisible] = useState(false);

    const getservicedata = (item) => {
        console.log("item?.item?.id", item?.item?.id)
        setModalVisible(true)
        axios.get(`${Constants.BASE_URL}GetServicedashboardDataByServiceID/${item.item.id}`)

            .then((response) => {
                console.log('response-', response.data.Data)
                if (response?.data?.Status == 200) {
                    setserviceData(response?.data?.Data)
                    console.log('response==', response?.data?.Data)
                }
            }).catch((err) => {
                console.log("error", err)
                showToastmsg("Something went wrong")
            })
    }
    useEffect(() => {
    }, [])

    return (
        <View key={item.id} style={styles.cardContainer}>
            {console.log('serviceData==', serviceData)}
            <TouchableOpacity onPress={() => getservicedata(item)} >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ color: 'black', fontSize: 'bold', fontSize: 20 }}>{item?.item?.Title}</Text>
                </View>
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={{ flex: 1 }}>
                    <View style={{ backgroundColor: 'white', padding: 20, marginBottom: 50 }}>
                        <View style={{ flexDirection: 'row', marginBottom: 30 }}>
                            <AntDesign onPress={() => setModalVisible(false)} name="arrowleft" size={26} />
                            <Text style={{ fontSize: 20, fontFamily: 'Aviner', fontWeight: 'bold', marginLeft: 30 }}> Service Details </Text>
                        </View>
                        <FlatList
                            data={serviceData}
                            keyExtractor={item => item.id}
                            renderItem={item => {
                                const serviceform = JSON.parse(item.item.Form_Json);
                                const serviceImageArray = JSON.parse(item?.item?.ServiceImage);
                                return (
                                    <View key={item.id} style={styles.cardContainer2}>
                                        <View>
                                            <Text style={{ fontFamily: 'Aviner', fontSize: 18, fontWeight: '600', color: '#333' }}> User Details :  </Text>
                                        </View>
                                        <View>
                                            {console.log("avatarcheck", item?.item?.UserData?.avatar)}
                                            <View style={{ flexDirection: 'row', marginTop: 15 }}>
                                                <View>
                                                    <FastImage resizeMode='cover' source={{ uri: `${Constants.BASE_IMAGE_URL}${item?.item?.UserData?.avatar}` }}
                                                        style={{ borderRadius: 10, height: 70, width: 70 }} />
                                                </View>
                                                <View style={{ marginLeft: 20, marginTop: 15 }}>
                                                    <Text style={{ color: '#808080' }} >{item?.item?.UserData?.name}</Text>
                                                    <Text style={{ color: '#808080' }}>{item?.item?.UserData?.mobile_number} </Text>
                                                    <Text style={{ color: '#808080' }}>{item?.item?.UserData?.email}</Text>
                                                </View>
                                            </View>


                                        </View>
                                        <View style={{
                                            width: '100%',
                                            borderBottomWidth: 1,
                                            borderBottomColor: '#ccc', // Gray color
                                            marginVertical: 10,
                                            marginTop: 15
                                        }}></View>
                                        <View style={{ marginBottom: 10 }}>
                                            <Text style={{ fontFamily: 'Aviner', fontSize: 18, fontWeight: '600', color: '#333' }}> Service Details :  </Text>
                                        </View>
                                        <View>
                                            {serviceImageArray.map((imageUrl, index) => (
                                                <ImageBackground resizeMode='cover' source={{ uri: `${Constants.BASE_IMAGE_URL}${imageUrl}` }}
                                                    style={{ borderRadius: 50, height: 120, width: 110, position:'absolute' , alignSelf:'flex-end' }} />
                                            ))}
                                        </View>
                                        {serviceform.map((field, index) => (
                                            <View key={index} style={styles.cardField}>

                                                <Text>{field.label}</Text>

                                                {field.type === '1' && (
                                                    <View>
                                                        {/* Render type 1 specific data */}
                                                    </View>
                                                )}

                                                {field.type === '2' && (
                                                    <View>
                                                        <Text style={{ color: '#808080' }}>Selected Option: {field.selectedOption}</Text>
                                                    </View>
                                                )}
                                                <View style={{ flexDirection: 'row' }}>
                                                    {field.type === '3' && (
                                                        <View>
                                                            <Text style={{ color: '#808080' }}>{field.timeData}</Text>
                                                        </View>
                                                    )}

                                                    {field.type === '4' && (
                                                        <View style={{ flexDirection: 'row' }}>
                                                            {/* <Text style={{ marginRight: 10 , }}>Time Data:</Text> */}
                                                            <Text style={{ color: '#808080' }}>{field.timeData}</Text>
                                                        </View>
                                                    )}
                                                </View>
                                            </View>
                                        ))}
                                    </View>

                                )
                            }

                            } />


                    </View>
                </View>
            </Modal>
        </View>
    )
}


const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        margin: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    cardContainer2: {
        backgroundColor: 'white',
        borderRadius: 8,
        marginBottom: 20,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    cardField: {
        marginBottom: 10,
    },
    cardLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
})
export default RenderRecentServices
