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
                    <el-menu-item index="7">实景图层</el-menu-item>
                    <el-menu-item index="8">文字图层</el-menu-item>
                    <el-menu-item index="9">光照系统</el-menu-item>
                    <el-menu-item index="14">关闭冗余</el-menu-item>
                    <el-menu-item index="">
                        <el-tooltip :content="'拖拽模型'" placement="top">
                            <el-switch
                                    @change="dragChange"
                                    v-model="switchValue"
                                    active-color="#13ce66"
                                    inactive-color="#ff4949">
                            </el-switch>
                        </el-tooltip>
                    </el-menu-item>
                </el-menu>
            </div>
        </div>

        <div class="leftTree">
            <div>ENTITIES</div>
            <el-tree :data="treeData" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
        </div>
        <div class="rightPart">
            MATH
            <div>
                log,
                <div>{{clickPosition[0]|| 0}}</div>
                lat,
                <div>{{clickPosition[1]|| 0}}</div>
                height
                <div>{{clickPosition[2]|| 0}}</div>
            </div>
            <div>
                camera
                log,lat,height
                <div>{{cameraPosition[0]|| 0}}</div>
                heading
                <div>{{cameraPosition[1]|| 0}}</div>
                pitch
                <div>{{cameraPosition[2]|| 0}}</div>
                roll
                <div>{{cameraPosition[3]|| 0}}</div>
            </div>
        </div>
        <div class="bottomCenter">
            {{currentEntities? currentEntities.name: 0}}
        </div>
        <div id="cesiumContainer"></div>

    </div>
</template>

<script>
    import CesiumApp from './CesiumApp/CesiumApp'
    // 导出组件
    export default {
        name: 'hoting',
        watch: {},

        data () {
            return {
                activeIndex: '1',
                activeIndex2: '1',
                entitysList: [],
                treeData: [{
                    label: '一级 1',
                    children: [{
                        label: '二级 1-1',
                        children: [{
                            label: '三级 1-1-1'
                        }]
                    }]
                }, {
                    label: '一级 2',
                    children: [{
                        label: '二级 2-1',
                        children: [{
                            label: '三级 2-1-1'
                        }]
                    }, {
                        label: '二级 2-2',
                        children: [{
                            label: '三级 2-2-1'
                        }]
                    }]
                }, {
                    label: '一级 3',
                    children: [{
                        label: '二级 3-1',
                        children: [{
                            label: '三级 3-1-1'
                        }]
                    }, {
                        label: '二级 3-2',
                        children: [{
                            label: '三级 3-2-1'
                        }]
                    }]
                }],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                clickPosition: [],
                cameraPosition: [],
                switchValue: false,
                currentEntities: null

            }
        },
        methods: {
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
                } else if (key == 7) {
                    this.cApp.addImageryProviderLayerReal()
                } else if (key == 8) {
                    this.cApp.addImageryProviderLayerNormal()
                } else if (key == 9) {
                    this.cApp.switchLight()
                } else if (key == 11) {
                    this.cApp.cesium3DTileset.addTiles()
                } else if (key == 12) {
                    this.cApp.obliquePhotography.addOblique()
                } else if (key == 13) {
                    this.cApp.addTimeAction()
                } else if (key == 14) {
                    this.cApp.closeAll()
                }
            }

        },
        mounted () {
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
            }, 1000)
        }

    }
</script>

<style lang="scss">
    body {
        display: block;
        margin: 0px;
        overflow-y: hidden;
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
            background-color: #FFFFFF;
        }

        .leftTree {
            width: 10%;
            height: 90%;
            position: absolute;
            left: 0px;
            top: 10%;
            z-index: 999;
            overflow-y: auto;
            background-color: #2B2B2B;
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
            background-color: #2B2B2B;
        }

        .bottomCenter {
            width: 70%;
            height: 20%;
            position: absolute;
            left: 15%;
            bottom: 0%;
            background-color: #2B2B2B;
            z-index: 999;
            color: white;

        }
    }


    .el-tree {
        position: relative;
        cursor: default;
        background: #2B2B2B;
        color: #606266;
    }


</style>

