import axios from "axios";



const client = axios.create({});

client.interceptors.request.use(async (request) => {
    if (request.headers) {
        const jsonToken = await window.sessionStorage.getItem('token')
        const token = JSON.parse(<string>jsonToken)

        request.headers['Authorization'] = token
    }

    return request
})

export default client;
