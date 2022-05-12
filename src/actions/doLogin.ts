import resources from '../constants/resources'
import axios from 'axios'

type ResponseType = {
    name: string,
    token: string,
    id: string,
}

export default function doLogin(user: string, password: string): Promise<ResponseType> {
    return axios.post(resources.AUTH_USER, {
        email: user, password
    }).then(response => {
        console.log(response.data)

        const { name, token, id } = response.data;
        return { name, token: "Bearer " + token, id };
    })
}
