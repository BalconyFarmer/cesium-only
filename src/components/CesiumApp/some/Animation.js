import * as Cesium from 'cesium/Cesium'
import * as widget from 'cesium/Widgets/widgets.css'

/**
 * 平移 旋转 缩放 参考
 * https://www.jianshu.com/p/0b0df0eb791b
 */
export default class Animation {
    constructor (app) {
        this.app = app
    }

    /**
     * 旋转动画
     * @param en
     * @param data
     */
    rollEntity (en, data) {
        let index = 1
        const self = this

        // function run () {
        //     // let position = en.position.getValue(Cesium.JulianDate.now()); //先得到entity的位置
        //     // en.position = new Cesium.CallbackProperty(function () {
        //     //     return new Cesium.Cartesian3(
        //     //         position.x + 1, position.y, position.z
        //     //     )
        //     // }, false)
        //
        //     self.app.rotateEntity(index, 0, 0, en)
        //     index += 1
        //     requestAnimationFrame(run)
        // }
        //
        // run()

        setInterval(function () {
            self.app.rotateEntity(index, 0, 0, en)
            index += 1
        },100)
    }

    /**
     * 平移动画
     */
    moveEntity () {

    }

    test () {
        /*
                let position = object.position.getValue(Cesium.JulianDate.now());//先得到entity的位置

                let orientation = object.orientation.getValue(Cesium.JulianDate.now());//entity的朝向

                function rotatingByMatrix4(mat, options) {

                    let _rotateX = Cesium.Matrix3.fromRotationX(Cesium.Math.toRadians(options.x));

                    let _rotateY = Cesium.Matrix3.fromRotationY(Cesium.Math.toRadians(options.y));

                    let _rotateZ = Cesium.Matrix3.fromRotationZ(Cesium.Math.toRadians(options.z));

                    mat = Cesium.Matrix4.multiplyByMatrix3(mat, _rotateX, mat);

                    mat = Cesium.Matrix4.multiplyByMatrix3(mat, _rotateY, mat);

                    mat = Cesium.Matrix4.multiplyByMatrix3(mat, _rotateZ, mat);

                    return mat;

                }

                let transform = Cesium.Matrix4.fromTranslationQuaternionRotationScale(position, orientation, new Cesium.Cartesian3(1, 1, 1), new Cesium.Matrix4());//得到entity的位置朝向矩阵

                transform = rotatingByMatrix4(transform, options);//根据沿着x,y,z轴旋转之后，得到旋转矩阵

                let orientation = new Cesium.Quaternion();

                let m3 = Cesium.Matrix4.getRotation(transform, new Cesium.Matrix3());//得到3*3的旋转矩阵

                Cesium.Quaternion.fromRotationMatrix(m3, orientation);//将旋转矩阵转换成齐次坐标

                object.orientation.setValue(orientation);//更新entity的朝向
        */

    }

}
