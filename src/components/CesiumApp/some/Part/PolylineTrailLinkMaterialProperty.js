import * as Cesium from 'cesium/Cesium'
import * as widget from 'cesium/Widgets/widgets.css'



/*
  流动纹理线
   color 颜色
   duration 持续时间 毫秒
*/

class PolylineTrailLinkMaterialProperty {
    constructor (color, duration) {
        this._definitionChanged = new Cesium.Event()
        this._color = undefined
        this._colorSubscription = undefined
        this.color = color
        this.duration = duration
        this._time = (new Date()).getTime()
        this.color = Cesium.createPropertyDescriptor('color')
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
