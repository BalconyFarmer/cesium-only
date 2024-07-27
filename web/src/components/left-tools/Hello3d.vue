<template>
    <div class="all">
        <el-tabs v-model="activeName">
            <el-tab-pane label="3D对象" name="first">
                <div class="geo">
                    <div class="normal b" @mousedown="mouseDown('bilbord')">bilbord</div>
                    <div class="normal addIconBackground" @mousedown="mouseDown('addIconBackground')">bilbordBG</div>
                    <div class="normal ParticalSys" @mousedown="mouseDown('ParticalSys')">TT</div>
                    <div class="normal p" @mousedown="mouseDown('点')">TT</div>
                    <div class="normal Box" @mousedown="mouseDown('Box')">TT</div>
                    <div class="normal addEllipse" @mousedown="mouseDown('addEllipse')">TT</div>
                    <div class="normal addEllipseTuo" @mousedown="mouseDown('addEllipseTuo')">TT</div>
                    <div class="normal addEllipseTuoWW" @mousedown="mouseDown('addEllipseTuoWW')">TT</div>
                    <div class="normal y" @mousedown="mouseDown('圆柱体')">TT</div>
                    <div class="normal glowingLine" @mousedown="mouseDown('glowingLine')">TT</div>
                    <div class="normal orangeOutlined" @mousedown="mouseDown('orangeOutlined')">TT</div>
                    <div class="normal yellowLine" @mousedown="mouseDown('yellowLine')">TT</div>
                    <div class="normal redRectangle" @mousedown="mouseDown('redRectangle')">TT</div>
                    <div class="normal greenRectangle" @mousedown="mouseDown('greenRectangle')">TT</div>
                    <div class="normal blueEllipsoid" @mousedown="mouseDown('blueEllipsoid')">TT</div>
                    <div class="normal redSphere" @mousedown="mouseDown('redSphere')">TT</div>
                    <div class="normal outlineOnly" @mousedown="mouseDown('outlineOnly')">TT</div>
                    <div class="normal redWall" @mousedown="mouseDown('redWall')">TT</div>
                    <div class="normal greenWall" @mousedown="mouseDown('greenWall')">TT</div>
                    <div class="normal blueWall" @mousedown="mouseDown('blueWall')">TT</div>
                    <div class="normal redCorridor" @mousedown="mouseDown('redCorridor')">TT</div>
                    <div class="normal redPolygon" @mousedown="mouseDown('redPolygon')">TT</div>
                    <div class="normal greenPolygon" @mousedown="mouseDown('greenPolygon')">TT</div>
                    <div class="normal orangePolygon" @mousedown="mouseDown('orangePolygon')">TT</div>
                    <div class="normal bluePolygon" @mousedown="mouseDown('bluePolygon')">TT</div>
                    <div class="normal redLine" @mousedown="mouseDown('redLine')">TT</div>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
export default {
    name: 'HelloWorldBottom',
    data() {
        return {
            activeName: 'first',
            addGeoFlag: false,
            currentGeoType: null,
            geoPositionCartesian2: null
        }
    },
    methods: {
        mouseDown(ev) {
            this.currentGeoType = ev
            this.addGeoFlag = true
        },
        mouseUp() {
            if (this.addGeoFlag) {
                switch (this.currentGeoType) {
                    case 'addIconBackground':
                        window.cApp.innerGeometry.addIconBackground(this.geoPositionCartesian2, '默认', 2)
                        break
                    case '点':
                        window.cApp.innerGeometry.addPoint(this.geoPositionCartesian2)
                        break
                    case '圆柱体':
                        window.cApp.innerGeometry.addGeometry(this.geoPositionCartesian2)
                        break
                    case 'bilbord':
                        let _z = this.geoPositionCartesian2.z
                        this.geoPositionCartesian2.z = _z + 10
                        window.cApp.innerGeometry.addIcon(this.geoPositionCartesian2, '默认')
                        break
                    case 'Box':
                        window.cApp.innerGeometry.addBox(this.geoPositionCartesian2)
                        break
                    case 'addEllipse':
                        window.cApp.innerGeometry.addEllipse(this.geoPositionCartesian2)
                        break
                    case 'addEllipseTuo':
                        window.cApp.innerGeometry.addEllipseTuo(this.geoPositionCartesian2)
                        break
                    case 'addEllipseTuoWW':
                        window.cApp.innerGeometry.addEllipseTuoWW(this.geoPositionCartesian2)
                        break
                    case 'redCorridor':
                        window.cApp.innerGeometry.redCorridor(this.geoPositionCartesian2)
                        break
                    case 'redPolygon':
                        window.cApp.innerGeometry.redPolygon(this.geoPositionCartesian2)
                        break
                    case 'greenPolygon':
                        window.cApp.innerGeometry.greenPolygon(this.geoPositionCartesian2)
                        break
                    case 'orangePolygon':
                        window.cApp.innerGeometry.orangePolygon(this.geoPositionCartesian2)
                        break
                    case 'bluePolygon':
                        window.cApp.innerGeometry.bluePolygon(this.geoPositionCartesian2)
                        break
                    case 'redLine':
                        window.cApp.innerGeometry.redLine(this.geoPositionCartesian2)
                        break
                    case 'glowingLine':
                        window.cApp.innerGeometry.glowingLine(this.geoPositionCartesian2)
                        break
                    case 'orangeOutlined':
                        window.cApp.innerGeometry.orangeOutlined(this.geoPositionCartesian2)
                        break
                    case 'yellowLine':
                        window.cApp.innerGeometry.yellowLine(this.geoPositionCartesian2)
                        break
                    case 'redRectangle':
                        window.cApp.innerGeometry.redRectangle(this.geoPositionCartesian2)
                        break
                    case 'greenRectangle':
                        window.cApp.innerGeometry.greenRectangle(this.geoPositionCartesian2)
                        break
                    case 'blueEllipsoid':
                        window.cApp.innerGeometry.blueEllipsoid(this.geoPositionCartesian2)
                        break
                    case 'redSphere':
                        window.cApp.innerGeometry.redSphere(this.geoPositionCartesian2)
                        break
                    case 'outlineOnly':
                        window.cApp.innerGeometry.outlineOnly(this.geoPositionCartesian2)
                        break
                    case 'redWall':
                        window.cApp.innerGeometry.redWall(this.geoPositionCartesian2)
                        break
                    case 'greenWall':
                        window.cApp.innerGeometry.greenWall(this.geoPositionCartesian2)
                        break
                    case 'blueWall':
                        window.cApp.innerGeometry.blueWall(this.geoPositionCartesian2)
                        break
                    case 'ParticalSys':
                        window.cApp.particleSystems.init(this.geoPositionCartesian2)
                        break
                    case 'addMaterial':
                        window.cApp.innerMaterial.addMaterial(this.geoPositionCartesian2)
                        break
                    case 'addColor':
                        window.cApp.innerMaterial.addColor(this.geoPositionCartesian2)
                        break
                    case 'addImgMaterial':
                        window.cApp.innerMaterial.addImgMaterial(this.geoPositionCartesian2)
                        break
                    case 'addCheckerboardMaterialProperty':
                        window.cApp.innerMaterial.addCheckerboardMaterialProperty(this.geoPositionCartesian2)
                        break
                    case 'addStripeMaterialProperty':
                        window.cApp.innerMaterial.addStripeMaterialProperty(this.geoPositionCartesian2)
                        break
                    case 'addGridMaterialProperty':
                        window.cApp.innerMaterial.addGridMaterialProperty(this.geoPositionCartesian2)
                        break
                }
            }
            this.addGeoFlag = false
        },
    },
    mounted() {
        const self = this;

        // 延时设置以确保cApp已被初始化
        setTimeout(() => {
            this.cApp = window.cApp;

            this.cApp.eventCenter.addEventListener('geoPosition', (data) => {
                self.geoPositionCartesian2 = data.message.position;
            });
        }, 1000);

        // 添加全局 mouseup 事件监听器
        window.addEventListener('mouseup', this.mouseUp);
    },
    beforeDestroy() {
        // 移除全局 mouseup 事件监听器
        window.removeEventListener('mouseup', this.mouseUp);
    }
}
</script>

<style lang="scss" scoped>
.all {
    width: 100%;
    height: 100%;
    background-color: rgba(43, 43, 43, .5);

    .env, .geo, .material {
        width: 100%;
        height: 30%;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        flex-wrap: wrap;
        overflow-x: auto;
    }

    .normal {
        width: 50px;
        height: 50px;
        margin: 5px;
        border: 1px solid yellow;
        cursor: pointer;
    }

    .addEllipseTuoWW {
        background-image: url("../../assets/geometryIcons/addEllipseTuoWW.png");
        background-size: 100% 100%;
    }

    .addEllipseTuo {
        background-image: url("../../assets/geometryIcons/addEllipseTuo.png");
        background-size: 100% 100%;
    }

    .addEllipse {
        background-image: url("../../assets/geometryIcons/addEllipse.png");
        background-size: 100% 100%;
    }

    .Box {
        background-image: url("../../assets/geometryIcons/Box.png");
        background-size: 100% 100%;
    }

    .addGridMaterialProperty {
        background-image: url("../../assets/geometryIcons/material/addGridMaterialProperty.png");
        background-size: 100% 100%;
    }

    .addStripeMaterialProperty {
        background-image: url("../../assets/geometryIcons/material/addStripeMaterialProperty.png");
        background-size: 100% 100%;
    }

    .addCheckerboardMaterialProperty {
        background-image: url("../../assets/geometryIcons/material/addCheckerboardMaterialProperty.png");
        background-size: 100% 100%;
    }

    .addImgMaterial {
        background-image: url("../../assets/geometryIcons/material/addImgMaterial.png");
        background-size: 100% 100%;
    }

    .addColor {
        background-image: url("../../assets/geometryIcons/material/addColor.png");
        background-size: 100% 100%;
    }

    .addMaterialLightLine {
        background-image: url("../../assets/geometryIcons/material/发光线条.png");
        background-size: 100% 100%;
    }

    .addMaterial {
        background-image: url("../../assets/geometryIcons/material.png");
        background-size: 100% 100%;
    }

    .glowingLine {
        background-image: url("../../assets/geometryIcons/glowingLine.png");
        background-size: 100% 100%;
    }

    .yellowLine {
        background-image: url("../../assets/geometryIcons/yellowLine.png");
        background-size: 100% 100%;
    }

    .redRectangle {
        background-image: url("../../assets/geometryIcons/redRectangle.png");
        background-size: 100% 100%;
    }

    .greenRectangle {
        background-image: url("../../assets/geometryIcons/greenRectangle.png");
        background-size: 100% 100%;
    }

    .blueEllipsoid {
        background-image: url("../../assets/geometryIcons/blueEllipsoid.png");
        background-size: 100% 100%;
    }

    .redSphere {
        background-image: url("../../assets/geometryIcons/redSphere.png");
        background-size: 100% 100%;
    }

    .outlineOnly {
        background-image: url("../../assets/geometryIcons/outlineOnly.png");
        background-size: 100% 100%;
    }

    .blueWall {
        background-image: url("../../assets/geometryIcons/blueWall.png");
        background-size: 100% 100%;
    }

    .greenWall {
        background-image: url("../../assets/geometryIcons/greenWall.png");
        background-size: 100% 100%;
    }

    .redWall {
        background-image: url("../../assets/geometryIcons/redWall.png");
        background-size: 100% 100%;
    }

    .p {
        background-image: url("../../assets/geometryIcons/p.png");
        background-size: 100% 100%;
    }

    .y {
        background-image: url("../../assets/geometryIcons/y.png");
        background-size: 100% 100%;
    }

    .b {
        background-image: url("../../assets/geometryIcons/b.png");
        background-size: 100% 100%;
    }

    .addIconBackground {
        background-image: url("../../assets/geometryIcons/addIconBackground.png");
        background-size: 100% 100%;
    }

    .ParticalSys {
        background-image: url("../../assets/geometryIcons/ParticalSys.png");
        background-size: 100% 100%;
    }

    .redCorridor {
        background-image: url("../../assets/geometryIcons/redCorridor.png");
        background-size: 100% 100%;
    }

    .redPolygon {
        background-image: url("../../assets/geometryIcons/redPolygon.png");
        background-size: 100% 100%;
    }

    .greenPolygon {
        background-image: url("../../assets/geometryIcons/greenPolygon.png");
        background-size: 100% 100%;
    }

    .orangePolygon {
        background-image: url("../../assets/geometryIcons/orangePolygon.png");
        background-size: 100% 100%;
    }

    .bluePolygon {
        background-image: url("../../assets/geometryIcons/bluePolygon.png");
        background-size: 100% 100%;
    }

    .redLine {
        background-image: url("../../assets/geometryIcons/redLine.png");
        background-size: 100% 100%;
    }
}
</style>
