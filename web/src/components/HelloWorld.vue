<template>
    <div class="all">

        <div id="cesiumContainer" @mouseup="mouseUp()"></div>

        <div class="aindex">
            <a-index></a-index>
        </div>


        <!--开发仪表盘-->
        <div v-if="!fakeBoard && showPanel" style="width: 100%; height: 100%">
            <div class="leftTree glass">
                <div class="leftTreeMenu">
                    <el-button size="mini" @click="currentLeft = '图层'">图层</el-button>
                    <el-button size="mini" @click="currentLeft = '实体'">实体</el-button>
                </div>

                <el-tree v-if="currentLeft == '实体'" :data="treeData" :props="defaultProps"
                         @node-click="handleNodeClick"></el-tree>
                <div v-if="currentLeft == '图层'">
                    <div v-for="item in layersData"> {{ item._imageryProvider.name }}</div>
                </div>
            </div>
            <div class="rightPart glass">
                <div>
                    MATH
                </div>
                <br>
                <div class="getPosition">
                    <div class="title">选取位置:</div>
                    <div class="title">log,lat,height</div>
                    <input id="copyValID" :value="clickPosition" type="text"/>
                    <el-button size="mini" @click="handleClick1('copyValID')">Copy</el-button>
                    <div class="title">cartographic-log,cartographic-lat,cartographic-height</div>
                    <input id="" :value="clickPositionCartographic" type="text"/>
                    <div class="title">Cartesian</div>
                    <input id="" :value="clickPositionCartesian" type="text"/>
                </div>

                <br>
                <div class="getPosition">
                    <div class="title">camera</div>
                    <div class="title">x,y,z,heading,pitch,roll</div>
                    <input id="copyValID1" :value="cameraPosition" type="text"/>
                    <el-button size="mini" @click="handleClick1('copyValID1')">Copy</el-button>
                </div>
                <br>

                <div class="getPosition">
                    <div>name: {{ currentEntities ? currentEntities.name : '暂无数据' }}</div>
                    <div>Cartesian3: {{ currentEntities ? currentEntities.position._value : '暂无数据' }}</div>
                    <div class="inpu">
                        <el-input v-model="rotationgPatams.Heading" placeholder="Heading" size="mini"></el-input>
                    </div>
                    <div class="inpu">
                        <el-input v-model="rotationgPatams.Pitch" placeholder="Pitch" size="mini"></el-input>
                    </div>
                    <div class="inpu">
                        <el-input v-model="rotationgPatams.Roll" placeholder="Roll" size="mini"></el-input>
                    </div>
                    <div class="inpu">
                        <el-button size="mini" @click="rotateEntity">rotate</el-button>
                    </div>
                    <div class="inpu">
                        <span>drag</span>
                        <el-switch
                            v-model="switchValue"
                            active-color="#13ce66"
                            inactive-color="#2B2B2B"
                            @change="dragChange">
                        </el-switch>
                    </div>
                </div>

            </div>
            <div class="bottomCenter">
                <HelloWorldBottom ref="mychild" :cApp="this.cApp"></HelloWorldBottom>
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
                v-model="fakeBoard"
                active-color="#13ce66"
                inactive-color="#2B2B2B"
                @change="">
            </el-switch>
        </div>
    </div>
</template>
<script>

import CesiumApp from './CesiumApp/CesiumApp'
import HelloWorldBottom from './HelloWorldBottom'
import AIndex from "@/components/tools/aIndex";

export default {
    name: 'hoting',
    components: {
        AIndex,
        HelloWorldBottom
    },
    watch: {},

    data() {
        return {

            changeShadowFlag: false,
            fakeBoard: false,
            showPanel: false,
            addGeoFlag: false,
            currentGeoType: null,
            moveToolFlag: false,


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


    },
    mounted() {


        const self = this


        this.$nextTick(() => {
            this.cApp = new CesiumApp()
            this.cApp.initMap()
            window.cApp = this.cApp
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
.cesium-viewer-animationContainer {
    position: absolute;
    bottom: 300px;
    left: 0;
    padding: 0;
    width: 169px;
    height: 112px;
    z-index: 9999999 !important;

}

.cesium-viewer-timelineContainer {
    position: absolute;
    bottom: 150px;
    left: 0px;
    right: 0px !important;
    height: 100px;
    padding: 0;
    margin: 0;
    font-size: 14px;
    z-index: 9999999 !important;

    .cesium-timeline-bar {
        height: 77.7em;
    }
}

@import "../style/reset.scss";
//引入方式

.el-menu-demo {
    height: 90%;
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
    z-index: 99999;
}

.slider {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 100px;
    height: 100%;
}

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

.all {

    .aindex {
        position: fixed;
        left: 300px;
        top: 100px;
        width: 20vw;
        height: 90vh;
    }

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
        z-index: 999;
        background-color: #3C3F41;

        .headerItem {
            margin-left: 10px;
            margin-top: 5px;
            color: white;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
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
                align-items: center;

                .topMenusItem1 {
                    width: 100%;
                    height: 30%;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                }
            }
        }

        .member {
            position: absolute;
            right: 20px;
            top: 10px;
            z-index: 999;
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
        z-index: 9999;
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

