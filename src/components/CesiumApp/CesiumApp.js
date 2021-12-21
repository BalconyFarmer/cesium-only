import * as Cesium from 'cesium/Cesium'
import * as widget from 'cesium/Widgets/widgets.css'
import Part from './some/Part/Part'
import ObliquePhotography from './some/ObliquePhotography/ObliquePhotography'
import Cesium3DTileset from './some/Cesium3DTileset/Cesium3DTileset'
import LoadJson from './some/LoadJson'
import Load3DModel from './some/Load3DModel'
import {initFlowMatetial} from "./some/Part/_PolylineTrailLinkMaterialProperty"

export default class CesiumApp {
    constructor () {
        this.staticServerAdress = 'http://localhost:1111/3Dstatic/loadData'
        this.viewer = null
        this.Cesium = Cesium
        this.part = new Part(this)
        this.obliquePhotography = new ObliquePhotography(this)
        this.cesium3DTileset = new Cesium3DTileset(this)
        this.loadJson = new LoadJson(this)
        this.load3DModel = new Load3DModel(this)
    }

    /**
     * 初始化3D基础场景
     */
    initMap () {
        initFlowMatetial()
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
            shouldAnimate: true, //动画播放
            // skyBox: false, // 关闭天空
            // skyAtmosphere: false, // 关闭大气
        }
        this.viewer = new this.Cesium.Viewer('cesiumContainer', option)

        window.viewer = this.viewer
        console.log('viewer: ', this.viewer.scene.globe.enableLighting)

        this.viewer.scene.globe.enableLighting = false // 初始化光照

        this.viewer.scene.fog.enabled = false

        // 首次加载完成回调
        const self = this
        const helper = new this.Cesium.EventHelper()
        helper.add(this.viewer.scene.globe.tileLoadProgressEvent, (number) => {
            if (number > 0) {
                return
            }
            if (self.firstIndex) {
            } else {
                setTimeout(function () {
                    // self.addTimeAction()
                }, 500)
            }
            self.firstIndex = true
        })

        this.viewer.imageryLayers.get(0).show = false;//不显示底图
        this.viewer.scene.globe.baseColor = Cesium.Color.WHITE;//设置地球颜色
    }

    /**
     * time
     */
    addTimeAction () {
        this.load3DModel.addModel()
        this.part.addIcon()
        this.part.addGeometry()
        this.part.addFlowLine()
        this.part.addCircleScan()
        this.part.addRadarScan()
        this.part.addFlyLine3D()
    }

    /**
     * 开启关闭全球光照系统
     */
    switchLight () {
        if (this.viewer.scene.globe.enableLighting) {
            this.viewer.scene.globe.enableLighting = false // 初始化光照
        } else {
            this.viewer.scene.globe.enableLighting = true // 初始化光照
        }
    }

    /**
     * 添加实景影像图层
     */
    addImageryProviderLayerReal () {
        // t3fbd4010a8d2c73901a21c42efe3d2c0 天地图key

        this.viewer.imageryLayers.removeAll() // 清除所有图层

        // google实景
        const Imagery = new Cesium.UrlTemplateImageryProvider({
            url: 'http://mt1.google.cn/vt/lyrs=s&hl=zh-CN&x={x}&y={y}&z={z}&s=Gali'
        })

        // ArcGis
        // const Imagery = new Cesium.ArcGisMapServerImageryProvider({
        //     url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer',
        //     enablePickFeatures: false
        // });

        var noteLayer = new Cesium.WebMapTileServiceImageryProvider({
            url: 'http://t0.tianditu.gov.cn/cia_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cia&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=837264f46e683ec982d452e78d71052e',
            layer: 'tdtBasicLayer',
            style: 'default',
            maximumLevel: 20,
            format: 'image/png',
            tileMatrixSetID: 'GoogleMapsCompatible',
            show: true
        })

        this.viewer.imageryLayers.addImageryProvider(Imagery)
        // this.viewer.imageryLayers.addImageryProvider(noteLayer)

    }

    /**
     * 添加普通地图图层
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

        if (this.viewer) {
            this.viewer.imageryLayers.addImageryProvider(this.Imagery)
        }
    }

    /**
     * 点击地图console位置
     */
    addEvent () {
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
            console.log(lon + ',', lat + ',', height1 + ',', '当前选取: 经度 纬度 高度...')
            console.log(self.viewer.camera.position, self.viewer.camera.heading, self.viewer.camera.pitch, self.viewer.camera.roll, '当前摄像机视角')

            // 选取模型 事件
            var pick = self.viewer.scene.pick(event.position)
            console.log(pick, 'pick-pick-pick-pick-pick')
            if (Cesium.defined(pick) && (pick.id === 'rectangle-1')) {
                alert('矩形被选取')
            }
        }, this.Cesium.ScreenSpaceEventType.LEFT_CLICK)

        this.viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);

    }

    /**
     * 相机飞行至
     * @param x 经纬高
     * @param y
     * @param z
     */
    cameraFlyTo (x, y, z, heading, pitch) {
        this.viewer.camera.flyTo({// 设置视角
            destination: this.Cesium.Cartesian3.fromDegrees(x, y, (z + 10)),
            orientation: {
                heading: this.Cesium.Math.toRadians(heading || 0), // east, default value is 0.0 (north) 左右摆头
                pitch: this.Cesium.Math.toRadians(pitch || -90), // default value (looking down) 上下摆头 -90俯视 0 平视
                roll: 0.0 // default value
            }
        })

    }

    cameraFlyToCartesian3 (x, y, z, heading, pitch, roll) {
        let cartesian3 = new Cesium.Cartesian3(x, y, z)
        this.viewer.camera.flyTo({
            destination: cartesian3,
            orientation: {
                heading: heading, // east, default value is 0.0 (north) 左右摆头
                pitch: pitch, // default value (looking down) 上下摆头 -90俯视 0 平视
                roll: roll // default value
            }
        })
    }
}
