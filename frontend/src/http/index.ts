import axios from "axios";
import Cookies from "js-cookie";

export const API_URL = 'https://localhost:7025'

const $api = axios.create({
    // withCredentials: true,
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json"
    }
})

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${Cookies.get("_auth")}`
    return config
})

export default $api;