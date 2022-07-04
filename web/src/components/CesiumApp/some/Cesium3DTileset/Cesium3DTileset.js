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
            x: 1332693.6981569321,
            y: -4654770.647244064,
            z: 4139068.9734864207,
            heading: 1.9009852161261573,
            pitch: -0.6070396640260713,
            roll: 6.283170210880244,
            duration: 1,
        }
        this.app.cameraFlyToCartesian3(aim)

        const tileset = this.app.viewer.scene.primitives.add(
            new Cesium.Cesium3DTileset({
                url: Cesium.IonResource.fromAssetId(75343),
            })
        );

        tileset.style = new Cesium.Cesium3DTileStyle({
            color: {
                conditions: [
                    ['true', 'rgba(0, 127.5, 255 ,0.5)']
                ]
            }
        });

        //实现渐变效果
        // tileset.tileVisible.addEventListener(function (tile) {
        //     var content = tile.content;
        //     var featuresLength = content.featuresLength;
        //     for (let i = 0; i < featuresLength; i += 2) {
        //         let feature = content.getFeature(i)
        //         let model = feature.content._model
        //
        //         if (model && model._sourcePrograms && model._rendererResources) {
        //             Object.keys(model._sourcePrograms).forEach(key => {
        //                 let program = model._sourcePrograms[key]
        //                 let fragmentShader = model._rendererResources.sourceShaders[program.fragmentShader];
        //                 let v_position = "";
        //                 if (fragmentShader.indexOf(" v_positionEC;") != -1) {
        //                     v_position = "v_positionEC";
        //                 } else if (fragmentShader.indexOf(" v_pos;") != -1) {
        //                     v_position = "v_pos";
        //                 }
        //                 const color = `vec4(${feature.color.toString()})`;
        //
        //                 model._rendererResources.sourceShaders[program.fragmentShader] =
        //                     `
        //     varying vec3 ${v_position};
        //     void main(void){
        //       vec4 position = czm_inverseModelView * vec4(${v_position},1); // 位置
        //       gl_FragColor = ${color}; // 颜色
        //       gl_FragColor *= vec4(vec3(position.z / 50.0), 1.0); // 渐变
        //       // 动态光环
        //       float time = fract(czm_frameNumber / 180.0);
        //       time = abs(time - 0.5) * 2.0;
        //       float glowRange = 180.0; // 光环的移动范围(高度)
        //       float diff = step(0.005, abs( clamp(position.z / glowRange, 0.0, 1.0) - time));
        //       gl_FragColor.rgb += gl_FragColor.rgb * (1.0 - diff);
        //     }
        //   `
        //             })
        //             model._shouldRegenerateShaders = true
        //         }
        //     }
        // });


    }

    /**
     * 加载本地3D tiles 文件
     */
    addTiles() {
        let tileset = this.app.viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
            url: (this.app.staticServerAdress + '/3DTiles/building/tileset.json')
        }))
        let cityStyle = new Cesium.Cesium3DTileStyle({
            color: 'rgba(101,113,164, 1)',
            show: true
        })
        let specialCityStyle = new Cesium.Cesium3DTileStyle({
            color: 'rgb(150,253,0)',
            show: true
        })
        const self = this
        tileset.readyPromise.then(function (tileset) {
            let city = self.app.viewer.scene.primitives.add(tileset)
            city.style = cityStyle
            self.app.viewer.zoomTo(tileset, new Cesium.HeadingPitchRange(0.5, -0.2, tileset.boundingSphere.radius * 1.0))
        }).otherwise(function (error) {
            console.log(error)
        })
    }
}
