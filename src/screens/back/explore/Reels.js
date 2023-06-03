import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    Pressable,
    RefreshControl
} from 'react-native'
import CustomAppBar from '../../../components/explore/CustomAppBar'
import Swiper from 'react-native-swiper'
import { SwiperFlatList } from 'react-native-swiper-flatlist'
import RenderReeels from './RenderReeels'
import { FlashList } from "@shopify/flash-list";
import { ScrollView } from 'react-native-gesture-handler'

const Reels=({navigation,item})=>{
    const [refresh, setrefresh] = useState(false)
    const [videos, setVideos] = useState([]);
    const [currentVideo, setCurrentVideo] = useState(null);

    const travelPosts = [
        {id:1, video: 'http://qp.flymingotech.in/public/videos/videoTravel.mp4'},
        {id:2, video: 'http://qp.flymingotech.in/public/videos/inf.mp4'},
        {id:3, video: 'http://qp.flymingotech.in/public/videos/adv.mp4'},
        {id:4, video: 'http://qp.flymingotech.in/public/videos/business.mp4'}
    ]
    const fashionPosts = [
        {id:5, video: 'http://qp.flymingotech.in/public/videos/food.mp4'},
        {id:6, video: 'http://qp.flymingotech.in/public/videos/inf.mp4'},
        {id:7, video: 'http://qp.flymingotech.in/public/videos/adv.mp4'},
        {id:8, video: 'http://qp.flymingotech.in/public/videos/business.mp4'}
    ]
    const lifestylePosts = [
        {id:9, video: 'http://qp.flymingotech.in/public/videos/videoFashion.mp4'},
        {id:10, video: 'http://qp.flymingotech.in/public/videos/inf.mp4'},
        {id:11, video: 'http://qp.flymingotech.in/public/videos/adv.mp4'},
        {id:12, video: 'http://qp.flymingotech.in/public/videos/business.mp4'},
    ]
    const foodPosts = [
        {id:13, video: 'http://qp.flymingotech.in/public/videos/lifesty.mp4'},
        {id:14, video: 'http://qp.flymingotech.in/public/videos/inf.mp4'},
        {id:15, video: 'http://qp.flymingotech.in/public/videos/adv.mp4'},
        {id:16, video: 'http://qp.flymingotech.in/public/videos/business.mp4'}
    ]
  
    return (
    
        <Swiper style={styles.wrapper} horizontal={false} showsButtons={false} loop={false} dot={<View></View>} activeDot={<View></View>}>
            <View style={styles.reel}>
                <CustomAppBar navigation={navigation} isMainscreen={true} isReel={true} title='Travel' headerRight={true} />
                {comsole.log("id=>if=>",item?.id)}
                <FlashList
                    data={travelPosts}
                    style={styles.category} 
                    renderItem={item=><RenderReeels item={item} />}
                    keyExtractor={item=>item?.id?.toString()} 
                    estimatedItemSize={200}
                    />
                </View>

            <View style={styles.reel}>
                <CustomAppBar navigation={navigation} isMainscreen={true} isReel={true} title='Fashion' headerRight={true} />
                <FlashList
                    data={fashionPosts}
                    style={styles.category}
                    renderItem={item=><RenderReeels item={item} />}
                    keyExtractor={item=>item?.id?.toString()} 
                    estimatedItemSize={200}
                    />
            </View>
            <View style={styles.reel}>
                <CustomAppBar navigation={navigation} isMainscreen={true} isReel={true} title='LifeStyle' headerRight={true} />
                <FlashList
                    data={lifestylePosts}
                    style={styles.category}
                    renderItem={item=><RenderReeels item={item} />}
                    keyExtractor={item=>item?.id?.toString()} 
                    estimatedItemSize={200}
                    />
            </View>
            <View style={styles.reel}>
                <CustomAppBar navigation={navigation} isMainscreen={true} isReel={true} title='Food' headerRight={true} />
                <FlashList
                    data={foodPosts}
                    style={styles.category}
                    renderItem={item=><RenderReeels item={item} />}
                    keyExtractor={item=>item?.id?.toString()}
                    estimatedItemSize={200}
                    />
            </View>
        </Swiper>
        
    )
}

const styles = StyleSheet.create({
    wrapper: {
        
    },
    reel: {
        flex: 1,
    },
    category: {
        position: 'absolute',
        top: 0,
        bottom: 0,
    },
})

export default Reels