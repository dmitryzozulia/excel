export class Emitter {
    constructor() {
        this.listeners = {}
    }

    emit(event, ...args) {
        if (!Array.isArray(this.listeners[event])) {
            return false
        }
        this.listeners[event].forEach(listener => {
            listener(...args)
        })
    }

    subscribe(event, fn) {
        this.listeners[event] = this.listeners[event] || []
        this.listeners[event].push(fn)
        return () => {
            this.listeners[event] =
                this.listeners[event].filter(listener => listener !== fn)
        }
    }
}


// Example
// const emitter = New Emitter()
// const unsub = emitter.subscribe('dima', data => console.log('sub:', data))
// emitter.emit('dima', 10)
// setTimeout(() =>{
//     emitter.emit('dima', 188)
// }, 2000)
// setTimeout(() => {
//     emitter.emit('dima', 188)
// }, 3000)
