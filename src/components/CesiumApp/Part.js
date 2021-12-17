import * as Cesium from 'cesium/Cesium'
import * as widget from 'cesium/Widgets/widgets.css'

export default class Part {
    constructor (app) {
        this.app = app
    }

    /**
     * 原生geometry
     */
    addGeometry() {
        //圆柱体
        this.app.viewer.entities.add({
            name: '圆柱体',
            position: Cesium.Cartesian3.fromDegrees(102.65555596144124, 24.898108323944797, 1862.4957134009137),
            cylinder: {
                length: 4.0,//圆柱体高度
                topRadius: 2.0,//圆柱体的顶部半径。
                bottomRadius: 2.0,//    圆柱体底部的半径。
                material: Cesium.Color.GREEN.withAlpha(0.5),//绿色半透明
                outline: true,//轮廓
                outlineColor: Cesium.Color.DARK_GREEN//轮廓颜色深绿色
            }
        });
        this.app.cameraFlyTo(102.65555596144124, 24.898108323944797, 1862.4957134009137)
    }

    /**
     * 加载3D模型
     */
    addModel () {
        //  工厂
        // this.app.viewer.entities.add({
        //     name: '工厂',
        //     position: Cesium.Cartesian3.fromDegrees(102.6541668144539, 24.902819641220166, 1856.2860960758176),
        //     orientation: Cesium.Transforms.headingPitchRollQuaternion(Cesium.Cartesian3.fromDegrees(104, 30, 300000), new Cesium.HeadingPitchRoll(Cesium.Math.toRadians(0), 0, 0)), // 和飞行姿态相关
        //     model: {
        //         uri: 'http://localhost:1111/3Dstatic/loadData/tt/11.gltf',
        //         minimumPixelSize: 100, // 最小大小
        //         heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
        //     }
        //
        // })


        // 飞机
        this.app.viewer.entities.add({
            name: '飞机',
            position: Cesium.Cartesian3.fromDegrees(102.6545936749172, 24.903139350774303, 1000),
            orientation: Cesium.Transforms.headingPitchRollQuaternion(Cesium.Cartesian3.fromDegrees(104, 30, 300000), new Cesium.HeadingPitchRoll(Cesium.Math.toRadians(0), 0, 0)), // 和飞行姿态相关
            model: {
                uri: 'http://localhost:1111/3Dstatic/loadData/CesiumAir/Cesium_Air.gltf',
                // maximumScale: 20000,
                // minimumPixelSize: 100, // 最小大小
                heightReference: Cesium.HeightReference.CLAMP_TO_GROUND // Cesium.HeightReference.CLAMP_TO_GROUND 贴地 Cesium.HeightReference.RELATIVE_TO_GROUND//相对上方高度 Cesium.HeightReference.NONE//位置绝对
            }
        })

        // 行走的人
        // this.app.viewer.entities.add({
        //     name: '行走的人',
        //     position: Cesium.Cartesian3.fromDegrees(102.65339188565756, 24.903063377652526, 1857.062789496248),
        //     orientation: Cesium.Transforms.headingPitchRollQuaternion(Cesium.Cartesian3.fromDegrees(102.65339188565756, 24.903063377652526, 1857.062789496248), new Cesium.HeadingPitchRoll(Cesium.Math.toRadians(0), 0, 0)),
        //     model: {
        //         uri: 'http://localhost:1111/3Dstatic/loadData/CesiumMan/Cesium_Man.gltf',
        //         minimumPixelSize: 100,
        //         maximumScale: 100000
        //     }
        // })

        // .glb  二进制GLTF格式 车车车
        // let modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(
        //     Cesium.Cartesian3.fromDegrees(102.65354807476618, 24.902574158112795, 1856.782176272045))
        //
        // this.app.viewer.scene.primitives.add(Cesium.Model.fromGltf({
        //     url: 'http://localhost:1111/3Dstatic/loadData/GroundVehicle/GroundVehicle.glb',
        //     modelMatrix: modelMatrix,
        //     scale: 10.0
        // }))
        this.app.cameraFlyTo(102.6545936749172, 24.903139350774303, 1000)

    }

    /**
     * 加载流动墙效果
     */
    addFlowWall () {
        /*
          流动纹理线
           color 颜色
           duration 持续时间 毫秒
        */

        class PolylineTrailLinkMaterialProperty {
            constructor (color, duration) {
                this._definitionChanged = new Cesium.Event()
                this._color = undefined
                this._colorSubscription = undefined
                this.color = color
                this.duration = duration
                this._time = (new Date()).getTime()
                this.color = Cesium.createPropertyDescriptor('color')
            }

            get isConstant () {
                return false
            }

            get definitionChanged () {
                return this._definitionChanged
            }

            get isConstant () {
                return false
            }

            get definitionChanged () {
                return this._definitionChanged
            }

            color () {
                return Cesium.createPropertyDescriptor('color')
            }

            getType () {
                return 'PolylineTrailLink'
            }

            getValue (time, result) {
                if (!Cesium.defined(result)) {
                    result = {}
                }
                result.color = Cesium.Property.getValueOrClonedDefault(this._color, time, Cesium.Color.WHITE, result.color)
                result.image = Cesium.Material.PolylineTrailLinkImage
                result.time = (((new Date()).getTime() - this._time) % this.duration) / this.duration
                return result
            }

            equals (other) {
                return this === other ||
                    (other instanceof PolylineTrailLinkMaterialProperty &&
                        Property.equals(this._color, other._color))
            }
        }

        // Cesium.PolylineTrailLinkMaterialProperty = PolylineTrailLinkMaterialProperty
        Cesium.Material.PolylineTrailLinkType = 'PolylineTrailLink'
        Cesium.Material.PolylineTrailLinkImage = 'http://localhost:1111/3Dstatic/loadData/colors.png'
        Cesium.Material.PolylineTrailLinkSource = 'czm_material czm_getMaterial(czm_materialInput materialInput)\n\
                                                      {\n\
                                                           czm_material material = czm_getDefaultMaterial(materialInput);\n\
                                                           vec2 st = materialInput.st;\n\
                                                           vec4 colorImage = texture2D(image, vec2(fract(st.s - time), st.t));\n\
                                                           material.alpha = colorImage.a * color.a;\n\
                                                           material.diffuse = (colorImage.rgb+color.rgb)/2.0;\n\
                                                           return material;\n\
                                                       }'
        Cesium.Material._materialCache.addMaterial(Cesium.Material.PolylineTrailLinkType, {
            fabric: {
                type: Cesium.Material.PolylineTrailLinkType,
                uniforms: {
                    color: new Cesium.Color(1.0, 0.0, 0.0, 0.5),
                    image: Cesium.Material.PolylineTrailLinkImage,
                    time: 0
                },
                source: Cesium.Material.PolylineTrailLinkSource
            },
            translucent: function (material) {
                return true
            }
        })

        this.app.viewer.entities.add({
            name: '动态立体墙',
            wall: {
                positions: Cesium.Cartesian3.fromDegreesArray([117.154815, 31.853495, 117.181255, 31.854257, 117.182284, 31.848255, 117.184748, 31.840141, 117.180557, 31.835556, 117.180023, 31.833741, 117.166846, 31.833737, 117.155531, 31.833151, 117.154787, 31.835978, 117.151994, 31.839036, 117.150691, 31.8416, 117.151215, 31.844734, 117.154457, 31.848152, 117.154815, 31.853495]),
                maximumHeights: [600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600],
                minimumHeights: [43.9, 49.4, 38.7, 40, 54, 51, 66.7, 44.6, 41.2, 31.2, 50.1, 53.8, 46.9, 43.9],
                material: new PolylineTrailLinkMaterialProperty(Cesium.Color.ORANGE, 3000)
            }
        })

        this.app.viewer.zoomTo(this.app.viewer.entities)
    }

    /**
     * 加载bilbord
     */
    addIcon () {
        this.app.viewer.entities.add({
            position: Cesium.Cartesian3.fromDegrees(102.63749265495848, 24.899929322885566, 2020.096625999652),
            // 点
            point: {
                color: Cesium.Color.RED, // 点位颜色
                pixelSize: 10 // 像素点大小
            },
            // 文字
            label: {
                // 文本。支持显式换行符“ \ n”
                text: '测试名称',
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

    /**
     * 加载云南JSON
     */
    loadJsonData () {
        const self = this
        // 还在geoJson数据 ()
        Cesium.GeoJsonDataSource.load(require('../loadData/geoJson/云南省.json')).then(function (dataSource) {
            self.viewer.dataSources.add(dataSource).then(res => {
                const test = res
                test.name = '测试'
            })
        })
        self.app.viewer.camera.flyTo({
            destination: Cesium.Cartesian3.fromDegrees(101.315555, 24.613368, 72000.0),
            orientation: {
                heading: 0, // east, default value is 0.0 (north) 左右摆头
                pitch: -90, // default value (looking down) 上下摆头 -90俯视 0 平视
                roll: 0.0 // default value
            }
        })
    }

    /**
     * 加载纽约Tiles数据
     */
    toYN () {
        // 设置camera
        // 1. Set position with a top-down view
        this.app.viewer.camera.flyTo({
            destination: Cesium.Cartesian3.fromDegrees(-73.940159, 40.800621, 2000.0),
            orientation: {
                heading: Cesium.Math.toRadians(0), // east, default value is 0.0 (north) 左右摆头
                pitch: Cesium.Math.toRadians(-45), // default value (looking down) 上下摆头 -90俯视 0 平视
                roll: 0.0 // default value
            }
        })

        // 添加瓦片数据 (纽约)
        let city = this.app.viewer.scene.primitives.add(new Cesium.Cesium3DTileset({url: Cesium.IonResource.fromAssetId(3839)}))
        let cityStyle = new Cesium.Cesium3DTileStyle({
            color: 'color(\'blue\',0.2)',
            show: true
        })
        // let cityStyle = new Cesium.Cesium3DTileStyle({
        //   color: {
        //     conditions: [
        //       [`${Height} >= 100`, `color("purple", 0.5)`],
        //       [`${Height} >= 50`, `color("red")`],
        //       [`true`, `color("blue")`]
        //     ]
        //   },
        //   show: `${Height} > 0`
        // })
        city.style = cityStyle
    }
}
