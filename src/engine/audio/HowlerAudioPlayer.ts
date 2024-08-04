import { Sounds } from "@/Sounds"
import { IAudioService } from "./IAudioService"
import { Howl, Howler } from 'howler'

export class SimpleAudioPlayer implements IAudioService {
	private players = new Map<String, Howl>()
	private persistentSounds = new Set<String>()

	constructor() {
		this.init()
	}

	public play(name: any) {
		const player = this.players.get(String(name))

		if (Howler.ctx.state === 'running' || this.persistentSounds.has(String(name))) {
			player?.play()
		}
	}

	public stop(name: any) {
		const player = this.players.get(String(name))
		player?.stop()
	}

	private init() {
		for (const [key, value] of Object.entries(Sounds)) {
			const player = new Howl({
				autoplay: false,
				preload: true,
				...value,
			})

			if (value.persist) {
				this.persistentSounds.add(String(key))
			}

			this.players.set(String(key), player)
		}
	}
}