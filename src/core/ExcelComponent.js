import { DomListener } from './DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || '';
    this.emitter = options.emitter;
    this.unsubscribers = [];
    this.subscribe = options.subscribe || [];
    this.store = options.store;

    this.prepare();
  }
  // Возвращает шаблон компонента
  prepare() {}

  toHTML() {
    return '';
  }

  $dispatch(action) {
    this.store.dispatch(action);
  }

  storeChange() {}

  $emit(event, ...args) {
    this.emitter.emit(event, ...args);
  }

  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn);
    this.unsubscribers.push(unsub);
  }

  init() {
    this.initDomListeners();
  }

  isWatching(key) {
    return this.subscribe.includes(key);
  }

  destyroy() {
    this.removeDomListeners();
    this.unsubscribers.forEach((unsub) => unsub());
  }
}
