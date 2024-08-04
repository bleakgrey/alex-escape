import { EventEmitter, Sprite } from "pixi.js"
import { State } from "../stateMachine"
import { LavaSceneModel } from "../LavaSceneModel"
import { ServiceNames, inject } from "@/engine"
import { CameraState } from "../components/camera/CameraState"
import { IAudioService } from "@/engine/audio/IAudioService"
import LavaScene from "../LavaScene"

export class SceneState implements State {

	protected eventBus: EventEmitter
	protected audio: IAudioService

	protected scene: LavaScene
	protected model: LavaSceneModel
	protected cameraState: CameraState

	protected camera: Sprite
	protected character: Sprite

	constructor(scene: LavaScene) {
		this.scene = scene
		this.model = scene.model
		this.eventBus = inject(ServiceNames.EVENT_BUS)
		this.cameraState = inject(ServiceNames.CAMERA_STATE)
		this.audio = inject(ServiceNames.AUDIO)

		this.camera = scene.getRef('CameraBox')
		this.character = scene.getRef('Character')
	}

	canEnter() {
		return false
	}

	onEnter() {}
	onLeave() {}

	getRef<T>(label: string | RegExp): T {
		const node = this.scene.getChildByLabel(label, true)

		if (!node) {
			throw new Error(`Can't find node "${label}" in scene ${this.scene.constructor.name}`)
		}

		return node as T
	}

}