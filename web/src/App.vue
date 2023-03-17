<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
export default {
    name: 'App'
}
</script>

<style lang="scss">
#app {
    overflow-y: hidden;
}
@import './style/reset.scss';
@import './style/elementPlusCustom.scss';
@import "./style/test.scss";

@font-face {
    font-family: 'apple';  //重命名字体名
    src: url('./style/font/pingfangsc-regular.otf');  //引入字体
}

@font-face {
    font-family: 'digital';  //重命名字体名
    src: url('./style/font/DSEG7Classic-Regular.ttf');  //引入字体
}
</style>
