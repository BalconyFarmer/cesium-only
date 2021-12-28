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
        this.app.cesium3DTileset.addTiles()
        const aim = {
            x: -1332091.1947445858,
            y: 5327715.718829383,
            z: 3241250.700497874,
            heading: 2.7068407153634686,
            pitch: -0.5225413080629986,
            roll: 6.2830076707588995,
            duration: 3,
        }
        this.app.cameraFlyToCartesian3(aim)

        const aim1 = {
            x: -1335650.7543657143,
            y: 5327186.609873566,
            z: 3232969.4880313054,
            heading: 2.464077977287265,
            pitch: -0.38924437417452307,
            roll: 0.00001352269589993682,
            duration: 3,
        }

        setTimeout(function () {
            self.app.cameraFlyToCartesian3(aim1)
        }, 6000)

        setTimeout(function () {
            self.app.cameraAutoRoll(aim1)
        }, 9000)

    }
}
