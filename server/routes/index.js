const router = require('koa-router')()
const sku = require('./sku/index')

router.use('/sku', sku.routes(), sku.allowedMethods())

module.exports = router