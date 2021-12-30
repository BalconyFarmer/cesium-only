import * as Cesium from 'cesium/Cesium'
import * as widget from 'cesium/Widgets/widgets.css'
import TooltipCesium from './Tools-01Tooltip-entity'

export default class InnerGeometry {
    constructor (app) {
        this.app = app
        this.TooltipCesium = null
    }

    initMoveToolTips () {
        TooltipCesium.initTool(this.app.viewer)
        this.TooltipCesium = TooltipCesium
    }

    /**
     * 原生geometry
     */
    addGeometry () {
        //圆柱体
        this.app.viewer.entities.add({
            name: '圆柱体',
            position: Cesium.Cartesian3.fromDegrees(
                102.65396035468552,
                24.902486377790712,
                1856.388665600861
            ),
            cylinder: {
                length: 10.0,//圆柱体高度
                topRadius: 2,//圆柱体的顶部半径。
                bottomRadius: 2,//    圆柱体底部的半径。
                material: Cesium.Color.GREEN.withAlpha(0.5),//绿色半透明
                outline: true,//轮廓
                outlineColor: Cesium.Color.DARK_GREEN,//轮廓颜色深绿色
                heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
            }
        })

    }

    /**
     * 加载bilbord
     */
    addIcon (point, text) {
        let _p = null
        if (point) {
            _p = Cesium.Cartesian3.fromDegrees(
                point[0],
                point[1],
                point[2],
            )
        } else {
            _p = Cesium.Cartesian3.fromDegrees(
                102.65401175390049,
                24.90222947105644,
                2856.4496713384267,)
        }
        this.app.viewer.entities.add({
            position: _p,
            // 点
            point: {
                color: Cesium.Color.YELLOW, // 点位颜色
                pixelSize: 10 // 像素点大小
            },
            // 文字
            label: {
                // 文本。支持显式换行符“ \ n”
                text: (text || '1号房'),
                // 字体样式,以CSS语法指定字体
                font: '14pt Source Han Sans CN',
                // 字体颜色
                fillColor: Cesium.Color.BLACK,
                // 背景颜色
                backgroundColor: Cesium.Color.AQUA,
                // 是否显示背景颜色
                showBackground: false,
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

    addPoint (Cartesian3) {
        if (Cartesian3) {
            this.app.viewer.entities.add({
                position: Cartesian3,
                point: {
                    pixelSize: 10,
                    color: Cesium.Color.YELLOW
                }
            })
        }

    }

}
