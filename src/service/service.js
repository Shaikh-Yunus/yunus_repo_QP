import axios from 'axios'
import Constants from '../shared/Constants'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const apiCall = async ( method, endPoint, params, data,type )=>{
    let token = ''
    try {
        const user = await AsyncStorage.getItem('users')
        if(user!==null){
            token = JSON.parse(user)
        }
    } catch (error) {
        console.log(error)
    }
    const _token 									= token.token
	axios.defaults.headers.common['Authorization']	= `Bearer ${_token}`
	axios.defaults.headers.common['Accept'] 		= 'application/json'
	axios.defaults.headers.common['Content-Type'] 	= 'application/json;charset=UTF-8'
    let url = `${Constants.BASE_URL}${endPoint}`
    
    if(method!=='POST'){
        if(params){
            url+=`/${params}`
        }
    }
    const config = {
		method: method,
        url:    url,
        data:   data,
    }
    return await axios.request(config).then(res=>{
        return res.data
    }).catch(err=>{
        console.log(err)
        return err
    })
}