const company = require('koa-router')()
const request = require('../../api/request')
const uri = require('../../api/uri')
company.get('/', async ctx => {
    ctx.body = await request(ctx, 'GET', uri.company_list)
})

module.exports = company
