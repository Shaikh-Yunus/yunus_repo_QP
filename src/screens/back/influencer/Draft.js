import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import Images from '../../../assets/images/Images';
import CustomAppBar from '../../../components/business/CustomAppBar';
import CustomTabNavigationAdmin from '../../../navigations/CustomTabNavigationAdmin';
import Constants from '../../../shared/Constants';

const Draft = props => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [loader, setLoader] = useState(false);
  const [businessImage, setBusinessImage] = useState([]);
  const [productImages, setproductImages] = useState([]);
  const navigation = useNavigation();

  const UserType = Object.keys(props.route.params.userDetails)[
    Object.keys(props.route.params.userDetails).length - 1
  ];
  const openDrawer = () => {
    setShowDrawer(!showDrawer);
  };
  function isImage(url) {
    return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
  }
 
  const gotoAddPost = async(data) => {
    // console.log('actual data', data);
   
            //   await console.log("video object==>",video,"<==image obj==>",images);
       navigation.navigate('/add-post', {video: data.video[0], category: data.post_type,productData:data,
            userDetails:props?.route?.params?.userDetails,
            images:data.image,
            influencerData:props?.route?.params?.influencerData,
            draft:true
        })
    // navigation.navigate('/add-post', {video: video, category: props?.route?.params?.category,productData:props?.route?.params?.productData,
    //     userDetails:props?.route?.params?.userDetails,
    //     influencerData:props?.route?.params?.influencerData
    // })
  };
  const createPost = () => {
    navigation.navigate('/add-product', {
      userDetails: props?.route?.params?.userDetails,
    });
  };
  const getDraft = async() => {
    await axios
      .get(`${Constants.BASE_URL}influencer/get-all-influencer-post`)
      .then(async (response) => {
        // setLoader(false)

        if (response.data.data.influencerPosts) {
            const tempObject=[]
        await Promise.all(response.data.data.influencerPosts.filter((i)=>i.status=='draft').map(async(data)=>{
            var video=[]
            const images=[]
            await axios
                      .get(`${Constants.BASE_IMAGE_URL}${JSON.parse(data.video)[0]}`, {
                        responseType: 'stream',
                      })
                      .then(async(response) => {
                         video=[{assets:[{
                            "bitrate": 154604, "duration": 1,
                            "fileName": JSON.parse(data.video)[0],
                            "fileSize": response.headers["content-length"], "height": 320, "type": "video/mp4",
                            "uri": `${Constants.BASE_IMAGE_URL}${JSON.parse(data.video)[0]}`,
                            "width": 240
                            }]}]
                      })
                      .catch(err => {
                        console.log('video download error', err);
                      });
                      await Promise.all(JSON.parse(data.image).map(async(item)=>{
                        await axios.get(`${Constants.BASE_IMAGE_URL}${item}`).then((response)=>{
                            images.push({assets:[{
                                    fileName: item,
                                    fileSize: response.headers['content-length'],
                                    height: 177,
                                    type: response.headers['content-type'],
                                    uri: `${Constants.BASE_IMAGE_URL}${item}`,
                                    width: 285,
                            }]});
                        }).catch((error)=>{
                            console.log("image download errror",error);
                        })
                      }))
                      await tempObject.push(
                        {
                          business_id: data.business_id,
                          created_at: data.created_at,
                          description:
                            data.description,
                          id: data.id,
                          image: images,
                          influencer_id: data.influencer_id,
                          influencer_name: data.influencer_name,
                          likes: data.likes,
                          location: data.location,
                          post_type: data.post_type,
                          product_id: data.product_id,
                          share: data.share,
                          status: data.status,
                          tag: data.tag,
                          title: data.title,
                          updated_at: data.updated_at,
                          video: video,
                        },
                      );
        })
      )
      await setproductImages(tempObject);
    //   setproductImages(response.data.data.influencerPosts.filter((i)=>i.status=='draft'))
        setLoader(false)
    }
      
      })
      .catch(error => {
        console.log('get img error', error);
        setBusinessImage([]);
        setproductImages([]);
        setLoader(false);
      });
  };
  useEffect(() => {
    setLoader(true);
    getDraft();
  }, [props?.route?.params]);

  return (
    <View style={{flex: 1}}>
      <CustomAppBar
        title="Draft"
        editable={false}
        isInfluencer={props?.route?.params?.type}
        type={UserType}
        name={
          props?.route?.params?.type
            ? props?.route?.params?.userDetails?.username
            : props?.route?.params?.userDetails?.name
        }
        navigation={navigation}
        isMainscreen={false}
        isReel={false}
        openDrawer={openDrawer}
        userDetails={props?.route?.params?.userDetails}
        showDrawer={showDrawer}
      />
      <View style={styles.container}>
        <ScrollView style={{paddingBottom: 10}}>
          {loader ? (
            <ActivityIndicator />
          ) : //     <View style={styles.profileSection}>
          //        {
          //         productImages.map((item,i)=>{
          //             <View key={i+1}>
          //             <Image source={{uri:item}}
          //             style={styles.profileBgImg} />
          //             </View>
          //             // :
          //             // <Image source={Images.profileOne}
          //             // style={styles.profileBgImg} />
          //         })
          //        }
          //    </View>
          productImages.length > 0 ? (
            <View
              style={[
                styles.profileSection,
                {paddingBottom: props?.route?.params?.type && 100},
              ]}>
              {productImages
                ? productImages.map((img, i) => (
                    <>
                    {console.log("images value",img)}
                      <Pressable
                        onPress={() => gotoAddPost(img)}
                        style={{width: '50%'}}>
                        <Image
                          source={img.image[0].assets[0]}
                          alt="Img"
                          style={styles.profileBgImg}
                        />
                      </Pressable>
                    </>
                  ))
                : null}
            </View>
          ) : (
            <View style={{display: 'flex', alignItems: 'center'}}>
              <Text style={[styles.socialValue, {color: '#000'}]}>
                No draft post found
              </Text>
              {/* {props?.route?.params?.type ? null : (
                <Pressable onPress={createPost}>
                  <Text
                    style={[
                      styles.menuName,
                      {
                        color: 'blue',
                        fontSize: 14,
                        textDecorationLine: 'underline',
                        paddingTop: 10,
                      },
                    ]}>
                    Create Post
                  </Text>
                </Pressable>
              )} */}
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: Constants.padding,
    paddingLeft: 0,
    paddingRight: 0,
    // marginBottom: 130,
  },
  companyDetails: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  companyLogo: {
    padding: Constants.padding + 12,
    backgroundColor: Constants.colors.whiteColor,
    borderRadius: 20,
  },
  companyInfo: {
    marginLeft: Constants.margin,
  },
  email: {
    fontFamily: Constants.fontFamily,
    fontWeight: '700',
    fontSize: 20,
    textTransform: 'capitalize',
  },
  phone: {
    fontFamily: Constants.fontFamily,
    marginTop: 8,
    color: '#A4A4B2',
    fontSize: 20,
    textTransform: 'capitalize',
  },
  moreInfo: {
    fontFamily: Constants.fontFamily,
    color: Constants.colors.primaryColor,
    marginTop: 8,
    fontWeight: '800',
    textDecorationColor: Constants.colors.primaryColor,
    textDecorationStyle: 'solid',
    textDecorationLine: 'underline',
  },
  socialDetails: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // paddingLeft:46
  },
  socialContainer: {
    padding: Constants.padding,
    paddingTop: 0,
    paddingBottom: 12,
    borderRightWidth: 2,
    borderRightColor: '#D9D9D9',
    marginTop: Constants.margin,
    alignItems: 'center',
  },
  socialValue: {
    color: '#007635',
    fontFamily: Constants.fontFamily,
    fontWeight: '700',
    fontSize: 22,
  },
  socialActivity: {
    fontFamily: Constants.fontFamily,
    fontWeight: '700',
    marginTop: 12,
  },
  divider: {
    height: 2,
    width: '65%',
    backgroundColor: '#D9D9D9',
    alignSelf: 'center',
    marginTop: Constants.margin,
    marginBottom: Constants.margin,
  },
  profileSection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingBottom: 200,
  },
  profileBgImg: {
    width: '100%',
    height: 280,
    resizeMode: 'cover',
  },
});

export default Draft;
