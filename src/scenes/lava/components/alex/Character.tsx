import Assets from '@/Assets'
import Events from '../../Events'
import { AnimatedSpriteNode, ContainerNode, ServiceNames, inject, jsx } from '@/engine'
import { Pivot } from '../Pivot'
import { AnimatedSprite, EventEmitter, Point } from 'pixi.js'
import { CharacterSequence } from './CharacterSequence'

const States = {
    [CharacterSequence.IDLE]: {
        texture: Assets.ALEX_THINKING,
        atlas: Assets.ALEX_THINKING_ATLAS,
        position: new Point(-10, -100),
    },
    [CharacterSequence.RUNNING]: {
        texture: Assets.ALEX_RUNNING,
        atlas: Assets.ALEX_RUNNING_ATLAS,
        position: new Point(10, -70),
    },
    [CharacterSequence.JUMPING]: {
        texture: Assets.ALEX_JUMPING,
        atlas: Assets.ALEX_JUMPING_ATLAS,
        position: new Point(-10, -70),
    },
    [CharacterSequence.SHOCKED]: {
        texture: Assets.ALEX_SHOCKED,
        atlas: Assets.ALEX_SHOCKED_ATLAS,
        position: new Point(-10, -95),
    },
}

export function Character() {
    const eventBus: EventEmitter = inject(ServiceNames.EVENT_BUS)
    const sequenceNodes = new Map<CharacterSequence, AnimatedSprite>()

    const root = <ContainerNode />

    for (const sequenceName of Object.values(CharacterSequence)) {
        const state = States[sequenceName]
        
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