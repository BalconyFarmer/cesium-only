<template>
    <div class="all">
        <div id="cesiumContainer" @mouseup="mouseUp()"></div>

        <el-dialog
            title="项目列表"
            :visible.sync="dialogVisible"
            width="30%"
        >
            <div class="dialogAll" style="color: black !important;">
                <div @click="runChengdu" class="item" style="color: black !important;">
                    <img src="../assets/projectImg/纽约.png">
                    <span>0.纽约</span>
                </div>
                <div @click="runShanghai" class="item" style="color: black !important;">
                    <img src="../assets/projectImg/上海.png">
                    <span>1.上海</span>
                </div>
            </div>

        </el-dialog>

        <!--开发仪表盘-->
        <div v-if="!fakeBoard && showPanel" style="width: 100%; height: 100%">
            <div class="header">

                <div class="headerItem">
                    <div>基础底图</div>
                    <el-select size="mini" v-model="optionsLayersIndex" placeholder="基础底图">
                        <el-option
                            v-for="item in optionsLayers"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>

                <div class="headerItem">
                    <div>模型对象</div>
                    <el-select size="mini" v-model="modelData" placeholder="模型对象">
                        <el-option
                            v-for="item in modelDataList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>

                <div class="headerItem">
                    <div>地球模式</div>
                    <el-select size="mini" v-model="value" placeholder="请选择">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>


                <div class="topMenus">
                    <div class="topMenusItem">
                        <div class="topMenusItem1">SunLight光照</div>
                        <div class="topMenusItem1">
                            <el-switch
                                @change="changeGlobleLight"
                                v-model="changeGlobleLightFlag"
                                active-color="#13ce66"
                                inactive-color="#2B2B2B">
                            </el-switch>
                        </div>
                    </div>

                    <div class="topMenusItem">
                        <div class="topMenusItem1">光照系统</div>
                        <div class="topMenusItem1">
                            <el-switch
                                @change="changeLight"
                                v-model="changeLightFlag"
                                active-color="#13ce66"
                                inactive-color="#2B2B2B">
                            </el-switch>
                        </div>
                    </div>
                    <div class="topMenusItem">
                        <div class="topMenusItem1">shadow</div>
                        <div class="topMenusItem1">
                            <el-switch
                                @change="changeShadow"
                                v-model="changeShadowFlag"
                                active-color="#13ce66"
                                inactive-color="#2B2B2B">
                            </el-switch>
                        </div>
                    </div>
                    <div class="topMenusItem">
                        <div class="topMenusItem1">地形叠加</div>
                        <div class="topMenusItem1">
                            <el-tooltip :content="'关闭地形'" placement="top">
                                <el-switch
                                    @change="terrainChange"
                                    v-model="terrainFlag"
                                    active-color="#13ce66"
                                    inactive-color="#2B2B2B">
                                </el-switch>
                            </el-tooltip>
                        </div>
                    </div>
                    <div class="topMenusItem">
                        <div class="topMenusItem1">整体亮度</div>
                        <div class="topMenusItem1">
                            <el-slider :max="2" :step="0.1" v-model="brightness">
                            </el-slider>
                        </div>
                    </div>
                    <div class="topMenusItem">
                        <div class="topMenusItem1">视角大小</div>
                        <div class="topMenusItem1">
                            <el-slider :max="2" :step="0.1" v-model="fov">
                            </el-slider>
                        </div>
                    </div>
                    <el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal"
                             @select="handleSelect">
                        <el-menu-item index="addBloom">Bloom</el-menu-item>
                        <el-menu-item index="addOutline">Outline</el-menu-item>
                        <el-menu-item index="14">关闭冗余</el-menu-item>
                    </el-menu>
                </div>

                <div @click="openDialog" class="member">
                    <span>联鹏科技</span>
                    <el-avatar
                        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                </div>
            </div>
            <div class="leftTree">
                <div class="leftTreeMenu">
                    <div @click="currentLeft = '图层'">图层</div>
                    <div @click="currentLeft = '实体'">实体</div>
                </div>

                <el-tree v-if="currentLeft == '实体'" :data="treeData" :props="defaultProps"
                         @node-click="handleNodeClick"></el-tree>
                <div v-if="currentLeft == '图层'">
                    <div v-for="item in layersData"> {{ item._imageryProvider.name }}</div>
                </div>
            </div>
            <div class="rightPart">
                <div>
                    MATH
                </div>
                <br>
                <div class="getPosition">
                    <div class="title">选取位置:</div>
                    <div class="title">log,lat,height</div>
                    <input id="copyValID" type="text" :value="clickPosition"/>
                    <el-button size="mini" @click="handleClick1('copyValID')">Copy</el-button>
                    <div class="title">cartographic-log,cartographic-lat,cartographic-height</div>
                    <input id="" type="text" :value="clickPositionCartographic"/>
                    <div class="title">Cartesian</div>
                    <input id="" type="text" :value="clickPositionCartesian"/>
                </div>

                <br>
                <div class="getPosition">
                    <div class="title">camera</div>
                    <div class="title">x,y,z,heading,pitch,roll</div>
                    <input id="copyValID1" type="text" :value="cameraPosition"/>
                    <el-button size="mini" @click="handleClick1('copyValID1')">Copy</el-button>
                </div>
                <br>

                <div class="getPosition">
                    <div>name: {{ currentEntities ? currentEntities.name : '暂无数据' }}</div>
                    <div>Cartesian3: {{ currentEntities ? currentEntities.position._value : '暂无数据' }}</div>
                    <div class="inpu">
                        <el-input size="mini" v-model="rotationgPatams.Heading" placeholder="Heading"></el-input>
                    </div>
                    <div class="inpu">
                        <el-input size="mini" v-model="rotationgPatams.Pitch" placeholder="Pitch"></el-input>
                    </div>
                    <div class="inpu">
                        <el-input size="mini" v-model="rotationgPatams.Roll" placeholder="Roll"></el-input>
                    </div>
                    <div class="inpu">
                        <el-button @click="rotateEntity">rotate</el-button>
                    </div>
                    <div class="inpu">
                        <span>drag</span>
                        <el-switch
                            @change="dragChange"
                            v-model="switchValue"
                            active-color="#13ce66"
                            inactive-color="#2B2B2B">
                        </el-switch>
                    </div>
                </div>

            </div>
            <div class="bottomCenter">
                <HelloWorldBottom :cApp="this.cApp" ref="mychild"></HelloWorldBottom>
            </div>
        </div>

        <!--模拟数据台-->
        <div v-if="fakeBoard" style="width: 100%; height: 100%">
            <div class="fakeTop">1</div>
            <div class="fakeL">1</div>
            <div class="fakeR">1</div>
        </div>

        <div class="modeChange">
            <span>开发模式</span>
            <el-switch
                @change=""
                v-model="fakeBoard"
                active-color="#13ce66"
                inactive-color="#2B2B2B">
            </el-switch>
        </div>
    </div>
</template>
<script>

import CesiumApp from './CesiumApp/CesiumApp'
import {scriptLoader} from '../utils/index'
import HelloWorldBottom from './HelloWorldBottom'

export default {
    name: 'hoting',
    components: {
        HelloWorldBottom
    },
    watch: {

        modelData: {
            handler(newValue) {
                if (this.cApp) {
                    switch (this.modelData) {
                        case "JSON闪光路":
                            this.cApp.loadJson.loadJsonRoad()
                            break
                        case "西双版纳JSON掩模":
                            this.cApp.loadJson.loadJsonYanMo()
                            break
                        case "西双版纳JSON":
                            this.cApp.addTimeAction()
                            break
                        case "成都tiles":
                            this.cApp.runChengDu()
                            this.fakeBoard = true
                            break
                        case "云南JSON":
                            this.cApp.loadJson.loadJsonData("/geoJson/云南省.json")
                            break
                        case "纽约tiles":
                            this.cApp.cesium3DTileset.toYN()
                            break
                        case "倾斜摄影":
                            this.cApp.obliquePhotography.addOblique()
                            break
                        case "华盛顿IMG":
                            this.cApp.huashengdunImg()
                            break
                        case "OSM建筑":
                            this.cApp.addOSMBuilding()
                            break
                    }
                }
            },
            deep: true,
            immediate: false
        },
        brightness: {
            handler(newValue) {
                if (this.cApp) {
                    this.cApp.updateBrightness(this.brightness)
                }
            },
            deep: true,
            immediate: false
        },
        value: {
            handler(newValue) {
                if (this.cApp) {
                    this.cApp.switchViewMode(this.value)
                }
            },
            deep: true,
            immediate: false
        },
        optionsLayersIndex: {
            handler(newValue) {
                if (this.cApp) {
                    this.cApp.switchLayer(this.optionsLayersIndex)
                }
            },
            deep: true,
            immediate: false
        },
        fov: {
            handler(newValue) {
                if (this.cApp) {
                    this.cApp.updataFov(this.fov)
                }
            },
            deep: true,
            immediate: false
        },
    },

    data() {
        return {
            dialogVisible: false,
            fov: 1,
            changeShadowFlag: false,
            changeLightFlag: false,
            changeGlobleLightFlag: false,
            fakeBoard: false,
            showPanel: false,
            addGeoFlag: false,
            currentGeoType: null,
            brightness: 1,
            terrainFlag: false,
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
            modelData: null,
            modelDataList: [
                {
                    value: 'JSON闪光路',
                    label: 'JSON闪光路'
                }, {
                    value: '西双版纳JSON掩模',
                    label: '西双版纳JSON掩模'
                }, {
                    value: '西双版纳JSON',
                    label: '西双版纳JSON'
                }, {
                    value: '云南JSON',
                    label: '云南JSON'
                }, {
                    value: '纽约tiles',
                    label: '纽约tiles'
                }, {
                    value: '倾斜摄影',
                    label: '倾斜摄影'
                }, {
                    value: '华盛顿IMG',
                    label: '华盛顿IMG'
                }, {
                    value: 'OSM建筑',
                    label: 'OSM建筑'
                },],
            optionsLayers: [{
                value: 'google实景图层',
                label: 'google实景图层(VPN)'
            }, {
                value: 'ArcGis实景图层',
                label: 'ArcGis实景图层'
            }, {
                value: 'geoq智图黑',
                label: 'geoq智图黑'
            }, {
                value: '高德卫星',
                label: '高德卫星 + 高德文字'
            }, {
                value: 'BING',
                label: 'BING卫星 + BING文字'
            }, {
                value: 'BING道路',
                label: 'BING道路'
            },
                {
                    value: '纯黑',
                    label: '纯黑'
                },


                {
                    value: '百度地图',
                    label: '百度地图'
                }, {
                    value: '腾讯地图',
                    label: '腾讯地图'
                }, {
                    value: '天地图',
                    label: '天地图'
                }, {
                    value: '高德地图',
                    label: '高德地图'
                }, {
                    value: '谷歌地图',
                    label: '谷歌地图'
                },
            ],
            activeIndex: '1',
            activeIndex2: '1',
            entitysList: [],
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
            rotationgPatams: {
                Heading: 0,
                Pitch: 0,
                Roll: 0
            },
            currentLeft: "实体",
            layersData: [],

        }
    },
    methods: {
        runChengdu() {
            this.cApp.runChengDu()
            this.fakeBoard = true
            this.dialogVisible = false
        },
        runShanghai() {
            this.cApp.runShanghai()
            this.fakeBoard = true
            this.dialogVisible = false
        },
        openDialog() {
            this.dialogVisible = true
        },
        handleClose() {

        },
        handleClick1(ID) {
            let copyVal = document.getElementById(ID)
            copyVal.select()
            document.execCommand('copy')
        },
        mouseDown(ev) {
            this.currentGeoType = ev
            this.addGeoFlag = true
        },
        mouseUp(ev) {
            this.$refs.mychild.mouseUp()
        },

        terrainChange() {
            if (this.terrainFlag) {
                this.cApp.addTerrain()
            } else {
                this.cApp.removeTerrain()
            }
        },

        rotateEntity() {
            const self = this
            self.cApp.rotateEntity(parseInt(self.rotationgPatams.Heading), parseInt(self.rotationgPatams.Pitch), parseInt(self.rotationgPatams.Roll), self.currentEntities)

        },
        dragChange() {
            if (this.switchValue) {
                this.cApp.event.dragFlag = true
            } else {
                this.cApp.event.dragFlag = false
            }
        },
        handleNodeClick(data) {
            console.log(data)
            this.cApp.lookAtByName(data.label)
        },
        handleSelect(key) {
            if (key == 14) {
                this.cApp.closeAll()
            } else if (key == 'addBloom') {
                this.cApp.addBloom()
            } else if (key == 'addOutline') {
                this.cApp.addOutline()
            }
        },
        changeGlobleLight() {
            this.cApp.switchLight()
        },
        changeLight() {
            this.cApp.addLight()
        },
        changeShadow() {
            this.cApp.changeShadow()
        },

    },
    mounted() {
        const self = this
        this.$nextTick(() => {
            this.cApp = new CesiumApp()
            this.cApp.initMap()
            this.entitysList = this.cApp.getViewerEntitys()

            this.cApp.eventCenter.addEventListener('clickPosition', function (data) {
                self.clickPosition = data.message.position
                self.clickPositionCartographic = data.message.positionCartogtaphic
                self.clickPositionCartesian = data.message.cartesian
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
            if (self.cApp) {
                self.layersData = self.cApp.viewer.imageryLayers._layers
            }

        }, 10000)

    }

}
</script>

<style lang="scss">

.el-menu-demo {
    height: 90%;
}

div {
    color: rgba(255, 255, 255, 0.8);
    font-size: 5px;
}

.menuitem {
    width: 100px !important;
}

/**
FPS显示
 */
.cesium-performanceDisplay-defaultContainer {
    position: absolute;
    top: 6px;
    right: 152px;
    text-align: right;
    z-index: 999999;
}

.slider {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 100px;
    height: 100%;
}

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
    height: 1080px;
    //-moz-user-select: none;
    //-khtml-user-select: none;
    //user-select: none;
    .dialogAll {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: flex-start;

        .item {
            width: 100px;
            height: 100px;
            margin: 10px;

            img {
                width: 100%;
                height: 80%;
            }
        }
    }

    .header {
        width: 100%;
        height: 6%;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 9999;
        background-color: #3C3F41;

        .headerItem {
            margin-left: 10px;
            margin-top: 5px;
            color: white;
        }

        .topMenus {
            width: 80%;
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: flex-start;

            .topMenusItem {
                width: 8%;
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: center;

                .topMenusItem1 {
                    width: 100%;
                    height: 50%;
                }
            }
        }

        .member {
            position: absolute;
            right: 20px;
            top: 10px;
            z-index: 99999;
            color: white;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;

            span {
                margin-right: 5px;
            }
        }
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

        .leftTreeMenu {
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            align-items: center;
        }
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

        .getPosition {
            border: 1px solid gray;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
        }
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

