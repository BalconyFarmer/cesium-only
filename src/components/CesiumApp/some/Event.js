import * as Cesium from 'cesium/Cesium'
import * as widget from 'cesium/Widgets/widgets.css'

/**
 * 点击地球事件
 * 拖拽entities事件
 */
export default class Event {
    constructor (app) {
        this.app = app
        this.init()
        this.startDrag()
        this.dragFlag = false
    }

    init () {
        const self = this

        // 取消双击事件
        this.app.viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK)

        let handler = new Cesium.ScreenSpaceEventHandler(this.app.viewer.scene.canvas)

        handler.setInputAction(function (event) {
            // 屏幕坐标转世界坐标——关键点
            let ray = self.app.viewer.camera.getPickRay(event.position)
            let cartesian = self.app.viewer.scene.globe.pick(ray, self.app.viewer.scene)

            // //将笛卡尔坐标转换为地理坐标
            let cartographic = Cesium.Cartographic.fromCartesian(cartesian)
            // //将弧度转为度的十进制度表示
            let lon = Cesium.Math.toDegrees(cartographic.longitude)
            let lat = Cesium.Math.toDegrees(cartographic.latitude)
            // // 获取海拔高度
            let height1 = self.app.viewer.scene.globe.getHeight(cartographic)

            self.app.eventCenter.dispatchEvent({type: 'clickPosition', message: {position: [lon, lat, height1]}})
            self.app.eventCenter.dispatchEvent({
                type: 'cameraPosition',
                message: {position: [self.app.viewer.camera.position, self.app.viewer.camera.heading, self.app.viewer.camera.pitch, self.app.viewer.camera.roll]}
            })

            // 选取模型 事件
            var pick = self.app.viewer.scene.pick(event.position)
            console.log(pick, 'pick-pick-pick-pick-pick')
            if (pick) {
                if (pick.id) {
                    self.app.eventCenter.dispatchEvent({
                        type: 'pickEntity',
                        message: {position: pick.id}
                    })
                }
            }

        }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
    }

    /**
     * 开启拖拽模式
     */
    startDrag () {
        const self = this

        let leftDownFlag = false // 鼠标左键是否按下
        let pickedEntity = null //被选中的Entity

        // 拖拽模型-左键按下
        function leftDownAction (e) {
            leftDownFlag = true
            let picked = self.app.viewer.scene.pick(e.position)
            if (picked) {
                document.body.style.cursor = 'move'
                pickedEntity = Cesium.defaultValue(picked.id, picked.primitive.id) //如果未定义，则返回第一个参数，否则返回第二个参数。
                if (pickedEntity instanceof Cesium.Entity && pickedEntity.model) {
                    //锁定相机
                    self.app.viewer.scene.screenSpaceCameraController.enableRotate = false
                }
            }
        }

        // 拖拽模型-鼠标移动
        function mouseMoveAction (e) {
            if (leftDownFlag && pickedEntity && self.dragFlag) {
                // let ray = viewer.camera.getPickRay(e.endPosition);
                // let cartesian = viewer.scene.globe.pick(ray, viewer.scene);
                let cartesian = self.app.viewer.scene.camera.pickEllipsoid(
                    e.endPosition,
                    self.app.viewer.scene.globe.ellipsoid
                )
                pickedEntity.position = cartesian
            }
        }

        // 拖拽模型-左键抬起
        function leftUpAction (e) {
            document.body.style.cursor = 'default'
            leftDownFlag = false
            pickedEntity = null
            // 解除相机锁定
            self.app.viewer.scene.screenSpaceCameraController.enableRotate = true
        }

        this.app.viewer.screenSpaceEventHandler.setInputAction((e) => {
            leftDownAction(e)
        }, Cesium.ScreenSpaceEventType.LEFT_DOWN)

        this.app.viewer.screenSpaceEventHandler.setInputAction((e) => {
            mouseMoveAction(e)
        }, Cesium.ScreenSpaceEventType.MOUSE_MOVE)

        this.app.viewer.screenSpaceEventHandler.setInputAction((e) => {
            leftUpAction(e)
        }, Cesium.ScreenSpaceEventType.LEFT_UP)
    }



}
