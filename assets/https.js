import axios from 'axios'
axios.interceptors.request.use(
    config => {
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

axios.interceptors.response.use(
    response => {
        console.log('res', response)
        return response
    },
    error => {
        return Promise.reject(error)
    }
)

export default axios