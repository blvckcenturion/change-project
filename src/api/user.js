import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import authFetch from '../utils/AuthFetch'
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