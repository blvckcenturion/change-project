import axios from 'axios'
import { getToken } from './token'
import { BASE_URL } from '../utils/constants'

export const postPetitionApi = async (data, logout) => { 
    const url = `${BASE_URL}/petition`
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
            const response = await axios.post(url, data, params)
            return response
        } catch (e) {
            return e    
        }
    }
}

export const getAllPetitions = async () => { 
    const url = `${BASE_URL}/petition`
    const response = await axios.get(url)
    return response
}

export const getSinglePetition = async (id) => {
    const url = `${BASE_URL}/petition/${id}`
    const response = await axios.get(url)
    return response
}

