const path = require('path')
const static = require('koa-static')
const koaBody = require('koa-body')

function initStaticFile(app) {

    // 声明静态资源文件夹相对于相对于此initstaticfile的路径
    const staticPath = '../static'
    app.use(static(
        path.join(__dirname, staticPath)
    ))

    // 支持文件上传
    // 写文件工具
    const getUploadFileExt = require('../common/utils/getUploadFileExt');
    const getUploadFileName = require('../common/utils/getUploadFileName');
    const checkDirExist = require('../common/utils/checkDirExist');
    const getUploadDirName = require('../common/utils/getUploadDirName');

    app.use(koaBody({
        multipart: true,
        // encoding: 'gzip',
        formidable: {
            uploadDir: path.join(__dirname, './uploadDefault'),
            keepExtensions: true,
            maxFieldsSize: 2000 * 1024 * 1024,  // 1000 M
            onFileBegin: (name, file) => {
                // 获取文件后缀
                const ext = getUploadFileExt(file.name);

                // 最终要保存到的文件夹目录
                const dirName = getUploadDirName();
                const dir = path.join(__dirname, `${staticPath}/uploadDefault/${dirName}`);

                // 检查文件夹是否存在如果不存在则新建文件夹
                checkDirExist(dir);

                // 获取文件名称
                const fileName = getUploadFileName(ext);

                // 重新覆盖 file.path 属性
                file.path = `${dir}/${fileName}`;
                app.context.uploadpath = app.context.uploadpath ? app.context.uploadpath : {};
                app.context.uploadpath[name] = `${dirName}/${fileName}`;
            },
            patchKoa: true
        }
    }));


}

module.exports = {initStaticFile};
