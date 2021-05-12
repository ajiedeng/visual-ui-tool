const send = require('koa-send')
const path = require('path')

const {templatesDir} = require('../models/paths')
//预览前端工程存储路径（相对与模板根目录）
const previewPath = 'preview'

exports.getPreviewUrl = templateId =>{
    return `/preview/${templateId}/index.html`
}
//    /preview/:templateId/
exports.serve = async (ctx, next) => {
    if (ctx.path.startsWith('/preview')) {
        try {
            const [, , templateId, ...rest] = ctx.path.split('/')
            const staticPath = rest.join(path.sep) || '/'
            await send(ctx, staticPath, {
                root: path.resolve(templatesDir, templateId, previewPath),
                index: 'index.html'
            })
        }catch (e) {
            // console.error(e)
            ctx.throw(404);
        }

    } else {
        await next()
    }
}