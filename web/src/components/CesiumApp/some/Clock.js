/**
 * Clock 类
 * Animation 类
 */
export default class Clock {
    constructor(app) {
        this.app = app
    }

    closeAimationToolbar() {

        const see = this.app.viewer.animation.container.style.visibility
        if (see == "") {
            this.app.viewer.animation.container.style.visibility = 'hidden' // 隐藏
            this.app.viewer.timeline.container.style.visibility = 'hidden' // 隐藏
        } else {
            this.app.viewer.animation.container.style.visibility = '' // 显示
            this.app.viewer.timeline.container.style.visibility = '' // 显示
        }
    }

    start() {
        this.app.viewer.clock.shouldAnimate = true;
    }

    stop() {
        this.app.viewer.clock.shouldAnimate = false;
    }

    reset() {
        // 重置
        this.app.viewer.clock.currentTime = this.app.viewer.clock.startTime;
    }

    speedUp() {
        // 加速——速度 * 2：
        this.app.viewer.clockViewModel.multiplier *= 20;
    }

    speedDown() {
        // 减速——速度 / 2
        this.app.viewer.clock.multiplier /= 20;
    }

}
