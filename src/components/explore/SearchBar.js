import React, { useRef } from 'react'
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    FlatList,
    Pressable
} from 'react-native'
import axios from 'axios'
import { useState, useEffect } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Constants from '../../shared/Constants'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useNavigation } from '@react-navigation/native'
import RenderSearchUsers from '../../screens/back/explore/RenderSearchUsers';
import RenderSearchPosts from '../../screens/back/explore/RenderSearchPosts';
import { data } from 'jquery';
import { template } from '@babel/core';
import { FlashList } from '@shopify/flash-list';


const SearchBar = () => {
    const [searchdata, setSearchData] = useState('');
    const [search, setSearch] = React.useState('');
    const [oldData, setOldData] = useState([]);
    // console.log("this is old data",oldData);
    // console.log("this is data",data);
    const [filterdata, setFilterData] = useState([]);
    // console.log("this is users",filterdata);
    const [Emptyfilterdata, setEmptyFilterData] = useState([]);

    const [hideData, setHideData] = useState();
    // console.log("this is filterData", filterdata);
    const searchRef = useRef()
    const [Users, setUsersrData] = useState('');
    const [Posts, setPostsData] = useState([]);
    // console.log("this is posts", Posts);
    const [OldPosts, setOldPosts] = useState([])
    const [returnTab, setReturnTab] = useState('Users')
    const [returnTabTwo, setreturnTabTwo] = useState('Posts')
    const navigation = useNavigation()


    // useEffect(() => {
    //     getInfluencerData()
    // }, [ // Users,//  Posts
    // ])
    useEffect(() => {
        // getInfluencerData();
        axios.post(`${Constants.BASE_URL}GetAllInfluencer/Bussines`, {
        }).then((response) => {
            setFilterData(response.data.Influencer)
            setOldData(response.data.Influencer)
            setPostsData(response.data.Bussines)
            setOldPosts(response.data.Bussines)
        }).catch((error) => {
            console.log("error", error);
            showToastmsg("Some Thing Went Wrong")
        })
    }, []);
    const getInfluencerData = () => {

    }
    // else if (text === '') {
    //     return []
    // }
    const onSearch = (text) => {
        if (text == '') {
            setFilterData(oldData)
            setPostsData(OldPosts);
        }
        else {
            let tempListTwo = Posts.filter(item => {
                return item.product_name.toLowerCase().indexOf(text.toLowerCase()) > -1;
            });
            let tempList = filterdata.filter(item => {
                return item.name.toLowerCase().indexOf(text.toLowerCase()) > -1;
            });
            setFilterData(tempList);
            setPostsData(tempListTwo);
        }
    };
    return (
        <View>
            <Pressable style={{ position: "absolute", zIndex: 99999, top: 25 }} onPress={() => navigation.goBack()}><AntDesign name='left' size={30} color={"#000000"}
            // style={props.isReel ? styles.reelBackBtn : styles.backBtn} 
            /></Pressable>
            <TextInput
                ref={searchRef}
                style={styles.searchInputBox}
                placeholder="Search..."
                value={search}
                onChangeText={txt => {
                    setSearch(txt)
                    onSearch(txt)
                }}
            />

            {search ? <Pressable style={styles.closeIcon} onPress={() => {
                searchRef.current.clear()
                setSearch('')
                onSearch('')
            }}>
                <FontAwesome name='close' size={26} />
            </Pressable> :
                <FontAwesome name='search' size={26} style={styles.searchIcon} onPress={() => { setSearch(search); console.log("pressed") }} />}
            <View style={[styles.tabs, { justifyContent: 'flex-start', flexDirection: 'row', marginLeft: "5 %", marginTop: '4 %' }]}>
                <Pressable onPress={() => setReturnTab('Users')}><Text style={[styles.tabTextProduct, { color: returnTab === 'Users' ? Constants.colors.primaryColor : '#000000', textDecorationLine: returnTab === 'Users' ? 'underline' : 'none' }]}>Users</Text></Pressable>
                <Pressable onPress={() => setReturnTab('Posts')}><Text style={[styles.tabTextProduct, { color: returnTab === 'Posts' ? Constants.colors.primaryColor : '#000000', textDecorationLine: returnTab === 'Posts' ? 'underline' : 'none' }]}>Posts</Text></Pressable>
            </View>
            <View style={{ marginBottom: 80, height: '100%' }}>
{/* {console.log("SEE_DATA=>",Posts)} */}
                {/* filterdata.concat(Posts)  */}
                {returnTab === 'Users' ? <FlatList
                    data={filterdata.concat(Posts)}
                    renderItem={item => (
                        returnTab === 'Users' ? <RenderSearchUsers item={item} searchdata={searchdata} setSearchData={setSearchData} />

                            : <RenderSearchPosts item={item} searchdata={searchdata} setSearchData={setSearchData} />

                    )}
                // keyExtractor={item => item?.id}
                // keyExtractor={item => item?.id}

                /> :
                    <FlashList
                        horizontal={false}
                        numColumns={2}
                        estimatedItemSize={50}
                        data={filterdata.concat(Posts)}
                        renderItem={item => (
                            returnTab === 'Users' ? <RenderSearchUsers item={item} searchdata={searchdata} setSearchData={setSearchData} />

                                : <RenderSearchPosts item={item} searchdata={searchdata} setSearchData={setSearchData} />

                        )}
                    // keyExtractor={item => item?.id}
                    // keyExtractor={item => item?.id}
                    />
                }
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    searchInputBox: {
        marginTop: '5%',
        width: '85%',
        marginLeft: "10%",
        padding: 14,
        backgroundColor: '#E5EBED',
        borderRadius: Constants.borderRadius,
    },
    searchIcon: {
        marginHorizontal: "1%",
        marginTop: '5%',
        position: 'absolute',
        top: 12,
        right: 20,
    },
    closeIcon: {
        marginHorizontal: "1%",
        marginTop: '5%',
        position: 'absolute',
        top: 12,
        right: 20,
    },
    tabTextProduct: {
        marginRight: 12,
        fontSize: 18,
        fontFamily: Constants.fontFamily,
        fontWeight: '700'
    },
})

export default SearchBar