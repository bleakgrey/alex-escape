import LOOP_BGM from '@/assets/sounds/bgm.mp3?url'
import LOOP_VOLCANO from '@/assets/sounds/volcano.mp3?url'

import ALEX_WOOHOO from '@/assets/sounds/alex_woohoo.mp3?url'
import ALEX_HMM from '@/assets/sounds/alex_hmm.mp3?url'
import ALEX_WHAT from '@/assets/sounds/alex_what.mp3?url'
import ALEX_GASP from '@/assets/sounds/alex_gasp.mp3?url'
import ALEX_AW from '@/assets/sounds/alex_aw.mp3?url'
import FOOTSTEPS from '@/assets/sounds/steps.mp3?url'
import BRIDGE from '@/assets/sounds/bridge.mp3?url'
import MERGE from '@/assets/sounds/merge.mp3?url'
import TAP from '@/assets/sounds/tap.mp3?url'
import BUBBLE from '@/assets/sounds/bubble.mp3?url'

export enum SoundName {
	BGM,
	VOLCANO,

	ALEX_WHAT,
	ALEX_WOOHOO,
	ALEX_HMM,
	ALEX_GASP,
	ALEX_AW,
	FOOTSTEPS,

	MERGE,
	BRIDGE_REPAIR,
	BUBBLE,
	TAP,
}

export const Sounds = {
	[SoundName.BGM]: {
		src: [LOOP_BGM],
		volume: 0.1,
		loop: true,
		persist: true,
	},
	[SoundName.VOLCANO]: {
		src: [LOOP_VOLCANO],
		volume: 0.17,
	},
	[SoundName.ALEX_WHAT]: {
		src: [ALEX_WHAT],
		volume: 0.5,
	},
	[SoundName.ALEX_HMM]: {
		src: [ALEX_HMM],
		volume: 0.5,
	},
	[SoundName.ALEX_WOOHOO]: {
		src: [ALEX_WOOHOO],
		volume: 0.5,
	},
	[SoundName.ALEX_GASP]: {
		src: [ALEX_GASP],
		volume: 0.5,
	},
	[SoundName.ALEX_AW]: {
		src: [ALEX_AW],
		volume: 0.5,
	},
	[SoundName.FOOTSTEPS]: {
		src: [FOOTSTEPS],
		volume: 0.4,
		loop: true,
	},

	[SoundName.MERGE]: {
		src: [MERGE],
		volume: 0.25,
	},
	[SoundName.BRIDGE_REPAIR]: {
		src: [BRIDGE],
		volume: 0.2,
	},
	[SoundName.TAP]: {
		src: [TAP],
		volume: 0.2,
	},
	[SoundName.BUBBLE]: {
		src: [BUBBLE],
		volume: 0.2,
	},
}