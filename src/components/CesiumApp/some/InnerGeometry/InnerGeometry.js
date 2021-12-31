import * as Cesium from 'cesium/Cesium'
import * as widget from 'cesium/Widgets/widgets.css'
import TooltipCesium from './Tools-01Tooltip-entity'

/**
 * https://blog.csdn.net/weixin_36617251/article/details/118366285
 */
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

    addBox (Cartesian3) {
        let redBox = this.app.viewer.entities.add({
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
        let greenCircle = this.app.viewer.entities.add({
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
        let redEllipse = this.app.viewer.entities.add({
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
        let blueEllipseWW = this.app.viewer.entities.add({
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

    redCorridor (Cartesian3) {
        let redCone = this.app.viewer.entities.add({
            name: 'Red cone',
            position: Cartesian3,
            cylinder: {//圆锥
                length: 400000.0,
                topRadius: 0.0,
                bottomRadius: 200000.0,
                material: Cesium.Color.RED
            }
        })
    }

    redPolygon (Cartesian3) {
        let redPolygon = this.app.viewer.entities.add({
            name: '贴着地表的多边形',
            polygon: {
                hierarchy: Cesium.Cartesian3.fromDegreesArray(
                    [
                        -115.0, 37.0,
                        -115.0, 32.0,
                        -107.0, 33.0,
                        -102.0, 31.0,
                        -102.0, 35.0
                    ]
                ),
                material: Cesium.Color.RED
            }
        })
    }

    greenPolygon (Cartesian3) {
        let greenPolygon = this.app.viewer.entities.add({
            name: '绿色拉伸多边形',
            polygon: {
                hierarchy: Cesium.Cartesian3.fromDegreesArray([-108.0, 42.0,
                    -100.0, 42.0,
                    -104.0, 40.0]),
                extrudedHeight: 500000.0,
                material: Cesium.Color.GREEN
            }
        })
    }

    orangePolygon (Cartesian3) {
        let orangePolygon = this.app.viewer.entities.add({
            name: '每个顶点具有不同拉伸高度的橘色多边形',
            polygon: {
                hierarchy: Cesium.Cartesian3.fromDegreesArrayHeights(
                    [-108.0, 25.0, 100000,
                        -100.0, 25.0, 100000,
                        -100.0, 30.0, 100000,
                        -108.0, 30.0, 300000]),
                extrudedHeight: 0,
                perPositionHeight: true,
                material: Cesium.Color.ORANGE,
                outline: true,
                outlineColor: Cesium.Color.BLACK
            }
        })
    }

    bluePolygon (Cartesian3) {
        let bluePolygon = this.app.viewer.entities.add({
            name: '具有挖空效果的蓝色多边形',
            polygon: {
                hierarchy: {
                    positions: Cesium.Cartesian3.fromDegreesArray(
                        [-99.0, 30.0,
                            -85.0, 30.0,
                            -85.0, 40.0,
                            -99.0, 40.0]),
                    holes: [{
                        positions: Cesium.Cartesian3.fromDegreesArray([
                            -97.0, 31.0,
                            -97.0, 39.0,
                            -87.0, 39.0,
                            -87.0, 31.0
                        ]),
                        holes: [{
                            positions: Cesium.Cartesian3.fromDegreesArray([
                                -95.0, 33.0,
                                -89.0, 33.0,
                                -89.0, 37.0,
                                -95.0, 37.0
                            ]),
                            holes: [{
                                positions: Cesium.Cartesian3.fromDegreesArray([
                                    -93.0, 34.0,
                                    -91.0, 34.0,
                                    -91.0, 36.0,
                                    -93.0, 36.0
                                ])
                            }]
                        }]
                    }]
                },
                material: Cesium.Color.BLUE,
                outline: true,
                outlineColor: Cesium.Color.BLACK
            }
        })
    }

    redLine (Cartesian3) {
        let redLine = this.app.viewer.entities.add({
            name: '沿着地球表面的红线',
            polyline: {
                positions: Cesium.Cartesian3.fromDegreesArray(
                    [
                        -75, 35, -125, 35
                    ]),
                width: 5,
                material: Cesium.Color.RED
            }
        })
    }

    glowingLine (Cartesian3) {
        let glowingLine = this.app.viewer.entities.add({
            name: '具有发光效果的线',
            polyline: {
                positions: Cesium.Cartesian3.fromDegreesArray(
                    [-75, 37, -125, 37]
                ),
                width: 10,
                material: new Cesium.PolylineGlowMaterialProperty({
                    glowPower: 0.2,
                    color: Cesium.Color.BLUE
                })
            }
        })
    }

    orangeOutlined (Cartesian3) {
        let orangeOutlined = this.app.viewer.entities.add({
            name: '具有一定高度的线',
            polyline: {
                positions: Cesium.Cartesian3.fromDegreesArrayHeights(
                    [-75, 39, 250000, -125, 39, 250000]
                ),
                width: 5,
                material: new Cesium.PolylineOutlineMaterialProperty({
                    color: Cesium.Color.ORANGE,
                    outlineWidth: 2,
                    outlineColor: Cesium.Color.BLACK
                })
            }
        })
    }

    yellowLine (Cartesian3) {
        let yellowLine = this.app.viewer.entities.add({
            name: '不贴着地表的线',
            polyline: {
                positions: Cesium.Cartesian3.fromDegreesArrayHeights(
                    [-75, 43, 500000, -125, 43, 500000]
                ),
                width: 3,
                followSurface: false,  //是否贴着地表
                material: Cesium.Color.PURPLE
            }
        })
    }

    redRectangle (Cartesian3) {
        //红色矩形
        let redRectangle = viewer.entities.add({
            name: 'Red translucent rectangle with outline',
            rectangle: {
                coordinates: Cesium.Rectangle.fromDegrees(-110.0, 20.0, -80.0, 25.0),
                material: Cesium.Color.RED.withAlpha(0.5),
                outline: true,
                outlineColor: Cesium.Color.RED
            }
        })
    }

    greenRectangle (Cartesian3) {
        //绿色旋转、拉伸的矩形
        let greenRectangle = viewer.entities.add({
            name: 'Green translucent, rotated, and extruded rectangle',
            rectangle: {
                coordinates: Cesium.Rectangle.fromDegrees(-100.0, 30.0, -90.0, 40.0),
                material: Cesium.Color.GREEN.withAlpha(0.5),
                rotation: Cesium.Math.toRadians(45),
                extrudedHeight: 300000.0,
                height: 100000.0,
                outline: true,
                outlineColor: Cesium.Color.GREEN
            }
        })
    }

    blueEllipsoid (Cartesian3) {
        let blueEllipsoid = viewer.entities.add({
            name: 'Blue ellipsoid',
            position: Cartesian3,
            ellipsoid: {
                //可以指定三个轴的半径
                radii: new Cesium.Cartesian3(200000.0, 200000.0, 300000.0),
                material: Cesium.Color.BLUE
            }
        })
    }

    redSphere (Cartesian3) {
        let redSphere = viewer.entities.add({
            name: 'Red sphere with black outline',
            position: Cartesian3,
            ellipsoid: {
                //正球体
                radii: new Cesium.Cartesian3(300000.0, 300000.0, 300000.0),
                material: Cesium.Color.RED,
                outline: true,
                outlineColor: Cesium.Color.BLACK
            }
        })
    }

    outlineOnly (Cartesian3) {
        let outlineOnly = viewer.entities.add({
            name: 'Yellow ellipsoid outline',
            position: Cartesian3,
            ellipsoid: {
                radii: new Cesium.Cartesian3(200000.0, 200000.0, 300000.0),
                fill: false,
                outline: true,
                outlineColor: Cesium.Color.YELLOW,
                slicePartitions: 24, //横向切割线
                stackPartitions: 36  //纵向切割线
            }
        })
    }

    redWall (Cartesian3) {
        //东西方向的横墙
        let redWall = viewer.entities.add({
            name: 'Red wall at height',
            wall: {
                positions: Cesium.Cartesian3.fromDegreesArrayHeights(
                    [
                        -115.0, 44.0, 200000.0,//坐标点
                        -90.0, 44.0, 200000.0]
                ),
                minimumHeights: [100000.0, 100000.0], //按坐标点的最小高度数组
                material: Cesium.Color.RED
            }
        })
    }

    greenWall (Cartesian3) {
        let greenWall = viewer.entities.add({
            name: 'Green wall from surface with outline',
            wall: {
                positions: Cesium.Cartesian3.fromDegreesArrayHeights(
                    [
                        104.08076896875812,
                        30.645621985119146, 100.0,

                        104.08181949416934,
                        30.6491778217173, 100.0,

                        104.07449474385395,
                        30.653122884388093, 100.0,

                        104.07256970305284,
                        30.64867564461773, 100.0,

                        104.08076896875812,
                        30.645621985119146, 100.0,
                    ]
                ),
                // material: Cesium.Color.GREEN,
                material: new Cesium.PolylineGlowMaterialProperty({
                    glowPower: 0.2,
                    color: Cesium.Color.BLUE.withAlpha(0.5),
                }),
                outline: false,
                outlineColor: Cesium.Color.BLACK
            }
        })
    }

    blueWall (Cartesian3) {
        //曲折的墙
        let blueWall = viewer.entities.add({
            name: 'Blue wall with sawtooth heights and outline',
            wall: {
                //坐标点，不指定高度
                positions: Cesium.Cartesian3.fromDegreesArray(
                    [-115.0, 50.0,
                        -112.5, 50.0,
                        -110.0, 50.0,
                        -107.5, 50.0,
                        -105.0, 50.0,
                        -102.5, 50.0,
                        -100.0, 50.0,
                        -97.5, 50.0,
                        -95.0, 50.0,
                        -92.5, 50.0,
                        -90.0, 50.0]),
                maximumHeights: [ //上高
                    100000, 200000, 100000, 200000, 100000, 200000,
                    100000, 200000, 100000, 200000, 100000],
                minimumHeights: [  //下高
                    0, 100000, 0, 100000, 0, 100000, 0, 100000, 0,
                    100000, 0],
                material: new Cesium.PolylineGlowMaterialProperty({
                    glowPower: 0.3,
                    color: Cesium.Color.BLUE.withAlpha(0.7),
                }),
                outline: true,
                outlineColor: Cesium.Color.BLACK
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
                material: new Cesium.PolylineGlowMaterialProperty({
                    glowPower: 0.2,
                    color: Cesium.Color.BLUE.withAlpha(0.5),
                }),
                outline: true,//轮廓
                outlineColor: Cesium.Color.DARK_GREEN,//轮廓颜色深绿色
                heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
            }
        })

    }

    addLight (Cartesian3) {
        this.app.scene.sun.show = false
        this.app.scene.lightSource.ambientLightColor = new Cesium.Color(0, 0, 0, 1)

        // 新增直射光-整个环境
        let dirLightOptions = {
            targetPosition: Cartesian3,
            color: new Cesium.Color(0.01, 0.01, 0.3, 1.0),
            intensity: 0.1
        }
        let directionalLight_v = new Cesium.DirectionalLight(position, dirLightOptions)
        this.app.scene.addLightSource(directionalLight_v)
        // 新增点光源-整个环境
        let pointLightPos3 = new Cesium.Cartesian3.fromDegrees(116.46477932175468, 39.905807158839266, 220.0)
        let pointLightOptions3 = {
            cutoffDistance: 2000,
            color: new Cesium.Color(0.04, 0.18, 0.43, 1.0),
            intensity: 0.001
        }
        let pointLight3 = new Cesium.PointLight(pointLightPos3, pointLightOptions3)
        this.app.scene.addLightSource(pointLight3)
    }
}
