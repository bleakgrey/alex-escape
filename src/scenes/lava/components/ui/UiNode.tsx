import { jsx, ContainerNode, findChildren } from '@/engine'
import { Container, Point, Ticker } from 'pixi.js'

export function UiNode() {
    const controlContainer = <ContainerNode></ContainerNode>

    const resize = () => {
        const { innerWidth, innerHeight } = window

        let { dimensions } = controlContainer as any
        if (!dimensions) {
            dimensions = new Point(innerWidth, innerHeight)
        }

        const controls: Container[] = []
        findChildren(controlContainer, controls)

        const ratio = getAspectRatio(dimensions.x, dimensions.y,  window.innerWidth,  window.innerHeight)
        controlContainer.scale.set(ratio, ratio)
        controlContainer.position.set(
            (window.innerWidth - dimensions.x * ratio) / 2,
            (window.innerHeight - dimensions.y * ratio) / 2,
        )

        for (const control of controls) {
            const { alignment, fill } = control as any

            if (alignment) {
                control.x = dimensions.x * alignment.x
                control.y = dimensions.y * alignment.y
            }

            if (fill) {
                control.width = dimensions.x * fill.x
                control.height = dimensions.y * fill.y
            }
        }
    }

    resize()
    Ticker.shared.add(resize)

    return controlContainer
}

function getAspectRatio(srcWidth: number, srcHeight: number, maxWidth: number, maxHeight: number) {
    return Math.min(maxWidth / srcWidth, maxHeight / srcHeight)
}