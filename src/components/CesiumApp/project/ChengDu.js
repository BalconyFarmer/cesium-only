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
        // const timeLine = [10, 10000]
        const timeLine = [1, 1]
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
            duration: timeLine[0],
        }
        self.app.cameraAutoRoll(aim1)

        setTimeout(function () {
            self.app.cameraFlyToCartesian3(aim1)
        }, timeLine[1])

        const option = {
            lon: 104.08518355581377,
            lat: 30.632540812118847,
            radius: 200
        }
        self.app.part.addRadarScan(option)

        const option1 = {
            lon: 104.08077683485338,
            lat: 30.635968171376696,
            radius: 300
        }
        self.app.part.addCircleScan(option1)

        const postis = Cesium.Cartesian3.fromDegreesArrayHeights([
            104.08910823719758,
            30.62842929898083, 10.0,

            104.08814901806453,
            30.62608460511913, 10.0,

            104.08463898581485,
            30.626111794674216, 10.0,

            104.08476936742238,
            30.628519360788516, 10.0,

            104.08910823719758,
            30.62842929898083, 10.0,
        ])
        self.app.part.addFlowWall(postis)

        const points = [
            104.09228987915748,
            30.631370714909295,
            -0.00416811510864983,

            104.09228987915748,
            30.631370714909295,
            500,
        ]
        self.app.part.addFlowLine(points)

        const pointsText = Cesium.Cartesian3.fromDegrees(104.08712967931928,
            30.63687154105514, 100)
        self.app.innerGeometry.addIcon(pointsText, '东城区')

        const pointsText1 = Cesium.Cartesian3.fromDegrees(104.08996739118568,
            30.643222273024914, 100)
        self.app.innerGeometry.addIcon(pointsText1, '西城区')

        let center = {lon: 104.07842873842652, lat: 30.63258965135834,}

        let cities = [
            {'lon': 104.07445200121597, 'lat': 30.623338996273173,},
            {'lon': 104.08148794273148, 'lat': 30.623739056793006,},
        ]
        this.app.part.addFlyLine3D(center, cities)

        this.app.addBloom()

        // 主体大楼
        let po = new Cesium.Cartesian3(-1337050.0939715588, 5327975.599743687, 3230367.8019681093)
        let htr = [0, 0, 0]
        const mo = this.app.load3DModel.loadGlb(po, htr)
        this.app.viewer.entities.add(mo)
        // 原地踏步人
        const poPer = Cesium.Cartesian3.fromDegrees(104.0884177825623, 30.62721695985099, 0)
        const movePeople = this.app.load3DModel.loadGltf(poPer)
        this.app.viewer.entities.add(movePeople)
        // 移动小车
        let data = [104.088629853244, 30.627623370523818, -0.002239088567849463,]
        this.app.load3DModel.loadGlbPrimitives(data)
        // 飞机
        const poAirPlane = [104.0884625472979, 30.629946234239107, 100]
        this.app.load3DModel.loadGLB(poAirPlane)
    }
}
