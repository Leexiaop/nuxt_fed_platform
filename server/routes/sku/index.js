const router = require('koa-router')()

const company = require('./company')
const sku_add = require('./sku_add')
const sku_update = require('./sku_update')
const sku_delete = require('./sku_delete')
const request = require('../../api/request')
const uri = require('../../api/uri')

router.get('/', async ctx => {
    ctx.body = await request(ctx, 'GET', uri.sku_list)
})

router.use('/company', company.routes(), company.allowedMethods())
router.use('/sku_add', sku_add.routes(), sku_add.allowedMethods())
router.use('/sku_update', sku_update.routes(), sku_update.allowedMethods())
router.use('/sku_delete', sku_delete.routes(), sku_delete.allowedMethods())

module.exports = router
