const router = require('koa-router')()
const rp = require('request-promise')
const company = require('./company')
const sku_add = require('./sku_add')
router.get('/', async (ctx) => {
    let token = ctx.header.authorization
    let obj
    try {
        obj = await rp({
            uri: 'http://fed.qsebao.com/api/auth/insure/list',
            headers: {
                Authorization: token
            },
            json: true
        })
        console.log(obj, '****************')
        ctx.body = {
            data: []
        }
    } catch (error) {
        throw new Error(error)
    }
})


router.use('/company', company.routes(), company.allowedMethods())
router.use('/sku_add', sku_add.routes(), sku_add.allowedMethods())
module.exports = router