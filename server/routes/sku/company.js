const company = require('koa-router')()
const rp = require('request-promise')
company.get('/', async (ctx) => {
    let token = ctx.header.authorization
    ctx.body = await rp({
        uri: 'http://fed.qsebao.com/api/auth/company/list',
        headers: {
            Authorization: token
        },
        json: true
    })
})

module.exports = company