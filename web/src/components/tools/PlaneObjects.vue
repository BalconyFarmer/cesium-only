<!-- SurfaceObjects.vue -->
<template>
    <div class="env">
        <div>
            <span>雷达1</span>
            <el-switch
                v-model="radioFlag"
                active-color="#13ce66"
                inactive-color="#2B2B2B"
                @change="radioChange">
            </el-switch>
        </div>
        <div>
            <span>雷达2</span>
            <el-switch
                v-model="radioFlag1"
                active-color="#13ce66"
                inactive-color="#2B2B2B"
                @change="radioChange1">
            </el-switch>
        </div>
        <div>
            <span>流动墙</span>
            <el-switch
                v-model="radioFlag2"
                active-color="#13ce66"
                inactive-color="#2B2B2B"
                @change="radioChange2">
            </el-switch>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            radioFlag: false,
            radioFlag1: false,
            radioFlag2: false,
            cApp: null
        };
    },
    methods: {
        radioChange() {
            const option = {
                lon: 104.08518355581377,
                lat: 30.632540812118847,
                radius: 200
            };
            this.cApp.part.addRadarScan(option);
        },
        radioChange1() {
            const option1 = {
                lon: 104.08077683485338,
                lat: 30.635968171376696,
                radius: 300
            };
            this.cApp.part.addCircleScan(option1);
        },
        radioChange2() {
            const postis = Cesium.Cartesian3.fromDegreesArrayHeights([
                104.08910823719758,
                30.62842929898083, 10.0,
                104.08814901806453,
                30.62608460511913, 10.0,
                104.08463898581485,
                30.626111794674216, 10.0,
                104.08476936742238,
                30.628519360788516, 10.0,
                104.08910823719758,
                30.62842929898083, 10.0,
            ]);
            this.cApp.part.addFlowWall(postis);

            const points = [
                104.09228987915748,
                30.631370714909295,
                -0.00416811510864983,
                104.09228987915748,
                30.631370714909295,
                500,
            ];
            this.cApp.part.addFlowLine(points);
        }
    },
    mounted() {
        setTimeout(() => {
            this.cApp = window.cApp;
        }, 1000);
    }
}
</script>

<style scoped>
.env {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    flex-wrap: wrap;
    overflow-x: auto;
}

.env > div {
    margin: 5px 0;
}

.el-switch {
    margin-left: 10px;
}
</style>
