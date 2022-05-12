import axios from "axios";
const token = JSON.parse(<string>window.sessionStorage.getItem('token'))

const client = axios.create({
    headers: { 'Authorization': token }
});

export default client;
