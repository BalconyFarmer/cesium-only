/**
 * Created by ux34 on 21/6/4
 * 统一接口返回数据格式
 * @param option 默认配置
 * @param option.type 返回的格式
 * @param option.successCode 请求成功返回的状态码
 * @param option.successMsg 请求成功返回的消息
 * @param option.failCode 请求失败返回的状态码
 * @param option.failMsg 请求失败返回的消息
 * @returns {function} koa中间件
    // ctx.success( {id: '123'}, '创建成功', 201 )
    // ctx.fail( '创建失败，权限不足', 405 )
 */
const uniteResponse = async (ctx, next) => {
    // console.log(ctx, 'ctx=======ctx')

    ctx.success = function (data, msg, code) {

        ctx.status = code || 200;
        ctx.type = 'json';
        ctx.body = {
            code: code || 200,
            msg: msg || 'success',
            data: data
        }
    }

    ctx.fail = function (msg, code) {
        console.log(msg);
        ctx.status = code || 400;
        ctx.type = 'json';
        ctx.body = {
            code: code || 400,
            msg: msg || 'fail',
        }
    }

    await next()
}


module.exports = uniteResponse
