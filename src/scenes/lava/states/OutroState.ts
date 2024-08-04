import { Container } from "pixi.js"
import { SceneState } from "./SceneState"
import { CharacterSequence } from "../components/alex/CharacterSequence"
import { SoundName } from "@/Sounds"
import gsap from "gsap"
import Events from "../Events"

export class OutroState extends SceneState {
	public canEnter() {
		return this.model.result !== null && !this.model.isOutroPlayed;
	}

	public onEnter() {
		const escapePivot: Container = this.getRef('PivotEscape')
		const bridge: Container = this.getRef('BridgeFg')

		const { result } = this.model

		if (!result) {
			this.model.isOutroPlayed = true
			return
		}

		gsap.timeline({ delay: 1.25 })
			.call(() => {
				bridge.visible = true
				this.eventBus.emit(Events.CHARACTER_SET_SEQUENCE, CharacterSequence.RUNNING)
			})
			.to(this.character, {
				x: escapePivot.x,
				y: escapePivot.y,
				duration: 1.5,
				ease: 'none',
			})
			.to(this.camera, {
				x: escapePivot.x,
				y: escapePivot.y,
				duration: 1.5,
			}, '<')
			.call(() => {
				this.audio.play(SoundName.ALEX_WOOHOO)
				this.eventBus.emit(Events.CHARACTER_SET_SEQUENCE, CharacterSequence.JUMPING)
				this.eventBus.once(Events.CHARACTER_SEQUENCE_END, this.onJumpFinished)
			})
	}

	private onJumpFinished = () => {
		this.eventBus.emit(Events.CHARACTER_SET_SEQUENCE, CharacterSequence.IDLE)
		this.model.isOutroPlayed = true
	}

}