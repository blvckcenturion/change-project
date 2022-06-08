import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import authFetch from '../utils/AuthFetch'
import { getToken } from './token'

export const loginApi = async (data) => {
    const url = `${BASE_URL}/users/login`
    try {
        const response = await axios.post(url, data)
        return response
    } catch(e) {
        return e
    }
}

export const getMeApi = async (logout) => {
    const url = `${BASE_URL}/users/view-profile`
    const response = authFetch(url, null, logout)
    return response
}

export const updateUserApi = async (data, logout) => {
    const url = `${BASE_URL}/users/update-profile`
    const response = await updateUser(url, data, logout)
    return response
}

const updateUser = async (url, data, logout) => { 
    const token = getToken();
    if (!token) {
        //Usuario no loggeado
        logout();
        return null;
    } else {
        try {
            const params = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            const response = await axios.put(url, data, params)
            return response
        } catch (e) {
            return e    
        }
    }
}

export const updateUserPassword = async (data, logout) => {
    const url = `${BASE_URL}/users/update-password`
    const response = await updateUser(url, data, logout)
    return response
}
