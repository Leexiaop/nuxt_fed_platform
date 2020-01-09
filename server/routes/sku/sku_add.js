// http://www.service.com/ebao-fed-server/public/alter/sku
const router = require('koa-router')()
const rp = require('request-promise')

router.post('/', async (ctx) => {
    ctx.body = {
        data: {
            code: 0,
            data: '添加成功'
        }
    }
})

module.exports = router