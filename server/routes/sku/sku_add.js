const router = require('koa-router')()
const request = require('../../api/request')
const uri = require('../../api/uri')

router.post('/', async (ctx) => {
    ctx.body = await request(ctx, 'POST', uri.sku_add)
})

module.exports = router