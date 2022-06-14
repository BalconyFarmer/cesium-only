import * as Cesium from 'cesium/Cesium'
import * as widget from 'cesium/Widgets/widgets.css'

/**
 * https://blog.csdn.net/weixin_36617251/article/details/118366285
 */
export default class InnerMaterial {
    constructor (app) {
        this.app = app
        this.TooltipCesium = null
    }

    /**
     * 颜色材质
     */
    addColor (Cartesian3) {

        const materail2 = new Cesium.ColorMaterialProperty(new Cesium.CallbackProperty(function () {
            return Cesium.Color.RED.withAlpha(0.5)
        }, false))

        const _entity = {
            name: '圆柱体',
            position: Cartesian3,
            cylinder: {
                length: 10.0,//圆柱体高度
                topRadius: 2,//圆柱体的顶部半径。
                bottomRadius: 2,//    圆柱体底部的半径。
                material: materail2,
                outline: true,//轮廓
                outlineColor: Cesium.Color.DARK_GREEN,//轮廓颜色深绿色
                heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
                semiMinorAxis: 2000.0,
                semiMajorAxis: 2000.0,
            }
        }
        //圆柱体
        const entity = this.app.viewer.entities.add(_entity)
        this.app.lookLast()

    }

    /**
     * 发光线条材质
     */
    addMaterial (Cartesian3) {

        const metarial = new Cesium.PolylineGlowMaterialProperty({
            glowPower: 0.2,
            color: Cesium.Color.BLUE.withAlpha(0.5),
        })

        let index= 0
        function getRotationValue () {
            let _a = Cesium.Transforms.headingPitchRollQuaternion(
                Cartesian3,
                new Cesium.HeadingPitchRoll(Cesium.Math.toRadians(index), 0, 0)
            )
            index += 1
            return _a
        }

        const _entity = {
            name: '发光线条',
            position: Cartesian3,
            orientation: new Cesium.CallbackProperty(getRotationValue, false),
            box: {
                dimensions: new Cesium.Cartesian3(40.0, 50.0, 60.0),
                material: metarial,
                outline: true, //显示轮廓
                outlineColor: Cesium.Color.BLACK,
                heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
            }
        }
        //圆柱体
        const result = this.app.viewer.entities.add(_entity)
        this.app.lookLast()
        // const self = this
        // self.app.animation.rollEntity(result, 100)
    }

    addImgMaterial (Cartesian3) {
        const metarial = new Cesium.ImageMaterialProperty({
            image: 'http://localhost:1111/3Dstatic/loadData/fire.png',
            // color: Cesium.Color.BLUE,
            repeat: new Cesium.Cartesian2(4, 4)
        })

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
        this.app.lookLast()

    }

    addCheckerboardMaterialProperty (Cartesian3) {
        const metarial = new Cesium.CheckerboardMaterialProperty({
            evenColor: Cesium.Color.WHITE,
            oddColor: Cesium.Color.BLACK,
            repeat: new Cesium.Cartesian2(4, 4)
        })

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
        this.app.lookLast()

    }

    /**
     * 条纹文理
     * @param Cartesian3
     */
    addStripeMaterialProperty (Cartesian3) {
        const metarial = new Cesium.StripeMaterialProperty({
            evenColor: Cesium.Color.WHITE,
            oddColor: Cesium.Color.BLACK,
            repeat: 32,
            offset: 20,
            orientation: Cesium.StripeOrientation.VERTICAL
        })

        let en = {
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
        }
        let _en = this.app.viewer.entities.add(en)
        this.app.lookLast()
        x
    }

    /**
     * 条纹文理
     * @param Cartesian3
     */
    addGridMaterialProperty (Cartesian3) {
        const metarial = new Cesium.GridMaterialProperty({
            color: Cesium.Color.YELLOW,
            cellAlpha: 0.2,
            lineCount: new Cesium.Cartesian2(4, 4),
            lineThickness: new Cesium.Cartesian2(2.0, 2.0)
        })

        const _en = this.app.viewer.entities.add({
            name: '圆柱体',
            position: Cartesian3,
            cylinder: {
                length: 20.0,//圆柱体高度
                topRadius: 10,//圆柱体的顶部半径。
                bottomRadius: 1,//    圆柱体底部的半径。
                material: metarial,
                outline: false,//轮廓
                outlineColor: Cesium.Color.DARK_GREEN,//轮廓颜色深绿色
                heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
                // semiMinorAxis: 2000.0,
                // semiMajorAxis: 2000.0,
            }
        })
        this.app.lookLast()
        const self = this
        setTimeout(function () {
            self.app.animation.rollEntity(_en, 100)
        }, 1000)

    }
}
