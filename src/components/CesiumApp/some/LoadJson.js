import * as Cesium from 'cesium/Cesium'
import * as widget from 'cesium/Widgets/widgets.css'

export default class LoadJson {
    constructor (app) {
        this.app = app
        this.traceLayer = null
    }

    /**
     * 加载云南JSON
     */
    loadJsonData () {
        if (this.traceLayer) {
            this.removeJson()
            this.traceLayer = null
        } else {
            const self = this
            // 还在geoJson数据 ()
            Cesium.GeoJsonDataSource.load(this.app.staticServerAdress + '/geoJson/云南省.json').then(function (dataSource) {
                self.app.viewer.dataSources.add(dataSource).then(res => {
                    const test = res
                    test.name = '测试'
                    self.traceLayer = dataSource
                })
            })
            this.app.cameraFlyTo(101.315555, 24.613368, 182000.0)
        }
    }

    removeJson() {
        this.app.viewer.dataSources.remove(this.traceLayer);
    }


}
