import * as THREE from 'three'
import * as Cesium from 'cesium/Cesium'
import * as widget from 'cesium/Widgets/widgets.css'
import CustomStyle from './some/CustomStyle/CustomStyle'
import ObliquePhotography from './some/ObliquePhotography/ObliquePhotography'
import Cesium3DTileset from './some/Cesium3DTileset/Cesium3DTileset'
import LoadJson from './some/LoadJson'
import Load3DModel from './some/Load3DModel'
import {initFlowMatetial} from './some/CustomStyle/_PolylineTrailLinkMaterialProperty'
import InnerGeometry from './some/InnerGeometry/InnerGeometry'
import Event from './some/Event'
import ParticleSystems from './some/ParticleSystems'
import CustomShaderTest from './some/CustomStyle/CustomShaderTest'
import ChengDu from './project/ChengDu'

export default class CesiumApp {
    constructor () {
        this.staticServerAdress = 'http://localhost:1111/3Dstatic/loadData'
        this.viewer = null
        this.option = null
        this.Cesium = Cesium
        this.part = new CustomStyle(this)
        this.obliquePhotography = new ObliquePhotography(this)
        this.cesium3DTileset = new Cesium3DTileset(this)
        this.loadJson = new LoadJson(this)
        this.load3DModel = new Load3DModel(this)
        this.innerGeometry = new InnerGeometry(this)
        this.eventCenter = new THREE.EventDispatcher() // 3D事件中心
        this.event = null
        this.particleSystems = null
        this.customShaderTest = null
    }

    /**
     * 初始化3D基础场景
     */
    initMap () {
        initFlowMatetial()
        this.switchLayer('3D模式')
        this.option = {
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
            // terrainProvider: terrainProvider, // 地形图层,
            shouldAnimate: true, //动画播放
            // skyBox: false, // 关闭天空
            // skyAtmosphere: false, // 关闭大气
            SceneModePicker: '2D'
        }
        this.viewer = new this.Cesium.Viewer('cesiumContainer', this.option)
        this.viewer.scene.globe.enableLighting = false // 初始化光照
        this.viewer.scene.fog.enabled = false // 烟雾效果
        this.viewer.scene.debugShowFramesPerSecond = true // 帧率显示框
        this.event = new Event(this)
        this.switchViewMode('3D模式')
        this.addTerrain()
        this.firstCallBack()
        window.viewer = this.viewer
    }

    /**
     * run
     * 效果演示时间线
     */
    addTimeAction () {
        this.load3DModel.addModel()
        this.innerGeometry.addIcon()
        this.innerGeometry.addGeometry()
        this.part.addFlowLine()
        this.part.addCircleScan()
        this.part.addRadarScan()
        this.part.addFlyLine3D()
        this.getViewerEntitys()
        this.particleSystems = new ParticleSystems(this) // 粒子系统
        this.customShaderTest = new CustomShaderTest(this) // 自定义着色器
    }

    /**
     * 成都项目时间线
     */
    runChengDu () {
        new ChengDu(this)
    }

    /**
     * 首次加载完成回调
     */
    firstCallBack () {
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
    }

    /**
     * 调整亮度
     * @param data
     */
    updateBrightness (value) {
        let stages = this.viewer.scene.postProcessStages
        this.viewer.scene.brightness = this.viewer.scene.brightness || stages.add(Cesium.PostProcessStageLibrary.createBrightnessStage())
        this.viewer.scene.brightness.enabled = true
        this.viewer.scene.brightness.uniforms.brightness = Number(value)
    }

    switchViewMode (data) {
        switch (data) {
            case '2.5D模式':
                this.viewer.scene.mode = Cesium.SceneMode.COLUMBUS_VIEW //哥伦布视图
                break
            case '3D模式':
                this.viewer.scene.mode = Cesium.SceneMode.SCENE3D//3维模式
                break
            case '2D模式':
                this.viewer.scene.mode = Cesium.SceneMode.SCENE2D//2维模式
                break
        }
    }

    /**
     * 添加地形
     */
    addTerrain () {
        // let terrainProvider = new Cesium.CesiumTerrainProvider({
        //     url : 'https://assets.agi.com/stk-terrain/v1/tilesets/world/tiles',
        //     //请求水波纹效果
        //     requestWaterMask: true
        // });

        // 加载地形数据
        let terrainProvider = this.Cesium.createWorldTerrain(
            {
                requestWaterMask: true,
                requestVertexNormals: true
            }
        )
        this.viewer.terrainProvider = terrainProvider
    }

    /**
     * 移除地形
     */
    removeTerrain () {
        this.viewer.scene.terrainProvider = new Cesium.EllipsoidTerrainProvider({})
    }

    /**
     * 开启moveToolTips
     */
    startMoveTips () {
        this.innerGeometry.initMoveToolTips()
        this.event.addMoveToolTip()
    }

    /**
     * 关闭次要效果
     */
    closeAll () {
        this.viewer.imageryLayers.get(0).show = false//不显示底图
        this.viewer.scene.globe.baseColor = Cesium.Color.GRAY//设置地球颜色
        this.viewer.scene.skyAtmosphere.show = false // 关闭大气效果
        this.viewer.scene.skyBox.show = false // 关闭大气效果
        this.viewer.scene.terrainProvider = new Cesium.EllipsoidTerrainProvider({}) // 清除地形

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

    switchLayer (data) {
        // t3fbd4010a8d2c73901a21c42efe3d2c0 天地图key

        if (this.viewer) {
            this.viewer.imageryLayers.removeAll() // 清除所有图层
        }
        let Imagery = null
        switch (data) {
            case 'google实景图层':
                Imagery = new Cesium.UrlTemplateImageryProvider({
                    url: 'http://mt1.google.cn/vt/lyrs=s&hl=zh-CN&x={x}&y={y}&z={z}&s=Gali'
                })
                this.viewer.imageryLayers.addImageryProvider(Imagery)
                break
            case 'ArcGis实景图层':
                Imagery = new Cesium.ArcGisMapServerImageryProvider({
                    url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer',
                    enablePickFeatures: false
                })
                this.viewer.imageryLayers.addImageryProvider(Imagery)
                break
            case '文字图层':
                Imagery = new Cesium.UrlTemplateImageryProvider({
                    url: 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
                    credit: 'Map tiles by CartoDB, under CC BY 3.0. Data by OpenStreetMap, under ODbL.'
                })
                this.viewer.imageryLayers.addImageryProvider(Imagery)
                break
            case 'note':
                Imagery = new Cesium.WebMapTileServiceImageryProvider({
                    url: 'http://t0.tianditu.gov.cn/cia_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cia&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=837264f46e683ec982d452e78d71052e',
                    layer: 'tdtBasicLayer',
                    style: 'default',
                    maximumLevel: 20,
                    format: 'image/png',
                    tileMatrixSetID: 'GoogleMapsCompatible',
                    show: true
                })
                this.viewer.imageryLayers.addImageryProvider(Imagery)
                break
        }
        this.Imagery = Imagery
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

    cameraFlyToCartesian3 (aim) {
        let cartesian3 = new Cesium.Cartesian3(aim.x, aim.y, aim.z)
        this.viewer.camera.flyTo({
            destination: cartesian3,
            orientation: {
                heading: aim.heading, // east, default value is 0.0 (north) 左右摆头
                pitch: aim.pitch, // default value (looking down) 上下摆头 -90俯视 0 平视
                roll: aim.roll // default value
            },
            duration: aim.duration, // 飞行时长
        })
    }

    /**
     * 相机绕点自动旋转
     */
    cameraAutoRoll (options) {
        const self = this

        let position = new Cesium.Cartesian3(options.x, options.y, options.z)

        // 相机看点的角度，如果大于0那么则是从地底往上看，所以要为负值，这里取-30度
        let pitch = options.pitch

        // 给定飞行一周所需时间，比如10s, 那么每秒转动度数
        let angle = 360 / 30

        // 给定相机距离点多少距离飞行，这里取值为5000m
        let distance = 5000

        let startTime = Cesium.JulianDate.fromDate(new Date())

        let stopTime = Cesium.JulianDate.addSeconds(startTime, 3, new Cesium.JulianDate())

        this.viewer.clock.startTime = startTime.clone()  // 开始时间
        viewer.clock.stopTime = stopTime.clone()     // 结速时间
        this.viewer.clock.currentTime = startTime.clone() // 当前时间
        this.viewer.clock.clockRange = Cesium.ClockRange.CLAMPED // 行为方式
        this.viewer.clock.clockStep = Cesium.ClockStep.SYSTEM_CLOCK // 时钟设置为当前系统时间; 忽略所有其他设置。
        // 相机的当前heading
        let initialHeading = this.viewer.camera.heading
        let Exection = function TimeExecution () {
            // 当前已经过去的时间，单位s
            let delTime = Cesium.JulianDate.secondsDifference(self.viewer.clock.currentTime, self.viewer.clock.startTime)
            let heading = Cesium.Math.toRadians(delTime * angle) + initialHeading
            self.viewer.scene.camera.setView({
                destination: position, // 点的坐标
                orientation: {
                    heading: heading,
                    pitch: pitch,

                }
            })
            self.viewer.scene.camera.moveBackward(distance)

            if (Cesium.JulianDate.compare(self.viewer.clock.currentTime, self.viewer.clock.stopTime) >= 0) {
                self.viewer.clock.onTick.removeEventListener(Exection)
            }
        }

        this.viewer.clock.onTick.addEventListener(Exection)
    }

    getViewerEntitys () {
        return this.viewer.entities.values
    }

    /**
     * 旋转entity
     * @param Heading
     * @param Pitch
     * @param Roll
     * @param entity
     */
    rotateEntity (Heading, Pitch, Roll, entity) {
        const newOrirentation = Cesium.Transforms.headingPitchRollQuaternion(
            entity.position._value,
            new Cesium.HeadingPitchRoll(Cesium.Math.toRadians(Heading), Pitch, Roll)
        )
        entity.orientation = newOrirentation
    }

    /**
     * 经纬度转世界坐标
     */
    cartesian3ToLong (x, y, z) {
        let ellipsoid = this.cApp.viewer.scene.globe.ellipsoid
        let cartesian3 = new Cesium.Cartesian3(x, y, z)
        let cartographic = ellipsoid.cartesianToCartographic(cartesian3)
        let lat = Cesium.Math.toDegrees(cartographic.latitude)
        let lng = Cesium.Math.toDegrees(cartographic.longitude)
        let alt = cartographic.height
        return [lat, lng, alt]
        console.log('onCheckonCheckonCheckonCheck', lat, lng, alt)
    }

    /**
     * 经纬度转世界坐标
     */
    longToC3 (longitude, latitude, height) {
        let ellipsoid = this.cApp.viewer.scene.globe.ellipsoid
        let cartographic = Cesium.Cartographic.fromDegrees(longitude, latitude, height)
        let cartesian3 = ellipsoid.cartographicToCartesian(cartographic)
        console.log(cartesian3, 'cartesian3cartesian3cartesian3cartesian3')
        return cartesian3
    }
}
