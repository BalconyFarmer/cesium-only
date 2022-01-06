import * as Cesium from 'cesium/Cesium'
import * as widget from 'cesium/Widgets/widgets.css'

/**
 * 粒子效果
 *
 * https://sandcastle.cesium.com/index.html?src=Particle%20System.html
 */
export default class ParticleSystems {
    constructor (app) {
        this.app = app
    }

    init (position) {
        let modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(
            Cesium.Cartesian3.fromDegrees(102.65429951325757, 24.902681903918705, 1856.1428287336178)
        )
        if (position) {
            modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(
                position
            )
        }
        let particleSystem = this.app.viewer.scene.primitives.add(new Cesium.ParticleSystem({
            emitter: new Cesium.CircleEmitter(1.1),    // 发射器类型
            image: 'http://localhost:1111/3Dstatic/loadData/fire.png',
            imageSize: new Cesium.Cartesian2(1, 1), // 图片大小
            emissionRate: 10.0, // 发射率
            gravity: 0.0, // 万有引力
            startScale: 100.0, // 开始放大率
            endScale: 1.0, // 结束放大率
            particleLife: 2.0,
            lifetime: 16.0,
            modelMatrix: modelMatrix, //
            minimumImageSize: new Cesium.Cartesian2(1, 1), // 随机图片最小
            maximumImageSize: new Cesium.Cartesian2(11, 11), // 随机图片最大
            minimumSpeed: 5.0, // 最小速度
            maximumSpeed: 10.0, // 最大速度
            minimumParticleLife: 1, // 最小生命
            maximumParticleLife: 2, // 最大生命
            startColor: Cesium.Color.LIGHTSEAGREEN.withAlpha(0.7),
            endColor: Cesium.Color.WHITE.withAlpha(0.0),
            // bursts: [ // 突发性行为
            //     // these burst will occasionally sync to create a multicolored effect
            //     new Cesium.ParticleBurst({
            //         time: 5.0,
            //         minimum: 10,
            //         maximum: 100,
            //     }),
            //     new Cesium.ParticleBurst({
            //         time: 10.0,
            //         minimum: 50,
            //         maximum: 100,
            //     }),
            //     new Cesium.ParticleBurst({
            //         time: 15.0,
            //         minimum: 200,
            //         maximum: 300,
            //     }),
            // ],
        }))
    }

}
