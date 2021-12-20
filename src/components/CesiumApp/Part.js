import * as Cesium from 'cesium/Cesium'
import * as widget from 'cesium/Widgets/widgets.css'

export default class Part {
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
            position: Cesium.Cartesian3.fromDegrees(102.65555596144124, 24.898108323944797, 1862.4957134009137),
            cylinder: {
                length: 4.0,//圆柱体高度
                topRadius: 2.0,//圆柱体的顶部半径。
                bottomRadius: 2.0,//    圆柱体底部的半径。
                material: Cesium.Color.GREEN.withAlpha(0.5),//绿色半透明
                outline: true,//轮廓
                outlineColor: Cesium.Color.DARK_GREEN//轮廓颜色深绿色
            }
        })
        this.app.cameraFlyTo(102.65555596144124, 24.898108323944797, 1862.4957134009137)
    }

    /**
     * 加载3D模型
     */
    addModel () {
        // this.viewer.entities.removeAll();//删除所有entities

        //  工厂
        this.app.viewer.entities.add({
            name: '工厂',
            position: Cesium.Cartesian3.fromDegrees(102.65393986790458, 24.90249056812303, 1856.407665633927),
            orientation: Cesium.Transforms.headingPitchRollQuaternion(Cesium.Cartesian3.fromDegrees(102.65393986790458, 24.90249056812303, 1856.407665633927), new Cesium.HeadingPitchRoll(Cesium.Math.toRadians(0), 0, 0)), // 和飞行姿态相关
            model: {
                uri: 'http://localhost:1111/3Dstatic/loadData/tt/11.glb',
                // minimumPixelSize: 100, // 最小大小
                heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
            }
        })

        // 飞机
        // this.app.viewer.entities.add({
        //     name: '飞机',
        //     position: Cesium.Cartesian3.fromDegrees(102.65432610609486, 24.90235929942473, 1856.1161775500739),
        //     orientation: Cesium.Transforms.headingPitchRollQuaternion(Cesium.Cartesian3.fromDegrees(102.65432610609486, 24.90235929942473, 1856.1161775500739), new Cesium.HeadingPitchRoll(Cesium.Math.toRadians(0), 0, 0)), // 和飞行姿态相关
        //     model: {
        //         uri: 'http://localhost:1111/3Dstatic/loadData/CesiumAir/Cesium_Air.gltf',
        //         // maximumScale: 20000,
        //         // minimumPixelSize: 100, // 最小大小
        //         heightReference: Cesium.HeightReference.CLAMP_TO_GROUND // Cesium.HeightReference.CLAMP_TO_GROUND 贴地 Cesium.HeightReference.RELATIVE_TO_GROUND//相对上方高度 Cesium.HeightReference.NONE//位置绝对
        //     }
        // })

        // 行走的人
        const movePeople = {
            name: '行走的人',
            position: Cesium.Cartesian3.fromDegrees(102.65429606224855, 24.902824697751598, 1856.176763177826),
            orientation: Cesium.Transforms.headingPitchRollQuaternion(Cesium.Cartesian3.fromDegrees(102.65429606224855, 24.902824697751598, 1856.176763177826), new Cesium.HeadingPitchRoll(Cesium.Math.toRadians(0), 0, 0)),
            model: {
                uri: 'http://localhost:1111/3Dstatic/loadData/CesiumMan/Cesium_Man.gltf',
                // minimumPixelSize: 100,
                // maximumScale: 100000,
                scale: 2.0
            }
        }

        this.app.viewer.entities.add(movePeople)

        // .glb  二进制GLTF格式 车车车
        let car = null
        let modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(
            Cesium.Cartesian3.fromDegrees(102.65429951325757, 24.902681903918705, 1856.1428287336178)
        )
        car = Cesium.Model.fromGltf(
            {
                url: 'http://localhost:1111/3Dstatic/loadData/GroundVehicle/GroundVehicle.glb',
                modelMatrix: modelMatrix,
                scale: 1.0
            }
        )

        this.app.viewer.scene.primitives.add(car)
        // 循环执行函数
        const self = this
        let index = 0.00001

        function run () {
            car.modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(
                Cesium.Cartesian3.fromDegrees(102.65429951325757 + index, 24.902681903918705, 1856.1428287336178)
            )
            index += 0.00001
            if (index > 0.001) {
                index = 0.00001
            }
            requestAnimationFrame(run)
        }

        run()

        // this.app.cameraFlyTo(102.65400663464233, 24.90300286288314, 1856.4620764260865, 4.583496596296543, -0.11011623452653185)
        this.app.cameraFlyToCartesian3(-1268889.5819769907, 5649559.131514993, 2670092.8417171706, 4.589028797595305, -0.09566515321336477, 0.000004374750088409485)

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




    /**
     * 添加流动线条
     */
    addFlowLine () {
        class FlowLineMaterialProperty {
            constructor (color, duration) {
                this._definitionChanged = new Cesium.Event()
                this._color = undefined
                this._colorSubscription = undefined
                this.color = color
                this.duration = duration
                this._time = (new Date()).getTime()
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
                return 'FlowLine'
            }

            getValue (time, result) {
                if (!Cesium.defined(result)) {
                    result = {}
                }
                result.color = Cesium.Property.getValueOrClonedDefault(this._color, time, Cesium.Color.WHITE, result.color)
                result.image = Cesium.Material.FlowLineImage
                result.time = (((new Date()).getTime() - this._time) % this.duration) / this.duration
                return result
            }

            equals (other) {
                return this === other ||
                    (other instanceof FlowLineMaterialProperty &&
                        Property.equals(this._color, other._color))
            }
        }

        Cesium.FlowLineMaterialProperty = FlowLineMaterialProperty
        Cesium.Material.FlowLineType = 'FlowLine'
        Cesium.Material.FlowLineImage = drawCanvas()
        Cesium.Material.FlowLineSource = 'czm_material czm_getMaterial(czm_materialInput materialInput)\n\
                                                  {\n\
                                                       czm_material material = czm_getDefaultMaterial(materialInput);\n\
                                                       vec2 st = materialInput.st;\n\
                                                       vec4 colorImage = texture2D(image, vec2(fract(st.s), st.t));\n\
                                                       material.alpha = colorImage.a * color.a;\n\
                                                       material.diffuse = colorImage.rgb;\n\
                                                       return material;\n\
                                                   }'
        Cesium.Material._materialCache.addMaterial(Cesium.Material.FlowLineType, {
            fabric: {
                type: Cesium.Material.FlowLineType,
                uniforms: {
                    color: new Cesium.Color(1.0, 1.0, 1.0, 1),
                    image: Cesium.Material.FlowLineImage,
                    time: 0
                },
                source: Cesium.Material.FlowLineSource
            },
            translucent: function (material) {
                return true
            }
        })

        function drawCanvas () {
            let canvas = document.createElement('canvas')
            canvas.width = 1200
            canvas.height = 50
            let ctx = canvas.getContext('2d')
            let grd = ctx.createLinearGradient(0, 0, 1200, 0)
            grd.addColorStop(0, 'rgba(255,255,0,0.2)')
            grd.addColorStop(1, 'rgba(0,255,0,1)')
            ctx.fillStyle = grd
            ctx.fillRect(0, 0, 1200, 50)
            return canvas.toDataURL('image/png')
        }

        this.app.viewer.entities.add({
            name: 'PolylineTrail',
            polyline: {
                positions: Cesium.Cartesian3.fromDegreesArrayHeights(
                    [
                        102.65522062344772, 24.885658297532803, 1854.7618263277068,
                        102.65455249694989, 24.890987614908887, 1888.7717509127956,
                        102.65598127309781, 24.895192167561607, 1868.1795017975555,
                        102.65483833999541, 24.902219367229762, 1856.3646821264895,
                    ]),
                width: 5,
                material: new Cesium.FlowLineMaterialProperty(Cesium.Color.ORANGE, 3000)
            }
        })

    }





}
