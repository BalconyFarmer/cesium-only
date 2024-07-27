<template>
    <div class="env">
        <div v-for="(label, key) in switches" :key="key">
            <span>{{ label }}</span>
            <el-switch
                v-model="flags[key]"
                active-color="#13ce66"
                inactive-color="#2B2B2B"
                @change="handleSwitchChange(key)">
            </el-switch>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PointObjects',
    props: ['cApp'],
    data() {
        return {
            switches: {
                kmlFlag: 'KML点聚合',
                normalPointsClusterChangeFlag: '通用点聚合',
                primitiveFlag: '原生点',
                BlinkPointFlag: '闪烁Point',
                BillboardFlag: '闪烁Billboard',
                blinkFaceFlag: '闪烁面',
                CanvasBillboardFlag: 'CanvasBillboard'
            },
            flags: {
                kmlFlag: false,
                normalPointsClusterChangeFlag: false,
                primitiveFlag: false,
                BlinkPointFlag: false,
                BillboardFlag: false,
                blinkFaceFlag: false,
                CanvasBillboardFlag: false
            },
            cApp: null
        };
    },
    methods: {
        handleSwitchChange(key) {
            const methodMap = {
                kmlFlag: this.kmlChange,
                normalPointsClusterChangeFlag: this.normalPointsClusterChange,
                primitiveFlag: this.primitiveChange,
                BlinkPointFlag: this.BlinkPointChange,
                BillboardFlag: this.BillboardFlagChange,
                blinkFaceFlag: this.blinkFaceChange,
                CanvasBillboardFlag: this.CanvasBillboardChange
            };
            methodMap[key]();
        },
        kmlChange() {
            if (this.flags.kmlFlag) this.cApp.points.addKml();
            else this.cApp.points.removeKml();
        },
        normalPointsClusterChange() {
            if (this.flags.normalPointsClusterChangeFlag) this.cApp.pointsCluster.addIcon1();
            else this.cApp.pointsCluster.removePoint();
        },
        primitiveChange() {
            if (this.flags.primitiveFlag) this.cApp.primitivePoints.addManyPoint();
            else this.cApp.primitivePoints.removePoint();
        },
        BlinkPointChange() {
            if (this.flags.BlinkPointFlag) this.cApp.normalPoints.addBlinkPointR();
            else this.cApp.normalPoints.removeBlinkPoint();
        },
        BillboardFlagChange() {
            if (this.flags.BillboardFlag) this.cApp.normalPoints.addBlinkPoint();
            else this.cApp.normalPoints.removeBlinkPoint();
        },
        blinkFaceChange() {
            if (this.flags.blinkFaceFlag) this.cApp.normalPoints.addBlinkFace();
            else this.cApp.normalPoints.removeBlinkPoint();
        },
        CanvasBillboardChange() {
            if (this.flags.CanvasBillboardFlag) this.cApp.normalPoints.addBillCanvas();
            else this.cApp.normalPoints.removeBillCanvas();
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
    height: 30%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    flex-wrap: wrap;
    overflow-x: auto;
    margin: 20px;
}
</style>
