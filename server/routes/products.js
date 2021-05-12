const Router = require('@koa/router')
const products = require('../models/products')
const router = new Router()
router.prefix('/products')

router.post('/add', async (ctx, next) => {
    const reqBody = ctx.request.body
    const {templateId, model, name} = reqBody

    if (templateId != null && model != null && name != null) {
        await products.addProduct({templateId: templateId + '', model: model + '', name: name + ''})
        ctx.json('success')
    } else {
        throw '请求参数不完整'
    }
})
const serverStatic = require('../middlewares/staticServe')
router.post('/detail', async ctx => {
    const {templateId, model} = ctx.request.body
    if (templateId != null && model != null) {
        const result = await products.getProductDetail({templateId: templateId + '', model: model + ''})

        //预览界面路径
        const url = new URL(ctx.origin)
        url.pathname = serverStatic.getPreviewUrl(templateId)
        result.previewUrl = url.toString()
        ctx.json(result)
    } else {
        throw '请求参数不完整'
    }
})


router.post('/save', async ctx => {
    const {templateId, model, files} = ctx.request.body
    if (templateId != null && model != null && files) {
        await products.save({templateId, model, files})
        ctx.json('success')
    } else {
        throw '请求参数不完整'
    }

})

const send = require('koa-send')
const moment = require('moment')
router.get('/download', async ctx => {
    const {templateId, model} = ctx.request.query
    await download(ctx, {templateId, model})
}).post('/download', async ctx => {
    const {templateId, model} = ctx.request.body
    await download(ctx, {templateId, model})
})

async function download(ctx, {templateId, model}) {
    if (templateId != null && model != null) {
        const file = await products.download({templateId, model})
        ctx.attachment(`${templateId}-${model}.${moment().format('MMDDHHmmss')}.zip`)
        await send(ctx, file, {root: '/'});
    } else {
        throw '请求参数不完整'
    }
}

module.exports = router