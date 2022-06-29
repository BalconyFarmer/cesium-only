

export default class LoadJson {
    constructor (app) {
        this.app = app
        this.traceLayer = null
    }

    /**
     * 加载云南JSON
     */
    loadJsonData (URL) {
        if (this.traceLayer) {
            this.removeJson()
            this.traceLayer = null
        } else {
            const self = this
            // 还在geoJson数据 ()
            Cesium.GeoJsonDataSource.load(this.app.staticServerAdress + URL).then(function (dataSource) {
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
