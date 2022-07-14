
export default class Clock {
    constructor(app) {
        this.app = app
    }

    start() {
        this.app.viewer.clock.shouldAnimate = true;
    }

    stop () {
        this.app.viewer.clock.shouldAnimate = false;
    }

    reset () {
        // 重置
        this.app.viewer.clock.currentTime = this.app.viewer.clock.startTime;
    }

    speedUp() {
        // 加速——速度 * 2：
        this.app.viewer.clockViewModel.multiplier *= 20;
    }

    speedDown () {
        // 减速——速度 / 2
        this.app.viewer.clock.multiplier /= 20;
    }

}
