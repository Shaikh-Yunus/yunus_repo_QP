import AsyncStorage from '@react-native-async-storage/async-storage'

export const storeData = async ( key, val )=>{
    try {
        const data = JSON.stringify(val)
        await AsyncStorage.setItem(key, data)
    } catch (error) {
        console.log(error)
    }
}

export const getData = async (key)=>{
    try {
        const data = await AsyncStorage.getItem(key)
        return data!==null?JSON.parse(data):null
    } catch (error) {
        console.log(error)
    }
}