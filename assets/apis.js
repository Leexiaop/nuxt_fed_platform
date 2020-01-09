// import $axios from '~/plugins/axios'
import https from './https'
import url from '~/assets/urls'
export default {
    sku_list: (params = {}) => {
        return https.get(url.sku_list, { params: params })
    },
    company_list: (params = {}) => {
        return https.get(url.company_list, { params: params })
    },
    sku_add: (params = {}) => {
        return https.post(url.sku_add, params)
    },
    login: (params = {}) => {
        return https.post(url.login, params)
    }
}
