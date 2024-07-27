<template>
    <div class="leftTree glass">

        <div>
            <div>图层</div>

            <div v-for="item in layersData" :key="item.name">
                {{ item.name }}
            </div>
        </div>

        <div>
            <div>实体</div>
            <div v-for="item in treeData" :key="item.name">
                {{ item.name }}
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

        setInterval(() => {
            let viewer = window.cApp.viewer

            const imageryLayers = viewer.scene.imageryLayers;
            const imageryLayersList = [];
            for (let i = 0; i < imageryLayers.length; i++) {
                const layer = imageryLayers.get(i);
                imageryLayersList.push({
                    name: layer.imageryProvider.constructor.name,
                    show: layer.show,
                });
            }
            this.layersData = imageryLayersList


            // 获取所有实体
            const entities = viewer.entities.values;
            this.treeData = entities
            // 打印所有实体的信息
            entities.forEach(entity => {
                console.log('Entity ID:', entity.id);
                console.log('Entity Name:', entity.name);
                console.log('Entity Position:', entity.position ? entity.position.getValue(Cesium.JulianDate.now()) : 'No position');
            });
        }, 1000)


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
