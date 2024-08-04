import { SoundName } from "@/Sounds"
import { SceneState } from "./SceneState"
import { CharacterSequence } from "../components/alex/CharacterSequence"
import { Container } from "pixi.js"
import gsap from "gsap"
import Events from "../Events"

export class IntroState extends SceneState {
	public canEnter() {
		return !this.model.isIntroPlayed
	}

	public onEnter() {
		const entryPivot = this.getRef<Container>('PivotEntry')
		const bridgePivot = this.getRef<Container>('PivotBridge')
		const presentsPivot = this.getRef<Container>('PivotPresents')
		const volcanoPivot = this.getRef<Container>('PivotVolcano')
		const gameplayPivot = this.getRef<Container>('PivotGameplay')
		const volcano = this.getRef<Container>('Volcano')
		const lava = this.getRef<Container>('Lava')

		gsap.timeline()
			// Move Alex and camera to intial positions
			.set([this.character, this.camera], {
				x: entryPivot.x,
				y: entryPivot.y,
			})
			.call(() => {
				this.eventBus.emit(Events.CHARACTER_SET_SEQUENCE, CharacterSequence.RUNNING)
			})

			// Alex walks up to the broken bridge
			.to([this.character], {
				x: bridgePivot.x,
				y: bridgePivot.y,
				duration: 1.5,
				ease: 'none',
				onStart: () => {
					this.audio.play(SoundName.BGM)
					this.audio.play(SoundName.FOOTSTEPS)
				},
				onComplete: () => {
					this.audio.stop(SoundName.FOOTSTEPS)
					this.audio.play(SoundName.ALEX_HMM)
					this.eventBus.emit(Events.CHARACTER_SET_SEQUENCE, CharacterSequence.IDLE)
				}
			}, '>')
			.to([this.camera], {
				x: bridgePivot.x,
				y: bridgePivot.y,
				duration: 2,
			}, '<')

			// Show presents
			.to([this.camera], {
				delay: 0.15,
				x: presentsPivot.x,
				y: presentsPivot.y,
				duration: 0.7,
				onStart: () => {
					this.audio.play(SoundName.VOLCANO)
				},
			}, '>')

			// Shake camera
			.set(this.cameraState, { shakeAmount: 1, delay: 0.1 })
			.to(this.cameraState, { shakeAmount: 0, duration: 3 })

			// Show erupting volcano
			.to([lava], {
				delay: 0.25,
				duration: 0.25,
				alpha: 1,
			}, '<')
			.to([this.camera], {
				delay: 0.5,
				x: volcanoPivot.x,
				y: volcanoPivot.y,
				duration: 0.35,
				onStart: () => {
					this.audio.play(SoundName.ALEX_GASP)
					gsap.timeline()
						.set(volcano.skew, { x: -0.0025 }, '<')
						.to(volcano.skew, { x: 0.0025, duration: 0.15, yoyo: true, repeat: -1, repeatDelay: 0 }, '<')
				},
			}, '<')

			// Move camera to bridge
			.to([this.camera], {
				delay: 1,
				x: gameplayPivot.x,
				y: gameplayPivot.y,
				duration: 0.5,
			}, '>')

			.call(() => {
				gsap.timeline({ delay: 0.5 }).call(() => { this.audio.play(SoundName.ALEX_WHAT) })
				this.model.isIntroPlayed = true
			})
	}
}