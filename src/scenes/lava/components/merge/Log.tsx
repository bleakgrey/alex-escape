import Assets from '@/Assets'
import { jsx, SpriteNode } from '@/engine'
import { Draggable } from '../drag/Draggable'
import { Droppable } from '../drag/Droppable'
import { Container } from 'pixi.js'

export function Log() {
    const root = <Draggable label={'Log'}>
        <Droppable canAccept={(node: Container) => node.label === 'Log'}>
            <SpriteNode label={'Sprite'} texture={Assets.LOG} anchor={{ x: 0.5, y: 0.5 }} />
        </Droppable>
    </Draggable>

    return root
}