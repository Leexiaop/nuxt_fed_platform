const router = require('koa-router')()
const sku = require('./sku/index')
const user = require('./user/index')

router.use('/sku', sku.routes(), sku.allowedMethods())
router.use('/user', user.routes(), user.allowedMethods())

module.exports = router