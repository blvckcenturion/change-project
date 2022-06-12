import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { getToken } from './token'

export const getUserSignedApi = async (id,logout) => { 
    const url = `${BASE_URL}/signed/user/${id}`
    const token = getToken();
    if (!token) {
        logout()
        //Usuario no loggeado
        return null;
    } else {
        try {
            const params = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            const response = await axios.get(url, params)
            return response
        } catch (e) {
            return e
        }
    }   
}

export const postSigned = async (id, logout) => { 
    const url = `${BASE_URL}/signed/${id}`
    const token = getToken();
    if (!token) {
        logout()
        //Usuario no loggeado
        return null;
    }
    else {
        try {
            const params = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            const response = await axios.post(url, null,params)
            return response
        } catch (e) {
            return e
        }
    }
}