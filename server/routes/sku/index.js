const router = require('koa-router')()
const rp = require('request-promise')
const company = require('./company')

router.get('/', async (ctx) => {
    const { code, data } = await rp({
        uri: 'http://www.service.com/ebao-fed-server/public/insure/list',
        qs: ctx.query,
        json: true
    })
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

router.use('/company', company.routes(), company.allowedMethods())

module.exports = router