const company = require('koa-router')()
const rp = require('request-promise')
company.get('/', async (ctx) => {
    const { code, data } = await rp({uri: 'http://www.service.com/ebao-fed-server/public/company/list', json: true})
    if (code === 0) {
        ctx.body = {
            data: {
                code: code,
                data: data
            }
        }
    } else {
        ctx.body = {
            code: 1,
            data: '出问题啦，快找开发小哥哥吧。。。'

        }
    }
})

module.exports = company