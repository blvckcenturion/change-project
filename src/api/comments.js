import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { getToken } from './token'

export const postComment = (id, data,logout) => { 
    const url = `${BASE_URL}/comment/${id}`
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
            const response = axios.post(url, data, params)
            return response
        } catch (e) {
            return e
        }
    }
}