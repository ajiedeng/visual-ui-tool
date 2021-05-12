const Router = require('@koa/router')
const tempModel = require('../models/templates')

const router = new Router()

router.get('/templates',async (ctx, next) => {
    const templates = await tempModel.getAllTemplates()
    ctx.json(templates)
    // await next()
})


module.exports = router