import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    ScrollView,
    FlatList,
    Pressable,
} from 'react-native'
import CustomAppBar from '../../../components/admin/CustomAppBar'
import Constants from '../../../shared/Constants'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import RenderReview from './RenderReview'


const AppRattings = ({ navigation }) => {
    const reviews = [
        { id: 1 },
        { id: 2 },
        { id: 3 },
    ]
    return (
        <View style={styles.container}>
            <StatusBar translucent={true} backgroundColor='transparent' />
            <CustomAppBar navigation={navigation} isMainscreen={false} isReel={false} title='Reviews' headerRight={false} searchbar={false} />
            <ScrollView style={styles.wrapper}>
                <Text style={styles.summaryDesc}>
                    Thank You for taking the time to share your experience.
                </Text>
                <View style={styles.reviewContainer}>
                    <Text style={styles.reviewLabel}>Reviews </Text>
                    <Text style={styles.reviewValue}> 4.1</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                    <FontAwesome name='star' style={styles.reviewStar} />
                    <FontAwesome name='star' style={styles.reviewStar} />
                    <FontAwesome name='star' style={styles.reviewStar} />
                    <FontAwesome name='star' style={styles.reviewStar} />
                    <FontAwesome name='star-o' style={styles.emptyStar} />
                </View>
                <View style={styles.tagsContainer}>
                    <Pressable style={styles.tages}><Text style={styles.tagsText}>Recent</Text></Pressable>
                    <Pressable style={styles.tages}><Text style={styles.tagsText}>Detailed</Text></Pressable>
                    <Pressable style={styles.tages}><Text style={styles.tagsText}>Images</Text></Pressable>
                </View>
                <FlatList
                    data={reviews}
                    renderItem={item => <RenderReview item={item} />}
                    keyExtractor={item => item?.id?.toString()}
                />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    wrapper: {
        padding: Constants.padding,
        paddingBottom: 0,
    },
    summaryDesc: {
        fontFamily: Constants.fontFamily,
    },
    reviewContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 12,
        marginBottom: 12,
    },
    reviewLabel: {
        fontFamily: Constants.fontFamily,
        fontSize: 22,
    },
    reviewValue: {
        fontFamily: Constants.fontFamily,
        fontWeight: '700',
        fontSize: 20,
    },
    reviewStar: {
        color: '#E7CC3E',
        fontSize: 22,
        marginRight: 8,
    },
    emptyStar: {
        color: '#999999',
        fontSize: 22,
        marginRight: 8,
    },
    tagsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 16,
        marginBottom: Constants.padding,
    },
    tages: {
        padding: 6,
        paddingStart: Constants.padding,
        paddingEnd: Constants.padding,
        borderWidth: 1,
        borderColor: '#999999',
        marginRight: 10,
        borderRadius: Constants.borderRadius,
    },
    tagsText: {
        fontFamily: Constants.fontFamily,
        fontWeight: '700',
    },
})

export default AppRattings