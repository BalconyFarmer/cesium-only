import * as Cesium from 'cesium/Cesium'
import * as widget from 'cesium/Widgets/widgets.css'

/*
  流动纹理线
   color 颜色
   duration 持续时间 毫秒
*/

class PolylineTrailLinkMaterialProperty {
    constructor (color, duration) {
        this.addMaterial()
        this._definitionChanged = new Cesium.Event()
        this._color = undefined
        this._colorSubscription = undefined
        this.color = color
        this.duration = duration
        this._time = (new Date()).getTime()
    }

    addMaterial () {
        Cesium.PolylineTrailLinkMaterialProperty = PolylineTrailLinkMaterialProperty
        Cesium.Material.PolylineTrailLinkType = 'PolylineTrailLink'
        Cesium.Material.PolylineTrailLinkImage = 'http://localhost:1111/3Dstatic/loadData/colors.png'
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
    }

    get isConstant () {
        return false
    }

    get definitionChanged () {
        return this._definitionChanged
    }

    color () {
        return Cesium.createPropertyDescriptor('color')
    }

    getType () {
        return 'PolylineTrailLink'
    }

    getValue (time, result) {
        if (!Cesium.defined(result)) {
            result = {}
        }
        result.color = Cesium.Property.getValueOrClonedDefault(this._color, time, Cesium.Color.WHITE, result.color)
        result.image = Cesium.Material.PolylineTrailLinkImage
        result.time = (((new Date()).getTime() - this._time) % this.duration) / this.duration
        return result
    }

    equals (other) {
        return this === other ||
            (other instanceof PolylineTrailLinkMaterialProperty &&
                Property.equals(this._color, other._color))
    }
}

export {PolylineTrailLinkMaterialProperty}
