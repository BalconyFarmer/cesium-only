<template>
    <div class="aindex-container">
        <el-tabs :tab-position="tabPosition" >
            <el-tab-pane label="基础">
                <basic></basic>
            </el-tab-pane>
            <el-tab-pane label="配置管理">配置管理</el-tab-pane>
            <el-tab-pane label="角色管理">角色管理</el-tab-pane>
            <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
        </el-tabs>
    </div>

</template>

<script>
import Basic from "@/components/tools/basic";

export default {
    components: {Basic},
    data() {
        return {
            tabPosition: 'left'
        };
    },
    computed: {},
    watch: {},
    methods: {},
    created() {

    },
    mounted() {

    },
}
</script>
<style lang="scss">
.aindex-container {
    .el-tabs__content {
        height: 800px !important;
        z-index: 999999;
    }
}
</style>
