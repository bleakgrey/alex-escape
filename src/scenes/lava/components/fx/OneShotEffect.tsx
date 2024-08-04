import { AnimatedSpriteNode, jsx } from '@/engine'
import { AnimatedSprite } from 'pixi.js'

export function OneShotEffect(props: any) {
    const root: AnimatedSprite | any = <AnimatedSpriteNode
        texture={props.texture}
        atlas={props.atlas}
        anchor={{ x: 0.5, y: 0.5 }}
        autoplay={true}
        loop={false}
    />

    root.onComplete = () => {
        root.removeFromParent()
    }

    return root
}