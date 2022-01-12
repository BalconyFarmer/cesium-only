const cors = require('@koa/cors')
const {config} = require('../common/config')
const uniteResponse = require('./uniteResponse') // 统一接口返回数据格式
const jwtInit = require('./jwt')


const CORS = cors({
        // 允许跨域地址(带cookie必须指定地址,不能为*)
        origin: config.corsAdress,
        // 是否允许发送cookie(前端相应设置 axios -> withCredentials: true)
        credentials: true,
        //指定本次预检请求的有效期，单位为秒。
        // maxAge: 15,
        //设置所允许的HTTP请求方法
        // allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        //设置服务器支持的所有头信息字段
        allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
        //设置获取其他自定义字段
        exposeHeaders: ['WWW-Authenticate', 'Server-Authorization']
    }
)

// 注释与否影响 静态资源获取 和 普通接口 跨域
// app.use(async (ctx, next) => {
//     ctx.set('Access-Control-Allow-Origin', '*');
//     ctx.set('Access-Control-Allow-Credentials', 'true');
//     await next();
// });

module.exports = [
    CORS,
    uniteResponse,
    jwtInit
];
