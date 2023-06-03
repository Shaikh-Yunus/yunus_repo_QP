import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    ImageBackground,
    ActivityIndicator,
    TouchableOpacity,
    TextInput
} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable'
import Images from '../../../assets/images/Images'
import CustomAppBar from '../../../components/explore/CustomAppBar'
import Constants from '../../../shared/Constants'
import globatStyles from '../../../shared/globatStyles'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import axios from 'axios'
import showToastmsg from '../../../shared/showToastmsg'
import { responsiveFontSize } from 'react-native-responsive-dimensions'
import { EventRegister } from 'react-native-event-listeners'
import { emitConfig } from './RenderReeels'
import { log } from 'react-native-reanimated'
import { useEffect } from 'react'
import DatePicker from 'react-native-date-picker'
import moment from 'moment'
import { Dropdown } from 'react-native-element-dropdown';

const ProductDetails = (props) => {
    const navigation = useNavigation()
    // checking props
    const propsCheck = props?.route?.params?.userDetails?.id
    console.log("this is propsCheck=>", propsCheck);
    const [serviceId, setServiceId] = useState(props?.route?.params?.productDetails?.service_id)
    console.log("this is serviceId ProductDetails.js =>", serviceId);

    // const [newFormFields, setNewFormFields] = useState([])
    // console.log("this is new form fields", newFormFields);
    const [serviceForm, setserviceForm] = useState([])
    // console.log("this is service form", serviceForm);
    const [formFields, setFormFields] = useState([]);
    console.log("this is form fields", formFields);
    const [title, setTitle] = useState()
    const [description, setDescription] = useState()
    const [price, setPrice] = useState()
    const [isFocusTwo, setIsFocusTwo] = useState(false);
    const [timeData, setTimeData] = useState([])
    console.log("time data in array=>", timeData);
    const [open, setOpen] = useState(false)
    const [openTwo, setOpenTwo] = useState(false)
    const [date, setDate] = useState(new Date())
    // console.log("this is time=>", date);
    const [dateTwo, setDateTwo] = useState(new Date())
    // console.log("this is Date=>", dateTwo);
    const [isOpen, setIsOpen] = useState([{ label: '', isOpen: false }])

    const [qty, setQty] = useState(1)
    const [color, setColor] = useState('')
    // const [size, setSize] = useState('')
    const [like, setLike] = useState(false)
    const [loader, setLoader] = useState(false)
    const [variationImageSource, setVariationImageSource] = useState(null);
    const [Variation, SetVariation] = useState([])
    console.log("this is variation", Variation);
    const [selectedColor, setSelectedColor] = useState()
    console.log("this is selected color", selectedColor);
    const [selectedSize, setSelectedSize] = useState();
    console.log("this is selectedSize", selectedSize);
    useEffect(() => {

        // set default selection for color
        if (Variation.length > 0 && !selectedColor) {
            setSelectedColor(Variation[0].color);
        }
    }, [Variation, selectedColor]);

    useEffect(() => {
        // set default selection for size
        if (Variation.length > 0 && !selectedSize) {
            setSelectedSize(Variation[0].size);
        }
    }, [Variation, selectedSize]);

    const [Unit, setUnit] = useState()
    const [colorSelected, setColorSelected] = useState(false);
    const handleColorSelection = (color) => {
        setSelectedColor(color);
        setColorSelected(true);
    }
    const handleVariationSelect = (variationId) => {
        const selectedVariation = Variation.find((v) => v.id === variationId);
        if (selectedVariation) {
            setVariationImageSource(selectedVariation.image[0]);
        }
    };
    const decreaseQty = () => {
        if (qty > 1) {
            setQty(qty - 1)
        }
    }
    const increaseQty = () => {
        if (qty < props?.route?.params?.productDetails?.business_product?.qty)
            setQty(qty + 1)
    }
    // const getColor = (color) => {
    //     setColor(color)
    // }
    const getColor = (color) => {
        setSelectedColor(color);
    }
    const getSize = (size) => {
        setSelectedSize(size)
    }
    const gotoBuy = () => {
        if (!selectedColor || selectedColor === '') {
            showToastmsg('Please select color')
        }
        else if (!selectedSize || selectedSize == '') {
            showToastmsg('Please select size')
        }
        else if (!(parseInt(props?.route?.params?.productDetails?.business_product?.qty) >= parseInt(props?.route?.params?.productDetails?.business_product?.warning_qty))) {
            showToastmsg("Out of stock! You cannot buy this product now")
        }
        else {
            console.log("response==>", {
                product_id: props?.route?.params?.productDetails?.product_id,
                explore_id: props?.route?.params?.userDetails?.id,
                "color": selectedColor,
                "size": selectedSize,
                "qty": qty,
                "dis_amount": (parseFloat(props?.route?.params?.productDetails?.business_product?.sales_price) -
                    (parseFloat(props?.route?.params?.productDetails?.business_product?.sales_price) - (parseFloat(props?.route?.params?.productDetails?.business_product?.sales_price) * (parseFloat(props?.route?.params?.productDetails?.business_product?.dicount) / 100)))) * qty,
                "total_amount": (parseFloat(props?.route?.params?.productDetails?.business_product?.sales_price) - (parseFloat(props?.route?.params?.productDetails?.business_product?.sales_price) * (parseFloat(props?.route?.params?.productDetails?.business_product?.dicount) / 100))) * qty
            });
            setLoader(true)
            axios.post(`${Constants.BASE_URL}auth/add-to-cart`, {
                product_id: props?.route?.params?.productDetails?.product_id,
                user_id: props?.route?.params?.userDetails?.id,
                "color": selectedColor,
                "size": selectedSize,
                "qty": qty,
                "dis_amount": (parseFloat(props?.route?.params?.productDetails?.business_product?.sales_price) -
                    (parseFloat(props?.route?.params?.productDetails?.business_product?.sales_price) - (parseFloat(props?.route?.params?.productDetails?.business_product?.sales_price) * (parseFloat(props?.route?.params?.productDetails?.business_product?.dicount) / 100)))) * qty,
                "total_amount": (parseFloat(props?.route?.params?.productDetails?.business_product?.sales_price) - (parseFloat(props?.route?.params?.productDetails?.business_product?.sales_price) * (parseFloat(props?.route?.params?.productDetails?.business_product?.dicount) / 100))) * qty,
            })
                .then((response) => {
                    setLoader(false)
                    EventRegister.emit(emitConfig.API_CALLING, "Api called!")
                    if (response.data.response == 200) {
                        navigation.navigate('/cart', { userDetails: props?.route?.params?.userDetails })
                    }
                })
                .catch((error) => {
                    setLoader(false)
                    console.log("error", error);
                    showToastmsg('Error! Please try again')
                })
        }
        // navigation.navigate('/cart',{productDetails:props?.route?.params?.productDetails})
    }
    const purchaseService = () => {

    }
    // const ProductId = props?.route?.params?.productDetails?.business_product?.id
    // console.log("checking variation", ProductId);
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getVariations()
            getServiceForm()
        });

        return unsubscribe;
    }, []);

    const getVariations = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "product_id": props?.route?.params?.productDetails?.business_product?.id
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`${Constants.BASE_URL}business/GetVariationByID`, requestOptions)
            // await fetch("http://qp.flymingotech.in/quarterpillars_backend/public/api/v1/business/GetVariationByID", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                if (result.Status == 200) {
                    SetVariation(result.Data)
                }
            })
            .catch(error => console.log('error in getting variation of product', error));
    }
    const getServiceForm = () => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(`${Constants.BASE_URL}business/Get/Service/ByID/${serviceId}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                if (result.Status == 200) {
                    setserviceForm(result.Data.form_json)
                    setTitle(result.Data.title)
                    setPrice(result.Data.price)
                    setDescription(result.Data.description)
                    setFormFields(JSON.parse(result.Data.form_json))
                }
            })
            .catch(error => console.log('error in get service by id', error));
    }
    const HandleSumbitMain = () => {
        // var checkingSubmitted = JSON.stringify(formFields)
        // console.log("form submitted", checkingSubmitted);
        var myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "service_id": serviceId,
            "form_json": JSON.stringify(formFields),
            "user_id": props?.route?.params?.userDetails?.id
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`${Constants.BASE_URL}business/Add/ServiceFormData`, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                if (result.Status === 200) {
                    navigation.navigate()
                }
            })
            .catch(error => console.log('error in submiting form', error));
    }
    return (
        <View style={styles.container}>
            <ImageBackground
                source={
                    selectedColor ?
                        { uri: `${Constants.BASE_IMAGE_URL}${JSON.parse(Variation.find(variant => variant.color === selectedColor)?.image)[0]}` } :
                        JSON.parse(props?.route?.params?.productDetails?.image)[0] ?
                            { uri: `${Constants.BASE_IMAGE_URL}${JSON.parse(props?.route?.params?.productDetails?.image)[0]}` } :
                            Images.reelProduct
                }
                style={styles.bgImg}>
                <CustomAppBar navigation={navigation} isMainscreen={false} isReel={true} title={props?.route?.params?.productDetails?.title} headerRight={false} />
                <View style={styles.iconGroup}>
                    {props?.route?.params?.isLiked ?
                        <AntDesign name={'heart'} style={[styles.icon, { color: '#f54295' }]}
                        // onPress={props?.route?.params?.removeLikeFn} 
                        />
                        : null
                    }
                    {!props?.route?.params?.isLiked ?
                        <AntDesign name={'hearto'} style={[styles.icon, { color: '#FFF' }]}
                        // onPress={props?.route?.params?.addLikeFn} 
                        />
                        : null}
                    <Text style={[styles.iconText, { textAlign: "center" }]}>{props?.route?.params?.LikeCount ? props?.route?.params?.LikeCount : 0}</Text>
                    <AntDesign name='message1' style={styles.icon}
                        onPress={props?.route?.params?.gotoComments}
                    />
                    <Text style={[styles.iconText, { textAlign: "center" }]}>{props?.route?.params?.commentCount ? props?.route?.params?.commentCount : 0}</Text>
                    <Feather name='send' style={styles.icon}
                        onPress={props?.route?.params?.onShare}
                    />
                    <Text style={[styles.iconText, { textAlign: "center" }]}>{props?.route?.params?.shareCount ? props?.route?.params?.shareCount : 0}</Text>
                    <Feather name='bookmark' style={styles.icon}
                    // onPress={gotoDescription} 
                    />
                </View>
            </ImageBackground>
            <>
                {serviceId ?
                    <ScrollView style={styles.bottomContainer}>

                        {/* {serviceForm && serviceForm.map((item, index) => (
                            <View key={index}>
                                <Text>{item.title}</Text>
                            </View>
                        ))} */}
                        <View>
                            <Text style={styles.productname}>
                                {title}
                            </Text>
                        </View>
                        <View>
                            <Text style={styles.productname}>
                                {description}
                            </Text>
                        </View>
                        <View>
                            <Text style={styles.productname}>
                                Price: ₹{price}
                            </Text>
                        </View>
                        {
                            formFields.length > [] ?
                                <View style={styles.cardContainer} >
                                    {formFields.map((field, index) => {
                                        if (field.type === '1') {
                                            return (
                                                <View style={{ flexDirection: 'row' }}>
                                                    <View key={index} style={styles.TextInput}>
                                                        <TextInput
                                                            placeholder={`${field.label}`}
                                                            placeholderTextColor="#A9A9A9"
                                                            value={field.label}
                                                            onChangeText={(text) => {
                                                                const newFields = [...formFields];
                                                                newFields[index].label = text;
                                                                setFormFields(newFields);
                                                            }}
                                                        />
                                                    </View>

                                                </View>
                                            );
                                        }
                                        else if (field.type === '2') {
                                            return (
                                                <View style={{ flexDirection: 'row', marginTop: 10 }}>

                                                    <View style={{ flex: 1 }}>
                                                        <Dropdown
                                                            style={[styles.dropdownRender, isFocusTwo && { borderColor: 'blue' }]}
                                                            placeholderStyle={styles.placeholderStyle}
                                                            selectedTextStyle={styles.selectedTextStyle}
                                                            inputSearchStyle={styles.inputSearchStyle}
                                                            iconStyle={styles.iconStyle}
                                                            data={field.options}
                                                            maxHeight={300}
                                                            labelField="option"
                                                            valueField="option"
                                                            // valueField="value"
                                                            placeholder={!isFocusTwo ? field.label : '...'}
                                                            searchPlaceholder="Search..."
                                                            // value={value}
                                                            onFocus={() => setIsFocusTwo(true)}
                                                            onBlur={() => setIsFocusTwo(false)}
                                                            onChange={item => {
                                                                // setValue(item.value);
                                                                // setIsFocus(false);
                                                                console.log(item.option);
                                                                const newFields = [...formFields];
                                                                newFields[index].selectedOption = item.option;
                                                            }}
                                                        />
                                                    </View>

                                                </View>
                                            );
                                        }
                                        else if (field.type === '3') {
                                            return (
                                                <View>
                                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                        <View style={styles.DateAndTime}>
                                                            <TouchableOpacity onPress={() => setOpen(true)}>
                                                                <AntDesign name="clockcircleo" color="black" size={25} />
                                                            </TouchableOpacity>
                                                            <TextInput
                                                                style={{ color: 'black', paddingLeft: 5 }}
                                                                placeholder={field.label}
                                                                placeholderTextColor="grey"
                                                                value={timeData ? moment(timeData).format('hh:mm A') : ''}
                                                                editable={false}
                                                            />
                                                        </View>
                                                    </View>
                                                    {open && (
                                                        <DatePicker
                                                            modal
                                                            open={open}
                                                            date={date}
                                                            mode="time"
                                                            onConfirm={(selectedDate) => {
                                                                setTimeData(selectedDate);
                                                                const newFields = [...formFields];
                                                                newFields[index].timeData = selectedDate;
                                                                setFormFields(newFields);
                                                                setOpen(null);
                                                            }}
                                                            onCancel={() => setOpen(null)}
                                                        />
                                                    )}
                                                </View>
                                            );
                                        }

                                        else if (field.type === '4') {
                                            return (
                                                <View>
                                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>

                                                        <View style={styles.DateAndTime}>
                                                            <TouchableOpacity onPress={() => setOpenTwo(true)}>
                                                                <AntDesign name="calendar" color='black' size={25} />
                                                            </TouchableOpacity>
                                                            <TextInput
                                                                style={{ color: 'black', paddingLeft: 5, }}
                                                                placeholder={field.label}
                                                                placeholderTextColor='grey'
                                                                value={dateTwo ? moment(dateTwo).format('MMMM Do YYYY') : ''}
                                                                editable={false}
                                                            />
                                                        </View>

                                                    </View>

                                                    {openTwo && (
                                                        <DatePicker
                                                            modal
                                                            open={openTwo}
                                                            date={dateTwo}
                                                            mode='date'
                                                            onConfirm={(dateTwo) => {
                                                                setDateTwo(dateTwo);
                                                                const newFields = [...formFields];
                                                                newFields[index].timeData = dateTwo;
                                                                setFormFields(newFields);
                                                                // setTimeData(date)
                                                                setOpenTwo(null);
                                                            }}
                                                            onCancel={() => setOpenTwo(null)}
                                                        />
                                                    )}

                                                </View>
                                            )
                                        }
                                    })}
                                    {formFields.length > [] ?

                                        <TouchableOpacity style={styles.button} onPress={() => HandleSumbitMain()}>
                                            <Text style={globatStyles.btnText}>Submit</Text>
                                        </TouchableOpacity>

                                        :
                                        null
                                    }
                                    <View style={{marginTop:30}}>

                                    </View>
                                </View>
                                :
                                null
                        }
                    </ScrollView>
                    :
                    <ScrollView style={styles.bottomContainer}>
                        <View style={styles.header}>
                            <View style={styles.headerTop}>
                                <Text style={styles.productname}>
                                    {props?.route?.params?.productDetails?.business_product?.product_name}
                                </Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <FontAwesome name='rupee' size={16} style={styles.icons} /><Text style={{ color: '#979797', fontWeight: '700', fontFamily: Constants.fontFamily }}> {props?.route?.params?.productDetails?.business_product?.sales_price}  </Text>
                                        <View style={styles.strikethrough}></View>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <FontAwesome name='rupee' size={16} style={[styles.icons, { color: '#000000' }]} /><Text style={{ fontWeight: '700', fontFamily: Constants.fontFamily }}> {
                                            parseFloat(props?.route?.params?.productDetails?.business_product?.sales_price) - (parseFloat(props?.route?.params?.productDetails?.business_product?.sales_price) * (parseFloat(props?.route?.params?.productDetails?.business_product?.dicount) / 100))
                                        }  </Text>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <FontAwesome name='rupee' size={16} style={[styles.icons, { color: Constants.colors.primaryColor }]} /><Text style={{ fontFamily: Constants.fontFamily, color: Constants.colors.primaryColor }}>
                                            {parseFloat(props?.route?.params?.productDetails?.business_product?.sales_price) -
                                                (parseFloat(props?.route?.params?.productDetails?.business_product?.sales_price) - (parseFloat(props?.route?.params?.productDetails?.business_product?.sales_price) * (parseFloat(props?.route?.params?.productDetails?.business_product?.dicount) / 100)))}
                                            off</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={[styles.headerTop, { marginBottom: 0, }]}>
                                {/* {props?.route?.params?.productDetails?.business_product?.qty} */}
                                <Text style={{ fontFamily: Constants.fontFamily, fontSize: 18, }}>
                                    {selectedColor && (
                                        <Text style={styles.variableValue}>Units {Variation.find(variation => variation.color === selectedColor).qty}</Text>
                                    )}
                                </Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ fontFamily: Constants.fontFamily, fontSize: 18, }}>Availability: </Text>
                                    {parseInt(props?.route?.params?.productDetails?.business_product?.qty) >= parseInt(props?.route?.params?.productDetails?.business_product?.warning_qty) ?
                                        <Text style={{ fontFamily: Constants.fontFamily, fontSize: 18, color: Constants.colors.primaryColor }}>In Stock</Text>
                                        :
                                        <Text style={{ fontFamily: Constants.fontFamily, fontSize: 18, color: "red" }}>Out of Stock</Text>}
                                </View>
                            </View>
                        </View>
                        <View style={globatStyles.divider}></View>
                        <View style={styles.review}>
                            <FontAwesome name='star' style={styles.rattingStar} />
                            <FontAwesome name='star' style={styles.rattingStar} />
                            <FontAwesome name='star' style={styles.rattingStar} />
                            <FontAwesome name='star' style={styles.rattingStar} />
                            <FontAwesome name='star-o' style={[styles.rattingStar, { color: '#999999' }]} />
                            <Pressable onPress={() =>
                                // console.log("pressed review button")
                                navigation.navigate('/explore-review', { prodId: props?.route?.params?.productDetails?.business_product?.id })
                            }>
                                <Text style={styles.reviewText}>Reviews</Text>
                            </Pressable>
                        </View>
                        <View style={styles.buynow}>
                            <View style={[styles.buynowBtn, { marginTop: -16 }]}>
                                <Pressable onPress={gotoBuy} style={[globatStyles.button, { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },]}>

                                    {loader ?
                                        <View style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                            <ActivityIndicator color={Constants.colors.whiteColor} />
                                        </View>
                                        :
                                        <>
                                            <Text style={globatStyles.btnText}>Buy</Text><FontAwesome name='angle-right' size={16} color={Constants.colors.whiteColor} />
                                        </>
                                    }
                                </Pressable>
                            </View>
                            <View style={styles.increaseDecreasebtn}>
                                <Pressable style={styles.increDecreBtn} onPress={decreaseQty}><Text style={{ fontSize: 30, color: Constants.colors.whiteColor }}>-</Text></Pressable>
                                <Text style={styles.qty}>{qty}</Text>
                                <Pressable style={styles.increDecreBtn} onPress={increaseQty}><Text style={{ fontSize: 30, color: Constants.colors.whiteColor }}>+</Text></Pressable>
                            </View>
                        </View>
                        <View style={{ marginTop: 14 }}>
                            <Text style={{ fontFamily: Constants.fontFamily, fontSize: 18 }}>Colors</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                                {Variation.map(variant => (
                                    <Pressable
                                        key={variant.id}
                                        onPress={() => handleColorSelection(variant.color)}
                                        style={[styles.variable, { backgroundColor: selectedColor === variant.color ? '#D1D1D1' : '#FFF' }]}
                                    >
                                        <Text style={styles.variableValue}>{variant.color}</Text>
                                    </Pressable>
                                ))}
                            </View>
                        </View>


                        <View style={{ marginTop: 14 }}>
                            <Text style={{ fontFamily: Constants.fontFamily, fontSize: 18 }}>Size</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                                {Variation.map(variant => (
                                    <Pressable
                                        key={variant.id}
                                        onPress={() => getSize(variant.size)}
                                        style={[styles.variable, { backgroundColor: selectedSize === variant.size ? '#D1D1D1' : '#FFF' }]}
                                    >
                                        <Text style={styles.variableValue}>{variant.size}</Text>
                                    </Pressable>
                                ))}
                            </View>
                        </View>

                        <View style={{ marginTop: 14, marginBottom: 10 }}>
                            <Text style={{ fontFamily: Constants.fontFamily, fontSize: 18, }}>Description</Text>
                            <Text style={styles.productdescription}>
                                {selectedColor && (
                                    <Text style={styles.variableValue}>Units {Variation.find(variation => variation.color === selectedColor).desc}</Text>
                                )}
                                {/* {
                            props?.route?.params?.productDetails?.description
                        } */}
                            </Text>
                        </View>
                    </ScrollView>
                }
            </>
        </View >

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 2,
    },
    iconGroup: {
        position: 'absolute',
        bottom: Constants.padding,
        right: Constants.padding + 20,
        zIndex: 99,
    },
    icon: {
        marginTop: 25,
        fontSize: responsiveFontSize(3.2),
        color: Constants.colors.whiteColor,
    },
    iconText: {
        fontFamily: Constants.fontFamily,
        color: Constants.colors.whiteColor,
        fontSize: 12,
        marginTop: 6,
    },
    bgImg: {
        flex: 1,
        resizeMode: 'cover'
    },
    bottomContainer: {
        flex: 1,
        padding: Constants.padding,
    },
    headerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 18,
    },
    productname: {
        fontFamily: Constants.fontFamily,
        fontWeight: '700',
        fontSize: 15,
        textTransform: 'capitalize',
        color: 'black'
    },
    icons: {
        marginTop: 2,
        color: '#979797',
    },
    strikethrough: {
        width: 44,
        height: 2,
        backgroundColor: '#979797',
        position: 'absolute',
        left: 0,
        top: '35%'
    },
    review: {
        flexDirection: 'row',
    },
    rattingStar: {
        fontSize: 16,
        color: '#E7CC3E',
        marginRight: 6,
    },
    reviewText: {
        fontFamily: Constants.fontFamily,
        fontSize: 16,
        textDecorationLine: 'underline',
        marginTop: -5,
        fontWeight: '500',
    },
    buynow: {
        flex: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buynowBtn: {
        flex: 3,
    },
    increaseDecreasebtn: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1.6,
        marginLeft: 14,
        marginTop: 18,
    },
    increDecreBtn: {
        width: 40,
        height: 40,
        backgroundColor: '#999999',
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    qty: {
        fontFamily: Constants.fontFamily,
        fontSize: 20,
        marginTop: 5,
    },
    variable: {
        padding: 5,
        paddingLeft: Constants.padding,
        paddingRight: Constants.padding,
        borderWidth: 1,
        borderColor: '#999999',
        borderRadius: 4,
    },
    variableValue: {
        fontFamily: Constants.fontFamily,
        fontWeight: '700',
    },
    productdescription: {
        fontFamily: Constants.fontFamily,
        paddingBottom: Constants.padding,
    },
    DropDowncontainer: {
        backgroundColor: 'white',
        // padding: 16,
    },
    input: {
        // borderWidth: 1,
        // borderColor: '#A9A9A9',
        // borderRadius: 5,
        // padding: 10,
        backgroundColor: Constants.colors.inputBgColor,
        padding: 11,
        borderRadius: 5,
        fontFamily: Constants.fontFamily,
        marginBottom: Constants.margin,
        flex: 1
    },
    TextInput: {
        backgroundColor: Constants.colors.inputBgColor,
        padding: 11,
        borderRadius: 5,
        fontFamily: Constants.fontFamily,
        marginBottom: Constants.margin,
        flex: 1,
        marginTop:10,
    },
    DateAndTime: {
        backgroundColor: Constants.colors.inputBgColor,
        padding: 11,
        borderRadius: 5,
        fontFamily: Constants.fontFamily,
        // marginBottom: Constants.margin,
        flex: 1,
        flexDirection: 'row',
    },
    placeholderText: {
        color: 'grey',
    },
    cardContainer: {
        // backgroundColor: '#fff',
        // borderRadius: 10,
        // padding: 20,
        // margin: 10,
        // shadowColor: '#000',
        // shadowOffset: {
        //     width: 0,
        //     height: 2,
        // },
        // shadowOpacity: 0.23,
        // shadowRadius: 2.62,
        // elevation: 4,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'black',
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 20,
        color: 'black',
    },
    button: {
        backgroundColor: Constants.colors.primaryColor,
        padding: 14,
        width: '100%',
        borderRadius: Constants.borderRadius,
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
        color: 'white',
    },
    dropdown: {
        // height: 50,
        // borderColor: 'gray',
        // borderWidth: 0.5,
        // borderRadius: 8,
        // paddingHorizontal: 8,
        // width: '48%',
        backgroundColor: Constants.colors.inputBgColor,
        borderRadius: 5,
        // padding: 10,
        // marginBottom: Constants.margin,
        // flex: 1,
    },
    dropdownRender: {
        backgroundColor: Constants.colors.inputBgColor,
        borderRadius: 5,
        padding: 10,
        marginBottom: Constants.margin,
        // height: 50,
        // borderColor: 'gray',
        // borderWidth: 0.5,
        // borderRadius: 8,
        // paddingHorizontal: 8,
        // flex: 1,
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
        color: 'grey'
    },
    selectedTextStyle: {
        fontSize: 16,
        color: 'black'
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
        color: 'black'

    },
    removeButtonText: {
        fontSize: 20
    }
})


export default ProductDetails