<template>
    <div class="all">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="ModelInner管理" name="first">
                <div class="geo">
                    <div class="normal b" @mousedown="mouseDown('bilbord')">
                        bilbord
                    </div>
                    <div class="normal addIconBackground" @mousedown="mouseDown('addIconBackground')">
                        bilbordBG
                    </div>
                    <div class="normal ParticalSys" @mousedown="mouseDown('ParticalSys')">
                        TT
                    </div>
                    <div class="normal p" @mousedown="mouseDown('点')">
                        TT
                    </div>
                    <div class="normal Box" @mousedown="mouseDown('Box')">
                        TT
                    </div>
                    <div class="normal addEllipse" @mousedown="mouseDown('addEllipse')">
                        TT
                    </div>
                    <div class="normal addEllipseTuo" @mousedown="mouseDown('addEllipseTuo')">
                        TT
                    </div>
                    <div class="normal addEllipseTuoWW" @mousedown="mouseDown('addEllipseTuoWW')">
                        TT
                    </div>
                    <div class="normal y" @mousedown="mouseDown('圆柱体')">
                        TT
                    </div>
                    <div class="normal glowingLine" @mousedown="mouseDown('glowingLine')">
                        TT
                    </div>
                    <div class="normal orangeOutlined" @mousedown="mouseDown('orangeOutlined')">
                        TT
                    </div>
                    <div class="normal yellowLine" @mousedown="mouseDown('yellowLine')">
                        TT
                    </div>
                    <div class="normal redRectangle" @mousedown="mouseDown('redRectangle')">
                        TT
                    </div>
                    <div class="normal greenRectangle" @mousedown="mouseDown('greenRectangle')">
                        TT
                    </div>
                    <div class="normal blueEllipsoid" @mousedown="mouseDown('blueEllipsoid')">
                        TT
                    </div>
                    <div class="normal redSphere" @mousedown="mouseDown('redSphere')">
                        TT
                    </div>
                    <div class="normal outlineOnly" @mousedown="mouseDown('outlineOnly')">
                        TT
                    </div>
                    <div class="normal redWall" @mousedown="mouseDown('redWall')">
                        TT
                    </div>
                    <div class="normal greenWall" @mousedown="mouseDown('greenWall')">
                        TT
                    </div>
                    <div class="normal blueWall" @mousedown="mouseDown('blueWall')">
                        TT
                    </div>
                    <div class="normal redCorridor" @mousedown="mouseDown('redCorridor')">
                        TT
                    </div>
                    <div class="normal redPolygon" @mousedown="mouseDown('redPolygon')">
                        TT
                    </div>
                    <div class="normal greenPolygon" @mousedown="mouseDown('greenPolygon')">
                        TT
                    </div>
                    <div class="normal orangePolygon" @mousedown="mouseDown('orangePolygon')">
                        TT
                    </div>
                    <div class="normal bluePolygon" @mousedown="mouseDown('bluePolygon')">
                        TT
                    </div>
                    <div class="normal redLine" @mousedown="mouseDown('redLine')">
                        TT
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="material管理" name="second">
                <div class="material">
                    <div class="normal addMaterialLightLine" @mousedown="mouseDown('addMaterial')">
                        0
                    </div>
                    <div class="normal addGridMaterialProperty" @mousedown="mouseDown('addGridMaterialProperty')">
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
            <el-tab-pane label="预览模型" name="four">
                <div class="env">
                    <div class="btnss">
                        <a-upload class="b1" :file-list="fileList" :remove="handleRemove" :before-upload="beforeUpload">
                            <a-button>
                                <a-icon type="upload"/>
                            </a-button>
                        </a-upload>

                        <a-button
                            class="b2"
                            type="primary"
                            :disabled="fileList.length === 0"
                            :loading="uploading"
                            @click="handleUpload"
                        >
                            {{ uploading ? 'Uploading' : '发布' }}
                        </a-button>
                    </div>
                    <div class="normal addMaterial" v-for="item in D3FileList">
                        <div @mousedown="mouseDown(item)">
                            {{ item.name }}
                        </div>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="其他" name="five">
                <div class="env">
                    <div>
                        <span>moveTip</span>
                        <el-switch
                            @change="moveToolTipsChange"
                            v-model="moveToolFlag"
                            active-color="#13ce66"
                            inactive-color="#2B2B2B">
                        </el-switch>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="点状对象" name="pan6">
                <div class="env">
                    <div>
                        <span>KML点聚合</span>
                        <el-switch
                            @change="kmlChange"
                            v-model="kmlFlag"
                            active-color="#13ce66"
                            inactive-color="#2B2B2B">
                        </el-switch>
                    </div>
                    <div>
                        <span>通用点聚合</span>
                        <el-switch
                            @change="normalPointsClusterChange"
                            v-model="normalPointsClusterChangeFlag"
                            active-color="#13ce66"
                            inactive-color="#2B2B2B">
                        </el-switch>
                    </div>
                    <div>
                        <span>原生点</span>
                        <el-switch
                            @change="primitiveChange"
                            v-model="primitiveFlag"
                            active-color="#13ce66"
                            inactive-color="#2B2B2B">
                        </el-switch>
                    </div>
                </div>
            </el-tab-pane>

        </el-tabs>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'HelloWorldBottom',
    props: ['cApp'],
    data() {
        return {
            activeName: 'first',
            addGeoFlag: false,
            currentGeoType: null,
            geoPositionCartesian2: null,
            moveToolFlag: false,
            fileList: [],
            uploading: false,
            D3FileList: [],
            kmlFlag: false,
            normalPointsClusterChangeFlag: false,
            primitiveFlag: false

        }
    },
    methods: {
        kmlChange() {
            if (this.kmlFlag) {
                this.cApp.points.addKml()
            } else {
                this.cApp.points.removeKml()
            }
        },
        normalPointsClusterChange() {
            if (this.normalPointsClusterChangeFlag) {
                this.cApp.pointsCluster.addIcon1()
            } else {
                this.cApp.pointsCluster.removePoint()
            }
        },
        primitiveChange() {
            if (this.primitiveFlag) {
                this.cApp.primitivePoints.addManyPoint()
            } else {
                this.cApp.primitivePoints.removePoint()
            }
        },
        handleClick11() {
            let copyVal = document.getElementById("copyVal");
            copyVal.select();
            document.execCommand('copy')
        },
        get3DFilesAll() {
            return axios({
                method: 'post',
                url: 'http://localhost:1111' + '/get3DFilesAll',
                data: '',
                withCredentials: true
            })
        },
        saveVideo(formData) {
            return axios({
                method: 'post',
                url: 'http://localhost:1111' + '/saveVideo',
                data: formData,
                withCredentials: true
            })
        },
        // 上传服务器
        handleUpload() {
            const formData = new FormData()
            this.fileList.forEach(file => {
                formData.append('files[]', file)
            })

            formData.append('videoIntroduce', '默认')

            this.uploading = true

            this.saveVideo(formData).then(response => {
                this.$message.success(response.statusText)
                this.uploading = false
                this.fileList = []
                this.updata3DList()
            })
        },
        // 上传至页面
        beforeUpload(file) {
            this.fileList = [...this.fileList, file]
        },
        // 删除待上传文件
        handleRemove(file) {
            const index = this.fileList.indexOf(file)
            const newFileList = this.fileList.slice()
            newFileList.splice(index, 1)
            this.fileList = newFileList
        },
        moveToolTipsChange() {
            this.cApp.startMoveTips()
        },
        handleClick(tab, event) {
            console.log(tab, event)
        },
        mouseDown(ev) {
            this.currentGeoType = ev
            this.addGeoFlag = true
        },
        mouseUp() {

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
                    default:
                        let po = this.geoPositionCartesian2
                        let url = 'http://localhost:1111/3Dstatic' + this.currentGeoType.path
                        this.cApp.load3DModel.loadGlbByURL(po, url)
                }
            }
            this.addGeoFlag = false
        },
        async updata3DList() {
            let re = await this.get3DFilesAll()
            this.D3FileList = re.data
            this.$forceUpdate()
        }
    },
    async mounted() {
        const self = this
        this.cApp.eventCenter.addEventListener('geoPosition', function (data) {
            self.geoPositionCartesian2 = data.message.position
        })
        await this.updata3DList()


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

    .btnss {
        width: 100px;
        height: 50px;
        border: 4px solid gray;
    }

    .dddList {
        width: calc(100vw - 100px);
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        overflow-x: scroll;
        border: 4px solid yellow;
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

    .addIconBackground {
        background-image: url("../assets/geometryIcons/addIconBackground.png");
        background-size: 100% 100%;
    }

    .ParticalSys {
        background-image: url("../assets/geometryIcons/ParticalSys.png");
        background-size: 100% 100%;
    }

    .redCorridor {
        background-image: url("../assets/geometryIcons/redCorridor.png");
        background-size: 100% 100%;
    }

    .redPolygon {
        background-image: url("../assets/geometryIcons/redPolygon.png");
        background-size: 100% 100%;
    }

    .greenPolygon {
        background-image: url("../assets/geometryIcons/greenPolygon.png");
        background-size: 100% 100%;
    }

    .orangePolygon {
        background-image: url("../assets/geometryIcons/orangePolygon.png");
        background-size: 100% 100%;
    }

    .bluePolygon {
        background-image: url("../assets/geometryIcons/bluePolygon.png");
        background-size: 100% 100%;
    }

    .redLine {
        background-image: url("../assets/geometryIcons/redLine.png");
        background-size: 100% 100%;
    }


}

</style>
