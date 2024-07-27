<template>
    <div class="basic-container">
        <div class="item">
            <el-select v-model="optionsLayersIndex" placeholder="基础底图" size="mini">
                <el-option v-for="item in optionsLayers" :key="item.value" :label="item.label"
                           :value="item.value"></el-option>
            </el-select>
        </div>

        <div class="item">
            <el-select v-model="modelData" placeholder="模型对象" size="mini">
                <el-option v-for="item in modelDataList" :key="item.value" :label="item.label"
                           :value="item.value"></el-option>
            </el-select>
        </div>

        <div class="item">
            <el-select v-model="value" placeholder="请选择地图3D模式" size="mini">
                <el-option v-for="item in options" :key="item.value" :label="item.label"
                           :value="item.value"></el-option>
            </el-select>
        </div>

        <div class="top-menus">
            <div class="top-menus-item">
                <div class="top-menus-item-label">SunLight光照</div>
                <div class="top-menus-item-switch">
                    <el-switch v-model="changeGlobleLightFlag" active-color="#13ce66" inactive-color="#2B2B2B"
                               width="30" @change="changeGlobleLight"></el-switch>
                </div>
            </div>

            <div class="top-menus-item">
                <div class="top-menus-item-label">光照系统</div>
                <div class="top-menus-item-switch">
                    <el-switch v-model="changeLightFlag" active-color="#13ce66" inactive-color="#2B2B2B" width="30"
                               @change="changeLight"></el-switch>
                </div>
            </div>

            <div class="top-menus-item">
                <div class="top-menus-item-label">shadow</div>
                <div class="top-menus-item-switch">
                    <el-switch v-model="changeShadowFlag" active-color="#13ce66" inactive-color="#2B2B2B" width="30"
                               @change="changeShadow"></el-switch>
                </div>
            </div>

            <div class="top-menus-item">
                <div class="top-menus-item-label">地形叠加</div>
                <div class="top-menus-item-switch">
                    <el-tooltip :content="'关闭地形'" placement="top">
                        <el-switch v-model="terrainFlag" active-color="#13ce66" inactive-color="#2B2B2B" width="30"
                                   @change="terrainChange"></el-switch>
                    </el-tooltip>
                </div>
            </div>

            <div class="top-menus-item">
                <div class="top-menus-item-label">整体亮度</div>
                <div class="top-menus-item-slider">
                    <el-slider v-model="brightness" :max="2" :step="0.1"></el-slider>
                </div>
            </div>

            <div class="top-menus-item">
                <div class="top-menus-item-label">视角大小</div>
                <div class="top-menus-item-slider">
                    <el-slider v-model="fov" :max="2" :step="0.1"></el-slider>
                </div>
            </div>

            <el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                <el-menu-item index="addBloom">Bloom</el-menu-item>
                <el-menu-item index="addOutline">Outline</el-menu-item>
                <el-menu-item index="14">关闭冗余</el-menu-item>
                <el-menu-item index="动画组件">动画组件</el-menu-item>
            </el-menu>
        </div>


    </div>
</template>

<script>
export default {
    data() {
        return {
            changeGlobleLightFlag: false,
            changeLightFlag: false,
            terrainFlag: false,
            brightness: 1,
            fov: 1,
            activeIndex2: '1',
            dialogVisible: false,
            cApp: null,
            optionsLayers: [
                {value: 'google实景图层', label: 'google实景图层(VPN)'},
                {value: 'ArcGis实景图层', label: 'ArcGis实景图层'},
                {value: 'geoq智图黑', label: 'geoq智图黑'},
                {value: '高德卫星', label: '高德卫星 + 高德文字'},
                {value: 'BING', label: 'BING卫星 + BING文字'},
                {value: 'BING道路', label: 'BING道路'},
                {value: '纯黑', label: '纯黑'},
                {value: '百度地图', label: '百度地图'},
                {value: '腾讯地图', label: '腾讯地图'},
                {value: '天地图', label: '天地图'},
                {value: '高德地图', label: '高德地图'},
                {value: '谷歌地图', label: '谷歌地图'}
            ],
            optionsLayersIndex: "谷歌地图",
            modelData: null,
            modelDataList: [
                {value: 'JSON闪光路', label: 'JSON闪光路'},
                {value: '西双版纳JSON掩模', label: '西双版纳JSON掩模'},
                {value: '西双版纳JSON', label: '西双版纳JSON'},
                {value: '云南JSON', label: '云南JSON'},
                {value: '纽约tiles', label: '纽约tiles'},
                {value: '倾斜摄影', label: '倾斜摄影'},
                {value: '华盛顿IMG', label: '华盛顿IMG'},
                {value: 'OSM建筑', label: 'OSM建筑'}
            ],
            options: [
                {value: '3D模式', label: '3D模式'},
                {value: '2.5D模式', label: '2.5D模式'},
                {value: '2D模式', label: '2D模式'}
            ],
            value: '地球模式'
        };
    },
    watch: {
        brightness: {
            handler(newValue) {
                if (this.cApp) {
                    this.cApp.updateBrightness(this.brightness)
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
        value: {
            handler(newValue) {
                if (this.cApp) {
                    this.cApp.switchViewMode(this.value)
                }
            },
            deep: false,
            immediate: false
        },
        optionsLayersIndex: {
            handler(newValue) {
                if (this.cApp) {
                    this.cApp.switchLayer(this.optionsLayersIndex)
                }
            },
            deep: false,
            immediate: false
        },
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
            deep: false,
            immediate: false
        },
    },
    methods: {
        terrainChange() {
            if (this.terrainFlag) {
                this.cApp.addTerrain()
            } else {
                this.cApp.removeTerrain()
            }
        },
        changeLight() {
            this.cApp.addLight()
        },
        changeShadow() {
            this.cApp.changeShadow()
        },
        changeGlobleLight() {
            this.cApp.switchLight()
        },

        handleSelect(key) {
            if (key == 14) {
                this.cApp.closeAll()
            } else if (key == 'addBloom') {
                this.cApp.addBloom()
            } else if (key == 'addOutline') {
                this.cApp.addOutline()
            } else if (key == '动画组件') {
                this.cApp.clock.closeAimationToolbar()
            }
        },
    },
    mounted() {
        setTimeout(() => {
            this.cApp = window.cApp
        }, 1000)
    },
}
</script>

<style lang="scss" scoped>
.basic-container {
    padding: 20px;

    .item {
        margin: 10px 0;
    }

    .top-menus {
        display: flex;
        flex-direction: column;

        .top-menus-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;

            .top-menus-item-label {
                font-weight: bold;
            }

            .top-menus-item-switch,
            .top-menus-item-slider {
                flex: 1;
                display: flex;
                justify-content: flex-end;
            }
        }
    }

    .row-sc {
        display: flex;
        align-items: center;
        cursor: pointer;
        margin-top: 20px;

        span {
            font-size: 16px;
            font-weight: bold;
        }

        el-avatar {
            margin-left: 10px;
        }
    }
}
</style>
