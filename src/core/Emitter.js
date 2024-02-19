export class Emitter {
  constructor() {
    this.listeners = {};
  }

  emit(eventName, ...args) {
    if (Array.isArray(this.listeners[eventName])) {
      this.listeners[eventName].forEach((listener) => {
        listener(...args);
      });
    }
  }

  subscribe(eventName, fn) {
    this.listeners[eventName] = this.listeners[eventName] || [];
    this.listeners[eventName].push(fn);

    return () => {
      this.listeners[eventName] =
        this.listeners[eventName].filter((listener) => {
          return listener !== fn;
        });
    };
  }
}

const emitter = new Emitter();

emitter.subscribe('vlad', (data) => console.log(data));
emitter.emit('vlad', 42);
