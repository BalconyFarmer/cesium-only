import xsbnjson from './Json/西双版纳傣族自治州'
import yn from './Json/yn.json'
import shanghai from './Json/shanghai.json'

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
    loadJsonYanMo() {
        const self = this
        _c_add_geojson_area(yn) // xsbnjson yn

        function _c_add_geojson_area(geojson) {
            let arr = []
            geojson.features[0].geometry.coordinates[0][0].forEach(item => {
                arr.push(item[0])
                arr.push(item[1])
            });
            console.log(arr);
            // 矩形对角点 左上 右下 最后一位必须是0
            let xiePoint = [-159.133489, 72.649578, -48.21552, 0,] // 美国
            // let xiePoint = [70.436823,50.826368,130.729792,0] // 中国

            // 左上 左下 右下 右上 (!!!!必须是正方形) JSON数据在正方形里
            let points = [xiePoint[0], xiePoint[1], xiePoint[0], xiePoint[3], xiePoint[2], xiePoint[3], xiePoint[2], xiePoint[1]]
            let polygonWithHole = new Cesium.PolygonGeometry({
                polygonHierarchy: new Cesium.PolygonHierarchy(
                    Cesium.Cartesian3.fromDegreesArray(points),
                    [new Cesium.PolygonHierarchy(Cesium.Cartesian3.fromDegreesArray(arr))]
                )
            });
            let geometry = Cesium.PolygonGeometry.createGeometry(polygonWithHole);
            let instances = [];
            instances.push(new Cesium.GeometryInstance({
                geometry: geometry,
                attributes: {
                    color: Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.fromCssColorString("#081122"))
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

            addRect(instances, -180.0, -90.0, points[0], 90.0);
            addRect(instances, points[4], -90.0, 180.0, 90.0);
            addRect(instances, points[0], points[1], points[4], 90.0);
            addRect(instances, points[0], -90.0, points[4], 0.0);
            self.app.viewer.scene.primitives.add(new Cesium.Primitive({
                geometryInstances: instances,
                appearance: new Cesium.PerInstanceColorAppearance({
                    flat: true,
                    translucent: false
                })
            }));
        }

    }

    /**
     * 闪光道路
     */
    loadJsonRoad() {
        const see = shanghai
        shanghai.features.forEach((item,index) => {
            if (index < 100) {
                let points1 = []
                item.geometry.coordinates[0].forEach(item1 => {
                    points1.push(item1[0])
                    points1.push(item1[1])
                    points1.push(0)
                })
                this.app.part.addRoad(points1)
            }

        })
    }

    removeJson() {
        this.app.viewer.dataSources.remove(this.traceLayer);
    }


}
