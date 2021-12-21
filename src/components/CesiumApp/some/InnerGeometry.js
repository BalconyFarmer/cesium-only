import * as Cesium from 'cesium/Cesium'
import * as widget from 'cesium/Widgets/widgets.css'


export default class InnerGeometry {
    constructor (app) {
        this.app = app
    }

    /**
     * 原生geometry
     */
    addGeometry () {
        //圆柱体
        this.app.viewer.entities.add({
            name: '圆柱体',
            position: Cesium.Cartesian3.fromDegrees(102.65461106848306, 24.902995899003997, 1857.9621251609599,),
            cylinder: {
                length: 4.0,//圆柱体高度
                topRadius: 2.0,//圆柱体的顶部半径。
                bottomRadius: 2.0,//    圆柱体底部的半径。
                material: Cesium.Color.GREEN.withAlpha(0.5),//绿色半透明
                outline: true,//轮廓
                outlineColor: Cesium.Color.DARK_GREEN//轮廓颜色深绿色
            }
        })
    }

    /**
     * 加载bilbord
     */
    addIcon () {
        this.app.viewer.entities.add({
            position: Cesium.Cartesian3.fromDegrees(102.65425451755321, 24.902048298657025, 1856.639104950962),
            // 点
            point: {
                color: Cesium.Color.RED, // 点位颜色
                pixelSize: 10 // 像素点大小
            },
            // 文字
            label: {
                // 文本。支持显式换行符“ \ n”
                text: '1号房',
                // 字体样式,以CSS语法指定字体
                font: '14pt Source Han Sans CN',
                // 字体颜色
                fillColor: Cesium.Color.BLACK,
                // 背景颜色
                backgroundColor: Cesium.Color.AQUA,
                // 是否显示背景颜色
                showBackground: true,
                // 字体边框
                outline: true,
                // 字体边框颜色
                outlineColor: Cesium.Color.WHITE,
                // 字体边框尺寸
                outlineWidth: 10,
                // 应用于图像的统一比例。比例大于会1.0放大标签,而比例小于会1.0缩小标签。
                scale: 1.0,
                // 设置样式：FILL：填写标签的文本,但不要勾勒轮廓；OUTLINE：概述标签的文本,但不要填写；FILL_AND_OUTLINE：填写并概述标签文本。
                style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                // 相对于坐标的水平位置
                verticalOrigin: Cesium.VerticalOrigin.CENTER,
                // 相对于坐标的水平位置
                horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
                // 该属性指定标签在屏幕空间中距此标签原点的像素偏移量
                pixelOffset: new Cesium.Cartesian2(10, 0),
                // 是否显示
                show: true
            }
        })
    }
}
