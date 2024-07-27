<template>
    <div class="env">
        <div>
            <span>moveTip</span>
            <el-switch
                v-model="moveToolFlag"
                active-color="#13ce66"
                inactive-color="#2B2B2B"
                @change="moveToolTipsChange">
            </el-switch>
        </div>
        <div>
            <span>飞行飞机</span>
            <el-switch
                v-model="flyFlag"
                active-color="#13ce66"
                inactive-color="#2B2B2B"
                @change="fly">
            </el-switch>
        </div>
        <div>
            <span>移动小人</span>
            <el-switch
                v-model="flyFlag1"
                active-color="#13ce66"
                inactive-color="#2B2B2B"
                @change="fly1">
            </el-switch>
        </div>
        <div>
            <span>移动小车</span>
            <el-switch
                v-model="flyFlag2"
                active-color="#13ce66"
                inactive-color="#2B2B2B"
                @change="fly2">
            </el-switch>
        </div>
        <div>
            <span>GPS</span>
            <el-switch
                v-model="GpsFlag"
                active-color="#13ce66"
                inactive-color="#2B2B2B"
                @change="GpsChange">
            </el-switch>
        </div>
    </div>
</template>

<script>
export default {
    name: 'DemoControls',
    props: ['cApp'],
    data() {
        return {
            moveToolFlag: false,
            flyFlag: false,
            flyFlag1: false,
            flyFlag2: false,
            GpsFlag: false,
            cApp: null
        };
    },
    methods: {
        moveToolTipsChange() {
            this.cApp.startMoveTips();
        },
        fly() {
            const poAirPlane = [104.0884625472979, 30.629946234239107, 100];
            this.cApp.load3DModel.loadGLB(poAirPlane);
            this.cApp.viewer.zoomTo(this.cApp.viewer.entities);
        },
        fly1() {
            const poPer = Cesium.Cartesian3.fromDegrees(104.0884177825623, 30.62721695985099, 0);
            const movePeople = this.cApp.load3DModel.loadGltf(poPer);
            this.cApp.viewer.entities.add(movePeople);
            this.cApp.viewer.zoomTo(this.cApp.viewer.entities);
        },
        fly2() {
            let data = [104.088629853244, 30.627623370523818, -0.002239088567849463];
            this.cApp.load3DModel.loadGlbPrimitives(data);
            this.cApp.viewer.zoomTo(this.cApp.viewer.entities);
        },
        GpsChange() {
            this.cApp.GPSlocation.start();
        }
    },
    mounted() {
        setTimeout(() => {
            this.cApp = window.cApp;
        }, 1000);
    }
};
</script>

<style scoped>
.env {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
}
</style>
