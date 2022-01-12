const {Sequelize, Model, DataTypes} = require('sequelize')
const {config} = require('../common/config')

/**
 * 数据库操作类
 */
class initSquelize {
    constructor () {
        this.UserModel = null
        this.a = this.init()
    }

    async init () {
        // 链接数据库
        const sequelize = new Sequelize(config.DATABASE, config.USERNAME, config.PASSWORD, {
            host: config.sqlAdress,
            dialect: 'mysql',
            timezone: '+08:00', // 输入正确时间
            dialectOptions: {   // 输出正确时间
                charset: 'utf8mb4',
                dateStrings: true,
                typeCast: true
            },
        })

        try {
            await sequelize.authenticate()
            console.log('数据库连接成功')
        } catch (error) {
            console.error('数据库链接失败!!!!:', error)
            await sequelize.authenticate()

        }

        // 视频
        this.VideoModel = sequelize.define('table1s', {
            id: {
                type: DataTypes.INTEGER(),
                autoIncrement: true,
                primaryKey: true,
            },
            name: DataTypes.STRING,
            path: DataTypes.STRING,
        }, {
            timestamps: true // 开启/关闭事件戳
        })

    }

    async saveVideo (postData) {
        const result = await this.VideoModel.create({
            name: postData.name,
            path: postData.path,
        })
        return result
    }

}

module.exports = {initSquelize}

