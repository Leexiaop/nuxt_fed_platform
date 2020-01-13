const router = require('koa-router')()
const request = require('../../api/request')
const uri = require('../../api/uri')

router.put('/', async (ctx) => {
    ctx.body = await request(ctx, 'PUT', uri.sku_update)
})

module.exports = router