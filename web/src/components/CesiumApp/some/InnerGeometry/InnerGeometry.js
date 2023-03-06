
import TooltipCesium from './Tools-01Tooltip-entity'

/**
 * https://blog.csdn.net/weixin_36617251/article/details/118366285
 */
export default class InnerGeometry {
    constructor (app) {
        this.app = app
        this.TooltipCesium = null
    }

    initMoveToolTips () {
        TooltipCesium.initTool(this.app.viewer)
        this.TooltipCesium = TooltipCesium
    }

    /**
     * 加载bilbord
     */
    addIcon (point, text) {
        let _p = null
        if (point) {
            _p = point
        } else {
            _p = Cesium.Cartesian3.fromDegrees(
                102.65401175390049,
                24.90222947105644,
                2856.4496713384267,)
        }
        this.app.viewer.entities.add({
            position: _p,
            // 点
            point: {
                color: Cesium.Color.YELLOW, // 点位颜色
                pixelSize: 10 // 像素点大小
            },
            // 文字
            label: {
                // 文本。支持显式换行符“ \ n”
                text: (text || '1号房'),
                // 字体样式,以CSS语法指定字体
                font: '14pt Source Han Sans CN',
                // 字体颜色
                fillColor: Cesium.Color.BLACK,
                // 背景颜色
                backgroundColor: Cesium.Color.AQUA,
                // 是否显示背景颜色
                showBackground: false,
                // 字体边框
                outline: true,
                // 字体边框颜色
                outlineColor: Cesium.Color.WHITE,
                // 字体边框尺寸
                outlineWidth: 10,
                // 应用于图像的统一比例。比例大于会1.0放大标签,而比例小于会1.0缩小标签。
                scale: 1.0,
                // 设置样式：FILL：填写标签的文本,但不要勾勒轮廓；OUTLINE：概述标签的文本,但不要填写；FILL_AND_OUTLINE：填写并概述标签文本。
                style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                // 相对于坐标的水平位置
                verticalOrigin: Cesium.VerticalOrigin.CENTER,
                // 相对于坐标的水平位置
                horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
                // 该属性指定标签在屏幕空间中距此标签原点的像素偏移量
                pixelOffset: new Cesium.Cartesian2(10, 0),
                // 是否显示
                show: true
            }
        })
    }

    addIconBackground (point, text, type) {
        let img = null
        switch (type) {
            case 1:
                img = 'http://localhost:1111/3Dstatic/loadData/billboard/1.png'
                break
            case 2:
                img = 'http://localhost:1111/3Dstatic/loadData/billboard/2.png'
                break
            case 3:
                img = 'http://localhost:1111/3Dstatic/loadData/billboard/3.png'
                break
            case 4:
                img = 'http://localhost:1111/3Dstatic/loadData/billboard/4.png'
                break
            case 5:
                img = 'http://localhost:1111/3Dstatic/loadData/billboard/5.png'
                break
        }
        this.app.viewer.entities.add({
            position: point,
            billboard: {
                image: img, // default: undefined
                // width: 92,
                // height: 230,
                scale: 0.5,
                pixelOffset: new Cesium.Cartesian2(0, 0),
            },
            // 文字
            label: {
                // 文本。支持显式换行符“ \ n”
                text: (text || '1号房'),
                // 字体样式,以CSS语法指定字体
                font: '14pt Source Han Sans CN',
                // 字体颜色
                fillColor: Cesium.Color.BLACK,
                // 背景颜色
                backgroundColor: Cesium.Color.AQUA,
                // 是否显示背景颜色
                showBackground: false,
                // 字体边框
                outline: true,
                // 字体边框颜色
                outlineColor: Cesium.Color.WHITE,
                // 字体边框尺寸
                outlineWidth: 10,
                // 应用于图像的统一比例。比例大于会1.0放大标签,而比例小于会1.0缩小标签。
                scale: 1.0,
                // 设置样式：FILL：填写标签的文本,但不要勾勒轮廓；OUTLINE：概述标签的文本,但不要填写；FILL_AND_OUTLINE：填写并概述标签文本。
                style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                // 相对于坐标的水平位置
                verticalOrigin: Cesium.VerticalOrigin.CENTER,
                // 相对于坐标的水平位置
                horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
                // 该属性指定标签在屏幕空间中距此标签原点的像素偏移量
                pixelOffset: new Cesium.Cartesian2(10, 0),
                // 是否显示
                show: true
            }
        })
    }

    addPoint (Cartesian3) {
        const entity = this.app.viewer.entities.add({
            position: Cartesian3,
            point: {
                pixelSize: 50,
                color: Cesium.Color.YELLOW
            }
        })
        return entity
    }

    addBox (Cartesian3) {
        let redBox = this.app.viewer.entities.add({
            name: 'Red box with black outline',
            position: Cartesian3,
            box: {
                dimensions: new Cesium.Cartesian3(1, 1, 1),
                material: Cesium.Color.RED,
                outline: true, //显示轮廓
                outlineColor: Cesium.Color.BLACK
            }
        })

    }

    /**
     * 圆面
     * @param Cartesian3
     */
    addEllipse (Cartesian3) {
        let greenCircle = this.app.viewer.entities.add({
            position: Cartesian3,
            name: 'Green circle at height',
            ellipse: {
                semiMinorAxis: 300000.0,
                semiMajorAxis: 300000.0,
                height: 200000.0, //浮空
                material: Cesium.Color.GREEN
            }
        })
    }

    /**
     * 椭圆面
     * @param Cartesian3
     */
    addEllipseTuo (Cartesian3) {
        let redEllipse = this.app.viewer.entities.add({
            //不带高度
            position: Cartesian3,
            name: 'Red ellipse on surface with outline',
            ellipse: {
                semiMinorAxis: 250000.0,
                semiMajorAxis: 400000.0,
                material: Cesium.Color.RED.withAlpha(0.5),
                outline: true,
                outlineColor: Cesium.Color.RED
            }
        })

    }

    addEllipseTuoWW (Cartesian3) {
        let blueEllipseWW = this.app.viewer.entities.add({
            position: Cartesian3,
            name: 'Blue translucent, rotated, and extruded ellipse',
            ellipse: {
                semiMinorAxis: 150000.0,
                semiMajorAxis: 300000.0,
                extrudedHeight: 200000.0,  //拉伸
                rotation: Cesium.Math.toRadians(45), //旋转
                material: Cesium.Color.BLUE.withAlpha(0.7),
                outline: true
            }
        })

    }

    redCorridor (Cartesian3) {
        let redCone = this.app.viewer.entities.add({
            name: 'Red cone',
            position: Cartesian3,
            cylinder: {//圆锥
                length: 400000.0,
                topRadius: 0.0,
                bottomRadius: 200000.0,
                material: Cesium.Color.RED
            }
        })
    }

    redPolygon (Cartesian3) {
        let redPolygon = this.app.viewer.entities.add({
            name: '贴着地表的多边形',
            polygon: {
                hierarchy: Cesium.Cartesian3.fromDegreesArray(
                    [
                        -115.0, 37.0,
                        -115.0, 32.0,
                        -107.0, 33.0,
                        -102.0, 31.0,
                        -102.0, 35.0
                    ]
                ),
                material: Cesium.Color.RED
            }
        })
    }

    greenPolygon (Cartesian3) {
        let greenPolygon = this.app.viewer.entities.add({
            name: '绿色拉伸多边形',
            polygon: {
                hierarchy: Cesium.Cartesian3.fromDegreesArray([-108.0, 42.0,
                    -100.0, 42.0,
                    -104.0, 40.0]),
                extrudedHeight: 500000.0,
                material: Cesium.Color.GREEN
            }
        })
    }

    orangePolygon (Cartesian3) {
        let orangePolygon = this.app.viewer.entities.add({
            name: '每个顶点具有不同拉伸高度的橘色多边形',
            polygon: {
                hierarchy: Cesium.Cartesian3.fromDegreesArrayHeights(
                    [-108.0, 25.0, 100000,
                        -100.0, 25.0, 100000,
                        -100.0, 30.0, 100000,
                        -108.0, 30.0, 300000]),
                extrudedHeight: 0,
                perPositionHeight: true,
                material: Cesium.Color.ORANGE,
                outline: true,
                outlineColor: Cesium.Color.BLACK
            }
        })
    }

    bluePolygon (Cartesian3) {
        let bluePolygon = this.app.viewer.entities.add({
            name: '具有挖空效果的蓝色多边形',
            polygon: {
                hierarchy: {
                    positions: Cesium.Cartesian3.fromDegreesArray(
                        [-99.0, 30.0,
                            -85.0, 30.0,
                            -85.0, 40.0,
                            -99.0, 40.0]),
                    holes: [{
                        positions: Cesium.Cartesian3.fromDegreesArray([
                            -97.0, 31.0,
                            -97.0, 39.0,
                            -87.0, 39.0,
                            -87.0, 31.0
                        ]),
                        holes: [{
                            positions: Cesium.Cartesian3.fromDegreesArray([
                                -95.0, 33.0,
                                -89.0, 33.0,
                                -89.0, 37.0,
                                -95.0, 37.0
                            ]),
                            holes: [{
                                positions: Cesium.Cartesian3.fromDegreesArray([
                                    -93.0, 34.0,
                                    -91.0, 34.0,
                                    -91.0, 36.0,
                                    -93.0, 36.0
                                ])
                            }]
                        }]
                    }]
                },
                material: Cesium.Color.BLUE,
                outline: true,
                outlineColor: Cesium.Color.BLACK
            }
        })
    }

    redLine (Cartesian3) {
        let redLine = this.app.viewer.entities.add({
            name: '沿着地球表面的红线',
            polyline: {
                positions: Cesium.Cartesian3.fromDegreesArray(
                    [
                        -75, 35, -125, 35
                    ]),
                width: 5,
                material: Cesium.Color.RED
            }
        })
    }

    glowingLine (Cartesian3List) {
        if (Cartesian3List) {
            let glowingLine = this.app.viewer.entities.add({
                name: '具有发光效果的线',
                polyline: {
                    positions: Cesium.Cartesian3.fromDegreesArray(
                        Cartesian3List
                    ),
                    width: 5,
                    material: new Cesium.PolylineGlowMaterialProperty({
                        glowPower: 0.2,
                        color: Cesium.Color.BLUE
                    })
                }
            })
        } else {
            let glowingLine = this.app.viewer.entities.add({
                name: '具有发光效果的线',
                polyline: {
                    positions: Cesium.Cartesian3.fromDegreesArray(
                        [-75, 37, -125, 37]
                    ),
                    width: 10,
                    material: new Cesium.PolylineGlowMaterialProperty({
                        glowPower: 0.2,
                        color: Cesium.Color.BLUE
                    })
                }
            })
        }


    }

    orangeOutlined (Cartesian3) {
        let orangeOutlined = this.app.viewer.entities.add({
            name: '具有一定高度的线',
            polyline: {
                positions: Cesium.Cartesian3.fromDegreesArrayHeights(
                    [-75, 39, 0, -125, 39, 350000]
                ),
                width: 5,
                // material: new Cesium.PolylineOutlineMaterialProperty({
                //     color: Cesium.Color.ORANGE,
                //     outlineWidth: 2,
                //     outlineColor: Cesium.Color.BLACK
                // })
                material: new Cesium.PolylineArrowMaterialProperty(Cesium.Color.BLUE)
            }
        })
    }

    yellowLine (Cartesian3) {
        let yellowLine = this.app.viewer.entities.add({
            name: '不贴着地表的线',
            polyline: {
                positions: Cesium.Cartesian3.fromDegreesArrayHeights(
                    [-75, 43, 500000, -125, 43, 500000]
                ),
                width: 3,
                followSurface: false,  //是否贴着地表
                material: Cesium.Color.PURPLE
            }
        })
    }

    redRectangle (Cartesian3) {
        //红色矩形
        let redRectangle = viewer.entities.add({
            name: 'Red translucent rectangle with outline',
            rectangle: {
                coordinates: Cesium.Rectangle.fromDegrees(-110.0, 20.0, -80.0, 25.0),
                material: Cesium.Color.RED.withAlpha(0.5),
                outline: true,
                outlineColor: Cesium.Color.RED
            }
        })
    }

    greenRectangle (Cartesian3) {
        //绿色旋转、拉伸的矩形
        let greenRectangle = viewer.entities.add({
            name: 'Green translucent, rotated, and extruded rectangle',
            rectangle: {
                coordinates: Cesium.Rectangle.fromDegrees(-100.0, 30.0, -90.0, 40.0),
                material: Cesium.Color.GREEN.withAlpha(0.5),
                rotation: Cesium.Math.toRadians(45),
                extrudedHeight: 300000.0,
                height: 100000.0,
                outline: true,
                outlineColor: Cesium.Color.GREEN
            }
        })
    }

    blueEllipsoid (Cartesian3) {
        let blueEllipsoid = viewer.entities.add({
            name: 'Blue ellipsoid',
            position: Cartesian3,
            ellipsoid: {
                //可以指定三个轴的半径
                radii: new Cesium.Cartesian3(200000.0, 200000.0, 300000.0),
                material: Cesium.Color.BLUE
            }
        })
    }

    redSphere (Cartesian3) {
        let redSphere = viewer.entities.add({
            name: 'Red sphere with black outline',
            position: Cartesian3,
            ellipsoid: {
                //正球体
                radii: new Cesium.Cartesian3(300000.0, 300000.0, 300000.0),
                material: Cesium.Color.RED,
                outline: true,
                outlineColor: Cesium.Color.BLACK
            }
        })
    }

    outlineOnly (Cartesian3) {
        let outlineOnly = viewer.entities.add({
            name: 'Yellow ellipsoid outline',
            position: Cartesian3,
            ellipsoid: {
                radii: new Cesium.Cartesian3(200000.0, 200000.0, 300000.0),
                fill: false,
                outline: true,
                outlineColor: Cesium.Color.YELLOW,
                slicePartitions: 24, //横向切割线
                stackPartitions: 36  //纵向切割线
            }
        })
    }

    redWall (Cartesian3) {
        //东西方向的横墙
        let redWall = viewer.entities.add({
            name: 'Red wall at height',
            wall: {
                positions: Cesium.Cartesian3.fromDegreesArrayHeights(
                    [
                        -115.0, 44.0, 200000.0,//坐标点
                        -90.0, 44.0, 200000.0]
                ),
                minimumHeights: [100000.0, 100000.0], //按坐标点的最小高度数组
                material: Cesium.Color.RED
            }
        })
    }

    greenWall (Cartesian3) {
        let greenWall = viewer.entities.add({
            name: 'Green wall from surface with outline',
            wall: {
                positions: Cesium.Cartesian3.fromDegreesArrayHeights(
                    [
                        104.08076896875812,
                        30.645621985119146, 100.0,

                        104.08181949416934,
                        30.6491778217173, 100.0,

                        104.07449474385395,
                        30.653122884388093, 100.0,

                        104.07256970305284,
                        30.64867564461773, 100.0,

                        104.08076896875812,
                        30.645621985119146, 100.0,
                    ]
                ),
                // material: Cesium.Color.GREEN,
                material: new Cesium.PolylineGlowMaterialProperty({
                    glowPower: 0.2,
                    color: Cesium.Color.BLUE.withAlpha(0.5),
                }),
                outline: false,
                outlineColor: Cesium.Color.BLACK
            }
        })
    }

    blueWall (Cartesian3) {
        //曲折的墙
        let blueWall = viewer.entities.add({
            name: 'Blue wall with sawtooth heights and outline',
            wall: {
                //坐标点，不指定高度
                positions: Cesium.Cartesian3.fromDegreesArray(
                    [-115.0, 50.0,
                        -112.5, 50.0,
                        -110.0, 50.0,
                        -107.5, 50.0,
                        -105.0, 50.0,
                        -102.5, 50.0,
                        -100.0, 50.0,
                        -97.5, 50.0,
                        -95.0, 50.0,
                        -92.5, 50.0,
                        -90.0, 50.0]),
                maximumHeights: [ //上高
                    100000, 200000, 100000, 200000, 100000, 200000,
                    100000, 200000, 100000, 200000, 100000],
                minimumHeights: [  //下高
                    0, 100000, 0, 100000, 0, 100000, 0, 100000, 0,
                    100000, 0],
                material: new Cesium.PolylineGlowMaterialProperty({
                    glowPower: 0.3,
                    color: Cesium.Color.BLUE.withAlpha(0.7),
                }),
                outline: true,
                outlineColor: Cesium.Color.BLACK
            }
        })
    }

    /**
     * 原生geometry
     */
    addGeometry (Cartesian3) {
        /**
         * 发光线条
         * @type {module:cesium.PolylineGlowMaterialProperty}
         */
        const metarial = new Cesium.PolylineGlowMaterialProperty({
            glowPower: 0.2,
            color: Cesium.Color.BLUE.withAlpha(0.5),
        })

        const materail2 = new Cesium.ColorMaterialProperty(new Cesium.CallbackProperty(function () {
            return Cesium.Color.RED.withAlpha(0.5)
        }, false))

        //圆柱体
        this.app.viewer.entities.add({
            name: '圆柱体',
            position: Cartesian3,
            cylinder: {
                length: 10.0,//圆柱体高度
                topRadius: 2,//圆柱体的顶部半径。
                bottomRadius: 2,//    圆柱体底部的半径。
                material: metarial,
                outline: true,//轮廓
                outlineColor: Cesium.Color.DARK_GREEN,//轮廓颜色深绿色
                heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
                semiMinorAxis: 2000.0,
                semiMajorAxis: 2000.0,
            }
        })

    }

    /**
     * 黑夜特效
     */
    addDarckNessEff () {
        let fs =
            'uniform sampler2D colorTexture;\n' +
            'varying vec2 v_textureCoordinates;\n' +
            'uniform float scale;\n' +
            'uniform vec3 offset;\n' +
            'void main() {\n' +
            ' // vec4 color = texture2D(colorTexture, v_textureCoordinates);\n' +
            ' vec4 color = texture2D(colorTexture, v_textureCoordinates);\n' +
            ' // float gray = 0.2989*color.r+0.5870*color.g+0.1140*color.b;\n' +
            ' // gl_FragColor = vec4(gray,gray,2.0*(gray+1.0), 1.0);\n' +
            ' gl_FragColor = vec4(color.r*0.2,color.g * 0.4,color.b*0.6, 1.0);\n' +
            '}\n'

        this.app.viewer.scene.postProcessStages.add(new Cesium.PostProcessStage({
            name: 'darkEffect',
            fragmentShader: fs,
            uniforms: {
                scale: 1.0,
                offset: function () {
                    return new Cesium.Cartesian3(0.1, 0.2, 0.3)
                }
            }
        }))
    }

    /**
     * 下雨特效
     */
    addRain () {
        var fs = 'uniform sampler2D colorTexture;\n\
                varying vec2 v_textureCoordinates;\n\
                \n\
                float hash(float x){\n\
                return fract(sin(x*23.3)*13.13);\n\
                }\n\
                \n\
                void main(){\n\
                    float time = czm_frameNumber / 60.0;\n\
                    vec2 resolution = czm_viewport.zw;\n\
                    vec2 uv=(gl_FragCoord.xy*2.-resolution.xy)/min(resolution.x,resolution.y);\n\
                    vec3 c=vec3(.6,.7,.8);\n\
                    float a=-.4;\n\
                    float si=sin(a),co=cos(a);\n\
                    uv*=mat2(co,-si,si,co);\n\
                    uv*=length(uv+vec2(0,4.9))*.3+1.;\n\
                    float v=1.-sin(hash(floor(uv.x*100.))*2.);\n\
                    float b=clamp(abs(sin(20.*time*v+uv.y*(5./(2.+v))))-.95,0.,1.)*20.;\n\
                    c*=v*b;\n\
                    gl_FragColor = mix(texture2D(colorTexture, v_textureCoordinates), vec4(c, 1), 0.2);\n\
                }\n\
                '
        this.app.viewer.scene.postProcessStages.add(new Cesium.PostProcessStage({
            name: 'rainEffect',
            fragmentShader: fs
        }))
    }

    /**
     * 下雪特效
     */
    addSnow () {
        var fs = 'uniform sampler2D colorTexture;\n\
                    varying vec2 v_textureCoordinates;\n\
                    \n\
                    float snow(vec2 uv,float scale){\n\
                        float time = czm_frameNumber / 60.0;\n\
                        float w=smoothstep(1.,0.,-uv.y*(scale/10.));\n\
                        if(w<.1)return 0.;\n\
                        uv+=time/scale;\n\
                        uv.y+=time*2./scale;\n\
                        uv.x+=sin(uv.y+time*.5)/scale;\n\
                        uv*=scale;\n\
                        vec2 s=floor(uv),f=fract(uv),p;\n\
                        float k=3.,d;\n\
                        p=.5+.35*sin(11.*fract(sin((s+p+scale)*mat2(7,3,6,5))*5.))-f;\n\
                        d=length(p);\n\
                        k=min(d,k);\n\
                        k=smoothstep(0.,k,sin(f.x+f.y)*0.01);\n\
                        return k*w;\n\
                    }\n\
                    \n\
                    void main(){\n\
                        vec2 resolution = czm_viewport.zw;\n\
                        vec2 uv=(gl_FragCoord.xy*2.-resolution.xy)/min(resolution.x,resolution.y);\n\
                        vec3 finalColor=vec3(0);\n\
                        float c = 0.0;\n\
                        c+=snow(uv,30.)*.0;\n\
                        c+=snow(uv,20.)*.0;\n\
                        c+=snow(uv,15.)*.0;\n\
                        c+=snow(uv,10.);\n\
                        c+=snow(uv,8.);\n\
                        c+=snow(uv,6.);\n\
                        c+=snow(uv,5.);\n\
                        finalColor=(vec3(c));\n\
                        gl_FragColor = mix(texture2D(colorTexture, v_textureCoordinates), vec4(finalColor,1), 0.3);\n\
                        \n\
                    }\n\
                    '
        this.app.viewer.scene.postProcessStages.add(new Cesium.PostProcessStage({
            name: 'snowEffect',
            fragmentShader: fs
        }))
    }

    /**
     * 大雾
     */
    addFrog () {
        var fs =
            'float getDistance(sampler2D depthTexture, vec2 texCoords) \n' +
            '{ \n' +
            '    float depth = czm_unpackDepth(texture2D(depthTexture, texCoords)); \n' +
            '    if (depth == 0.0) { \n' +
            '        return czm_infinity; \n' +
            '    } \n' +
            '    vec4 eyeCoordinate = czm_windowToEyeCoordinates(gl_FragCoord.xy, depth); \n' +
            '    return -eyeCoordinate.z / eyeCoordinate.w; \n' +
            '} \n' +
            'float interpolateByDistance(vec4 nearFarScalar, float distance) \n' +
            '{ \n' +
            '    float startDistance = nearFarScalar.x; \n' +
            '    float startValue = nearFarScalar.y; \n' +
            '    float endDistance = nearFarScalar.z; \n' +
            '    float endValue = nearFarScalar.w; \n' +
            '    float t = clamp((distance - startDistance) / (endDistance - startDistance), 0.0, 1.0); \n' +
            '    return mix(startValue, endValue, t); \n' +
            '} \n' +
            'vec4 alphaBlend(vec4 sourceColor, vec4 destinationColor) \n' +
            '{ \n' +
            '    return sourceColor * vec4(sourceColor.aaa, 1.0) + destinationColor * (1.0 - sourceColor.a); \n' +
            '} \n' +
            'uniform sampler2D colorTexture; \n' +
            'uniform sampler2D depthTexture; \n' +
            'uniform vec4 fogByDistance; \n' +
            'uniform vec4 fogColor; \n' +
            'varying vec2 v_textureCoordinates; \n' +
            'void main(void) \n' +
            '{ \n' +
            '    float distance = getDistance(depthTexture, v_textureCoordinates); \n' +
            '    vec4 sceneColor = texture2D(colorTexture, v_textureCoordinates); \n' +
            '    float blendAmount = interpolateByDistance(fogByDistance, distance); \n' +
            '    vec4 finalFogColor = vec4(fogColor.rgb, fogColor.a * blendAmount); \n' +
            '    gl_FragColor = alphaBlend(finalFogColor, sceneColor); \n' +
            '} \n'

        this.app.viewer.scene.postProcessStages.add(
            new Cesium.PostProcessStage({
                fragmentShader: fs,
                uniforms: {
                    fogByDistance: new Cesium.Cartesian4(10, 0.0, 200, 1.0),
                    fogColor: Cesium.Color.GRAY,
                },
            })
        )
    }

}
