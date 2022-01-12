const moveFile = require('../common/utils/moveFile')
const {initSequelize} = require('../index.js')

// 保存视频
const saveVideo = async ctx => {
    const files = ctx.request.files['files[]']
    console.log(files.name, 'controler')
    console.log(files.fuckPath, 'controler')
    console.log(files.fuckName, 'controler')

    // const afterPath = await moveFile(1, ctx, "videos")
    const postData = {
        // id: postData.id,
        name: files.name,
        path: files.fuckPath + files.fuckName,
    }
    await initSequelize.saveVideo(postData)

    ctx.body = 'ok'
}

// 保存视频
const get3DFilesAll = async ctx => {
    let result = await initSequelize.get3DFilesAll()
    ctx.body = result
}

module.exports = {
    saveVideo,get3DFilesAll
}
