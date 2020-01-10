const router = require('koa-router')()
const rp = require('request-promise')
router.post('/', async (ctx) => {
    ctx.body = await rp({
        uri: 'http://fed.qsebao.com/api/auth/insure/add',
        json: true,
        headers: {
            'Authorization': ctx.header.authorization
        },
        body: ctx.request.body
    })
})

module.exports = router