<template>
    <div class="aindex-container">
        <el-tabs :tab-position="tabPosition">
            <el-tab-pane label="基础">
                <basic></basic>
            </el-tab-pane>
            <el-tab-pane label="项目列表">
                <ProjectList></ProjectList>
            </el-tab-pane>
            <el-tab-pane label="点状对象">
                <PointObjects></PointObjects>
            </el-tab-pane>
            <el-tab-pane label="线状对象">
                <LineObjects></LineObjects>
            </el-tab-pane>
            <el-tab-pane label="面状对象">
                <PlaneObjects></PlaneObjects>
            </el-tab-pane>
            <el-tab-pane label="其他">
                <DemoControls></DemoControls>
            </el-tab-pane>
            <el-tab-pane label="环境">
                <EnvironmentControls></EnvironmentControls>
            </el-tab-pane>
            <el-tab-pane label="材质对象">
                <MaterialObjects></MaterialObjects>
            </el-tab-pane>
            <el-tab-pane label="3D对象">
                <Hello3d></Hello3d>
            </el-tab-pane>
            <el-tab-pane label="层数据">
                <LeftTree></LeftTree>
            </el-tab-pane>
            <el-tab-pane label="数据拾取">
                <panel></panel>

            </el-tab-pane>
        </el-tabs>

    </div>

</template>

<script>
import Basic from "@/components/left-tools/basic";
import ProjectList from "@/components/left-tools/ProjectList";
import PointObjects from "@/components/left-tools/PointObjects";
import LineObjects from "@/components/left-tools/LineObjects";
import PlaneObjects from "@/components/left-tools/PlaneObjects";
import DemoControls from "@/components/left-tools/DemoControls";
import EnvironmentControls from "@/components/left-tools/EnvironmentControls";
import MaterialObjects from "@/components/left-tools/MaterialObjects";
import Hello3d from "@/components/left-tools/D3Obj";
import LeftTree from "@/components/left-tools/LeftTree";
import Panel from "@/components/left-tools/Panel";

export default {
    components: {
        Panel,
        LeftTree,
        Hello3d,
        MaterialObjects,
        EnvironmentControls, DemoControls, PlaneObjects, LineObjects, PointObjects, ProjectList, Basic
    },
    data() {
        return {
            tabPosition: 'left'
        };
    },
    computed: {},
    watch: {},
    methods: {},
    mounted() {

    },
}
</script>
<style lang="scss">
.aindex-container {
    position: relative;

    .el-tabs__content {
        height: 800px !important;
        z-index: 999999;
    }
}
</style>
