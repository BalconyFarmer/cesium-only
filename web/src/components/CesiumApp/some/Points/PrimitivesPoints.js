import * as turf from '@turf/turf'

/**
 * Primitives 大量点
 * primitives
 */
export default class PrimitivesPoints {
    constructor(app) {
        this.app = app
        this.billboards = null
        this.labels = null
    }

    addManyPoint() {
        const self = this
        this.billboards = this.app.viewer.scene.primitives.add(
            new Cesium.BillboardCollection()
        );

        function addPrimitive(position) {
            self.billboards.add({
                position: position,
                image: require("./icon/摄像头.png"),
                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                scale: 0.1,
            });
        }

        let points = turf.randomPoint(10000, {bbox: [-10, -10, 10, 10]});
        let features = points.features;
        let feature, geom, coordinates, position;

        for (let i = 0; i < features.length; i++) {
            feature = features[i];
            geom = feature.geometry;
            coordinates = geom.coordinates;
            position = Cesium.Cartesian3.fromDegrees(
                coordinates[0],
                coordinates[1],
                0
            );
            addPrimitive(position);
        }

        this.labels = this.app.viewer.scene.primitives.add(
            new Cesium.LabelCollection()
        );

        function addPrimitive1(position, i) {
            self.labels.add({
                position: position,
                text: i.toString()
            });
        }

        for (let i = 0; i < features.length; i++) {
            feature = features[i];
            geom = feature.geometry;
            coordinates = geom.coordinates;
            position = Cesium.Cartesian3.fromDegrees(
                coordinates[0],
                coordinates[1],
                0
            );
            addPrimitive1(position, i);
        }
    }

    removePoint() {
        this.billboards.destroy()
        this.labels.destroy()
    }

}
