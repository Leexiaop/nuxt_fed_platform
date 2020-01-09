const company = require('koa-router')()
const rp = require('request-promise')
company.get('/', async (ctx) => {
    ctx.body = await rp({
        uri: 'http://fed.qsebao.com/api/auth/company/list',
        json: true,
        headers: {
            'Authorization': ctx.header.authorization
        }
    })
})

module.exports = company