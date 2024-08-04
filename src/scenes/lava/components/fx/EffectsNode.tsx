import { ContainerNode, ServiceNames, inject, jsx } from '@/engine'
import { Container, EventEmitter } from 'pixi.js'
import { OneShotEffect } from './OneShotEffect'
import Events from '../../Events'

export function EffectsNode() {
    const root = <ContainerNode zIndex={Infinity}></ContainerNode>

    const eventBus: EventEmitter = inject(ServiceNames.EVENT_BUS)
    eventBus.on(Events.SPAWN_ONESHOT_EFFECT, (source: Container, texture, atlas, scale = 1) => {
        source.parent.addChild(
            <OneShotEffect
                texture={texture}
                atlas={atlas}
                scale={{ x: scale, y: scale }}
                position={source.position}
            />
        )
    })

    return root
}