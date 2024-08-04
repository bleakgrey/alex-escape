import View from "./View"
import { inject, provide, Scene, ServiceNames } from '@/engine'
import { CameraState } from './components/camera/CameraState'
import { LavaSceneModel } from './LavaSceneModel'

export default class LavaScene extends Scene {

    public model: LavaSceneModel
    private camera!: CameraState

    constructor() {
        super(View)
        this.model = provide<LavaSceneModel>(ServiceNames.SCENE_MODEL, new LavaSceneModel())
    }

    override onStart() {
        super.onStart()

        this.camera = inject(ServiceNames.CAMERA_STATE)
        this.camera.cameraBox = this.view.getChildByLabel('CameraBox', true)
    }

}