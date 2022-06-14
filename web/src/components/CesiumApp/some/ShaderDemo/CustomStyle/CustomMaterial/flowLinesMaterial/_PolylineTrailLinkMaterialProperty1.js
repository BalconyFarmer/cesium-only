import * as Cesium from 'cesium/Cesium'
import * as widget from 'cesium/Widgets/widgets.css'

/*
    自定义材质
        https://www.jianshu.com/p/678cb44fbbc2
        1. diffuse：材质的散射光通道，使用vec3定义了光在所有方向的散射值 。
        2. specular：材质的高光属性，定个定义了材质的反射强度。
        3. shininess：高反射的锐度，值 越大创建一个更小的高亮光斑。
        4. normal：材质的法向属性，使用vec3定义了在视点空间的表面法向量，一般在法向贴图上使用，默认是表面法向量。
        5. emission：材质的自发光属性，使用vec3定义了所有方向上灯光发出的颜色。
        6. alpha：材质的透明度，使用一个float值 定义。

        自定义泛光面参考:
        https://zhangticcc.gitee.io/2020/05/18/cesium-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%9D%90%E8%B4%A8%E6%B3%9B%E5%85%89%E9%9D%A2/
    流动纹理线
    color 颜色
    duration 持续时间 毫秒
 */
function initFlowMatetial1 (imgUrl) {

    function PolylineTrailLinkMaterialProperty1 (color, duration) {
        this._definitionChanged = new Cesium.Event()
        this._color = undefined
        this._colorSubscription = undefined
        this.color = color
        this.duration = duration
        this._time = (new Date()).getTime()
    }

    Object.defineProperties(PolylineTrailLinkMaterialProperty1.prototype, {
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

    PolylineTrailLinkMaterialProperty1.prototype.getType = function (time) {
        return 'PolylineTrailLink'
    }
    PolylineTrailLinkMaterialProperty1.prototype.getValue = function (time, result) {
        if (!Cesium.defined(result)) {
            result = {}
        }
        result.color = Cesium.Property.getValueOrClonedDefault(this._color, time, Cesium.Color.WHITE, result.color)
        result.image = imgUrl
        result.time = (((new Date()).getTime() - this._time) % this.duration) / this.duration
        return result
    }
    PolylineTrailLinkMaterialProperty1.prototype.equals = function (other) {
        return this === other ||
            (other instanceof PolylineTrailLinkMaterialProperty1 &&
                Cesium.Property.equals(this._color, other._color))
    }

    let PolylineTrailLinkSource = 'czm_material czm_getMaterial(czm_materialInput materialInput)\n\
                                                      {\n\
                                                           czm_material material = czm_getDefaultMaterial(materialInput);\n\
                                                           vec2 st = materialInput.st;\n\
                                                           vec4 colorImage = texture2D(image, st.t , vec2(fract(st.s - time)));\n\
                                                           material.alpha = colorImage.a * color.a;\n\
                                                           material.diffuse = (colorImage.rgb+color.rgb)/2.0;\n\
                                                           return material;\n\
                                                       }'
    Cesium.Material._materialCache.addMaterial('PolylineTrailLink', {
        fabric: {
            type: 'PolylineTrailLink',
            uniforms: {
                color: new Cesium.Color(1.0, 0.0, 0.0, 0.5),
                image: imgUrl,
                time: 0
            },
            source: PolylineTrailLinkSource
        },
        translucent: function (material) {
            return true
        }
    })
    Cesium.PolylineTrailLinkMaterialProperty1 = PolylineTrailLinkMaterialProperty1

}

export {initFlowMatetial1}
