import Assets from '@/Assets'
import { jsx, ContainerNode, SpriteNode, inject, ServiceNames, distance } from '@/engine'
import { Container, EventEmitter, Sprite } from 'pixi.js'
import Events from '../../Events'
import gsap from 'gsap'

const HINT_DELAY = 3
const HAND_VELOCITY = 300

export function Hand() {
    let hand: Sprite
    let objectGhost: Sprite
    let timeline: GSAPAnimation

    let target: Container
    let destination: Container

    const eventBus: EventEmitter = inject(ServiceNames.EVENT_BUS)

    const view = <ContainerNode>
        <SpriteNode ref={n => objectGhost = n} />
        <ContainerNode ref={n => hand = n}
            alpha={0}
        >
            <SpriteNode
                texture={Assets.HAND}
                scale={{ x: 0.5, y: 0.5 }}
                anchor={{ x: 0.8, y: 0 }}
            />
        </ContainerNode>
    </ContainerNode>

    const createTimeline = () => {
        const targetPos = target.position
        const destinationPos = destination.position
        const sprite = target.getChildByLabel('Sprite', true) as Sprite

        const dist = distance(targetPos, destinationPos)

        killTimeline()
        timeline = gsap.timeline({ repeat: -1, repeatDelay: HINT_DELAY, delay: HINT_DELAY })
            .set(objectGhost, {
                texture: sprite.texture,
                scale: sprite.scale,
                anchor: sprite.anchor,
                alpha: 0.5,
            })
            .set(hand, { alpha: 0 })
            .set(hand.scale, { x: 1, y: 1 })
            .set(view, { x: targetPos.x, y: targetPos.y, visible: true })

            .to(hand, { alpha: 1 })
            .to(hand.scale, {
                x: 0.9,
                y: 0.85,
                duration: 0.25,
            })

            .to(view, {
                x: destinationPos.x,
                y: destinationPos.y,
                duration: dist / HAND_VELOCITY,
                ease: "power1.inOut",
            })

            .to(hand.scale, {
                x: 1,
                y: 1,
                duration: 0.25,
            })
            .to([hand, objectGhost], { alpha: 0 })
    }

    const killTimeline = () => {
        view.visible = false
        timeline?.pause()
        timeline?.kill()
    }

    eventBus.on(Events.SHOW_TUTORIAL_HINT, (newTarget, newDestination) => {
        target = newTarget
        destination = newDestination
        killTimeline()

        setTimeout(() => {
            if (target && destination) {
                createTimeline()
            }
        }, 0)
    })

    return view
}