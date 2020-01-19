const rp = require("request-promise")

module.exports = (ctx, type, uri) => {
    let reg = /(?<=fed_token=).[^;]+/
    type = type.toUpperCase()
    let options = {
        uri: uri,
        json: true,
        method: type
    }
    if (ctx.request.url != '/user') {
        options.headers = {}
        let token = ctx.header.cookie.match(reg)[0]
        options.headers['Authorization'] = `fed_token ${token}`
    }
    if (type === 'POST' || type === 'PUT') {
        options.body = ctx.request.body
    }
    if (type === 'GET') {
        options.qs = ctx.query
    }
    return rp(options)
}
