import React, { useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
} from 'react-native'
import Images from '../../../assets/images/Images'
import Constants from '../../../shared/Constants'
import { useNavigation } from '@react-navigation/native'

const RenderReelsComment = ({ item }) => {
    const [like, setLike] = useState(false)
    const navigation = useNavigation()
    const gotoToComments = ()=>{

    }
    const gotoCommentDetails = ()=>{

    }
    return (
        <View style={styles.container}>
            <Image style={styles.imgIcons} source={Images.avatar} />
            <View>
                <Text style={{fontFamily: Constants.fontFamily, fontWeight: '700', fontSize: 16,}}>Robert Phan</Text>
                <Text style={{fontFamily: Constants.fontFamily,}}>
                    <Text style={{color: Constants.colors.primaryColor}} onPress={gotoToComments}>@Lorem ipsum</Text> dolor sit amet, consectetur adipiscing elit,...<Text onPress={gotoCommentDetails} style={{color: Constants.colors.primaryColor}}>more</Text>
                </Text> 
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    imgIcons: {
        marginBottom: 12,
        marginRight: 12,
    },
})

export default RenderReelsComment