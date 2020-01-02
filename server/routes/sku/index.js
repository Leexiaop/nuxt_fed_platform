const router = require('koa-router')()
const rp = require('request-promise')
const company = require('./company')
const sku_add = require('./sku_add')

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
router.use('/sku_add', sku_add.routes(), sku_add.allowedMethods())
module.exports = router