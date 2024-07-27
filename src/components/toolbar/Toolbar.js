import { ExcelStateComponent } from '../../core/ExcelStateComponent.js';
import { createToolbar } from './toolbar.template.js';
import { $ } from '../../core/dom.js';
import { defaultStyles } from '../../constants.js';

export class Toolbar extends ExcelStateComponent {
  static className = 'excel__toolbar';

  constructor($root, options) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      subscribe: ['currentStyles'],
      ...options,
    });
  }

  prepare() {
    this.initState(defaultStyles);
  }

  get template() {
    return createToolbar(this.state);
  }

  storeChange(changes) {
    this.setState(changes.currentStyles);
  }
  toHTML() {
    return this.template;
  }

  onClick(event) {
    const $target = $(event.target);
    if ($target.data.type === 'button') {
      const value = JSON.parse($target.data.value);
      this.$emit('toolBar:applyStyle', value);
    }
  }
}
