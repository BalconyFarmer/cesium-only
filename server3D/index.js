const Koa = require('koa')
const app = new Koa()
const KoaStatic = require('koa-static')
const path = require('path')
const cors = require('@koa/cors')

// 注册中间件
const compose = require('koa-compose')
const MD = require('./middlewares/')
app.use(compose(MD))

// 初始化 静态文件夹 和 文件上传
const {initStaticFile} = require('./middlewares/initStaticFile')
initStaticFile(app)

// 初始化 数据库
const {initSquelize} = require('./model/initSquelize')
let initSequelize = new initSquelize()
module.exports = {initSequelize}

// 注入router
const {router} = require('./router')
app.use(router.routes()).use(router.allowedMethods())

app.listen(8083, () => {
    console.log('server is running at http://localhost:8083')
})
