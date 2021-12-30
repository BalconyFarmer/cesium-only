import * as Cesium from 'cesium/Cesium'
import * as widget from 'cesium/Widgets/widgets.css'

export default class Load3DModel {
    constructor (app) {
        this.app = app
    }

    /**
     * 加载3D模型
     */
    addModel () {
        //  工厂
        this.app.viewer.entities.add({
            name: '工厂',
            position: new Cesium.Cartesian3(-1268030.5434272639, 5647967.610935615, 2669301.76723298),
            orientation: Cesium.Transforms.headingPitchRollQuaternion(
                new Cesium.Cartesian3(-1268030.5434272639, 5647967.610935615, 2669301.76723298),
                new Cesium.HeadingPitchRoll(Cesium.Math.toRadians(7), 0, 0)
            ),
            model: {
                uri: 'http://localhost:1111/3Dstatic/loadData/tt/11.glb',
                // minimumPixelSize: 100, // 最小大小
                heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
            }
        })

        // 行走的人
        const movePeople = {
            name: '行走的人',
            position: Cesium.Cartesian3.fromDegrees(102.65429606224855, 24.902824697751598, 1856.176763177826),
            orientation: Cesium.Transforms.headingPitchRollQuaternion(Cesium.Cartesian3.fromDegrees(102.65429606224855, 24.902824697751598, 1856.176763177826), new Cesium.HeadingPitchRoll(Cesium.Math.toRadians(0), 0, 0)),
            model: {
                uri: 'http://localhost:1111/3Dstatic/loadData/CesiumMan/Cesium_Man.gltf',
                // minimumPixelSize: 100,
                // maximumScale: 100000,
                scale: 2.0,
                heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
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
                scale: 1.0,
            }
        )
        car.name = '车车车' // 失效

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
        const aim = {
            x: -1268889.5819769907,
            y: 5649559.131514993,
            z: 2670092.8417171706,
            heading: 4.589028797595305,
            pitch: -0.09566515321336477,
            roll: 0.000004374750088409485,
            duration: 1,
        }
        this.app.cameraFlyToCartesian3(aim)

    }

    /**
     * 加载glb模型
     * 带动画
     */
    loadGLB () {
        const position = Cesium.Cartesian3.fromDegrees(104.08110110247405, 30.645619203470826, 100)
        const _orientation = new Cesium.HeadingPitchRoll(Cesium.Math.toRadians(0), 0, 0)

        // 飞机
        this.app.viewer.entities.add({
            name: '飞机',
            position: position,
            orientation: Cesium.Transforms.headingPitchRollQuaternion(position, _orientation), // 和飞行姿态相关
            model: {
                uri: 'http://localhost:1111/3Dstatic/loadData/CesiumAir/Cesium_Air.glb',
                // heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
                scale: 20.0,
            }
        })



        // 循环执行函数
        const self = this
        let index = 0.00001
        function run () {
            const entitiesList = self.app.viewer.entities.values
            const airplane = entitiesList[5]
            airplane.position = new Cesium.CallbackProperty(function () {
                return Cesium.Cartesian3.fromDegrees(
                    104.08110110247405 + index,
                    30.645619203470826,
                    100
                )
            }, false)
            index += 0.0001
            if (index > 0.1) {
                index = 0.00001
            }
            requestAnimationFrame(run)
        }

        run()
    }

}
