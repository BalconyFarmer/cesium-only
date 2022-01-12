const Koa = require('koa')
const app = new Koa()
const KoaStatic = require('koa-static');
const path = require('path')
const cors = require('@koa/cors')

// 注册中间件
const compose = require('koa-compose');
const MD = require('./middlewares/');
app.use(compose(MD));

// 静态资源目录对于相对入口文件index.js的路径
const staticPath = './static'
app.use(KoaStatic(
    path.join(__dirname, staticPath)
))

app.listen(1111, ()=>{
    console.log('server is running at http://localhost:1111')
})
