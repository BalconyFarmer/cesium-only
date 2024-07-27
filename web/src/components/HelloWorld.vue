<template>
    <div class="all">
        <div id="cesiumContainer" @mouseup="mouseUp()"></div>

        <div class="aindex">
            <a-index></a-index>
        </div>

    </div>
</template>

<script>
import CesiumApp from './CesiumApp/CesiumApp'
import AIndex from "@/components/left-tools/aIndex";
import Panel from "@/components/left-tools/Panel";

export default {
    name: 'hoting',
    components: {
        AIndex,
        Panel
    },
    data() {
        return {
            clickPosition: [],
            clickPositionCartographic: null,
            clickPositionCartesian: null,
            cameraPosition: [],
            currentEntities: null
        }
    },
    methods: {
        mouseUp() {
            this.$refs.mychild.mouseUp();
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.cApp = new CesiumApp();
            this.cApp.initMap();
            window.cApp = this.cApp;

            this.cApp.eventCenter.addEventListener('clickPosition', (data) => {
                this.clickPosition = data.message.position;
                this.clickPositionCartographic = data.message.positionCartographic;
                this.clickPositionCartesian = data.message.cartesian;
            });
            this.cApp.eventCenter.addEventListener('cameraPosition', (data) => {
                this.cameraPosition = data.message.position;
            });
            this.cApp.eventCenter.addEventListener('pickEntity', (data) => {
                this.currentEntities = data.message.position;
            });
        });
    }
}
</script>

<style lang="scss">
@import "../style/reset.scss";

.all {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    position: relative;

    #cesiumContainer {
        width: 100%;
        height: 100%;
    }

    .aindex {
        position: fixed;
        left: 10px;
        top: 10px;
        width: 20vw;
        height: 90vh;
    }
}
</style>
