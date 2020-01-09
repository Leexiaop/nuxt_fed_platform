const router = require('koa-router')()
const rp = require('request-promise')
const company = require('./company')
const sku_add = require('./sku_add')
router.get('/', async (ctx) => {
    ctx.body = await rp({
        uri: 'http://fed.qsebao.com/api/auth/insure/list',
        json: true,
        headers: {
            'Authorization': ctx.header.authorization
        }
    })
})


router.use('/company', company.routes(), company.allowedMethods())
router.use('/sku_add', sku_add.routes(), sku_add.allowedMethods())
module.exports = router