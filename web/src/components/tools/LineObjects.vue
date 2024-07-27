<template>
    <div class="line-objects">
        <div class="env">
            <div>
                <span>流动线1</span>
                <el-switch
                    v-model="lin1Flag"
                    active-color="#13ce66"
                    inactive-color="#2B2B2B"
                    @change="lin1">
                </el-switch>
            </div>
            <div>
                <span>流动线2</span>
                <el-switch
                    v-model="lin2Flag"
                    active-color="#13ce66"
                    inactive-color="#2B2B2B"
                    @change="lin2">
                </el-switch>
            </div>
            <div>
                <span>3D流动线</span>
                <el-switch
                    v-model="lin3Flag"
                    active-color="#13ce66"
                    inactive-color="#2B2B2B"
                    @change="lin3">
                </el-switch>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'LineObjects',
    data() {
        return {
            lin1Flag: false,
            lin2Flag: false,
            lin3Flag: false,
            cApp: false
        }
    },
    methods: {
        lin1() {
            const points1 = [
                104.07467185705768, 30.616055917995904, -0.007629316102345219,
                104.07430138967433, 30.622748646480712, -0.005523915179473804,
                104.09266729143657, 30.623561610378665, -0.005830162188858496,
                104.09708344165846, 30.629093781029326, -0.004778831731137613,
                104.09256817183005, 30.631735359048665, -0.002083572838517207
            ]
            this.cApp.part.addRoad(points1)
        },
        lin2() {
            const points = [
                104.09228987915748, 30.631370714909295, -0.00416811510864983,
                104.09228987915748, 30.631370714909295, 500
            ]
            this.cApp.part.addFlowLine(points)
        },
        lin3() {
            let center = {lon: 104.07842873842652, lat: 30.63258965135834}
            let cities = [
                {lon: 104.07445200121597, lat: 30.623338996273173},
                {lon: 104.08148794273148, lat: 30.623739056793006}
            ]
            this.cApp.part.addFlyLine3D(center, cities)
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
.line-objects .env {
    display: flex;
    flex-direction: column;
    gap: 10px;
}
</style>
