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
      /* eslint-disable */
      this.listeners[eventName] = this.listeners[eventName].filter(
        /* eslint-disable */
        (listener) => {
          /* eslint-disable */
          return listener !== fn;
        }
      );
    };
  }
}
