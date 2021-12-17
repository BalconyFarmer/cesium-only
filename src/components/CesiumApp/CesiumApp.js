import * as Cesium from 'cesium/Cesium'
import * as widget from 'cesium/Widgets/widgets.css'
import Part from './Part'

export default class CesiumApp {
    constructor () {
        this.viewer = null
        this.Cesium = Cesium
        this.part = new Part(this)
    }

    /**
     * 初始化3D基础场景
     */
    initMap () {
        this.addImageryProviderLayerNormal()

        // 加载地形数据
        let terrainProvider = this.Cesium.createWorldTerrain(
            {
                requestWaterMask: true,
                requestVertexNormals: true
            }
        )

        const option = {
            animation: false, // 如果设置为false,则不会创建'动画'小部件。
            contextOptions: {
                webgl: {
                    alpha: true
                }
            },
            baseLayerPicker: false, // 如果设置为false,则不会创建BaseLayerPicker小部件。
            fullscreenButton: false, // 如果设置为false,将不会创建FullscreenButton小部件。
            vrButton: false, // 如果设置为true,将创建VRButton小部件。
            // geocoder: false, // 搜索
            homeButton: false, //
            infoBox: false, //
            sceneModePicker: false, //
            selectionIndicator: false, //
            timeline: false, //
            navigationHelpButton: false, //
            imageryProvider: this.Imagery, //  影像图层
            terrainProvider: terrainProvider, // 地形图层,
            shouldAnimate : true //动画播放

        }
        this.viewer = new this.Cesium.Viewer('cesiumContainer', option)


        window.viewer = this.viewer
        console.log('viewer: ', this.viewer.scene.globe.enableLighting)

        this.viewer.scene.globe.enableLighting = true; // 初始化光照

        // 首次加载完成回调
        const helper = new this.Cesium.EventHelper()
        helper.add(this.viewer.scene.globe.tileLoadProgressEvent, (number) => {
            if (number > 0) {
                return
            }
            if (this.firstIndex) {
            } else {
                this.part.toYN()
            }
            this.firstIndex = true
        })
    }

    /**
     * 开启关闭全球光照系统
     */
    switchLight() {
        if (this.viewer.scene.globe.enableLighting) {
            this.viewer.scene.globe.enableLighting = false; // 初始化光照
        } else {
            this.viewer.scene.globe.enableLighting = true; // 初始化光照
        }
    }

    /**
     * 添加google实景影像图层
     */
    addImageryProviderLayerReal () {
        // t3fbd4010a8d2c73901a21c42efe3d2c0 天地图key

        this.viewer.imageryLayers.removeAll() // 清除所有图层

        // google实景
        const Imagery = new Cesium.UrlTemplateImageryProvider({
            url: 'http://mt1.google.cn/vt/lyrs=s&hl=zh-CN&x={x}&y={y}&z={z}&s=Gali'
        })

        // 高德 细化无贴图
        // var Imagery = new Cesium.UrlTemplateImageryProvider({
        //     url: 'https://webst0{s}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
        //     tilingScheme:new Cesium.WebMercatorTilingScheme(),
        //     subdomains: '1234',
        // });

        // from ion
        // const Imagery= new Cesium.IonImageryProvider({
        //     assetId: 3,
        //     accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJhMTg2Mzk0My02NWJmLTQ1ODgtOWRiMy0wODM1ZTkwNGM1NTYiLCJpZCI6MjM0NzYsInNjb3BlcyI6WyJhc2wiLCJhc3IiLCJhc3ciLCJnYyJdLCJpYXQiOjE1ODM0NjEyMDN9.qXnJKCaIHS7JkIPRySJmmbdHvyj1ihQ2CI3itKy9MvY'
        // })

        this.viewer.imageryLayers.addImageryProvider(Imagery)
    }

    /**
     * 添加sampl实景影像图层
     */
    addImageryProviderLayerNormal () {
        if (this.viewer) {
            this.viewer.imageryLayers.removeAll() // 清除所有图层
        }

        // Access the CartoDB Positron basemap, which uses an OpenStreetMap-like tiling scheme.
        this.Imagery = new Cesium.UrlTemplateImageryProvider({
            url: 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
            credit: 'Map tiles by CartoDB, under CC BY 3.0. Data by OpenStreetMap, under ODbL.'
        })

        // this.Imagery = new Cesium.UrlTemplateImageryProvider({
        //     url: 'https://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}',
        //     credit: 'Map tiles by CartoDB, under CC BY 3.0. Data by OpenStreetMap, under ODbL.'
        // })

        if (this.viewer) {
            this.viewer.imageryLayers.addImageryProvider(this.Imagery)
        }
    }




    /**
     * 点击地图console位置
     */
    getPosition () {
        const self = this
        let handler = new this.Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas)
        handler.setInputAction(function (event) {
            // // 屏幕坐标转世界坐标——关键点
            let ray = self.viewer.camera.getPickRay(event.position)
            let cartesian = self.viewer.scene.globe.pick(ray, self.viewer.scene)

            // //将笛卡尔坐标转换为地理坐标
            let cartographic = self.Cesium.Cartographic.fromCartesian(cartesian)
            // //将弧度转为度的十进制度表示
            let lon = self.Cesium.Math.toDegrees(cartographic.longitude)
            let lat = self.Cesium.Math.toDegrees(cartographic.latitude)
            // // 获取海拔高度
            let height1 = self.viewer.scene.globe.getHeight(cartographic)
            let height2 = cartographic.height
            console.log(lon+",", lat+",", height1+",", '当前选取: 经度 纬度 高度...')
        }, this.Cesium.ScreenSpaceEventType.LEFT_CLICK)
    }

    /**
     * 相机飞行至
     * @param x
     * @param y
     * @param z
     */
    cameraFlyTo(x,y,z) {
        this.viewer.camera.flyTo({// 设置视角
            destination: this.Cesium.Cartesian3.fromDegrees(x,y,(z+10)),
            orientation: {
                heading: this.Cesium.Math.toRadians(0), // east, default value is 0.0 (north) 左右摆头
                pitch: this.Cesium.Math.toRadians(-90), // default value (looking down) 上下摆头 -90俯视 0 平视
                roll: 0.0 // default value
            }
        })
    }
}
