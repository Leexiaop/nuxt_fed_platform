const router = require('koa-router')()
const checkLogin = require('./check_login')

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

router.use('/check_login', checkLogin.routes(), checkLogin.allowedMethods())

module.exports = router