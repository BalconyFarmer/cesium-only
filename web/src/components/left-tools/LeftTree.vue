<template>
    <div class="leftTree glass">
        <div class="leftTreeMenu">
            <el-button size="mini" @click="currentLeft = '图层'">图层</el-button>
            <el-button size="mini" @click="currentLeft = '实体'">实体</el-button>
        </div>
        <el-tree v-if="currentLeft === '实体'" :data="treeData" :props="defaultProps"
                 @node-click="handleNodeClick"></el-tree>
        <div v-if="currentLeft === '图层'">
            <div v-for="item in layersData" :key="item._imageryProvider.name">
                {{ item._imageryProvider.name }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {},
    data() {
        return {
            currentLeft: "实体",
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            cApp: null,
            treeData: [],
            layersData: [],

        }
    },
    methods: {
        handleNodeClick(data) {
            window.cApp.lookAtByName(data.label);
        },
    },
    mounted() {
        this.entitysList = window.cApp.getViewerEntitys();

        setInterval(() => {
            this.treeData = [];
            this.entitysList.forEach(item => {
                this.treeData.push({label: item.name || '未定义'});
            });
            if (window.cApp) {
                this.layersData = window.cApp.viewer.imageryLayers._layers;
            }
        }, 500);
    }
}
</script>

<style lang="scss" scoped>
.leftTree {
    width: 50%;
    height: 100%;
    background-color: rgba(43, 43, 43, .9);
    color: white;
    overflow-y: auto;
    padding: 10px;

    .leftTreeMenu {
        display: flex;
        justify-content: space-around;
        margin-bottom: 10px;
    }
}
</style>
