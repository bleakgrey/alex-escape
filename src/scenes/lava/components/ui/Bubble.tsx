import Assets from '@/Assets'
import { ContainerNode, inject, jsx, LabelNode, ServiceNames, SpriteNode } from '@/engine'
import { Pivot } from '../Pivot'
import { Droppable } from '../drag/Droppable'
import { BitmapText, Container } from 'pixi.js'
import { LavaSceneModel } from '../../LavaSceneModel'

export function Bubble() {
    let collectedLabel: BitmapText
    let requiredLabel: BitmapText

    const root = <Droppable
        canAccept={(node: Container) => node.label === 'Wood'}
    >
        <ContainerNode>
            <SpriteNode
                texture={Assets.BUBBLE}
                anchor={{ x: 0.5, y: 1.25 }}
                scale={{ x: 0.55, y: 0.55 }}
            >
                <SpriteNode
                    texture={Assets.WOOD}
                    anchor={{ x: 0.5, y: 0.5 }}
                    position={{x: 0, y: -215}}
                />
                <LabelNode ref={(n: BitmapText) => collectedLabel = n}
                    style={{ fontSize: 56, fill: 0xff0000 }}
                    anchor={{x: 1, y: 0.5}}
                    position={{x: -12, y: -150}}
                />
                <LabelNode ref={(n: BitmapText) => requiredLabel = n}
                    style={{ fontSize: 56, fill: 0x000000 }}
                    anchor={{x: 0, y: 0.5}}
                    position={{x: -12, y: -150}}
                />
                <Pivot />
            </SpriteNode>
        </ContainerNode>
    </Droppable>

    const model: LavaSceneModel = inject(ServiceNames.SCENE_MODEL)
    const updateText = () => {
        collectedLabel.text = `${model.collectedWood}`
        requiredLabel.text = `/${model.requiredWood}`
    }

    model.on('collectedWood', updateText)
    model.on('requiredWood', updateText)
    updateText()

    return root
}