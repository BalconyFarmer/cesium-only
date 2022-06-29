
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

    removeKml() {

    }

}
