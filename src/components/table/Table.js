import { ExcelComponent } from '../../core/ExcelComponent.js';
import { createTable } from './table.template.js';
import { resizeHandler } from './table.resize.js';
import {
  shouldResize,
  isCell,
  matrix,
  nextSelector,
} from './table.functions.js';
import { TableSelection } from './TableSelection.js';
import { $ } from '../../core/dom.js';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown'],
      ...options,
    });
  }

  toHTML() {
    return createTable(25);
  }

  prepare() {
    this.selection = new TableSelection();
  }

  init() {
    super.init();

    this.$cell = this.$root.find('[data-id="0:0"]');
    this.selection.select(this.$cell);

    this.$on('Formula:input', (text) => {
      this.selection.current.text(text);
      console.log(text);
    });
  }

  onMousedown(event) {
    const type = shouldResize(event);
    if (type) {
      resizeHandler(type, this.$root, event);
    } else if (isCell(event)) {
      const $target = $(event.target);
      if (event.shiftKey) {
        const $cells = matrix(this.selection.current, $target).map((id) =>
          this.$root.find(`[data-id="${id}"]`)
        );
        this.selection.selectGroup($cells);
      } else {
        this.selection.select($target);
      }
    }
  }

  onKeydown(event) {
    const keys = [
      'Enter',
      'Tab',
      'ArrowLeft',
      'ArrowRight',
      'ArrowDown',
      'ArrowUp',
    ];

    const { key } = event;

    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault();
      const id = this.selection.current.id(true);

      const $next = this.$root.find(nextSelector(key, id));
      this.selection.select($next);
    }
  }
}
