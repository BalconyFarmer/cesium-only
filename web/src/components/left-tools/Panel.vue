<template>
    <div class="panel-container">
        <div class="rightPart glass">
            <div class="section">
                <div class="title">选取位置:</div>
                <div class="subtitle">log, lat, height</div>
                <input id="copyValID" :value="clickPosition" readonly type="text"/>
                <el-button size="mini" @click="handleClick1('copyValID')">Copy</el-button>
                <div class="subtitle">cartographic-log, cartographic-lat, cartographic-height</div>
                <input :value="clickPositionCartographic" readonly type="text"/>
                <div class="subtitle">Cartesian</div>
                <input :value="clickPositionCartesian" readonly type="text"/>
            </div>
            <div class="section">
                <div class="title">相机位置</div>
                <div class="subtitle">x, y, z, heading, pitch, roll</div>
                <input id="copyValID1" :value="cameraPosition" readonly type="text"/>
                <el-button size="mini" @click="handleClick1('copyValID1')">Copy</el-button>
            </div>
            <div class="section">
                <div class="title">实体信息</div>
                <div>name: {{ currentEntities ? currentEntities.name : '暂无数据' }}</div>
                <div>Cartesian3: {{ currentEntities ? currentEntities.position._value : '暂无数据' }}</div>
                <el-input v-model="rotationParams.Heading" placeholder="Heading" size="mini"></el-input>
                <el-input v-model="rotationParams.Pitch" placeholder="Pitch" size="mini"></el-input>
                <el-input v-model="rotationParams.Roll" placeholder="Roll" size="mini"></el-input>
                <el-button size="mini" @click="rotateEntity">rotate</el-button>
                <span>drag</span>
                <el-switch v-model="switchValue" active-color="#13ce66" inactive-color="#2B2B2B"
                           @change="dragChange"></el-switch>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Panel',
    props: {
        clickPosition: Array,
        clickPositionCartographic: Object,
        clickPositionCartesian: Object,
        cameraPosition: Array,
        currentEntities: Object,
        rotationParams: Object,
        switchValue: Boolean
    },
    methods: {
        handleClick1(ID) {
            const copyVal = document.getElementById(ID);
            copyVal.select();
            document.execCommand('copy');
        },
        rotateEntity() {
            this.$emit('rotateEntity', this.rotationParams);
        },
        dragChange() {
            this.$emit('dragChange', this.switchValue);
        }
    }
}
</script>

<style lang="scss">
.panel-container {
    display: flex;
    width: 15%;
    height: auto;
    position: absolute;
    top: 10%;
    right: 10px;
    z-index: 999;
    background-color: rgba(43, 43, 43, .9);
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    overflow: hidden;
    flex-direction: column;
    padding: 15px;
}

.rightPart {
    width: 100%;
    color: white;
    overflow-y: auto;

    .section {
        margin-bottom: 20px;

        .title {
            font-weight: bold;
            margin-bottom: 5px;
            font-size: 1.1em;
            color: #fff;
        }

        .subtitle {
            font-size: 0.9em;
            margin-bottom: 5px;
            color: #bbb;
        }

        input {
            width: 100%;
            margin-bottom: 10px;
            padding: 5px;
            border-radius: 4px;
            border: 1px solid #555;
            background-color: #2b2b2b;
            color: white;
        }

        .el-button {
            margin-bottom: 10px;
        }

        .el-input {
            margin-bottom: 10px;
        }
    }
}
</style>
