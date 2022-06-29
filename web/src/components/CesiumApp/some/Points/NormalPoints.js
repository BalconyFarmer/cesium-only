export default class NormalPoints {
    constructor(app) {
        this.app = app
    }

    /**
     * 闪烁billbord
     */
    addBlinkPoint() {
        let x = 1;
        let flog = true;
        this.app.viewer.entities.add({
            name: 'singleWarning',
            position: Cesium.Cartesian3.fromDegrees(116.20, 39.53),
            billboard: {
                image: require("./icon/摄像头.png"),
                name: 'singleWarning',
                show: new Cesium.CallbackProperty(function () {
                    if (flog) {
                        x = x - 0.05;
                        if (x <= 0) {
                            flog = false;
                        }
                    } else {
                        x = x + 0.05;
                        if (x >= 1) {
                            flog = true;
                        }
                    }
                    return x >= 0.5;
                }, false),
                width: 100,
                height: 100,
                distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 6.8e10)
            },
        })
    }

    removeBlinkPoint() {
        this.app.viewer.entities.removeAll()
    }

    addBlinkPointR() {
        let x = 1;
        let flog = true;
        this.app.viewer.entities.add({
            name: "圆点point闪烁",
            position: Cesium.Cartesian3.fromDegrees(116.20 + 0.03, 39.53 + 0.03, 0),
            point: {
                show: true, // default
                color: new Cesium.CallbackProperty(function () {
                    if (flog) {
                        x = x - 0.05;
                        if (x <= 0) {
                            flog = false;
                        }
                    } else {
                        x = x + 0.05;
                        if (x >= 1) {
                            flog = true;
                        }
                    }
                    return Cesium.Color.YELLOW.withAlpha(x);
                }, false),
                pixelSize: 10, // default: 1
                outlineWidth: 0
            }
        });
    }

    addBlinkFace() {
        let x = 1;
        let flog = true;
        this.app.viewer.entities.add({
            name: "圆形区域闪烁",
            position: Cesium.Cartesian3.fromDegrees(116.20, 39.53, 0),
            ellipse: {
                semiMinorAxis: 2000.0,
                semiMajorAxis: 2000.0,
                height: 0,
                material: new Cesium.ColorMaterialProperty(new Cesium.CallbackProperty(function () {
                    if (flog) {
                        x = x - 0.05;
                        if (x <= 0) {
                            flog = false;
                        }
                    } else {
                        x = x + 0.05;
                        if (x >= 1) {
                            flog = true;
                        }
                    }
                    console.log(x)
                    return Cesium.Color.YELLOW.withAlpha(x);
                }, false))
            }
        });
    }

    addBillCanvas() {
        const self = this
        let index = 1
        setInterval(function () {
            index += 1
            self.removeBlinkPoint()
            // 创建二维画布
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            ctx.clearRect(0, 0, 200, 150);

            let img = new Image();
            img.src = require("./icon/home_icon_19.png");
            img.onload = () => {
                ctx.drawImage(img, 0, 0, 200, 150);
                ctx.font = 'bold 36px lion';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'bottom';
                ctx.fillStyle = '#aee11a';
                ctx.fillText("中国智造" + index, 100, 50);

                // 将画布转化成图片
                let image = new Image();
                image.src = canvas.toDataURL("image/png")

                // 使用cesium创建实体
                let entity = viewer.entities.add({
                    position: Cesium.Cartesian3.fromDegrees(109.44, 32.11, 30.0),
                    billboard: {
                        image: image,
                        width: 200,
                        height: 150,
                    },
                });
            }
        }, 2000)
    }

}
