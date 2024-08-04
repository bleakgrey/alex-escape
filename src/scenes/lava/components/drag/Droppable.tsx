import { ContainerNode, ServiceNames, inject, jsx } from '@/engine'
import { LavaSceneModel } from '../../LavaSceneModel';

export function Droppable(props: any) {
    const root = <ContainerNode></ContainerNode>

    const model: LavaSceneModel = inject(ServiceNames.SCENE_MODEL)
    model.droppables.push(root)

    return root
}