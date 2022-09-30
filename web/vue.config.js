const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const cesiumSource = 'node_modules/cesium/Source';
const cesiumjs = '../Build/Cesium/Cesium.js';
const cesiumWorkers = '../Build/Cesium/Workers';
const cesiumThirdParty = '../Build/Cesium/ThirdParty';
const internalIp = require('internal-ip');  // 引入该模块主要是用于获取当前IP地址，将项目地址设置为当前IP地址，这样同个IP端下的用户可以直接访问我的项目


module.exports = {
    configureWebpack: {
        amd: {
            toUrlUndefined: true
        },
        plugins: [
            new CopyWebpackPlugin([
                {from: path.join(cesiumSource, cesiumjs), to: 'Cesium/Cesium.js'},
                {from: path.join(cesiumSource, cesiumThirdParty), to: 'Cesium/ThirdParty'},
                {from: path.join(cesiumSource, 'Assets'), to: 'Cesium/Assets'},
                {from: path.join(cesiumSource, 'Widgets'), to: 'Cesium/Widgets'},
                {from: path.join(cesiumSource, cesiumWorkers), to: 'Cesium/Workers'}
            ]),
            new webpack.DefinePlugin({
                CESIUM_BASE_URL: JSON.stringify('Cesium')
            })
        ],
        // devServer: {
        //     contentBase: "./dist", //本地服务器所加载的页面所在的目录
        //     historyApiFallback: true, // 不跳转
        //     inline: true, // 实时刷新
        //     https: true, // 开启https
        //     port: 9999, // 端口号
        //     host: internalIp.v4.sync(),  // 项目地址
        // }
    }

}