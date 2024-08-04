import { Container } from "pixi.js"
import { SceneState } from "./SceneState"
import { Wood } from "../components/merge/Wood"
import { SoundName } from "@/Sounds"
import gsap from 'gsap'
import Assets from "@/Assets"
import Events from "../Events"
import { CharacterSequence } from "../components/alex/CharacterSequence"

export class GameplayState extends SceneState {
	private readonly GAMEPLAY_DURATION = 25

	private lavaTimeline!: GSAPAnimation
	private hudTimeline!: GSAPAnimation
	private bubbleIdleTimeline!: GSAPAnimation

	private mergeHint!: Container
	private bridge!: Container
	private bubble!: Container
	private bubbleBouncer!: Container

	private isPointerDown = false

	public canEnter() {
		return this.model.isIntroPlayed
	}

	public onEnter() {
		this.bridge = this.getRef('Bridge')
		this.bubble = this.getRef('Bubble')
		this.bubbleBouncer = this.getRef('BubbleBouncer')
		this.mergeHint = this.getRef('MergeHint')

		this.eventBus.on('pointerdown', this.onPointerDown)
		this.eventBus.on('pointerup', this.onPointerUp)
		this.eventBus.on(Events.DRAG_ACCEPT, this.onAcceptDrag)
		this.eventBus.on(Events.CHARACTER_SEQUENCE_END, this.onAlexSequenceEnd)
		this.eventBus.emit(Events.TOGGLE_DRAG_DROP, true)

		// Let the lava flow
		this.lavaTimeline = gsap.timeline()
			.set(this.model, { lavaProgress: 0 })
			.to(this.model, { lavaProgress: 1, duration: this.GAMEPLAY_DURATION })
			.call(() => {
				this.audio.play(SoundName.ALEX_AW)
				this.model.result = false
			})
		
		// Show bubble and merge hint
		this.hudTimeline = gsap.timeline()
			.to(this.bubble.scale, {
				x: 1,
				y: 1,
				ease: "elastic.out(1.15,0.75)",
				duration: 1.1,
				onStart: () => { this.audio.play(SoundName.BUBBLE) }
			})
			.to(this.mergeHint.scale, {
				x: 1,
				y: 1,
				ease: "elastic.out(1.15,0.75)",
				duration: 1.1,
			}, '<+=0.15')

		// Attract attention to the bubble
		this.bubbleIdleTimeline = gsap.timeline({ yoyo: true, repeatDelay: 0, repeat: -1})
			.to(this.bubbleBouncer.scale, { x: 1.025, y: 1.025, duration: 0.5 })

		// Show the first tutorial hint
		this.updateTutorialHint()
	}
	public onLeave() {
		this.lavaTimeline?.pause()
		this.hudTimeline?.reverse()
		this.bubbleIdleTimeline.kill()

		this.eventBus.emit(Events.SHOW_TUTORIAL_HINT, null, null)
		this.eventBus.emit(Events.TOGGLE_DRAG_DROP, false)

		this.eventBus.off('pointerdown', this.onPointerDown)
		this.eventBus.off('pointerup', this.onPointerUp)
		this.eventBus.off(Events.DRAG_ACCEPT, this.onAcceptDrag)
		this.eventBus.off(Events.CHARACTER_SEQUENCE_END, this.onAlexSequenceEnd)
	}

	private onAcceptDrag = (object: Container, droppable: Container) => {
		switch (object.label) {
			case 'Log':
				const wood = Wood()
				wood.position = droppable.parent.position
	
				object.parent.addChild(wood)
				droppable.parent.removeFromParent()

				this.audio.play(SoundName.MERGE)
				this.eventBus.emit(Events.SPAWN_ONESHOT_EFFECT,
					wood,
					Assets.EXPLOSION_ATLAS,
					Assets.EXPLOSION_JSON,
				)
				break;
			
			case 'Wood':
				this.audio.play(SoundName.BRIDGE_REPAIR)
				this.eventBus.emit(Events.SPAWN_ONESHOT_EFFECT,
					this.bridge,
					Assets.SWIRL_ATLAS,
					Assets.SWIRL_JSON,
					0.4,
				)
			
				this.model.collectedWood++

				if (this.model.collectedWood >= this.model.requiredWood) {
					this.model.result = true;
				} else {
					this.eventBus.emit(Events.CHARACTER_SET_SEQUENCE, CharacterSequence.SHOCKED)
				}
				break;
			
			default:
				break;
		}

		object.removeFromParent()

		this.updateTutorialHint()
	}

	private onPointerDown = () => {
		this.audio.play(SoundName.TAP)

		this.isPointerDown = true;
		this.updateTutorialHint()
	}

	private onPointerUp = () => {
		this.isPointerDown = false;
		this.updateTutorialHint()
	}

	private onAlexSequenceEnd = (seq: CharacterSequence) => {
		if (seq === CharacterSequence.SHOCKED) {
			this.eventBus.emit(Events.CHARACTER_SET_SEQUENCE, CharacterSequence.IDLE)
		}
	}

	private updateTutorialHint = () => {
		if (this.isPointerDown) {
			this.eventBus.emit(Events.SHOW_TUTORIAL_HINT, null, null)
			return
		}

		const wood = this.scene.getChildByLabel('Wood', true)

		if (wood) {
			this.eventBus.emit(Events.SHOW_TUTORIAL_HINT, wood, this.bridge)

			return
		}

		const logs = this.scene.getChildrenByLabel('Log', true)
		const logA = logs[0]
		const logB = logs.find((log) => log !== logA)

		if (logA && logB) {
			this.eventBus.emit(Events.SHOW_TUTORIAL_HINT, logA, logB)

			return
		}
	}
}