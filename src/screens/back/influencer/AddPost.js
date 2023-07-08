import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  Pressable,
  ScrollView,
  TextInput,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import CustomAppBar from '../../../components/influencer/CustomAppBar';
import { useNavigation } from '@react-navigation/native';
import globatStyles from '../../../shared/globatStyles';
import Constants from '../../../shared/Constants';
// import { launchCamera } from 'react-native-image-picker'
import Images from '../../../assets/images/Images';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import VideoPlayer from 'react-native-video-player';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { RNPhotoEditor } from 'react-native-photo-editor'
import Feather from 'react-native-vector-icons/Feather';
import showToastmsg from '../../../shared/showToastmsg';
import RNFS from "react-native-fs"
const AddPost = props => {
  const navigation = useNavigation();
  const serviceFromOpenCamera = props?.route?.params?.serviceData?.id
  const [type, setType] = useState(serviceFromOpenCamera ? 'service' : 'product');
  const [postImg, setPostImg] = useState([]);
  const [title, setTitle] = useState();
  const [tags, setTags] = useState();
  const [businessTags, setBusinessTags] = useState();
  const [postVideo, setPostVideo] = useState(props.route.params.video);
  const [products, setProducts] = useState(
    props?.route?.params?.userDetails.is_product == 'true' && 'products',
  );
  const [productName, setProductName] = useState()
  const [services, setServicess] = useState(
    props?.route?.params?.userDetails.is_service == 'true' && 'services',
  );
  const [location, setLocation] = useState();
  const [description, setDescription] = useState();
  useEffect(() => {
    // console.log("RNFS=>",RNFS.DocumentDirectoryPath);
    if (props?.route?.params?.draft) {
      if (props?.route?.params?.video)
        setPostVideo(props?.route?.params?.video)
      if (props?.route?.params?.images)
        setPostImg(props?.route?.params?.images)
      if (props?.route?.params?.userDetails?.role_id !== 3 || props?.route?.params?.userDetails?.role_id !== '4, 3') {
        setTitle(props?.route?.params?.productData?.title)
        setBusinessTags(props?.route?.params?.productData?.tag)
        setLocation(props?.route?.params?.productData?.location)
        setDescription(props?.route?.params?.productData?.description)
        console.log("post data=>", props?.route?.params?.productData);
      }

      console.log("influencer==>", props?.route?.params?.userDetails);
    }
  }, [props?.route?.params])
  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          },
        );
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  };

  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          },
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        console.log('Write permission err', err);
      }
      return false;
    } else return true;
  };
  // const editImg = async response => {
  //   try {
  //     console.log("image response==>",response.assets[0]);
  //     RNPhotoEditor.Edit({
  //       path:(response.assets[0].uri).replace("file://",""),
  //       hiddenControls: ["save"],
  //       onDone: (res) => {
  //           console.log('on done');
  //           // self.setState({isRefresh: !this.state.isRefresh, imageHash: Date.now(), state: self.state});
  //       },
  //       onCancel: (res) => {
  //           console.log('on cancel');
  //           Alert.alert('', 'Edit Cancelled !')
  //       }
  //   });
  //     // const result = await PhotoEditor.Edit({path:
  //     //   // RNFS.DocumentDirectoryPath+
  //     //   response.assets[0].uri,
  //     //   onDone: (res) => {
  //     //     console.log('on done');
  //     //     // self.setState({isRefresh: !this.state.isRefresh, imageHash: Date.now(), state: self.state});
  //     // },
  //     // onCancel: (res) => {
  //     //     console.log('on cancel');
  //     //     // Alert.alert('', 'Edit Cancelled !')
  //     // }
  //     // })
  //     // .Edit({path: response.assets[0].uri});

  //     // setCameraImg(result)
  //     console.log("result=>",result);
  //     // setPostImg([
  //     //   ...postImg,
  //     //   {
  //     //     assets: [
  //     //       {
  //     //         fileName: response.assets[0].fileName,
  //     //         fileSize: response.assets[0].fileSize,
  //     //         height: response.assets[0].height,
  //     //         type: response.assets[0].type,
  //     //         uri: result,
  //     //         width: response.assets[0].width,
  //     //       },
  //     //     ],
  //     //   },
  //     // ]);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  const captureImage = async () => {
    let options = {
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      //   videoQuality: 'low',
      //   durationLimit: 30, //Video max duration in seconds
      saveToPhotos: false,
    };
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted && isStoragePermitted) {
      launchCamera(options, response => {
        // console.log('Response = ', response);

        if (response.didCancel) {
          console.log('User cancelled camera picker');
          return;
        } else if (response.errorCode == 'camera_unavailable') {
          console.log('Camera not available on device');
          return;
        } else if (response.errorCode == 'permission') {
          console.log('Permission not satisfied');
          return;
        } else if (response.errorCode == 'others') {
          console.log(response.errorMessage);
          return;
        }
        setPostImg([
          ...postImg,
          {
            assets: [
              {
                fileName: response.assets[0].fileName,
                fileSize: response.assets[0].fileSize,
                height: response.assets[0].height,
                type: response.assets[0].type,
                uri: response.assets[0].uri,
                width: response.assets[0].width,
              },
            ],
          },
        ]);
        // editImg(response);
      });
    }
  };
  const chooseFile = () => {
    let options = {
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };
    launchImageLibrary(options, response => {
      //   console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled camera picker');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        console.log('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        console.log('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        console.log(response.errorMessage);
        return;
      }
      setPostImg([
        ...postImg,
        {
          assets: [
            {
              fileName: response.assets[0].fileName,
              fileSize: response.assets[0].fileSize,
              height: response.assets[0].height,
              type: response.assets[0].type,
              uri: response.assets[0].uri,
              width: response.assets[0].width,
            },
          ],
        },
      ]);
      // editImg(response);
    });
  };
  const removeImg = i => {
    const img = [...postImg];
    img.splice(i, 1);
    setPostImg(img);
  };
  const gotoProductPreview = () => {
    if (props?.route?.params?.userDetails?.role_id == 3 || props?.route?.params?.userDetails?.role_id == '4, 3') {
      if (!title || title == '') {
        showToastmsg('Please enter Ad title');
      } else if (!businessTags || businessTags == '') {
        showToastmsg('Please enter tags');
      } else if (!productName || productName == '') {
        showToastmsg('Please enter Product name');
      } else if (!location || location == '') {
        showToastmsg('Please enter location');
      } else if (!description || description == '') {
        showToastmsg('Please enter description');
      }
      else {
        if (props?.route?.params?.draft) {
          var formdata = new FormData();
          formdata.append('post_id', props?.route?.params?.productData?.id);
          // formdata.append('business_id', props?.route?.params?.productData?.business_id);
          // formdata.append('influencer_id', props?.route?.params?.influencerData?.userDetails?.id);
          formdata.append('post_type', props.route.params.category);
          formdata.append('tag', businessTags);
          formdata.append('title', title);
          for (let i = 0; i < postImg.length; i++) {
            formdata.append('product_image[]', { uri: postImg[i].assets[0].uri, name: postImg[i].assets[0].fileName, type: postImg[i].assets[0].type });
          }
          formdata.append('product_video', { uri: postVideo.assets[0].uri, name: postVideo.assets[0].fileName, type: postVideo.assets[0].type });
          formdata.append('location', location);
          formdata.append('likes', '0');
          formdata.append('share', '0');
          formdata.append(
            'description',
            description
          );
          navigation.navigate('/product-preview', {
            category: props.route.params.category,
            postDetails: {
              title: title,
              postVideo: postVideo,
              postImg: postImg,
              tags: businessTags,
              businessTags: props?.route?.params?.productData?.product_tags,
              type: 'Products',
              description: description,
              location: location,
              productName: props?.route?.params?.productData?.product_name,
            },
            productData: props?.route?.params?.productData,
            influencerData: props?.route?.params?.influencerData,
            formdata: formdata,
            draft: true
          })
        }
        else {
          var formdata = new FormData();
          formdata.append('advertiser_id', props?.route?.params?.userDetails?.id);
          formdata.append('advertise_tag', businessTags);
          formdata.append('advertise_title', title);
          formdata.append('advertise_type', props.route.params.category);
          formdata.append(
            'advertise_description',
            description
          );
          formdata.append("advertise_name", productName)
          // for(let i=0;i<postImg.length;i++ ){    
          //   formdata.append('product_image[]', { uri: postImg[i].assets[0].uri, name: postImg[i].assets[0].fileName, type:postImg[i].assets[0].type });
          // }
          formdata.append('advertise_video[]', { uri: postVideo.assets[0].uri, name: postVideo.assets[0].fileName, type: postVideo.assets[0].type });
          formdata.append('advertise_location', location);

          navigation.navigate('/product-preview', {
            category: props.route.params.category,
            postDetails: {
              title: title,
              postVideo: postVideo,
              tags: businessTags,
              type: 'Products',
              description: description,
              location: location,
              productName: productName
            },
            productData: props?.route?.params?.productData,
            influencerData: props?.route?.params?.influencerData,
            userDetails: props?.route?.params?.userDetails,
            formdata: formdata
          })
        }
        //   axios.post(`${Constants.BASE_URL}nfluencer/influencer-post-product`);
        //   console.log("form data",formdata);
      }
    }
    else {
      if (!title || title == '') {
        showToastmsg('Please enter post title');
      } else if (!businessTags || businessTags == '') {
        showToastmsg('Please enter tags');
      } else if (!postImg || postImg.length <= 0) {
        showToastmsg('Please upload atleast one image');
      } else if (!location || location == '') {
        showToastmsg('Please enter location');
      } else if (!description || description == '') {
        showToastmsg('Please enter description');
      } else {
        if (props?.route?.params?.draft) {
          var formdata = new FormData();
          formdata.append('post_id', props?.route?.params?.productData?.id);
          // formdata.append('business_id', props?.route?.params?.productData?.business_id);
          // formdata.append('influencer_id', props?.route?.params?.influencerData?.userDetails?.id);
          formdata.append('post_type', props.route.params.category);
          formdata.append('tag', businessTags);
          formdata.append('title', title);
          for (let i = 0; i < postImg.length; i++) {
            formdata.append('product_image[]', { uri: postImg[i].assets[0].uri, name: postImg[i].assets[0].fileName, type: postImg[i].assets[0].type });
          }
          formdata.append('product_video', { uri: postVideo.assets[0].uri, name: postVideo.assets[0].fileName, type: postVideo.assets[0].type });
          formdata.append('location', location);
          formdata.append('likes', '0');
          formdata.append('share', '0');
          formdata.append(
            'description',
            description
          );
          navigation.navigate('/product-preview', {
            category: props.route.params.category,
            postDetails: {
              title: title,
              postVideo: postVideo,
              postImg: postImg,
              tags: businessTags,
              businessTags: props?.route?.params?.productData?.product_tags,
              type: 'Products',
              description: description,
              location: location,
              productName: props?.route?.params?.productData?.product_name
            },
            productData: props?.route?.params?.productData,
            influencerData: props?.route?.params?.influencerData,
            formdata: formdata,
            draft: true
          })
        }
        else {
          var formdata = new FormData();
          formdata.append('product_id', type == 'service' ? "" : props?.route?.params?.productData?.id);
          formdata.append('service_id', type == 'product' ? "" : props?.route?.params?.serviceData?.id);
          formdata.append('business_id', props?.route?.params?.userDetails?.business_id);
          formdata.append('influencer_id', props?.route?.params?.influencerData?.userDetails?.id);
          formdata.append('post_type', props.route.params.category);
          formdata.append('tag', businessTags);
          formdata.append('title', title);
          for (let i = 0; i < postImg.length; i++) {
            formdata.append('product_image[]', { uri: postImg[i].assets[0].uri, name: postImg[i].assets[0].fileName, type: postImg[i].assets[0].type });
          }
          formdata.append('product_video', { uri: postVideo.assets[0].uri, name: postVideo.assets[0].fileName, type: postVideo.assets[0].type });
          formdata.append('location', location);
          formdata.append('likes', '0');
          formdata.append('share', '0');
          formdata.append(
            'description',
            description
          );
          navigation.navigate('/product-preview', {
            category: props.route.params.category,
            postDetails: {
              title: title,
              postVideo: postVideo,
              postImg: postImg,
              tags: businessTags,
              businessTags: type == 'service' ? "static service tags" : props?.route?.params?.productData?.product_tags,
              type: 'Products',
              description: description,
              location: location,
              productName: type == 'service' ? "static service name" : props?.route?.params?.productData?.product_name,

            },
            productData: props?.route?.params?.productData,
            influencerData: props?.route?.params?.influencerData,
            formdata: formdata
          })
        }
        //   axios.post(`${Constants.BASE_URL}nfluencer/influencer-post-product`);
        //   console.log("form data",formdata);
      }
    }
  };
  //   console.log('video', postVideo);
  //   console.log('product detrails', props?.route?.params?.productData);
  return (
    <View style={globatStyles.wrapper}>
      {console.log(' props?.route?.params?.productData?', props?.route?.params?.productData)}
      {console.log('props?.route?.params?.userDetails?.role_id', props?.route?.params?.userDetails?.role_id)}
      <StatusBar translucent={true} backgroundColor="transparent" />
      <CustomAppBar
        navigation={navigation}
        isMainscreen={false}
        isReel={false}
        headerRight={false}
        title="Post"
        subtitle={props.route.params.category}
        isCamera={true}
      />
      <ScrollView style={styles.container}>
        {postVideo ? (
          <View style={[styles.imgContainer]}>
            <VideoPlayer
              video={{ uri: postVideo.assets[0].uri }}
              autoplay
              repeat={true}
              resizeMode={'cover'}
              customStyles={{
                wrapper: {
                  width: Constants.width,
                  height: Constants.height,
                  // paddingBottom: Constants.padding,
                },
                video: {
                  width: Constants.width,
                  height: '80%',
                },
                controls: {
                  // display: 'none',
                },
                seekBarBackground: {
                  backgroundColor: 'transparent',
                },
                seekBarProgress: {
                  backgroundColor: 'transparent',
                },
              }}
            />
          </View>
        ) : null}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: -200,
            width: '100%',
            flexWrap: 'wrap',
          }}>
          {postImg
            ? postImg.map((img, i) => (
              <View style={styles.imgContainer} key={i + 1}>
                <Image
                  source={{ uri: img.assets[0].uri }}
                  alt="Img"
                  style={styles.cameraImg}
                />
                <Pressable
                  onPress={() => removeImg(i)}
                  style={styles.removeImg}>
                  <Text>X</Text>
                </Pressable>
              </View>
            ))
            : null}
        </View>
        {props?.route?.params?.userDetails?.role_id !== 3 || props?.route?.params?.userDetails?.role_id !== '4, 3' ? <View style={{ display: 'flex', flexDirection: 'row', width: '50%' }}>
          <Pressable style={styles.addMore} onPress={captureImage}>
            <Image source={Images.cameraIcon} />
            <Text style={styles.btnText}>
              {postImg.length > 0 ? 'Add More' : 'Add Image'}
            </Text>
          </Pressable>
          <Pressable
            style={[styles.addMore, { marginLeft: 5 }]}
            onPress={chooseFile}>
            <Feather
              size={25}
              color={Constants.colors.primaryColor}
              name="folder-plus"
            />
            <Text style={styles.btnText}>
              {postImg.length > 0 ? 'Add More' : 'Add Image'}
            </Text>
          </Pressable>
        </View> : null}
        <TextInput
          style={globatStyles.inputText}
          placeholder="Add Title"
          onChangeText={setTitle}
          value={title}
        />
        {props?.route?.params?.userDetails?.role_id !== 3 || props?.route?.params?.userDetails?.role_id !== '4, 3' ? <View>
          <TextInput
            style={[globatStyles.inputText, { marginBottom: 2 }]}
            placeholder="Tags"
            editable={false}
            value={props?.route?.params?.productData?.product_tags}
          />
          <Text style={styles.hints}>
            *add relevant tags to increase the reach
          </Text>
        </View> : null}
        <TextInput
          style={[globatStyles.inputText, { marginBottom: 2 }]}
          placeholder="Tag Business"
          onChangeText={setBusinessTags}
          value={businessTags}
        />
        <Text style={styles.hints}>*add tags with , seperated</Text>
        {/* <View style={{marginTop: 12, marginBottom: 12, flexDirection: 'row'}}>
          {products === 'products' ? (
            <Fontisto name="radio-btn-active" size={22} />
          ) : (
            <Fontisto name="radio-btn-passive" size={22} />
          )}
          <Text> &nbsp; &nbsp; </Text>
          <Text style={styles.label}>Products</Text>
          <Text> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </Text>
          {services === 'services' ? (
            <Fontisto name="radio-btn-active" size={22} />
          ) : (
            <Fontisto name="radio-btn-passive" size={22} />
          )}
          <Text> &nbsp; &nbsp; </Text>
          <Text style={styles.label}>Services</Text>
        </View> */}
        <TextInput
          style={globatStyles.inputText}
          placeholder="Product Name"
          editable={props?.route?.params?.userDetails?.role_id == 3 || props?.route?.params?.userDetails?.role_id == '4, 3'}
          onChangeText={setProductName}
          value={props?.route?.params?.userDetails?.role_id == 3 || props?.route?.params?.userDetails?.role_id == '4, 3' ? productName : props?.route?.params?.productData?.product_name}
        />
        <View>
          <TextInput
            style={globatStyles.inputText}
            placeholder="Location"
            onChangeText={setLocation}
            value={location}
          />
          <FontAwesome name="map-marker" size={26} style={styles.mapIcon} />
        </View>
        <TextInput
          style={[globatStyles.inputText, { marginBottom: 0 }]}
          placeholder="Description"
          multiline={true}
          height={160}
          onChangeText={setDescription}
          value={description}
        />
        <Text style={styles.hints}>*maximum words 250</Text>
        <View style={{ flexDirection: 'row', paddingBottom: 20, display: 'flex', justifyContent: 'center' }}>
          {/* <Pressable style={[globatStyles.btnOutline, {width: '46%'}]}>
            <Text style={globatStyles.btnOutlineText}>Save as draft</Text>
          </Pressable> */}
          <Pressable
            style={[globatStyles.button, { width: '46%' }]}
            onPress={gotoProductPreview}>
            <Text style={globatStyles.btnText}>PREVIEW</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: Constants.padding,
  },
  imgContainer: {
    width: '45%',
    marginRight: '4%',
    marginTop: 12,
  },
  cameraImg: {
    width: '100%',
    height: 240,
    borderRadius: 20,
  },
  removeImg: {
    position: 'absolute',
    left: '90%',
    top: -10,
    width: 30,
    height: 30,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: Constants.colors.primaryColor,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
  },
  addMore: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 120,
    backgroundColor: '#F5FFFA',
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#D9D9D9',
    borderRadius: 5,
    marginBottom: 16,
  },
  btnText: {
    color: Constants.colors.primaryColor,
    marginTop: 12,
    fontFamily: Constants.fontFamily,
    fontWeight: '700',
  },
  hints: {
    fontFamily: Constants.fontFamily,
    fontSize: 12,
    color: 'rgba(0,0,0,0.3)',
    marginBottom: 12,
  },
  label: {
    fontFamily: Constants.fontFamily,
    fontWeight: '700',
  },
  mapIcon: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
});

export default AddPost;