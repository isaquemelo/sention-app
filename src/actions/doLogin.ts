import urls from '../constants/urls'
import axios from 'axios'

type ResponseType = {
    name: string,
    token: string,
}

export default function doLogin(user: string, password: string): Promise<ResponseType> {
    return axios.post(`${urls.SENTION_API_BASE + urls.AUTH_USER}`, {
        email: user, password
    }).then(response => {
        const { name, token } = response.data;
        return { name, token: "Bearer " + token };
    })
}
