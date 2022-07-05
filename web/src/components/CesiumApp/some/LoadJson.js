import xsbnjson from './Json/西双版纳傣族自治州'
import yn from './Json/yn.json'
export default class LoadJson {
    constructor(app) {
        this.app = app
        this.traceLayer = null
    }

    /**
     * 加载云南JSON
     */
    loadJsonData(URL) {
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

    /**
     * geoJson 掩模
     */
    loadJsonYanMo () {
        const self = this
        _c_add_geojson_area(yn)

        function _c_add_geojson_area(geojson) {
            let arr = []
            geojson.features[0].geometry.coordinates[0][0].forEach(item => {
                arr.push(item[0])
                arr.push(item[1])
            });
            console.log(arr);
            let polygonWithHole = new Cesium.PolygonGeometry({
                polygonHierarchy: new Cesium.PolygonHierarchy(
                    Cesium.Cartesian3.fromDegreesArray([73.0, 53.0, 73.0, 0.0, 135.0, 0.0, 135.0, 53.0]),
                    [new Cesium.PolygonHierarchy(Cesium.Cartesian3.fromDegreesArray(arr))]
                )
            });
            let geometry = Cesium.PolygonGeometry.createGeometry(polygonWithHole);
            let instances = [];
            instances.push(new Cesium.GeometryInstance({
                geometry: geometry,
                attributes: {
                    color: Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.fromCssColorString("#1bf600"))
                }
            }));

            function addRect(instances, left, down, right, up) {
                instances.push(new Cesium.GeometryInstance({
                    geometry: new Cesium.RectangleGeometry({
                        rectangle: Cesium.Rectangle.fromDegrees(left, down, right, up)
                    }),
                    attributes: {
                        color: Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.fromCssColorString("#081122"))
                    }
                }));
            }

            addRect(instances, -180.0, -90.0, 73.0, 90.0);
            addRect(instances, 135.0, -90.0, 180.0, 90.0);
            addRect(instances, 73.0, 53.0, 135.0, 90.0);
            addRect(instances, 73.0, -90.0, 135.0, 0.0);
            self.app.viewer.scene.primitives.add(new Cesium.Primitive({
                geometryInstances: instances,
                appearance: new Cesium.PerInstanceColorAppearance({
                    flat: true,
                    translucent: false
                })
            }));
        }

    }

    removeJson() {
        this.app.viewer.dataSources.remove(this.traceLayer);
    }


}
