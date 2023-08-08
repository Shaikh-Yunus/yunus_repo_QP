import { Button, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import Constants from '../../../shared/Constants'
import { FlatList } from 'react-native-gesture-handler'
import showToastmsg from '../../../shared/showToastmsg'

const RenderRecentServices = ({ item }) => {
    const [serviceData, setserviceData] = useState()
    const [modalVisible, setModalVisible] = useState(false);

    const getservicedata = (item) => {
        console.log("item?.item?.id", item?.item?.id)
        setModalVisible(true)
        axios.get(`${Constants.BASE_URL}GetServicedashboardDataByServiceID/${item.item.id}`)

            .then((response) => {
                console.log('response-', response)
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
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ backgroundColor: 'white', padding: 20 }}>
                        <FlatList
                            data={serviceData}
                            keyExtractor={item => item.id.toString()}
                            renderItem={item => (
                                <View key={item.id}>
                                    <Pressable>
                                        {console.log("item---",item)}
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Text style={{ color: 'black', fontSize: 'bold', fontSize: 20 }}>{item.item.title}</Text>
                                        </View>
                                    </Pressable>
                                </View>

                            )

                            } />
                        <Button title="Close Modal" onPress={() => setModalVisible(false)} />
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
})
export default RenderRecentServices
