const rp = require("request-promise")

exports.moduls = (ctx, type, url) => {
    type = type.toUpperCase()
    let options = {
        uri: url,
        json: true,
        headers: ctx.header.authorization,
        method: type
    }
    if (type === 'GET') {
        options.qs = ctx.query
    }
    if (type === 'POST') {
        options.body = ctx.request.body
    }
    return rp(options)
}
