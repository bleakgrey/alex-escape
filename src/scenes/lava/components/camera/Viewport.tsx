import { Viewport as PixiViewport } from 'pixi-viewport'
import { NodeConstructor, ServiceNames, inject, provide } from '@/engine'
import { Container, Ticker } from 'pixi.js'
import { CameraState } from './CameraState'

export const Viewport: NodeConstructor = () => {
    const view = new PixiViewport({
        screenWidth: window.innerWidth,
        screenHeight: window.innerHeight,
        events: inject(ServiceNames.RENDER_EVENT_SYSTEM),
        stopPropagation: false,
    })

    provide(ServiceNames.VIEWPORT, view)
    const state = provide(ServiceNames.CAMERA_STATE, new CameraState())

    const update = () => {
        view.screenWidth = window.innerWidth
        view.screenHeight = window.innerHeight

        const { cameraBox, shakeAmount, shakeMagnitude } = state

        if (cameraBox) {
            view.worldWidth = cameraBox.width;
            view.worldHeight = cameraBox.height;
    
            // Update world offset
            const world: Container = view.getChildByLabel('World', true)!
            world.x = -(cameraBox.x - cameraBox.width/2)
            world.y = -(cameraBox.y - cameraBox.height/2)
    
            if (shakeAmount > 0) {
                world.x += Math.random() * shakeMagnitude.x * shakeAmount
                world.y += Math.random() * shakeMagnitude.y * shakeAmount
            }

            view.fit()
            view.moveCenter(
                cameraBox.width/2,
                cameraBox.height/2,
            )
        }
    }

    update()
    Ticker.shared.add(update)

    return view
}