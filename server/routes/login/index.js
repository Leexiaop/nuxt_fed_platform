const router = require('koa-router')()

router.post('/', async (ctx) => {
    ctx.body = {
        data: {
            code: 0,
            data: {
                userInfo: {
                    name: 'xiaoming'
                }
            }
        }
    }
})

module.exports = router