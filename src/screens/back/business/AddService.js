import { StyleSheet, Text, TouchableOpacity, View, TextInput, Pressable, Button, DatePickerIOSBase, ScrollView, Alert, Image, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import globatStyles from '../../../shared/globatStyles'
import CustomAppBar from '../../../components/business/CustomAppBar'
import { useNavigation } from '@react-navigation/native'
import { Dropdown } from 'react-native-element-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AntDesign from 'react-native-vector-icons/AntDesign'
import DatePicker from 'react-native-date-picker'
import moment from 'moment'
import Constants from '../../../shared/Constants'
import Images from '../../../assets/images/Images'
import Feather from 'react-native-vector-icons/Feather'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import Dialog, { SlideAnimation, DialogContent, DialogTitle } from 'react-native-popup-dialog';
import showToastmsg from '../../../shared/showToastmsg'
import { useEffect } from 'react'

const AddService = (props) => {
    // useEffect
    useEffect(() => {
        CategoryToType()
        getServiceTitle()
    }, [])

    const navigation = useNavigation()
    // loader
    const [buttonLoader, setbuttonLoader] = useState(false)
    // checking props

    const CheckingProps = props?.route?.params?.userDetails?.business?.catorige

    console.log("this is props in AddService", CheckingProps);
    // images
    const [visible, setvisible] = useState(false)
    const [cameraImg, setCameraImg] = useState([])
    console.log("this is camera image", cameraImg);
    const [serviceDescription, setServiceDescription] = useState()
    const [Title, setTitle] = useState('')
    console.log("this is service title after selecting option", Title);
    const [price, setPrice] = useState('')

    // formfields
    const [formFields, setFormFields] = useState([]);
    // const formFieldsString = JSON.stringify(formFields);
    console.log("this is form fields =>", formFields);
    // console.log("this is formFieldsString =>", formFieldsString);
    const [text, setText] = useState('');
    const [type, setType] = useState("");
    // main dropdown
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    const data = [
        { label: 'TextInput', value: '1' },
        { label: 'Dropdown', value: '2' },
        { label: 'Time', value: '3' },
        { label: 'Date', value: '4' },
        // { label: 'Time', value: '4' },
    ];
    // dropdown for form
    const [AddOptions, setAddOptions] = useState([{ option: '' }])
    // console.log("this is options =>", AddOptions);
    const [isFocusTwo, setIsFocusTwo] = useState(false);
    const [valueTwo, setValueTwo] = useState(null)
    const [labelTwo, setLabelTwo] = useState('')
    const [isfocusThree, setIsfocusThree] = useState(false)
    const [valueThree, setValueThree] = useState(null)
    // time picker for form
    const [timeData, setTimeData] = useState([])
    // console.log("time data in array=>", timeData);
    const [open, setOpen] = useState(false)
    const [openTwo, setOpenTwo] = useState(false)
    const [date, setDate] = useState(new Date())
    // console.log("this is time=>", date);
    const [dateTwo, setDateTwo] = useState(new Date())
    // console.log("this is Date=>", dateTwo);
    const [isOpen, setIsOpen] = useState([{ label: '', isOpen: false }])
    // service names
    const [serviceName, setServiceName] = useState([])
    console.log("this is serviceName", serviceName);
    // business category
    const [businessType, setbusinessType] = useState()
    console.log("this is buisness type", businessType);

    const CategoryToType = () => {
        if (props?.route?.params?.userDetails?.business?.catorige == "Travel") {
            setbusinessType(1)
        }
        else if (props?.route?.params?.userDetails?.business?.catorige == "Food") {
            setbusinessType(2)
        }
        else if (props?.route?.params?.userDetails?.business?.catorige == "LifeStyle") {
            setbusinessType(3)
        }
        else if (props?.route?.params?.userDetails?.business?.catorige == "Fashion") {
            setbusinessType(4)
        }
    }

    // images functionality
    const openCamera = async () => {
        try {
            const result = await launchCamera()
            console.log("images", result.assets[0])

            cameraImg.push(result.assets[0])
            setCameraImg([...cameraImg])
        }
        catch (err) {
            console.log("err")
        }
    }

    const choosePhotoFromLibrary = async () => {
        try {
            const result = await launchImageLibrary()
            console.log("folder image", result.assets[0]);
            cameraImg.push(result.assets[0])
            setCameraImg([...cameraImg])
        }
        catch (err) {
            console.log("err")
        }
    }

    const removeImg = (ind) => {
        cameraImg.splice(ind, 1)
        setCameraImg([...cameraImg])
    }
    // form functionality
    const HandleAddMore = () => {
        const newOptions = {
            option: ''
        };
        setAddOptions([...AddOptions, newOptions]);
    }
    const removeAddMoreOption = (index) => {
        const updatedAddMoreOption = [...AddOptions];
        updatedAddMoreOption.splice(index, 1);
        setAddOptions(updatedAddMoreOption);
    };
    const handleAddMoreOptionChange = (index, field, value) => {
        const updatedAddMoreOption = [...AddOptions];
        updatedAddMoreOption[index][field] = value;
        setAddOptions(updatedAddMoreOption);
    };

    const handleButtonPress = () => {
        setFormFields([...formFields, { title: Title, label: text, type: type, options: AddOptions, timeData: timeData }]);
        console.log(formFields);
    }

    const HandleSumbitMain = () => {
        if (Title == '' || Title.length < 0) {
            Alert.alert("Title is mandatory!")
        }
        else if (cameraImg == '' || cameraImg.length < 0) {
            Alert.alert("Service Image is mandatory!")
        }
        else if (text == '' || text.length < 0) {
            Alert.alert("label is mandatory!")
        }
        else if (type == '' || type.length < 0) {
            Alert.alert("Selecting a type is mandatory!")
        }
        else if (serviceDescription == '' || serviceDescription.length < 0) {
            Alert.alert("Description is mandatory!")
        }
        else if (price == '' || price.length < 0) {
            Alert.alert("Price is mandatory!")
        }
        else {
            setbuttonLoader(true)
            var myHeaders = new Headers();
            myHeaders.append("Accept", "application/json");

            var formdata = new FormData();
            formdata.append("business_id", props?.route?.params?.userDetails?.id);
            formdata.append("form_json", JSON.stringify(formFields));
            formdata.append("title", Title);
            formdata.append("description", serviceDescription);
            formdata.append("price", price);
            // formdata.append("Image[]", fileInput.files[0], "/C:/Users/admin/Downloads/walpapers/393244-sunset-sky-night-scenery-digital-art-4k-pc-wallpaper.jpg");
            for (let i = 0; i < cameraImg.length; i++) {
                formdata.append('Image[]', { uri: cameraImg[i].uri, name: cameraImg[i].fileName, type: cameraImg[i].type });
            }
            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow'
            };

            fetch(`${Constants.BASE_URL}business/Add/Service`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    console.log(result)
                    navigation.navigate('/productScreen', { userDetails: props?.route?.params?.userDetails })
                    setbuttonLoader(false)

                })
                .catch(error => {
                    console.log('error adding service', error)
                    setbuttonLoader(false)
                    Alert.alert("error adding service")
                });
        }
    }

    const getServiceTitle = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "type": "3"
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`${Constants.BASE_URL}business/GetServiuceNames`, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                if (result.Status == 200) {
                    setServiceName(result.Data)
                }
            })
            .catch(error => {
                console.log('error in getting service name', error)

            });
    }
    const handleRemoveField = (indexToRemove) => {
        const newFields = formFields.filter((field, index) => index !== indexToRemove);
        setFormFields(newFields);
    };


    return (
        <View style={globatStyles.wrapper}>
            <CustomAppBar navigation={navigation} isMainscreen={false} isReel={false} title='Add Service' />

            <View style={styles.mainContainer}>
                <ScrollView style={{ height: '90%' }}>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap', padding: Constants.padding, }}>

                        {cameraImg.map((item, index) =>
                            <View style={styles.cameraContainer}>
                                <Image source={{ uri: item.uri }} alt='Img' style={{
                                    width: '80%',
                                    height: 100,
                                    resizeMode: 'contain',
                                    margin: 5, marginBottom: 20
                                }} />
                                <Pressable onPress={() => removeImg(index)} style={styles.removeImg}><Text style={styles.removeIcon}>X</Text></Pressable>
                            </View>
                        )}

                    </View>
                    <Dialog
                        visible={visible}
                        onTouchOutside={() => setvisible(!visible)}
                        onHardwareBackPress={() => setvisible(!visible)}
                        dialogTitle={<DialogTitle title="Product Image" />}
                        dialogAnimation={new SlideAnimation({
                            slideFrom: 'bottom',
                        })}
                    >
                        <DialogContent>
                            {
                                cameraImg?.length > 0 ? (
                                    <>


                                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                                            <Pressable style={styles.cameraContainer} onPress={openCamera}>
                                                <Feather name="camera" style={{ fontSize: 20 }} />
                                                <Text style={styles.addCameraText}>Add more</Text>
                                            </Pressable>
                                            <Pressable style={styles.cameraContainer} onPress={choosePhotoFromLibrary}>
                                                <Feather name="folder-plus" style={{ fontSize: 20 }} />
                                                <Text style={styles.addCameraText}>Add more</Text>
                                            </Pressable>
                                        </View>
                                    </>

                                ) : (<View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                                    <Pressable style={styles.cameraContainer} onPress={openCamera}>
                                        <Feather name="camera" style={{ fontSize: 20 }} />
                                        <Text style={styles.addCameraText}>Add</Text>
                                    </Pressable>
                                    <Pressable style={styles.cameraContainer} onPress={choosePhotoFromLibrary}>
                                        <Feather name="folder-plus" />
                                        <Text style={styles.addCameraText}>Add</Text>
                                    </Pressable>
                                </View>
                                )
                            }
                        </DialogContent>
                    </Dialog>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                        <Pressable style={styles.cameraContainer}
                            onPress={() => setvisible(!visible)}
                        >
                            <AntDesign name="upload" size={25} />
                            <Text style={styles.addCameraText}>Add</Text>
                        </Pressable>
                    </View>

                    <Text style={styles.sectionHeading}>Service Name</Text>
                    <Dropdown
                        style={[styles.dropdown, isfocusThree && { borderColor: 'blue' }]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={serviceName}
                        maxHeight={300}
                        labelField="name"
                        valueField="name"
                        placeholder={!isfocusThree ? 'Select Your Service' : '...'}
                        searchPlaceholder="Search..."
                        value={Title}
                        onFocus={() => setIsfocusThree(true)}
                        onBlur={() => setIsfocusThree(false)}
                        onChange={item => {
                            setTitle(item.name);
                            setIsfocusThree(false);
                        }}

                    />
                    {/* <TextInput
                        style={styles.input}
                        placeholder='Enter Service Name'
                        placeholderTextColor="#A9A9A9"
                        value={Title}
                        onChangeText={setTitle}
                    // accessibilityLabel={label}
                    /> */}

                    <Text style={styles.sectionHeading}>Service Description</Text>
                    <TextInput
                        multiline={true}
                        numberOfLines={4}
                        placeholder='Enter Service Description'
                        onChangeText={text => setServiceDescription(text)}
                        style={globatStyles.inputText} />

                    <Text style={styles.sectionHeading}>Service Price</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='₹50'
                        keyboardType='numeric'
                        placeholderTextColor="#A9A9A9"
                        value={price}
                        onChangeText={setPrice}
                    // accessibilityLabel={label}
                    />
                    <Text style={styles.sectionHeading}>Input Details</Text>

                    <View style={styles.cardContainer}>

                        <TextInput
                            style={styles.input}
                            placeholder='label'
                            placeholderTextColor="#A9A9A9"
                            value={text}
                            onChangeText={setText}
                        // accessibilityLabel={label}
                        />

                        {value === '2' ?
                            <>

                                <View style={{ marginTop: 10 }}>
                                    {AddOptions.map((value, index) => (
                                        <View key={index}>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                                                <TextInput
                                                    // keyboardType='numeric'
                                                    style={styles.TextInput}
                                                    placeholder={`options ` + (index + 1)}
                                                    placeholderTextColor="#A9A9A9"
                                                    value={value.option}
                                                    onChangeText={(text) => handleAddMoreOptionChange(index, 'option', text)}
                                                // accessibilityLabel={label}
                                                />
                                                <AntDesign
                                                    name='delete'
                                                    size={25}
                                                    color='red'
                                                    onPress={() => removeAddMoreOption(index)}
                                                />
                                            </View>
                                        </View>
                                    ))}
                                </View>

                                <View style={{ marginTop: 10 }}>
                                    <Pressable onPress={() => HandleAddMore()} style={styles.buttonAddMore}>
                                        <Text style={globatStyles.btnText}>Add More</Text>
                                    </Pressable>
                                </View>
                            </>
                            : null
                        }



                        <View style={styles.DropDowncontainer}>

                            <Dropdown
                                style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                inputSearchStyle={styles.inputSearchStyle}
                                iconStyle={styles.iconStyle}
                                data={data}
                                maxHeight={300}
                                labelField="label"
                                valueField="value"
                                placeholder={!isFocusTwo ? 'Select Options' : '...'}
                                searchPlaceholder="Search..."
                                value={value}
                                onFocus={() => setIsFocus(true)}
                                onBlur={() => setIsFocus(false)}
                                // onChange={item => {
                                //     setValue(item.value);
                                //     setIsFocus(false);
                                // }}
                                onChange={(item) => {
                                    setValue(item.value);
                                    setIsFocus(false);
                                    setType(item.value);
                                }}
                            />
                        </View>
                        <TouchableOpacity style={styles.button} onPress={() => handleButtonPress()}>
                            <Text style={globatStyles.btnText}>Add</Text>
                        </TouchableOpacity>
                        <View style={{ marginTop: 10 }}></View>
                    </View>
                    {/* rendering form */}
                    <Text style={styles.sectionHeading}>Form</Text>

                    {formFields.length > [] ?
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
                                            <View>
                                                <TouchableOpacity style={styles.removeButton} onPress={() => handleRemoveField(index)}>
                                                    <AntDesign
                                                        name='delete'
                                                        size={25}
                                                        color='red'
                                                        onPress={() => handleRemoveField(index)}
                                                    />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    );
                                }
                                // rendering dropdown
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
                                                    }}
                                                />
                                            </View>
                                            <View>
                                                <TouchableOpacity style={styles.removeButton} onPress={() => handleRemoveField(index)}>
                                                    <Text style={styles.removeButtonText}>X</Text>
                                                </TouchableOpacity>
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
                                                        <AntDesign name="clockcircleo" color='black' size={25} />
                                                    </TouchableOpacity>
                                                    <TextInput
                                                        style={{ color: 'black', paddingLeft: 5, }}
                                                        placeholder={field.label}
                                                        placeholderTextColor='grey'
                                                        value={date ? moment(date).format('hh:mm A') : ''}
                                                        editable={false}
                                                    />

                                                </View>
                                                <View>
                                                    <TouchableOpacity style={styles.removeButton} onPress={() => handleRemoveField(index)}>
                                                        <Text style={styles.removeButtonText}>X</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>


                                            {open && (
                                                <DatePicker
                                                    modal
                                                    open={open}
                                                    date={date}
                                                    mode='time'
                                                    onConfirm={(date) => {
                                                        // setDate(date);
                                                        setTimeData(date)
                                                        setOpen(null);
                                                    }}
                                                    onCancel={() => setOpen(null)}
                                                />
                                            )}

                                        </View>
                                    )
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
                                                        value={date ? moment().format('MMMM Do YYYY') : ''}
                                                        editable={false}
                                                    />
                                                </View>
                                                <View>
                                                    <TouchableOpacity style={styles.removeButton} onPress={() => handleRemoveField(index)}>
                                                        <Text style={styles.removeButtonText}>X</Text>
                                                    </TouchableOpacity>
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

                                <TouchableOpacity style={styles.buttonSubmit} onPress={!buttonLoader && HandleSumbitMain}>
                                    {buttonLoader ? <ActivityIndicator size={20} color={Constants.colors.whiteColor} /> : <Text style={globatStyles.btnText}>Sumbit </Text>}
                                </TouchableOpacity>

                                :
                                null
                            }
                            <View style={{ marginTop: 10 }}>

                            </View>
                        </View>
                        :
                        null
                    }

                </ScrollView>
            </View>
        </View >
    )
}

export default AddService

const styles = StyleSheet.create({
    mainContainer: {
        padding: 20,
    },
    sectionHeading: {
        paddingTop: Constants.padding + 8,
        paddingBottom: Constants.padding,
        fontFamily: Constants.fontFamily,
        fontSize: 16,
        fontWeight: '700',
    },
    cameraContainer: {
        marginTop: Constants.margin,
        marginBottom: 12,
        marginRight: 12,
        width: 90,
        height: 90,
        backgroundColor: Constants.colors.inputBgColor,
        borderWidth: 0.7,
        borderColor: '#D2D2D2',
        borderStyle: 'dashed',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Constants.borderRadius,
    },
    cameraImgContainer: {
        marginTop: Constants.margin,
        marginBottom: 12,
        width: 90,
        height: 90,
        backgroundColor: Constants.colors.inputBgColor,
        borderWidth: 0.7,
        borderColor: '#D2D2D2',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Constants.borderRadius,
    },
    removeImg: {
        position: 'absolute',
        left: 80,
        top: 10,
        width: 25,
        height: 25,
        borderRadius: 25,
        backgroundColor: Constants.colors.primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: Constants.colors.whiteColor,
    },
    removeIcon: {
        fontSize: 16,
        color: Constants.colors.inputBgColor,
    },
    addCameraText: {
        marginTop: 10,
        color: '#007635',
        fontWeight: '700'
    },
    DropDowncontainer: {
        backgroundColor: 'white',
        marginTop: 1,
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
        flex: 1
    },
    DateAndTime: {
        backgroundColor: Constants.colors.inputBgColor,
        padding: 11,
        borderRadius: 5,
        fontFamily: Constants.fontFamily,
        marginBottom: Constants.margin,
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
        marginTop: 35,
    },
    buttonAddMore: {
        backgroundColor: Constants.colors.primaryColor,
        padding: 14,
        width: '100%',
        borderRadius: Constants.borderRadius,
        // marginTop: 35,
    },
    buttonSubmit: {
        backgroundColor: Constants.colors.primaryColor,
        padding: 14,
        width: '100%',
        borderRadius: Constants.borderRadius,
        marginBottom: 20,
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
        padding: 10
        // marginBottom: Constants.margin,
        // flex: 1,
    },
    dropdownRender: {
        backgroundColor: Constants.colors.inputBgColor,
        borderRadius: 5,
        padding: Constants.padding
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