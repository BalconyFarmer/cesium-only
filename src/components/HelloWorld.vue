<template>
    <div class="all">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item index="13">run</el-menu-item>
            <el-menu-item index="2">云南JSON</el-menu-item>
            <el-menu-item index="3">纽约tiles</el-menu-item>
            <el-menu-item index="11">成都tiles</el-menu-item>
            <el-menu-item index="12">倾斜摄影</el-menu-item>
            <el-menu-item index="6">addFlowWall</el-menu-item>
        </el-menu>
        <el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item index="7">实景图层</el-menu-item>
            <el-menu-item index="8">文字图层</el-menu-item>
            <el-menu-item index="9">光照系统</el-menu-item>
            <el-menu-item index="14">关闭冗余</el-menu-item>
        </el-menu>
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
                viewer: null,
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
                cameraPosition: []
            }
        },
        methods: {
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

<style>

    .cesium-viewer-bottom {
        display: none !important;
        visibility: hidden !important;
    }

    #cesiumContainer {
        width: 100%;
        height: 744px;
    }

    .all {
        width: 100%;
        height: 50%;
    }

    .leftTree {
        width: 10%;
        height: 70%;
        position: absolute;
        left: 0px;
        top: 20%;
        z-index: 999;
        overflow-y: auto;
    }

    .rightPart {
        width: 10%;
        height: 50%;
        position: absolute;
        right: 10px;
        top: 30%;
        z-index: 999;
        overflow-y: auto;
        color: white;
        background-color: black;
    }

</style>

