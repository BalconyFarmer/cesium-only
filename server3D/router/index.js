const Router = require('koa-router')
const router = new Router()
const {
    saveVideo,
    get3DFilesAll
} = require('../controllers')

const routeList = [
    /**
     * 文件上传
     */
    {
        method: 'post',
        path: '/saveVideo',
        controller: saveVideo
    },
    {
        method: 'post',
        path: '/get3DFilesAll',
        controller: get3DFilesAll
    },

]

routeList.forEach(item => {
    const {method, path, controller} = item
    router[method](path, controller)
})

module.exports = {router}
