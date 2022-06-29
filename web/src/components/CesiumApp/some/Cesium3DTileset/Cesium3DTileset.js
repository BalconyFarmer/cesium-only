

export default class Cesium3DTileset {
    constructor (app) {
        this.app = app
    }

    /**
     * 加载纽约Tiles数据
     */
    toYN () {
/*        // 设置camera
        // 1. Set position with a top-down view
        this.app.viewer.camera.flyTo({
            destination: Cesium.Cartesian3.fromDegrees(-73.940159, 40.800621, 2000.0),
            orientation: {
                heading: Cesium.Math.toRadians(0), // east, default value is 0.0 (north) 左右摆头
                pitch: Cesium.Math.toRadians(-45), // default value (looking down) 上下摆头 -90俯视 0 平视
                roll: 0.0 // default value
            }
        })

        // 添加瓦片数据 (纽约)
        let city = this.app.viewer.scene.primitives.add(new Cesium.Cesium3DTileset({url: Cesium.IonResource.fromAssetId(75343)}))
        let cityStyle = new Cesium.Cesium3DTileStyle({
            color: 'color(\'blue\',0.2)',
            show: true
        })
        city.style = cityStyle*/


        const tileset = this.app.viewer.scene.primitives.add(
            new Cesium.Cesium3DTileset({
                url: Cesium.IonResource.fromAssetId(75343),
            })
        );

        this.app.viewer.zoomTo(tileset)
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
