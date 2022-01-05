import * as Cesium from 'cesium/Cesium'
import * as widget from 'cesium/Widgets/widgets.css'

// import {PolylineTrailLinkMaterialProperty} from './PolylineTrailLinkMaterialProperty'
import {initFlowMatetial} from './_PolylineTrailLinkMaterialProperty'

/**
 * 自定义着色器样式类
 * PostProcess + GLSL 后期处理
 * Fabric + GLSL 自定义材质
 * 23种现成的Material类型
 */
export default class CustomStyle {
    constructor (app) {
        this.app = app
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
    addFlowLine (points) {
        const url = "http://localhost:1111/3Dstatic/loadData/flowNumber/11.png"
        initFlowMatetial(url) // 注册流动线材质

        let _p = null
        if (points) {
            _p = Cesium.Cartesian3.fromDegreesArrayHeights(points)
        } else {
            _p = Cesium.Cartesian3.fromDegreesArrayHeights(
                [
                    102.65350192582177,
                    24.90245912637886,
                    1856.801867224477,

                    102.65398695287782,
                    24.90242237510545,
                    1856.801867224477,

                    102.65392975708504,
                    24.90199492576048,
                    1856.801867224477,

                    102.65341015592861,
                    24.9019991170425,
                    1856.801867224477,

                ])
        }

        this.app.viewer.entities.add({
            name: 'PolylineTrail',
            polyline: {
                positions: _p,
                width: 20,
                material: new Cesium.PolylineTrailLinkMaterialProperty(Cesium.Color.ORANGE, 9000)
            }
        })
    }

    /**
     * 添加flyline
     */
    addFlyLine3D (centerP, citiesP) {
        const url = "http://localhost:1111/3Dstatic/loadData/flowNumber/11.png"
        initFlowMatetial(url) // 注册流动线材质

        // 抛物线 相等
        function parabolaEquation (options, resultOut) {
            //方程 y=-(4h/L^2)*x^2+h h:顶点高度 L：横纵间距较大者
            let h = options.height
            let L = Math.abs(options.pt1.lon - options.pt2.lon) > Math.abs(options.pt1.lat - options.pt2.lat) ? Math.abs(options.pt1.lon - options.pt2.lon) : Math.abs(options.pt1.lat - options.pt2.lat)
            let num = options.num
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

        let center = {lon: 102.6527445274038, lat: 24.902615750602656}
        if (centerP) {
            center = centerP
        }
        let cities = [
            {'lon': 106.29811132257352, 'lat': 23.737538875216853,},
            {'lon': 110.795000473, 'lat': 32.638540762},
        ]
        if (citiesP) {
            cities = citiesP
        }

        let material = new Cesium.PolylineTrailLinkMaterialProperty(Cesium.Color.ORANGE, 10000)

        for (let j = 0; j < cities.length; j++) {
            let points = parabolaEquation({pt1: center, pt2: cities[j], height: 500, num: 100})
            let pointArr = []
            for (let i = 0; i < points.length; i++) {
                pointArr.push(points[i][0], points[i][1], points[i][2])
            }
            viewer.entities.add({
                name: 'PolylineTrailLink' + j,
                polyline: {
                    positions: Cesium.Cartesian3.fromDegreesArrayHeights(pointArr),
                    width: 10,
                    material: material
                }
            })
        }

    }

    /**
     * 添加原型扫描
     * 代码注释:https://blog.csdn.net/A873054267/article/details/105365862
     */
    addCircleScan (option) {
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
                    // 扫描中心
                    u_scanCenterEC: function () {
                        return Cesium.Matrix4.multiplyByVector(viewer.camera._viewMatrix, _Cartesian4Center, _scratchCartesian4Center)
                    },
                    // 扫描平面法向量
                    u_scanPlaneNormalEC: function () {
                        let temp = Cesium.Matrix4.multiplyByVector(viewer.camera._viewMatrix, _Cartesian4Center, _scratchCartesian4Center)
                        let temp1 = Cesium.Matrix4.multiplyByVector(viewer.camera._viewMatrix, _Cartesian4Center1, _scratchCartesian4Center1)
                        _scratchCartesian3Normal.x = temp1.x - temp.x
                        _scratchCartesian3Normal.y = temp1.y - temp.y
                        _scratchCartesian3Normal.z = temp1.z - temp.z

                        Cesium.Cartesian3.normalize(_scratchCartesian3Normal, _scratchCartesian3Normal)
                        return _scratchCartesian3Normal
                    },
                    // 扫描半径
                    u_radius: function () {
                        return maxRadius * (((new Date()).getTime() - _time) % duration) / duration
                    },
                    // 扫描颜色
                    u_scanColor: scanColor
                }
            })

            viewer.scene.postProcessStages.add(ScanPostStage)
        }

        let lon = 102.65416219381753
        let lat = 24.90134988427503
        let radius = 50
        if (option) {
            lon = option.lon
            lat = option.lat
            radius = option.radius
        }
        let CartographicCenter = new Cesium.Cartographic(Cesium.Math.toRadians(lon), Cesium.Math.toRadians(lat), 0)
        let scanColor = new Cesium.Color.fromCssColorString('rgba(85, 66, 225, 1)')

        AddCircleScanPostStage(this.app.viewer, CartographicCenter, radius, scanColor, 4000)
    }

    /**
     * 添加雷达原型扫描
     */
    addRadarScan (option) {
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
        let radius = 100
        if (option) {
            lon = option.lon
            lat = option.lat
            radius = option.radius
        }

        let CartographicCenter = new Cesium.Cartographic(Cesium.Math.toRadians(lon), Cesium.Math.toRadians(lat), 0)
        let scanColor = new Cesium.Color.fromCssColorString('rgba(254, 129, 6, 0.75)')
        AddRadarScanPostStage(this.app.viewer, CartographicCenter, radius, scanColor, 4000)
    }

}
