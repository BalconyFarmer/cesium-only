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
            <div v-for="(label, key) in switches" :key="key" class="top-menus-item">
                <div class="top-menus-item-label">{{ label }}</div>
                <div class="top-menus-item-switch">
                    <el-switch v-model="flags[key]" :active-color="activeColor" :inactive-color="inactiveColor"
                               width="30" @change="handleSwitchChange(key)"></el-switch>
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
            <div v-for="(label, key) in buttons" :key="key" class="top-menus-item">
                <el-button size="mini" type="primary" @click="handleSelect(key)">{{ label }}</el-button>
            </div>
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
            value: '地球模式',
            flags: {
                changeGlobleLightFlag: false,
                changeLightFlag: false,
                changeShadowFlag: false,
                terrainFlag: false
            },
            activeColor: '#13ce66',
            inactiveColor: '#2B2B2B',
            switches: {
                changeGlobleLightFlag: 'SunLight光照',
                changeLightFlag: '光照系统',
                changeShadowFlag: 'shadow',
                terrainFlag: '地形叠加'
            },
            buttons: {
                addBloom: 'Bloom',
                addOutline: 'Outline',
                '14': '关闭冗余',
                动画组件: '动画组件'
            }
        };
    },
    watch: {
        brightness(newValue) {
            if (this.cApp) this.cApp.updateBrightness(this.brightness);
        },
        fov(newValue) {
            if (this.cApp) this.cApp.updataFov(this.fov);
        },
        value(newValue) {
            if (this.cApp) this.cApp.switchViewMode(this.value);
        },
        optionsLayersIndex(newValue) {
            if (this.cApp) this.cApp.switchLayer(this.optionsLayersIndex);
        },
        modelData(newValue) {
            if (this.cApp) this.loadModelData(this.modelData);
        }
    },
    methods: {
        handleSwitchChange(key) {
            const methodMap = {
                changeGlobleLightFlag: 'switchLight',
                changeLightFlag: 'addLight',
                changeShadowFlag: 'changeShadow',
                terrainFlag: 'toggleTerrain'
            };
            if (this.cApp) this.cApp[methodMap[key]]();
        },
        handleSelect(key) {
            const methodMap = {
                addBloom: 'addBloom',
                addOutline: 'addOutline',
                '14': 'closeAll',
                动画组件: 'clock.closeAimationToolbar'
            };
            if (this.cApp) this.cApp[methodMap[key]]();
        },
        loadModelData(key) {
            const methodMap = {
                JSON闪光路: 'loadJson.loadJsonRoad',
                西双版纳JSON掩模: 'loadJson.loadJsonYanMo',
                西双版纳JSON: 'addTimeAction',
                云南JSON: 'loadJson.loadJsonData',
                纽约tiles: 'cesium3DTileset.toYN',
                倾斜摄影: 'obliquePhotography.addOblique',
                华盛顿IMG: 'huashengdunImg',
                OSM建筑: 'addOSMBuilding'
            };
            if (this.cApp) this.cApp[methodMap[key]]();
        },
        toggleTerrain() {
            if (this.flags.terrainFlag) this.cApp.addTerrain();
            else this.cApp.removeTerrain();
        }
    },
    mounted() {
        setTimeout(() => {
            this.cApp = window.cApp;
        }, 1000);
    }
};
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
    }

    .top-menus-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;

        .top-menus-item-label {
            font-weight: bold;
        }

        .top-menus-item-switch, .top-menus-item-slider {
            width: 200px;
            justify-content: flex-end;
        }
    }
}
</style>
