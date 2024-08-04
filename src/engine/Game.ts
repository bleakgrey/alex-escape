import * as PIXI from 'pixi.js'
import Assets from '@/Assets'
import { Scene } from './Scene'
import { SceneManager } from './SceneManager'
import { StyleManager } from './StyleManager'
import { ServiceNames, provide } from './Injection'

interface IGameOptions {
    startScene?: Scene,
}

export type GameConfig = Partial<PIXI.ApplicationOptions> & IGameOptions

export class Game extends PIXI.Application {

    public config: GameConfig
    public sceneManager!: SceneManager
    public styleManager!: StyleManager

    constructor(config: GameConfig) {
        super()
        this.config = config

        this.launch()
    }

    private async launch() {
        await this.loadAssets()
        await this.init(this.config)

        provide(ServiceNames.RENDER_EVENT_SYSTEM, this.renderer.events)

        this.stage.interactive = true
        this.stage.interactiveChildren = true
        this.stage.hitArea = this.screen

        this.sceneManager = this.stage.addChild(new SceneManager(this.config))

        const container = document.getElementById('app')!
        container.appendChild(this.canvas)
    }

    private async loadAssets() {
        return new Promise(async (resolve) => {
            for (const [key, url] of Object.entries(Assets)) {

                if (typeof url === 'object')
                    continue

                if (typeof url === 'string' && url.includes('<svg'))
                    continue

                await PIXI.Assets.load({
                    alias: key,
                    src: url as String,
                });
            }

            resolve(true)
        })
    }

}