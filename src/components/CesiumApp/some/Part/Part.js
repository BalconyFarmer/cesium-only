import * as Cesium from 'cesium/Cesium'
import * as widget from 'cesium/Widgets/widgets.css'

// import {PolylineTrailLinkMaterialProperty} from './PolylineTrailLinkMaterialProperty'

export default class Part {
    constructor (app) {
        this.app = app
    }

    /**
     * 原生geometry
     */
    addGeometry () {
        //圆柱体
        this.app.viewer.entities.add({
            name: '圆柱体',
            position: Cesium.Cartesian3.fromDegrees(102.65461106848306, 24.902995899003997, 1857.9621251609599,),
            cylinder: {
                length: 4.0,//圆柱体高度
                topRadius: 2.0,//圆柱体的顶部半径。
                bottomRadius: 2.0,//    圆柱体底部的半径。
                material: Cesium.Color.GREEN.withAlpha(0.5),//绿色半透明
                outline: true,//轮廓
                outlineColor: Cesium.Color.DARK_GREEN//轮廓颜色深绿色
            }
        })
    }



    /**
     * 加载bilbord
     */
    addIcon () {
        this.app.viewer.entities.add({
            position: Cesium.Cartesian3.fromDegrees(102.65425451755321, 24.902048298657025, 1856.639104950962),
            // 点
            point: {
                color: Cesium.Color.RED, // 点位颜色
                pixelSize: 10 // 像素点大小
            },
            // 文字
            label: {
                // 文本。支持显式换行符“ \ n”
                text: '1号房',
                // 字体样式,以CSS语法指定字体
                font: '14pt Source Han Sans CN',
                // 字体颜色
                fillColor: Cesium.Color.BLACK,
                // 背景颜色
                backgroundColor: Cesium.Color.AQUA,
                // 是否显示背景颜色
                showBackground: true,
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

    /**
     * 加载流动墙效果
     */
    addFlowWall () {

        const flowWall = {
            name: 'WallTrail',
            wall: {
                positions: Cesium.Cartesian3.fromDegreesArrayHeights([-90.0, 43.0, 100000.0,
                    -87.5, 45.0, 100000.0,
                    -85.0, 43.0, 100000.0,
                    -87.5, 41.0, 100000.0,
                    -90.0, 43.0, 100000.0]),
                material: new Cesium.PolylineTrailLinkMaterialProperty(Cesium.Color.ORANGE, 9000)
            }
        }
        this.app.viewer.entities.add(flowWall)
        this.app.viewer.zoomTo(this.app.viewer.entities)
    }

    /**
     * 添加流动线条
     */
    addFlowLine () {

        this.app.viewer.entities.add({
            name: 'PolylineTrail',
            polyline: {
                positions: Cesium.Cartesian3.fromDegreesArrayHeights(
                    [
                        102.65522062344772, 24.885658297532803, 1854.7618263277068,
                        102.65455249694989, 24.890987614908887, 1888.7717509127956,
                        102.65598127309781, 24.895192167561607, 1868.1795017975555,
                        102.65483833999541, 24.902219367229762, 1856.3646821264895,
                    ]),
                width: 15,
                material: new Cesium.PolylineTrailLinkMaterialProperty(Cesium.Color.ORANGE, 9000)
            }
        })
    }

    /**
     * 添加原型扫描
     */
    addCircleScan () {
        /*
        添加扫描线 depth关闭   lon:-74.01296152309055 lat:40.70524201566827 height:129.14366696393927
        viewer
        cartographicCenter 扫描中心
        maxRadius 最大半径 米
        scanColor 扫描颜色
        duration 持续时间 毫秒
        */
        this.app.viewer.scene.globe.depthTestAgainstTerrain = true // 必须开启,否则

        /*
        添加扫描线 depth关闭   lon:-74.01296152309055 lat:40.70524201566827 height:129.14366696393927
        viewer
        cartographicCenter 扫描中心
        maxRadius 最大半径 米
        scanColor 扫描颜色
        duration 持续时间 毫秒
        */
        function AddCircleScanPostStage (viewer, cartographicCenter, maxRadius, scanColor, duration) {
            let ScanSegmentShader =
                'uniform sampler2D colorTexture;\n' +
                'uniform sampler2D depthTexture;\n' +
                'varying vec2 v_textureCoordinates;\n' +
                'uniform vec4 u_scanCenterEC;\n' +
                'uniform vec3 u_scanPlaneNormalEC;\n' +
                'uniform float u_radius;\n' +
                'uniform vec4 u_scanColor;\n' +

                'vec4 toEye(in vec2 uv, in float depth)\n' +
                ' {\n' +
                ' vec2 xy = vec2((uv.x * 2.0 - 1.0),(uv.y * 2.0 - 1.0));\n' +
                ' vec4 posInCamera =czm_inverseProjection * vec4(xy, depth, 1.0);\n' +
                ' posInCamera =posInCamera / posInCamera.w;\n' +
                ' return posInCamera;\n' +
                ' }\n' +

                'vec3 pointProjectOnPlane(in vec3 planeNormal, in vec3 planeOrigin, in vec3 point)\n' +
                '{\n' +
                'vec3 v01 = point -planeOrigin;\n' +
                'float d = dot(planeNormal, v01) ;\n' +
                'return (point - planeNormal * d);\n' +
                '}\n' +

                'float getDepth(in vec4 depth)\n' +
                '{\n' +
                'float z_window = czm_unpackDepth(depth);\n' +
                'z_window = czm_reverseLogDepth(z_window);\n' +
                'float n_range = czm_depthRange.near;\n' +
                'float f_range = czm_depthRange.far;\n' +
                'return (2.0 * z_window - n_range - f_range) / (f_range - n_range);\n' +
                '}\n' +

                'void main()\n' +
                '{\n' +
                'gl_FragColor = texture2D(colorTexture, v_textureCoordinates);\n' +
                'float depth = getDepth( texture2D(depthTexture, v_textureCoordinates));\n' +
                'vec4 viewPos = toEye(v_textureCoordinates, depth);\n' +
                'vec3 prjOnPlane = pointProjectOnPlane(u_scanPlaneNormalEC.xyz, u_scanCenterEC.xyz, viewPos.xyz);\n' +
                'float dis = length(prjOnPlane.xyz - u_scanCenterEC.xyz);\n' +
                'if(dis < u_radius)\n' +
                '{\n' +
                'float f = 1.0 -abs(u_radius - dis) / u_radius;\n' +
                'f = pow(f, 4.0);\n' +
                'gl_FragColor = mix(gl_FragColor, u_scanColor, f);\n' +
                '}\n' +
                '}\n'

            let _Cartesian3Center = Cesium.Cartographic.toCartesian(cartographicCenter)
            let _Cartesian4Center = new Cesium.Cartesian4(_Cartesian3Center.x, _Cartesian3Center.y, _Cartesian3Center.z, 1)

            let _CartographicCenter1 = new Cesium.Cartographic(cartographicCenter.longitude, cartographicCenter.latitude, cartographicCenter.height + 500)
            let _Cartesian3Center1 = Cesium.Cartographic.toCartesian(_CartographicCenter1)
            let _Cartesian4Center1 = new Cesium.Cartesian4(_Cartesian3Center1.x, _Cartesian3Center1.y, _Cartesian3Center1.z, 1)

            let _time = (new Date()).getTime()

            let _scratchCartesian4Center = new Cesium.Cartesian4()
            let _scratchCartesian4Center1 = new Cesium.Cartesian4()
            let _scratchCartesian3Normal = new Cesium.Cartesian3()

            let ScanPostStage = new Cesium.PostProcessStage({
                fragmentShader: ScanSegmentShader,
                uniforms: {
                    u_scanCenterEC: function () {
                        return Cesium.Matrix4.multiplyByVector(viewer.camera._viewMatrix, _Cartesian4Center, _scratchCartesian4Center)
                    },
                    u_scanPlaneNormalEC: function () {
                        let temp = Cesium.Matrix4.multiplyByVector(viewer.camera._viewMatrix, _Cartesian4Center, _scratchCartesian4Center)
                        let temp1 = Cesium.Matrix4.multiplyByVector(viewer.camera._viewMatrix, _Cartesian4Center1, _scratchCartesian4Center1)
                        _scratchCartesian3Normal.x = temp1.x - temp.x
                        _scratchCartesian3Normal.y = temp1.y - temp.y
                        _scratchCartesian3Normal.z = temp1.z - temp.z

                        Cesium.Cartesian3.normalize(_scratchCartesian3Normal, _scratchCartesian3Normal)
                        return _scratchCartesian3Normal
                    },
                    u_radius: function () {
                        return maxRadius * (((new Date()).getTime() - _time) % duration) / duration
                    },
                    u_scanColor: scanColor
                }
            })

            viewer.scene.postProcessStages.add(ScanPostStage)
        }

        let lon = 102.65416219381753
        let lat = 24.90134988427503
        let CartographicCenter = new Cesium.Cartographic(Cesium.Math.toRadians(lon), Cesium.Math.toRadians(lat), 0)
        let scanColor = new Cesium.Color(1.0, 0.0, 0.0, 1)
        AddCircleScanPostStage(this.app.viewer, CartographicCenter, 50, scanColor, 4000)
    }

    /**
     * 添加雷达原型扫描
     */
    addRadarScan () {
        /*
          添加雷达扫描线 地形遮挡开启   lon:-74.01296152309055 lat:40.70524201566827 height:129.14366696393927
          viewer
          cartographicCenter 扫描中心
          radius  半径 米
          scanColor 扫描颜色
          duration 持续时间 毫秒
        */
        this.app.viewer.scene.globe.depthTestAgainstTerrain = true // 必须开启,否则

        function AddRadarScanPostStage (viewer, cartographicCenter, radius, scanColor, duration) {
            let ScanSegmentShader =
                'uniform sampler2D colorTexture;\n' +
                'uniform sampler2D depthTexture;\n' +
                'varying vec2 v_textureCoordinates;\n' +
                'uniform vec4 u_scanCenterEC;\n' +
                'uniform vec3 u_scanPlaneNormalEC;\n' +
                'uniform vec3 u_scanLineNormalEC;\n' +
                'uniform float u_radius;\n' +
                'uniform vec4 u_scanColor;\n' +

                'vec4 toEye(in vec2 uv, in float depth)\n' +
                ' {\n' +
                ' vec2 xy = vec2((uv.x * 2.0 - 1.0),(uv.y * 2.0 - 1.0));\n' +
                ' vec4 posInCamera =czm_inverseProjection * vec4(xy, depth, 1.0);\n' +
                ' posInCamera =posInCamera / posInCamera.w;\n' +
                ' return posInCamera;\n' +
                ' }\n' +

                'bool isPointOnLineRight(in vec3 ptOnLine, in vec3 lineNormal, in vec3 testPt)\n' +
                '{\n' +
                'vec3 v01 = testPt - ptOnLine;\n' +
                'normalize(v01);\n' +
                'vec3 temp = cross(v01, lineNormal);\n' +
                'float d = dot(temp, u_scanPlaneNormalEC);\n' +
                'return d > 0.5;\n' +
                '}\n' +

                'vec3 pointProjectOnPlane(in vec3 planeNormal, in vec3 planeOrigin, in vec3 point)\n' +
                '{\n' +
                'vec3 v01 = point -planeOrigin;\n' +
                'float d = dot(planeNormal, v01) ;\n' +
                'return (point - planeNormal * d);\n' +
                '}\n' +

                'float distancePointToLine(in vec3 ptOnLine, in vec3 lineNormal, in vec3 testPt)\n' +
                '{\n' +
                'vec3 tempPt = pointProjectOnPlane(lineNormal, ptOnLine, testPt);\n' +
                'return length(tempPt - ptOnLine);\n' +
                '}\n' +

                'float getDepth(in vec4 depth)\n' +
                '{\n' +
                'float z_window = czm_unpackDepth(depth);\n' +
                'z_window = czm_reverseLogDepth(z_window);\n' +
                'float n_range = czm_depthRange.near;\n' +
                'float f_range = czm_depthRange.far;\n' +
                'return (2.0 * z_window - n_range - f_range) / (f_range - n_range);\n' +
                '}\n' +

                'void main()\n' +
                '{\n' +
                'gl_FragColor = texture2D(colorTexture, v_textureCoordinates);\n' +
                'float depth = getDepth( texture2D(depthTexture, v_textureCoordinates));\n' +
                'vec4 viewPos = toEye(v_textureCoordinates, depth);\n' +
                'vec3 prjOnPlane = pointProjectOnPlane(u_scanPlaneNormalEC.xyz, u_scanCenterEC.xyz, viewPos.xyz);\n' +
                'float dis = length(prjOnPlane.xyz - u_scanCenterEC.xyz);\n' +
                'float twou_radius = u_radius * 2.0;\n' +
                'if(dis < u_radius)\n' +
                '{\n' +
                'float f0 = 1.0 -abs(u_radius - dis) / u_radius;\n' +
                'f0 = pow(f0, 64.0);\n' +
                'vec3 lineEndPt = vec3(u_scanCenterEC.xyz) + u_scanLineNormalEC * u_radius;\n' +
                'float f = 0.0;\n' +
                'if(isPointOnLineRight(u_scanCenterEC.xyz, u_scanLineNormalEC.xyz, prjOnPlane.xyz))\n' +
                '{\n' +
                'float dis1= length(prjOnPlane.xyz - lineEndPt);\n' +
                'f = abs(twou_radius -dis1) / twou_radius;\n' +
                'f = pow(f, 3.0);\n' +
                '}\n' +
                'gl_FragColor = mix(gl_FragColor, u_scanColor, f + f0);\n' +
                '}\n' +
                '}\n'

            let _Cartesian3Center = Cesium.Cartographic.toCartesian(cartographicCenter)
            let _Cartesian4Center = new Cesium.Cartesian4(_Cartesian3Center.x, _Cartesian3Center.y, _Cartesian3Center.z, 1)

            let _CartographicCenter1 = new Cesium.Cartographic(cartographicCenter.longitude, cartographicCenter.latitude, cartographicCenter.height + 500)
            let _Cartesian3Center1 = Cesium.Cartographic.toCartesian(_CartographicCenter1)
            let _Cartesian4Center1 = new Cesium.Cartesian4(_Cartesian3Center1.x, _Cartesian3Center1.y, _Cartesian3Center1.z, 1)

            let _CartographicCenter2 = new Cesium.Cartographic(cartographicCenter.longitude + Cesium.Math.toRadians(0.001), cartographicCenter.latitude, cartographicCenter.height)
            let _Cartesian3Center2 = Cesium.Cartographic.toCartesian(_CartographicCenter2)
            let _Cartesian4Center2 = new Cesium.Cartesian4(_Cartesian3Center2.x, _Cartesian3Center2.y, _Cartesian3Center2.z, 1)
            let _RotateQ = new Cesium.Quaternion()
            let _RotateM = new Cesium.Matrix3()

            let _time = (new Date()).getTime()

            let _scratchCartesian4Center = new Cesium.Cartesian4()
            let _scratchCartesian4Center1 = new Cesium.Cartesian4()
            let _scratchCartesian4Center2 = new Cesium.Cartesian4()
            let _scratchCartesian3Normal = new Cesium.Cartesian3()
            let _scratchCartesian3Normal1 = new Cesium.Cartesian3()

            let ScanPostStage = new Cesium.PostProcessStage({
                fragmentShader: ScanSegmentShader,
                uniforms: {
                    u_scanCenterEC: function () {
                        return Cesium.Matrix4.multiplyByVector(viewer.camera._viewMatrix, _Cartesian4Center, _scratchCartesian4Center)
                    },
                    u_scanPlaneNormalEC: function () {
                        let temp = Cesium.Matrix4.multiplyByVector(viewer.camera._viewMatrix, _Cartesian4Center, _scratchCartesian4Center)
                        let temp1 = Cesium.Matrix4.multiplyByVector(viewer.camera._viewMatrix, _Cartesian4Center1, _scratchCartesian4Center1)
                        _scratchCartesian3Normal.x = temp1.x - temp.x
                        _scratchCartesian3Normal.y = temp1.y - temp.y
                        _scratchCartesian3Normal.z = temp1.z - temp.z

                        Cesium.Cartesian3.normalize(_scratchCartesian3Normal, _scratchCartesian3Normal)
                        return _scratchCartesian3Normal
                    },
                    u_radius: radius,
                    u_scanLineNormalEC: function () {
                        let temp = Cesium.Matrix4.multiplyByVector(viewer.camera._viewMatrix, _Cartesian4Center, _scratchCartesian4Center)
                        let temp1 = Cesium.Matrix4.multiplyByVector(viewer.camera._viewMatrix, _Cartesian4Center1, _scratchCartesian4Center1)
                        let temp2 = Cesium.Matrix4.multiplyByVector(viewer.camera._viewMatrix, _Cartesian4Center2, _scratchCartesian4Center2)

                        _scratchCartesian3Normal.x = temp1.x - temp.x
                        _scratchCartesian3Normal.y = temp1.y - temp.y
                        _scratchCartesian3Normal.z = temp1.z - temp.z

                        Cesium.Cartesian3.normalize(_scratchCartesian3Normal, _scratchCartesian3Normal)

                        _scratchCartesian3Normal1.x = temp2.x - temp.x
                        _scratchCartesian3Normal1.y = temp2.y - temp.y
                        _scratchCartesian3Normal1.z = temp2.z - temp.z

                        let tempTime = (((new Date()).getTime() - _time) % duration) / duration
                        Cesium.Quaternion.fromAxisAngle(_scratchCartesian3Normal, tempTime * Cesium.Math.PI * 2, _RotateQ)
                        Cesium.Matrix3.fromQuaternion(_RotateQ, _RotateM)
                        Cesium.Matrix3.multiplyByVector(_RotateM, _scratchCartesian3Normal1, _scratchCartesian3Normal1)
                        Cesium.Cartesian3.normalize(_scratchCartesian3Normal1, _scratchCartesian3Normal1)
                        return _scratchCartesian3Normal1
                    },
                    u_scanColor: scanColor
                }
            })

            viewer.scene.postProcessStages.add(ScanPostStage)
        }

        let lon = 102.65416219381753
        let lat = 24.90134988427503
        let CartographicCenter = new Cesium.Cartographic(Cesium.Math.toRadians(lon), Cesium.Math.toRadians(lat), 0)
        let scanColor = new Cesium.Color(1.0, 0.0, 0.0, 1)
        AddRadarScanPostStage(this.app.viewer, CartographicCenter, 100, scanColor, 4000)
    }

    /**
     * 添加flyline
     */
    addFlyLine3D () {
        /*
          流纹纹理线
          color 颜色
          duration 持续时间 毫秒
       */
        function PolylineTrailLinkMaterialProperty (color, duration) {
            this._definitionChanged = new Cesium.Event()
            this._color = undefined
            this._colorSubscription = undefined
            this.color = color
            this.duration = duration
            this._time = (new Date()).getTime()
        }

        Object.defineProperties(PolylineTrailLinkMaterialProperty.prototype, {
            isConstant: {
                get: function () {
                    return false
                }
            },
            definitionChanged: {
                get: function () {
                    return this._definitionChanged
                }
            },
            color: Cesium.createPropertyDescriptor('color')
        })
        PolylineTrailLinkMaterialProperty.prototype.getType = function (time) {
            return 'PolylineTrailLink'
        }
        PolylineTrailLinkMaterialProperty.prototype.getValue = function (time, result) {
            if (!Cesium.defined(result)) {
                result = {}
            }
            result.color = Cesium.Property.getValueOrClonedDefault(this._color, time, Cesium.Color.WHITE, result.color)
            result.image = Cesium.Material.PolylineTrailLinkImage
            result.time = (((new Date()).getTime() - this._time) % this.duration) / this.duration
            return result
        }
        PolylineTrailLinkMaterialProperty.prototype.equals = function (other) {
            return this === other ||
                (other instanceof PolylineTrailLinkMaterialProperty &&
                    Cesium.Property.equals(this._color, other._color))
        }
        Cesium.PolylineTrailLinkMaterialProperty = PolylineTrailLinkMaterialProperty
        Cesium.Material.PolylineTrailLinkType = 'PolylineTrailLink'
        Cesium.Material.PolylineTrailLinkImage = 'http://localhost:1111/3Dstatic/loadData/colors3.png'
        Cesium.Material.PolylineTrailLinkSource = 'czm_material czm_getMaterial(czm_materialInput materialInput)\n\
                                                      {\n\
                                                           czm_material material = czm_getDefaultMaterial(materialInput);\n\
                                                           vec2 st = materialInput.st;\n\
                                                           vec4 colorImage = texture2D(image, vec2(fract(st.s - time), st.t));\n\
                                                           material.alpha = colorImage.a * color.a;\n\
                                                           material.diffuse = (colorImage.rgb+color.rgb)/2.0;\n\
                                                           return material;\n\
                                                       }'
        Cesium.Material._materialCache.addMaterial(Cesium.Material.PolylineTrailLinkType, {
            fabric: {
                type: Cesium.Material.PolylineTrailLinkType,
                uniforms: {
                    color: new Cesium.Color(1.0, 0.0, 0.0, 0.5),
                    image: Cesium.Material.PolylineTrailLinkImage,
                    time: 0
                },
                source: Cesium.Material.PolylineTrailLinkSource
            },
            translucent: function (material) {
                return true
            }
        })

        function parabolaEquation (options, resultOut) {
            //方程 y=-(4h/L^2)*x^2+h h:顶点高度 L：横纵间距较大者
            let h = options.height && options.height > 5000 ? options.height : 5000
            let L = Math.abs(options.pt1.lon - options.pt2.lon) > Math.abs(options.pt1.lat - options.pt2.lat) ? Math.abs(options.pt1.lon - options.pt2.lon) : Math.abs(options.pt1.lat - options.pt2.lat)
            let num = options.num && options.num > 50 ? options.num : 50
            let result = []
            let dlt = L / num
            if (Math.abs(options.pt1.lon - options.pt2.lon) > Math.abs(options.pt1.lat - options.pt2.lat)) {//以lon为基准
                let delLat = (options.pt2.lat - options.pt1.lat) / num
                if (options.pt1.lon - options.pt2.lon > 0) {
                    dlt = -dlt
                }
                for (let i = 0; i < num; i++) {
                    let tempH = h - Math.pow((-0.5 * L + Math.abs(dlt) * i), 2) * 4 * h / Math.pow(L, 2)
                    let lon = options.pt1.lon + dlt * i
                    let lat = options.pt1.lat + delLat * i
                    result.push([lon, lat, tempH])
                }
            } else {//以lat为基准
                let delLon = (options.pt2.lon - options.pt1.lon) / num
                if (options.pt1.lat - options.pt2.lat > 0) {
                    dlt = -dlt
                }
                for (let i = 0; i < num; i++) {
                    let tempH = h - Math.pow((-0.5 * L + Math.abs(dlt) * i), 2) * 4 * h / Math.pow(L, 2)
                    let lon = options.pt1.lon + delLon * i
                    let lat = options.pt1.lat + dlt * i
                    result.push([lon, lat, tempH])
                }
            }
            if (resultOut != undefined) {
                resultOut = result
            }
            return result
        }
        let material = null;
        let center = {lon: 102.65416219381753, lat: 24.90134988427503}
        let cities = [
            {'lon': 115.028495718, 'lat': 30.200814617},
            {'lon': 110.795000473, 'lat': 32.638540762},
            // { "lon": 111.267729446, "lat": 30.698151246 },
            // { "lon": 112.126643144, "lat": 32.058588576 },
            // { "lon": 114.885884938, "lat": 30.395401912 },
            // { "lon": 112.190419415, "lat": 31.043949588 },
            // { "lon": 113.903569642, "lat": 30.932054050 },
            // { "lon": 112.226648859, "lat": 30.367904255 },
            // { "lon": 114.861716770, "lat": 30.468634833 },
            // { "lon": 114.317846048, "lat": 29.848946148 },
            // { "lon": 113.371985426, "lat": 31.704988330 },
            // { "lon": 109.468884533, "lat": 30.289012191 },
            // { "lon": 113.414585069, "lat": 30.368350431 },
            // { "lon": 112.892742589, "lat": 30.409306203 },
            // { "lon": 113.160853710, "lat": 30.667483468 },
            // { "lon": 110.670643354, "lat": 31.748540780 }
        ]
        if (material != null) {
        } else {
            material = new Cesium.PolylineTrailLinkMaterialProperty(Cesium.Color.ORANGE, 3000)
        }
        for (let j = 0; j < cities.length; j++) {
            let points = parabolaEquation({pt1: center, pt2: cities[j], height: 50000, num: 100})
            let pointArr = []
            for (let i = 0; i < points.length; i++) {
                pointArr.push(points[i][0], points[i][1], points[i][2])
            }
            viewer.entities.add({
                name: 'PolylineTrailLink' + j,
                polyline: {
                    positions: Cesium.Cartesian3.fromDegreesArrayHeights(pointArr),
                    width: 2,
                    material: material
                }
            })
        }

        viewer.entities.add({
            position: Cesium.Cartesian3.fromDegrees(center.lon, center.lat, 1),
            point: {
                pixelSize: 6,
                color: Cesium.Color.BLUE
            }
        })
        for (let i = 0; i < cities.length; i++) {
            viewer.entities.add({
                position: Cesium.Cartesian3.fromDegrees(cities[i].lon, cities[i].lat, 1),
                point: {
                    pixelSize: 6,
                    color: Cesium.Color.RED
                }
            })
        }
    }
}
