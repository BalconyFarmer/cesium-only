import * as Cesium from 'cesium/Cesium'
import * as widget from 'cesium/Widgets/widgets.css'

export default class CesiumApp {
  constructor () {
    this.viewer = null
    this.Cesium = Cesium
  }

  /**
   * 初始化3D基础场景
   */
  initMap () {
    // 加载图层数据 (google图层数据效果最好)
    const gee = new this.Cesium.UrlTemplateImageryProvider({
      url: 'http://mt1.google.cn/vt/lyrs=s&hl=zh-CN&x={x}&y={y}&z={z}&s=Gali'
    })

    // 加载地形数据
    let terrainProvider = this.Cesium.createWorldTerrain()

    const option = {
      animation: false, // 如果设置为false，则不会创建'动画'小部件。
      baseLayerPicker: false, // 如果设置为false，则不会创建BaseLayerPicker小部件。
      fullscreenButton: false, // 如果设置为false，将不会创建FullscreenButton小部件。
      vrButton: false, // 如果设置为true，将创建VRButton小部件。
      // geocoder: false, // 搜索
      homeButton: false, //
      infoBox: false, //
      sceneModePicker: false, //
      selectionIndicator: false, //
      timeline: false, //
      navigationHelpButton: false, //
      imageryProvider: gee,
      terrainProvider: terrainProvider
    }
    this.viewer = new this.Cesium.Viewer('cesiumContainer', option)

    window.viewer = this.viewer
    console.log('viewer: ', this.viewer)
  }

  toKunming () {
    // viewer.camera.position // 控制台:获取当前状态
    // viewer.camera.heading
    // viewer.camera.pitch

    this.viewer.camera.flyTo({
      destination: {x: -1271845.9753471974, y: 5649476.392272105, z: 2669566.8441791297},
      orientation: {
        heading: 4.941377527440675, // east, default value is 0.0 (north) 左右摆头
        pitch: -0.0872607638230507, // default value (looking down) 上下摆头 -90俯视 0 平视
        roll: 0.0 // default value
      }
    })
  }

  toYunnan () {
    const self = this
    // 还在geoJson数据 ()
    this.Cesium.GeoJsonDataSource.load(require('./geoJson/云南省.json')).then(function (dataSource) {
      self.viewer.dataSources.add(dataSource).then(res => {
        const test = res
        test.name = '测试'
      })
    })
    self.viewer.camera.flyTo({
      destination: self.Cesium.Cartesian3.fromDegrees(101.315555, 24.613368, 72000.0),
      orientation: {
        heading: 0, // east, default value is 0.0 (north) 左右摆头
        pitch: -90, // default value (looking down) 上下摆头 -90俯视 0 平视
        roll: 0.0 // default value
      }
    })
  }

  toYN () {
    // 设置camera
    // 1. Set position with a top-down view
    this.viewer.camera.flyTo({
      destination: this.Cesium.Cartesian3.fromDegrees(-73.940159, 40.800621, 2000.0),
      orientation: {
        heading: this.Cesium.Math.toRadians(0), // east, default value is 0.0 (north) 左右摆头
        pitch: this.Cesium.Math.toRadians(-45), // default value (looking down) 上下摆头 -90俯视 0 平视
        roll: 0.0 // default value
      }
    })

    // 添加瓦片数据 (纽约)
    let city = this.viewer.scene.primitives.add(new this.Cesium.Cesium3DTileset({url: this.Cesium.IonResource.fromAssetId(3839)}))
    let cityStyle = new this.Cesium.Cesium3DTileStyle({
      color: 'color(\'blue\',0.2)',
      show: true
    })
    // let cityStyle = new this.Cesium.Cesium3DTileStyle({
    //   color: {
    //     conditions: [
    //       [`${Height} >= 100`, `color("purple", 0.5)`],
    //       [`${Height} >= 50`, `color("red")`],
    //       [`true`, `color("blue")`]
    //     ]
    //   },
    //   show: `${Height} > 0`
    // })
    city.style = cityStyle
  }

  addIcon () {
    this.viewer.entities.add({
      position: this.Cesium.Cartesian3.fromDegrees(102.63749265495848, 24.899929322885566, 2020.096625999652),
      // 点
      point: {
        color: this.Cesium.Color.RED, // 点位颜色
        pixelSize: 10 // 像素点大小
      },
      // 文字
      label: {
        // 文本。支持显式换行符“ \ n”
        text: '测试名称',
        // 字体样式，以CSS语法指定字体
        font: '14pt Source Han Sans CN',
        // 字体颜色
        fillColor: this.Cesium.Color.BLACK,
        // 背景颜色
        backgroundColor: this.Cesium.Color.AQUA,
        // 是否显示背景颜色
        showBackground: true,
        // 字体边框
        outline: true,
        // 字体边框颜色
        outlineColor: this.Cesium.Color.WHITE,
        // 字体边框尺寸
        outlineWidth: 10,
        // 应用于图像的统一比例。比例大于会1.0放大标签，而比例小于会1.0缩小标签。
        scale: 1.0,
        // 设置样式：FILL：填写标签的文本，但不要勾勒轮廓；OUTLINE：概述标签的文本，但不要填写；FILL_AND_OUTLINE：填写并概述标签文本。
        style: this.Cesium.LabelStyle.FILL_AND_OUTLINE,
        // 相对于坐标的水平位置
        verticalOrigin: this.Cesium.VerticalOrigin.CENTER,
        // 相对于坐标的水平位置
        horizontalOrigin: this.Cesium.HorizontalOrigin.LEFT,
        // 该属性指定标签在屏幕空间中距此标签原点的像素偏移量
        pixelOffset: new this.Cesium.Cartesian2(10, 0),
        // 是否显示
        show: true
      }
    })
  }

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
      console.log(lon, lat, height1, '+++++++++++++++++')
    }, this.Cesium.ScreenSpaceEventType.LEFT_CLICK)
  }
}
