import Assets from '@/Assets'
import { jsx, SpriteNode } from '@/engine'
import { Draggable } from '../drag/Draggable'

export function Wood() {
    const root = <Draggable label={'Wood'}>
        <SpriteNode label={'Sprite'} texture={Assets.WOOD} anchor={{ x: 0.5, y: 0.5 }} />
    </Draggable>

    return root
}