/**
 * 上海展示项目
 */
export default class Shanghai {
    constructor(app) {
        this.app = app
        this.init()
    }


    init() {
        this.app.switchLayer('百度地图')
        this.app.loadJson.loadJsonRoad()

        let po = new Cesium.Cartesian3  (-2851667.578771356, 4653872.950938622, 3288949.340711588)
        let url = "http://localhost:1111/3Dstatic/uploadDefault/2022076/16570982069192171.glb"
        this.app.load3DModel.loadGlbByURL(po, url)

        this.playAction()
    }

    playAction() {
        const aim = {
            x: -2854097.8249831186,
            y: 4657768.610404864,
            z: 3288074.879931185,
            heading: 0.017621843547119376,
            pitch: -0.9939966994909168,
            roll: 0.00008748848795825381,
            duration: 1,
        }
        this.app.cameraFlyToCartesian3(aim)
    }

}
