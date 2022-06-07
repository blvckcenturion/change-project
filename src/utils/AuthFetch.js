import { getToken, hasExpiredToken } from '../api/token';
import axios from 'axios';

export default async function authFetch(url, params, logout) {
    const token = getToken();
    if (!token) {
        //Usuario no loggeado
        logout();
    } else {
        if (hasExpiredToken(token)) {
            // Token expirado
            logout();
        } else {
            // Token válido
            const paramsTemp = {
                ...params,
                headers: {
                    ...params?.headers,
                    Authorization: `Bearer ${token}`
                }
            }
            try {
                const response = await axios(url, paramsTemp);
                return response;
            } catch (e) {
                return e;
            }
        }
    }
}