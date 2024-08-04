import Colors from '@/Colors'
import { jsx, SpriteNode } from '@/engine'
import { Texture } from 'pixi.js'

export function Pivot() {
    return <SpriteNode
        visible={false}
        texture={Texture.WHITE}
        width={16}
        height={16}
        tint={Colors.RED}
        anchor={{ x: 0.5, y: 0.5 }}
    />
}