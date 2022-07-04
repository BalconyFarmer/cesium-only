

export default class Cesium3DTileset {
    constructor (app) {
        this.app = app
    }

    /**
     * 加载纽约Tiles数据
     */
    toYN () {

        const tileset = this.app.viewer.scene.primitives.add(
            new Cesium.Cesium3DTileset({
                url: Cesium.IonResource.fromAssetId(75343),
            })
        );

        // 纽约
        const aim = {
            x: 1332693.6981569321,
            y:  -4654770.647244064,
            z: 4139068.9734864207,
            heading:1.9009852161261573,
            pitch: -0.6070396640260713,
            roll: 6.283170210880244,
            duration: 1,
        }
        this.app.cameraFlyToCartesian3(aim)

    }

    /**
     * 加载本地3D tiles 文件
     */
    addTiles () {
        let tileset = this.app.viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
            url: (this.app.staticServerAdress + '/3DTiles/building/tileset.json')
        }))
        let cityStyle = new Cesium.Cesium3DTileStyle({
            color: 'rgba(101,113,164, 1)',
            show: true
        })
        let specialCityStyle = new Cesium.Cesium3DTileStyle({
            color: 'rgb(150,253,0)',
            show: true
        })
        const self = this
        tileset.readyPromise.then(function (tileset) {
            let city = self.app.viewer.scene.primitives.add(tileset)
            city.style = cityStyle
            self.app.viewer.zoomTo(tileset, new Cesium.HeadingPitchRange(0.5, -0.2, tileset.boundingSphere.radius * 1.0))
        }).otherwise(function (error) {
            console.log(error)
        })
    }
}
