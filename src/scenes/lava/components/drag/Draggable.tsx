import { ContainerNode, ServiceNames, checkAABB, inject, jsx, lerpColor } from '@/engine'
import { Container, EventEmitter, Point } from 'pixi.js'
import { CameraState } from '../camera/CameraState'
import { Viewport } from 'pixi-viewport'
import { LavaSceneModel } from '../../LavaSceneModel'
import Events from '../../Events'
import gsap from 'gsap'

let isDragEnabled = false

export function Draggable() {
    const root = <ContainerNode />

    let initialDragPoint: Point | undefined
    let initialPosition: Point | undefined
    let droppable: Container | undefined

    const eventBus: EventEmitter = inject(ServiceNames.EVENT_BUS)
    const model: LavaSceneModel = inject(ServiceNames.SCENE_MODEL)

    const onDragStart = (e: any) => {
        initialDragPoint = new Point().copyFrom(e.data.global)
        initialPosition = new Point().copyFrom(root.position)

        eventBus.emit(Events.DRAG_START, root)
    }

    const findDroppable = () => {
        droppable = model.droppables.find((droppable: Container | any) => {
            if (droppable.parent === root) {
                return false
            }

            return checkAABB(root, droppable) && droppable.canAccept(root)
        })
    }

    const onDragMove = (e: any) => {
        const viewport: Viewport = inject(ServiceNames.VIEWPORT)
        const camState: CameraState = inject(ServiceNames.CAMERA_STATE)
        const camBox = camState?.cameraBox!
        const worldPos = viewport.toWorld(e.data.global.x, e.data.global.y)

        root.position.set(
            worldPos.x + camBox.position.x - camBox.width/2,
            worldPos.y + camBox.position.y - camBox.height/2,
        )

        findDroppable()
    }

    const onDragEnd = () => {
        eventBus.off('pointermove', onDragMove)
        eventBus.off('pointerup', onDragEnd)
        eventBus.emit(Events.DRAG_END, root)

        if (droppable && isDragEnabled) {
            eventBus.emit(Events.DRAG_ACCEPT, root, droppable)
        }

        if (initialPosition) {
            const lerper = { alpha: 1 }

            gsap.timeline({
                onUpdate: () => {
                    root.tint = lerpColor(`#ffffff`, `#ff0000`, lerper.alpha)
                }
            })
                .to(lerper, { alpha: 0, duration: 0.3 }, '<')
                .to(root, { x: initialPosition.x, y: initialPosition.y, duration: 0.1 }, '<')
        }

        droppable = undefined
        initialPosition = undefined
    }

    const onUpdateInteractivity = () => {
        root.interactive = isDragEnabled
        root.cursor = isDragEnabled ? 'pointer' : undefined
    }
    onUpdateInteractivity()

    eventBus.on('pointerdown', (e) => {
        if (!isDragEnabled) {
            return
        }

        const contains = root.getBounds().containsPoint(e.data.global.x, e.data.global.y)
        
        if (contains) {
            onDragStart(e)
            
            eventBus.on('pointermove', onDragMove, root)
            eventBus.once('pointerup', onDragEnd, root)
        }
    })
    eventBus.on(Events.TOGGLE_DRAG_DROP, (isEnabled) => {
        if (!isEnabled) {
            onDragEnd()
        }

        isDragEnabled = isEnabled
        onUpdateInteractivity()
    })

    return root
}