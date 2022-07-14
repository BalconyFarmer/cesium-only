/**
 * 火车运动
 */

import a from "./Json/czml/ExtractData_all.json"
import * as turf from '@turf/turf'
import {czmlStand} from "./Json/czml/czmlStand"

export default class Train {
    constructor(app) {
        this.app = app
        // this.addDemoData()
        this.testChinaData()
    }

    addDemoData() {
        let time = 2.3
        let czml1 = czmlStand

        for (let i = 0; i < 30; i++) {
            //时间延迟
            let _czml1 = JSON.parse(JSON.stringify(czml1));
            _czml1[1].position.cartesian.forEach((item, index) => {
                let a = index % 4
                if (a == 0) {
                    _czml1[1].position.cartesian[index] += time * i
                }
            })
            if (i == 0) {
                _czml1[1].model.gltf = "http://localhost:8083/3Dstatic/czml/models/chewei(1).glb"
            } else if (i == 29) {
                _czml1[1].model.gltf = "http://localhost:8083/3Dstatic/czml/models/chetou(1).glb"
            } else {
                // _czml1[1].model.gltf = "http://localhost:8083/3Dstatic/czml/models/CAR/car3.glb"
            }



            this.dataSourcePromise2 = new Cesium.CzmlDataSource()
            this.dataSourcePromise2.load(_czml1)
            this.app.viewer.dataSources.add(this.dataSourcePromise2)
        }


        const self = this
        setTimeout(function () {
            self.app.viewer.trackedEntity = self.dataSourcePromise2.entities.getById(
                "Vehicle"
            );
        }, 1000)

        self.app.viewer.clock.onTick.addEventListener(function (clock) {
            // This example uses time offsets from the start to identify which parts need loading.
            const timeOffset = Cesium.JulianDate.secondsDifference(
                clock.currentTime,
                clock.startTime
            );

            // 重置时间
            if (timeOffset > 1500) {
                self.app.viewer.clock.currentTime = self.app.viewer.clock.startTime;
                self.app.viewer.clock.shouldAnimate = true;
            }

            // if (self.app.viewer.trackedEntity) {
            // const fuel = self.app.viewer.trackedEntity.properties.fuel_remaining.getValue(
            //     clock.currentTime
            // );
            // console.log(self.app.viewer.trackedEntity,"fuelfuelfuelfuelfuel")
            // }
        });



    }

    testChinaData() {
        const self = this
        let arr = []
        let timeINT = 0
        const speed = 0.01
        const timeDelay = 4

        let fake = []

        // 转换坐标 计算时间
        a.features[0].geometry.coordinates.forEach((item, index) => {
            if (index == 0) {
                let position = Cesium.Cartesian3.fromDegrees(item[0], item[1], 0)
                arr.push(timeINT)
                arr.push(position.x)
                arr.push(position.y)
                arr.push(position.z)
            } else {
                let from = turf.point([a.features[0].geometry.coordinates[index - 1][0], a.features[0].geometry.coordinates[index - 1][1]]);
                let to = turf.point([item[0], item[1]]);
                let options = {units: 'miles'};
                let distance = turf.distance(from, to, options);
                let t = distance / speed
                timeINT += t

                let position = Cesium.Cartesian3.fromDegrees(item[0], item[1], 0)
                arr.push(timeINT)
                arr.push(position.x)
                arr.push(position.y)
                arr.push(position.z)

                fake.push(item[0])
                fake.push(item[1])
            }
        })

        this.app.innerGeometry.glowingLine(fake)

        let czml1 = czmlStand
        czml1[1].position.cartesian = arr

        // 循环添加车厢
        for (let i = 0; i < 30; i++) {
            //时间延迟
            let _czml1 = JSON.parse(JSON.stringify(czml1));
            _czml1[1].position.cartesian.forEach((item, index) => {
                let a = index % 4
                if (a == 0) {
                    _czml1[1].position.cartesian[index] += timeDelay * i
                }
            })
            if (i == 0) {
                _czml1[1].model.gltf = "http://localhost:8083/3Dstatic/czml/models/chewei(1).glb"
            } else if (i == 29) {
                _czml1[1].model.gltf = "http://localhost:8083/3Dstatic/czml/models/chetou(1).glb"
            } else {
                // _czml1[1].model.gltf = "http://localhost:8083/3Dstatic/czml/models/CAR/car3.glb"
            }

            this.dataSourcePromise2 = new Cesium.CzmlDataSource()
            this.dataSourcePromise2.load(_czml1)
            this.app.viewer.dataSources.add(this.dataSourcePromise2)
        }

        // 视角跟随
        let trackedEntity = null
        setTimeout(function () {
            if (!trackedEntity) {
                trackedEntity = self.dataSourcePromise2.entities.getById(
                    "Vehicle"
                );
                self.app.viewer.trackedEntity = trackedEntity
            }
        }, 1000)

        // 重置时间
        self.app.viewer.clock.onTick.addEventListener(function (clock) {
            // This example uses time offsets from the start to identify which parts need loading.
            const timeOffset = Cesium.JulianDate.secondsDifference(
                clock.currentTime,
                clock.startTime
            );
/*            if (timeOffset > 500) {
                // self.app.viewer.clock.currentTime = self.app.viewer.clock.startTime;
                // self.app.viewer.clock.shouldAnimate = true;
                self.app.viewer.clock.shouldAnimate = false;
            }*/
        });
    }

}
