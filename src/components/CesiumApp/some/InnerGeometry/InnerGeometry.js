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
     * 加载bilbord
     */
    addIcon (point, text) {
        let _p = null
        if (point) {
            _p = point
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
        this.app.viewer.entities.add({
            position: Cartesian3,
            point: {
                pixelSize: 50,
                color: Cesium.Color.YELLOW
            }
        })
    }

    /**
     * 原生geometry
     */
    addGeometry (Cartesian3) {
        //圆柱体
        this.app.viewer.entities.add({
            name: '圆柱体',
            position: Cartesian3,
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

    addBox (Cartesian3) {
        var redBox = this.app.viewer.entities.add({
            name: 'Red box with black outline',
            position: Cartesian3,
            box: {
                dimensions: new Cesium.Cartesian3(400000.0, 300000.0, 500000.0),
                material: Cesium.Color.RED,
                outline: true, //显示轮廓
                outlineColor: Cesium.Color.BLACK
            }
        })
    }

    /**
     * 圆面
     * @param Cartesian3
     */
    addEllipse (Cartesian3) {
        var greenCircle = this.app.viewer.entities.add({
            position: Cartesian3,
            name: 'Green circle at height',
            ellipse: {
                semiMinorAxis: 300000.0,
                semiMajorAxis: 300000.0,
                height: 200000.0, //浮空
                material: Cesium.Color.GREEN
            }
        })
    }

    /**
     * 椭圆面
     * @param Cartesian3
     */
    addEllipseTuo (Cartesian3) {
        var redEllipse = this.app.viewer.entities.add({
            //不带高度
            position: Cartesian3,
            name: 'Red ellipse on surface with outline',
            ellipse: {
                semiMinorAxis: 250000.0,
                semiMajorAxis: 400000.0,
                material: Cesium.Color.RED.withAlpha(0.5),
                outline: true,
                outlineColor: Cesium.Color.RED
            }
        })

    }

    addEllipseTuoWW (Cartesian3) {
        var blueEllipseWW = this.app.viewer.entities.add({
            position: Cartesian3,
            name: 'Blue translucent, rotated, and extruded ellipse',
            ellipse: {
                semiMinorAxis: 150000.0,
                semiMajorAxis: 300000.0,
                extrudedHeight: 200000.0,  //拉伸
                rotation: Cesium.Math.toRadians(45), //旋转
                material: Cesium.Color.BLUE.withAlpha(0.7),
                outline: true
            }
        })

    }
}
