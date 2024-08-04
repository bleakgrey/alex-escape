import View from "./View"
import { inject, provide, Scene, ServiceNames } from '@/engine'
import { CameraState } from './components/camera/CameraState'
import { LavaSceneModel } from './LavaSceneModel'
import { StateMachine } from "./stateMachine"
import { IntroState } from "./states/IntroState"
import { GameplayState } from "./states/GameplayState"
import { ResultState } from "./states/ResultState"
import { Ticker } from "pixi.js"
import { OutroState } from "./states/OutroState"

export default class LavaScene extends Scene {

	public model: LavaSceneModel
	private stateMachine!: StateMachine
	private camera!: CameraState

	constructor() {
		super(View)
		this.model = provide<LavaSceneModel>(ServiceNames.SCENE_MODEL, new LavaSceneModel())
		this.model.on('**', this.onModelUpdated, this)
	}

	override onStart() {
		super.onStart()

		this.camera = inject(ServiceNames.CAMERA_STATE)
		this.camera.cameraBox = this.view.getChildByLabel('CameraBox', true)

		this.stateMachine = new StateMachine([
			new ResultState(this),
			new IntroState(this),
			new OutroState(this),
			new GameplayState(this),
		])
		
		Ticker.shared.addOnce(() => this.stateMachine.update())
	}

	private onModelUpdated() {
		this.stateMachine?.update()
	}

}