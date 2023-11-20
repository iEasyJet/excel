import { capitalize } from './utils';

export class DomListener {
  constructor($root, listenrs = []) {
    if (!$root) {
      throw new Error('Нет Root для DomListener!');
    }
    this.$root = $root;
    this.listenrs = listenrs;
  }

  initDomListeners() {
    this.listenrs.forEach((listener) => {
      const method = getMethodName(listener);
      if (!this[method]) {
        throw new Error(`Метод ${method} не найден в компоненте ${this.name}`);
      }
      this[method] = this[method].bind(this);
      this.$root.on(listener, this[method]);
    });
  }

  removeDomListeners() {
    this.listenrs.forEach((listener) => {
      const method = getMethodName(listener);
      this.$root.off(listener, this[method]);
    });
  }
}

function getMethodName(eventName) {
  return 'on' + capitalize(eventName);
}
