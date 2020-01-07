import axios from 'axios'
import { notification } from 'ant-design-vue'
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
        const { code, msg } = response.data
        switch (code ) {
            case 401:
                notification.error({
                    message: msg
                })
                if (window.location.pathname !== '/login') {
                    window.location.href = '/login'
                    break
                }
                return response.data
            default:
                notification.success({
                    message: msg
                })
                return response.data
        }
    },
    error => {
        return Promise.reject(error)
    }
)

export default axios