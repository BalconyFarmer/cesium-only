import ParticleSystems from '../some/ParticleSystems'
import * as Cesium from 'cesium/Cesium'
import * as widget from 'cesium/Widgets/widgets.css'

/**
 * 成都展示项目
 */
export default class ChengDu {
    constructor (app) {
        this.app = app
        this.init()
    }

    init () {
        const self = this

        this.app.closeAll()
        this.app.switchLayer('ArcGis实景图层')
        this.app.updateLyerLight(0.5, 0.5)

        this.app.cesium3DTileset.addTiles()

        const aim1 = {
            x: -1335650.7543657143,
            y: 5327186.609873566,
            z: 3232969.4880313054,
            heading: 2.464077977287265,
            pitch: -0.38924437417452307,
            roll: 0.00001352269589993682,
            duration: 10,
        }
        self.app.cameraAutoRoll(aim1)

        setTimeout(function () {
            self.app.cameraFlyToCartesian3(aim1)
        }, 10000)

        const option = {
            lon: 104.08867088908544,
            lat: 30.649448026709173,
            radius: 500
        }
        self.app.part.addRadarScan(option)

        const option1 = {
            lon: 104.08077683485338,
            lat: 30.635968171376696,
            radius: 300
        }
        self.app.part.addCircleScan(option1)

        const points = [
            104.08055789083461,
            30.642949020712404,
            -0.00416811510864983,

            104.08055789083461,
            30.642949020712404,
            1000,
        ]
        self.app.part.addFlowLine(points)

        const pointsText = Cesium.Cartesian3.fromDegrees(104.07721790813571, 30.644404672369557, 100)
        self.app.innerGeometry.addIcon(pointsText, '东城区')

        const pointsText1 = Cesium.Cartesian3.fromDegrees(104.06950857297834, 30.635728818649884, 100)
        self.app.innerGeometry.addIcon(pointsText1, '西城区')

        let center = {lon: 104.05696940937665, lat: 30.640501148524567}

        let cities = [
            {'lon': 104.07180146590125, 'lat': 30.62297101822975,},
            {'lon': 104.04901932448976, 'lat': 30.616076052494645,},
        ]
        this.app.part.addFlyLine3D(center, cities)
        let fireP = [104.08179081232309, 30.645729442770694, -0.0020558347525613716,]
        let pF = new ParticleSystems(this.app) // 粒子系统
        pF.init(fireP)

        // 飞机
        this.app.load3DModel.loadGLB()

    }
}
