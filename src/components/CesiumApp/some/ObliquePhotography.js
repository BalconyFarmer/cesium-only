import * as Cesium from 'cesium/Cesium'
import * as widget from 'cesium/Widgets/widgets.css'
import {ImageryProviderWebExtendTool} from "../tool/1-2ImageryProvider-WebExtend"

export default class ObliquePhotography {
    constructor (app) {
        this.app = app
    }

    addOblique () {
        //倾斜摄影
        let tileset = this.app.viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
            url: 'http://localhost:1111/3Dstatic/loadData/3dtiles-QX/tileset.json'
        }));
        const self = this
        tileset.readyPromise.then(function () {
            let boundingSphere = tileset.boundingSphere;
            self.app.viewer.camera.viewBoundingSphere(boundingSphere, new Cesium.HeadingPitchRange(0.0, -0.5, boundingSphere.radius));
            self.app.viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);
        }).otherwise(function (error) {
            throw (error);
        });

        //得到当前三维场景的椭球体
        let ellipsoid = this.app.viewer.scene.globe.ellipsoid;
        let CesiumEventHandler = new Cesium.ScreenSpaceEventHandler(this.app.viewer.scene.canvas);
        CesiumEventHandler.setInputAction(function (movement) {
            /*
            收取坐标下面三种：
            //1椭球面坐标
            let cartesian = viewer.scene.camera.pickEllipsoid(movement.position, ellipsoid);
            //2所有对象坐标 加地形的地表、模型、倾斜等  根据depth buffer反算
            let cartesian = viewer.scene.pickPosition(movement.position);
            //3地表坐标 不能收取模型、倾斜等对象高程
            let ray = viewer.camera.getPickRay(windowCoordinates);
            let cartesian = viewer.scene.globe.pick(ray, scene);

            更多拾取对象可以参考demo：picking
            */

            //let ray = viewer.camera.getPickRay(movement.position);
            //let cartesian = viewer.scene.globe.pick(ray, viewer.scene);

            let cartesian = self.app.viewer.scene.pickPosition(movement.position);

            //let cartesian = viewer.scene.camera.pickEllipsoid(movement.position, ellipsoid);

            if (cartesian) {
                //将笛卡尔坐标转换为地理坐标
                let cartographic = Cesium.Cartographic.fromCartesian(cartesian);//这里高程值 如果未拾取到物体未负值或无值
                //添加entity
                self.app.viewer.entities.add({
                    position: cartesian,//Cesium.Cartesian3.fromDegrees(-75.59777, 40.03883,3000),
                    point: {
                        pixelSize: 10,
                        color: Cesium.Color.YELLOW
                    }
                });
            }
        }, Cesium.ScreenSpaceEventType.LEFT_UP);

    }

}
