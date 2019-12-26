const https = require('./https')
const url = require('./urls')

export default {
    sku_list: (params = {}) => {
        return https.default.get(url.default.fe_sku_list, { params: params })
    }
}
