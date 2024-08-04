import LavaScene from "@/scenes/lava/LavaScene"
import { Game, ServiceNames, provide } from "@/engine"
import { SimpleAudioPlayer } from "./engine/audio/HowlerAudioPlayer";

const instance = new Game({
	resizeTo: window,
	antialias: true,
	autoDensity: true,
	backgroundColor: 0x176f9d,
	startScene: new LavaScene(),
});

provide(ServiceNames.EVENT_BUS, instance.stage)
provide(ServiceNames.AUDIO, new SimpleAudioPlayer())