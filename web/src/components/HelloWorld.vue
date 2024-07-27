<template>
    <div class="all">
        <div id="cesiumContainer" @mouseup="mouseUp()"></div>

        <div class="aindex">
            <a-index></a-index>
        </div>

        <Panel
            :clickPosition="clickPosition"
            :clickPositionCartographic="clickPositionCartographic"
            :clickPositionCartesian="clickPositionCartesian"
            :cameraPosition="cameraPosition"
            :currentEntities="currentEntities"
            :rotationParams="rotationParams"
            :switchValue="switchValue"
            @rotateEntity="rotateEntity"
            @dragChange="dragChange"
        />
    </div>
</template>

<script>
import CesiumApp from './CesiumApp/CesiumApp'
import AIndex from "@/components/left-tools/aIndex";
import LeftTree from "@/components/left-tools/LeftTree";
import Panel from "@/components/left-tools/Panel";

export default {
    name: 'hoting',
    components: {
        AIndex,
        LeftTree,
        Panel
    },
    data() {
        return {
            fakeBoard: false,
            treeData: [],
            clickPosition: [],
            clickPositionCartographic: null,
            clickPositionCartesian: null,
            cameraPosition: [],
            switchValue: false,
            currentEntities: null,
            rotationParams: {
                Heading: 0,
                Pitch: 0,
                Roll: 0
            },
            layersData: [],
        }
    },
    methods: {
        handleClick1(ID) {
            const copyVal = document.getElementById(ID);
            copyVal.select();
            document.execCommand('copy');
        },
        mouseUp() {
            this.$refs.mychild.mouseUp();
        },
        rotateEntity(rotationParams) {
            this.cApp.rotateEntity(parseInt(rotationParams.Heading), parseInt(rotationParams.Pitch), parseInt(rotationParams.Roll), this.currentEntities);
        },
        dragChange(switchValue) {
            this.cApp.event.dragFlag = switchValue;
        },
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

    .bottomCenter {
        width: 100%;
        height: 150px;
        position: absolute;
        bottom: 0;
        z-index: 999;
    }

    .modeChange {
        position: fixed;
        right: 10px;
        bottom: 10px;
        z-index: 99999;
        display: flex;
        align-items: center;
        background-color: rgba(43, 43, 43, .8);
        padding: 5px 10px;
        border-radius: 5px;

        span {
            margin-right: 10px;
            color: white;
        }
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
