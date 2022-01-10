<template>
    <div class="all">
        <div v-if="!fakeBoard" class="header">
            <div>
                <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                    <el-menu-item index="13">run</el-menu-item>
                    <el-menu-item index="11">成都tiles</el-menu-item>
                    <el-menu-item index="2">云南JSON</el-menu-item>
                    <el-menu-item index="3">纽约tiles</el-menu-item>
                    <el-menu-item index="12">倾斜摄影</el-menu-item>
                </el-menu>
            </div>
            <div>g
                <el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" @select="handleSelect">

                    <el-menu-item index="9">全球光照</el-menu-item>
                    <el-menu-item index="光照系统">光照</el-menu-item>
                    <el-menu-item index="addBloom">Bloom</el-menu-item>
                    <el-menu-item index="addOutline">Outline</el-menu-item>
                    <el-menu-item index="14">关闭冗余</el-menu-item>
                    <el-menu-item index="">
                        <span>drag</span>
                        <el-tooltip :content="'拖拽模型'" placement="top">
                            <el-switch
                                    @change="dragChange"
                                    v-model="switchValue"
                                    active-color="#13ce66"
                                    inactive-color="#ff4949">
                            </el-switch>
                        </el-tooltip>
                    </el-menu-item>
                    <el-menu-item index="">
                        <span>moveTip</span>
                        <el-tooltip :content="'moveToolTips'" placement="top">
                            <el-switch
                                    @change="moveToolTipsChange"
                                    v-model="moveToolFlag"
                                    active-color="#13ce66"
                                    inactive-color="#ff4949">
                            </el-switch>
                        </el-tooltip>
                    </el-menu-item>
                    <el-menu-item index="">
                        <span>地形</span>
                        <el-tooltip :content="'关闭地形'" placement="top">
                            <el-switch
                                    @change="terrainChange"
                                    v-model="terrainFlag"
                                    active-color="#13ce66"
                                    inactive-color="#ff4949">
                            </el-switch>
                        </el-tooltip>
                    </el-menu-item>
                    <el-menu-item>
                        <el-select v-model="value" placeholder="请选择">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-menu-item>
                    <el-menu-item>
                        <el-select v-model="optionsLayersIndex" placeholder="图层切换">
                            <el-option
                                    v-for="item in optionsLayers"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-menu-item>
                    <el-menu-item style="width: 100px">
                        <el-slider :max="2" :step="0.1" v-model="brightness">
                        </el-slider>
                    </el-menu-item>
                </el-menu>
            </div>
        </div>
        <div v-if="!fakeBoard" class="leftTree">
            <div>ENTITIES</div>
            <el-tree :data="treeData" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
        </div>
        <div v-if="!fakeBoard" class="rightPart">
            <div>
                MATH
            </div>
            <br>

            <div>
                <div class="title">log,lat,height</div>
                <div>{{clickPosition[0]|| 0}},</div>
                <div>{{clickPosition[1]|| 0}},</div>
                <div>{{clickPosition[2]|| 0}},</div>
            </div>

            <br>
            <div>
                <div class="title">camera</div>
                <div class="title">log,lat,height</div>
                <div>{{cameraPosition[0]|| 0}}</div>
                <div class="title">heading</div>
                <div>{{cameraPosition[1]|| 0}}</div>
                <div class="title">pitch</div>
                <div>{{cameraPosition[2]|| 0}}</div>
                <div class="title">roll</div>
                <div>{{cameraPosition[3]|| 0}}</div>
            </div>
            <br>

            <div>name: {{currentEntities? currentEntities.name: '暂无数据'}}</div>
            <div>Cartesian3: {{currentEntities? currentEntities.position._value: '暂无数据'}}</div>
            <div class="inpu">
                <el-input size="small" v-model="rotationgPatams.Heading" placeholder="Heading"></el-input>
            </div>
            <div class="inpu">
                <el-input size="small" v-model="rotationgPatams.Pitch" placeholder="Pitch"></el-input>
            </div>
            <div class="inpu">
                <el-input size="small" v-model="rotationgPatams.Roll" placeholder="Roll"></el-input>
            </div>
            <div class="inpu">
                <el-button @click="rotateEntity">rotate</el-button>
            </div>
        </div>
        <div v-if="!fakeBoard && showPanel" class="bottomCenter">
            <HelloWorldBottom :cApp="this.cApp" ref="mychild"></HelloWorldBottom>
        </div>

        <div v-if="fakeBoard" class="fakeTop">1</div>
        <div v-if="fakeBoard" class="fakeL">1</div>
        <div v-if="fakeBoard" class="fakeR">1</div>

        <div id="cesiumContainer" @mouseup="mouseUp()"></div>

        <div class="modeChange">
            <span>开发模式</span>
            <el-switch
                    @change=""
                    v-model="fakeBoard"
                    active-color="#13ce66"
                    inactive-color="#ff4949">
            </el-switch>
        </div>


    </div>
</template>
<script>
    import * as Cesium from 'cesium/Cesium'
    import * as widget from 'cesium/Widgets/widgets.css'
    import CesiumApp from './CesiumApp/CesiumApp'
    import {scriptLoader} from '../utils/index'
    import HelloWorldBottom from './HelloWorldBottom'

    export default {
        name: 'hoting',
        components: {
            HelloWorldBottom
        },
        watch: {
            brightness: {
                handler (newValue) {
                    if (this.cApp) {
                        this.cApp.updateBrightness(this.brightness)
                    }
                },
                deep: true,
                immediate: false
            },
            value: {
                handler (newValue) {
                    if (this.cApp) {
                        this.cApp.switchViewMode(this.value)
                    }
                },
                deep: true,
                immediate: false
            },
            optionsLayersIndex: {
                handler (newValue) {
                    if (this.cApp) {
                        this.cApp.switchLayer(this.optionsLayersIndex)
                    }
                },
                deep: true,
                immediate: false
            },
        },

        data () {
            return {
                fakeBoard: false,
                showPanel: false,
                addGeoFlag: false,
                currentGeoType: null,
                brightness: 1,
                terrainFlag: true,
                moveToolFlag: false,
                value: '地球模式',
                options: [{
                    value: '3D模式',
                    label: '3D模式'
                }, {
                    value: '2.5D模式',
                    label: '2.5D模式'
                }, {
                    value: '2D模式',
                    label: '2D模式'
                },],
                optionsLayersIndex: null,
                optionsLayers: [{
                    value: '文字图层',
                    label: '文字图层'
                }, {
                    value: 'google实景图层',
                    label: 'google实景图层'
                }, {
                    value: 'ArcGis实景图层',
                    label: 'ArcGis实景图层'
                }, {
                    value: 'note',
                    label: 'note'
                },],
                activeIndex: '1',
                activeIndex2: '1',
                entitysList: [],
                treeData: [],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                clickPosition: [],
                cameraPosition: [],
                switchValue: false,
                currentEntities: null,
                rotationgPatams: {
                    Heading: 0,
                    Pitch: 0,
                    Roll: 0
                }

            }
        },
        methods: {
            mouseDown (ev) {
                this.currentGeoType = ev
                this.addGeoFlag = true
            },
            mouseUp (ev) {
                this.$refs.mychild.mouseUp()
            },

            terrainChange () {
                if (this.terrainFlag) {
                    this.cApp.addTerrain()
                } else {
                    this.cApp.removeTerrain()
                }
            },
            moveToolTipsChange () {
                this.cApp.startMoveTips()
            },
            rotateEntity () {
                const self = this
                self.cApp.rotateEntity(parseInt(self.rotationgPatams.Heading), parseInt(self.rotationgPatams.Pitch), parseInt(self.rotationgPatams.Roll), self.currentEntities)

            },
            dragChange () {
                if (this.switchValue) {
                    this.cApp.event.dragFlag = true
                } else {
                    this.cApp.event.dragFlag = false
                }
            },
            handleNodeClick (data) {
                console.log(data)
                this.cApp.lookAtByName(data.label)
            },
            handleSelect (key, keyPath) {
                if (key == 2) {
                    this.cApp.loadJson.loadJsonData()
                } else if (key == 3) {
                    this.cApp.cesium3DTileset.toYN()
                } else if (key == 9) {
                    this.cApp.switchLight()
                } else if (key == 11) {
                    this.cApp.runChengDu()
                    this.fakeBoard = true
                } else if (key == 12) {
                    this.cApp.obliquePhotography.addOblique()
                } else if (key == 13) {
                    this.cApp.addTimeAction()
                } else if (key == 14) {
                    this.cApp.closeAll()
                } else if (key == '光照系统') {
                    this.cApp.addLight()
                } else if (key == 'addBloom') {
                    this.cApp.addBloom()
                } else if (key == 'addOutline') {
                    this.cApp.addOutline()
                }
            },
            startScriptLoader () {
                const self = this
                scriptLoader('http://zhangticcc.gitee.io/d3kit/d3kit.js').then(res => {
                    setTimeout(function () {
                        const see = Cesium.D3Kit
                        console.clear()
                        console.log(see)
                        // debugger
                    }, 1000)
                })
            }

        },
        mounted () {
            this.startScriptLoader()
            const self = this
            this.$nextTick(() => {
                this.cApp = new CesiumApp()
                this.cApp.initMap()
                this.entitysList = this.cApp.getViewerEntitys()
                this.cApp.eventCenter.addEventListener('clickPosition', function (data) {
                    self.clickPosition = data.message.position
                })
                this.cApp.eventCenter.addEventListener('cameraPosition', function (data) {
                    self.cameraPosition = data.message.position
                })
                this.cApp.eventCenter.addEventListener('pickEntity', function (data) {
                    self.currentEntities = data.message.position
                })

                this.showPanel = true
            })

            setInterval(function () {
                self.treeData = []
                self.entitysList.forEach(item => {
                    if (item.name) {
                        self.treeData.push({
                            label: item.name
                        })
                    } else {
                        self.treeData.push({
                            label: '未定义'
                        })
                    }

                })
            }, 10000)

        }

    }
</script>

<style lang="scss">
    @import "../style/reset.scss";
    //引入方式
    @import "../style/ele.scss"; //引入方式
    .modeChange {
        position: fixed;
        right: 10px;
        bottom: 10px;
        z-index: 99999;
    }

    .fakeTop {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 10%;
        background-image: url("./img/TOP.png");
        z-index: 99999;
        background-color: rgba(255, 255, 255, 0.1);

    }

    .fakeL {
        position: absolute;
        left: 0;
        top: 10%;
        width: 20%;
        height: 90%;
        background-image: url("./img/LEFT.png");
        z-index: 99999;
        background-size: 100% 100%;
    }

    .fakeR {
        position: absolute;
        right: 0;
        top: 10%;
        width: 20%;
        height: 90%;
        background-image: url("./img/RIGHT.png");
        z-index: 99999;
        background-size: 100% 100%;
    }

    #cesiumContainer {
        width: 100%;
        height: 100%;
    }

    .title {
        font-weight: bold;
        color: #87939A;
    }

    .cesium-viewer-bottom {
        display: none !important;
        visibility: hidden !important;
    }

    .all {
        width: 100%;
        height: 50%;

        .header {
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            position: absolute;
            left: 0;
            top: 0;
            z-index: 999;
            background-color: #3C3F41;
        }

        .leftTree {
            width: 10%;
            height: 90%;
            position: absolute;
            left: 0px;
            top: 10%;
            z-index: 999;
            overflow-y: auto;
            background-color: rgba(43, 43, 43, .5);
            color: white;
        }

        .rightPart {
            width: 10%;
            height: 90%;
            position: absolute;
            right: 0px;
            top: 10%;
            z-index: 999;
            overflow-y: auto;
            color: white;
            background-color: rgba(43, 43, 43, .5);
        }

        .bottomCenter {
            width: 80%;
            height: 20%;
            position: absolute;
            left: 10%;
            bottom: 0;
            z-index: 999;
        }
    }

</style>

