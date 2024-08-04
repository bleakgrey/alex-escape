import { DrawableNode, NodeConstructor, ServiceNames, getTexture, inject, jsx } from "@/engine"
import { FillPattern, Graphics, Matrix, Ticker } from "pixi.js"
import { LavaSceneModel } from "../LavaSceneModel"
import { GlowFilter } from 'pixi-filters'
import Assets from "@/Assets"
import Colors from "@/Colors"

export const FlowingLava: NodeConstructor = () => {
    const root = <DrawableNode
        filters={[
            new GlowFilter({
                color: Colors.RED,
                outerStrength: 1,
                innerStrength: 4,
                distance: 40,
                quality: 0.1,
            })
        ]}
    /> as Graphics

    const texture = getTexture(Assets.LAVA)
    const matrix = new Matrix(5, 2, 0, 5, 0, 0)
    const pattern = new FillPattern(texture, 'repeat')

    const model: LavaSceneModel = inject(ServiceNames.SCENE_MODEL)

    const ticker = new Ticker()
    ticker.autoStart = true
    ticker.maxFPS = 16
    ticker.add(() => {
        root.clear()
        root.svg(Assets.LAVA_SHAPE)

        matrix.translate(0.1, 0.2)
        pattern.setTransform(matrix)

        root.circle(400, 900, 200 + (200 * model.lavaProgress))

        root.fill(pattern)
    })

    return root
}