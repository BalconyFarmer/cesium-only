export default class Cesium3DTileset {
    constructor(app) {
        this.app = app
    }

    /**
     * 加载纽约Tiles数据
     */
    toYN() {
        // 纽约
        const aim = {
            x: 1334250.326742833,
            y: -4654288.617371429,
            z: 4139340.2364981323,
            heading: 2.049268611669648,
            pitch: -0.42665985222008507,
            roll: 0.0000030846742866685872,
            duration: 1,
        }
        this.app.cameraFlyToCartesian3(aim)

        const tileset = this.app.viewer.scene.primitives.add(
            new Cesium.Cesium3DTileset({
                url: Cesium.IonResource.fromAssetId(75343),
                maximumNumberOfLoadedTiles: 1000, // 最大加载瓦片个数
                maximumMemoryUsage: 100,// 最大使用内存 单位M 默认值： 512
                maximumScreenSpaceError: 50, //最大的屏幕空间误差 默认值： 16
            })
        );

        // const see = tileset
        // console.log(see)
        // debugger

        tileset.style = new Cesium.Cesium3DTileStyle({
            color: {
                conditions: [
                    ['true', 'rgba(0, 127.5, 255 ,0.2)']
                ]
            }
        });
    }

}
