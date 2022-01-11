<template>
    <div class="all">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="ModelInner管理" name="first">
                <div class="geo">
                    <div class="normal b" @mousedown="mouseDown('bilbord')">
                        bilbord
                    </div>
                    <div class="normal b" @mousedown="mouseDown('addIconBackground')">
                        addIconBackground
                    </div>
                    <div class="normal b" @mousedown="mouseDown('ParticalSys')">
                        ParticalSys
                    </div>
                    <div class="normal p" @mousedown="mouseDown('点')">
                        点
                    </div>
                    <div class="normal Box" @mousedown="mouseDown('Box')">
                        Box
                    </div>
                    <div class="normal addEllipse" @mousedown="mouseDown('addEllipse')">
                        addEllipse
                    </div>
                    <div class="normal addEllipseTuo" @mousedown="mouseDown('addEllipseTuo')">
                        addEllipseTuo
                    </div>
                    <div class="normal addEllipseTuoWW" @mousedown="mouseDown('addEllipseTuoWW')">
                        addEllipseTuoWW
                    </div>
                    <div class="normal y" @mousedown="mouseDown('圆柱体')">
                        圆柱体
                    </div>
                    <div class="normal glowingLine" @mousedown="mouseDown('glowingLine')">
                        glowingLine
                    </div>
                    <div class="normal orangeOutlined" @mousedown="mouseDown('orangeOutlined')">
                        orangeOutlined
                    </div>
                    <div class="normal yellowLine" @mousedown="mouseDown('yellowLine')">
                        yellowLine
                    </div>
                    <div class="normal redRectangle" @mousedown="mouseDown('redRectangle')">
                        redRectangle
                    </div>
                    <div class="normal greenRectangle" @mousedown="mouseDown('greenRectangle')">
                        greenRectangle
                    </div>
                    <div class="normal blueEllipsoid" @mousedown="mouseDown('blueEllipsoid')">
                        blueEllipsoid
                    </div>
                    <div class="normal redSphere" @mousedown="mouseDown('redSphere')">
                        redSphere
                    </div>
                    <div class="normal outlineOnly" @mousedown="mouseDown('outlineOnly')">
                        outlineOnly
                    </div>
                    <div class="normal redWall" @mousedown="mouseDown('redWall')">
                        redWall
                    </div>
                    <div class="normal greenWall" @mousedown="mouseDown('greenWall')">
                        greenWall
                    </div>
                    <div class="normal blueWall" @mousedown="mouseDown('blueWall')">
                        blueWall
                    </div>
                    <div class="normal b" @mousedown="mouseDown('redCorridor')">
                        redCorridor
                    </div>
                    <div class="normal b" @mousedown="mouseDown('redPolygon')">
                        redPolygon
                    </div>
                    <div class="normal b" @mousedown="mouseDown('greenPolygon')">
                        greenPolygon
                    </div>
                    <div class="normal b" @mousedown="mouseDown('orangePolygon')">
                        orangePolygon
                    </div>
                    <div class="normal b" @mousedown="mouseDown('bluePolygon')">
                        bluePolygon
                    </div>
                    <div class="normal b" @mousedown="mouseDown('redLine')">
                        redLine
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="material管理" name="second">
                <div class="material">
                    <div class="normal addMaterialLightLine" @mousedown="mouseDown('addMaterial')">
                        0
                    </div>
                    <div class="normal addColor" @mousedown="mouseDown('addColor')">
                        0
                    </div>
                    <div class="normal addImgMaterial" @mousedown="mouseDown('addImgMaterial')">
                        0
                    </div>
                    <div class="normal addCheckerboardMaterialProperty"
                         @mousedown="mouseDown('addCheckerboardMaterialProperty')">
                        0
                    </div>
                    <div class="normal addStripeMaterialProperty" @mousedown="mouseDown('addStripeMaterialProperty')">
                        0
                    </div>
                    <div class="normal addGridMaterialProperty" @mousedown="mouseDown('addGridMaterialProperty')">
                        0
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="环境管理" name="third">
                <div class="env">
                    <div class="normal addMaterial" @mousedown="mouseDown('addDarckNessEff')">
                        Night
                    </div>
                    <div class="normal addMaterial" @mousedown="mouseDown('addRain')">
                        Rain
                    </div>
                    <div class="normal addMaterial" @mousedown="mouseDown('addSnow')">
                        Snow
                    </div>
                    <div class="normal addMaterial" @mousedown="mouseDown('addFrog')">
                        Frog
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="其他" name="four">
                <div class="env">
                    <span>moveTip</span>
                    <el-switch
                            @change="moveToolTipsChange"
                            v-model="moveToolFlag"
                            active-color="#13ce66"
                            inactive-color="#2B2B2B">
                    </el-switch>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    export default {
        name: 'HelloWorldBottom',
        props: ['cApp'],
        data () {
            return {
                activeName: 'first',
                addGeoFlag: false,
                currentGeoType: null,
                geoPositionCartesian2: null,
                moveToolFlag: false
            }
        },
        methods: {
            moveToolTipsChange () {
                this.cApp.startMoveTips()
            },
            handleClick (tab, event) {
                console.log(tab, event)
            },
            mouseDown (ev) {
                this.currentGeoType = ev
                this.addGeoFlag = true
            },
            mouseUp () {

                if (this.addGeoFlag) {
                    switch (this.currentGeoType) {
                        case 'addIconBackground':
                            this.cApp.innerGeometry.addIconBackground(this.geoPositionCartesian2, '默认', 2)
                            break
                        case '点':
                            this.cApp.innerGeometry.addPoint(this.geoPositionCartesian2)
                            break
                        case '圆柱体':
                            this.cApp.innerGeometry.addGeometry(this.geoPositionCartesian2)
                            break
                        case 'bilbord':
                            let _z = this.geoPositionCartesian2.z
                            this.geoPositionCartesian2.z = _z + 10
                            this.cApp.innerGeometry.addIcon(this.geoPositionCartesian2, '默认')
                            break
                        case 'Box':
                            this.cApp.innerGeometry.addBox(this.geoPositionCartesian2)
                            break
                        case 'addEllipse':
                            this.cApp.innerGeometry.addEllipse(this.geoPositionCartesian2)
                            break
                        case 'addEllipseTuo':
                            this.cApp.innerGeometry.addEllipseTuo(this.geoPositionCartesian2)
                            break
                        case 'addEllipseTuoWW':
                            this.cApp.innerGeometry.addEllipseTuoWW(this.geoPositionCartesian2)
                            break
                        case 'redCorridor':
                            this.cApp.innerGeometry.redCorridor(this.geoPositionCartesian2)
                            break
                        case 'redPolygon':
                            this.cApp.innerGeometry.redPolygon(this.geoPositionCartesian2)
                            break
                        case 'greenPolygon':
                            this.cApp.innerGeometry.greenPolygon(this.geoPositionCartesian2)
                            break
                        case 'orangePolygon':
                            this.cApp.innerGeometry.orangePolygon(this.geoPositionCartesian2)
                            break
                        case 'bluePolygon':
                            this.cApp.innerGeometry.bluePolygon(this.geoPositionCartesian2)
                            break
                        case 'redLine':
                            this.cApp.innerGeometry.redLine(this.geoPositionCartesian2)
                            break
                        case 'glowingLine':
                            this.cApp.innerGeometry.glowingLine(this.geoPositionCartesian2)
                            break
                        case 'orangeOutlined':
                            this.cApp.innerGeometry.orangeOutlined(this.geoPositionCartesian2)
                            break
                        case 'yellowLine':
                            this.cApp.innerGeometry.yellowLine(this.geoPositionCartesian2)
                            break
                        case 'redRectangle':
                            this.cApp.innerGeometry.redRectangle(this.geoPositionCartesian2)
                            break
                        case 'greenRectangle':
                            this.cApp.innerGeometry.greenRectangle(this.geoPositionCartesian2)
                            break
                        case 'blueEllipsoid':
                            this.cApp.innerGeometry.blueEllipsoid(this.geoPositionCartesian2)
                            break
                        case 'redSphere':
                            this.cApp.innerGeometry.redSphere(this.geoPositionCartesian2)
                            break
                        case 'outlineOnly':
                            this.cApp.innerGeometry.outlineOnly(this.geoPositionCartesian2)
                            break
                        case 'redWall':
                            this.cApp.innerGeometry.redWall(this.geoPositionCartesian2)
                            break
                        case 'greenWall':
                            this.cApp.innerGeometry.greenWall(this.geoPositionCartesian2)
                            break
                        case 'blueWall':
                            this.cApp.innerGeometry.blueWall(this.geoPositionCartesian2)
                            break
                        case 'addMaterial':
                            this.cApp.innerMaterial.addMaterial(this.geoPositionCartesian2)
                            break
                        case 'addDarckNessEff':
                            this.cApp.environment.addDarckNessEff(this.geoPositionCartesian2)
                            break
                        case 'addRain':
                            this.cApp.environment.addRain(this.geoPositionCartesian2)
                            break
                        case 'addSnow':
                            this.cApp.environment.addSnow(this.geoPositionCartesian2)
                            break
                        case 'addFrog':
                            this.cApp.environment.addFrog(this.geoPositionCartesian2)
                            break
                        case 'addColor':
                            this.cApp.innerMaterial.addColor(this.geoPositionCartesian2)
                            break
                        case 'addImgMaterial':
                            this.cApp.innerMaterial.addImgMaterial(this.geoPositionCartesian2)
                            break
                        case 'addCheckerboardMaterialProperty':
                            this.cApp.innerMaterial.addCheckerboardMaterialProperty(this.geoPositionCartesian2)
                            break
                        case 'addStripeMaterialProperty':
                            this.cApp.innerMaterial.addStripeMaterialProperty(this.geoPositionCartesian2)
                            break
                        case 'addGridMaterialProperty':
                            this.cApp.innerMaterial.addGridMaterialProperty(this.geoPositionCartesian2)
                            break
                        case 'ParticalSys':
                            this.cApp.particleSystems.init(this.geoPositionCartesian2)
                            break
                    }
                }
                this.addGeoFlag = false
            },
        },
        mounted () {
            const self = this
            this.cApp.eventCenter.addEventListener('geoPosition', function (data) {
                self.geoPositionCartesian2 = data.message.position
            })
        }
    }
</script>

<style scoped lang="scss">
    .all {
        width: 100%;
        height: 100%;

        background-color: rgba(43, 43, 43, .5);
        color: white;

        -moz-user-select: none;
        -khtml-user-select: none;
        user-select: none;

        .env {
            width: 100%;
            height: 30%;
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            flex-wrap: wrap;
            overflow-x: auto;
        }

        .geo {
            width: 100%;
            height: 30%;

            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            flex-wrap: wrap;
            overflow-x: auto;
        }

        .material {
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
            border: 1px solid white;
            margin: 5px;
        }

        .addEllipseTuoWW {
            background-image: url("../assets/geometryIcons/addEllipseTuoWW.png");
            background-size: 100% 100%;
        }

        .addEllipseTuo {
            background-image: url("../assets/geometryIcons/addEllipseTuo.png");
            background-size: 100% 100%;
        }

        .addEllipse {
            background-image: url("../assets/geometryIcons/addEllipse.png");
            background-size: 100% 100%;
        }

        .Box {
            background-image: url("../assets/geometryIcons/Box.png");
            background-size: 100% 100%;
        }

        .addGridMaterialProperty {
            background-image: url("../assets/geometryIcons/material/addGridMaterialProperty.png");
            background-size: 100% 100%;
        }

        .addStripeMaterialProperty {
            background-image: url("../assets/geometryIcons/material/addStripeMaterialProperty.png");
            background-size: 100% 100%;
        }

        .addCheckerboardMaterialProperty {
            background-image: url("../assets/geometryIcons/material/addCheckerboardMaterialProperty.png");
            background-size: 100% 100%;
        }

        .addImgMaterial {
            background-image: url("../assets/geometryIcons/material/addImgMaterial.png");
            background-size: 100% 100%;
        }

        .addColor {
            background-image: url("../assets/geometryIcons/material/addColor.png");
            background-size: 100% 100%;
        }

        .addMaterialLightLine {
            background-image: url("../assets/geometryIcons/material/发光线条.png");
            background-size: 100% 100%;
        }

        .addMaterial {
            background-image: url("../assets/geometryIcons/material.png");
            background-size: 100% 100%;
        }

        .glowingLine {
            background-image: url("../assets/geometryIcons/glowingLine.png");
            background-size: 100% 100%;
        }

        .yellowLine {
            background-image: url("../assets/geometryIcons/yellowLine.png");
            background-size: 100% 100%;
        }

        .redRectangle {
            background-image: url("../assets/geometryIcons/redRectangle.png");
            background-size: 100% 100%;
        }

        .greenRectangle {
            background-image: url("../assets/geometryIcons/greenRectangle.png");
            background-size: 100% 100%;
        }

        .blueEllipsoid {
            background-image: url("../assets/geometryIcons/blueEllipsoid.png");
            background-size: 100% 100%;
        }

        .redSphere {
            background-image: url("../assets/geometryIcons/redSphere.png");
            background-size: 100% 100%;
        }

        .outlineOnly {
            background-image: url("../assets/geometryIcons/outlineOnly.png");
            background-size: 100% 100%;
        }

        .blueWall {
            background-image: url("../assets/geometryIcons/blueWall.png");
            background-size: 100% 100%;
        }

        .greenWall {
            background-image: url("../assets/geometryIcons/greenWall.png");
            background-size: 100% 100%;
        }

        .redWall {
            background-image: url("../assets/geometryIcons/redWall.png");
            background-size: 100% 100%;
        }

        .p {
            background-image: url("../assets/geometryIcons/p.png");
            background-size: 100% 100%;
        }

        .y {
            background-image: url("../assets/geometryIcons/y.png");
            background-size: 100% 100%;
        }

        .b {
            background-image: url("../assets/geometryIcons/b.png");
            background-size: 100% 100%;
        }
    }

</style>
