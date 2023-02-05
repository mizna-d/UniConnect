import axios from 'axios'

const instance = axios.create({
    baseURL: "http://localhost:8080/",
    withCredentials: true
    // headers: {
    //     'Access-Control-Allow-Origin': '*',
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //  }
})

export default instance;