const router = require('koa-router')()

router.post('/', async (ctx) => {
    ctx.body = {
        data: {
            code: 0,
            data: true
        }
    }
})

module.exports = router