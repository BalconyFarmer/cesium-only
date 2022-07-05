/**
 * 成都展示项目
 */
export default class ChengDu {
    constructor(app) {
        this.app = app
        this.init()
    }


    init() {

        this.app.cesium3DTileset.toYN()

        const self = this
        this.app.closeAll()
        this.app.switchLayer('geoq智图黑')
        this.app.addTerrain()

        // const option = {
        //     lon: -73.97878241014695, lat: 40.70785622096727, radius: 200
        // }
        // self.app.part.addRadarScan(option)

        // const option1 = {
        //     lon: -73.98218114891942, lat: 40.70363723511191, radius: 200
        // }
        // self.app.part.addCircleScan(option1)

        const postis = Cesium.Cartesian3.fromDegreesArrayHeights([-73.98096918694948, 40.71347121404583, 10,

            -73.98064234035269, 40.710810644175126, 10,

            -73.98376494950466, 40.71060520020592, 10,

            -73.98369206871496, 40.71324709275526, 10,

            -73.98096918694948, 40.71347121404583, 10,])
        self.app.part.addFlowWall(postis)

        const points = [-73.98096918694948, 40.71347121404583, -0.00416811510864983,

            -73.98096918694948, 40.71347121404583, 500,]
        self.app.part.addFlowLine(points)

        const points1 = [-73.97642958554202, 40.71495073374601, -0.001991019097634711, -73.97911696114362, 40.71575540376539, -0.0020569811427806534, -73.97997043813011, 40.714003701262484, -0.001932367920888469,]
        self.app.part.addRoad(points1)

        const p1 = Cesium.Cartesian3.fromDegrees(points1[0], points1[1], points1[2])
        self.app.innerGeometry.addIconBackground(p1, 'NEW', 1)
        const p2 = Cesium.Cartesian3.fromDegrees(points1[3], points1[4], points1[5])
        self.app.innerGeometry.addIconBackground(p2, 'YORK', 2)
        const p3 = Cesium.Cartesian3.fromDegrees(points1[6], points1[7], points1[8])
        self.app.innerGeometry.addIconBackground(p3, '11', 3)

        let center = {lon: -73.97041132537504, lat: 40.70616824536892,}

        let cities = [{'lon': -73.96303919879395, 'lat': 40.71032473293702,}, {
            'lon': -73.96999337911545,
            'lat': 40.71335210350552,
        },]
        this.app.part.addFlyLine3D(center, cities)


        // 原地踏步人
        const poPer = Cesium.Cartesian3.fromDegrees(-73.97041132537504, 40.70616824536892, 10)
        const movePeople = this.app.load3DModel.loadGltf(poPer)
        this.app.viewer.entities.add(movePeople)
        // 移动小车
        let data = [-73.97041132537504, 40.70616824536892, -0.002239088567849463,]
        this.app.load3DModel.loadGlbPrimitives(data)
        // 飞机
        const poAirPlane = [-73.97041132537504, 40.70616824536892, 100]
        this.app.load3DModel.loadGLB(poAirPlane)

        // this.playAction()
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
