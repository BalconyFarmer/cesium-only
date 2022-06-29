

export default class Load3DModel {
    constructor (app) {
        this.app = app
        // this.loadP0Clound()
    }

    //
    loadGlbByURL (po, URL) {
        console.log("当前加载模型地址:",URL)
        const result = {
            name: '工厂',
            position: po,
            orientation:
                Cesium.Transforms.headingPitchRollQuaternion(
                    po,
                    new Cesium.HeadingPitchRoll(Cesium.Math.toRadians(0), 0, 0)
                ),
            model: {
                uri: URL,
                // minimumPixelSize: 100, // 最小大小
                heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
            }
        }
        this.app.viewer.entities.add(result)
        this.app.lookLast()
        return result
    }

    //  工厂 entities
    loadGlb (po, htr) {
        const result = {
            name: '工厂',
            position: po,
            orientation:
                Cesium.Transforms.headingPitchRollQuaternion(
                    po,
                    new Cesium.HeadingPitchRoll(Cesium.Math.toRadians(htr[0]), htr[1], htr[2])
                ),
            model: {
                uri: 'http://localhost:1111/3Dstatic/loadData/tt/SimLab_2022-06-27-17-15-58.gltf',
                // minimumPixelSize: 100, // 最小大小
                heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
            }
        }
        return result
    }

    /**
     * 加载glb模型 entities
     * 带动画
     */
    loadGLB (poAirPlane) {
        const self = this
        const position = Cesium.Cartesian3.fromDegrees(poAirPlane[0],
            poAirPlane[1], poAirPlane[2])
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

        let airplane = null
        const entitiesList = self.app.viewer.entities.values
        entitiesList.forEach(item => {
            if (item.name === '飞机') {
                airplane = item
            }
        })

        // 循环执行函数
        let index = 0.00001

        function run () {
            airplane.position = new Cesium.CallbackProperty(function () {
                return Cesium.Cartesian3.fromDegrees(
                    poAirPlane[0] + index, poAirPlane[1], poAirPlane[2]
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

    loadGlbPrimitives (data) {
        // .glb  二进制GLTF格式 车车车
        let car = null
        let modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(
            Cesium.Cartesian3.fromDegrees(data[0], data[1], data[2])
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
                Cesium.Cartesian3.fromDegrees(data[0] + index, data[1], data[2])
            )
            index += 0.00001
            if (index > 0.001) {
                index = 0.00001
            }
            requestAnimationFrame(run)
        }

        run()
    }

    // 行走的人
    loadGltf (poPer) {
        const movePeople = {
            name: '行走的人',
            position: poPer,
            orientation: Cesium.Transforms.headingPitchRollQuaternion(Cesium.Cartesian3.fromDegrees(102.65429606224855, 24.902824697751598, 1856.176763177826), new Cesium.HeadingPitchRoll(Cesium.Math.toRadians(0), 0, 0)),
            model: {
                uri: 'http://localhost:1111/3Dstatic/loadData/CesiumMan/Cesium_Man.gltf',
                // minimumPixelSize: 100,
                // maximumScale: 100000,
                scale: 10.0,
                heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
            }
        }
        return movePeople
    }

}
