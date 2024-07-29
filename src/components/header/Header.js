import { ExcelComponent } from '../../core/ExcelComponent.js';
import { changeTitle } from '../../redux/action.js';
import { $ } from '../../core/dom.js';
import { defaultTitle } from '../../constants.js';
import { debounce } from '../../core/utils.js';
import { ActiveRoute } from '../../core/routes/ActiveRoute.js';

export class Header extends ExcelComponent {
  static className = 'excel__header';

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
      ...options,
    });
  }

  prepare() {
    this.onInput = debounce(this.onInput, 300);
  }
  onInput(event) {
    const $target = $(event.target);
    this.$dispatch(changeTitle($target.text()));
  }

  onClick(event) {
    const $target = $(event.target);
    if ($target.data.button === 'delete') {
      const decision = confirm('Вы уверены, что хотите удалить эту таблицу?');
      if (decision) {
        localStorage.removeItem('excel:' + ActiveRoute.param);
        ActiveRoute.navigate('');
      }
    } else if ($target.data.button === 'logout') {
      ActiveRoute.navigate('');
    }
  }

  toHTML() {
    const title = this.store.getState().title || defaultTitle;
    return `
    <input type="text" class="input" value="${title}"/>

    <div class="wrapper">
      <div class="button" data-button='delete'>
        <span class="material-icons" data-button='delete'> delete </span>
      </div>
      <div class="button" data-button='logout'>
        <span class="material-icons" data-button='logout'> logout </span>
      </div>
    </div>`;
  }
}
