<template>
    <div class="all">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item index="1">昆明</el-menu-item>
            <el-menu-item index="2">云南</el-menu-item>
            <el-menu-item index="3">纽约</el-menu-item>
            <el-menu-item index="4">add图标</el-menu-item>
            <el-menu-item index="5">add3d</el-menu-item>
            <el-menu-item index="6">addFlowWall</el-menu-item>
            <el-menu-item index="7">addImageryLayer</el-menu-item>
        </el-menu>
        <div id="cesiumContainer"></div>

    </div>
</template>

<script>
    import CesiumApp from './CesiumApp'
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
                    this.cApp.toKunming()
                } else if (key == 2) {
                    this.cApp.toYunnan()
                } else if (key == 3) {
                    this.cApp.toYN()
                } else if (key == 4) {
                    this.cApp.addIcon()
                } else if (key == 5) {
                    this.cApp.addModel()
                } else if (key == 6) {
                    this.cApp.addFlowWall()
                } else if (key == 7) {
                    this.cApp.addImageryProviderLayer()
                }
            }

        },
        mounted () {
            this.$nextTick(() => {
                this.cApp = new CesiumApp()
                this.cApp.initMap()
                this.cApp.getPosition()
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
