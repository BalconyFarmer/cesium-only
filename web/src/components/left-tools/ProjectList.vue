<template>
    <div class="column" @click="$emit('open-dialog')">
        <div class="item" @click="runChengdu">
            <span>0. 纽约</span>
        </div>
        <div class="item" @click="runShanghai">
            <span>1. 上海</span>
        </div>
        <div class="item" @click="runTrain">
            <span>2. 火车</span>
        </div>
        <div class="item" @click="runXSBN">
            <span>3. 西双版纳</span>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            cApp: null,
            dialogVisible: false,
            fakeBoard: false
        };
    },
    methods: {
        runChengdu() {
            this.cApp.runChengDu();
            this.fakeBoard = true;
            this.dialogVisible = false;
        },
        runShanghai() {
            this.cApp.runShanghai();
            this.fakeBoard = true;
            this.dialogVisible = false;
        },
        runTrain() {
            this.fakeBoard = true;
            this.dialogVisible = false;
            this.cApp.train.testChinaData();
        },
        runXSBN() {
            this.fakeBoard = true;
            this.dialogVisible = false;
            this.cApp.runXSBN();
        }
    },
    mounted() {
        setTimeout(() => {
            this.cApp = window.cApp;
        }, 1000);
    }
};
</script>

<style scoped>
.column {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    cursor: pointer;
    margin-top: 20px;
    color: white;
}

.item {
    padding: 10px 20px;
    margin: 5px 0;
    background-color: #333;
    border-radius: 5px;
    transition: background-color 0.3s ease;
}

.item:hover {
    background-color: #555;
}

span {
    font-size: 16px;
    font-weight: bold;
}

el-avatar {
    margin-left: 10px;
}
</style>
