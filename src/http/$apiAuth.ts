import axios from 'axios'
import {BASE_URL} from "../utils/consts";


const $apiAuth = axios.create({
    baseURL: BASE_URL + "api",
    withCredentials: true,
})

export default $apiAuth

