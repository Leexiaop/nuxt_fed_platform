const list = require('koa-router')()

list.get('/', async (ctx) => {
    ctx.body = {
        data: ['sssss', 'ssddddadas']
    }
})

module.exports = list