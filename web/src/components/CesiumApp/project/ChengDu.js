import ParticleSystems from '../some/ParticleSystems'


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
        this.app.switchLayer('geoq智图黑')
        // this.app.updateLyerLight(0.5, 0.5)
        // this.app.cesium3DTileset.addTiles()

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

        const points1 = [
            104.07467185705768,
            30.616055917995904,
            -0.007629316102345219,
            104.07430138967433,
            30.622748646480712,
            -0.005523915179473804,
            104.09266729143657,
            30.623561610378665,
            -0.005830162188858496,
            104.09708344165846,
            30.629093781029326,
            -0.004778831731137613,
            104.09256817183005,
            30.631735359048665,
            -0.002083572838517207,
        ]
        self.app.part.addRoad(points1)

        const p1 = Cesium.Cartesian3.fromDegrees(points1[0], points1[1], points1[2])
        self.app.innerGeometry.addIconBackground(p1, '东城区',1)
        const p2 = Cesium.Cartesian3.fromDegrees(points1[3], points1[4], points1[5])
        self.app.innerGeometry.addIconBackground(p2, '东城区',2)
        const p3 = Cesium.Cartesian3.fromDegrees(points1[6], points1[7], points1[8])
        self.app.innerGeometry.addIconBackground(p3, '东城区',3)
        const p4 = Cesium.Cartesian3.fromDegrees(points1[9], points1[10], points1[11])
        self.app.innerGeometry.addIconBackground(p4, '东城区',4)
        const p5 = Cesium.Cartesian3.fromDegrees(points1[12], points1[13], points1[14])
        self.app.innerGeometry.addIconBackground(p5, '东城区',5)

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

        this.playAction()
    }

    playAction() {
        const self = this
        // const timeLine = [5, 5000]
        const timeLine = [1, 1]
        const aim1 = {
            x: -1338321.7464392497,
            y: 5329474.532445264,
            z: 3229041.9376813835,
            heading: 5.7977479212520215,
            pitch: -0.39876678765253337,
            roll: 0.000022821565860198234,
            duration: timeLine[0],
        }
        const roll = {
            x: -1337126.1635365186,
            y: 5328767.971408051,
            z: 3230869.2133927033,
            heading: 5.775718978187101,
            pitch: -0.8876621716896604,
            roll: 0.00006925544464131406,
            duration: timeLine[0],
        }
        self.app.cameraAutoRoll(roll)
        setTimeout(function () {
            self.app.cameraFlyToCartesian3(aim1)
        }, timeLine[1])
    }
}
