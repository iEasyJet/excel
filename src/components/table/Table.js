import { ExcelComponent } from '../../core/ExcelComponent.js';
import { createTable } from './table.template.js';
import { resizeHandler } from './table.resize.js';
import { shouldResize, isCell } from './table.functions.js';
import { TableSelection } from './TableSelection.js';
import { $ } from '../../core/dom.js';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root) {
    super($root, {
      listeners: ['mousedown'],
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
  }

  onMousedown(event) {
    const type = shouldResize(event);
    if (type) {
      resizeHandler(type, this.$root, event);
    } else if (isCell(event)) {
      const $target = $(event.target);
      if (event.shiftKey) {
        const target = $target.id(true);
        const current = this.selection.current.id(true);

        const cols = [];
      } else {
        this.selection.select($target);
      }
    }
  }
}
