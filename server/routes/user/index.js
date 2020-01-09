const router = require('koa-router')()
const rp = require('request-promise')

router.post('/', async (ctx) => {
    ctx.body = await rp({
        method: 'POST',
        uri: 'http://fed.qsebao.com/api/login',
        json: true,
        body: {
            username: ctx.request.body.userName,
            password: ctx.request.body.password
        }
    })
})

module.exports = router