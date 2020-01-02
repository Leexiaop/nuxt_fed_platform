const https = require('./https')
const url = require('./urls')

export default {
    sku_list: (params = {}) => {
        return https.default.get(url.default.sku_list, { params: params })
    },
    company_list: (params = {}) => {
        return https.default.get(url.default.company_list, { params: params })
    },
    sku_add: (params = {}) => {
        return https.default.post(url.default.sku_add, params)
    },
    login: (params = {}) => {
        return https.default.post(url.default.login, params)
    }
}
