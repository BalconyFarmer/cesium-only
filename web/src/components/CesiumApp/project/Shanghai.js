/**
 * 上海展示项目
 */
export default class Shanghai {
    constructor(app) {
        this.app = app
        this.init()
    }


    init() {
        // this.app.switchLayer('百度地图')
        // this.app.loadJson.loadJsonRoad()
        // const tileset =  this.app.addOSMBuilding()
        //
        // let po = new Cesium.Cartesian3  (-2851667.578771356, 4653872.950938622, 3288949.340711588)
        // let url = "http://localhost:1111/3Dstatic/uploadDefault/2022076/16570982069192171.glb"
        // this.app.load3DModel.loadGlbByURL(po, url)
        // this.clipping3DTiles()
        // this.playAction()

        this.clippingPlan()
    }

    /**
     * -裁剪模型
     */
    clipping3DTiles() {
        let clippingPlanes = new Cesium.ClippingPlaneCollection({
            planes: [
                new Cesium.ClippingPlane(
                    new Cesium.Cartesian3(0.0, 0.0, -1.0),
                    0.0
                ),
            ],
            edgeWidth: 1,
        });

        let position = Cesium.Cartesian3.fromDegrees(-123.0744619, 44.0503706, 100.0);
        let heading = Cesium.Math.toRadians(135.0);
        let pitch = 0.0;
        let roll = 0.0;
        let hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
        let orientation = Cesium.Transforms.headingPitchRollQuaternion(position, hpr);
        let entity = viewer.entities.add({
            name: "caiqie",
            position: position,
            orientation: orientation,
            model: {
                uri: 'http://localhost:1111/3Dstatic/loadData/CesiumAir/Cesium_Air.glb',
                scale: 8,
                minimumPixelSize: 100.0,
                clippingPlanes: clippingPlanes     // 设置模型的裁切平面
            }
        });

    }

    /**
     * 具体裁切平面
     * 裁切地形
     */
    clippingPlan() {
        let redPolygon = this.app.viewer.entities.add({
            name: '裁剪用多边形',
            polygon: {
                hierarchy: Cesium.Cartesian3.fromDegreesArray(
                    [
                        121.49751980103026,31.240975601108374,
                        121.5018863373306,31.240283288965596,
                        121.50252895579945,31.23544684349948,
                        121.49642755683749,31.236281531516873,
                        121.49751980103026,31.240975601108374,
                    ]
                ),
                material: Cesium.Color.RED
            }
        })
        this.app.viewer.entities.add(redPolygon)

/*        let polygon = [
            [
                121.49751980103026, 31.240975601108374,
            ],
            [
                121.5018863373306, 31.240283288965596,

            ],
            [
                121.50252895579945, 31.23544684349948,

            ],
            [
                121.49642755683749, 31.236281531516873,

            ],
            [
                121.49751980103026, 31.240975601108374,

            ]
        ]

        /!**
         * 对点进行坐标转换
         * @param point 点坐标 数组形式
         * @param inverseTransform 转换举证
         * @returns {*} ClippingPlane 裁切面
         *!/
        function getOriginCoordinateSystemPoint(point, inverseTransform) {
            let val = Cesium.Cartesian3.fromDegrees(point[0], point[1])
            return Cesium.Matrix4.multiplyByPoint(
                inverseTransform, val, new Cesium.Cartesian3(0, 0, 0))
        }

        function createPlane(p1, p2, inverseTransform) {
            // 将仅包含经纬度信息的p1,p2，转换为相应坐标系的cartesian3对象
            let p1C3 = getOriginCoordinateSystemPoint(p1, inverseTransform)
            let p2C3 = getOriginCoordinateSystemPoint(p2, inverseTransform)

            // 定义一个垂直向上的向量up
            let up = new Cesium.Cartesian3(0, 0, 10)
            //  right 实际上就是由p1指向p2的向量 （这里是p2--》p1）
            let right = Cesium.Cartesian3.subtract(p2C3, p1C3, new Cesium.Cartesian3())
            // 计算normal， right叉乘up，得到平面法向量（垂直于两个向量），这个法向量指向right的右侧
            let normal = Cesium.Cartesian3.cross(right, up, new Cesium.Cartesian3())
            normal = Cesium.Cartesian3.normalize(normal, normal)

            //由于已经获得了法向量和过平面的一点，因此可以直接构造Plane,并进一步构造ClippingPlane
            let planeTmp = Cesium.Plane.fromPointNormal(p1C3, normal)
            return Cesium.ClippingPlane.fromPlane(planeTmp)
        }

        // 3dTiles模型加载后的矩阵，可以f12打印查看：tileset.root.transform
        let transform = Cesium.Matrix4.fromArray(
            [-0.8874246461620654, -0.46095281470464317, 0, 0,
                0.2602796082288922, -0.5010893346724129, 0.8253266045740758, 0,
                -0.3804366214290463, 0.7324151700322881, 0.5646556435405804, 0,
                -2429070.591483741, 4676437.67731705, 3581165.448379543, 1]);

        //转换矩阵
        let inverseTransform = Cesium.Matrix4.inverseTransformation(transform, new Cesium.Matrix4());
        // clippingPlane集合
        let clippingPlanes1 = [];
        for (let i = 0; i < polygon.length - 1; i++) {
            let plane = createPlane(polygon[i], polygon[i + 1], inverseTransform);
            clippingPlanes1.push(plane);
        }
        // 创建裁剪平面
        let clippingPlanes = new Cesium.ClippingPlaneCollection({
            //一组ClippingPlane对象，用于选择性地禁用每个平面外部的渲染。
            planes: clippingPlanes1,
            //应用于裁剪对象的边缘的高光的宽度（以像素为单位）
            edgeWidth: 1.0,
        });

        const tileset = this.app.viewer.scene.primitives.add(
            new Cesium.Cesium3DTileset({
                url: Cesium.IonResource.fromAssetId(96188),
                clippingPlanes: clippingPlanes,
            })
        );*/
    }

    playAction() {
        const aim = {
            x: -2854097.8249831186,
            y: 4657768.610404864,
            z: 3288074.879931185,
            heading: 0.017621843547119376,
            pitch: -0.9939966994909168,
            roll: 0.00008748848795825381,
            duration: 1,
        }
        this.app.cameraFlyToCartesian3(aim)
    }

}
