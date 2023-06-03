import React, { useRef, useState } from 'react'
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    Pressable,
    FlatList,
    Dimensions,
    Modal,
    TouchableOpacity
} from 'react-native'
import Images from '../../../assets/images/Images'
import CustomAppBar from '../../../components/business/CustomAppBar'
import SearchBar from '../../../components/business/SearchBar'
import Constants from '../../../shared/Constants'
import RenderProducts from './RenderProducts'
import Feather from 'react-native-vector-icons/Feather'
import globatStyles from '../../../shared/globatStyles'
import { useNavigation } from '@react-navigation/native'
import CustomTabNavigationAdmin from '../../../navigations/CustomTabNavigationAdmin'
import Loading from '../../../components/Loading'
import axios from 'axios'
import { useEffect } from 'react'
import showToastmsg from '../../../shared/showToastmsg'
import { responsiveFontSize, responsiveHeight, responsiveScreenHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { FlashList } from '@shopify/flash-list'
import { ServerContainer } from '@react-navigation/native/lib/typescript/src'


const ProductsScreen = (props) => {
    const [tabs, setTabs] = useState('products')
    const [showActionMenu, setShowActionMenu] = useState(false)
    const [userProdcuts, setuserProducts] = useState([])
    console.log("this is userProducts", userProdcuts);
    // console.log("this is userProducts product name ", userProdcuts[0].product_name);
    const navigation = useNavigation()
    const [showDrawer, setShowDrawer] = useState(false)
    const [pageLoader, setpageLoader] = useState(false)
    const [searchText, setsearchText] = useState('')
    console.log("this is search text", searchText);
    // to search the products
    const [filteredProducts, setFilteredProducts] = useState([]);
    console.log('this is filtered prod', filteredProducts);
    const [filteredServices, setFilteredServices] = useState([]);
    console.log("this is filteredServices", filteredServices);
    const [Services, setServices] = useState([])
    console.log("this is services", Services);
    // console.log("this is business id", props.route.params.userDetails.business.business_id);
    // console.log("this is props ", props.route.params);

    const getProductsbyuserid = () => {
        if (props.route.params.userDetails.business.business_id) {
            setpageLoader(true)
            axios.get(`${Constants.BASE_URL}business/get-product-details/${props.route.params.userDetails.business.business_id}`).then((data) => {
                if (data.status == 200) {
                    setpageLoader(false)
                    if (data.data[0].user_product && data.data[0].user_product.length > 0) {
                        setuserProducts(data.data[0].user_product.reverse())
                    }
                    else setuserProducts([])
                }
                else {
                    setpageLoader(false)
                    setuserProducts([])
                    showToastmsg('Error while getting data')
                }
            }).catch((err) => {
                showToastmsg('Error while getting data')
            })
        }
        else {
            showToastmsg('Business id not found')
        }

    }
    const getServicesbyuserid = async () => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        await fetch(`${Constants.BASE_URL}business/Get/Service/${props.route.params.userDetails.business.business_id}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                setServices(result.Data)
            })
            .catch(error => console.log('error', error));
    }
    const openDrawer = () => {
        setShowDrawer(!showDrawer)
    }

    const toggleActionMenu = (option) => {
        navigation.navigate('/add-product', { userDetails: props?.route?.params?.userDetails })
    }
    const toggleServiceMenu = () => {
        navigation.navigate('/add-service', { userDetails: props?.route?.params?.userDetails })
    }

    useEffect(() => {
        getProductsbyuserid()
        getServicesbyuserid()
    }, [props?.route?.params])

    const [selectedOption, setSelectedOption] = useState(null);
    const [isVisible, setIsvisible] = useState(false);
    console.log("this is modal status =>", isVisible);
    const modalRef = useRef(null);

    const handleOptionPress = (option) => {
        setSelectedOption(option);
        setIsvisible(false);
    };
    const handleActionPress = () => {
        // { isVisible == false ? setIsvisible(true) : setIsvisible(false), isVisible == true ? setIsvisible(false) : setIsvisible(true) }
        tabs == "services" ? toggleServiceMenu() : toggleActionMenu()
    }
    const handleModalClose = () => {

        // setIsvisible(false);
        // modalRef.current?.close();
        // console.log("this is close modal button");
        // { isVisible == true ? setIsvisible(false) : setIsvisible(true), isVisible == false ? setIsvisible(true) : setIsvisible(false) }
    };
    return (
        <View style={{ flex: 1, }}>

            <CustomAppBar
                title='Hello!'
                subName={props?.route?.params?.userDetails?.name} navigation={navigation} isMainscreen={false} isReel={false}
            />
            <View style={styles.tabs}>
                <Pressable onPress={() => setTabs('products')}>
                    <Text style={{ ...styles.tabText, color: tabs === 'products' ? Constants.colors.primaryColor : null, fontWeight: tabs === 'products' ? '800' : '400', textDecorationColor: tabs === 'Products' ? Constants.colors.primaryColor : 'transparent' }}>Products</Text>
                    {tabs === 'products' ? <View style={styles.activeTab}></View> : <View style={{ ...styles.activeTab, backgroundColor: 'transparent' }}></View>}
                </Pressable>
                <Pressable onPress={() => setTabs('services')}>
                    <Text style={{ ...styles.tabText, color: tabs === 'services' ? Constants.colors.primaryColor : null, fontWeight: tabs === 'services' ? '800' : '400', textDecorationColor: tabs === 'Services' ? Constants.colors.primaryColor : 'transparent' }}>Services</Text>
                    {tabs === 'services' ? <View style={styles.activeTab}></View> : <View style={{ ...styles.activeTab, backgroundColor: 'transparent' }}></View>}
                </Pressable>

            </View>
            {pageLoader ? <Loading /> :
                <>
                    <ScrollView style={styles.container}>
                        <SearchBar
                            setsearchText={(text) => {
                                if (tabs === 'services') {
                                    const filteredServices = Services.filter((service) =>
                                        service.title.toLowerCase().includes(text.toLowerCase())
                                    );
                                    setFilteredServices(filteredServices);
                                }
                                else if (tabs === 'products') {
                                    const filteredProducts = userProdcuts.filter((product) =>
                                        product.product_name.toLowerCase().includes(text.toLowerCase())
                                    );
                                    setFilteredProducts(filteredProducts);
                                }
                            }}
                            searchText={searchText}
                        />
                        <View style={{ paddingTop: 10 }}>

                            {
                                userProdcuts.length > 0 &&
                                    tabs == 'products'
                                    ? <FlatList
                                        data={filteredProducts.length > 0 ? filteredProducts : userProdcuts}
                                        renderItem={(item) => (
                                            <RenderProducts products={item} userDetails={props?.route?.params?.userDetails} />
                                        )}
                                        keyExtractor={(item) => item?.index}
                                    />
                                    :
                                    // <View style={{ display: 'flex', alignItems: 'center', paddingTop: 10 }}>
                                    //     <Text style={[styles.actionMenuItem, { color: '#000' }]}>
                                    //         No product found
                                    //     </Text>
                                    // </View>
                                    null
                            }

                        </View>
                        <View>
                            {
                                Services.length > 0 && tabs == 'services' ?
                                    <FlashList
                                        // data={Services.length > 0 ? filteredServices : Services}
                                        data={Services}
                                        keyExtractor={(item, index) => index?.toString()}
                                        // numColumns={2}
                                        estimatedItemSize={999}
                                        renderItem={item => (
                                            <View key={item.id} style={styles.cardContainer}>
                                                <Pressable onPress={() => navigation.navigate('/edit-service', { Services: item })} >
                                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                        <Text style={{ color: 'black', fontSize: 'bold', fontSize: 20 }}>{item.item.title}</Text>
                                                    </View>
                                                </Pressable>
                                            </View>
                                        )}
                                    />
                                    :
                                    <View style={{ display: 'flex', alignItems: 'center', paddingTop: 10 }}>
                                        <Text style={[styles.actionMenuItem, { color: '#000' }]}>
                                            No Services found
                                        </Text>
                                    </View>

                            }
                        </View>
                    </ScrollView>


                    <Pressable style={styles.actionBtn} onPress={handleActionPress}>
                        <View style={styles.actionBtnInner}>
                            <Feather name='plus' size={responsiveFontSize(3)} color='#007635' />
                        </View>
                    </Pressable>


                </>}
            {/* {
                showActionMenu?<Pressable onPress={toggleActionMenu} style={globatStyles.overlay}></Pressable>:null
            }
            {
                showActionMenu?<View style={styles.actionMenuContent}>
                        <Pressable onPress={gotoAddProducts}><Text style={styles.actionMenuItem}>Add Products</Text></Pressable>
                        <View style={styles.divider}></View>
                        <Pressable onPress={()=>setTabs('travel')}><Text style={styles.actionSubMenuItem}>Travel</Text></Pressable>
                        <Pressable onPress={()=>setTabs('fashion')}><Text style={styles.actionSubMenuItem}>Fashion</Text></Pressable>
                        <Pressable onPress={()=>setTabs('lifestyle')}><Text style={styles.actionSubMenuItem}>Lifestyle</Text></Pressable>
                        <Pressable onPress={()=>setTabs('food')}><Text style={[styles.actionSubMenuItem, {borderBottomWidth: 0}]}>Food</Text></Pressable>
                    </View>:null
            } */}

            <CustomTabNavigationAdmin navigation={navigation} showDrawer={showDrawer} activeTab='productScreen'
                propValue={props?.route?.params?.userDetails}
            />

        </View >
    )
}
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flexGrow: 0,
        padding: Constants.padding,
        marginBottom: 100,
    },
    tabs: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        // marginTop: Constants.margin + 16,
        // marginBottom: Constants.margin + 16,
    },
    tabText: {
        fontFamily: Constants.fontFamily,
        fontSize: 15,
    },
    activeTab: {
        height: 3,
        width: '100%',
        backgroundColor: Constants.colors.primaryColor,
        marginTop: 6,
    },
    actionBtn: {
        // position: 'absolute',
        // bottom: 0,
        // right: 0,
        // marginBottom: height * 0.07, // 10% of screen height
        // marginRight: width * 0.01, // 5% of screen width
        position: 'absolute',
        bottom: 0,
        right: 0,
        right: responsiveWidth(6),
        borderRadius: 40,
        backgroundColor: '#007635',
        padding: 16,
        elevation: 10,
        zIndex: 999,
        marginBottom: height * 0.14, // 10% of screen height
        marginRight: width * 0.01, // 5% of screen width

    },
    actionBtnTwo: {
        // position: 'absolute',
        // bottom: 0,
        // right: 0,
        // marginBottom: height * 0.07, // 10% of screen height
        // marginRight: width * 0.01, // 5% of screen width
        position: 'absolute',
        bottom: 0,
        right: 0,
        right: responsiveWidth(6),
        borderRadius: 40,
        backgroundColor: '#007635',
        padding: 16,
        elevation: 10,
        zIndex: 999,
        marginBottom: height * 0.14, // 10% of screen height
        marginRight: width * 0.01, // 5% of screen width

    },
    actionBtnInner: {
        backgroundColor: Constants.colors.whiteColor,
        padding: 4,
        borderRadius: 30,
    },
    actionMenuContent: {
        position: 'absolute',
        top: Constants.height - 400,
        right: 65,
        backgroundColor: Constants.colors.whiteColor,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        borderBottomLeftRadius: 12,
    },
    divider: {
        height: 1,
        backgroundColor: '#817D91',
        marginBottom: 10,
    },
    actionMenuItem: {
        padding: 8,
        fontFamily: Constants.fontFamily,
        fontSize: 20,
    },
    actionSubMenuItem: {
        padding: 10,
        fontFamily: Constants.fontFamily,
        marginStart: 12,
        marginRight: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#817D91',
        // top: 475,
        // right: 70,
    },
    modalContainer: {
        position: 'absolute',
        bottom: 130,
        right: 100,
        backgroundColor: '#fff',
        // borderRadius: 10,
        padding: 10,
        paddingLeft: 10,
        zIndex: 999,
        borderTopRightRadius: 12,
        borderTopLeftRadius: 12,
        // borderBottomRightRadius: 12,
        borderBottomLeftRadius: 12,
    },
    optionButton: {
        padding: 10,
        // borderBottomWidth: 1,
        // borderBottomColor: 'grey'
    },
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


export default ProductsScreen