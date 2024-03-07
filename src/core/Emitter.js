export class Emitter {
  constructor() {
    this.listeners = {};
  }

  emit(event, ...args) {
    if (!Array.isArray(this.listeners[event])) {
      return false;
    }
    this.listeners[event].forEach((listener) => {
      listener(...args);
    });
    return true;
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
