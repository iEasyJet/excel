import { ExcelComponent } from '../../core/ExcelComponent.js';
import { createTable } from './table.template.js';
import { resizeHandler } from './tableresize.js';
import { shouldResize } from './table.functions.js';

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

  onMousedown(event) {
    const type = shouldResize(event);
    if (type) {
      resizeHandler(type, this.$root, event);
    }
  }
}
