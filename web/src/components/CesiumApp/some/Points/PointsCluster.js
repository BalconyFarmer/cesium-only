/**
 * 普通聚合点
 */
export default class PointsCluster {
    constructor(app) {
        this.app = app
        this.kmlDataSource = null
        this.dataSource = null
        this.initCluster()
    }

    initCluster() {
        this.dataSource = new Cesium.CustomDataSource('myData');

        let options = {
            camera: this.app.viewer.camera,
            canvas: this.app.viewer.canvas,
            clampToGround: true
        }
        this.dataSource.clustering.enabled = true

        this.dataSource.clustering.clusterBillboards = true
        this.dataSource.clustering.clusterLabels = true
        this.dataSource.clustering.clusterPoints = true

        this.dataSource.clustering.shows = true
        this.dataSource.clustering.minimumClusterSize = 50 // 获取或设置可以聚集的最小屏幕空间对象数。
        this.dataSource.clustering.pixelRange = 80; // 获取或设置像素范围以扩展屏幕空间边界框。
        this.app.viewer.dataSources.add(this.dataSource);

        // The default cluster values.
        this.dataSource.clustering.clusterEvent.addEventListener(function (entities, cluster) {
            cluster.label.show = true;
            cluster.label.text = entities.length.toLocaleString();
        });

    }

    /**
     * 添加警员图标
     */
    addIcon1() {
        const _po =  new Cesium.Cartesian3 (-1105278.8189427508, 5813492.798393301, 2371578.8509780252)
        const result = this.dataSource.entities.add({
            type: "默认",
            name: "+++++++++++",
            allData: "allData",
            position: _po,
            billboard: {
                image: require("./icon/摄像头.png"),
                width: 60,
                height: 60,
                scale: 0.5,
                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                heightReference: Cesium.HeightReference.CLAMP_TO_GROUND, //CLAMP_TO_GROUND   RELATIVE_TO_GROUND
                clampToGround: true,
            },
        })
        debugger
    }


    addPoint() {


    }

    removePoint() {

    }

}
