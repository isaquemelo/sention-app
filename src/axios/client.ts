import axios from "axios";

const jsonToken = await window.sessionStorage.getItem('token')
const token = JSON.parse(<string>jsonToken)

const client = axios.create({
    headers: { 'Authorization': "" + token }
});

export default client;
