const rp = require("request-promise")

module.exports = (ctx, type, uri) => {
    type = type.toUpperCase()
    let options = {
        uri: uri,
        json: true,
        method: type,
        headers: {
            'Authorization': ctx.header.authorization
        }
    }
    if (type === 'POST' || type === 'PUT') {
        // options.method = type
        options.body = ctx.request.body
    }
    if (type === 'GET') {
        options.qs = ctx.query
    }
    return rp(options)
}
