export enum ServiceNames {
    EVENT_BUS = 'eventBus',
    RENDER_EVENT_SYSTEM = 'renderEventSystem',
    AUDIO = 'audio',

    SCENE_MODEL = 'sceneModel',
    CAMERA_STATE = 'cameraState',
    VIEWPORT = 'viewport,'
}

const savedProvisions: { [id: string]: any } = {}

export function provide<T>(id: string, service: T): T {
    savedProvisions[id] = service
    // console.debug(id, '>>>', service)
    return service
}

export function inject<T>(id: string): T {
    return savedProvisions[id]
}