import { ExcelComponent } from '../../core/ExcelComponent.js';
import { changeTitle } from '../../redux/action.js';
import { $ } from '../../core/dom.js';
import { defaultTitle } from '../../constants.js';

export class Header extends ExcelComponent {
  static className = 'excel__header';

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input'],
      ...options,
    });
  }

  onInput(event) {
    const $target = $(event.target);
    this.$dispatch(changeTitle($target.text()));
  }

  toHTML() {
    const title = this.store.getState().title || defaultTitle;
    return `
    <input type="text" class="input" value="${title}"/>

    <div class="wrapper">
      <div class="button">
        <span class="material-icons"> delete </span>
      </div>
      <div class="button">
        <span class="material-icons"> logout </span>
      </div>
    </div>`;
  }
}
