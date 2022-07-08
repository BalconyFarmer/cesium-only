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
                maximumNumberOfLoadedTiles: 10, // 最大加载瓦片个数
                maximumMemoryUsage: 1 // 最大使用内存 单位M
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


    }

}
