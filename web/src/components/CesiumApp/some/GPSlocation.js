/**
 * navigator.geolocation
 * 获取定位
 *
 *         <div style="background-color:black;z-index: 99999;position: absolute; left: 0;top: 0;display: flex;flex-direction: column;justify-content: flex-start;align-items: flex-start">
 *             location
 *             <div>经度:{{webPosition.longitude}}</div>
 *             <div>纬度:{{webPosition.latitude}}</div>
 *             <div>经度纬度精度{{webPosition.accuracy}}</div>
 *             <div>高度:{{webPosition.altitude}}</div>
 *             <div>高度精度{{webPosition.altitudeAccuracy}}</div>
 *             <div>朝向:{{webPosition.heading}}</div>
 *             <div>速度{{webPosition.speed}}</div>
 *             <div>报错信息:{{webPosition.msg}}</div>
 *         </div>
 *
 *             webPosition: {
 *                 latitude: null,//纬度
 *                 longitude: null,//经度
 *                 accuracy: null,//位置精度
 *                 altitude: null,//海拔
 *                 altitudeAccuracy: null,//位置的海拔精度
 *                 heading: null,//方向
 *                 speed: null,//速度
 *                 msg: null
 *             },
 */
export default class GPSlocation {
    constructor(app) {
        this.app = app
        this.webPosition = {}
    }

    start() {
        const self = this

        setInterval(function () {
            test()
        }, 500)

        function test() {

            function getLocation() {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(showPosition, showError, {
                        enableHighAccuracy: true,
                        timeout: 5000,
                        maximumAge: 0,
                        provider: "amap",
                        coordsType: "wgs84",
                        geocode: true
                    });
                } else {
                    alert("该浏览器不支持获取地理位置。")
                }
            }

            function showPosition(position) {
                self.webPosition.latitude = position.coords.latitude
                self.webPosition.longitude = position.coords.longitude
                self.webPosition.accuracy = position.coords.accuracy
                self.webPosition.altitude = position.coords.altitude
                self.webPosition.altitudeAccuracy = position.coords.altitudeAccuracy
                self.webPosition.heading = position.coords.heading
                self.webPosition.speed = position.coords.speed
                // const see = self.webPosition.speed
                console.log(self.webPosition, "++++++++++++++++++++++++++++++")
                // debugger
                let pp = Cesium.Cartesian3.fromDegrees(position.coords.longitude, position.coords.latitude, 0)
                let entity = self.app.innerGeometry.addPoint(pp)
                // self.app.viewer.zoomTo(entity);

            }

            function showError(error) {
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        // alert("用户拒绝对获取地理位置的请求。")
                        console.log("用户拒绝对获取地理位置的请求。")
                        self.webPosition.msg = "用户拒绝对获取地理位置的请求。"
                        break;
                    case error.POSITION_UNAVAILABLE:
                        // alert("位置信息是不可用的。")
                        console.log("\"位置信息是不可用的。\"")
                        self.webPosition.msg = "位置信息是不可用的。"

                        break;
                    case error.TIMEOUT:
                        // alert("请求用户地理位置超时。")
                        console.log("请求用户地理位置超时。")
                        self.webPosition.msg = "请求用户地理位置超时。"

                        break;
                    case error.UNKNOWN_ERROR:
                        // alert("未知错误。")
                        console.log("未知错误。")
                        self.webPosition.msg = "未知错误。"

                        break;
                }
            }

            getLocation()
        }
    }


}
