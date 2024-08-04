import Events from '../../Events'
import { AnimatedSpriteNode, ContainerNode, ServiceNames, inject, jsx } from '@/engine'
import { Pivot } from '../Pivot'
import { AnimatedSprite, EventEmitter, Point } from 'pixi.js'
import { CharacterSequence } from './CharacterSequence'

export function Character(props: any & {
    sequences: Map<string, {
        texture: any,
        atlas: any,
        position: Point,
    }>
}) {
    const eventBus: EventEmitter = inject(ServiceNames.EVENT_BUS)
    const sequenceNodes = new Map<any, AnimatedSprite>()
    const root = <ContainerNode />

    for (const [sequenceName, state] of Object.entries(props.sequences)) {
        const sprite = <AnimatedSpriteNode
            texture={state.texture}
            atlas={state.atlas}
            loop={true}
            anchor={{x: 0.5, y: 0.5}}
            scale={{x: 0.6, y: 0.6}}
            position={state.position}
            animationSpeed={0.7}
        /> as AnimatedSprite

        sprite.onLoop = () => {
            eventBus.emit(Events.CHARACTER_SEQUENCE_END, sequenceName)
        }

        sequenceNodes.set(sequenceName, sprite)
        root.addChild(sprite)
    }

    const onSequenceUpdated = (newSequence?: CharacterSequence) => {
        sequenceNodes.forEach((sprite, sequence) => {
            sprite.visible = sequence === newSequence
            
            if (sprite.visible) {
                sprite.gotoAndPlay(0)
            } else {
                sprite.stop()
            }
        })
    }

    eventBus.on(Events.CHARACTER_SET_SEQUENCE, onSequenceUpdated)

    root.addChild(<Pivot></Pivot>)
    return root
}