import React from 'react'
import {
    View,
    TextInput,
    StyleSheet,
} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Constants from '../../shared/Constants'

const SearchBar=()=>{
  return (
    <View>
        <TextInput style={styles.searchInputBox} placeholder='Search' />
        <FontAwesome name='search' size={26} style={styles.searchIcon} />
    </View>
  )
}
const styles = StyleSheet.create({
    searchInputBox: {
        padding: 14,
        backgroundColor: '#E5EBED',
        borderRadius: Constants.borderRadius,
    },
    searchIcon: {
        position: 'absolute',
        top: 12,
        right: 20,
    },
})

export default SearchBar