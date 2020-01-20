const router = require('koa-router')()
const request = require('../../api/request')
const uri = require('../../api/uri')

router.delete('/', async ctx => {
    ctx.body = await request(ctx, 'DELETE', `${uri.sku_delete}${ctx.query.id}`)
})

module.exports = router
