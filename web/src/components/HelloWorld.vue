<template>
    <div class="all">
        <div id="cesiumContainer" @mouseup="mouseUp()"></div>

        <div class="aindex">
            <a-index></a-index>
        </div>
        <div class="bottomCenter">
            <HelloWorldBottom ref="mychild"></HelloWorldBottom>
        </div>
        <div v-if="!fakeBoard && showPanel" class="panel-container">
            <div class="leftTree glass">
                <div class="leftTreeMenu">
                    <el-button size="mini" @click="currentLeft = '图层'">图层</el-button>
                    <el-button size="mini" @click="currentLeft = '实体'">实体</el-button>
                </div>
                <el-tree v-if="currentLeft === '实体'" :data="treeData" :props="defaultProps"
                         @node-click="handleNodeClick"></el-tree>
                <div v-if="currentLeft === '图层'">
                    <div v-for="item in layersData" :key="item._imageryProvider.name">{{
                            item._imageryProvider.name
                        }}
                    </div>
                </div>
            </div>
            <div class="rightPart glass">
                <div class="getPosition">
                    <div class="title">选取位置:</div>
                    <div class="title">log, lat, height</div>
                    <input id="copyValID" :value="clickPosition" readonly type="text"/>
                    <el-button size="mini" @click="handleClick1('copyValID')">Copy</el-button>
                    <div class="title">cartographic-log, cartographic-lat, cartographic-height</div>
                    <input :value="clickPositionCartographic" readonly type="text"/>
                    <div class="title">Cartesian</div>
                    <input :value="clickPositionCartesian" readonly type="text"/>
                </div>
                <div class="getPosition">
                    <div class="title">相机位置</div>
                    <div class="title">x, y, z, heading, pitch, roll</div>
                    <input id="copyValID1" :value="cameraPosition" readonly type="text"/>
                    <el-button size="mini" @click="handleClick1('copyValID1')">Copy</el-button>
                </div>
                <div class="getPosition">
                    <div>name: {{ currentEntities ? currentEntities.name : '暂无数据' }}</div>
                    <div>Cartesian3: {{ currentEntities ? currentEntities.position._value : '暂无数据' }}</div>
                    <el-input v-model="rotationParams.Heading" placeholder="Heading" size="mini"></el-input>
                    <el-input v-model="rotationParams.Pitch" placeholder="Pitch" size="mini"></el-input>
                    <el-input v-model="rotationParams.Roll" placeholder="Roll" size="mini"></el-input>
                    <el-button size="mini" @click="rotateEntity">rotate</el-button>
                    <span>drag</span>
                    <el-switch v-model="switchValue" active-color="#13ce66" inactive-color="#2B2B2B"
                               @change="dragChange"></el-switch>
                </div>
            </div>

        </div>

        <div class="modeChange">
            <span>开发模式</span>
            <el-switch v-model="fakeBoard" active-color="#13ce66" inactive-color="#2B2B2B"></el-switch>
        </div>
    </div>
</template>

<script>
import CesiumApp from './CesiumApp/CesiumApp'
import HelloWorldBottom from './HelloWorldBottom'
import AIndex from "@/components/left-tools/aIndex";

export default {
    name: 'hoting',
    components: {
        AIndex,
        HelloWorldBottom
    },
    data() {
        return {
            fakeBoard: false,
            showPanel: false,
            currentLeft: "实体",
            treeData: [],
            defaultProps: {
                children: 'children',
                label: 'label'
            },
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
        rotateEntity() {
            this.cApp.rotateEntity(parseInt(this.rotationParams.Heading), parseInt(this.rotationParams.Pitch), parseInt(this.rotationParams.Roll), this.currentEntities);
        },
        dragChange() {
            this.cApp.event.dragFlag = this.switchValue;
        },
        handleNodeClick(data) {
            this.cApp.lookAtByName(data.label);
        },
    },
    mounted() {
        this.$nextTick(() => {
            this.cApp = new CesiumApp();
            this.cApp.initMap();
            window.cApp = this.cApp;
            this.entitysList = this.cApp.getViewerEntitys();
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
            this.showPanel = true;
        });
        setInterval(() => {
            this.treeData = [];
            this.entitysList.forEach(item => {
                this.treeData.push({label: item.name || '未定义'});
            });
            if (this.cApp) {
                this.layersData = this.cApp.viewer.imageryLayers._layers;
            }
        }, 10000);
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

    #cesiumContainer {
        width: 100%;
        height: calc(100% - 40px);
    }

    .panel-container {
        display: flex;
        width: 40%;
        height: 40%;
        position: absolute;
        top: 0;
        right: 9px;
        z-index: 999;
    }

    .leftTree {
        width: 15%;
        height: 100%;
        background-color: rgba(43, 43, 43, .8);
        color: white;
        overflow-y: auto;

        .leftTreeMenu {
            display: flex;
            justify-content: space-around;
            padding: 10px 0;
        }

        .layers-list {
            padding: 10px;
        }
    }

    .rightPart {
        width: 20%;
        height: 100%;
        background-color: rgba(43, 43, 43, .8);
        color: white;
        overflow-y: auto;
        padding: 10px;

        .getPosition {
            border-bottom: 1px solid gray;
            margin-bottom: 10px;
            padding-bottom: 10px;
        }

        .title {
            font-weight: bold;
            margin-bottom: 5px;
        }

        .subtitle {
            font-size: 0.9em;
            margin-bottom: 5px;
            color: #bbb;
        }
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
        left: 50px;
        top: 50px;
        width: 20vw;
        height: 90vh;
    }
}
</style>
