import * as Cesium from 'cesium/Cesium'
import * as widget from 'cesium/Widgets/widgets.css'

/*
    自定义材质
    流动纹理线
    color 颜色
    duration 持续时间 毫秒
 */
function initFlowMatetial2 (imgUrl) {

    function PolylineTrailLinkMaterialProperty2 (color, duration) {
        this._definitionChanged = new Cesium.Event()
        this._color = undefined
        this._colorSubscription = undefined
        this.color = color
        this.duration = duration
        this._time = (new Date()).getTime()
    }

    Object.defineProperties(PolylineTrailLinkMaterialProperty2.prototype, {
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

    PolylineTrailLinkMaterialProperty2.prototype.getType = function (time) {
        return 'PolylineTrailLink'
    }
    PolylineTrailLinkMaterialProperty2.prototype.getValue = function (time, result) {
        if (!Cesium.defined(result)) {
            result = {}
        }
        result.color = Cesium.Property.getValueOrClonedDefault(this._color, time, Cesium.Color.WHITE, result.color)
        result.image = imgUrl
        result.time = (((new Date()).getTime() - this._time) % this.duration) / this.duration
        return result
    }
    PolylineTrailLinkMaterialProperty2.prototype.equals = function (other) {
        return this === other ||
            (other instanceof PolylineTrailLinkMaterialProperty2 &&
                Cesium.Property.equals(this._color, other._color))
    }

    let PolylineTrailLinkSource = 'czm_material czm_getMaterial(czm_materialInput materialInput)\n\
                                                      {\n\
                                                           czm_material material = czm_getDefaultMaterial(materialInput);\n\
                                                           vec2 st = materialInput.st;\n\
                                                           vec4 colorImage = texture2D(image, vec2(fract(st.s - time), st.t));\n\
                                                           material.alpha = colorImage.a * color.a;\n\
                                                           material.diffuse = (colorImage.rgb+color.rgb)/2.0;\n\
                                                           material.emission = (colorImage.rgb+color.rgb)/200.0;\n\
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
    Cesium.PolylineTrailLinkMaterialProperty2 = PolylineTrailLinkMaterialProperty2

}

export {initFlowMatetial2}
