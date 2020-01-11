const router = require('koa-router')()
const company = require('./company')
const sku_add = require('./sku_add')
const request = require('../../api/request')
const uri = require('../../api/uri')

router.get('/', async (ctx) => {
    ctx.body = await request(ctx, 'GET', uri.sku_list)
})


router.use('/company', company.routes(), company.allowedMethods())
router.use('/sku_add', sku_add.routes(), sku_add.allowedMethods())

module.exports = router