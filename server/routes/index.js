const router = require('koa-router')()
const sku = require('./sku/index')
const login = require('./login/index')

router.use('/sku', sku.routes(), sku.allowedMethods())
router.use('/login', login.routes(), login.allowedMethods())

module.exports = router