import * as Cesium from 'cesium/Cesium'
import * as widget from 'cesium/Widgets/widgets.css'

export default class Part {
    constructor (app) {
        this.app = app
    }

    addGeometry() {
        //圆柱体
        this.app.viewer.entities.add({
            name: '圆柱体',
            position: Cesium.Cartesian3.fromDegrees(102.6545936749172, 24.903139350774303, 2),
            cylinder: {
                length: 4.0,//圆柱体高度
                topRadius: 2.0,//圆柱体的顶部半径。
                bottomRadius: 2.0,//    圆柱体底部的半径。
                material: Cesium.Color.GREEN.withAlpha(0.5),//绿色半透明
                outline: true,//轮廓
                outlineColor: Cesium.Color.DARK_GREEN//轮廓颜色深绿色
            }
        });
        this.app.cameraFlyTo(102.6545936749172, 24.903139350774303, 2)
    }

    addModel () {
        //  工厂
        // this.viewer.entities.add({
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
                maximumScale: 20000,
                minimumPixelSize: 100, // 最小大小
                heightReference: Cesium.HeightReference.CLAMP_TO_GROUND // Cesium.HeightReference.CLAMP_TO_GROUND 贴地 Cesium.HeightReference.RELATIVE_TO_GROUND//相对上方高度 Cesium.HeightReference.NONE//位置绝对
            }
        })

        // 行走的人
        // this.viewer.entities.add({
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
        // let modelMatrix = this.Cesium.Transforms.eastNorthUpToFixedFrame(
        //     this.Cesium.Cartesian3.fromDegrees(102.65354807476618, 24.902574158112795, 1856.782176272045))
        //
        // this.viewer.scene.primitives.add(this.Cesium.Model.fromGltf({
        //     url: 'http://localhost:1111/3Dstatic/loadData/GroundVehicle/GroundVehicle.glb',
        //     modelMatrix: modelMatrix,
        //     scale: 10.0
        // }))
        this.app.cameraFlyTo(102.6545936749172, 24.903139350774303, 1000)

    }

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

}
