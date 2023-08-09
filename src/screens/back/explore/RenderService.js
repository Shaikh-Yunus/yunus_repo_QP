import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Constants from '../../../shared/Constants'
import FastImage from 'react-native-fast-image'
import FontAwesome from 'react-native-vector-icons/FontAwesome'


const RenderService = ({ item }) => {
    const serviceform = JSON.parse(item?.item?.Form_Json)
    return (
        <View style={styles.container}>
            {console.log("itemitem-", item)}
            <FastImage source={JSON.parse(item.item.Images)[0] ? { uri: `${Constants.BASE_IMAGE_URL}${JSON.parse(item.item.Images)[0]}` } : Images.orderImg} style={{
                flex: 1,
                resizeMode: 'cover'
            }} />
            <View style={styles.productDetails}>
                <View style={styles.productFirstRow}>
                    <Text style={styles.servicename}>{(item.item.Name).length > 15 ? (item.item.Name).slice(0, 15) + '...' : (item.item.Name)}</Text>
                </View>
                <View style={[styles.productFirstRow, { justifyContent: 'space-between', marginTop: 10 }]}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={[styles.priceicon, { marginLeft: 5 }]}><FontAwesome name='rupee' /></Text>
                        <Text style={styles.Price}>{(parseFloat(item.item.TotalAmount) + parseFloat(item.item.TotalAmount))}</Text>
                    </View>
                    <Text style={{
                        ...styles.tabText,
                        color: item?.item?.orders_status == "cancelled" ? "red" : 'black',
                        fontWeight: '800',
                        textDecorationColor: item?.item?.orders_status == "cancelled" ? "red" : 'black',
                        textTransform: 'capitalize'
                    }}>{item?.item?.Status}</Text>

                </View>
                <View style={{}}>
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
            </View>
        </View >
    )
}


const styles = StyleSheet.create({
    container: {
        padding: 12,
        backgroundColor: Constants.colors.whiteColor,
        borderRadius: Constants.borderRadius,
        marginTop: 12,
        flexDirection: 'row',
    },
    productDetails: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginLeft: 12,
    },
    productFirstRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    servicename: {
        fontFamily: Constants.fontFamily,
        fontSize: 14,
        fontWeight: '700',
    },
    priceicon: {
        marginLeft: 12,
        marginTop: 5,
        color: '#979797',
    },
    Price: {
        color: '#979797',
    },
    cardField: {
        marginBottom: 10,
    },

})


export default RenderService
