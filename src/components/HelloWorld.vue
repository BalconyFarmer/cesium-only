<template>
    <div class="all">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item index="1">flowLine</el-menu-item>
            <el-menu-item index="2">云南</el-menu-item>
            <el-menu-item index="3">纽约</el-menu-item>
            <el-menu-item index="11">成都tiles</el-menu-item>
            <el-menu-item index="4">add图标</el-menu-item>
            <el-menu-item index="5">add3d</el-menu-item>
            <el-menu-item index="7">实景图层</el-menu-item>
            <el-menu-item index="8">文字图层</el-menu-item>
            <el-menu-item index="9">光照系统</el-menu-item>
            <el-menu-item index="12">倾斜摄影</el-menu-item>
            <el-menu-item index="10">addGeometry</el-menu-item>
            <el-menu-item index="6">addFlowWall</el-menu-item>
        </el-menu>
        <div id="cesiumContainer"></div>

    </div>
</template>

<script>
    import CesiumApp from './CesiumApp/CesiumApp'
    // 导出组件
    export default {
        name: 'hoting',
        data () {
            return {
                activeIndex: '1',
                activeIndex2: '1',
                viewer: null
            }
        },
        methods: {
            handleSelect (key, keyPath) {
                if (key == 1) {
                    this.cApp.part.addFlowLine()
                } else if (key == 2) {
                    this.cApp.part.loadJsonData()
                } else if (key == 3) {
                    this.cApp.cesium3DTileset.toYN()
                } else if (key == 4) {
                    this.cApp.part.addIcon()
                } else if (key == 5) {
                    this.cApp.part.addModel()
                } else if (key == 6) {
                    this.cApp.part.addFlowWall()
                } else if (key == 7) {
                    this.cApp.addImageryProviderLayerReal()
                } else if (key == 8) {
                    this.cApp.addImageryProviderLayerNormal()
                } else if (key == 9) {
                    this.cApp.switchLight()
                }else if (key == 10) {
                    this.cApp.part.addGeometry()
                }else if (key == 11) {
                    this.cApp.cesium3DTileset.addTiles()
                }else if (key == 12) {
                    this.cApp.obliquePhotography.addOblique()
                }
            }

        },
        mounted () {
            this.$nextTick(() => {
                this.cApp = new CesiumApp()
                this.cApp.initMap()
                this.cApp.addEvent()
            })
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
        height: 844px;
    }

    .all {
        width: 100%;
        height: 50%;
    }

</style>
