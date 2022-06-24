import * as Cesium from 'cesium/Cesium'
import * as widget from 'cesium/Widgets/widgets.css'
import {ImageryProviderWebExtendTool} from "./1-2ImageryProvider-WebExtend"

export default class ObliquePhotography {
    constructor(app) {
        this.app = app
    }

    addOblique() {
        const tileset = this.app.viewer.scene.primitives.add(
            new Cesium.Cesium3DTileset({
                url: Cesium.IonResource.fromAssetId(354307),
            })
        );

        this.app.viewer.zoomTo(tileset);

    }

}
