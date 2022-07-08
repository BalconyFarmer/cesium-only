/**
 * 上海展示项目
 */
export default class Shanghai {
    constructor(app) {
        this.app = app
        this.init()
    }


    init() {
        this.app.switchLayer('百度地图')
        this.app.loadJson.loadJsonRoad()
        // const tileset =  this.app.addOSMBuilding()
        //
        let po = new Cesium.Cartesian3(-2851667.578771356, 4653872.950938622, 3288949.340711588)
        let url = "http://localhost:1111/3Dstatic/uploadDefault/2022076/16570982069192171.glb"
        this.app.load3DModel.loadGlbByURL(po, url)
        this.clipping3DTiles()
        this.playAction()

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

        let tileset = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
            url: Cesium.IonResource.fromAssetId(96188),
        }))

        //实现渐变效果
        tileset.style = new Cesium.Cesium3DTileStyle({
            color: {
                conditions: [
                    ['true', 'rgba(0, 127.5, 255 ,0.3)']
                ]
            }
        });
        tileset.tileVisible.addEventListener(function (tile) {
            var content = tile.content;
            var featuresLength = content.featuresLength;
            for (let i = 0; i < featuresLength; i += 2) {
                let feature = content.getFeature(i)
                let model = feature.content._model

                if (model && model._sourcePrograms && model._rendererResources) {
                    Object.keys(model._sourcePrograms).forEach(key => {
                        let program = model._sourcePrograms[key]
                        let fragmentShader = model._rendererResources.sourceShaders[program.fragmentShader];
                        let v_position = "";
                        if (fragmentShader.indexOf(" v_positionEC;") != -1) {
                            v_position = "v_positionEC";
                        } else if (fragmentShader.indexOf(" v_pos;") != -1) {
                            v_position = "v_pos";
                        }
                        const color = `vec4(${feature.color.toString()})`;

                        model._rendererResources.sourceShaders[program.fragmentShader] =
                            `
            varying vec3 ${v_position};
            void main(void){
              vec4 position = czm_inverseModelView * vec4(${v_position},1); // 位置
              gl_FragColor = ${color}; // 颜色
              gl_FragColor *= vec4(vec3(position.z / 50.0), 1.0); // 渐变
              // 动态光环
              float time = fract(czm_frameNumber / 180.0);
              time = abs(time - 0.5) * 2.0;
              float glowRange = 180.0; // 光环的移动范围(高度)
              float diff = step(0.005, abs( clamp(position.z / glowRange, 0.0, 1.0) - time));
              gl_FragColor.rgb += gl_FragColor.rgb * (1.0 - diff);
            }
          `
                    })
                    model._shouldRegenerateShaders = true
                }
            }
        });

        const width = 200
        // let position = Cesium.Cartesian3.fromDegrees(121.49912730591835,31.24096160638086, 0);
        let position = new Cesium.Cartesian3 (-2851497.870388521, 4654042.248114797, 3288857.538218938)
        let entity = viewer.entities.add({
            position: position,
            box: {
                dimensions: new Cesium.Cartesian3(width, width, 2800.0),
                material: Cesium.Color.WHITE.withAlpha(0.0),
                outline: false,
                outlineColor: Cesium.Color.WHITE
            }
        });
        tileset.clippingPlanes = new Cesium.ClippingPlaneCollection({
            modelMatrix: entity.computeModelMatrix(Cesium.JulianDate.now()),
            planes: [
                new Cesium.Plane(new Cesium.Cartesian3(1.0, 0.0, 0.0), -width / 2),
                new Cesium.Plane(new Cesium.Cartesian3(-1.0, 0.0, 0.0), -width / 2),
                new Cesium.Plane(new Cesium.Cartesian3(0.0, 1.0, 0.0), -width / 2),
                new Cesium.Plane(new Cesium.Cartesian3(0.0, -1.0, 0.0), -width / 2)
            ],
            edgeWidth: 1.0,
            edgeColor: Cesium.Color.YELLOW
        });
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
