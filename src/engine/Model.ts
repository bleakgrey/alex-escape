import EventEmitter from "eventemitter3"

export class Model extends EventEmitter {

    private watch<T extends EventEmitter>(
        obj: T,
    ): T {
        const proxy = new Proxy(obj as object, {
            set(target: EventEmitter, prop, newValue, receiver) {
                const result = Reflect.set(...arguments)

                target.emit(`${String(prop)}`, newValue)
                target.emit('**', prop)
                // console.log('---upd', prop, newValue)

                return result
            },
        })

        // Trigger to immediately sync the state
        for (const [key, value] of Object.entries(obj)) {
            obj.emit(`${String(key)}`, key, value)
        }
        obj.emit('**')

        return proxy as T
    }

    constructor() {
        super()
        return this.watch(this)
    }

}