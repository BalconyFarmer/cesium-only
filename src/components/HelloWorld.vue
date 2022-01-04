<template>
    <div class="all">
        <div class="header">
            <div>
                <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                    <el-menu-item index="13">run</el-menu-item>
                    <el-menu-item index="2">云南JSON</el-menu-item>
                    <el-menu-item index="3">纽约tiles</el-menu-item>
                    <el-menu-item index="11">成都tiles</el-menu-item>
                    <el-menu-item index="12">倾斜摄影</el-menu-item>
                    <el-menu-item index="6">addFlowWall</el-menu-item>
                </el-menu>
            </div>
            <div>
                <el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" @select="handleSelect">

                    <el-menu-item index="9">全球光照系统</el-menu-item>
                    <el-menu-item index="光照系统">光照系统</el-menu-item>
                    <el-menu-item index="addBloom">addBloom</el-menu-item>
                    <el-menu-item index="addOutline">addOutline</el-menu-item>
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
                    <el-menu-item>
                        <span class="demonstration">亮度</span>
                        <el-slider :max="1" :step="0.1" v-model="brightness"></el-slider>
                    </el-menu-item>
                </el-menu>
            </div>
        </div>

        <div class="leftTree">
            <div>ENTITIES</div>
            <el-tree :data="treeData" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
        </div>
        <div class="rightPart">
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

        <div class="bottomCenter">
            <div class="normal p" @mousedown="mouseDown('点')" @mouseup="mouseUp()">
                点
            </div>
            <div class="normal p" @mousedown="mouseDown('Box')" @mouseup="mouseUp()">
                Box
            </div>
            <div class="normal p" @mousedown="mouseDown('addEllipse')" @mouseup="mouseUp()">
                addEllipse
            </div>
            <div class="normal p" @mousedown="mouseDown('addEllipseTuo')" @mouseup="mouseUp()">
                addEllipseTuo
            </div>
            <div class="normal p" @mousedown="mouseDown('addEllipseTuoWW')" @mouseup="mouseUp()">
                addEllipseTuoWW
            </div>
            <div class="normal y" @mousedown="mouseDown('圆柱体')" @mouseup="mouseUp()">
                圆柱体
            </div>
            <div class="normal b" @mousedown="mouseDown('bilbord')" @mouseup="mouseUp()">
                bilbord
            </div>
            <div class="normal b" @mousedown="mouseDown('redCorridor')" @mouseup="mouseUp()">
                redCorridor
            </div>
            <div class="normal b" @mousedown="mouseDown('redPolygon')" @mouseup="mouseUp()">
                redPolygon
            </div>
            <div class="normal b" @mousedown="mouseDown('greenPolygon')" @mouseup="mouseUp()">
                greenPolygon
            </div>
            <div class="normal b" @mousedown="mouseDown('orangePolygon')" @mouseup="mouseUp()">
                orangePolygon
            </div>
            <div class="normal b" @mousedown="mouseDown('bluePolygon')" @mouseup="mouseUp()">
                bluePolygon
            </div>
            <div class="normal b" @mousedown="mouseDown('redLine')" @mouseup="mouseUp()">
                redLine
            </div>
            <div class="normal glowingLine" @mousedown="mouseDown('glowingLine')" @mouseup="mouseUp()">
                glowingLine
            </div>
            <div class="normal orangeOutlined" @mousedown="mouseDown('orangeOutlined')" @mouseup="mouseUp()">
                orangeOutlined
            </div>
            <div class="normal yellowLine" @mousedown="mouseDown('yellowLine')" @mouseup="mouseUp()">
                yellowLine
            </div>
            <div class="normal redRectangle" @mousedown="mouseDown('redRectangle')" @mouseup="mouseUp()">
                redRectangle
            </div>
            <div class="normal greenRectangle" @mousedown="mouseDown('greenRectangle')" @mouseup="mouseUp()">
                greenRectangle
            </div>
            <div class="normal blueEllipsoid" @mousedown="mouseDown('blueEllipsoid')" @mouseup="mouseUp()">
                blueEllipsoid
            </div>
            <div class="normal redSphere" @mousedown="mouseDown('redSphere')" @mouseup="mouseUp()">
                redSphere
            </div>
            <div class="normal outlineOnly" @mousedown="mouseDown('outlineOnly')" @mouseup="mouseUp()">
                outlineOnly
            </div>
            <div class="normal redWall" @mousedown="mouseDown('redWall')" @mouseup="mouseUp()">
                redWall
            </div>
            <div class="normal greenWall" @mousedown="mouseDown('greenWall')" @mouseup="mouseUp()">
                greenWall
            </div>
            <div class="normal blueWall" @mousedown="mouseDown('blueWall')" @mouseup="mouseUp()">
                blueWall
            </div>
            <div class="normal addMaterial" @mousedown="mouseDown('addMaterial')" @mouseup="mouseUp()">
                MMM
            </div>
        </div>
        <div id="cesiumContainer" @mouseup="mouseUp()"></div>

    </div>
</template>
<script>
    import * as Cesium from 'cesium/Cesium'
    import * as widget from 'cesium/Widgets/widgets.css'
    import CesiumApp from './CesiumApp/CesiumApp'
    import {scriptLoader} from '../utils/index'

    export default {
        name: 'hoting',
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
                addGeoFlag: false,
                geoPositionCartesian2: null,
                currentGeoType: null,
                brightness: 1,
                terrainFlag: true,
                moveToolFlag: false,
                value: '2.5D模式',
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
                if (this.addGeoFlag) {
                    switch (this.currentGeoType) {
                        case '点':
                            this.cApp.innerGeometry.addPoint(this.geoPositionCartesian2)
                            break
                        case '圆柱体':
                            this.cApp.innerGeometry.addGeometry(this.geoPositionCartesian2)
                            break
                        case 'bilbord':
                            this.cApp.innerGeometry.addIcon(this.geoPositionCartesian2, '默认')
                            break
                        case 'Box':
                            this.cApp.innerGeometry.addBox(this.geoPositionCartesian2)
                            break
                        case 'addEllipse':
                            this.cApp.innerGeometry.addEllipse(this.geoPositionCartesian2)
                            break
                        case 'addEllipseTuo':
                            this.cApp.innerGeometry.addEllipseTuo(this.geoPositionCartesian2)
                            break
                        case 'addEllipseTuoWW':
                            this.cApp.innerGeometry.addEllipseTuoWW(this.geoPositionCartesian2)
                            break
                        case 'redCorridor':
                            this.cApp.innerGeometry.redCorridor(this.geoPositionCartesian2)
                            break
                        case 'redPolygon':
                            this.cApp.innerGeometry.redPolygon(this.geoPositionCartesian2)
                            break
                        case 'greenPolygon':
                            this.cApp.innerGeometry.greenPolygon(this.geoPositionCartesian2)
                            break
                        case 'orangePolygon':
                            this.cApp.innerGeometry.orangePolygon(this.geoPositionCartesian2)
                            break
                        case 'bluePolygon':
                            this.cApp.innerGeometry.bluePolygon(this.geoPositionCartesian2)
                            break
                        case 'redLine':
                            this.cApp.innerGeometry.redLine(this.geoPositionCartesian2)
                            break
                        case 'glowingLine':
                            this.cApp.innerGeometry.glowingLine(this.geoPositionCartesian2)
                            break
                        case 'orangeOutlined':
                            this.cApp.innerGeometry.orangeOutlined(this.geoPositionCartesian2)
                            break
                        case 'yellowLine':
                            this.cApp.innerGeometry.yellowLine(this.geoPositionCartesian2)
                            break
                        case 'redRectangle':
                            this.cApp.innerGeometry.redRectangle(this.geoPositionCartesian2)
                            break
                        case 'greenRectangle':
                            this.cApp.innerGeometry.greenRectangle(this.geoPositionCartesian2)
                            break
                        case 'blueEllipsoid':
                            this.cApp.innerGeometry.blueEllipsoid(this.geoPositionCartesian2)
                            break
                        case 'redSphere':
                            this.cApp.innerGeometry.redSphere(this.geoPositionCartesian2)
                            break
                        case 'outlineOnly':
                            this.cApp.innerGeometry.outlineOnly(this.geoPositionCartesian2)
                            break
                        case 'redWall':
                            this.cApp.innerGeometry.redWall(this.geoPositionCartesian2)
                            break
                        case 'greenWall':
                            this.cApp.innerGeometry.greenWall(this.geoPositionCartesian2)
                            break
                        case 'blueWall':
                            this.cApp.innerGeometry.blueWall(this.geoPositionCartesian2)
                            break
                        case 'addMaterial':
                            this.cApp.innerGeometry.addMaterial(this.geoPositionCartesian2)
                            break
                    }
                }
                this.addGeoFlag = false
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
            },
            handleSelect (key, keyPath) {
                if (key == 2) {
                    this.cApp.loadJson.loadJsonData()
                } else if (key == 3) {
                    this.cApp.cesium3DTileset.toYN()
                } else if (key == 6) {
                    this.cApp.part.addFlowWall()
                } else if (key == 9) {
                    this.cApp.switchLight()
                } else if (key == 11) {
                    this.cApp.runChengDu()
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
                this.cApp.eventCenter.addEventListener('geoPosition', function (data) {
                    self.geoPositionCartesian2 = data.message.position
                })

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
    body {
        display: block;
        margin: 0px;
        overflow-y: hidden;
    }

    .title {
        font-weight: bold;
        color: #87939A;
    }

    .el-tree-node__content:hover {
        background-color: rgba(43, 43, 43, 0.9);
    }

    /*定义滚动条高宽及背景
    高宽分别对应横竖滚动条的尺寸*/
    ::-webkit-scrollbar {
        width: 5px;
        height: 16px;
        background-color: #F5F5F5;
    }

    /*定义滚动条轨道
     内阴影+圆角*/
    ::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        border-radius: 10px;
        background-color: #F5F5F5;
    }

    /*定义滑块
     内阴影+圆角*/
    ::-webkit-scrollbar-thumb {
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
        background-color: #555;
    }

    .cesium-viewer-bottom {
        display: none !important;
        visibility: hidden !important;
    }

    .el-menu {
        background-color: #3C3F41;
    }

    .el-menu.el-menu--horizontal {
        border-bottom: solid 1px #3C3F41;
    }

    #cesiumContainer {
        width: 100%;
        height: 100%;
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
            width: 70%;
            height: 20%;
            position: absolute;
            left: 15%;
            bottom: 0;
            background-color: rgba(43, 43, 43, .5);
            z-index: 999;
            color: white;
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            flex-wrap: wrap;
            -moz-user-select: none;
            -khtml-user-select: none;
            user-select: none;

            .normal {
                width: 50px;
                height: 50px;
                border: 1px solid white;
                margin: 5px;
            }

            .addMaterial {
                background-image: url("../assets/geometryIcons/material.png");
                background-size: 100% 100%;
            }

            .glowingLine {
                background-image: url("../assets/geometryIcons/glowingLine.png");
                background-size: 100% 100%;
            }

            .yellowLine {
                background-image: url("../assets/geometryIcons/yellowLine.png");
                background-size: 100% 100%;
            }

            .redRectangle {
                background-image: url("../assets/geometryIcons/redRectangle.png");
                background-size: 100% 100%;
            }

            .greenRectangle {
                background-image: url("../assets/geometryIcons/greenRectangle.png");
                background-size: 100% 100%;
            }

            .blueEllipsoid {
                background-image: url("../assets/geometryIcons/blueEllipsoid.png");
                background-size: 100% 100%;
            }

            .redSphere {
                background-image: url("../assets/geometryIcons/redSphere.png");
                background-size: 100% 100%;
            }

            .outlineOnly {
                background-image: url("../assets/geometryIcons/outlineOnly.png");
                background-size: 100% 100%;
            }

            .blueWall {
                background-image: url("../assets/geometryIcons/blueWall.png");
                background-size: 100% 100%;
            }

            .greenWall {
                background-image: url("../assets/geometryIcons/greenWall.png");
                background-size: 100% 100%;
            }

            .redWall {
                background-image: url("../assets/geometryIcons/redWall.png");
                background-size: 100% 100%;
            }

            .p {
                background-image: url("../assets/geometryIcons/p.png");
                background-size: 100% 100%;
            }

            .y {
                background-image: url("../assets/geometryIcons/y.png");
                background-size: 100% 100%;
            }

            .b {
                background-image: url("../assets/geometryIcons/b.png");
                background-size: 100% 100%;
            }
        }
    }


    .el-tree {
        position: relative;
        cursor: default;
        background-color: rgba(43, 43, 43, .0);
        color: #ffffff;
    }

</style>

