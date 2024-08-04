const savedProvisions: { [id: string]: any } = {}

export function provide<T>(id: string, service: T): T {
    savedProvisions[id] = service

    console.debug(id, '>>>', service)
    
    return service
}

export function inject<T>(id: string): T {
    return savedProvisions[id]
}