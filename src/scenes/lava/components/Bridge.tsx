import Assets from '@/Assets'
import { AnimatedSpriteNode, ContainerNode, inject, jsx, ServiceNames } from '@/engine'
import { LavaSceneModel } from '../LavaSceneModel'
import { AnimatedSprite, Container } from 'pixi.js'
import { Droppable } from './drag/Droppable'

export function Bridge() {
    let animation: AnimatedSprite

    const root = <ContainerNode>
        <Droppable canAccept={(node: Container) => node.label === 'Wood'}>
            <AnimatedSpriteNode
                ref={(n: AnimatedSprite) => animation = n}
                texture={Assets.BRIDGE_ATLAS}
                atlas={Assets.BRIDGE_JSON}
                anchor={{ x: 0.5, y: 0.5 }}
            />
        </Droppable>
    </ContainerNode>

    const model: LavaSceneModel = inject(ServiceNames.SCENE_MODEL)
    model.on('collectedWood', (val) => {
        animation.gotoAndStop(val)
    })

    return root
}