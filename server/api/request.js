const rp = require("request-promise")

module.exports = (ctx, type, uri) => {
    type = type.toUpperCase()
    let options = {
        uri: uri,
        json: true,
        headers: {
            'Authorization': ctx.header.authorization
        }
    }
    if (type === 'POST') {
        options.method = type
        options.body = ctx.request.body
    } else {
        options.qs = ctx.query
    }
    return rp(options)
}
