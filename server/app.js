const Koa = require('koa')
const bodyparser = require('koa-bodyparser')

const app = new Koa()
app.use(async (ctx,next)=>{
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${new Date() } ${ctx.method} ${ctx.url} - ${ms}ms`)
    // console.log("ctx.request.url:",ctx.request.url)
    // console.log("ctx.request.originalUrl:",ctx.request.originalUrl)
    // console.log("ctx.request.origin:",ctx.request.origin)
    // console.log("ctx.request.href:",ctx.request.href)
    // console.log("ctx.request.path:",ctx.request.path)
    // console.log("ctx.request.host:",ctx.request.host)
    // console.log("ctx.request.hostname:",ctx.request.hostname)
    // console.log("ctx.request.URL:",ctx.request.URL)

})
app.use(require('@koa/cors')());

const serverStatic = require('./middlewares/staticServe')
app.use(serverStatic.serve)

app.use(bodyparser({
    enableTypes:['json', 'form', 'text']
}))
//统一输出接口
app.use(async (ctx,next)=>{
    ctx.json = data=>{
        ctx.type = 'application/json; charset=utf-8';
        let jsonBody
        if(data instanceof Error){
            jsonBody ={
                error: data.message || 'internal:unknown_error'
            }
        }else{
            jsonBody = {
                data:data
            }
        }
        ctx.body = jsonBody
    }
    await next()
})
//错误处理
app.use(async (ctx,next)=>{
    try {
        await next();
    } catch (e) {
        console.log('Process API error...',e);
        if(!(e instanceof Error)){
            e = new Error(e)
        }
        ctx.json(e)
    }
})


const temps = require('./routes/templates')
const products = require('./routes/products')

app
    .use(temps.routes()).use(temps.allowedMethods())
    .use(products.routes()).use(products.allowedMethods())

// app.use(()=>{
//     console.error('last middleware')
// })
// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
});

module.exports = app